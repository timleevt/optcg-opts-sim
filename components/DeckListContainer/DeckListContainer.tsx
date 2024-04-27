import { CardType } from "../../interface/Card";
import Card from "../Card/Card";
import styles from "./DeckListContainer.module.css";

type Props = {
  deck: CardType[] | null; // take off null later
  handleCardClick: (code: string) => void;
  numDon: number;
  content: string;
};

const DeckListContainer = ({
  deck,
  handleCardClick,
  numDon,
  content,
}: Props) => {
  return (
    <div className={styles.container}>
      {deck?.map((i) => {
        return (
          <Card
            key={i.code}
            cardType={i.cardType}
            code={i.code}
            active={
              content !== "combo" ||
              (content === "combo" && i.cost != null && numDon >= i.cost)
            }
            numCopies={i.copies}
            handleCardClick={handleCardClick}
          />
        );
      })}
    </div>
  );
};

export default DeckListContainer;
