import tw from "twin.macro";

export default () => {
  const dot = tw`w-5 h-5 bg-white rounded-full animate-bounce`;
  return (
    <div tw="flex justify-center items-center">
      <div tw="inline-flex space-x-20">
        {[1, 2, 3].map((_) => (
          <div css={dot} />
        ))}
      </div>
    </div>
  );
};
