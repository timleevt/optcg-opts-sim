const retrieveDeckData = async (req: any): Promise<any> => {
    const url = process.env.NEXT_PUBLIC_API_BASE_URL + "v1/deck/data";
    try {
      let res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({deck: req}),
        next: {
          revalidate: 3600
        }
      },
    );
      return res;
    } catch (e) {
      console.log(e);
    }
  };
  
  export default retrieveDeckData;
  