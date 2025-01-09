"use client";
import { useEffect, useState } from "react";
import Card from "../../../../components/Card/Card";
import styles from "./leader.module.css";
import getRegisteredDeckByLeader from "@/api/Deck/getRegisteredDeckByLeader";
import DeckListContainer from "../../../../components/DeckListContainer/DeckListContainer";
import RegisteredDeck from "../../../../interface/RegisteredDeck";
import DeckData from "../../../../components/DeckData/DeckData";
import getDeckListById from "@/api/Deck/getDeckListById";
import { CardType } from "../../../../interface/Card";
import ComboListModal from "../../../../components/ComboListModal/ComboListModal";
import ComboBoard from "../../../../components/ComboBoard/ComboBoard";
import ComboBoardModal from "../../../../components/ComboBoardModal/ComboBoardModal";

const Leader = ({ params }: { params: { code: string } }) => {
  const [deck, setDeck] = useState<RegisteredDeck[]>([]);
  const [selectedDeckId, setselectedDeckId] = useState<string>("");
  const [selectedDeckInfo, setSelectedDeckInfo] = useState<CardType[]>([]);
  const [showComboBoard, setShowComboBoard] = useState(false); // temporarily set to true
  const [showComboModal, setShowComboModal] = useState(false);

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

  useEffect(() => {
    if (selectedDeckId === "") {
      return;
    }
    const fetchDeck = async () => {
      try {
        const res = await getDeckListById(parseInt(selectedDeckId));
        setSelectedDeckInfo(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDeck();
  }, [selectedDeckId]);

  return (
    <div>
      {
        showComboBoard && (
          // <ComboBoard />
          <ComboBoardModal cards={selectedDeckInfo}/>
        )
      }
      {showComboModal && (
        <ComboListModal
          leader={params.code}
          handleClose={() => {
            setShowComboModal(false);
          }}
          combos={[]}
        />
      )}
      <div className={styles.container}>
        <Card
          cardType="leader"
          code={params.code}
          active
          handleCardClick={() => {}}
        />
        <div className={styles.txtArea}>
          {/* <h1>Leader Name</h1> */}
          <select
            value={selectedDeckId}
            name="deck_list"
            id="deck_list"
            onChange={(e) => setselectedDeckId(e.target.value)}
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
          <button onClick={() => setShowComboBoard(true)}>Combo Board</button>
          <button onClick={() => setShowComboModal(true)}>Options</button>
        </div>
      </div>
      <div className={styles.container}>
        {selectedDeckId && (
          <>
            <DeckListContainer deckId={selectedDeckId} />
          </>
        )}
        {selectedDeckInfo && (
          <>
            
            <ul>
              {selectedDeckInfo?.map((i) => {
                return (
                  <li key={i.code}>
                    {i.code + " " + i.name + " x" + i.copies}
                  </li>
                );
              })}
            </ul>
            <DeckData deckList={selectedDeckInfo} />
          </>
        )}
      </div>
    </div>
  );
};

export default Leader;
