import React from "react";
import tw from "twin.macro";
import MonsterImg from "../../../assets/illustrations/monster-background.jpg";
import { DefaultTemplate } from "../../templates";

export default () => {
  return (
    <>
      <DefaultTemplate
        headTitle={
          <>
            Welcome to <span tw="text-red-light">Magic Dungeon Creatures</span>{" "}
            <br /> a <span tw="text-violet-500">Web3</span> NFT Card Game
          </>
        }
        description="Connect your wallet to start playing the ultimate Web3 Battle Game"
      >
        <img
          tw="absolute left-0 top-0 opacity-30 object-cover md:object-fill h-full md:w-full"
          src={MonsterImg}
        ></img>
      </DefaultTemplate>
    </>
  );
};
