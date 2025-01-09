"use client";
import { useEffect, useState } from "react";
import Card from "../../../../components/Card/Card";
import styles from "./leader.module.css";
import getRegisteredDeckByLeader from "@/api/Deck/getRegisteredDeckByLeader";
import DeckListContainer from "../../../../components/DeckListContainer/DeckListContainer";
import RegisteredDeck from "../../../../interface/RegisteredDeck";

const Leader = ({ params }: { params: { code: string } }) => {
  const [deck, setDeck] = useState<RegisteredDeck[]>([]);
  const [selectedDeck, setSelectedDeck] = useState<string>("");

  useEffect(() => {
    const fetchDecks = async () => {
      try {
        const data = (await getRegisteredDeckByLeader(params.code)) || [];
        setDeck(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDecks();
  }, [params.code]);

  return (
    <div>
      <div className={styles.container}>
        <Card
          cardType="leader"
          code={params.code}
          active
          handleCardClick={() => {}}
        />
        <div className={styles.txtArea}>
          <h1>Leader Name</h1>
          <select
            value={selectedDeck}
            name="deck_list"
            id="deck_list"
            onChange={(e) => setSelectedDeck(e.target.value)}
          >
            <option value="">Select a Deck</option>
            {deck?.map((i) => {
              return (
                <option key={i.id} value={i.id}>
                  {i.name}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className={styles.container}>{selectedDeck && <DeckListContainer deckId={selectedDeck} />}</div>
    </div>
  );
};

export default Leader;
