import Image from "next/image";
import styles from "./Card.module.css";

type Props = {
  code: string;
  cardType?: string;
  //   cost: number | null;
  //   type: string | string[];
  //   power: number | null;
  //   attribute: string | null;
  //   counter: number | null;
  //   color: string | string[];
  //   effect: string;
  numCopies?: number;
  active: boolean;
  mini?: boolean;
  handleCardClick: (code: string) => void;
};

const Card = ({
  code,
  cardType,
  //   cost,
  //   type,
  //   power,
  //   attribute,
  //   counter,
  //   color,
  //   effect,
  active,
  mini,
  numCopies,
  handleCardClick,
}: Props) => {
  return (
    // TODO: figure out placeholder loader for Image
    <div className={styles.container}>
      <Image
        src={
          "https://en.onepiece-cardgame.com/images/cardlist/card/" +
          code +
          ".png?240202"
        }
        width={mini ? 52 : 92}
        height={mini ? 73 : 128}
        alt={code}
        onClick={() => {
          handleCardClick(code);
        }}
        style={active ? {} : { filter: "brightness(50%)" }}
        placeholder="blur"
        blurDataURL="/images/loading.gif"
      />
      {numCopies && cardType != "Leader" && (
        <span className={styles.numCopies}>
          {numCopies ? `${numCopies}x` : ""}
          <span></span>
        </span>
      )}
    </div>
  );
};

export default Card;
