import React from "react";
import tw from "twin.macro";
import { Button } from "../../atoms";
import ThreeDotsLoader from "../../atoms/three-dots-loader";
import Avatar from "../../atoms/avatar/Avatar";

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
        <div tw="h-full pt-80 uppercase space-y-20 flex flex-col items-center">
          <span>Waiting for opponent</span>
          <div tw="flex md:space-x-12 md:flex-row flex-col md:space-y-0 space-y-12 items-center">
            <Avatar size="lg" />
            <ThreeDotsLoader />
            <Avatar size="lg" />
          </div>
        </div>
      </div>
    </>
  );
};
