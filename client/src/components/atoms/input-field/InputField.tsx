import React, { InputHTMLAttributes } from "react";
import tw, { css } from "twin.macro";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errorMessage?: string;
}

export default React.forwardRef(
  (
    { errorMessage, label, ...props }: IProps,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <div tw="flex flex-col space-y-2">
        <label css={tw`ml-3 font-bold text-2xl self-start`}>{label}</label>
        <input
          {...props}
          ref={ref}
          css={[
            tw`rounded-xl p-3 focus:outline-0 border-4 placeholder:bg-light-gray bg-light-gray md:w-80 w-full`,
            errorMessage && tw`border-red-light`,
          ]}
        />
        {errorMessage && <span tw="ml-3 text-red-light">{errorMessage}</span>}
      </div>
    );
  }
);
