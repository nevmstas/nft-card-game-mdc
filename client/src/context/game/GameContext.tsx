import React, { createContext, useEffect, useState } from "react";

import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { ABI, ADDRESS } from "../../contract";
import { useToast, useWallet } from "../../hooks";
import { EToastType } from "../../components/atoms/toast/Toast";
import { errorMsg } from "../../components/atoms/toast/consts";

interface IGameContext {}

export const GameContext = createContext<IGameContext>({});

export const GameContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { show } = useToast();
  const [provider, setProvider] = useState<ethers.providers.Web3Provider>();
  const [contract, setContract] = useState<ethers.Contract>();

  useEffect(() => {
    try {
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
    } catch (e) {
      show({
        id: "something-went-wrong",
        message: errorMsg.SOMETHING_WENT_WRONG,
        type: EToastType.ERROR,
      });
    }
  }, []);

  return <GameContext.Provider value={{}}>{children}</GameContext.Provider>;
};
