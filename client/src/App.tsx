import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import tw, { styled } from "twin.macro";
import { CreateBattle, Home } from "./components/pages";
import { WalletContextProvider } from "./context/wallet/WalletContext";

function App() {
  return (
    <WalletContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-battle" element={<CreateBattle />} />
        </Routes>
      </BrowserRouter>
    </WalletContextProvider>
  );
}

export default App;
