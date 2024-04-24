import Image, { ImageProps } from "next/image";
import styles from "./DonBoard.module.css";

type Props = {
  numDon: number;
  handleDonChange: (num: number) => void;
};

const DonBoard = ({ numDon, handleDonChange }: Props) => {
  let donCards: Array<React.JSX.Element> = [];
  for (let i = 0; i < numDon; i++) {
    if (i === 0) {
      donCards.push(
        <Image
          key={i}
          src="/images/don.jpg"
          alt="Don Card"
          width={64}
          height={89}
        />
      );
    } else {
      donCards.push(
        <Image
          key={i}
          src="/images/don.jpg"
          alt="Don Card"
          width={64}
          height={89}
          style={{ marginLeft: "-40px" }}
        />
      );
    }
  }
  return (
    <div className={styles.container}>
      <div className={styles.donBtnContainer}>
        <button className={styles.btn} onClick={() => handleDonChange(1)}>
          + DON!!
        </button>
        <button className={styles.btn} onClick={() => handleDonChange(-1)}>
          - DON!!
        </button>
        <span>{numDon}</span>
      </div>
      <div className={styles.donCardContainer}>{donCards}</div>
    </div>
  );
};

export default DonBoard;
