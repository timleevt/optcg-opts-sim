type Data = {
  author: string;
  decklist: string;
  deckname?: string;
};

const submitDeckList = async ({ decklist, deckname, author }: Data): Promise<any> => {
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + "deck/submit-decklist";
  const checkDeckName = deckname === "" ? `${author}'s deck` : deckname;
  try {
    let res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ deckStr: decklist, deckname: checkDeckName, author }),
    });
    return res;
  } catch (e) {
    console.log(e);
  }
};

export default submitDeckList;
