import DonBoard from "../DonBoard/DonBoard";

type Props = {
  numDon: number;
  handleDonChange: (num: number) => void;
};
const ComboArea = ({ numDon, handleDonChange }: Props) => {
  return (
    <div>
      <DonBoard numDon={numDon} handleDonChange={handleDonChange} />
    </div>
  );
};

export default ComboArea;
