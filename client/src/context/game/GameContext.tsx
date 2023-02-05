import React, { createContext, useEffect, useState } from "react";

import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { ABI, ADDRESS } from "../../contract";
import { useToast, useWallet } from "../../hooks";
import { EToastType } from "../../components/atoms/toast/Toast";
import { errorMsg } from "../../components/atoms/toast/consts";
import { noop } from "../../components/utils";
import { useNavigate } from "react-router-dom";
import createEventListeners from "../../utils/create-event-listeners";

interface IGameContext {
  registerPlayer: ({}: { name: string }) => Promise<void>;
}

export const GameContext = createContext<IGameContext>({
  registerPlayer: noop.async,
});

export const GameContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { show } = useToast();
  const { walletAddress } = useWallet();
  const [provider, setProvider] = useState<ethers.providers.Web3Provider>();
  const [contract, setContract] = useState<ethers.Contract>();

  const navigate = useNavigate();

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

  useEffect(() => {
    if (contract && provider)
      createEventListeners({
        navigate,
        provider,
        contract,
        walletAddress,
        show,
      });
  }, []);

  const registerPlayer = async ({ name }: { name: string }) => {
    try {
      const playerExists = await contract?.isPlayer(walletAddress);
      if (!playerExists) {
        await contract?.registerPlayer(name, name);
        show({
          type: EToastType.SUCCESS,
          id: "player-summoned-successfully",
          message: `${name} is being summoned!`,
        });
      } else {
        show({
          type: EToastType.INFO,
          id: "player-already-exists",
          message: `${name} is already exists!`,
        });
      }
    } catch (error: any) {
      show({
        type: EToastType.ERROR,
        id: "player-register-error",
        message: error.message,
      });
    }
  };

  return (
    <GameContext.Provider value={{ registerPlayer }}>
      {children}
    </GameContext.Provider>
  );
};
