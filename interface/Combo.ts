export type ComboType = {
  id: string;
  deckId: number;
  currBoard: string;
  comboBoard: string;
  startCurve: number;
  endCurve: number;
  notes: string;
};

export interface Combo {
  id: string;
  leader: string;
  currBoard: string;
  comboBoard: string;
  startCurve: number;
  endCurve: number;
  notes: string;
}
