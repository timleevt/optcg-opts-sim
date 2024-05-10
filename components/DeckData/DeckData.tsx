import { useEffect, useState } from "react";
import { CardType } from "../../interface/Card";
import retrieveDeckData from "../../src/api/Deck/retrieveDeckData";
import styles from "./DeckData.module.css";

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
  keywords: { [key: string]: number };
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
        attributes.push([key, value]);
      }
    }
    for (const [key, value] of Object.entries(stats.type)) {
      if (key.length > 0) {
        types.push([key, value]);
      }
    }
    for (const [key, value] of Object.entries(stats.power)) {
      if (key !== "null") {
        power.push([key, value]);
      }
    }
    for (const [key, value] of Object.entries(stats.cost)) {
      if (key.length > 0 && key !== "null") {
        cost.push([key, value]);
      }
    }
  }

  return (
    <div className={styles.container}>
      <table style={{ textAlign: "left", backgroundColor: "#e0f2fe" }}>
        <tbody>
          <tr>
            <th>Counter</th>
          </tr>
          <tr>
            <td>1k:</td>
            <td>{stats.counter["c1k"]}</td>
          </tr>
          <tr>
            <td>2k:</td>
            <td>{stats.counter["c2k"]}</td>
          </tr>
          <tr>
            <td>Event Counter:</td>
            <td>{stats.counter["event"]}</td>
          </tr>
          <tr>
            <th>Keywords</th>
          </tr>
          <tr>
            <td>Trigger:</td>
            <td>{stats.keywords.Trigger || 0}</td>
          </tr>
          <tr>
            <td>Blocker:</td>
            <td>{stats.keywords.Blocker || 0}</td>
          </tr>
          <tr>
            <td>Rush:</td>
            <td>{stats.keywords.Rush || 0}</td>
          </tr>
          <tr>
            <td>Banish:</td>
            <td>{stats.keywords.Banish || 0}</td>
          </tr>
          <tr>
            <td>Double Attack:</td>
            <td>{stats.keywords.DoubleAttack || 0}</td>
          </tr>
          <tr>
            <th>Card Type</th>
          </tr>
          <tr>
            <td>Character:</td>
            <td>{stats.cardType["character"] || 0}</td>
          </tr>
          <tr>
            <td>Event:</td>
            <td>{stats.cardType["event"] || 0}</td>
          </tr>
          <tr>
            <td>Stage:</td>
            <td>{stats.cardType["stage"] || 0}</td>
          </tr>
        </tbody>
      </table>
      <table style={{ textAlign: "left" }}>
        <tbody>
          <tr>
            <th>Attribute</th>
          </tr>
          {attributes.map((i, index) => {
            return (
              <tr key={index}>
                <td>{i[0]}:</td>
                <td>{i[1]}</td>
              </tr>
            );
          })}
          <tr>
            <th>Types</th>
          </tr>
          {types.map((i, index) => {
            return (
              <tr key={index}>
                <td>{i[0]}:</td>
                <td>{i[1]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <table style={{ textAlign: "left", backgroundColor: "#e0f2fe" }}>
        <tbody>
          <tr>
            <th>Power</th>
          </tr>
          {power.map((i, index) => {
            return (
              <tr key={index}>
                <td>{i[0]}:</td>
                <td>{i[1]}</td>
              </tr>
            );
          })}
          <tr>
            <th>Cost</th>
          </tr>
          {cost.map((i, index) => {
            return (
              <tr key={index}>
                <td>{i[0]}:</td>
                <td>{i[1]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
