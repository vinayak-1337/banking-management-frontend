import { useEffect, useContext, useState } from "react";
import Axios from "axios";
import { UserContext } from "../../context/user.context";
import "./transactions.styles.css";

export default function Transactions() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [transactionHistory, setTransactionHistory] = useState([]);
  useEffect(() => {
    if (currentUser.accountNumber !== undefined) {
      Axios.post(`${process.env.REACT_APP_BASE_URL}/transaction`, {
        accountNumber: currentUser.accountNumber,
      })
        .then((response) => {
          setTransactionHistory(response.data);
        })
        .catch((error) => {
          console.log("transaction", error);
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
            <th>Debit</th>
            <th>Credit</th>
            <th>Amount</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {transactionHistory
            ?.filter((_, index) => index < 10)
            .map(({ transactionId, credit, debit, amount, time }) => {
              const formatedTime = new Date(time).toLocaleString();
              return (
                <tr key={transactionId}>
                  <td>{transactionId}</td>
                  <td>{debit || "--"}</td>
                  <td>{credit}</td>
                  <td>{amount}</td>
                  <td>{formatedTime}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
