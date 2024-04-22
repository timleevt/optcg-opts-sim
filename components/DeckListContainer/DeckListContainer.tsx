import { CardType } from "../../interface/Card";
import Card from "../Card/Card";
import styles from './DeckListContainer.module.css';

type Props = {
  deck: CardType[] | null; // take off null later
};

const DeckListContainer = ({ deck }: Props) => {
  return (
    <div className={styles.container}>
      {deck?.map(i => {
        return (<Card key={i.code} cardType={i.cardType} code={i.code} active={true} numCopies={i.copies} />)
      })}
      
    </div>
  );
};

export default DeckListContainer;
