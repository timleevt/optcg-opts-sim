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
  extraSmall?: boolean;
  handleCardClick?: (code: string) => void;
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
  extraSmall,
  numCopies,
  handleCardClick,
}: Props) => {
  const set = code.split("-")[0];
  const size = {
    width: mini ? 52 : (extraSmall ? 26 : 92),
    height: mini ? 73 : (extraSmall ? 37 : 128)
  };
  
  return (
    // TODO: figure out placeholder loader for Image
    <div className={styles.container}>
      <Image
        // src={
        //   "https://en.onepiece-cardgame.com/images/cardlist/card/" +
        //   code +
        //   ".png?240202"
        // }
        src={`/images/cards/${set}/` + code + ".jpg"}
        // width={mini ? 52 : 92}
        // height={mini ? 73 : 128}
        width={size.width}
        height={size.height}
        alt={code}
        onClick={
          handleCardClick &&
          (() => {
            handleCardClick(code);
          })
        }
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
