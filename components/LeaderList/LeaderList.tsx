"use client";

import { useEffect, useState } from "react";
import { CardType } from "../../interface/Card";
import styles from "./LeaderList.module.css";
import Link from "next/link";
import getRegisteredLeaders from "@/api/Deck/getRegisteredLeaders";
import { useRouter } from "next/navigation";

const LeaderList = () => {
  const [leaders, setLeaders] = useState<CardType[] | null>(null);
  const [leaderFilter, setLeaderFilter] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    try {
      getRegisteredLeaders().then((data) => {
        setLeaders(data);
      });
    } catch (error) {
      router.push("/404");
    }
  }, [router]);

  if (!leaders) {
    return;
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
      <div className={styles.leaderContainer}>
        {leaders
          .filter((i) =>
            Object.values(i).some((value) =>
              value
                ?.toString()
                .toLowerCase()
                .includes(leaderFilter.toLowerCase())
            )
          )
          .map((i) => {
            let set = i.code.split("-")[0];
            return (
              <Link key={i.code} href={`/leader/${i.code}`}>
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
    </div>
  );
};

export default LeaderList;
