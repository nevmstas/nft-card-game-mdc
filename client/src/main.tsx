import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import GlobalStyles from "./styles/GlobalStyles";
import "./index.css";
import { WalletContextProvider } from "./context/wallet/WalletContext";
import { GameContextProvider } from "./context/game/GameContext";
import { ToastContextProvider } from "./context/toast/ToastContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ToastContextProvider>
      <WalletContextProvider>
        <GameContextProvider>
          <GlobalStyles />
          <App />
        </GameContextProvider>
      </WalletContextProvider>
    </ToastContextProvider>
  </React.StrictMode>
);
