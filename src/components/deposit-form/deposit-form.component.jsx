import { useState, useContext } from "react";
import FormInput from "../form-input/form-input.component";
import Axios from "axios";
import { UserContext } from "../../context/user.context";
import BackButton from "../back-button/back-button.component";
import ModalBox from "../modal-box/modal-box.component";

const defaultFormField = {
  amount: "",
};

export default function DipositForm() {
  const [showModal, setShowModal] = useState(false);
  const [modalValue, setModalValue] = useState("");
  const [formField, setFormField] = useState(defaultFormField);
  const { amount } = formField;
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { id, balance } = currentUser;

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

    Axios.post(`${process.env.REACT_APP_BASE_URL}/deposit`, {
      id: id,
      amount: amount,
    }).then((res) => console.log(res.data));

    setCurrentUser({ ...currentUser, balance: balance + amount });
    setFormField(defaultFormField);
    modalAlert("Deposit Successful");
  };

  return (
    <div className="deposit-container">
      <form className="form-container" onSubmit={handleSubmit}>
        <FormInput
          name="amount"
          type="number"
          value={amount}
          onChange={handleChange}
          required
          step="500"
          min="500"
          max="50000"
        />
        <FormInput type="submit" value="Submit" />
      </form>
      <BackButton />
      <ModalBox
        onClose={() => {
          setShowModal(false);
        }}
        value={modalValue}
        show={showModal}
      />
    </div>
  );
}
