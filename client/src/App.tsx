import "./App.css";
import { Route, Routes } from "react-router-dom";
import tw, { styled } from "twin.macro";
import { CreateBattle, Home, JoinBattle } from "./components/pages";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create-battle" element={<CreateBattle />} />
      <Route path="/join-battle" element={<JoinBattle />} />
    </Routes>
  );
}

export default App;
