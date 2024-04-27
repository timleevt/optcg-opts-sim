import { CardType } from "../../interface/Card";
import Card from "../Card/Card";
import RecordMatchModal from "../RecordMatchModal/RecordMatchModal";
import styles from "./MatchHistory.module.css";

type Props = {
  leaders: CardType[] | null;
}

const MatchHistory = ({leaders}:Props) => {
  if(!leaders) {
    return <div>loading...</div>
  }
  return (
    <div className={styles.container}>
      <button className={styles.btn}>Record Match</button>
      <hr style={{ width: "100%" }} />
      <div className={styles.matchHistoryContainer}>
        <span>VS.</span>{" "}
        <Card code={"OP06-080"} mini active handleCardClick={() => {}} />
        <span>&#9861; WIN</span>
        <span>Turn: 1st</span>
      </div>
      <div className={`${styles.matchHistoryContainer} ${styles.loss}`}>
        <span>VS.</span>{" "}
        <Card code={"OP06-080"} mini active handleCardClick={() => {}} />
        <span>&#9861; LOSS</span>
        <span>Turn: 2nd</span>
      </div>
      {/* <RecordMatchModal leaders={leaders}/> */}
    </div>
  );
};

export default MatchHistory;
