import tw from "twin.macro";
import { GiAnglerFish, GiBoltShield, GiZeusSword } from "react-icons/gi";

import Tilt from "react-parallax-tilt";

const Card = () => {
  const actionsBase = tw`rounded-full w-10 h-10 flex justify-center items-center cursor-pointer relative`;
  return (
    <Tilt>
      <div tw="w-52 h-72 bg-violet-600 rounded-3xl flex flex-col justify-between py-4 bg-gradient-to-r from-violet-800">
        <div tw="flex flex-col ml-4">
          <h3 tw="text-xl font-bold text-white">Dark fish</h3>
          <span tw="font-light text-white opacity-70">Minion</span>
        </div>

        <div tw="flex justify-center text-white">
          <GiAnglerFish tw="h-32 w-32" />
        </div>

        <div tw="flex justify-between text-white w-44 [align-self: center]">
          <div css={[actionsBase, tw`bg-red`]}>
            <div tw="rounded-full absolute -right-3 text-white bg-red">
              <GiZeusSword tw="w-5 h-5" />
            </div>
            <span>9</span>
          </div>
          <div css={[actionsBase, tw`bg-amber-600`]}>
            <div tw="rounded-full absolute -left-3 text-white bg-amber-600">
              <GiBoltShield tw="w-5 h-5" />
            </div>
            <span>9</span>
          </div>
        </div>
      </div>
    </Tilt>
  );
};

export default Card;
