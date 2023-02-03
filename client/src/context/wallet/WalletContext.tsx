import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  errorMsg,
  successMsg,
  ToastId,
} from "../../components/atoms/toast/consts";
import { EToastType } from "../../components/atoms/toast/Toast";
import { useToast } from "../../hooks";

const { ethereum } = window;

interface IWalletContext {
  walletAddress: string;
}

export const WalletContext = createContext<IWalletContext>({
  walletAddress: "",
});

export const WalletContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { show } = useToast();
  const [walletAddress, setWalletAddress] = useState("");

  const updateCurrentWalletAddress = async () => {
    try {
      if (!ethereum)
        show({
          id: "error-no-ethereum-object",
          message: errorMsg.NO_ETHEREUM_OBJECT,
          type: EToastType.ERROR,
        });
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      if (accounts) setWalletAddress(accounts[0]);
    } catch (error) {
      show({
        id: "error-installmetamask",
        message: errorMsg.INSTALL_METAMASK,
        type: EToastType.ERROR,
      });
    }
  };

  useEffect(() => {
    updateCurrentWalletAddress();
    window.ethereum.on("accountsChanged", updateCurrentWalletAddress);
  }, []);

  return (
    <WalletContext.Provider value={{ walletAddress }}>
      {children}
    </WalletContext.Provider>
  );
};
