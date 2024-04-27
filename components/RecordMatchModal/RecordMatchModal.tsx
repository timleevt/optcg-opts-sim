import { CardType } from "../../interface/Card";
import styles from "./RecordMatchModal.module.css";

type Props = {
  //   handleClose: (show: boolean) => void;
  leaders: CardType[];
};
const RecordMatchModal = ({ leaders }: Props) => {
  // const RecordMatchModal = ({ handleClose }: Props) => {

  return (
    <div>
      <div
        className={styles.modalBackground}
        // onClick={() => handleClose(false)}
      >
        <div
          className={styles.modalContent}
          onClick={(e) => e.stopPropagation()}
        >
          <span className={styles.close}>
            {/* <span className={styles.close} onClick={() => handleClose(false)}> */}
            &times;
          </span>
          <div style={{ marginTop: "30px" }}>
            <form action="/">
              <h2>VS.</h2>
              <select style={{ height: "40px" }} name="leader" id="leader">
                {leaders.map((i) => {
                  return (
                    <option key={i.code} value={i.code}>{`${i.code} ${
                      i.name
                    } [${i.colors.join("/")}]`}</option>
                  );
                })}
              </select>
              <div style={{ display: "flex", justifyContent: "space-between"}}>
                <h2>Dice Roll</h2>
                <label className={styles.switch}>
                  <input
                    className={styles.checkBox}
                    type="checkbox"
                    id="dice"
                    name="dice"
                    value="Win"
                  />
                  <span className={styles.slider}>Win</span>
                </label>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h2>Turn</h2>
                <label className={styles.switch}>
                  <input
                    className={styles.checkBox}
                    type="checkbox"
                    id="dice"
                    name="dice"
                    value="1st"
                  />
                  <span className={styles.slider}>1st</span>
                </label>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h2>Result</h2>
                <label className={styles.switch}>
                  <input
                    className={styles.checkBox}
                    type="checkbox"
                    id="result"
                    name="result"
                    value="Win"
                  />
                  <span className={styles.slider}>Win</span>
                </label>
              </div>
              <button className={styles.btn}>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordMatchModal;
