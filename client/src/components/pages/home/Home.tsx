import React from "react";
import { DefaultTemplate } from "../../templates";

export default () => {
  return (
    <DefaultTemplate
      headTitle={
        <React.Fragment>
          <h1>Welcome to Magic Dungeon Creatures</h1>
          <h1>a Web3 NFT Card Game</h1>
        </React.Fragment>
      }
      description="Connect your wallet to start playing the ultimate Web3 Battle Game"
    >
      <div>Hi from home page</div>
    </DefaultTemplate>
  );
};
