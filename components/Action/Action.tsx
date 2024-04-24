import Image from "next/image";
import Card from "../Card/Card";
import styles from "./Action.module.css";

type Props = {
  leaderCode?: string;
  action: string;
};

// leader, attach, rest, active, rested, minus, cheat, and, or, leftParenthesis, rightParenthesis
const Action = ({ leaderCode, action }: Props) => {
  switch (action) {
    case "!leader": {
      if (leaderCode)
        return (
          <div className={styles.actionContainer}>
            <Card code={leaderCode} active mini handleCardClick={() => {}} />
            <span className={styles.leaderAbilityText}>Leader Ability</span>
          </div>
        );
      break;
    }
    case "!attach": {
      return (
        <Image
          src="/images/don.jpg"
          alt="Attach DON!!"
          width={52}
          height={73}
        />
      );
    }
    case "!rest": {
      return (
        <Image
          src="/images/don.jpg"
          alt="Attach DON!!"
          width={52}
          height={73}
          style={{ transform: "rotate(90deg)" }}
        />
      );
    }
    case "!active": {
      return (
        <div className={styles.actionContainer}>
          <Image
            src="/images/don.jpg"
            alt="Attach DON!!"
            width={52}
            height={73}
          />
          <span className={`${styles.sign} ${styles.plus}`}>&#43;</span>
        </div>
      );
    }
    case "!rested": {
      return (
        <div className={styles.actionContainer}>
          <Image
            src="/images/don.jpg"
            alt="Attach DON!!"
            width={52}
            height={73}
            style={{ transform: "rotate(90deg)" }}
          />
          <span
            className={`${styles.sign} ${styles.plus} ${styles.restedPosition}`}
          >
            &#43;
          </span>
        </div>
      );
    }
    case "!minus": {
      return (
        <div className={styles.actionContainer}>
          <Image
            src="/images/don.jpg"
            alt="Attach DON!!"
            width={52}
            height={73}
          />
          <span className={`${styles.sign} ${styles.minus}`}>&#8722;</span>
        </div>
      );
    }
    case "!cheat": {
      return <span className={styles.textAction}>Cheat Out</span>;
    }
    case "!and": {
      return <span className={styles.textAction}>AND</span>;
    }
    case "!or": {
      return <span className={styles.textAction}>OR</span>;
    }
    case "!leftParenthesis": {
      return <span className={styles.parenthesis}>&#x28;</span>;
    }
    case "!rightParenthesis": {
      return <span className={styles.parenthesis}>&#x29;</span>;
    }
  }
};

export default Action;
