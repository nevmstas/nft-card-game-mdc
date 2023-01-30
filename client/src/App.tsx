import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import tw, { styled } from "twin.macro";
import { CreateBattle, Home } from "./components/pages";
import { WalletContextProvider } from "./context/wallet/WalletContext";
import { ToastContextProvider } from "./context/toast/ToastContext";

function App() {
  return (
    <ToastContextProvider>
      <WalletContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-battle" element={<CreateBattle />} />
          </Routes>
        </BrowserRouter>
      </WalletContextProvider>
    </ToastContextProvider>
  );
}

export default App;
