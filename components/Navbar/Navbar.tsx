"use client";
import Link from "next/link";
import styles from "./Navbar.module.css";
import { useUserContext } from "@/context/userContext";
import axios from "axios";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { user, logout } = useUserContext();
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + `auth/logout`;
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axios.get(url, { withCredentials: true });
      logout();
      router.push("/login");
    } catch (error) {
      if (typeof error === "string") {
        console.log(error);
      } else {
        throw Error;
      }
    }
  };

  return (
    <nav className={styles.container}>
      <h1>
        <Link href="/">
          OPTCG OPTS <span className={styles.betaTxt}>(beta)</span>{" "}
        </Link>
      </h1>
      {/* <Link className={styles.link} href="#" style={{ cursor: "not-allowed" }}>
        Login
      </Link>
      <Link className={styles.link} href="#" style={{ cursor: "not-allowed" }}>
        My Decks
      </Link> */}
      <Link className={styles.link} href="/decks">
        Decks
      </Link>
      <Link className={styles.link} href="/build">
        Build
      </Link>
      {user && (
        <button className={styles.logoutBtn} onClick={handleLogout}>
          Logout
        </button>
      )}
    </nav>
  );
};

export default Navbar;
