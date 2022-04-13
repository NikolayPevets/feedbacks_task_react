import React, { useContext } from "react";
import { Context } from "../../context";
import "./table.css";
import { FcApproval } from "react-icons/fc";

const GuestsTable = ({ guestsData }) => {
  const { showFeedbackForm } = useContext(Context);

  const guestsList = guestsData.map((item, index) => {
    if (item.eatsPizza && item.madeFeedback) {
      return (
        <tr key={item.key}>
          <td>
            <FcApproval />
            <a
              className={item.isVegan ? "green" : null}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                showFeedbackForm(index);
              }}
            >
              {item.name}
            </a>
          </td>
        </tr>
      );
    } else if (item.eatsPizza) {
      return (
        <tr key={item.key}>
          <td>
            <a
              className={item.isVegan ? "green" : null}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                showFeedbackForm(index);
              }}
            >
              {item.name}
            </a>
          </td>
        </tr>
      );
    } else {
      return (
        <tr key={item.key}>
          <td className="unactive">{item.name}</td>
        </tr>
      );
    }
  });

  return (
    <table className="table_price">
      <caption>Feedback List</caption>
      <tbody>{guestsList}</tbody>
    </table>
  );
};

export default GuestsTable;
