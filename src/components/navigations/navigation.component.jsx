import React from "react";
import { Outlet, Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./navigation.styles.css";

export default function Navigations() {
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
          <Link className="header-link">About Us</Link>
          <Link className="header-link">Support</Link>
        </div>
        <div className="right">
          <Link className="header-login" to="login">
            login
          </Link>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
