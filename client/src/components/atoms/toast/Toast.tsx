import React from "react";
import {
  GiMimicChest,
  GiOpenTreasureChest,
  GiSpellBook,
  GiBurningBook,
} from "react-icons/gi";
import { VscClose } from "react-icons/vsc";
import tw, { css } from "twin.macro";

interface IToast {
  type: "error" | "warning" | "success" | "info";
  message: string;
  onClose: () => void;
}

const commonIconStyles = tw`w-10 h-10 mr-3 rounded-full flex items-center justify-center text-white`;

const icons = {
  error: (
    <div css={[tw`bg-red-light`, commonIconStyles]}>
      <GiMimicChest />
    </div>
  ),
  warning: (
    <div css={[tw`bg-orange-400`, commonIconStyles]}>
      <GiBurningBook />
    </div>
  ),
  success: (
    <div css={[tw`bg-green-400`, commonIconStyles]}>
      <GiOpenTreasureChest />
    </div>
  ),
  info: (
    <div css={[tw`bg-blue-400`, commonIconStyles]}>
      <GiSpellBook />
    </div>
  ),
};

export default ({ message, type, onClose }: IToast) => {
  const icon = icons[type];

  const bgColors = {
    success: tw`bg-green-200 shadow-green-400`,
    error: tw`bg-[#FF7276] shadow-[#FF7276]`,
    warning: tw`bg-orange-200 shadow-orange-200`,
    info: tw`bg-blue-200 shadow-blue-200`,
  };

  const base = [
    tw`absolute w-auto md:right-3 top-3 m-3 flex rounded-2xl p-2 justify-between items-center md:w-64 text-black text-lg shadow`,
    bgColors[type],
  ];

  return (
    <div css={base}>
      <div tw="flex items-center">
        <div tw="w-20">{icon}</div>
        {message}
      </div>
      <div tw="cursor-pointer h-10 w-10 rounded-full flex items-center justify-center">
        <VscClose onClick={onClose} />
      </div>
    </div>
  );
};
