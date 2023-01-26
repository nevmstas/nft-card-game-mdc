import tw from "twin.macro";

interface Props {
  type?: "secondary";
}

const getStyles = ({ type }: Props) => {
  return type === "secondary" ? tw`text-[#FFC107]` : tw`text-white`;
};

export 



