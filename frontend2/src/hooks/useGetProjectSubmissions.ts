import { useState, useEffect } from "react";
import { Submission, getProjectSubmissions } from "../controllers/contract";

interface UseProjectSubmissionsResult {
  submissions: Submission[];
  loading: boolean;
  error: string | null;
}

export function useProjectSubmissions(projectId: number): UseProjectSubmissionsResult {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSubmissions() {
      try {
        if (projectId) {
          const projectSubmissions = await getProjectSubmissions(projectId);
          setSubmissions(projectSubmissions);
          console.log("📦 Заявки загружены:", projectSubmissions);
        }
      } catch (err) {
        console.error("❌ Ошибка загрузки заявок:", err);
        setError("Failed to load project submissions");
      } finally {
        setLoading(false);
      }
    }

    fetchSubmissions();
  }, [projectId]);

  return { submissions, loading, error };
}
