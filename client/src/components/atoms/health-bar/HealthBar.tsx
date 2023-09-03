import tw from 'twin.macro'
import { GiHearts } from "react-icons/gi";

interface IHealtBar {
    health: number
}

export default ({ health }: IHealtBar) => {
    return <div tw='flex justify-center items-center relative'>
        <GiHearts tw='text-red-light w-14 h-14' />
        <span tw="text-white font-bold text-2xl z-10 absolute">{health}</span>
    </div>
}

