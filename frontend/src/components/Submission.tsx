import { FC } from "react";
import { SubmissionStatus } from "../controllers/contract";

interface SubmissionProps {
  student: string;
  description: string;
  status: SubmissionStatus;
  verdict?: string;
  isStudent: boolean;
  projectId?: number;
  onApprove: () => void;
  onDecline: () => void;
}

const Submission: FC<SubmissionProps> = ({
  student,
  description,
  status,
  verdict,
  isStudent,
  projectId,
  onApprove,
  onDecline,
}) => {
  return (
    <div className="flex flex-col bg-[#141519] p-5 gap-4 rounded-2xl min-w-[350px] text-start">
      {status == SubmissionStatus.Approved ? (
        <h5 className="text-green-400 bg-[#0e4c2845] w-[fit-content] p-2 text-center rounded-xl">
          Approved
        </h5>
      ) : status == SubmissionStatus.Rejected ? (
        <h5 className="text-red-500 bg-[#64000063] w-[fit-content] p-2 text-center rounded-xl">
          Rejected
        </h5>
      ) : (
        <h5 className="text-gray-400 bg-[#2d2d2d60] w-[fit-content] p-2 text-center rounded-xl">
          Waiting
        </h5>
      )}
      {isStudent && <h5>Project ID: {projectId}</h5>}
      <h5>Студент: {student}</h5>
      <h5>Опис сабмішина: {description}</h5>
      {verdict && <h5>Вердикт: {verdict}</h5>}
      {status == SubmissionStatus.Waiting && !isStudent && (
        <div className="flex w-100 gap-8 text-center">
          <div
            className="bg-[#FFFFFF] text-black p-1 rounded-3xl hover:cursor-pointer w-100"
            onClick={onApprove}
          >
            Підтвердити
          </div>
          <div
            className="bg-[#FFFFFF] text-black p-1 rounded-3xl hover:cursor-pointer w-100"
            onClick={onDecline}
          >
            Відхилити
          </div>
        </div>
      )}
    </div>
  );
};
export default Submission;
