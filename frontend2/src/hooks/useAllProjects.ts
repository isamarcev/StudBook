// src/hooks/useAllProjects.ts
import { useState, useEffect } from "react";
import { Project, getAllProjects, getProject } from "../controllers/contract"; // Adjust the path as needed

interface UseAllProjectsResult {
  projects: Project[];
  loading: boolean;
  error: string | null;
}

export function useAllProjects(): UseAllProjectsResult {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const allProjects = await getAllProjects();
        var projectsList = [];
        for (var i = 0; i < allProjects.length; i++) {
          const project = await getProject(allProjects[i]);
          projectsList.push(project);
        }
        setProjects(projectsList);
        console.log("Loaded projects:", allProjects.length);
      } catch (err) {
        console.error("Error loading projects:", err);
        setError("Failed to load projects");
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  return { projects, loading, error };
}
