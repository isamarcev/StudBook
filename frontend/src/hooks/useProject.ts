// src/hooks/useProject.ts
import { useState, useEffect } from "react";
import { Project, getProject } from "../controllers/contract";

interface UseProjectResult {
  project: Project | null;
  loading: boolean;
  error: string | null;
}

export function useProject(projectId: number): UseProjectResult {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProject() {
      try {
        if (projectId) {
          const projectData = await getProject(projectId);
          setProject(projectData);
          console.log("Loaded project:", projectData);
        }
      } catch (err) {
        console.error("Error loading project:", err);
        setError("Failed to load project");
      } finally {
        setLoading(false);
      }
    }

    fetchProject();
  }, [projectId]);

  return { project, loading, error };
}
