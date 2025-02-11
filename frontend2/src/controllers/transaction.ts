import { ethers } from "ethers";

import { config } from "../config";

const contractInterface = new ethers.Interface(config.contractAbi);

async function createProjectTx(
  name: string,
  deadline: number,
  reward: number,
  whitelist: string[] = ["a"],
  verifiers: string[] = ["b"],
  description?: string
): Promise<ethers.TransactionResponse> {
  const data = contractInterface.encodeFunctionData("createProject", [
    name,
    description,
    whitelist,
    deadline,
    verifiers,
    reward,
  ]);
  const txRequest: ethers.TransactionRequest = {
    to: config.contractAddress,
    data,
  };

  return sendTransaction(txRequest);
}

async function submitAchievementTx(
  projectId: number,
  description: string
): Promise<ethers.TransactionResponse> {
  const data = contractInterface.encodeFunctionData("submitAchievement", [
    projectId,
    description,
  ]);

  const TxRequest: ethers.TransactionRequest = {
    to: config.contractAddress,
    data,
  };
  return sendTransaction(TxRequest);
}

async function verifySubmissionTx(
  submissionId: number,
  approve: boolean,
  verdict: string
): Promise<ethers.TransactionResponse> {
  const data = contractInterface.encodeFunctionData("verifySubmission", [
    submissionId,
    approve,
    verdict,
  ]);

  const TxRequest: ethers.TransactionRequest = {
    to: config.contractAddress,
    data,
  };
  return sendTransaction(TxRequest);
}

async function sendTransaction(
  txRequest: ethers.TransactionRequest
): Promise<ethers.TransactionResponse> {
  if (!window.ethereum) throw new Error("MetaMask не встановлений");
  await window.ethereum.request({ method: "eth_requestAccounts" });

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  try {
    const tx = await signer.sendTransaction(txRequest);
    console.log("🚀 Транзакция отправлена:", tx.hash);
    return tx;
  } catch (error: any) {
    throw new Error(`❌ Ошибка при отправке транзакции: ${error.message}`);
  }
}

export {
  createProjectTx,
  submitAchievementTx,
  verifySubmissionTx,
  sendTransaction,
};
