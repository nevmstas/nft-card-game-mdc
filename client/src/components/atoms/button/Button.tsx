import React, { ButtonHTMLAttributes } from "react";
import tw from "twin.macro";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: "primary" | "secondary";
  size?: "sm" | "md";
  label: string;
  variant?: "link" | "default";
}

export default ({
  color = "primary",
  label,
  variant = "default",
  ...props
}: IProps) => {
  const base = tw`p-2 rounded-xl font-bold text-base transition ease-in-out w-full`;

  const text =
    variant === "link"
      ? tw`text-violet-400  hover:text-violet-300 w-full text-center md:text-start px-2`
      : tw`text-white md:w-32`;

  const colors = {
    primary: tw`bg-violet-700 hover:bg-violet-600`,
    secondary: tw`bg-red-light hover:bg-red`,
  };
  return (
    <button css={[base, variant === "link" || colors[color], text]} {...props}>
      {label}
    </button>
  );
};
