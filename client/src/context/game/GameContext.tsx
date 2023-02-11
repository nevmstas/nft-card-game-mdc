import React, { createContext, useCallback, useEffect, useState } from "react";

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
  createBattle: ({}: { battleName: string }) => Promise<void>;
  isPlayerTokenExists: boolean;
  waitBattle: boolean;
}

export const GameContext = createContext<IGameContext>({
  registerPlayer: noop.async,
  createBattle: noop.async,
  isPlayerTokenExists: false,
  waitBattle: false,
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
  const [isPlayerTokenExists, setIsPlayerTokenExist] = useState<boolean>(false);
  const [waitBattle, setWaitBattle] = useState(false);
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

  useEffect(() => {
    const fetchBattleGames = async () => {
      const battles = await contract?.getAllBattles();
      console.log(battles);
    };
    if (contract) fetchBattleGames();
  }, [contract]);

  const setIsPlayerToken = useCallback(async () => {
    const playerExists: boolean = await contract?.isPlayer(walletAddress);
    const isTokenExitsts: boolean = await contract?.isPlayerToken(
      walletAddress
    );

    setIsPlayerTokenExist(playerExists && isTokenExitsts);
  }, [contract, walletAddress]);

  const registerPlayer = useCallback(
    async ({ name }: { name: string }) => {
      try {
        const playerExists = await contract?.isPlayer(walletAddress);
        if (!playerExists) {
          await contract?.registerPlayer(name, name);
          setIsPlayerToken();
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
    },
    [contract]
  );

  const createBattle = useCallback(
    async ({ battleName }: { battleName: string }) => {
      try {
        await contract?.createBattle(battleName);
        setWaitBattle(true);
        show({
          type: EToastType.SUCCESS,
          id: "started-to-find-opponent",
          message: `Started to find opponent`,
        });
      } catch (e: any) {
        show({
          type: EToastType.ERROR,
          id: "player-register-error",
          message: e.message,
        });
      }
    },
    [contract]
  );

  useEffect(() => {
    setIsPlayerToken();
    if (!isPlayerTokenExists) navigate("/");
  }, [contract, walletAddress]);

  return (
    <GameContext.Provider
      value={{ registerPlayer, isPlayerTokenExists, createBattle, waitBattle }}
    >
      {children}
    </GameContext.Provider>
  );
};
