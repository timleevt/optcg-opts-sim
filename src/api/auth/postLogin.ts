import { NextResponse } from "next/server";

type UserData = {
  username: string;
  password: string;
};

export const postLogin = async (request: UserData) => {
  const GET_LOGIN_URL = process.env.NEXT_PUBLIC_API_BASE_URL + `auth/login`;

  try {
    const { username, password } = request;

    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    headers.append("Access-Control-Allow-Origin", "*");
    // Check user exists
    const user = await fetch(GET_LOGIN_URL, {
      method: "POST",
      redirect: "follow",
      credentials: "include",
      headers: headers,
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          return NextResponse.json({
            message: "Something went wrong",
            success: false,
          });
        }
        return response.json();
      })
      .then((data) => {
        return data;
      });
    return user;
  } catch (error) {
    console.log(error);
    if (typeof error === "string") {
      return NextResponse.json({ error }, { status: 500 });
    } else if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json(
        { error: "Something went wrong" },
        { status: 500 }
      );
    }
  }
};
