import React, { ReactNode } from 'react';
import { useWallet } from './hooks/useWallet';

interface PageProps {
    children?: ReactNode;
}

const Page: React.FC<PageProps> = ({ children }) => {

    const { walletAddress, connectWallet } = useWallet();


    return (
        <div className={`page-container w-[100vw] min-w-[320px] max-w-[500px] items-center`}>
            {!walletAddress ? (<div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white w-full">
      <div className="flex flex-col items-center gap-4">
        <img
          src="studchain-logo.svg"
          alt="StudChain Logo"
          className="w-24 h-24"
        />
        <h1 className="text-xl font-medium">StudChain</h1>
        <p className="text-sm text-gray-400"></p>
      </div>
      <div className="absolute bottom-6 w-full max-w-[320px] px-6">
        <button className="w-full bg-white text-black py-3 rounded-lg text-center text-lg font-medium" onClick={connectWallet}>
          Connect Wallet
        </button>
      </div>
    </div>): (children)}
        </div>
    );
};

export default Page;