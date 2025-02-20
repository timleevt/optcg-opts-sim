// DEPRECATED PAGE
"use client";
import { useState } from "react";
import DeckLoader from "../../../components/DeckLoader/DeckLoader";
import { CardType } from "../../../interface/Card";

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
      <p>lmao i dont remember if this page works</p>
      <DeckLoader setDeck={setDeck} />
    </div>
  );
};

export default Build;
