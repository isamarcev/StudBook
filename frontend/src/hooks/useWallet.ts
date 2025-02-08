"use client";

import { useState, useEffect } from "react";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export function useWallet() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  // Connects to the wallet when called
  const connectWallet = async () => {
    if (typeof window !== "undefined" && window.ethereum) {
      try {
        const accounts: string[] = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
        }
      } catch (error) {
        console.error("Failed to connect wallet:", error);
      }
    } else {
      alert("Please install a Web3 wallet like MetaMask!");
    }
  };

  // Checks on mount if a wallet is already connected
  const checkIfWalletIsConnected = async () => {
    if (typeof window !== "undefined" && window.ethereum) {
      try {
        const accounts: string[] = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
        }
      } catch (error) {
        console.error("Failed to check wallet connection:", error);
      }
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();

    // Listen for changes to the wallet's accounts
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
        } else {
          setWalletAddress(null);
        }
      });
    }

    // Cleanup the event listener on component unmount
    return () => {
      if (window.ethereum && window.ethereum.removeListener) {
        window.ethereum.removeListener("accountsChanged", () => {});
      }
    };
  }, []);

  return { walletAddress, connectWallet };
}
