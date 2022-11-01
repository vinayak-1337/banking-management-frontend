import Profile from "../../components/profile/profile.components";
import DashboardImage from "../../assets/dashboard.png"

import "./dashboard.styles.css"

export default function Dashboard() {
  return (<div className="dashboard-container">
    <img src={DashboardImage} alt="dashboard" />
    <Profile/>
  </div>);
}
