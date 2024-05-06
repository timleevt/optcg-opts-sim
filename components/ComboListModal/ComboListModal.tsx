"use client";
import { useState } from "react";
import styles from "./ComboListModal.module.css";
import { ComboType } from "../../interface/Combo";
import Action from "../Action/Action";
import Card from "../Card/Card";

type Props = {
  leader: string;
  handleClose: (show: boolean) => void;
  combos: ComboType[];
};
const ComboListModal = ({ leader, handleClose, combos }: Props) => {
  const [curve, setCurve] = useState(1);

  const curveBtns = [];
  for (let i = 1; i <= 10; i++) {
    curveBtns.push(
      <button
        key={i}
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
          <div>
            {combos
              .filter((x) => x.startCurve === curve)
              .map((i) => {
                return (
                  <div key={i.startCurve + i.id}>
                    {i.currBoard.length !== 0 && (
                      <>
                      <span style={{fontSize: '8px'}}>board:</span>
                      <div className={styles.boardContainer} key={i.id}>
                        {i.currBoard.split(",").map((c, index) => {
                          if (c.charAt(0) === "!") {
                            return (
                              <Action
                                key={index}
                                leaderCode={leader}
                                action={c}
                              />
                            );
                          }
                          return (
                            <Card
                              key={index}
                              code={c}
                              mini
                              active
                              handleCardClick={() => {}}
                            />
                          );
                        })}
                      </div>
                      </>
                    )}
                    <span style={{fontSize: '8px'}}>combo:</span>
                    <div className={styles.boardContainer} key={i.id}>
                      {i.comboBoard.split(",").map((c, index) => {
                        if (c.charAt(0) === "!") {
                          return (
                            <Action
                              key={index}
                              leaderCode={leader}
                              action={c}
                            />
                          );
                        }
                        return (
                          <Card
                            key={index}
                            code={c}
                            mini
                            active
                            handleCardClick={() => {}}
                          />
                        );
                      })}
                    </div>
                    <p style={{fontSize: '12px'}}>{i.notes}</p>  
                    <hr />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComboListModal;
