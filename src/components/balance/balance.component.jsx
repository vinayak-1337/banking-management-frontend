import { useContext, useEffect } from "react";
import { UserContext } from "../../context/user.context";
import Axios from "axios";
import BackButton from "../back-button/back-button.component";

export default function Balance() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { balance } = currentUser;

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    token &&
      Axios.get(`${process.env.REACT_APP_BASE_URL}/getUser`, config)
        .then((response) => {
          setCurrentUser({ ...response.data });
        })
        .catch((error) => console.log(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="balance-container">
      <h2>Your current balance is</h2> <br />
      <h3>₹ {balance} </h3>
      <BackButton />
    </div>
  );
}
