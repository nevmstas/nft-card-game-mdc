import { IBattle } from "../../../context/game/GameContext";
import { Button } from "../../atoms";

import tw from "twin.macro";
import { GiAxeSword } from "react-icons/gi";

interface IBattleItem {
  battle: IBattle;
  number: number;
}

export default ({ battle, number }: IBattleItem) => {
  return (
    <div
      tw="flex 
             md:flex-row 
             flex-col 
             w-full 
             my-3 
             bg-grey 
             border 
             border-violet-500 
             rounded-2xl px-4 py-2 items-center justify-between"
    >
      <span tw="md:mr-64 mr-0 mb-2 md:mb-0">
        {number}. {battle.name}
      </span>
      <GiAxeSword tw="bg-violet-500 hover:bg-violet-400 ease-in-out transition rounded-xl md:w-10 h-10 p-2 cursor-pointer w-full" />
    </div>
  );
};
