import React, { useEffect } from "react";
import { useGame, useToast } from "../../../hooks";
import InputField from "../../atoms/input-field";
import { DefaultTemplate } from "../../templates";
import MonsterImg from "../../../assets/illustrations/monster-background.jpg";
import tw from "twin.macro";
import { Button } from "../../atoms";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { GameLoad } from "../../organisms";

export default () => {
  const { createBattle, waitBattle, gameData } = useGame();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<{ battleName: string }>();

  const handleLinkClick = () => {
    navigate("/join-battle");
  };

  const onSubmit = ({ battleName }: { battleName: string }) => {
    if (!battleName || !battleName.trim()) return null;
    createBattle({ battleName });
  };

  return (
    <DefaultTemplate
      headTitle={
        <>
          Create <br />a new Battle
        </>
      }
      description="Create you own battle and wait for others players to join you"
      img={MonsterImg}
    >
      {waitBattle && <GameLoad />}
      <div tw="mt-10">
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputField
            {...register("battleName")}
            label="Battle name"
            placeholder="Enter the battle name"
            id="battleName"
            errorMessage={errors.battleName?.message}
          />
          <div tw="md:flex flex-row">
            <div>
              <Button label="Create battle" type="submit" tw="mt-4" />
            </div>
            <Button
              variant="link"
              label="Or join already existing battles"
              tw="self-end ml-4"
              onClick={handleLinkClick}
            />
          </div>
        </form>
      </div>
    </DefaultTemplate>
  );
};
