import React from "react";
import MonsterImg from "../../../assets/illustrations/monster-background.jpg";
import { DefaultTemplate } from "../../templates";

export default () => {
  console.log("join baltt");
  return (
    <DefaultTemplate
      headTitle={
        <>
          Join <br />a new Battle
        </>
      }
      description="Join already existing battle"
      img={MonsterImg}
    >
      <div tw="mt-10">Join battle page</div>
    </DefaultTemplate>
  );
};
