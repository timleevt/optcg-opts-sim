import { useEffect, useState } from "react";
import { CardType } from "../../interface/Card";
import retrieveDeckData from "../../src/api/Deck/retrieveDeckData";

type Props = {
  deckList: CardType[] | null;
};

type Stats = {
  attribute: { [key: string]: number };
  cardType: {
    character: number;
    event: number;
    stage: number;
  };
  cost: { [key: number]: number };
  counter: {
    c1k: number;
    c2k: number;
    event: number;
  };
  power: { [key: number]: number };
  type: { [key: string]: number };
  keywords: { [key: string]: number};
};

export default function DeckData({ deckList }: Props) {
  const [stats, setStats] = useState<Stats | null>(null);
  useEffect(() => {
    if (deckList) {
      retrieveDeckData(deckList)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setStats(data);
        });
    }
  }, [deckList]);

  if (!deckList || !stats) {
    return <div>Loading...</div>;
  }

  const attributes = [];
  const types = [];
  const power = [];
  const cost = [];
  if (stats) {
    for (const [key, value] of Object.entries(stats.attribute)) {
      if (key.length > 0) {
        attributes.push(
          <p>
            {key} : {value}
          </p>
        );
      }
    }
    for (const [key, value] of Object.entries(stats.type)) {
      if (key.length > 0) {
        types.push(
          <p>
            {key} : {value}
          </p>
        );
      }
    }
    for (const [key, value] of Object.entries(stats.power)) {
      if (key !== "null") {
        power.push(
          <p>
            {key} : {value}
          </p>
        );
      }
    }
    for (const [key, value] of Object.entries(stats.cost)) {
      if (key.length > 0 && key !== "null") {
        cost.push(
          <p>
            {key} : {value}
          </p>
        );
      }
    }
  }

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "16px",
        justifyContent: "space-between",
      }}
    >
      <div>
        <h2>Counter</h2>
        <p>1k: {stats.counter["c1k"]}</p>
        <p>2k: {stats.counter["c2k"]}</p>
      </div>
      <div>
        <h2>Keyword</h2>
        <p>Trigger: {stats.keywords.Trigger || 0}</p>
        <p>Blocker: {stats.keywords.Blocker || 0}</p>
        <p>Banish: {stats.keywords.Banish || 0}</p>
        <p>Rush: {stats.keywords.Rush || 0}</p>
        <p>Double Attack: {stats.keywords.DoubleAttack || 0}</p>
      </div>
      <div>
        <h2>Card Type</h2>
        <p>Char: {stats.cardType["character"]}</p>
        <p>Event: {stats.cardType["event"]}</p>
        <p>Stage: {stats.cardType["stage"]}</p>
      </div>
      <div>
        <h2>Attribute</h2>
        {attributes}
      </div>
      <div>
        <h2>Type</h2>
        {types}
      </div>
      <div>
        <h2>Power</h2>
        {power}
      </div>
      <div>
        <h2>Cost</h2>
        {cost}
      </div>
    </div>
  );
}
