import Link from "next/link";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.container}>
      <h1>
        <Link href="/">
          OPTCG OPTS <span className={styles.betaTxt}>(beta)</span>{" "}
        </Link>
      </h1>
      {/* Login: TODO */}
      <Link className={styles.link} href="#" style={{ cursor: "not-allowed" }}>
        Login
      </Link>
      <Link className={styles.link} href="#" style={{ cursor: "not-allowed" }}>
        My Decks
      </Link>
      <Link className={styles.link} href="/decks">
        Decks
      </Link>
      <Link className={styles.link} href="/build">
        Build
      </Link>
    </nav>
  );
};

export default Navbar;
