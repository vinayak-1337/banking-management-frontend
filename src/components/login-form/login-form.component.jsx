import { useState, useContext, useEffect } from "react";
import FormInput from "../form-input/form-input.component";
import Axios from "axios";
import { UserContext } from "../../context/user.context";
import { Link, useNavigate } from "react-router-dom";
import ModalBox from "../modal-box/modal-box.component";
import LoadingBox from "../loading-box/loading-box.component";

import "./login-form.styles.css"

const defaultFormField = {
  username: "",
  password: "",
};

export default function LoginForm() {
  const [formField, setFormField] = useState(defaultFormField);
  const [showModal, setShowModal] = useState(false);
  const [modalValue, setModalValue] = useState("");
  const [showLoading, setLoading] = useState(false);
  const { username, password } = formField;
  const {currentUser, setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();

  if(Object.keys(currentUser).length !== 0) {
    navigate("dashboard");
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormField({
      ...formField,
      [name]: value,
    });
  };

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    token &&
      Axios.get(`${process.env.REACT_APP_BASE_URL}/getUser`, config)
        .then((response) => {
          setCurrentUser({ ...response.data });
        })
        .catch((error) => console.log(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const modalAlert = (message) => {
    setModalValue(message);
    setShowModal(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    Axios.post(`${process.env.REACT_APP_BASE_URL}/login`, {
      ...formField,
    })
      .then((res) => {
        setLoading(false);
        if (typeof res.data === "object") {
          const { id, name, username, age, balance, accountNumber } =
            res.data.userData;
          setCurrentUser({
            id,
            username,
            name,
            balance,
            accountNumber,
            age,
          });
          let accessToken = res.data.accessToken;
          sessionStorage.setItem("accessToken", accessToken);
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        if (error.code === "ERR_NETWORK") {
          modalAlert("Couldn't connect to server");
        } else if (
          error.response.status === 403 ||
          error.response.status === 404
        ) {
          modalAlert("Incorrect username or password!");
        }
        setLoading(false);
      });
  };

  return (
    <div className="login-container">
      {/* <p className="message"></p> */}
      <form className="form-container" onSubmit={handleSubmit}>
        <h3 className="login-greetings">Hello Again!</h3>
        <FormInput
          name="username"
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={handleChange}
          className="login-form-input"
          required
        />
        <FormInput
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={handleChange}
          className="login-form-input"
          required
        />
        <FormInput className="login-button" type="submit" value="Log in" />
        <p className="other-option">
          First Time User? <Link to="/register">Register Here</Link>
        </p>
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
