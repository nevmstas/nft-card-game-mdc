import { AnimatePresence, motion } from "framer-motion";
import React, { useCallback, useEffect } from "react";
import {
  GiMimicChest,
  GiOpenTreasureChest,
  GiSpellBook,
  GiBurningBook,
} from "react-icons/gi";
import { VscClose } from "react-icons/vsc";
import tw, { css } from "twin.macro";
import { ToastId } from "./consts";

export enum EToastType {
  ERROR = "error",
  WARNING = "warning",
  INFO = "info",
  SUCCESS = "success",
}
export interface IToast {
  id: ToastId;
  type: EToastType;
  message: string;
  close: (id: string) => void;
}

const commonIconStyles = tw`w-10 h-10 mr-3 rounded-full flex items-center justify-center text-white`;

const icons = {
  [EToastType.ERROR]: (
    <div css={[tw`bg-red-light`, commonIconStyles]}>
      <GiMimicChest />
    </div>
  ),
  [EToastType.WARNING]: (
    <div css={[tw`bg-orange-400`, commonIconStyles]}>
      <GiBurningBook />
    </div>
  ),
  [EToastType.SUCCESS]: (
    <div css={[tw`bg-green-400`, commonIconStyles]}>
      <GiOpenTreasureChest />
    </div>
  ),
  [EToastType.INFO]: (
    <div css={[tw`bg-blue-400`, commonIconStyles]}>
      <GiSpellBook />
    </div>
  ),
};

const DURATION = 3000;

export default ({ message, type, close, id }: IToast) => {
  const icon = icons[type];

  const bgColors = {
    [EToastType.SUCCESS]: tw`bg-green-200 shadow-green-400`,
    [EToastType.ERROR]: tw`bg-[#FF7276] shadow-[#FF7276]`,
    [EToastType.WARNING]: tw`bg-orange-200 shadow-orange-200`,
    [EToastType.INFO]: tw`bg-blue-200 shadow-blue-200`,
  };

  const base = [
    tw`m-3 flex rounded-2xl p-2 justify-between items-center max-w-xs text-black shadow`,
    bgColors[type],
  ];

  useEffect(() => {
    if (!DURATION) {
      return;
    }

    const timeoutId = setTimeout(() => {
      close(id);
    }, DURATION);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [id]);

  const handleClose = () => close(id);

  return (
    <motion.div
      css={base}
      layout
      initial={{ opacity: 0, y: -50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
    >
      <div tw="flex items-center">
        <div tw="w-12">{icon}</div>
        {message}
      </div>
      <div tw="cursor-pointer h-10 w-10 rounded-full flex items-center justify-center">
        <VscClose onClick={handleClose} />
      </div>
    </motion.div>
  );
};
