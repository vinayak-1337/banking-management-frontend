import { useState, useContext } from "react";
import FormInput from "../form-input/form-input.component";
import Axios from "axios";
import { UserContext } from "../../context/user.context";
import LoadingBox from "../loading-box/loading-box.component";
import FlashAlert from "../flash-alert/flash-alert.component";
import { useNavigate } from "react-router-dom";

import "./deposit-form.styles.css";

const defaultFormField = {
  amount: "",
};

export default function DepositForm() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [alertValue, setAlertValue] = useState("");
  const [showLoading, setLoading] = useState(false);
  const [formField, setFormField] = useState(defaultFormField);
  const [alertType, setAlertType] = useState("");
  const { amount } = formField;
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { accountNumber, balance } = currentUser;

  const handleChange = (event) => {
    const { value } = event.target;
    setFormField({
      amount: parseInt(value),
    });
  };

  const showAlert = (message, type) => {
    setAlertValue(message);
    setShowModal(true);
    setAlertType(type);
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
        showAlert("Deposit Successful", "success");
        setTimeout(() => navigate("/dashboard"), 1000);
      })
      .catch((error) => {
        if (error.code === "ERR_NETWORK") {
          showAlert("Couldn't connect to server");
        }
        setLoading(false);
      });
  };

  return (
    <div className="page-container">
      <form className="form-container" onSubmit={handleSubmit}>
        <h3 className="deposit-title">Self Transfer</h3>
        <FlashAlert value={alertValue} show={showModal} type={alertType} />
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
      <LoadingBox show={showLoading} />
    </div>
  );
}
