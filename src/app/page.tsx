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
          Currently still in beta. The site is super jank right now still,
          80% of it doesn&apos;t work lol.
        </p>
        <p className={styles.newsItem}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam
          totam sequi quae error cum hic reiciendis itaque distinctio, incidunt
          officiis debitis ipsa asperiores reprehenderit voluptas deleniti
          magni? Quasi, tenetur quos.
        </p>
      </div>
    </main>
  );
}
