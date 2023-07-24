import { ethers } from "ethers";
import { NavigateFunction } from "react-router-dom";
import { EToastType, IToast } from "../../components/atoms/toast/Toast";
import { ABI } from "../../contract";

const addNewEvent = (
  eventFilter: ethers.EventFilter,
  provider: any,
  callback: (props: ethers.utils.LogDescription) => void
) => {
  console.log({ eventFilter });
  provider.removeListener(eventFilter);

  provider.on(eventFilter, (logs: any) => {
    const parsedLog = new ethers.utils.Interface(ABI).parseLog(logs);

    callback(parsedLog);
  });
};

interface IProps {
  contract: ethers.Contract;
  provider: ethers.providers.Web3Provider;
  walletAddress: string;
  navigate: NavigateFunction;
  show: (toastConfig: Pick<IToast, "id" | "message" | "type">) => void;
  setUpdateGameData: React.Dispatch<React.SetStateAction<number>>;
}

export default ({
  contract,
  provider,
  walletAddress,
  navigate,
  show,
  setUpdateGameData,
}: IProps) => {
  const newPlayerEventFilter = contract.filters.NewPlayer();

  addNewEvent(newPlayerEventFilter, provider, ({ args }) => {
    console.log(args.owner, walletAddress);
    if (args.owner === walletAddress) {
      show({
        type: EToastType.SUCCESS,
        id: "player-registered-successfully",
        message: `Player has been successfully registered!`,
      });
      navigate("create-battle");
    }
  });

  const newBattleEventFilter = contract.filters.NewBattle();

  addNewEvent(newBattleEventFilter, provider, ({ args }) => {
    console.log("new battle started", args, walletAddress);

    if (
      walletAddress.toLowerCase() === args.player1.toLowerCase() ||
      walletAddress.toLocaleLowerCase() === args.player2.toLowerCase()
    ) {
      navigate(`/battle/${args.battleName}`);
    }
    setUpdateGameData((prev) => prev + 1);
  });
};
