import { useContext } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./routes/home.component";
import { UserContext } from "./context/user.context";
import RegisterForm from "./components/register-form/register-form.component";
import LoginForm from "./components/login-form/login-form.component";
import UserDashboard from "./routes/user-dashboard/user-dashboard.component";
import MoneyTransfer from "./components/money-transfer/money-transfer.component";
import DepositForm from "./components/deposit-form/deposit-form.component";
import Balance from "./components/balance/balance.component";

function App() {
  const {currentUser} = useContext(UserContext);
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        {Object.keys(currentUser).length === 0 ? (
          <Route index element={<LoginForm />} />
        ) : (
          <Route index element={<UserDashboard />} />
        )}

        <Route path="register" element={<RegisterForm />} />
        <Route path="login" element={<LoginForm />} />
        <Route path="transfer" element={<MoneyTransfer />} />
        <Route path="deposit" element={<DepositForm />} />
        <Route path="balance" element={<Balance />} />
      </Route>
    </Routes>
  );
}

export default App;
