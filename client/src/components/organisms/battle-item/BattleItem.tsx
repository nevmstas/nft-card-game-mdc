import { IBattle } from "../../../context/game/GameContext";
import { Button } from "../../atoms";

import tw from "twin.macro";
import { GiAxeSword } from "react-icons/gi";
import { useGame, useToast } from "../../../hooks";
import { EToastType } from "../../atoms/toast/Toast";

interface IBattleItem {
  battle: IBattle;
  number: number;
}

export default ({ battle, number }: IBattleItem) => {
  const { joinBattle } = useGame();
  const { show } = useToast();
  const handleJoinBattle = () => {
    try {
      show({
        type: EToastType.INFO,
        id: "joining-battle",
        message: 'Joining battle'
      })
      joinBattle({ battleName: battle.name });
    } catch {}
  };
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
      <GiAxeSword
        tw="bg-violet-500 hover:bg-violet-400 ease-in-out transition rounded-xl md:w-10 h-10 p-2 cursor-pointer w-full"
        onClick={handleJoinBattle}
      />
    </div>
  );
};
