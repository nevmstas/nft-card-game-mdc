import tw from "twin.macro";
import { GiArchitectMask } from "react-icons/gi";
import { IconType } from "react-icons";

const ICON_SIZE = 60;

interface IProps {
  size?: "sm" | "lg";
  Icon?: IconType;
}

export default ({ size = "sm", Icon }: IProps) => {
  const base = tw`rounded-full bg-transparent/50 flex justify-center items-center text-white`;
  const sizes = {
    sm: tw`w-10 h-10`,
    lg: tw`w-28 h-28`,
  };
  return (
    <div css={[base, sizes[size]]}>
      {Icon ? <Icon size={ICON_SIZE} /> : <GiArchitectMask size={ICON_SIZE} />}
    </div>
  );
};
