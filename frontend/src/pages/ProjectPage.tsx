import { FC, use, useEffect, useState } from 'react'
import { useWallet } from '../hooks/useWallet';
import Project from '../components/Project';
import BottomButton from '../components/BottomButtom';
import Header from '../components/Header';
import Page from '../Page';
import { useParams } from 'react-router-dom';
import Submission from '../components/Submission';
import { checkIfInstructor } from '../controllers/contract';
import { useProject } from '../hooks/useProject';
import { useProjectSubmissions } from '../hooks/useGetProjectSubmissions';
import LoadingPopup from '../components/LoadingPopup';
import { useTransaction } from '../hooks/useTransactionHook';
import { useForm } from 'react-hook-form';

const projects = [
    {id: 1, name: "TEST"},
    {id: 2, name: "TEST2"},
    {id: 3, name: "TEST3"},
    {id: 4, name: "TEST4"},
]

const submissions = [
    {student: 1, description: "TEST", status: "approved"},
    {student: 2, description: "TEST2", status: "rejected"},
    {student: 3, description: "TEST3"},
    {student: 4, description: "TEST4"},
]

// const isInstructor = true;

const ProjectPage: FC = () => {
    
    const { walletAddress, connectWallet } = useWallet();
    const { id } = useParams();

    const [isInstructor, setIsInstructor] = useState<boolean>(false);

    const verdictForm = useForm();

    useEffect(() => {
        if(walletAddress) {
            checkIfInstructor(walletAddress).then(result => {
                setIsInstructor(result);
                console.log("isInstructor", result);
            })
        }
    }, [walletAddress])

    const project = useProject(Number(id));
    const submissions = useProjectSubmissions(Number(id));
    
    const [showVerdictPopup, setShowVerdictPopup] = useState<boolean>(false);
    const [verdictType, setVerdictType] = useState<boolean>(true);
    const [selectedSubmissionId, setSelectedSubmissionId] = useState<number>(0);

    const transactions = useTransaction();

    return (
        <Page>
            <LoadingPopup
                text={"Підтвердіть транзакцію в гаманці"}
                isLoading={transactions.loading}
            ></LoadingPopup>

            {showVerdictPopup && (
                <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center" onClick={() => setShowVerdictPopup(false)}>
                    <div className="bg-[#141519] p-4 rounded-2xl relative" onClick={(e) => e.stopPropagation()}>
                        <button 
                            className="absolute top-2 right-2 text-white hover:text-gray-300"
                            onClick={() => setShowVerdictPopup(false)}
                        >
                            ✕
                        </button>
                        <form action="" className="flex flex-col gap-4 p-2" onSubmit={verdictForm.handleSubmit((data) => {
                            setShowVerdictPopup(false);
                            transactions.sendVerifySubmission(selectedSubmissionId, verdictType, data.verdict).then((tx) => {
                                console.log(tx);
                            }).catch((e) => {
                                console.log(e);
                            });
                        })}>
                            <div className="flex flex-col gap-4 p-2">
                                <label htmlFor="verdict">Введіть вердикт:</label>
                                <textarea id="verdict" cols={30} rows={5} className="bg-[#070707] text-white p-2 rounded-lg outline-none" {...verdictForm.register("verdict")}></textarea>
                            </div>
                            <button type="submit" className="bg-[#FFFFFF] text-black p-1 rounded-3xl hover:cursor-pointer" >Підтвердити</button>
                        </form>
                    </div>
                </div>
            )}
            
            <div className='flex flex-col gap-4 text-start'>
                <Header isInstructor={isInstructor}/>
                <div className="flex flex-col bg-[#141519] p-4 gap-4 rounded-2xl min-w-[350px]">
                    <h2>ID: <b>{project.project?.projectId}</b></h2>
                    <h2>Назва проекту: <b>{project.project?.name}</b></h2>
                    <h2>Опис: <b>{project.project?.description}</b></h2>
                    <h2>Creator: <b>{project.project?.creator}</b></h2>
                    <h2>Дедлайн: <b>{project.project?.deadline ? new Date(Number(project.project.deadline) * 1000).toLocaleDateString('uk-UA', { 
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    }) : ''}</b></h2>
                    <h2>Винагорода: <b>{project.project?.reward}</b></h2>
                </div>
                <h2 className="text-2xl">Список заявок по проекту:</h2>
                <div className="flex flex-col gap-4 p-2">
                    {submissions.submissions.map(submission => (
                        <Submission 
                            key={submission.id} 
                            student={submission.student} 
                            description={submission.description}
                            status={submission.status}
                            verdict={submission.verdict}
                            isStudent={!isInstructor}
                            onApprove={() => {
                                setShowVerdictPopup(true);
                                setVerdictType(true);
                                setSelectedSubmissionId(submission.id);
                            }}
                            onDecline={() => {
                                setShowVerdictPopup(true);
                                setVerdictType(false);
                                setSelectedSubmissionId(submission.id);
                            }}
                        />
                    ))}
                
                </div>

            </div>
        </Page>
    )
}

export default ProjectPage