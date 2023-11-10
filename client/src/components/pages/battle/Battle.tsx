import tw from 'twin.macro'
import Board from "../../../assets/illustrations/boards/dungeoun-board-2.png";
import { Card, PlayerInfo } from '../../organisms';
import { ActionButton } from '../../atoms';
import { GiAxeSword, GiBoltShield } from 'react-icons/gi'

const Battle = () => {
  return <div tw='flex'>
    <img
      tw="absolute left-0 top-0 -z-10 object-cover h-full md:w-full opacity-70"
      src={Board}
    />
    <div tw='flex flex-col w-full h-screen items-center justify-between'>
      <PlayerInfo health={10} name={'Player 1'} />
      <div tw='flex items-center gap-10'>
        <ActionButton Icon={GiAxeSword} tw='hover:bg-red-light bg-red' />
        <Card />
        <ActionButton Icon={GiBoltShield} />
      </div>
      <div tw='flex items-center gap-10'>
        <ActionButton Icon={GiAxeSword} tw='hover:bg-red-light bg-red' />
        <Card />
        <ActionButton Icon={GiBoltShield} />
      </div>
      <PlayerInfo health={10} name={'Player 2'} isEnemy />
    </div>
  </div>;
};
export default Battle;
