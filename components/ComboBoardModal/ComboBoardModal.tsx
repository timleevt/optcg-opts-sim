import { useState } from "react";
import styles from "./ComboBoardModal.module.css";
import { CardType } from "../../interface/Card";
import Card from "../Card/Card";
import DonBoard from "../DonBoard/DonBoard";

type Props = {
  cards: CardType[];
};
const ComboBoardModal = ({ cards }: Props) => {
  const [numDon, setNumDon] = useState(0);
  const [activeBoard, setActiveBoard] = useState("current");

  const calculateEndCurve = () => {
    let rampCounter = 0;
    // for (let i = 0; i < comboBoard.length; i++) {
    //   if (comboBoard[i] === "!active" || comboBoard[i] === "!rested") {
    //     rampCounter += 1;
    //   } else if (comboBoard[i] === "!minus") {
    //     rampCounter -= 1;
    //   }
    // }
    return numDon + rampCounter;
  };

  const handleDonChange = (num: number) => {
    if (
      (numDon > 0 && numDon < 10) ||
      (numDon === 0 && num > 0) ||
      (numDon === 10 && num < 0)
    ) {
      setNumDon(numDon + num);
    }
  };

  //dummy handler
  const handleActionClick = (str: string) => {
    return;
  };
  return (
    <div>
      <div className={styles.modalBackground}>
        <div className={styles.modalContent}>
          <div className={styles.cardContainer}>
            {cards.map((i) => {
              return (
                <Card
                  key={i.code}
                  code={i.code}
                  active={i.cost ? numDon >= i.cost : true}
                />
              );
            })}
          </div>
          <DonBoard numDon={numDon} handleDonChange={handleDonChange} />
          {/* button area */}
          <div>
            <div className={styles.btnContainer}>
              <button onClick={() => handleActionClick("!leader")}>
                Leader Ability
              </button>
              <button onClick={() => handleActionClick("!attach")}>
                Attach DON!!
              </button>
              <button onClick={() => handleActionClick("!rest")}>
                Rest DON!!
              </button>
              <button onClick={() => handleActionClick("!active")}>
                DON!! Active +1
              </button>
              <button onClick={() => handleActionClick("!rested")}>
                DON!! Rested +1
              </button>
              <button onClick={() => handleActionClick("!minus")}>
                DON!! -1
              </button>
              <button onClick={() => handleActionClick("!cheat")}>
                Cheat Out
              </button>
              <button onClick={() => handleActionClick("!and")}>AND</button>
              <button onClick={() => handleActionClick("!or")}>OR</button>
              <button onClick={() => handleActionClick("!leftParenthesis")}>
                &#x28;
              </button>
              <button onClick={() => handleActionClick("!rightParenthesis")}>
                &#x29;
              </button>
              <button onClick={() => handleActionClick("!undo")}>Undo</button>
              <button onClick={() => handleActionClick("!clear")}>Clear</button>
              <button onClick={() => handleActionClick("!clearA")}>
                Clear All
              </button>
            </div>
            <div className={styles.curveTextContainer}>
              <span className={styles.curveText}>Start Curve: {numDon}</span>
              <span className={styles.curveText}>
                End Curve: {calculateEndCurve()}
              </span>
            </div>
            <h3>Current Board</h3>
            <div
              className={styles.comboContainer}
              onClick={() => setActiveBoard("current")}
              style={
                activeBoard === "current" ? { border: "3px solid red" } : {}
              }
            >
              {/* {currBoard.map((i, index) => {
          return (
            <Card key={index} code={i} mini active handleCardClick={() => {}} />
          );
        })} */}
            </div>
            <h3>Combo</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComboBoardModal;
