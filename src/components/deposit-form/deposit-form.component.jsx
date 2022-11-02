import { useState, useContext } from "react";
import FormInput from "../form-input/form-input.component";
import Axios from "axios";
import { UserContext } from "../../context/user.context";
import BackButton from "../back-button/back-button.component";
import ModalBox from "../modal-box/modal-box.component";
import LoadingBox from "../loading-box/loading-box.component";

import "./deposit-form.styles.css";

const defaultFormField = {
  amount: "",
};

export default function DepositForm() {
  const [showModal, setShowModal] = useState(false);
  const [modalValue, setModalValue] = useState("");
  const [showLoading, setLoading] = useState(false);
  const [formField, setFormField] = useState(defaultFormField);
  const { amount } = formField;
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { accountNumber, balance } = currentUser;

  const handleChange = (event) => {
    const { value } = event.target;
    setFormField({
      amount: parseInt(value),
    });
  };

  const modalAlert = (message) => {
    setModalValue(message);
    setShowModal(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    Axios.post(`${process.env.REACT_APP_BASE_URL}/deposit`, {
      accountNumber,
      amount,
    })
      .then((res) => {
        setLoading(false);
        setCurrentUser({ ...currentUser, balance: balance + amount });
        setFormField(defaultFormField);
        modalAlert("Deposit Successful");
      })
      .catch((error) => {
        if (error.code === "ERR_NETWORK") {
          modalAlert("Couldn't connect to server");
        }
        setLoading(false);
      });
  };

  return (
    <div className="deposit-container">
      <form className="form-container" onSubmit={handleSubmit}>
        <h3 className="deposit-title">Self Transfer</h3>
        <FormInput
          name="amount"
          type="number"
          value={amount}
          onChange={handleChange}
          placeholder="Amount"
          required
          className="deposit-input"
          step="500"
          min="500"
          max="50000"
        />
        <FormInput type="submit" className="deposit-button" value="Deposit" />
      </form>
      <ModalBox
        onClose={() => {
          setShowModal(false);
        }}
        value={modalValue}
        show={showModal}
      />
      <LoadingBox show={showLoading} />
    </div>
  );
}
