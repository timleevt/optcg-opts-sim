import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import styles from "./DeckLoader.module.css";
import DeckLoaderHelpModal from "../DeckLoaderHelpModal/DeckLoaderHelpModal";
import getDeck from "@/app/api/Deck/getDeck";
const DeckLoader = () => {
  const { register, handleSubmit } = useForm<Data>();
  const [showHelpModal, setShowHelpModal] = useState(false);

  const schema = useMemo(
    () =>
      yup.object().shape({
        decklist: yup.string().required(),
      }),
    []
  );

  type Data = yup.InferType<typeof schema>;

  const onSubmit = async (data: Data) => {
    const res = await getDeck(data.decklist);
    alert(res);
  };

  return (
    <div className={styles.container}>
      <form className={styles.deckloadForm} onSubmit={handleSubmit(onSubmit)}>
        <textarea
          {...register("decklist", { required: true })}
          id="decklist_input"
          rows={12}
          defaultValue="Paste Decklist Here"
          style={{ width: "100%", marginTop: "8px" }}
        />
        <div className={styles.btnContainer}>
          <button className={styles.formBtn}>Submit</button>
          <button
            type="button"
            className={styles.helpBtn}
            onClick={() => setShowHelpModal(true)}
          >
            ?
          </button>
        </div>
      </form>
      {showHelpModal && (
        <DeckLoaderHelpModal handleClose={() => setShowHelpModal(false)} />
      )}
    </div>
  );
};

export default DeckLoader;
