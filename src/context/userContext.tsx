"use client";
import axios from "axios";

import { createContext, useContext, useEffect, useState } from "react";

export const UserContext = createContext<UserContext>({} as UserContext);
// export const UserContext = createContext({});
type UserContext = {
  user: string | null;
  setUser: (user: string) => void;
  logout: () => void;
};

// type user = {
//   username: string;
//   id: string;
// }

export function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // const [user, setUser] = useState<UserContext>({username: '', id: ''});
  const [user, setUser] = useState<string | null>(null);
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + `auth/profile`;

  const logout = () => {
    setUser(null);
  };

  useEffect(() => {
    if (!user) {
      axios
        .get(url, { withCredentials: true })
        .then(({ data }) => {
          setUser(data.username);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}
