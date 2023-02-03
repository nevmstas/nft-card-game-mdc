import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import GlobalStyles from "./styles/GlobalStyles";
import "./index.css";
import { WalletContextProvider } from "./context/wallet/WalletContext";
import { GameContextProvider } from "./context/game/GameContext";
import { ToastContextProvider } from "./context/toast/ToastContext";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ToastContextProvider>
        <WalletContextProvider>
          <GameContextProvider>
            <GlobalStyles />
            <App />
          </GameContextProvider>
        </WalletContextProvider>
      </ToastContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
