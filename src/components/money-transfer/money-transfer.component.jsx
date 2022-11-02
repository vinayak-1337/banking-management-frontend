import Axios from "axios";
import { useState, useContext } from "react";
import FormInput from "../form-input/form-input.component";
import { UserContext } from "../../context/user.context";
import ModalBox from "../modal-box/modal-box.component";
import LoadingBox from "../loading-box/loading-box.component";

import "./money-transfer.styles.css";

const defaultFormField = {
  receiverAccountNumber: "",
  amount: 0,
};

export default function MoneyTransfer() {
  const [formField, setFormField] = useState(defaultFormField);
  const [showModal, setShowModal] = useState(false);
  const [modalValue, setModalValue] = useState("");
  const [showLoading, setLoading] = useState(false);
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { receiverAccountNumber, amount } = formField;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormField({
      ...formField,
      [name]: value,
    });
  };

  const modalAlert = (message) => {
    setModalValue(message);
    setShowModal(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (receiverAccountNumber == currentUser.accountNumber) {
      modalAlert("For self transfer use deposit option");
      return;
    }
    if (amount > currentUser.balance) {
      modalAlert("Insufficient funds");
      return;
    }
    setLoading(true);
    Axios.post(`${process.env.REACT_APP_BASE_URL}/transfer`, {
      senderAccountNumber: currentUser.accountNumber,
      receiverAccountNumber,
      amount: amount,
    })
      .then((res) => {
        setLoading(false);
        setCurrentUser({
          ...currentUser,
          balance: currentUser.balance - amount,
        });
        modalAlert("Transfer successful");
      })
      .catch((error) => {
        if (error.code === "ERR_NETWORK") {
          modalAlert("Couldn't connect to server");
        } else if (error.response.status === 404) {
          modalAlert("User not found");
        }
        setLoading(false);
      });
  };

  return (
    <div className="transfer-container">
      <form className="form-container" onSubmit={handleSubmit}>
        <h3 className="transfer-title">Bank transfer</h3>
        <FormInput
          name="receiverAccountNumber"
          placeholder="Account Number"
          type="number"
          value={receiverAccountNumber}
          onChange={handleChange}
          className="transfer-input"
          required
        />
        <FormInput
          name="amount"
          type="number"
          placeholder="Amount"
          value={amount}
          min="100"
          className="transfer-input"
          onChange={handleChange}
        />
        <FormInput className="transfer-button" type="submit" value="Transfer" />
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
