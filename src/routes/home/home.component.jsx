import { Outlet, Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./home.styles.css";

export default function Home() {
  return (
    <>
      <header className="App-header">
        <div className="left">
          <img id="logo" src={logo} alt="logo" />
          <Link to="/">
            <h1 id="title">Secure Bank</h1>
          </Link>
        </div>
        <div className="right">
          <p>login</p>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
