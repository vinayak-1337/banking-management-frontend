import Axios from "axios";
import { useState, useContext } from "react";
import FormInput from "../form-input/form-input.component";
import { UserContext } from "../../context/user.context";
import BackButton from "../back-button/back-button.component";
import ModalBox from "../modal-box/modal-box.component";
import LoadingBox from "../loading-box/loading-box.component";

const defaultFormField = {
  receiver: "",
  amount: 0,
};

export default function MoneyTransfer() {
  const [formField, setFormField] = useState(defaultFormField);
  const [showModal, setShowModal] = useState(false);
  const [modalValue, setModalValue] = useState("");
  const [showLoading, setLoading] = useState(false);
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { receiver, amount } = formField;

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
    if (receiver === currentUser.username) {
      modalAlert("For self transfer use deposit option");
      return;
    }
    if (amount > currentUser.balance) {
      modalAlert("Insufficient funds");
      return;
    }
    setLoading(true);
    Axios.post(`${process.env.REACT_APP_BASE_URL}/transfer`, {
      senderId: currentUser.id,
      receiverUsername: receiver,
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
      .catch((err) => {
        if (err.response.status === 404) {
          modalAlert("User not found");
        }
        setLoading(false);
      });
  };

  return (
    <div className="transfer-container">
      <form className="form-container" onSubmit={handleSubmit}>
        <FormInput
          name="receiver"
          info="username"
          type="text"
          value={receiver}
          onChange={handleChange}
          required
        />
        <FormInput
          name="amount"
          type="number"
          value={amount}
          min="100"
          onChange={handleChange}
        />
        <FormInput type="submit" value="Transfer" />
      </form>
      <BackButton />
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
