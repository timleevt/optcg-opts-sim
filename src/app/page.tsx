import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.landing}>
        <h1 className={styles.setTxt}>
          Current Set:
          EB01
        </h1>
        <Image
          src="/currentSet.jpg"
          alt="Current Set: EB01"
          height={300}
          width={500}
          priority
          className={styles.banner}
          />
      </div>
      <div>
        <h2 style={{textAlign: "center"}}>News & Updates</h2>
        <p className={styles.newsItem}>5/6/24 Fixing Bugs</p>
        <p className={styles.newsItem}>5/2/24 Initial Deployment</p>
      </div>
    </main>
  );
}
