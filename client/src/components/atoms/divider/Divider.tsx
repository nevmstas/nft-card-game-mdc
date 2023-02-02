import { CSSProperties } from "@emotion/serialize";
import tw, { css } from "twin.macro";

interface Props {
  type?: "vertical" | "horizontal";
  style?: "light" | "dark";
  size?: "sm" | "lg";
  className?: string;
}

export default ({
  type = "horizontal",
  size = "sm",
  style = "light",
  ...props
}: Props) => {
  const color = style === "dark" ? tw`bg-black` : tw`bg-red-light`;
  const sizes = {
    lg: tw`w-7`,
    sm: tw`w-1`,
  };
  const positionTypes = {
    vertical: tw`h-full`,
    horizontal: tw`w-full`,
  };

  const base = [color, positionTypes[type], sizes[size]];

  return <div css={base} {...props}></div>;
};
