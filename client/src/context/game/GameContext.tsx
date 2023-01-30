import React, { createContext, useEffect, useState } from "react";

import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { ABI, ADDRESS } from "../../contract";

interface IGameContext {}

export const GameContext = createContext<IGameContext>({});

export const GameContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [provider, setProvider] = useState<ethers.providers.Web3Provider>();
  const [contract, setContract] = useState<ethers.Contract>();

  useEffect(() => {
    const setSmartContractAndProvider = async () => {
      const web3Modal = new Web3Modal();
      const instance = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(instance);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(ADDRESS, ABI, signer);
      setProvider(provider);
      setContract(contract);
    };
    setSmartContractAndProvider();
  }, []);

  return <GameContext.Provider value={{}}>{children}</GameContext.Provider>;
};
