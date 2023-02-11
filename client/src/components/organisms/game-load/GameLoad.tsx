import React from "react";
import tw from "twin.macro";
import { Button } from "../../atoms";

export default () => {
  return (
    <>
      <div
        tw="absolute inset-0 z-10 w-full h-screen flex-col flex items-center"
        className="gameload"
      >
        <Button
          label="Choose Battleground"
          tw="mt-6"
          onClick={() => alert("go to choosing battlegrounds")}
        />
        <div tw="h-full pt-80 uppercase">
          <span>Waiting for opponent...</span>
        </div>
      </div>
    </>
  );
};
