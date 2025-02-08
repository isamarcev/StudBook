import { ethers } from 'ethers';
import fs from 'fs';
import path from 'path';

// Define the contract address
const contractAddress: string = process.env.CHAIN_PUBLIC_CONTRACT_ADDRESS || '0x';
// Set up the provider (here we use a default provider, but you could use a specific one like Infura, Alchemy, etc.)
const provider = new ethers.JsonRpcProvider(process.env.CHAIN_RPC_URL);

// Read the ABI from the file
const abiPath = path.resolve(__dirname, '../../../abi/chain_contract.json');
const contractABI = JSON.parse(fs.readFileSync(abiPath, 'utf8'));


// Create contract instance
const contract = new ethers.Contract(contractAddress, contractABI, provider);

// TypeScript types for SubmissionStatus
enum SubmissionStatus {
    Waiting = 0,
    Approved,
    Rejected
}

// 1. Function to get the status of a submission
async function getSubmissionStatus(submissionId: number): Promise<SubmissionStatus> {
    try {
        const status: SubmissionStatus = await contract.getSubmissionStatus(submissionId);
        return status;
    } catch (error) {
        console.error('Error getting submission status:', error);
        throw new Error('Failed to get submission status');
    }
}

// 2. Function to get all submission IDs for a specific user
async function getUserSubmissions(userAddress: string): Promise<number[]> {
    try {
        const submissionIds: number[] = await contract.getUserSubmissions(userAddress);
        return submissionIds;
    } catch (error) {
        console.error('Error getting user submissions:', error);
        throw new Error('Failed to get user submissions');
    }
}

// 3. Function to get all submissions by a project creator (instructor)
async function getSubmissionsByCreator(creatorAddress: string): Promise<any[]> {
    try {
        const submissions = await contract.getSubmissionsByCreator(creatorAddress);
        return submissions;
    } catch (error) {
        console.error('Error getting submissions by creator:', error);
        throw new Error('Failed to get submissions by creator');
    }
}

// Example usage:
(async () => {
    const submissionId = 1;
    const userAddress = '0x123';  // Replace with a valid user address
    const creatorAddress = '0x0f1CAc64Db1f1C5eAa7076c1cc931c726Bb54c4F';  // Replace with a valid creator address

    try {
        const status = await getSubmissionStatus(submissionId);
        console.log('Submission Status:', status);

        const userSubmissions = await getUserSubmissions(userAddress);
        console.log('User Submissions:', userSubmissions);

        const submissionsByCreator = await getSubmissionsByCreator(creatorAddress);
        console.log('Submissions by Creator:', submissionsByCreator);
    } catch (error) {
        console.error(error);
    }
})();