"use client";

import Head from "next/head";
import { useWallet } from "../hooks/useWallet";

export default function HomePage() {
  const { walletAddress, connectWallet } = useWallet();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <Head>
        <title>My Web3 App</title>
        <meta
          name="description"
          content="A simple web3 app to connect your wallet"
        />
      </Head>
      <main className="bg-white rounded shadow p-8 text-center">
        {walletAddress ? (
          <p className="text-xl font-bold">{walletAddress}</p>
        ) : (
          <button
            onClick={connectWallet}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
          >
            Connect Wallet
          </button>
        )}
      </main>
    </div>
  );
}
