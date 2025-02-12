import { ethers } from "ethers";

import { config } from "../config"; // Импортируем конфиг

const provider = new ethers.JsonRpcProvider(config.rpcUrl);

const contract = new ethers.Contract(
  config.contractAddress,
  config.contractAbi,
  provider
);

enum SubmissionStatus {
  Waiting = 0,
  Approved,
  Rejected,
}

export interface Project {
  projectId: number;
  name: string;
  description: string;
  creator: string;
  deadline: number;
  reward: number;
}

export interface Submission {
  id: number;
  student: string;
  projectId: number;
  description: string;
  status: SubmissionStatus;
  verifier: string;
  verdict: string;
}

async function getSubmissionStatus(
  submissionId: number
): Promise<SubmissionStatus> {
  try {
    const status: SubmissionStatus = await contract.getSubmissionStatus(
      submissionId
    );
    return status;
  } catch (error) {
    console.error("Error getting submission status:", error);
    throw new Error("Failed to get submission status");
  }
}

async function getUserSubmissions(userAddress: string): Promise<Submission[]> {
  try {
    const submissions = await contract.getUserSubmissions(userAddress);
    return submissions.map((submissionData: any) => ({
      id: Number(submissionData[0]),
      student: submissionData[1],
      projectId: Number(submissionData[2]),
      description: submissionData[3],
      status: Number(submissionData[4]),
      verifier: submissionData[5],
      verdict: submissionData[6],
    }));
  } catch (error) {
    console.error("Error getting user submissions:", error);
    throw new Error("Failed to get user submissions");
  }
}

async function getAllProjects(): Promise<number[]> {
  try {
    const projects: number[] = await contract.getAllProjects();
    return projects;
  } catch (error) {
    console.error("Error getting all projects:", error);
    throw new Error("Failed to get all projects");
  }
}

async function getProject(projectId: number): Promise<Project> {
  try {
    const projectData = await contract.projects(projectId);
    console.log("projectData", projectData);
    return {
      projectId: projectData[0],
      name: projectData[1],
      description: projectData[2],
      creator: projectData[3],
      deadline: Number(projectData[4]),
      reward: Number(projectData[5]),
    };
  } catch (error) {
    console.error("Error getting project:", error);
    throw new Error("Failed to get project");
  }
}

async function getAvailableProjects(student: string): Promise<Project[]> {
  try {
    const projectList = await contract.getAvailableProjects(student);
    return projectList.map((projectData: any, index: number) => ({
      projectId: index + 1,
      name: projectData[0],
      description: projectData[1],
      creator: projectData[2],
      whitelist: projectData[3],
      deadline: Number(projectData[4]),
      verifiers: projectData[5],
      reward: Number(projectData[6]),
      submissions: projectData[7],
    }));
  } catch (error) {
    console.error("Error getting available projects:", error);
    throw new Error("Failed to get available projects");
  }
}

async function getProjectSubmissions(projectId: number): Promise<Submission[]> {
  try {
    const submissions = await contract.getProjectSubmissions(projectId);

    return submissions.map((submissionData: any) => ({
      id: Number(submissionData[0]),
      student: submissionData[1],
      projectId: Number(submissionData[2]),
      description: submissionData[3],
      status: Number(submissionData[4]),
      verifier: submissionData[5],
      verdict: submissionData[6],
    }));
  } catch (error) {
    console.error("Error getting project submissions:", error);
    throw new Error("Failed to get project submissions");
  }
}

async function getInstructorProjects(
  instructorAddress: string
): Promise<Project[]> {
  try {
    const projects: Project[] = await contract.getInstructorProjects(
      instructorAddress
    );
    return projects;
  } catch (error) {
    console.error("Error getting instructor projects:", error);
    throw new Error("Failed to get instructor projects");
  }
}

async function getVerifierProjects(verifierAddress: string): Promise<number[]> {
  try {
    const projects: number[] = await contract.verifiers(verifierAddress);
    return projects;
  } catch (error) {
    console.error("Error getting verifier projects:", error);
    throw new Error("Failed to get verifier projects");
  }
}

async function getSubmission(submissionId: number): Promise<Submission> {
  try {
    const submissionData = await contract.submissions(submissionId);
    return {
      id: Number(submissionData[0]),
      student: submissionData[1],
      projectId: Number(submissionData[2]),
      description: submissionData[3],
      status: Number(submissionData[4]),
      verifier: submissionData[5],
      verdict: submissionData[6],
    };
  } catch (error) {
    console.error("Error getting submission:", error);
    throw new Error("Failed to get submission");
  }
}

async function checkIfInstructor(userAddress: string): Promise<boolean> {
  try {
    const isInstructor: boolean = await contract.isInstructor(userAddress);
    return isInstructor;
  } catch (error) {
    console.error("Error checking instructor status:", error);
    throw new Error("Failed to check instructor status");
  }
}

export {
  getSubmissionStatus,
  getUserSubmissions,
  getAllProjects,
  getProject,
  getAvailableProjects,
  getProjectSubmissions,
  getInstructorProjects,
  getVerifierProjects,
  getSubmission,
  checkIfInstructor,
  SubmissionStatus,
};
