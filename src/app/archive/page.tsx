"use client";
import getArchivedDecks from "@/api/Deck/getArchivedDecks";
import { useEffect, useState } from "react";
import ArchiveDeck from "../../../interface/ArchiveDeck";
import Link from "next/link";
import styles from "./archive.module.css";

const Archive = () => {
  const [decks, setDecks] = useState<ArchiveDeck[]>([]);
  const [formats, setFormats] = useState<string[]>([]);

  useEffect(() => {
    const fetchArchiveDecks = async () => {
      try {
        const data = (await getArchivedDecks()) || [];
        setDecks(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchArchiveDecks();
  }, []);

  useEffect(() => {
    if (decks.length === 0) return;
    setFormats(Array.from(new Set(decks.map((i) => i.format))));
  }, [decks]);

  return (
    <div className={styles.container}>
      {formats.map((format) => {
        return (
          <div key={format} className={styles.archiveLinks}>
            <h3>{format}</h3>
            {decks
              .filter((deck) => deck.format === format)
              .map((data) => {
                return (
                  <Link
                    key={data.id}
                    href={`/archive/${data.id}`}
                  >{`${data.author} - ${data.name} - ${data.leaderCode.colors.join("/")} ${data.leaderCode.name}`}</Link>
                );
              })}
          </div>
        );
      })}
    </div>
  );
};

export default Archive;
