import tw from "twin.macro";
import { Divider } from "../../atoms";

interface Props {
  children?: React.ReactNode;
  headTitle: string;
  description?: string;
}

export default ({ headTitle, description, children }: Props) => {
  return (
    <div tw="bg-indigo-500">
      <div tw="max-w-4xl mx-auto px-2.5 bg-indigo-500">
        <div tw="flex h-40 items-end">
          <Divider type="vertical" size="lg" />
          <h1 tw="text-8xl text-white ml-5 m-0">{headTitle}</h1>
        </div>
        <p tw="text-blue-200">{description}</p>
        {children}
      </div>
    </div>
  );
};
