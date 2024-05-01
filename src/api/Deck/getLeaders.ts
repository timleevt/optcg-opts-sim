const getLeaders = async (): Promise<any> => {
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + "deck/leaders";

  try {
    let res = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      next: {
        revalidate: 86400,
      },
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

export default getLeaders;
