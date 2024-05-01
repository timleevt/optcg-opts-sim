import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import styles from "./DeckLoader.module.css";
import DeckLoaderHelpModal from "../DeckLoaderHelpModal/DeckLoaderHelpModal";
import submitDeckList from "../../src/api/Deck/submitDeckList";
import { CardType } from "../../interface/Card";
import { useUserContext } from "@/context/userContext";
import { useRouter } from "next/navigation";

type Props = {
  setDeck?: (deck: CardType[]) => void;
};

const DeckLoader = ({ setDeck }: Props) => {
  const { register, handleSubmit } = useForm<Data>();
  const [showHelpModal, setShowHelpModal] = useState(false);
  const { user } = useUserContext();
  const [error, setError] = useState(false);
  const router = useRouter();

  const schema = useMemo(
    () =>
      yup.object().shape({
        deckname: yup.string(),
        decklist: yup.string().required(),
      }),
    []
  );

  type Data = yup.InferType<typeof schema>;

  const onSubmit = async (data: Data) => {
    if (!user) {
      return;
    }
    try {
      await submitDeckList({ ...data, author: user }).then((response) => {
        if (response.ok) {
          router.push("/decks");
        }
      });
    } catch (error) {
      setError(true);
    }
    // setDeck(res);
  };

  return (
    <div className={styles.container}>
      {error && <div style={{ color: "red" }}>Something went wrong</div>}
      <form className={styles.deckloadForm} onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="deckname">Deck Name: </label>
        <input
          {...register("deckname")}
          type="text"
          name="deckname"
          id="deckname"
          placeholder={`${user}'s deck`}
        />
        <textarea
          {...register("decklist", { required: true })}
          id="decklist_input"
          rows={12}
          placeholder="Paste decklist here"
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
