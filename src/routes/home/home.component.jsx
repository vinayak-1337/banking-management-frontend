import { Outlet, Link } from "react-router-dom";
import "./home.styles.css";
import card from "../../assets/card.jpg";
import exchange from "../../assets/exchange.png"

export default function Home() {
  return (
    <div className="main-container">
      <div className="left">The bank that does it all!</div>
      <div className="right">
        <img id="transfer-image" src={exchange} alt="transfer" />
        <img id="card-image" src={card} alt="card" />
      </div>
    </div>
  );
}
