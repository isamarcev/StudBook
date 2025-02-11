import { ethers } from "ethers";

import { config } from "../config";

const contractInterface = new ethers.Interface(config.contractAbi);

async function createProjectTx(
  name: string,
  description: string,
  whitelist: string[],
  deadline: number,
  verifiers: string[],
  reward: number
): Promise<ethers.TransactionRequest> {
  const data = contractInterface.encodeFunctionData("createProject", [
    name,
    description,
    whitelist,
    deadline,
    verifiers,
    reward,
  ]);

  return {
    to: config.contractAddress,
    data,
  };
}

async function submitAchievementTx(
  projectId: number,
  description: string
): Promise<ethers.TransactionRequest> {
  const data = contractInterface.encodeFunctionData("submitAchievement", [
    projectId,
    description,
  ]);

  return {
    to: config.contractAddress,
    data,
  };
}

async function verifySubmissionTx(
  submissionId: number,
  approve: boolean,
  verdict: string
): Promise<ethers.TransactionRequest> {
  const data = contractInterface.encodeFunctionData("verifySubmission", [
    submissionId,
    approve,
    verdict,
  ]);

  return {
    to: config.contractAddress,
    data,
  };
}

export { createProjectTx, submitAchievementTx, verifySubmissionTx };
