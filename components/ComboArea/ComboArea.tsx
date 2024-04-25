import ComboBoard from "../ComboBoard/ComboBoard";
import DonBoard from "../DonBoard/DonBoard";

type Props = {
  leader?: string;
  deckId?: number;
  numDon: number;
  handleDonChange: (num: number) => void;
  currBoard: string[];
  comboBoard: string[];
  handleActionClick: (action: string) => void;
  activeBoard: string;
  setActiveBoard: (board: string) => void;
};
const ComboArea = ({
  leader,
  deckId,
  numDon,
  handleDonChange,
  currBoard,
  comboBoard,
  handleActionClick,
  activeBoard,
  setActiveBoard,
}: Props) => {
  return (
    <div>
      <DonBoard numDon={numDon} handleDonChange={handleDonChange} />
      <ComboBoard
        leader={leader}
        deckId={deckId}
        numDon={numDon}
        currBoard={currBoard}
        comboBoard={comboBoard}
        activeBoard={activeBoard}
        handleActionClick={handleActionClick}
        setActiveBoard={setActiveBoard}
      />
    </div>
  );
};

export default ComboArea;
