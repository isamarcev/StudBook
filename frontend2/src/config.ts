import contractAbi from "../abi/chain_contract.json";

export const config = {
  rpcUrl: "https://sepolia.infura.io/v3/c08f6f09d0d0498fb3b5cd74a36eec15",
  contractAddress: "0x2200a7304a1a432c994fafd218ddf76837ae63a8",
  contractAbi: contractAbi,
};

console.log("Loaded Config:", config);
