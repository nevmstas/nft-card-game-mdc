export type ToastId =
  | "something-went-wrong"
  | "error-installmetamask"
  | "error-no-ethereum-object"
  | "metamask-connected"
  | "player-register-error"
  | "player-registered-successfully"
  | "player-summoned-successfully"
  | "player-already-exists"
  | "started-to-find-opponent"

export const errorMsg = {
  INSTALL_METAMASK: "Please install metamask",
  NO_ETHEREUM_OBJECT: "No ethereum object",
  SOMETHING_WENT_WRONG: "Something went wrong",
};

export const successMsg = {
  METAMASK_CONNECTED: "Metamask connected",
  PLAYER_REGISTERED: "Player registered successfully",
};
