import tw from "twin.macro";
import { Avatar, HealtBar } from "../../atoms";

interface IPlayer {
  health: number;
  name: string;
}

interface IPlayersInfo {
  player: IPlayer;
  isEnemy?: boolean;
}

export default ({ player, isEnemy = false }: IPlayersInfo) => {
  return (
    <div tw="flex relative justify-center w-full">
      <div
        css={[
          tw`px-10 py-1 flex items-center justify-center bg-opacity-50 absolute top-10 left-0 rounded-r-2xl`,
          isEnemy ? tw`bg-red/80` : tw`bg-violet-800/80`,
        ]}
      >
        <span tw="text-2xl text-white">{player.name}</span>
      </div>

      <div tw="relative z-10">
        <div tw="absolute -right-10 bottom-8">
          <HealtBar health={player.health} />
        </div>

        <div
          css={[
            tw`rounded-full w-32 h-32 flex items-center justify-center`,
            isEnemy ? tw`bg-red` : tw`bg-violet-800`,
          ]}
        >
          <Avatar size="lg" />
        </div>
      </div>
    </div>
  );
};
