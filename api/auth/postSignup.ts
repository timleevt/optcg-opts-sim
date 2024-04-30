import { NextResponse } from "next/server";

type UserData = {
  username: string;
  password: string;
};

export const postSignup = async (request: UserData) => {
  const GET_USER_URL = process.env.NEXT_PUBLIC_API_BASE_URL + `auth/user`;
  const REGISTER_URL = process.env.NEXT_PUBLIC_API_BASE_URL + `auth/register`;
  try {
    const { username, password } = request;

    // Check for username already existing
    const user = await fetch(GET_USER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
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

    if (user.id) {
      return NextResponse.json({
        message: "User with this username already exists",
        success: false,
      });
    }

    const newUser = await fetch(REGISTER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      user: newUser,
    });
  } catch (error) {
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
