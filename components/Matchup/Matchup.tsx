import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { CardType } from "../../interface/Card";
import styles from "./Matchup.module.css";
import Card from "../Card/Card";

type Props = {
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

type MatchStats = {
  wins: number;
  wins1st: number;
  wins2nd: number;
  loss: number;
  loss1st: number;
  loss2nd: number;
  numMatches: number;
  numMatches1st: number;
  numsMatches2nd: number;
};

const Matchup = ({ leaders, matchHistory }: Props) => {
  const [selectedLeader, setSelectedLeader] = useState<null | string>(null);
  const [matchStats, setMatchStats] = useState<MatchStats | null>(null);

  const calcWinPercent = (lead: string | null) => {
    if (!selectedLeader || selectedLeader === "") {
      return;
    }
    const matches = matchHistory.filter((i) => i.leader === lead);
    const res = {
      wins: matches.filter((i) => i.result === "W").length,
      wins1st: matches.filter((i) => i.result === "W" && i.turnOrder === 1)
        .length,
      wins2nd: matches.filter((i) => i.result === "W" && i.turnOrder === 2)
        .length,
      loss: matches.filter((i) => i.result === "L").length,
      loss1st: matches.filter((i) => i.result === "L" && i.turnOrder === 1)
        .length,
      loss2nd: matches.filter((i) => i.result === "L" && i.turnOrder === 2)
        .length,
      numMatches: matches.length,
      numMatches1st: 0,
      numsMatches2nd: 0,
    };
    res.numMatches1st = res.wins1st + res.loss1st;
    res.numsMatches2nd = res.wins2nd + res.loss2nd;
    setMatchStats(res);
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "") {
      return;
    }
    setSelectedLeader(e.target.value);
  };

  useEffect(() => {
    calcWinPercent(selectedLeader);
  }, [selectedLeader]);

  const matchLeaders = new Set(matchHistory?.map((i) => i.leader));
  const leaderList = leaders?.filter((i) => matchLeaders.has(i.code));

  if (!leaders && !matchHistory) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div className={styles.matchupHeader}>
        <h2>VS.</h2>
        <select name="leaders" id="leaders" onChange={(e) => handleChange(e)}>
          <option value="">--- Select Leader ---</option>
          {leaderList?.map((i) => {
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
            {matchStats && (
              <div className={styles.statContainer}>
                <span className={styles.overallTurnWin}>
                  {(matchStats.wins / matchStats.numMatches) * 100}% (
                  <span className={styles.win}>{matchStats.wins}</span>/{" "}
                  <span className={styles.loss}>{matchStats.loss}</span>)
                </span>

                <span className={styles.turnWin}>
                  Going 1st:{" "}
                  {matchStats.numMatches1st !== 0 ? (
                    <>
                      {(matchStats.wins1st / matchStats.numMatches1st) * 100}% (
                      <span className={styles.win}>{matchStats.wins1st}</span>/{" "}
                      <span className={styles.loss}>{matchStats.loss1st}</span>)
                    </>
                  ) : (
                    <span> -- </span>
                  )}
                </span>
                <span className={styles.turnWin}>
                  Going 2nd:{" "}
                  {matchStats.numsMatches2nd !== 0 ? (
                    <>
                      {(matchStats.wins2nd / matchStats.numsMatches2nd) * 100}%
                      (<span className={styles.win}>{matchStats.wins2nd}</span>/{" "}
                      <span className={styles.loss}>{matchStats.loss2nd}</span>)
                    </>
                  ) : (
                    <span> -- </span>
                  )}
                </span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Matchup;
