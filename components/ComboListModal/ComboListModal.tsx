"use client";
import { useState } from "react";
import styles from "./ComboListModal.module.css";

type Props = {
  handleClose: (show: boolean) => void;
};
const ComboListModal = ({ handleClose }: Props) => {
  const [curve, setCurve] = useState(1);

  const curveBtns = [];
  for (let i = 1; i <= 10; i++) {
    curveBtns.push(
      <button
        onClick={() => setCurve(i)}
        style={
          curve === i ? { fontWeight: "bold", textDecoration: "underline" } : {}
        }
      >
        {i}
      </button>
    );
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
          <h2>Combo List</h2>
          <div className={styles.curveBtnContainer}>{curveBtns}</div>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Perferendis incidunt at et architecto consequuntur facilis! Eos
            expedita ipsa, minus dicta, officiis perferendis quia suscipit nihil
            dolores aperiam, similique fuga nesciunt?
          </p>
        </div>
      </div>
    </div>
  );
};

export default ComboListModal;
