"use client";
import axios from "axios";

import { createContext, useContext, useEffect, useState } from "react";

export const UserContext = createContext<UserContext>({} as UserContext);
// export const UserContext = createContext({});
type User = {
  username: string;
  id: string;
};
type UserContext = {
  // user: string | null;
  user: User | null;
  setUser: (user: User) => void;
  // setUser: (user: string) => void;
  logout: () => void;
};

export function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + `auth/profile`;

  const logout = () => {
    setUser(null);
  };

  useEffect(() => {
    if (!user) {
      axios
        .get(url, { withCredentials: true })
        .then(({ data }) => {
          // setUser(data.username);
          setUser(data);
        })
        .catch((error) => {});
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
