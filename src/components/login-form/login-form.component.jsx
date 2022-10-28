import { useState, useContext } from "react";
import FormInput from "../form-input/form-input.component";
import Axios from "axios";
import { UserContext } from "../../context/user.context";
import { Link, useNavigate } from "react-router-dom";
import ModalBox from "../modal-box/modal-box.component";

const defaultFormField = {
  username: "",
  password: "",
};

export default function LoginForm() {
  const [formField, setFormField] = useState(defaultFormField);
  const [showModal, setShowModal] = useState(false);
  const [modalValue, setModalValue] = useState("");
  const { username, password } = formField;
  const { setCurrentUser } = useContext(UserContext);
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
    Axios.post("https://banking-management-backend.herokuapp.com/login", {
      ...formField,
    }).then((res) => {
      if (typeof res.data === "object") {
        console.log(res.data);
        const { id, name, username, balance } = res.data;
        setCurrentUser({
          id,
          username,
          name,
          balance,
        });
        navigate("/");
      } else {
        modalAlert("Incorrect username or password!");
      }
    });
  };

  return (
    <div className="login-container">
      <form className="form-container" onSubmit={handleSubmit}>
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
        First Time User? <Link to="register">Register Here</Link>
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
