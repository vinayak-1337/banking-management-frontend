import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import Axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import ModalBox from "../modal-box/modal-box.component";
import LoadingBox from "../loading-box/loading-box.component";

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
  const navigate = useNavigate();

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
    setLoading(true);

    Axios.post(`${process.env.REACT_APP_BASE_URL}/create`, {
      ...formField,
    })
      .then((res) => {
        setLoading(false);
        setFormField(defaultFormField);
        modalAlert("Registration successful");
        setTimeout(() => {
          navigate("/");
        }, 3000);
      })
      .catch((error) => {
        if (error.code === "ERR_NETWORK") {
          modalAlert("Couldn't connect to server");
        } else if (error.response.data === "duplicate entry") {
          modalAlert("User already exist. Please choose different username");
        }
        setLoading(false);
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
          min="10"
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
      <LoadingBox show={showLoading} />
    </div>
  );
}
