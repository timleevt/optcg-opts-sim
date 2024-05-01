"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { postLogin } from "../../../api/auth/postLogin";
import { useUserContext } from "@/context/userContext";
import styles from "./login.module.css";

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useUserContext();
  const [username, setUsername] = useState({
    username: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (username.username.length > 0 && username.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [username]);

  const onLogin = async () => {
    if (loading) {
      return;
    }
    try {
      setLoading(true);
      const result = await postLogin(username);
      setUser(result.user);
      router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.background}>
      <div className={styles.formContainer}>
        <div className={styles.formItem}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={username.username}
            onChange={(e) =>
              setUsername({ ...username, username: e.target.value })
            }
            placeholder="username"
          />
        </div>
        <div className={styles.formItem}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={username.password}
            onChange={(e) =>
              setUsername({ ...username, password: e.target.value })
            }
            placeholder="password"
          />
        </div>

        <button
          onClick={onLogin}
          className={styles.loginBtn}
          style={
            loading || buttonDisabled
              ? {
                  pointerEvents: "none",
                  cursor: "not-allowed",
                  backgroundColor: "grey",
                }
              : {}
          }
        >
          Login
        </button>
      </div>
    </div>
  );
}
