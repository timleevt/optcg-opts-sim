"use client";
import { useState } from "react";
import DeckLoader from "../components/DeckLoader/DeckLoader";

const Build = () => {
  const [deck, setDeck] = useState('');

  if (deck) {
    return (
      <div>
        <h1>Loaded deck here</h1>
      </div>
    );
  }
  return (
    <div>
      <DeckLoader />
    </div>
  );
};

export default Build;
