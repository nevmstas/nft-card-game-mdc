import "./App.css";
import { Route, Routes } from "react-router-dom";
import tw, { styled } from "twin.macro";
import { Battle, CreateBattle, Home, JoinBattle } from "./components/pages";

function App() {
  return (
    <div className="font-nunito">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-battle" element={<CreateBattle />} />
        <Route path="/join-battle" element={<JoinBattle />} />
        <Route path="/battle/:battleName" element={<Battle />} />
      </Routes>
    </div>
  );
}

export default App;
