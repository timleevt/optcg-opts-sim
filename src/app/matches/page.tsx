"use client";

import getLeaders from "@/api/Deck/getLeaders";
import { useUserContext } from "@/context/userContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Matchup from "../../../components/Matchup/Matchup";
import getMatchHistory from "@/api/Deck/getMatchHistory";
import styles from "./matches.module.css";
import RecordMatchModal from "../../../components/RecordMatchModal/RecordMatchModal";
import axios from "axios";
import MatchHistory from "../../../components/MatchHistory/MatchHistory";

type MatchData = {
  id: string;
  deckId: number;
  leader: string;
  eventName: string;
  diceResult: string;
  result: string;
  turnOrder: number;
};

type DeckData = {
  name: string;
  leader: string;
  id: number;
};

export default function MatchesPage() {
  const { user } = useUserContext();
  const router = useRouter();
  const [tab, setTab] = useState("history");
  const [leaders, setLeaders] = useState(null);
  const [matchHistory, setMatchHistory] = useState<MatchData[]>([]);
  const [showMatchRecordModal, setShowMatchRecordModal] = useState(false);
  const [decks, setDecks] = useState<DeckData[]>();
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + `deck/list/${user?.id}`;

  useEffect(() => {
    try {
      getLeaders().then((data) => {
        setLeaders(data);
      });
      if (user) {
        axios.get(url).then((res) => {
          console.log(res.data);
          setDecks(res.data);
        });
        getMatchHistory(user.id).then((data) => {
          setMatchHistory(data);
        });
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  // Re-direct if not logged in
  if (!user) {
    return router.push("/");
  }

  if (!leaders || !decks) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className={styles.nav}>
        <button onClick={() => setTab("history")}>Match History</button>
        {/* <button onClick={() => setTab("notes")}>Matchup Notes</button> */}
        <button onClick={() => setShowMatchRecordModal(true)}>
          Record Match
        </button>
      </div>
      {showMatchRecordModal && (
        <RecordMatchModal
          userId={user.id}
          handleClose={setShowMatchRecordModal}
          leaders={leaders}
          decks={decks}
        />
      )}
      {tab === "history" && (
        <MatchHistory matchHistory={matchHistory} decks={decks} />
      )}
      {/* {tab === "notes" && <h2>Coming Soon...</h2>} */}
      {/* <Matchup leaders={leaders}/> */}
    </div>
  );
}
