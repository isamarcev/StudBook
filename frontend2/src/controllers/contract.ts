import { ethers } from "ethers";

import { config } from "../config"; // Импортируем конфиг

const provider = new ethers.JsonRpcProvider(config.rpcUrl);

// Создаём экземпляр контракта
const contract = new ethers.Contract(
  config.contractAddress,
  config.contractAbi,
  provider
);

// 🔹 Enum статусов заявки
enum SubmissionStatus {
  Waiting = 0,
  Approved,
  Rejected,
}

// 🔹 Структура проекта (Project)
export interface Project {
  projectId: number;
  name: string;
  description: string;
  creator: string;
  deadline: number;
  reward: number;
}

// 🔹 Структура заявки (Submission)
export interface Submission {
  student: string;
  projectId: number;
  description: string;
  status: SubmissionStatus;
  verifier: string;
  verdict: string;
}

// 🔹 1. Получить статус заявки по `submissionId`
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

// 🔹 2. Получить все `submissionId` пользователя
async function getUserSubmissions(userAddress: string): Promise<number[]> {
  try {
    const submissionIds: number[] = await contract.getUserSubmissions(
      userAddress
    );
    return submissionIds;
  } catch (error) {
    console.error("Error getting user submissions:", error);
    throw new Error("Failed to get user submissions");
  }
}

// 🔹 3. Получить все проекты (список `projectId`)
async function getAllProjects(): Promise<number[]> {
  try {
    const projects: number[] = await contract.getAllProjects();
    return projects;
  } catch (error) {
    console.error("Error getting all projects:", error);
    throw new Error("Failed to get all projects");
  }
}

// 🔹 4. Получить данные проекта по `projectId`
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

// 🔹 5. Получить доступные проекты для студента
async function getAvailableProjects(student: string): Promise<Project[]> {
  try {
    const projectList = await contract.getAvailableProjects(student);
    return projectList.map((projectData: any, index: number) => ({
      projectId: index + 1, // В контракте индекс проекта
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

// 🔹 6. Получить все заявки для конкретного проекта
async function getProjectSubmissions(projectId: number): Promise<Submission[]> {
  try {
    const submissions = await contract.getProjectSubmissions(projectId);

    return submissions.map((submissionData: any) => ({
      student: submissionData[0],
      projectId: Number(submissionData[1]),
      description: submissionData[2],
      status: Number(submissionData[3]),
      verifier: submissionData[4],
      verdict: submissionData[5],
    }));
  } catch (error) {
    console.error("Error getting project submissions:", error);
    throw new Error("Failed to get project submissions");
  }
}


// 🔹 7. Получить все проекты, созданные конкретным инструктором
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

// 🔹 8. Получить проекты, в которых `verifier` проверяет заявки
async function getVerifierProjects(verifierAddress: string): Promise<number[]> {
  try {
    const projects: number[] = await contract.verifiers(verifierAddress);
    return projects;
  } catch (error) {
    console.error("Error getting verifier projects:", error);
    throw new Error("Failed to get verifier projects");
  }
}

// 🔹 9. Получить данные по `submissionId`
async function getSubmission(submissionId: number): Promise<Submission> {
  try {
    const submissionData = await contract.submissions(submissionId);
    return {
      student: submissionData[0],
      projectId: Number(submissionData[1]),
      description: submissionData[2],
      status: Number(submissionData[3]),
      verifier: submissionData[4],
      verdict: submissionData[5],
    };
  } catch (error) {
    console.error("Error getting submission:", error);
    throw new Error("Failed to get submission");
  }
}

// 🔹 10. Проверить, является ли пользователь инструктором
async function checkIfInstructor(userAddress: string): Promise<boolean> {
  try {
    const isInstructor: boolean = await contract.isInstructor(userAddress);
    return isInstructor;
  } catch (error) {
    console.error("Error checking instructor status:", error);
    throw new Error("Failed to check instructor status");
  }
}

// ✅ Экспортируем функции
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
