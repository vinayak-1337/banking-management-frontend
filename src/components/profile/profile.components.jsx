import { useContext } from "react";
import { UserContext } from "../../context/user.context";
import "./profile.styles.css";

export const currencyFormatter = new Intl.NumberFormat("en-IN", {style:"currency", currency:"INR"});

export default function Profile() {
  const { currentUser } = useContext(UserContext);
  const { name, age, username, balance, accountNumber } = currentUser;


  return (
    <div className="profile-container">
      <h3 className="title">Profile</h3>
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
        <span>Balance : </span>{currencyFormatter.format(balance)}
      </p>
      <p>
        <span>Account No. : </span>
        {accountNumber}
      </p>
    </div>
  );
}
