import tw from "twin.macro";
import Board from "../../../assets/illustrations/boards/dungeoun-board-2.png";
import { Card, PlayersInfo } from "../../organisms";
import { ActionButton } from "../../atoms";
import { GiAxeSword, GiBoltShield } from "react-icons/gi";

const PLAYERS_MOCK = {
  player: { health: 10, name: "Jok3r" },
  enemy: { health: 10, name: "DevilJin" },
};

const Battle = () => {
  return (
    <div tw="flex">
      <img
        tw="absolute left-0 top-0 -z-10 object-cover h-full md:w-full opacity-50"
        src={Board}
      />
      {/* <div tw="absolute left-0 top-0 -z-10 object-cover bg-indigo-600 md:w-full opacity-70" /> */}

      <div tw="flex flex-col w-full h-screen items-center justify-around">
        <PlayersInfo player={PLAYERS_MOCK.player} isEnemy />
        <div tw="flex items-center gap-10">
          <ActionButton Icon={GiAxeSword} tw="hover:bg-red-light bg-red" />
          <Card />
          <ActionButton Icon={GiBoltShield} />
        </div>
        <div tw="flex items-center gap-10">
          <ActionButton Icon={GiAxeSword} tw="hover:bg-red-light bg-red" />
          <Card />
          <ActionButton Icon={GiBoltShield} />
        </div>
        <PlayersInfo player={PLAYERS_MOCK.enemy} />
      </div>
    </div>
  );
};
export default Battle;
