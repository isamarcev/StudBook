import contractAbi from "../abi/chain_contract.json";

export const config = {
  rpcUrl: "https://sepolia.infura.io/v3/c08f6f09d0d0498fb3b5cd74a36eec15",
  contractAddress: "0x3c3605843f61ea0dd1ed359d55d37cddbfb84d3e",
  contractAbi: contractAbi,
};

console.log("Loaded Config:", config);
