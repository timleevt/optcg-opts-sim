"use client";

import getDeckInfo from "../../../../api/Deck/getDeckInfo";
import getDeckListById from "../../../../api/Deck/getDeckListById";
import Card from "../../../../components/Card/Card";
import DeckHeader from "../../../../components/DeckHeader/DeckHeader";
import DeckListContainer from "../../../../components/DeckListContainer/DeckListContainer";
import { useEffect, useState } from "react";
import { CardType } from "../../../../interface/Card";
import styles from "../decks.module.css";
import ContentNav from "../../../../components/ContentNav/ContentNav";
import DeckData from "../../../../components/DeckData/DeckData";
import ComboArea from "../../../../components/ComboArea/ComboArea";

const Deck = ({ params }: { params: { id: number } }) => {
  // State variables
  const [deckInfo, setDeckInfo] = useState<DeckInfo | null>();
  const [deckList, setDeckList] = useState<CardType[] | null>();
  const [content, setContent] = useState<string>("data");
  const [numDon, setNumDon] = useState<number>(1);

  // API Calls
  const retrieveDeckInfo = async () => {
    const res = await getDeckInfo(params.id);
    setDeckInfo(res);
  };

  const retrieveDeckList = async () => {
    const res = await getDeckListById(params.id);
    setDeckList(res);
  };

  // Use Effect Calls
  useEffect(() => {
    retrieveDeckInfo();
    retrieveDeckList();
  }, []);

  // Event Handlers
  const handleDonChange = (num: number) => {
    if (
      (numDon > 0 && numDon < 10) ||
      (numDon === 0 && num > 0) ||
      (numDon === 10 && num < 0)
    ) {
      setNumDon(numDon + num);
    }
  };

  return (
    <div>
      {deckInfo && <DeckHeader deckInfo={deckInfo} />}
      <div className={styles.mainContent}>
        {deckList && <DeckListContainer deck={deckList} />}
        <div>
          <ContentNav content={content} setContent={setContent} />
          {content === "data" && <DeckData />}
          {content === "matchup" && <DeckData />}
          {content === "combo" && (
            <ComboArea numDon={numDon} handleDonChange={handleDonChange} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Deck;
