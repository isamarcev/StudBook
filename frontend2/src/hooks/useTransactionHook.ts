import { useState } from "react";
import { createProjectTx, submitAchievementTx, verifySubmissionTx } from "../controllers/transaction";

interface UseTransactionResult {
  sendCreateProject: (
    name: string,
    reward: number,
    whitelist: string[],
    deadline: number,
    verifiers: string[],
    description?: string,
  ) => Promise<void>;
  

  sendSubmitAchievement: (projectId: number, description: string) => Promise<void>;

  sendVerifySubmission: (submissionId: number, approve: boolean, verdict: string) => Promise<void>;

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
    description?: string,
  ) {
    console.log('Create Project Params:', {
      name,
      deadline,
      reward,
      whitelist,
      verifiers,
      description
    });
    setLoading(true);
    setError(null);
    try {
      const tx = await createProjectTx(name, deadline, reward, whitelist, verifiers, description);
      setTransactionHash(tx.hash);
      console.log("✅ Проект создан:", tx.hash);
      setLoading(false);
      return tx;
    } catch (err) {
      console.error(err)
      console.error("❌ Ошибка при создании проекта:", err);
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
      console.log("✅ Заявка отправлена:", tx.hash);
    } catch (err) {
      console.error("❌ Ошибка при отправке заявки:", err);
      setError("Failed to submit achievement");
    } finally {
      setLoading(false);
    }
  }

  async function sendVerifySubmission(submissionId: number, approve: boolean, verdict: string) {
    setLoading(true);
    setError(null);
    try {
      const tx = await verifySubmissionTx(submissionId, approve, verdict);
      setTransactionHash(tx.hash);
      console.log("✅ Заявка верифицирована:", tx.hash);
    } catch (err) {
      console.error("❌ Ошибка при верификации заявки:", err);
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
