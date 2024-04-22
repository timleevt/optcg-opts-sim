export type CardType = {
  code: string;
  name: string;
  cardType: string;
  cost: number | null;
  type: string[];
  power: number | null;
  attribute: string[];
  counterPower: number | null;
  colors: string[];
  effect: string | null;
  trigger: string | null;
  copies: number;
};
