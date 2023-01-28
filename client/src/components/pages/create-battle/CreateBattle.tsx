import React from "react";
import { DefaultTemplate } from "../../templates";

export default () => {
  return (
    <DefaultTemplate
      headTitle={
        <>
          Create <br />a new Battle
        </>
      }
      description="Create you own battle and wait for others players to join you"
    >
      <div>Create battle</div>
    </DefaultTemplate>
  );
};
