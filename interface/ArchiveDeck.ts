import { CardType } from "./Card";

type ArchiveDeck = {
  id: string;
  author: string
  name: string;
  format: string;
  leader: string;
  leaderCode: CardType;
};

export default ArchiveDeck;
