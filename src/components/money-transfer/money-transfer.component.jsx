import Axios from "axios";
import { useState, useContext } from "react";
import FormInput from "../form-input/form-input.component";
import { UserContext } from "../../context/user.context";
import LoadingBox from "../loading-box/loading-box.component";

import "./money-transfer.styles.css";
import FlashAlert from "../flash-alert/flash-alert.component";

const defaultFormField = {
  receiverAccountNumber: "",
  amount: 0,
};

export default function MoneyTransfer() {
  const [formField, setFormField] = useState(defaultFormField);
  const [showModal, setShowModal] = useState(false);
  const [alertValue, setAlertValue] = useState("");
  const [showLoading, setLoading] = useState(false);
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { receiverAccountNumber, amount } = formField;
  const [alertType, setAlertType] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormField({
      ...formField,
      [name]: value,
    });
  };

  const showAlert = (message, type) => {
    setAlertValue(message);
    setShowModal(true);
    setAlertType(type);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // eslint-disable-next-line eqeqeq
    if (receiverAccountNumber == currentUser.accountNumber) {
      showAlert("For self transfer use deposit option");
      return;
    }
    if (amount > currentUser.balance) {
      showAlert("Insufficient funds");
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
        showAlert("Transfer successful", "success");
        setFormField(defaultFormField);
      })
      .catch((error) => {
        if (error.code === "ERR_NETWORK") {
          showAlert("Couldn't connect to server");
        } else if (error.response.status === 404) {
          showAlert("User not found");
        }
        setLoading(false);
      });
  };

  const preventNumberChange = (e) => {
    if (e.which === 38 || e.which === 40) {
      e.preventDefault();
    }
  }

  return (
    <div className="page-container">
      <form className="form-container" onSubmit={handleSubmit}>
        <h3 className="transfer-title">Bank transfer</h3>
        <FlashAlert show={showModal} value={alertValue}  type={alertType}/>
        <FormInput
          name="receiverAccountNumber"
          placeholder="Account Number"
          type="number"
          value={receiverAccountNumber}
          onChange={handleChange}
          className="transfer-input"
          onKeyDown={preventNumberChange}
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

      <LoadingBox show={showLoading} />
    </div>
  );
}
