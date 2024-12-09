const getMatchHistory = async (userId: string): Promise<any> => {
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + `deck/matches/${userId}`;

  try {
    let res = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        return data;
      });
    return res;
  } catch (e) {
    console.log(e);
  }
};

export default getMatchHistory;
