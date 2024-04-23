import styles from "./ContentNav.module.css";

type Props = {
  content: string;
  setContent: (content: string) => void;
};
const ContentNav = ({ content, setContent }: Props) => {
  const handleClick = (content: string) => {
    setContent(content);
  };

  return (
    <div className={styles.contentNav}>
      <button onClick={() => handleClick("data")}>Data</button>
      <button onClick={() => handleClick("combo")}>Combo</button>
      <button onClick={() => handleClick("matchup")}>Matchup</button>
    </div>
  );
};

export default ContentNav;
