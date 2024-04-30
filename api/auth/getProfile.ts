import { NextResponse } from "next/server";

type UserData = {
  username: string;
  password: string;
};

export const getProfile = async () => {
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + `auth/profile`;

  try {
    let res = await fetch(url, {
      method: "GET",
    });
    return res.json();
  } catch (e) {
    console.log(e);
  }
};
