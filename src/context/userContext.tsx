"use client";
import axios from "axios";

import { createContext, useContext, useEffect, useState } from "react";

export const UserContext = createContext<UserContext>({} as UserContext);

type UserContext = {
  username: string;
  id: string;
}

export function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<UserContext>({username: '', id: ''});
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + `auth/profile`;
  useEffect(() => {
    if (user.id === '') {
      axios.get(url, { withCredentials: true }).then(({ data }) => {
        setUser(data);
      });
    }
  }, []);

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}
