import Action from "../Action/Action";
import Card from "../Card/Card";
import styles from "./ComboBoard.module.css";

type Props = {
  leader?: string;
  numDon: number;
  currBoard: Array<string>;
  comboBoard: Array<string>;
  activeBoard: string;
  handleActionClick: (action: string) => void;
  setActiveBoard: (board: string) => void;
};
const ComboBoard = ({
  leader,
  numDon,
  currBoard,
  comboBoard,
  activeBoard,
  handleActionClick,
  setActiveBoard,
}: Props) => {
  const endCurve = () => {
    let rampCounter = 0;
    for (let i = 0; i < comboBoard.length; i++) {
      if (comboBoard[i] === "!active" || comboBoard[i] === "!rested") {
        rampCounter += 1;
      } else if (comboBoard[i] === "!minus") {
        rampCounter -= 1;
      }
    }
    return numDon + rampCounter;
  };

  return (
    <div>
      {/* Button Area */}
      <div className={styles.btnContainer}>
        <button onClick={() => handleActionClick("!leader")}>
          Leader Ability
        </button>
        <button onClick={() => handleActionClick("!attach")}>
          Attach DON!!
        </button>
        <button onClick={() => handleActionClick("!rest")}>Rest DON!!</button>
        <button onClick={() => handleActionClick("!active")}>
          DON!! Active +1
        </button>
        <button onClick={() => handleActionClick("!rested")}>
          DON!! Rested +1
        </button>
        <button onClick={() => handleActionClick("!minus")}>DON!! -1</button>
        <button onClick={() => handleActionClick("!cheat")}>Cheat Out</button>
        <button onClick={() => handleActionClick("!and")}>AND</button>
        <button onClick={() => handleActionClick("!or")}>OR</button>
        <button onClick={() => handleActionClick("!leftParenthesis")}>
          &#x28;
        </button>
        <button onClick={() => handleActionClick("!rightParenthesis")}>
          &#x29;
        </button>
        <button onClick={() => handleActionClick("!undo")}>Undo</button>
        <button onClick={() => handleActionClick("!clear")}>Clear</button>
      </div>
      <div className={styles.curveTextContainer}>
        <span className={styles.curveText}>Start Curve: {numDon}</span>
        <span className={styles.curveText}>End Curve: {endCurve()}</span>
      </div>
      <h3>Current Board</h3>
      <div
        className={styles.comboContainer}
        onClick={() => setActiveBoard("current")}
        style={activeBoard === "current" ? { border: "3px solid red" } : {}}
      >
        {currBoard.map((i, index) => {
          return (
            <Card key={index} code={i} mini active handleCardClick={() => {}} />
          );
        })}
      </div>
      <h3>Combo</h3>
      <div
        className={styles.comboContainer}
        onClick={() => setActiveBoard("combo")}
        style={activeBoard === "combo" ? { border: "3px solid red" } : {}}
      >
        {comboBoard.map((i, index) => {
          if (i.charAt(0) === "!") {
            return <Action key={index} leaderCode={leader} action={i} />;
          }
          return (
            <Card key={index} code={i} mini active handleCardClick={() => {}} />
          );
        })}
      </div>
      <form action="/">
        <textarea
          name="comment"
          id=""
          rows={1}
          defaultValue="write more details about combo here"
          style={{ width: "100%", marginTop: "8px" }}
        ></textarea>
        <button className={styles.btn} style={{ marginTop: "8px" }}>
          Save
        </button>
      </form>
    </div>
  );
};

export default ComboBoard;
