// DEPRECATED PAGE
"use client";

import { useEffect, useState } from "react";
// import { postSignup } from "../../../api/auth/postSignup";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  //   const [user, setUser] = useState({
  //     username: "",
  //     password: "",
  //   });
  //   const onSignup = async () => {
  //     await postSignup(user);
  //     router.push("/login");
  //   };

  useEffect(() => {
    router.push("/");
  }, []);

  return (
    <div>Under Construction</div>
    // <div>
    //   <label htmlFor="username">Username</label>
    //   <input
    //     type="text"
    //     name="username"
    //     id="username"
    //     value={user.username}
    //     onChange={(e) => setUser({ ...user, username: e.target.value })}
    //     placeholder="username"
    //   />
    //   <label htmlFor="password">Password</label>
    //   <input
    //     type="password"
    //     name="password"
    //     id="password"
    //     value={user.password}
    //     onChange={(e) => setUser({ ...user, password: e.target.value })}
    //     placeholder="password"
    //   />
    //   <button onClick={onSignup}>Signup</button>
    // </div>
  );
}
