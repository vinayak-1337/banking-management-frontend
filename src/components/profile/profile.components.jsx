import { useContext, useEffect } from "react";
import { UserContext } from "../../context/user.context";
import Axios from "axios";
import BackButton from "../back-button/back-button.component";
import "./profile.styles.css";

export default function Profile() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { name, age, username, balance, accountNumber } = currentUser;

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

  return (
    <div className="profile-container">
      <p className="name-box">
        <span>Name : </span>
        {name}
      </p>
      <p>
        <span>Age : </span>
        {age}
      </p>
      <p>
        <span>Username : </span>
        {username}
      </p>
      <p>
        <span>Balance : </span>
        {balance}
      </p>
      <p>
        <span>Account No. : </span>
        {accountNumber}
      </p>
      <BackButton />
    </div>
  );
}
