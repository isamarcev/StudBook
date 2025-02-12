import { FC, useEffect, useState } from "react";
import { useWallet } from "../hooks/useWallet";
import Header from "../components/Header";
import Page from "../Page";
import Submission from "../components/Submission";
import { checkIfInstructor } from "../controllers/contract";
import { useUserSubmissions } from "../hooks/useGetUserSubmissions";

const MySubmissionsPage: FC = () => {
  const { walletAddress } = useWallet();

  const [isInstructor, setIsInstructor] = useState<boolean>(false);

  useEffect(() => {
    if (walletAddress) {
      checkIfInstructor(walletAddress).then((result) => {
        setIsInstructor(result);
        console.log("isInstructor", result);
      });
    }
  }, [walletAddress]);

  const submissions = useUserSubmissions();

  return (
    <Page>
      <div className="flex flex-col gap-4 text-start">
        <Header isInstructor={isInstructor} />
        <h2 className="text-2xl">Список ваших заявок:</h2>
        <div className="flex flex-col gap-4 p-2">
          {submissions.submissions.map((submission) => (
            <Submission
              key={submission.id}
              student={submission.student}
              description={submission.description}
              status={submission.status}
              verdict={submission.verdict}
              isStudent={!isInstructor}
              projectId={submission.projectId}
              onApprove={() => {}}
              onDecline={() => {}}
            />
          ))}
        </div>
      </div>
    </Page>
  );
};

export default MySubmissionsPage;
