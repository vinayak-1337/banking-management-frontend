import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import Axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import LoadingBox from "../loading-box/loading-box.component";

import "./register-form.styles.css";
import FlashAlert from "../flash-alert/flash-alert.component";

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
  const [showLoading, setLoading] = useState(false);
  const [modalValue, setModalValue] = useState("");
  const [alertType, setAlertType] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormField({
      ...formField,
      [name]: value,
    });
  };

  const modalAlert = (message, type) => {
    setModalValue(message);
    setShowModal(true);
    setAlertType(type);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    Axios.post(`${process.env.REACT_APP_BASE_URL}/create`, {
      ...formField,
    })
      .then((res) => {
        setLoading(false);
        setFormField(defaultFormField);
        modalAlert("Registration successful", "success");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      })
      .catch((error) => {
        console.log(error.response);
        if (error.code === "ERR_NETWORK") {
          modalAlert("Couldn't connect to server");
        } else if (error.response.data === "username already exists") {
          modalAlert("User already exist");
        }
        setLoading(false);
      });
  };

  return (
    <div className="page-container">
      <form className="form-container" onSubmit={handleSubmit}>
      <h3 className="register-greetings">Get Started</h3>
      <FlashAlert show={showModal} value={modalValue} type={alertType}/>
        <FormInput
          name="name"
          type="text"
          placeholder="Your name"
          value={name}
          onChange={handleChange}
          className="register-form-input"
          required
        />
        <FormInput
          name="age"
          type="number"
          placeholder="Age"
          value={age}
          onChange={handleChange}
          min="10"
          className="register-form-input"
          required
        />
        <FormInput
          name="contact"
          type="tel"
          placeholder="Contact"
          value={contact}
          onChange={handleChange}
          pattern="[0-9]{10}"
          className="register-form-input"
          required
        />
        <FormInput
          name="username"
          type="text"
          placeholder="Username"
          value={username}
          onChange={handleChange}
          className="register-form-input"
          required
        />
        <FormInput
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={handleChange}
          className="register-form-input"
          required
        />
        <FormInput className="register-button" type="submit" value="Register" />
        <p className="register-redirect">
          Already a user. <Link to="/login">Log in</Link>
        </p>
      </form>
      <LoadingBox show={showLoading} />
    </div>
  );
}
