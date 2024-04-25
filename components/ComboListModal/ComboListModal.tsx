"use client";
import { useState } from "react";
import styles from "./ComboListModal.module.css";
import { ComboType } from "../../interface/Combo";

type Props = {
  handleClose: (show: boolean) => void;
  combos: ComboType[];
};
const ComboListModal = ({ handleClose, combos }: Props) => {
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
            {combos.map(i => {
              return <div key={i.id}>
                <span>{i.comboBoard}</span>
                <span>{i.notes}</span>
              </div>
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ComboListModal;
