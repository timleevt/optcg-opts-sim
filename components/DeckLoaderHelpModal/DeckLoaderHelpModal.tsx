"use client";
import styles from "./DeckLoaderHelpModal.module.css";
import { bracketExport, textExport } from "./helpText";

type Props = {
  handleClose: () => void;
};
const DeckLoaderHelpModal = ({ handleClose }: Props) => {
  return (
    <div>
      <div className={styles.modalBackground} onClick={() => handleClose()}>
        <div
          className={styles.modalContent}
          onClick={(e) => e.stopPropagation()}
        >
          <span className={styles.close} onClick={() => handleClose()}>
            &times;
          </span>
          <h2>Accepted Deck Formats</h2>
          <h3>Brackets (onepiece-cardgame.dev / onepiecetopdecks.com)</h3>
          <p>Ex:</p>
          <p>{bracketExport}</p>
          <h3>Text (sim / egmanevents )</h3>
          <p>Ex:</p>
          <p style={{ width: "100px" }}>{textExport}</p>
        </div>
      </div>
    </div>
  );
};

export default DeckLoaderHelpModal;
