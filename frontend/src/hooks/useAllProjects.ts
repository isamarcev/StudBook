// src/hooks/useAllProjects.ts
import { useState, useEffect } from "react";
import {
  Project,
  getAvailableProjects,
  getInstructorProjects,
} from "../controllers/contract"; // Adjust the path as needed
import { useWallet } from "./useWallet";
import { useInstructor } from "./useInstructor";

interface UseAllProjectsResult {
  projects: Project[];
  loading: boolean;
  error: string | null;
}

export function useAllProjects(): UseAllProjectsResult {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { walletAddress } = useWallet();
  const isInstructor = useInstructor();

  useEffect(() => {
    async function fetchProjects() {
      try {
        if (walletAddress) {
          if (isInstructor) {
            const allProjects = await getInstructorProjects(walletAddress);

            setProjects(allProjects);
            console.log("Loaded projects:", allProjects);
          } else {
            const availableProjects = await getAvailableProjects(walletAddress);

            setProjects(availableProjects);
            console.log("Loaded projects:", availableProjects);
          }
        }
      } catch (err) {
        console.error("Error loading projects:", err);
        setError("Failed to load projects");
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, [walletAddress, isInstructor]);

  return { projects, loading, error };
}
