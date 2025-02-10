import contractAbi from "../abi/chain_contract.json";

export const config = {
  rpcUrl: "https://sepolia.infura.io/v3/c08f6f09d0d0498fb3b5cd74a36eec15",
  contractAddress: "0xC769008d3c3E63dcaf373884331c9f365878C1b4",
  contractAbi: contractAbi,
};

console.log("Loaded Config:", config);
