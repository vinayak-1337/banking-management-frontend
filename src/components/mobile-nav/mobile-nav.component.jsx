import { Link } from "react-router-dom";

import "./mobile-nav.styles.css";

export default function MobileNav({ show, onClose }) {
  if(!show) return null
  return (
    <div id="myNav" className="overlay">
      <button className="closebtn" onClick={onClose}>
        &times;
      </button>
      <div className="overlay-content">
        <Link to="dashboard/self-transfer" onClick={onClose}>Self transfer</Link>
        <Link to="dashboard/other-transfer" onClick={onClose}>Other bank transfer</Link>
        <Link to="/dashboard" onClick={onClose}>My Profile</Link>
        <Link to="dashboard/transaction" onClick={onClose}>Transactions</Link>
      </div>
    </div>
  );
}
