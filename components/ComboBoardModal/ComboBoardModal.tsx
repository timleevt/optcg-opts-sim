import { useState } from "react";
import styles from "./ComboBoardModal.module.css";
import { CardType } from "../../interface/Card";
import Card from "../Card/Card";
import DonBoard from "../DonBoard/DonBoard";
import ComboBoard from "../ComboBoard/ComboBoard";

type Props = {
  leader: string;
  cards: CardType[];
  handleClose: (show: boolean) => void;
};
const ComboBoardModal = ({ leader, cards, handleClose }: Props) => {
  const [numDon, setNumDon] = useState(1);

  // Board specific
  const [activeBoard, setActiveBoard] = useState("current");
  const [currBoard, setCurrBoard] = useState<string[]>([]);
  const [comboBoard, setComboBoard] = useState<string[]>([]);

  //   Event Handlers
  const handleDonChange = (num: number) => {
    if (
      (numDon > 0 && numDon < 10) ||
      (numDon === 0 && num > 0) ||
      (numDon === 10 && num < 0)
    ) {
      setNumDon(numDon + num);
    }
  };

  const handleActionClick = (action: string) => {
    if (action === "!clearA") {
      setComboBoard([]);
      setCurrBoard([]);
      return;
    }

    let targetBoard = activeBoard === "current" ? currBoard : comboBoard;

    if (action === "!clear") {
      activeBoard === "current" ? setCurrBoard([]) : setComboBoard([]);
      return;
    }

    if (action === "!undo") {
      let temp = [...targetBoard];
      temp.pop();
      activeBoard === "current"
        ? setCurrBoard([...temp])
        : setComboBoard([...temp]);
      return;
    }

    if (action.includes("!") && activeBoard === "current") {
      return;
    }

    activeBoard === "current"
      ? setCurrBoard([...currBoard, action])
      : setComboBoard([...comboBoard, action]);
  };

  const handleCardClick = (code: string) => {
    activeBoard === "current"
      ? setCurrBoard([...currBoard, code])
      : setComboBoard([...comboBoard, code]);
  };

  return (
    <div>
      <div
        className={styles.modalBackground}
        onClick={() => handleClose(false)}
      >
        <div
          className={styles.modalContent}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.container}>
            <div className={styles.cardContainer}>
              {cards.map((i) => {
                return (
                  <Card
                    key={i.code}
                    code={i.code}
                    active={i.cost ? numDon >= i.cost : true}
                    handleCardClick={handleCardClick}
                  />
                );
              })}
            </div>
            <div>
              <DonBoard numDon={numDon} handleDonChange={handleDonChange} />
              <ComboBoard
                leader={leader}
                deckId={48}
                numDon={numDon}
                currBoard={currBoard}
                activeBoard={activeBoard}
                handleActionClick={handleActionClick}
                setActiveBoard={setActiveBoard}
                comboBoard={comboBoard}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComboBoardModal;
