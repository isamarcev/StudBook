// src/hooks/useInstructor.ts
import { useEffect, useState } from "react";
import { useWallet } from "./useWallet";
import { checkIfInstructor } from "../controllers/contract";

/**
 * Custom hook that checks if the connected wallet belongs to an instructor.
 * It logs the instructor status to the console.
 *
 * @returns {boolean} - `true` if the wallet is an instructor, `false` otherwise.
 */
export function useInstructor(): boolean {
  const { walletAddress } = useWallet();
  const [isInstructor, setIsInstructor] = useState<boolean>(false);

  useEffect(() => {
    // Only run if a wallet is connected
    if (!walletAddress) {
      console.log("No wallet connected.");
      return;
    }

    // Async function to fetch instructor status from the contract
    async function fetchInstructorStatus() {
      try {
        const status = await checkIfInstructor(walletAddress!);
        setIsInstructor(status);
        console.log(`Wallet ${walletAddress} is instructor: ${status}`);
      } catch (error) {
        console.error("Error checking instructor status:", error);
      }
    }

    fetchInstructorStatus();
  }, [walletAddress]);

  return isInstructor;
}
