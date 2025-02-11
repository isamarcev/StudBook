import contractAbi from "../abi/chain_contract.json";

export const config = {
  rpcUrl: "https://sepolia.infura.io/v3/c08f6f09d0d0498fb3b5cd74a36eec15",
  contractAddress: "0xeb2804a0561f1a51e274888dc100f3706ac42716",
  contractAbi: contractAbi,
};

console.log("Loaded Config:", config);
