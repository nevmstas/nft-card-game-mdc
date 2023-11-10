import tw from 'twin.macro'
import { Avatar, HealtBar } from "../../atoms"

interface IPlayerInfo {
    health: number
    name: string
    isEnemy?: boolean
}

export default ({ health, name, isEnemy = false }: IPlayerInfo) => {
    return <div
        css={[tw`h-64 w-full sm:w-96 flex justify-center items-center flex-col`,
        isEnemy ? tw`rounded-t-full` : tw`rounded-b-full`]}
    >
        <div tw='relative z-10'>
            <div tw='absolute right-0'>
                <HealtBar health={health} />
            </div>

            <div tw='rounded-full bg-violet-800 w-32 h-32 flex items-center justify-center'>
                <Avatar size="lg" />
            </div>
        </div>
        <div tw='rounded-2xl px-10 py-1 bg-violet-800 flex items-center justify-center -translate-y-1'>
            <span tw='text-2xl text-white'>{name}</span>
        </div>
    </div>
}