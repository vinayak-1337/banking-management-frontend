import DashboardImage from "../../assets/dashboard.png";

import "./dashboard.styles.css";
import { Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <img src={DashboardImage} alt="dashboard" />
      <Outlet />
    </div>
  );
}
