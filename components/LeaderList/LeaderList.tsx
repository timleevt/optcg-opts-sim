"use client";

import getLeaders from "@/api/Deck/getLeaders";
import { useEffect, useState } from "react";
import { CardType } from "../../interface/Card";
import Card from "../Card/Card";
import styles from "./LeaderList.module.css";

const LeaderList = () => {
  const [leaders, setLeaders] = useState<CardType[]>([]);
  useEffect(() => {
    try {
      getLeaders().then((data) => {
        setLeaders(data);
        console.log(data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  if (!leaders) {
    return <div>loading..</div>;
  }
  return (
    <div>
      {leaders.map((i) => {
        return (
          <div key={i.code} className={styles.leaderContainer}>
            <Card code={i.code} active mini />
            <span className={styles.leaderText}>{i.name}</span>
            <span className={styles.leaderText}>{i.colors.join("/")}</span>
          </div>
        );
      })}
    </div>
  );
};

export default LeaderList;
