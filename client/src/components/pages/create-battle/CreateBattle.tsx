import React from "react";
import { useToast } from "../../../hooks";
import { DefaultTemplate } from "../../templates";

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
      <div></div>
    </DefaultTemplate>
  );
};
