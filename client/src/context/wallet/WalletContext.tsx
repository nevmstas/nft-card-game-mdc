import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

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
  const [walletAddress, setWalletAddress] = useState("");

  const updateCurrentWalletAddress = async () => {
    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      if (accounts) setWalletAddress(accounts[0]);
    } catch (error) {
      console.log(error);
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
