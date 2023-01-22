import "./App.css";
import tw, { styled } from "twin.macro";

const StyledInput = styled.input<any>(({ hasBorder }) => [
  `color: pink`,
  hasBorder && tw`border-purple-500`,
]);

function App() {
  return (
    <div className="text-3xl font-bold underline">
      <StyledInput hasBorder={true} />
      Hello World
    </div>
  );
}

export default App;
