import dotenv from "dotenv";
import path from "path";

// Загружаем `.env` (поднимаемся из `src/` к корню проекта)
dotenv.config({ path: path.resolve(__dirname, "../.env") });

export const config = {
  rpcUrl: process.env.CHAIN_RPC_URL || "https://rpc-mumbai.maticvigil.com",
  contractAddress: process.env.CHAIN_PUBLIC_CONTRACT_ADDRESS || "0x",
};

console.log("Loaded Config:", config);
