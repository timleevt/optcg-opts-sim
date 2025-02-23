"use client";
import getDeckListById from "@/api/Deck/getDeckListById";
// import Card from "../../../../components/Card/Card";
import DeckListContainer from "../../../../components/DeckListContainer/DeckListContainer";
import { CardType } from "../../../../interface/Card";
import { useEffect, useState } from "react";
import DeckData from "../../../../components/DeckData/DeckData";
import styles from "../archive.module.css";

const ArchiveDeck = ({ params }: { params: { id: string } }) => {
  const [deckInfo, setDeckInfo] = useState<CardType[]>([]);
  useEffect(() => {
    const fetchDeck = async () => {
      try {
        const res = await getDeckListById(parseInt(params.id));
        setDeckInfo(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDeck();
  }, [params.id]);
  return (
    <div className={styles.infoContainer}>
      <DeckListContainer deckId={params.id} />
      <ul>
        {deckInfo.map((i) => {
          return (
            <li key={i.code}>{i.code + " " + i.name + " x" + i.copies}</li>
          );
        })}
      </ul>
      <DeckData deckList={deckInfo} />
    </div>
  );
};

export default ArchiveDeck;
