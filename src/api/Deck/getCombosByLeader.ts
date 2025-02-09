interface Combo {
  id: string;
  leader: string;
  currBoard: string;
  comboBoard: string;
  startCurve: number;
  endCurve: number;
  notes: string;
}

const getCombosByLeader = async (leaderCode: string): Promise<Combo[]> => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/deck/combos/${leaderCode}`;

  try {
    const res = await fetch(url, { method: "GET" });

    // Check if the response status is OK
    if (!res.ok) {
      throw new Error(`Failed to fetch combos: ${res.statusText}`);
    }

    const data: Combo[] = await res.json();
    return data;
  } catch (e) {
    // If it's an error of type `Error`, log the message and rethrow the error
    if (e instanceof Error) {
      console.error("Error fetching combos:", e.message);
    } else {
      console.error("Unexpected error:", e);
    }

    // You might choose to throw the error or return a default value
    throw e; // Rethrow the error to let the caller handle it
  }
};

export default getCombosByLeader;
