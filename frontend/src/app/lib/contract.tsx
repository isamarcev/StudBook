import { ethers } from "ethers";
import fs from "fs";
import path from "path";

// Define the contract address from the environment (fallback to a dummy value)
const contractAddress: string =
  process.env.CHAIN_PUBLIC_CONTRACT_ADDRESS || "0x";
// Set up the provider (you can replace with Infura, Alchemy, etc. if desired)
const provider = new ethers.JsonRpcProvider(process.env.CHAIN_RPC_URL);

// Read the ABI from the file (ensure this ABI is updated for your current contract)
const abiPath = path.resolve(__dirname, "../../../abi/chain_contract.json");
const contractABI = JSON.parse(fs.readFileSync(abiPath, "utf8"));

// Create a contract instance using the provider
const contract = new ethers.Contract(contractAddress, contractABI, provider);

// TypeScript enum for SubmissionStatus matching the contract
enum SubmissionStatus {
  Waiting = 0,
  Approved,
  Rejected,
}

/**
 * 1. Get a single submission's details using the public `submissions` mapping.
 *    (Note: This is automatically available from the public mapping.)
 */
async function getSubmission(submissionId: number): Promise<any> {
  try {
    const submission = await contract.submissions(submissionId);
    return submission;
  } catch (error) {
    console.error("Error getting submission:", error);
    throw new Error("Failed to get submission");
  }
}

/**
 * 2. Get all submissions for the connected user.
 *    This calls the contract function `getUserSubmissions()`.
 */
async function getUserSubmissions(): Promise<any[]> {
  try {
    const userSubmissions = await contract.getUserSubmissions();
    return userSubmissions;
  } catch (error) {
    console.error("Error getting user submissions:", error);
    throw new Error("Failed to get user submissions");
  }
}

/**
 * 3. Get all projects for the instructor.
 *    This calls the contract function `getInstructorProjects()`.
 *    (Requires the caller to be marked as an instructor.)
 */
async function getInstructorProjects(): Promise<any[]> {
  try {
    const instructorProjects = await contract.getInstructorProjects();
    return instructorProjects;
  } catch (error) {
    console.error("Error getting instructor projects:", error);
    throw new Error("Failed to get instructor projects");
  }
}

/**
 * 4. Get all submissions for a specific project.
 *    This calls the contract function `getProjectSubmissions(uint256)`.
 *    (Requires the caller to be an instructor.)
 */
async function getProjectSubmissions(projectId: number): Promise<any[]> {
  try {
    const projectSubs = await contract.getProjectSubmissions(projectId);
    return projectSubs;
  } catch (error) {
    console.error("Error getting project submissions:", error);
    throw new Error("Failed to get project submissions");
  }
}

/**
 * 5. Get all available projects for the student (or caller).
 *    This calls the contract function `getAvailableProjects()`.
 */
async function getAvailableProjects(): Promise<any[]> {
  try {
    const availableProjects = await contract.getAvailableProjects();
    return availableProjects;
  } catch (error) {
    console.error("Error getting available projects:", error);
    throw new Error("Failed to get available projects");
  }
}

/**
 * 6. Get all project IDs.
 *    This calls the contract function `getAllProjects()`.
 */
async function getAllProjects(): Promise<number[]> {
  try {
    const allProjects: number[] = await contract.getAllProjects();
    return allProjects;
  } catch (error) {
    console.error("Error getting all projects:", error);
    throw new Error("Failed to get all projects");
  }
}
