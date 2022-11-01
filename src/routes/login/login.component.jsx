import MobileImage from "../../assets/mobile.png";
import LoginForm from "../../components/login-form/login-form.component";

import "./login.styles.css"

export default function Login() {
  
  return(
    <div className="login-page-container">
      <img src={MobileImage} alt="mobile" />
      <LoginForm/>
    </div>
  )
}