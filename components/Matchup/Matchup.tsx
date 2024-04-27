import { ChangeEvent, FormEvent, useState } from "react";
import { CardType } from "../../interface/Card";
import styles from "./Matchup.module.css";
import Card from "../Card/Card";

type Props = {
  leaders: CardType[] | null;
};

const Matchup = ({ leaders }: Props) => {
  const [selectedLeader, setSelectedLeader] = useState<null | string>(null);
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "") {
      return;
    }
    setSelectedLeader(e.target.value);
  };
  if (!leaders) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div className={styles.matchupHeader}>
        <h2>VS.</h2>
        <select name="leaders" id="leaders" onChange={(e) => handleChange(e)}>
          <option value="">--- Select Leader ---</option>
          {leaders?.map((i) => {
            return (
              <option key={i.code} value={i.code}>{`${i.code} ${
                i.name
              } [${i.colors.join("/")}]`}</option>
            );
          })}
        </select>
      </div>
      <div className={styles.matchupStats}>
        {selectedLeader && (
          <>
            <Card code={selectedLeader} active handleCardClick={() => {}} />
            <div className={styles.statContainer}>
              <span className={styles.overallTurnWin}>
                80% (<span className={styles.win}>26</span>/{" "}
                <span className={styles.loss}>8</span>)
              </span>
              <span className={styles.turnWin}>
                (1st) 80% (<span className={styles.win}>13</span>/{" "}
                <span className={styles.loss}>4</span>)
              </span>
              <span className={styles.turnWin}>
                (2st) 80% (<span className={styles.win}>13</span>/{" "}
                <span className={styles.loss}>4</span>)
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Matchup;
