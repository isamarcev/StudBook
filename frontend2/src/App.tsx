import "./App.css";
import { useWallet } from "./hooks/useWallet";
import ProjectsPage from "./pages/ProjectsPage";

function App() {
  const { walletAddress, connectWallet } = useWallet();

  return (
    <>
      {!walletAddress ? (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
          <div className="flex flex-col items-center gap-4">
            <img
              src="studchain-logo.svg"
              alt="StudChain Logo"
              className="w-24 h-24"
            />
            <h1 className="text-xl font-medium">StudChain</h1>
            <p className="text-sm text-gray-400">
              Какой-то текст описание платформы
            </p>
          </div>
          <div className="absolute bottom-6 w-full px-6">
            <button
              className="w-full bg-white text-black py-3 rounded-lg text-center text-lg font-medium"
              onClick={connectWallet}
            >
              Connect Wallet
            </button>
          </div>
        </div>
      ) : (
        <ProjectsPage />
      )}
    </>
  );
}

export default App;
