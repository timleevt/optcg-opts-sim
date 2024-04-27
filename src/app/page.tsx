import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.landing}>
        <h1 className={styles.setTxt}>
          Current Set: <br />
          OP06
        </h1>
        <Image
          src="/currentSet.png"
          alt="Current Set: OP06"
          height={500}
          width={500}
          />
      </div>
      <div>
        <h2 style={{textAlign: "center"}}>News & Updates</h2>
        <p className={styles.newsItem}>
          Currently still in beta. The site is still super jank right now.
        </p>
        <p className={styles.newsItem}>
          Some news stuff here...
        </p>
      </div>
    </main>
  );
}
