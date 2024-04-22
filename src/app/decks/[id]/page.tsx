"use client";

import getDeckInfo from "../../../../api/Deck/getDeckInfo";
import getDeckListById from "../../../../api/Deck/getDeckListById";
import Card from "../../../../components/Card/Card";
import DeckHeader from "../../../../components/DeckHeader/DeckHeader";
import DeckListContainer from "../../../../components/DeckListContainer/DeckListContainer";
import { useEffect, useState } from "react";
import { CardType } from "../../../../interface/Card";
import styles from '../decks.module.css';

const Deck = ({ params }: { params: { id: number } }) => {
  const [deckInfo, setDeckInfo] = useState<DeckInfo | null>();
  const [deckList, setDeckList] = useState<CardType[] | null>();

  const retrieveDeckInfo = async () => {
    const res = await getDeckInfo(params.id);
    setDeckInfo(res);
  };

  const retrieveDeckList = async () => {
    const res = await getDeckListById(params.id);
    setDeckList(res);
  };

  useEffect(() => {
    retrieveDeckInfo();
    retrieveDeckList();
  }, []);

  return (
    <div>
      {deckInfo && <DeckHeader deckInfo={deckInfo} />}
      <div className={styles.mainContent}>{deckList && <DeckListContainer deck={deckList} />}</div>
    </div>
  );
};

export default Deck;
