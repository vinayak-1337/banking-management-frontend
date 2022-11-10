import { useContext, useEffect } from "react";
import { UserContext } from "../../context/user.context";
import { Outlet, Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import logo from "../../assets/logo.png";
import "./navigation.styles.css";

import DropdownIcon from "../../assets/dropdown.png";
import MobileNav from "../mobile-nav/mobile-nav.component";
import { useState } from "react";

export default function Navigations() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [showNav, setShowNav] = useState(false);
  const { name } = currentUser;
  const navigate = useNavigate();

  let isLogin = Object.keys(currentUser).length !== 0;

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

  const handleClick = () => {
    setCurrentUser({});
    sessionStorage.removeItem("accessToken");
    navigate("/");
  };
  return (
    <>
      <header className="App-header">
        <div className="left">
          {isLogin && (
            <div className="mobile-nav-button" onClick={() => setShowNav(true)}>
              &#9776;
            </div>
          )}
          <img id="logo" src={logo} alt="logo" />
          <Link to={isLogin ? "/dashboard" : "/"}>
            <h1 id="title">Secure</h1>
          </Link>
        </div>
        <div className="middle">
          {isLogin && (
            <div className="header-link fund-transfer">
              Fund Transfer
              <div className="fund-dropdown">
                <Link to="dashboard/self-transfer">Self transfer</Link>
                <Link to="dashboard/other-transfer">Other bank transfer</Link>
              </div>
            </div>
          )}
          <Link className="header-link">About Us</Link>
          <Link className="header-link">Support</Link>
        </div>
        <div className="right">
          {name && (
            <div id="user">
              {" "}
              {`Hello, ${name.split(" ")[0]}`}{" "}
              <img
                className="desktop-image"
                src={DropdownIcon}
                alt="dropdown"
              />
              <div className="user-dropdown">
                <Link to="/dashboard">My Profile</Link>
                <Link to="dashboard/transaction">Transactions</Link>
              </div>
            </div>
          )}
          {!isLogin ? (
            <Link className="header-login" to="login">
              login
            </Link>
          ) : (
            <button className="header-logout" onClick={handleClick}>
              Logout
            </button>
          )}
        </div>
      </header>
      <MobileNav
        show={showNav}
        onClose={() => {
          setShowNav(false);
        }}
      />
      <Outlet />
    </>
  );
}
