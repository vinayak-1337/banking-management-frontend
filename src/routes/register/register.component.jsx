import MobileImage from "../../assets/mobile.png";
import RegisterForm from "../../components/register-form/register-form.component";

import "./register.styles.css";

export default function Register() {
  return (
    <div className="register-page-container">
      <img className="desktop-image" src={MobileImage} alt="mobile" />
      <RegisterForm />
    </div>
  );
}
