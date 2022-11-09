import { useState } from "react";
import { Link } from "react-router-dom";

import "./mobile-nav.styles.css";

export default function MobileNav({ show, onClose }) {
  let navStyle = show ? "show-overlay" : "";
  const [isExpand, setIsExpand] = useState(false);

  const handleExpand = ()=> {
    setIsExpand(prev=>!prev)
  }

  return (
    <div id="myNav" className={`overlay ${navStyle}`}>
      <button className="closebtn" onClick={onClose}>
        &times;
      </button>
      <div className="overlay-content">
        <div className="mobile-fund-transfer" onClick={handleExpand}>
          Fund Transfer
          <div className={`mft-content ${isExpand ? "mft-expand":""}`}>
            <Link to="dashboard/self-transfer" onClick={onClose}>
              Self transfer
            </Link>
            <Link to="dashboard/other-transfer" onClick={onClose}>
              Other bank transfer
            </Link>
          </div>
        </div>
        <Link to="/dashboard" onClick={onClose}>
          My Profile
        </Link>
        <Link to="dashboard/transaction" onClick={onClose}>
          Transactions
        </Link>
      </div>
    </div>
  );
}
