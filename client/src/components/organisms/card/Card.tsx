import tw from 'twin.macro'
import { GiAnglerFish, GiBoltShield, GiZeusSword } from "react-icons/gi";

import Tilt from 'react-parallax-tilt'

const Card = () => {

    const actionsBase = tw`rounded-full border-4 border-white w-10 h-10 flex justify-center items-center cursor-pointer relative`
    return <Tilt>
        <div tw="w-56 h-72 bg-violet-400 rounded-3xl flex justify-center items-center flex-col p-10 border-4 border-violet-800">
        <div tw="flex flex-col text-center">
            <div tw='rounded-full p-2 bg-violet-300 text-violet-800'><GiAnglerFish tw="h-32 w-32" /></div>
            <h3 tw='text-xl font-bold text-violet-800'>Dark fish</h3>
            <span tw='font-light text-violet-700'>Minion</span>
        </div>

        <div tw='flex justify-between w-full text-white'>
            <div css={[actionsBase, tw`bg-amber-600`]}>
            <div tw='rounded-full absolute -left-3 text-white bg-amber-600'><GiBoltShield tw='w-5 h-5' /></div>
                <span>9</span>
            </div>
            <div css={[actionsBase, tw`bg-red`]}>
                <div tw='rounded-full absolute -right-3 text-white bg-red'><GiZeusSword tw='w-5 h-5' /></div>
                <span>9</span>
            </div>
        </div>

        <h2 tw='font-bold text-violet-800'>Account2</h2>
    </div>
    </Tilt>
}

export default Card