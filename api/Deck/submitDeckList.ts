const submitDeckList = async (decklist: string): Promise<any> => {
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + "deck/submit-decklist";
  try {
    let res = await fetch(url, {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ deckStr: decklist}),
    });
    return res;
  } catch (e) {
    console.log(e);
  }
};

export default submitDeckList;

