"use client";

import { useEffect, useState } from "react";
import { CardType } from "../../interface/Card";
import styles from "./LeaderList.module.css";
import Link from "next/link";
import getRegisteredLeaders from "@/api/Deck/getRegisteredLeaders";

const LeaderList = () => {
  const [leaders, setLeaders] = useState<CardType[] | null>([]);
  const [leaderFilter, setLeaderFilter] = useState<string>("");
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
      <div className={styles.searchContainer}>
        <input
          aria-label="Filter leaders"
          placeholder="Filter leaders..."
          className={styles.searchBar}
          type="text"
          onChange={(e) => setLeaderFilter(e.target.value)}
        />
      </div>
      <div className={styles.testc}>
        {leaders.map((i) => {
          let set = i.code.split("-")[0];
          return (
            <Link key={i.code + "x"} href={`/leader/${i.code}`}>
              <div
                className={styles.leaderCardContainer}
                style={{
                  backgroundImage: `url('images/cards/${set}/${i.code}.jpg')`,
                  backgroundSize: "33%",
                  backgroundPosition: "0% 22%",
                  backgroundRepeat: "no-repeat",
                  backgroundBlendMode: "overlay",
                }}
              >
                <div className={styles.cardDetail}>
                  <div>{i.name}</div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <div className={styles.codeText}>{i.code}</div>
                    {i.colors.length > 1 ? (
                      <div className={styles.codeText}>
                        <span style={{ color: i.colors[0] }}>
                          {i.colors[0]}{" "}
                        </span>
                        /{" "}
                        <span style={{ color: i.colors[1] }}>
                          {i.colors[1]}
                        </span>
                      </div>
                    ) : (
                      <div
                        className={styles.codeText}
                        style={{ color: i.colors[0] }}
                      >
                        {i.colors.join("/")}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      {/* <table className={styles.deckTable}>
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
      </table> */}
    </div>
  );
};

export default LeaderList;
