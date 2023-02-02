import React, { ButtonHTMLAttributes } from "react";
import tw from "twin.macro";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  size?: "sm" | "md";
  label: string;
}

export default ({ variant = "primary", label, ...props }: IProps) => {
  const base = tw`p-3 text-white rounded-xl font-bold text-base transition ease-in-out md:w-32 w-full`;
  const variants = {
    primary: tw`bg-violet-700 hover:bg-violet-600`,
    secondary: tw`bg-red-light hover:bg-red`,
  };
  return (
    <button css={[base, variants[variant]]} {...props}>
      {label}
    </button>
  );
};
