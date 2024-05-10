import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.landing}>
        <h1 className={styles.setTxt}>Current Set: EB01</h1>
        <Image
          src="/currentSet.jpg"
          alt="Current Set: EB01"
          height={300}
          width={500}
          priority
          className={styles.banner}
        />
      </div>
      <div className={styles.newsItemContainer}>
        <h2 style={{ textAlign: "center" }}>News & Updates</h2>
        <p>
          5/9/24 <br />
          All EB-01/OP06 Cards added. <br />
          If build page is not responsive, you may have to refresh the page
          after logging in. <br />
          Re-introduced data table in the deck page
        </p>
        <p>
          5/6/24 <br />
          Fixing Bugs
        </p>
        <p>
          5/2/24 <br />
          Initial Deployment
        </p>
      </div>
    </main>
  );
}
