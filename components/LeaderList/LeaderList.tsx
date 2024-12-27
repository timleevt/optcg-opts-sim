"use client";

import { useEffect, useState } from "react";
import { CardType } from "../../interface/Card";
import Card from "../Card/Card";
import styles from "./LeaderList.module.css";
import Link from "next/link";
import getRegisteredLeaders from "@/api/Deck/getRegisteredLeaders";

const LeaderList = () => {
  const [leaders, setLeaders] = useState<CardType[] | null>([]);
  useEffect(() => {
    try {
      getRegisteredLeaders().then((data) => {
        setLeaders(data);
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
      <table className={styles.deckTable}>
        <tbody>
          <tr style={{ borderBottom: "1px solid black" }}>
            <th>leader</th>
            <th>name</th>
            <th>code</th>
            <th>color</th>
          </tr>

          {leaders.map((i) => {
            return (
              <tr key={i.code} className={styles.tableItem}>
                <td>
                  <Card code={i.code} active mini />
                </td>
                <td>
                  <Link href={`/leader/${i.code}`} className={styles.rowLink}>
                    {i.name}
                  </Link>
                </td>
                <td>{i.code}</td>
                <td>{i.colors.join("/")}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderList;
