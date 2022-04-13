import { Button } from "reactstrap";
import { Context } from "../../context";
import { useContext } from "react";
import { FaStar } from "react-icons/fa";
import "./guest-form-info.css";

export default function GuestFormInfo({ guestsData, guestFormId }) {
  const { refreshData } = useContext(Context);

  const deleteFeedback = () => {
    if (!localStorage.getItem("guestsList")) {
      localStorage.setItem("guestsList", JSON.stringify(guestsData));
    }
    let data = JSON.parse(localStorage.getItem("guestsList"));
    let guestData = {
      key: guestFormId,
      name: data[guestFormId].name,
      eatsPizza: true,
      madeFeedback: false,
      comment: "",
      phone: "",
      stars: ""
    };
    let newData = data.map((item, index) => {
      if (item.key === guestFormId) {
        return guestData;
      } else {
        return item;
      }
    });
    localStorage.setItem("guestsList", JSON.stringify(newData));
    refreshData();
  };

  const stars = [...Array(guestsData[guestFormId].stars)].map((item, index) => {
    return <FaStar key={"rating" + index} color={"orange"} size={20} />;
  });

  return (
    <>
      <div className="info-item">
        <h5>Phone:</h5>
        <p>{guestsData[guestFormId].phone}</p>
      </div>
      <div className="info-item">
        <h5>Mark:</h5>
        <div>{stars}</div>
      </div>

      <div></div>
      <div className="info-item">
        <h5>Comment:</h5>
        <p className="comment">{guestsData[guestFormId].comment}</p>
      </div>
      <Button color="danger" onClick={deleteFeedback}>
        Delete Feedback
      </Button>
    </>
  );
}
