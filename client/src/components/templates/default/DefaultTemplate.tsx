import tw from "twin.macro";

interface Props {
  children?: React.ReactNode;
  headTitle: string;
  description?: string;
}

export default ({ headTitle, description, children }: Props) => {
  return (
    <div>
      <h1>{headTitle}</h1>
      <p>{description}</p>
      {children}
    </div>
  );
};
