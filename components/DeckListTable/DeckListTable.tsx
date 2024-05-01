import Link from "next/link";
import styles from "./DeckListTable.module.css";

async function getListOfDecks() {
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + "deck/list";
  const res = await fetch(url, {
    cache: 'no-store',
  });
  return res.json();
}

export default async function DeckListTable() {
  const decks = await getListOfDecks();
  return (
    <table className={styles.deckTable}>
      <tbody>
        <tr style={{borderBottom: '1px solid black'}}>
          <th>name</th>
          <th>leader</th>
          <th>author</th>
          <th>private</th>
        </tr>
        {decks?.map((i: any) => {
          return (
            <tr key={i.id} className={styles.tableItem}>
              <td>
                <Link href={`/decks/${i.id}`} className={styles.rowLink}>{i.name}</Link>
              </td>
              <td>{i.leader}</td>
              <td>{i.author}</td>
              <td>{i.isPrivate === true ? <span>&#128274;</span> : ""}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
