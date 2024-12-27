import styles from "./page.module.css";
import LeaderList from "../../components/LeaderList/LeaderList";

export default function Home() {
  return (
    <main className={styles.main}>
      <LeaderList />
    </main>
  );
}
