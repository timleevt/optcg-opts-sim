// TODO: Typing on all the API stuff
const getDeckListById = async (deckID: number): Promise<any> => {
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + `v1/deck/${deckID}`;
  try {
    let res = await fetch(url, {
      method: "GET",
    });
    return res.json();
  } catch (e) {
    console.log(e);
  }
};

export default getDeckListById;
