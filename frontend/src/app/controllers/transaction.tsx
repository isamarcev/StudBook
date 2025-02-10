import { ethers } from "ethers";
import fs from "fs";
import path from "path";

import { config } from "../../config";

const abiPath = path.resolve(__dirname, "../../../abi/chain_contract.json");
const contractABI = JSON.parse(fs.readFileSync(abiPath, "utf8"));

const contractInterface = new ethers.Interface(contractABI);

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
    approve: boolean
): Promise<ethers.TransactionRequest> {
    const data = contractInterface.encodeFunctionData("verifySubmission", [
        submissionId,
        approve,
    ]);

    return {
        to: config.contractAddress,
        data,
    };
}

export {
    createProjectTx,
    submitAchievementTx,
    verifySubmissionTx,
};
