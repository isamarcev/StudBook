import { ethers } from "ethers";
import fs from "fs";
import path from "path";

import { config } from "../../config"; // Импортируем конфиг

const provider = new ethers.JsonRpcProvider(config.rpcUrl);

// Читаем ABI из файла
const abiPath = path.resolve(__dirname, "../../../abi/chain_contract.json");
const contractABI = JSON.parse(fs.readFileSync(abiPath, "utf8"));

// Создаём экземпляр контракта
const contract = new ethers.Contract(config.contractAddress, contractABI, provider);

// 🔹 Enum статусов заявки
enum SubmissionStatus {
    Waiting = 0,
    Approved,
    Rejected,
}

// 🔹 1. Получить статус заявки по `submissionId`
async function getSubmissionStatus(submissionId: number): Promise<SubmissionStatus> {
    try {
        const status: SubmissionStatus = await contract.getSubmissionStatus(submissionId);
        return status;
    } catch (error) {
        console.error("Error getting submission status:", error);
        throw new Error("Failed to get submission status");
    }
}

// 🔹 2. Получить все `submissionId` пользователя
async function getUserSubmissions(userAddress: string): Promise<number[]> {
    try {
        const submissionIds: number[] = await contract.getUserSubmissions(userAddress);
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

// 🔹 4. Получить проект по `projectId`
async function getProject(projectId: number): Promise<any> {
    try {
        const project = await contract.projects(projectId);
        return project;
    } catch (error) {
        console.error("Error getting project:", error);
        throw new Error("Failed to get project");
    }
}

// 🔹 5. Получить все заявки для конкретного проекта
async function getProjectSubmissions(projectId: number): Promise<number[]> {
    try {
        const submissions: number[] = await contract.getProjectSubmissions(projectId);
        return submissions;
    } catch (error) {
        console.error("Error getting project submissions:", error);
        throw new Error("Failed to get project submissions");
    }
}

// 🔹 6. Получить все проекты, созданные конкретным инструктором
async function getInstructorProjects(instructorAddress: string): Promise<number[]> {
    try {
        const projects: number[] = await contract.instructorProjectIds(instructorAddress);
        return projects;
    } catch (error) {
        console.error("Error getting instructor projects:", error);
        throw new Error("Failed to get instructor projects");
    }
}

// 🔹 7. Получить проекты, в которых `verifier` проверяет заявки
async function getVerifierProjects(verifierAddress: string): Promise<number[]> {
    try {
        const projects: number[] = await contract.verifiers(verifierAddress);
        return projects;
    } catch (error) {
        console.error("Error getting verifier projects:", error);
        throw new Error("Failed to get verifier projects");
    }
}

// 🔹 8. Получить данные по `submissionId`
async function getSubmission(submissionId: number): Promise<any> {
    try {
        const submission = await contract.submissions(submissionId);
        return submission;
    } catch (error) {
        console.error("Error getting submission:", error);
        throw new Error("Failed to get submission");
    }
}

// 🔹 9. Проверить, является ли пользователь инструктором
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
    getProjectSubmissions,
    getInstructorProjects,
    getVerifierProjects,
    getSubmission,
    checkIfInstructor,
    SubmissionStatus,
};
