"use client";
import { useEffect, useState } from "react";
import { CardType } from "../../interface/Card";
import Card from "../Card/Card";
import styles from "./DeckListContainer.module.css";
import getDeckListById from "@/api/Deck/getDeckListById";

type Props = {
  deckId: string;
};

const DeckListContainer = ({ deckId }: Props) => {
  const [deck, setDeck] = useState<CardType[]>([]);

  useEffect(() => {
    const fetchDeck = async () => {
      try {
        const data = await getDeckListById(parseInt(deckId));
        setDeck(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDeck();
  }, [deckId]);

  return (
    <div className={styles.container}>
      {deck?.map((i) => {
        return (
          <Card key={i.code} code={i.code} active numCopies={i.copies || 0} />
        );
      })}
    </div>
  );
};

export default DeckListContainer;
