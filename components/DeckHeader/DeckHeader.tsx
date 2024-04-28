import Card from "../Card/Card";
import styles from "./DeckHeader.module.css";

type Props = {
  deckInfo: DeckInfo;
};
const DeckHeader = ({ deckInfo }: Props) => {
  return (
    <div className={styles.container}>
      <Card cardType="leader" code={deckInfo.leader} active handleCardClick={() => {}}/>
      <div className={styles.txtArea}>
        <h1>{deckInfo.name}</h1>
        <h2>{deckInfo.author}</h2>
      </div>
    </div>
  );
};

export default DeckHeader;
