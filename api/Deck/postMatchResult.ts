const postMatchResult = async (req: any): Promise<any> => {
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + "deck/match";

  try {
    let res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        match: req,
      }),
    });
    return res;
  } catch (e) {
    console.log(e);
    return;
  }
};

export default postMatchResult;
