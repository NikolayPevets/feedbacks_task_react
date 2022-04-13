import GuestFormModal from "./components/guest-form-modal/guest-form-modal";
import { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Context } from "./context";
import GuestsTable from "./components/table/table";
import Preloader from "./components/preloader/preloader";
import { Button } from "reactstrap";
import { HiRefresh } from "react-icons/hi";

function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [starRateValue, setStarRateValue] = useState(3);
  const [guestsData, setGuestsData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [guestFormId, setGuestFormId] = useState(0);
  const URL = "https://gp-js-test.herokuapp.com/pizza/";
  const [onError, setOnError] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("guestsList") !== null) {
      setGuests();
      setIsLoaded(true);
    } else {
      getGuestsData();
      setGuests();
    }
  }, []);

  const getGuestsData = () => {
    let guestsList = [];
    fetch(URL + "guests")
      .then((response) => response.json())
      .then((data) => {
        console.log(data.party, "data");
        guestsList = data.party;
        let namesList = [];
        for (let i = 0; i < data.party.length; i++) {
          if (data.party[i].eatsPizza) {
            namesList.push(data.party[i].name);
          }
        }
        namesList = namesList.join(",");
        return namesList;
      })
      .then((namesList) => {
        return fetch(URL + "world-diets-book/" + namesList);
      })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.diet);
        let concat = guestsList.map((item, index) => ({
          key: index,
          name: item.name,
          eatsPizza: item.eatsPizza,
          madeFeedback: false,
          comment: "",
          phone: "",
          stars: 3
        }));
        const fullGuestData = concat.map((a, index) => ({
          key: index,
          ...a,
          ...data.diet.find((b) => b.name === a.name)
        }));
        localStorage.setItem("guestsList", JSON.stringify(fullGuestData));
        setGuestsData(JSON.parse(localStorage.getItem("guestsList")));
        setIsLoaded(true);
      })
      .catch((e) => setOnError(true));
  };

  const setGuests = () => {
    setGuestsData(JSON.parse(localStorage.getItem("guestsList")));
  };

  const openGuestForm = (id) => {
    setShowModal(!showModal);
    setGuestFormId(id);
  };

  const showFeedbackForm = (id) => {
    setShowModal(!showModal);
    setGuestFormId(id);
  };

  const closeGuestForm = () => {
    setShowModal(false);
    setStarRateValue(3);
  };

  const showGuestForm = () => {
    setShowModal(true);
  };

  const setStars = (ratingValue) => {
    setStarRateValue(ratingValue);
  };

  const refreshData = () => {
    setOnError(false);
    setGuestsData(JSON.parse(localStorage.getItem("guestsList")));
    setStarRateValue(3);
  };
  const resetApp = () => {
    setIsLoaded(false);
    setOnError(false);
    localStorage.removeItem("guestsList");
    getGuestsData();
    localStorage.setItem("guestsList", JSON.stringify(guestsData));
  };
  if (!isStarted) {
    return (
      <>
        <div className="start">
          <Button
            color="primary"
            onClick={() => {
              setIsStarted(true);
            }}
          >
            LOAD DATA
          </Button>
        </div>
      </>
    );
  } else {
    return (
      <>
        {onError ? (
          <div className="load-error">
            <Button color="danger" onClick={resetApp}>
              RETRY
            </Button>
            <p>loading error</p>
          </div>
        ) : null}
        {isLoaded === true && !onError ? (
          <Context.Provider
            value={{
              setStars,
              showFeedbackForm,
              openGuestForm,
              showGuestForm,
              closeGuestForm,
              guestFormId,
              starRateValue,
              refreshData,
              setShowModal,
              guestsData
            }}
          >
            <GuestsTable guestsData={guestsData} />
            <GuestFormModal
              starRateValue={starRateValue}
              showModal={showModal}
              guestFormId={guestFormId}
              guestsData={guestsData}
            />
            <div className="delete-btn">
              <Button color="danger" onClick={resetApp}>
                <HiRefresh />
              </Button>
            </div>
          </Context.Provider>
        ) : onError ? null : (
          <Preloader />
        )}
      </>
    );
  }
}

export default App;
