import { useContext } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./routes/home/home.component";
import { UserContext } from "./context/user.context";
import Navigations from "./components/navigations/navigation.component";
import Dashboard from "./routes/dashboard/dashboard.component";
import MoneyTransfer from "./components/money-transfer/money-transfer.component";
import DepositForm from "./components/deposit-form/deposit-form.component";
import Profile from "./components/profile/profile.components";
import Login from "./routes/login/login.component";
import Register from "./routes/register/register.component";

function MainRoutes() {
  const { currentUser } = useContext(UserContext);
  return (
    <Routes>
      <Route path="/" element={<Navigations />}>
        <Route index element={<Home />} />
        <Route path="dashboard" element={<Dashboard />}>
          <Route index element={<Profile />} />
          <Route path="self-transfer" element={<DepositForm />} />
          <Route path="other-transfer" element={<MoneyTransfer />} />
        </Route>
        <Route path="profile" element={<Profile />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  );
}

export default MainRoutes;
