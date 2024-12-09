import Image from "next/image";
import styles from "./page.module.css";
import LeaderList from "../../components/LeaderList/LeaderList";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.landing}>
        <h1 className={styles.setTxt}>Current Set: OP08</h1>
        <Image
          src="/currentSet.png"
          alt="Current Set: OP08"
          height={100}
          width={200}
          priority
          className={styles.banner}
        />
      </div>
      <div>
        <LeaderList />
      </div>
    </main>
  );
}
