import { useEffect, useState } from "react";
import { CardType } from "../../interface/Card";
import Card from "../Card/Card";
import RecordMatchModal from "../RecordMatchModal/RecordMatchModal";
import styles from "./MatchHistory.module.css";
// import getMatchHistory from "../../api/Deck/getMatchHistory";

type Props = {
  deckId: number;
  leaders: CardType[] | null;
  matchHistory: MatchData[];
};

type MatchData = {
  id: string;
  deckId: number;
  leader: string;
  eventName: string;
  diceResult: string;
  result: string;
  turnOrder: number;
};

const MatchHistory = ({ deckId, leaders, matchHistory }: Props) => {
  const [showRecordModal, setShowRecordModal] = useState(false);

  if (!leaders && !matchHistory) {
    return <div>loading...</div>;
  }

  return (
    <div className={styles.container}>
      <button className={styles.btn} onClick={() => setShowRecordModal(true)}>
        Record Match
      </button>
      <hr style={{ width: "100%" }} />
      <div className={styles.matchesContainer}>
        {matchHistory.map((i) => {
          return (
            <div
              key={i.id}
              className={styles.matchHistoryContainer}
              style={i.result === "L" ? { backgroundColor: "#ffe4e6" } : {}}
            >
              <span className={styles.eventName}>{i.eventName}</span>
              <div className={styles.matchInfo}>
                <span>VS.</span>{" "}
                <Card code={i.leader} mini active handleCardClick={() => {}} />
                <span>&#9861; {i.diceResult}</span>
                <span>Turn: {i.turnOrder === 1 ? "First" : "Second"}</span>
              </div>
            </div>
          );
        })}
      </div>
      {showRecordModal && (
        <RecordMatchModal
          deckId={deckId}
          leaders={leaders}
          handleClose={setShowRecordModal}
        />
      )}
    </div>
  );
};

export default MatchHistory;
