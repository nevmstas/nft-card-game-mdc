import React from "react";
import { useToast } from "../../../hooks";
import InputField from "../../atoms/input-field";
import { DefaultTemplate } from "../../templates";
import tw from "twin.macro";

export default () => {
  const { show } = useToast();
  return (
    <DefaultTemplate
      headTitle={
        <>
          Create <br />a new Battle
        </>
      }
      description="Create you own battle and wait for others players to join you"
    >
      <div tw="w-80 mt-10">
        <InputField label="Battle name" placeholder="Enter the battle name" />
      </div>
    </DefaultTemplate>
  );
};
