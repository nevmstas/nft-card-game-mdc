import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import tw from "twin.macro";
import MonsterImg from "../../../assets/illustrations/monster-background.jpg";
import { useGame } from "../../../hooks";
import Button from "../../atoms/button/Button";
import InputField from "../../atoms/input-field/InputField";
import { DefaultTemplate } from "../../templates";

export default () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ name: string }>();

  const { registerPlayer, isPlayerTokenExists } = useGame();
  const navigate = useNavigate();

  useEffect(() => {
    isPlayerTokenExists && navigate("create-battle");
  }, [isPlayerTokenExists]);

  const onSubmit = ({ name }: { name: string }) => {
    registerPlayer({ name });
  };

  return (
    <>
      <DefaultTemplate
        headTitle={
          <>
            Welcome to <br />
            <span tw="text-red-light">Magic Dungeon Creatures</span> <br /> a{" "}
            <span tw="text-violet-500">Web3</span> NFT Card Game
          </>
        }
        description="Connect your wallet to start playing the ultimate Web3 Battle Game"
      >
        <img
          tw="absolute left-0 top-0 opacity-30 -z-10 object-cover md:object-fill h-full md:w-full"
          src={MonsterImg}
        ></img>
        <form onSubmit={handleSubmit(onSubmit)} tw="mt-10 space-y-6">
          <InputField
            id="name"
            {...register("name")}
            label="Name"
            placeholder="Enter the name"
            errorMessage={errors.name?.message}
          />
          <Button label="Register" />
        </form>
      </DefaultTemplate>
    </>
  );
};
