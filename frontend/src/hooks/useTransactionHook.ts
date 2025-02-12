import { useState } from "react";
import {
  createProjectTx,
  submitAchievementTx,
  verifySubmissionTx,
} from "../controllers/transaction";
import { TransactionResponse } from "ethers";

interface UseTransactionResult {
  sendCreateProject: (
    name: string,
    reward: number,
    whitelist: string[],
    deadline: number,
    verifiers: string[],
    description?: string
  ) => Promise<TransactionResponse | undefined>;

  sendSubmitAchievement: (
    projectId: number,
    description: string
  ) => Promise<void>;

  sendVerifySubmission: (
    submissionId: number,
    approve: boolean,
    verdict: string
  ) => Promise<void>;

  transactionHash: string | null;
  loading: boolean;
  error: string | null;
}

export function useTransaction(): UseTransactionResult {
  const [transactionHash, setTransactionHash] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function sendCreateProject(
    name: string,
    reward: number,
    whitelist: string[],
    deadline: number,
    verifiers: string[],
    description?: string
  ) {
    console.log("Create Project Params:", {
      name,
      deadline,
      reward,
      whitelist,
      verifiers,
      description,
    });
    setLoading(true);
    setError(null);
    try {
      const tx = await createProjectTx(
        name,
        deadline,
        reward,
        whitelist,
        verifiers,
        description
      );
      setTransactionHash(tx.hash);
      console.log("Project created:", tx.hash);
      setLoading(false);
      return tx;
    } catch (err) {
      console.error(err);
      console.error("Error:", err);
      setError("Failed to create project");
    } finally {
      setLoading(false);
    }
  }

  async function sendSubmitAchievement(projectId: number, description: string) {
    setLoading(true);
    setError(null);
    try {
      const tx = await submitAchievementTx(projectId, description);
      setTransactionHash(tx.hash);
      console.log("Achievement submitted:", tx.hash);
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to submit achievement");
    } finally {
      setLoading(false);
    }
  }

  async function sendVerifySubmission(
    submissionId: number,
    approve: boolean,
    verdict: string
  ) {
    setLoading(true);
    setError(null);
    try {
      const tx = await verifySubmissionTx(submissionId, approve, verdict);
      setTransactionHash(tx.hash);
      console.log("Verification successful:", tx.hash);
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to verify submission");
    } finally {
      setLoading(false);
    }
  }

  return {
    sendCreateProject,
    sendSubmitAchievement,
    sendVerifySubmission,
    transactionHash,
    loading,
    error,
  };
}
