import { CardType } from "../../interface/Card";

type Props = {
  deckList: CardType[] | null;
}

export default function DeckData({deckList}:Props) {
  if (!deckList) {
    return <div>Loading...</div>
  }

  let count1k = 0;
  let count2k = 0;

  for(let i = 0; i < deckList.length; i++) {
    if(deckList[i].counterPower === 1000) {
      count1k += deckList[i].copies;
    } else if(deckList[i].counterPower === 2000) {
      count2k += deckList[i].copies;
    }
  }
  return (

    <div>
      <h2>Counter</h2>
      <p>1k: {count1k}</p>
      <p>2k: {count2k}</p>
      <h2>Keyword</h2>
      <p>Trigger: 10</p>
      <p>Blocker: 10</p>
      <p>Banish: 5</p>
      <p>Rush: 5</p>
      <h2>Card Type</h2>
      <p>Char: 10</p>
      <p>Event: 10</p>
      <p>Stage: 10</p>
      <h2>Attribute</h2>
      <p>Range: 10</p>
      <p>Slash: 10</p>
      <h2>Attribute</h2>
      <p>Range: 10</p>
      <p>Slash: 10</p>
      <h1>Type</h1>
      <p>Land of Wano: 10</p>
      <p>Whitebeard Pirates: 10</p> 
    </div>
  );
}
