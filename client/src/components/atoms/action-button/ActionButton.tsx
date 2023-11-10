import { ButtonHTMLAttributes } from "react"
import { IconType } from "react-icons";
import tw from 'twin.macro'

interface IActionButton extends ButtonHTMLAttributes<HTMLDivElement> {
    Icon: IconType;
}

export default ({ Icon, ...props }: IActionButton) => {
    return <div tw="w-16 h-16 rounded-full flex justify-center items-center bg-violet-500 text-white border-white border-4 cursor-pointer hover:bg-violet-800 ease-in-out transition" {...props}>
        <Icon size={30} />
    </div>
}
