// DEPRECATED PAGE
"use client";
import { useState } from "react";
import DeckLoader from "../../../components/DeckLoader/DeckLoader";
import { CardType } from "../../../interface/Card";
import DeckListContainer from "../../../components/DeckListContainer/DeckListContainer";

const Build = () => {
  const [deck, setDeck] = useState<CardType[] | null>(null);

  if (deck) {
    return (
      // <DeckListContainer deck={deck}/>""
      <h2>todo..</h2>
    );
  }
  return (
    <div>
      <DeckLoader setDeck={setDeck} />
    </div>
  );
};

export default Build;
