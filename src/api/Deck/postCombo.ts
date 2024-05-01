const postCombo = async (req: any): Promise<any> => {
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + "deck/combo";

  const currBoardStr = req.currBoard.join(",");
  const comboBoardStr = req.comboBoard.join(",");

  try {
    if (comboBoardStr === "") {
      // throw an error here
      return;
    }

    let res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        deckId: req.deckId,
        currBoard: currBoardStr,
        comboBoard: comboBoardStr,
        startCurve: req.startCurve,
        endCurve: req.endCurve,
        notes: req.notes,
      }),
    });
    return res;
  } catch (e) {
    console.log(e);
  }
};

export default postCombo;
