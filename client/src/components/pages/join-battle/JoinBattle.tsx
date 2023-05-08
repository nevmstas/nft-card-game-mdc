import React from "react";
import MonsterImg from "../../../assets/illustrations/monster-background.jpg";
import { useGame } from "../../../hooks";
import { BattleItem } from "../../organisms";
import { DefaultTemplate } from "../../templates";
import tw from "twin.macro";

export default () => {
  const {
    gameData: { pendingBattles },
  } = useGame();
  return (
    <DefaultTemplate
      headTitle={
        <>
          Join <br />a new Battle
        </>
      }
      description="Join already existing battle"
      img={MonsterImg}
    >
      <div tw="mt-10 ml-3 font-bold">Available battles:</div>
      <div tw="flex flex-col">
        {pendingBattles.map((battle, idx) => (
          <BattleItem
            key={battle.name + idx}
            battle={battle}
            number={idx + 1}
          />
        ))}
      </div>
    </DefaultTemplate>
  );
};
