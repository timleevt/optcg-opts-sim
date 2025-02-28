import styles from "./page.module.css";
import LeaderList from "../../components/LeaderList/LeaderList";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.banner}>
        <span>OP10</span>
      </div>
      <LeaderList />
    </main>
  );
}
