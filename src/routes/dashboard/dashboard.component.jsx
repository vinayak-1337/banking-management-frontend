import { useEffect, useContext } from "react";
import { Outlet } from "react-router-dom";
import Axios from "axios";

import "./dashboard.styles.css";
import DashboardImage from "../../assets/dashboard.png";
import { UserContext } from "../../context/user.context";

export default function Dashboard() {
  const {setCurrentUser} = useContext(UserContext);
  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    token &&
      Axios.get(`${process.env.REACT_APP_BASE_URL}/getUser`, config)
        .then((response) => {
          setCurrentUser({ ...response.data });
          console.log("userData",response.data);
        })
        .catch((error) => console.log(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="dashboard-container">
      <img className="desktop-image" src={DashboardImage} alt="dashboard" />
      <Outlet />
    </div>
  );
}
