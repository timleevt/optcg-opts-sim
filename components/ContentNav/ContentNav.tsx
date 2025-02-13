import styles from "./ContentNav.module.css";

type Props = {
  content: string;
  setContent: (content: string) => void;
  handleComboModal: () => void;
};
const ContentNav = ({ content, setContent, handleComboModal }: Props) => {
  const handleClick = (content: string) => {
    setContent(content);
  };

  const activeStyle = {
    color: "cadetblue",
    backgroundColor: "white",
    border: "1px solid cadetblue",
  };

  return (
    <div className={styles.contentNav}>
      <button
        onClick={() => handleClick("combo")}
        style={content === "combo" ? activeStyle : {}}
      >
        Combo
      </button>
      <button onClick={() => handleComboModal()}>Combo List</button>
      <button
        onClick={() => handleClick("data")}
        style={content === "data" ? activeStyle : {}}
      >
        Data
      </button>
    </div>
  );
};

export default ContentNav;
