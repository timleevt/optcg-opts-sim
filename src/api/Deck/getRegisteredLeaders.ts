import { CardType } from "../../../interface/Card";

const getRegisteredLeaders = async (): Promise<CardType[] | null> => {
  const url =
    process.env.NEXT_PUBLIC_API_BASE_URL + "v1/deck/registered-leaders";

  console.log(url);
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error(
        `Error fetching registered leaders: ${response.statusText}`
      );
    }

    const data: CardType[] = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch registered leaders: ", error);
    return null;
  }
};

export default getRegisteredLeaders;
