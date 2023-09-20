import tw from 'twin.macro'
import Board from "../../../assets/illustrations/boards/dungeoun-board-2.png";

const Battle = () => {
  return <div tw='flex'>
    <img
      tw="absolute left-0 top-0 -z-10 object-cover h-full md:w-full"
      src={Board}
    />
  </div>;
};
export default Battle;
