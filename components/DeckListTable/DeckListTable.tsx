import Link from "next/link";
import styles from "./DeckListTable.module.css";
import Card from "../Card/Card";

async function getListOfDecks() {
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + "deck/list";
  try {
    const res = await fetch(url, {
      cache: "no-store",
    });
    return res.json();
  } catch (error) {}
}

export default async function DeckListTable() {
  const decks = await getListOfDecks();
  return (
    <table className={styles.deckTable}>
      <tbody>
        <tr style={{ borderBottom: "1px solid black" }}>
          <th>name</th>
          <th>author</th>
          <th>leader</th>
        </tr>
        {decks?.map((i: any) => {
          return (
            <tr key={i.id} className={styles.tableItem}>
              <td>
                <Link href={`/decks/${i.id}`} className={styles.rowLink}>
                  {i.name}
                </Link>
              </td>
              <td>{i.author}</td>
              <td>
                <Card code={i.leader} active mini />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
