import React from "react";
import { Link } from "react-router-dom";
import BackButton from "../../components/back-button/back-button.component";
import "./fund-transfer.styles.css";

export default function FundTransfer() {
  return (
    <div className="transfer-container">
      <Link className="nav-link" to="self-transfer">
        Self Transfer
      </Link>
      <Link className="nav-link" to="other-transfer">
        To other bank account
      </Link>
      <BackButton />
    </div>
  );
}
