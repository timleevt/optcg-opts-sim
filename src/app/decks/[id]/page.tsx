"use client";

import getDeckInfo from "../../../../api/Deck/getDeckInfo";
import getDeckListById from "../../../../api/Deck/getDeckListById";
import DeckHeader from "../../../../components/DeckHeader/DeckHeader";
import DeckListContainer from "../../../../components/DeckListContainer/DeckListContainer";
import { useEffect, useState } from "react";
import { CardType } from "../../../../interface/Card";
import styles from "../decks.module.css";
import ContentNav from "../../../../components/ContentNav/ContentNav";
import DeckData from "../../../../components/DeckData/DeckData";
import ComboArea from "../../../../components/ComboArea/ComboArea";
import ComboListModal from "../../../../components/ComboListModal/ComboListModal";
import getComboById from "../../../../api/Deck/getComboById";
import { ComboType } from "../../../../interface/Combo";

const Deck = ({ params }: { params: { id: number } }) => {
  // State variables
  const [deckInfo, setDeckInfo] = useState<DeckInfo | null>();
  const [deckList, setDeckList] = useState<CardType[] | null>(null);
  const [content, setContent] = useState<string>("combo");
  const [numDon, setNumDon] = useState<number>(1);
  const [activeBoard, setActiveBoard] = useState<string>("current");
  const [currBoard, setCurrBoard] = useState<string[]>([]);
  const [comboBoard, setComboBoard] = useState<string[]>([]);
  const [showComboModal, setShowComboModal] = useState<boolean>(false);
  const [combos, setCombos] = useState<ComboType[]>(); // fix typing

  // API Calls
  const retrieveDeckInfo = async () => {
    const res = await getDeckInfo(params.id);
    setDeckInfo(res);
  };

  const retrieveDeckList = async () => {
    const res = await getDeckListById(params.id);
    setDeckList(res);
  };

  const retrieveCombos = async () => {
    const res = await getComboById(params.id);
    setCombos(res);
  };

  // Use Effect Calls
  useEffect(() => {
    retrieveDeckInfo();
    retrieveDeckList();
  }, []);

  // see if this ends up being too expensive
  useEffect(() => {
    retrieveCombos();
  }, [showComboModal]);

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

  const handleCardClick = (code: string) => {
    activeBoard === "current"
      ? setCurrBoard([...currBoard, code])
      : setComboBoard([...comboBoard, code]);
  };

  const handleActionClick = (action: string) => {
    if (action === "!clearA") {
      setComboBoard([]);
      setCurrBoard([]);
      return;
    }

    let targetBoard = activeBoard === "current" ? currBoard : comboBoard;

    if (action === "!clear") {
      activeBoard === "current" ? setCurrBoard([]) : setComboBoard([]);
      return;
    }

    if (action === "!undo") {
      let temp = [...targetBoard];
      temp.pop();
      activeBoard === "current"
        ? setCurrBoard([...temp])
        : setComboBoard([...temp]);
      return;
    }

    if (action.includes("!") && activeBoard === "current") {
      return;
    }

    activeBoard === "current"
      ? setCurrBoard([...currBoard, action])
      : setComboBoard([...comboBoard, action]);
  };

  const handleComboModal = () => {
    setShowComboModal(!showComboModal);
  };

  return (
    <div>
      {showComboModal && combos && (
        <ComboListModal handleClose={setShowComboModal} combos={combos} />
      )}
      {deckInfo && <DeckHeader deckInfo={deckInfo} />}
      <div className={styles.mainContent}>
        {deckList ? (
          <DeckListContainer
            deck={deckList}
            handleCardClick={handleCardClick}
            numDon={numDon}
            content={content}
          />
        ) : (
          <div className={styles.deckListPlaceholder}>loading...</div>
        )}
        <div>
          <ContentNav
            content={content}
            setContent={setContent}
            handleComboModal={handleComboModal}
          />
          {content === "data" && <DeckData deckList={deckList} />}
          {content === "matchup" && <h1>Coming soon...</h1> }
          {content === "track" && <h1>Coming soon...</h1> }
          {content === "combo" && (
            <ComboArea
              leader={deckInfo?.leader}
              deckId={deckInfo?.id}
              numDon={numDon}
              handleDonChange={handleDonChange}
              currBoard={currBoard}
              comboBoard={comboBoard}
              handleActionClick={handleActionClick}
              activeBoard={activeBoard}
              setActiveBoard={setActiveBoard}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Deck;
