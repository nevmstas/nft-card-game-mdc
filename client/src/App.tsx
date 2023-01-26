import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import tw, { styled } from "twin.macro";
import { CreateBattle, Home } from "./components/pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-battle" element={<CreateBattle />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
