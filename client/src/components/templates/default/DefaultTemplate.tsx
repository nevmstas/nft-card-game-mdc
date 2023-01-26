import tw, { theme } from "twin.macro";
import { Divider } from "../../atoms";
import { GiEvilEyes, GiEvilLove } from "react-icons/gi";

interface Props {
  children?: React.ReactNode;
  headTitle: React.ReactNode;
  description?: string;
}

export default ({ headTitle, description, children }: Props) => {
  return (
    <div tw="bg-grey">
      <div tw="max-w-6xl mx-auto px-2.5 flex flex-col items-center md:items-start text-center md:text-start">
        <GiEvilEyes tw="md:-ml-6 h-20 w-20 text-red-light my-10" />
        <div tw="h-40 flex items-center">
          <Divider
            className="opacity-0 md:opacity-100"
            type="vertical"
            size="lg"
          />
          <div tw={"text-white md:text-5xl text-3xl md:ml-7 -ml-7"}>
            {headTitle}
          </div>
        </div>
        <div tw="md:ml-14 mt-10 text-2xl text-white opacity-80">
          <p>{description}</p>
          {children}
        </div>
        <footer tw="md:ml-14 text-xl text-white flex space-x-2 items-center absolute bottom-10 self-center">
          <span>Made with</span>
          <GiEvilLove tw="text-red-light" />
          <span>by</span>
          <a tw="underline" href="https://github.com/nevmstas">
            nevmstas
          </a>
        </footer>
      </div>
    </div>
  );
};
