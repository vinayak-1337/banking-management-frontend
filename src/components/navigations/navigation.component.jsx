import { useContext, useEffect } from "react";
import { UserContext } from "../../context/user.context";
import { Outlet, Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import logo from "../../assets/logo.png";
import DropdownIcon from "../../assets/dropdown.png";
import "./navigation.styles.css";

export default function Navigations() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { name } = currentUser;
  const navigate = useNavigate();

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
          <img id="logo" src={logo} alt="logo" />
          <Link to="/">
            <h1 id="title">Secure</h1>
          </Link>
        </div>
        <div className="middle">
          {Object.keys(currentUser).length !== 0 && (
            <div className="header-link fund-transfer">
              Fund Transfer
              <div className="fund-hover">
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
            <p id="user-greeting">
              {" "}
              {`Hello, ${name.split(" ")[0]}`}{" "}
              <img src={DropdownIcon} alt="dropdown" />
            </p>
          )}
          {Object.keys(currentUser).length === 0 ? (
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
      <Outlet />
    </>
  );
}
