import tw, { css } from "twin.macro";

interface Props {
  type?: "vertical" | "horizontal";
  color?: "bg-indigo-800" | "bg-indigo-900";
  size?: "sm" | "lg";
}

export default ({
  type = "horizontal",
  color = "bg-indigo-900",
  size = "sm",
}: Props) => {
  const sizes = {
    lg: tw`w-7`,
    sm: tw`w-1`,
  };

  const positionTypes = {
    vertical: tw`h-full`,
    horizontal: tw`w-full`,
  };

  const base = [tw`bg-indigo-900`, positionTypes[type], sizes[size]];

  return <div css={base}></div>;
};
