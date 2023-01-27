import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { ethers } from "ethers";
import Web3Modal from "web3modal";

interface IWalletContext {
  walletAddress: string;
}

export const WalletContext = createContext<IWalletContext>({
  walletAddress: "",
});

//TODO: separate wallet & transaction contexts
export const WalletContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [walletAddress, setWalletAddress] = useState("");

  const updateCurrentWalletAddress = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccount",
    });

    if (accounts) setWalletAddress(accounts[0]);
  };

  useEffect(() => {
    updateCurrentWalletAddress();
    window.ethereum.on("accountsChanged", updateCurrentWalletAddress);
  });

  useEffect(() => {
    const setSmartContractAndProvider = async () => {
      const web3Modal = new Web3Modal();
      const instance = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(instance);
      const signer = provider.getSigner();
      //TODO: params from deployed contract ADDRESS, ABI
      const contract = new ethers.Contract("", "", signer);
      console.log(contract);
    };
    setSmartContractAndProvider();
  });

  return (
    <WalletContext.Provider value={{ walletAddress }}>
      {children}
    </WalletContext.Provider>
  );
};
