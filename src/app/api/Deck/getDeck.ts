// TODO: so apparently you can't send a body with GET requests

const getDeck = async (decklist: string): Promise<any> => {
    console.log("inside here")
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + "deck";
  try {
    let res = await fetch(url, {
      body: JSON.stringify({ deckStr: decklist }),
    });
    return res;
  } catch (e) {
    console.log(e);
  }
};

export default getDeck;

