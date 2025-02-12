// src/hooks/useUserSubmissions.ts
import { useState, useEffect } from "react";
import { Submission, getUserSubmissions } from "../controllers/contract";
import { useWallet } from "./useWallet"; // Получаем адрес пользователя

interface UseUserSubmissionsResult {
  submissions: Submission[];
  loading: boolean;
  error: string | null;
}

export function useUserSubmissions(): UseUserSubmissionsResult {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { walletAddress } = useWallet(); // Получаем адрес из кошелька

  useEffect(() => {
    async function fetchUserSubmissions() {
      try {
        if (walletAddress) {
          const userSubmissions = await getUserSubmissions(walletAddress);
          setSubmissions(userSubmissions);
          console.log("📦 Заявки пользователя загружены:", userSubmissions);
        }
      } catch (err) {
        console.error("❌ Ошибка загрузки заявок пользователя:", err);
        setError("Failed to load user submissions");
      } finally {
        setLoading(false);
      }
    }

    fetchUserSubmissions();
  }, [walletAddress]);

  return { submissions, loading, error };
}
