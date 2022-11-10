import { useEffect, useContext, useState } from "react";
import Axios from "axios";
import { UserContext } from "../../context/user.context";
import "./transactions.styles.css";

import { currencyFormatter } from "../profile/profile.components";
import LoadingBox from "../loading-box/loading-box.component";

export default function Transactions() {
  const { currentUser } = useContext(UserContext);
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [showLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (currentUser.accountNumber !== undefined) {
      Axios.post(`${process.env.REACT_APP_BASE_URL}/transaction`, {
        accountNumber: currentUser.accountNumber,
      })
        .then((response) => {
          setTransactionHistory(response.data);
        })
        .catch((error) => {
          console.log("transaction", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [currentUser]);
  return (
    <div className="transaction-container">
      <h3 className="transaction-title">Last 10 transactions</h3>
      <table>
        <thead>
          <tr>
            <th>Transaction Id</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {transactionHistory
            ?.filter((_, index) => index < 10)
            .map(({ transactionId, to, from, amount, time }) => {
              const formatedTime = new Date(time).toLocaleString();
              return (
                <tr key={transactionId}>
                  <td>{transactionId}</td>
                  <td>
                    {from == currentUser.accountNumber
                      ? `NEFT/${to}/Paid`
                      : from
                      ? `NEFT/${from}/Received`
                      : "To self"}
                  </td>
                  <td>
                    <span style={{ fontWeight: 700 }}>
                      {from == currentUser.accountNumber ? "-" : "+"}
                    </span>{" "}
                    {currencyFormatter.format(amount)}
                  </td>
                  <td>{formatedTime}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <LoadingBox show={showLoading} />
    </div>
  );
}
