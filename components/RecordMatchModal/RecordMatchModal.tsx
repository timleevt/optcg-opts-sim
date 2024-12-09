import { useState } from "react";
import { CardType } from "../../interface/Card";
import styles from "./RecordMatchModal.module.css";
import postMatchResult from "../../src/api/Deck/postMatchResult";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type DeckData = {
  name: string;
  leader: string;
  id: number;
};

type Props = {
  userId: string;
  handleClose: (show: boolean) => void;
  leaders: CardType[];
  decks: DeckData[];
};
const RecordMatchModal = ({ userId, leaders, handleClose, decks }: Props) => {
  const [diceResult, setDiceResult] = useState("W");
  const [turnOrder, setTurnOrder] = useState("1st");
  const [matchResult, setMatchResult] = useState("W");
  const [eventName, setEventName] = useState("");
  const [myDeck, setMyDeck] = useState(decks[0].id);
  const [oppDeck, setOppDeck] = useState(leaders[0].code);

  if (!leaders || !decks || !userId) {
    return <div>Something went wrong</div>;
  }

  const handleSubmit = async () => {
    const reqData = {
      userId,
      deckId: myDeck,
      leader: oppDeck,
      event: eventName,
      turn: turnOrder === "1st" ? 1 : 2,
      dice: diceResult,
      result: matchResult,
    };
    try {
      toast("🦄 Wow so easy!", {
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      });
      await postMatchResult(reqData);
    } catch (e) {
      toast.error("Something went wrong", {
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      });
      console.log(e);
    }
    return;
  };

  return (
    <div>
      <ToastContainer />
      <div
        className={styles.modalBackground}
        onClick={() => handleClose(false)}
      >
        <div
          className={styles.modalContent}
          onClick={(e) => e.stopPropagation()}
        >
          <span className={styles.close} onClick={() => handleClose(false)}>
            &times;
          </span>

          <div className={styles.formContainer}>
            <label htmlFor="mydeck">My Deck</label>
            <select
              name="mydeck"
              id="mydeck"
              onChange={(e) => setMyDeck(parseInt(e.target.value))}
            >
              {decks.map((i, index) => {
                return (
                  <option
                    key={index}
                    value={i.id}
                  >{`[${i.leader}] ${i.name}`}</option>
                );
              })}
            </select>
            <label htmlFor="oppdeck">Opponent Leader</label>
            <select
              name="oppdeck"
              id="oppdeck"
              defaultValue={leaders[0].code}
              onChange={(e) => setOppDeck(e.target.value)}
            >
              {leaders.map((i) => {
                return (
                  <option key={i.code} value={i.code}>{`[${i.code}] ${
                    i.name
                  } [${i.colors.join("/")}]`}</option>
                );
              })}
            </select>
            <label htmlFor="eventName">Event Name</label>
            <input
              type="text"
              name="eventName"
              id="eventName"
              placeholder="Event Name (Optional)"
              onChange={(e) => setEventName(e.target.value)}
            />
            <div className={styles.resultContainer}>
              <span>Dice Roll</span>
              <button
                className={
                  diceResult === "W" ? styles.winButton : styles.lossButton
                }
                onClick={() => setDiceResult(diceResult === "W" ? "L" : "W")}
              >
                {diceResult}
              </button>
            </div>
            <div className={styles.resultContainer}>
              <span>Turn Order</span>
              <button
                onClick={() =>
                  setTurnOrder(turnOrder === "1st" ? "2nd" : "1st")
                }
              >
                {turnOrder}
              </button>
            </div>
            <div className={styles.resultContainer}>
              <span>Result</span>
              <button
                className={
                  matchResult === "W" ? styles.winButton : styles.lossButton
                }
                onClick={() => setMatchResult(matchResult === "W" ? "L" : "W")}
              >
                {matchResult}
              </button>
            </div>
            <button onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordMatchModal;
