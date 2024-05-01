import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { CardType } from "../../interface/Card";
import styles from "./RecordMatchModal.module.css";
import postMatchResult from "../../src/api/Deck/postMatchResult";

type Props = {
  deckId: number;
  handleClose: (show: boolean) => void;
  leaders: CardType[] | null;
};
const RecordMatchModal = ({ deckId, leaders, handleClose }: Props) => {
  const [diceChecked, setDiceChecked] = useState(false);
  const [resultChecked, setResultChecked] = useState(false);
  const [turnChecked, setTurnChecked] = useState(false);
  const [showSubmitted, setShowSubmitted] = useState(false);
  const { register, handleSubmit } = useForm<MatchFormData>();

  const showSubmitPopup = () => {
    setShowSubmitted(true);
    setTimeout(() => {
      setShowSubmitted(false);
    }, 3000);
    return;
  };

  const onSubmit = async (data: MatchFormData) => {
    console.log(data.turn);
    const req = {
      deckId: deckId,
      leader: data.leader,
      event: data.event || "",
      turn: data.turn ? 1 : 2,
      dice: data.dice ? "W" : "L",
      result: data.result ? "W" : "L",
    };
    try {
      await postMatchResult(req);
      showSubmitPopup();
    } catch (e) {
      console.log(e);
    }
    return;
  };

  const schema = useMemo(
    () =>
      yup.object().shape({
        leader: yup.string().required(),
        event: yup.number().nullable(),
        turn: yup.boolean(),
        dice: yup.boolean(),
        result: yup.boolean(),
      }),
    []
  );

  type MatchFormData = yup.InferType<typeof schema>;

  if (!leaders) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div
        className={styles.modalBackground}
        onClick={() => handleClose(false)}
      >
        <div
          className={styles.modalContent}
          onClick={(e) => e.stopPropagation()}
        >
          <span className={styles.close} onClick={() => handleClose(false)}>
            &times;
          </span>
          <div style={{ marginTop: "30px" }}>
            {showSubmitted && <div>Submitted!</div>}
            <form
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
              onSubmit={handleSubmit(onSubmit)}
            >
              <label htmlFor="leader">vs.</label>
              <select
                {...register("leader")}
                style={{ height: "40px" }}
                name="leader"
                id="leader"
              >
                {leaders.map((i) => {
                  return (
                    <option key={i.code} value={i.code}>{`${i.code} ${
                      i.name
                    } [${i.colors.join("/")}]`}</option>
                  );
                })}
              </select>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label htmlFor="event">Event Name(optional):</label>
                <input
                  {...register("event")}
                  type="text"
                  name="event"
                  id="event"
                />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h2>Turn</h2>
                <label className={styles.switch}>
                  <input
                    {...register("turn")}
                    type="checkbox"
                    id="turn"
                    name="turn"
                    value={turnChecked ? 1 : 2}
                    onChange={() => setTurnChecked(!turnChecked)}
                  />
                  <span className={styles.turnSlider}>
                    {turnChecked ? "1st" : "2nd"}
                  </span>
                </label>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h2>Dice Roll</h2>
                <label className={styles.switch}>
                  <input
                    {...register("dice")}
                    type="checkbox"
                    id="dice"
                    name="dice"
                    value={resultChecked ? "W" : "L"}
                    onChange={() => {
                      setDiceChecked(!diceChecked);
                    }}
                  />
                  <span className={styles.slider}>
                    {diceChecked ? "W" : "L"}
                  </span>
                </label>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h2>Result</h2>
                <label className={styles.switch}>
                  <input
                    {...register("result")}
                    type="checkbox"
                    id="result"
                    name="result"
                    value={resultChecked ? "W" : "L"}
                    onChange={() => {
                      setResultChecked(!resultChecked);
                    }}
                  />
                  <span className={styles.slider}>
                    {resultChecked ? "W" : "L"}
                  </span>
                </label>
              </div>
              <button value="Submit" className={styles.btn}>
                Submit
              </button>
            </form>
            <div
              className={
                showSubmitted ? styles.submitPopup : styles.submitPopupHidden
              }
            >
              Match Submitted!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordMatchModal;
