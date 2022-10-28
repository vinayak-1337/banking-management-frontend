
import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import Axios from "axios";
import { Link } from "react-router-dom";
import ModalBox from "../modal-box/modal-box.component";

const defaultFormField = {
  name: "",
  age: "",
  contact: "",
  username: "",
  password: "",
};

export default function RegisterForm() {
  const [formField, setFormField] = useState(defaultFormField);
  const { name, age, contact, username, password } = formField;
  const [showModal, setShowModal] = useState(false);
  const [modalValue, setModalValue] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormField({
      ...formField,
      [name]: value,
    });
  };

  const alertModal = (message) => {
    setModalValue(message);
    setShowModal(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    Axios.post(`${process.env.REACT_APP_BASE_URL}/create`, {
      ...formField,
    }).then((res) => {
      if (res.data.code === "ER_DUP_ENTRY") {
        alert("User already exist. Please choose different username");
      } else {
        setFormField(defaultFormField);
        alertModal("Registration successful");
        // navigate("/");
      }
    });
  };

  return (
    <div className="register-container">
      <form className="form-container" onSubmit={handleSubmit}>
        <FormInput
          name="name"
          type="text"
          value={name}
          onChange={handleChange}
          required
        />
        <FormInput
          name="age"
          type="number"
          value={age}
          onChange={handleChange}
          required
        />
        <FormInput
          name="contact"
          type="tel"
          value={contact}
          onChange={handleChange}
          pattern="[0-9]{10}"
          required
        />
        <FormInput
          name="username"
          type="text"
          value={username}
          onChange={handleChange}
          required
        />
        <FormInput
          name="password"
          type="password"
          value={password}
          onChange={handleChange}
          required
        />
        <FormInput type="submit" value="submit" />
      </form>
      <p>
        Already a user. <Link to="/">Log in</Link>
      </p>
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
