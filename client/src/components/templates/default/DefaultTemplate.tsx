import tw, { theme } from "twin.macro";
import { Divider } from "../../atoms";
import { GiEvilHand, GiEvilLove } from "react-icons/gi";

interface Props {
  children?: React.ReactNode;
  headTitle: React.ReactNode;
  description?: string;
  img: string;
}

export default ({ headTitle, description, children, img }: Props) => {
  return (
    <div>
      <div tw="max-w-6xl mx-auto px-2.5 flex flex-col items-center md:items-start text-center md:text-start">
        <GiEvilHand tw="md:-ml-6 h-20 w-20 text-red-light my-10" />
        <div tw="md:h-40 h-20 flex items-center">
          <Divider tw="opacity-0 md:opacity-100" type="vertical" size="lg" />
          <div tw={"text-white md:text-5xl text-3xl md:ml-7 -ml-7"}>
            {headTitle}
          </div>
        </div>
        <div tw="md:ml-14 mt-10 text-2xl text-white">
          <p tw="opacity-80">{description}</p>
          {children}
          <img
            tw="absolute left-0 top-0 opacity-30 -z-10 object-cover h-full md:w-full"
            src={img}
          ></img>
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
