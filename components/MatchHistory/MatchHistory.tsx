import { useState } from "react";
import { CardType } from "../../interface/Card";
import Card from "../Card/Card";
import styles from "./MatchHistory.module.css";

type DeckData = {
  name: string;
  leader: string;
  id: number;
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

type Props = {
  matchHistory: MatchData[];
  decks: DeckData[];
};

const MatchHistory = ({ matchHistory, decks }: Props) => {
  const resultWCount = matchHistory.filter((obj) => obj.result === "W").length;
  return (
    <div className={styles.container}>
      <hr style={{ width: "100%" }} />
      <div style={{ fontWeight: "500" }}>
        {" "}
        <span style={{ color: "#16a34a" }}>W {resultWCount} </span>/{" "}
        <span style={{ color: "#e11d48" }}>{matchHistory.length} L</span>{" "}
      </div>
      <div className={styles.matchesContainer}>
        {matchHistory.map((i) => {
          const deck = decks.find((e) => e.id === i.deckId);
          const deckInfo = deck ? `${deck.name}` : "";
          return (
            <div
              key={i.id}
              className={styles.matchHistoryContainer}
              style={i.result === "L" ? { backgroundColor: "#ffe4e6" } : {}}
            >
              <div className={styles.matchInfo}>
                <div>{deckInfo}</div>
                {deck && (
                  <Card
                    code={deck.leader}
                    active
                    extraSmall
                    handleCardClick={() => {}}
                  />
                )}
                <span>VS.</span>{" "}
                <Card
                  code={i.leader}
                  extraSmall
                  active
                  handleCardClick={() => {}}
                />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span className={styles.eventName}>{i.eventName}</span>
                  <span>&#9861; {i.diceResult}</span>
                  <span>Turn: {i.turnOrder === 1 ? "1st" : "2nd"}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MatchHistory;
