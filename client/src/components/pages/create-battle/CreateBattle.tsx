import React from "react";
import { Toast } from "../../atoms";
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
      <div>
        <Toast type="error" message="test error test error test error test error test error test test error test" onClose={() => {}} />
      </div>
    </DefaultTemplate>
  );
};
