import { FC, use, useEffect, useState } from 'react'
import { useWallet } from '../hooks/useWallet';
import Project from '../components/Project';
import BottomButton from '../components/BottomButtom';
import Header from '../components/Header';
import Page from '../Page';
import { useParams } from 'react-router-dom';
import Submission from '../components/Submission';
import { checkIfInstructor } from '../controllers/contract';

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
    const [submissions, setSubmissions] = useState<any[]>([]);

    useEffect(() => {
        if(walletAddress) {
            checkIfInstructor(walletAddress).then(result => {
                setIsInstructor(result);
                console.log("isInstructor", result);
            })
        }
    }, [walletAddress])

    const project = projects.find(project => project.id === Number(id));

    return (
        <Page>
            <div className='flex flex-col gap-4 text-start'>
                <Header isInstructor={isInstructor}/>
                <div className="flex flex-col bg-[#141519] p-4 gap-4 rounded-2xl min-w-[350px]">
                    <h2>ID: <b>{project?.id}</b></h2>
                    <h2>Назва проекту: <b>{project?.name}</b></h2>
                </div>
                <h2 className="text-2xl">Список заявок по проекту:</h2>
                <div className="flex flex-col gap-4 p-2">
                    {submissions.map(submission => (
                        <Submission key={submission.student} student={submission.student} description={submission.description} status={submission.status || ""}/>
                    ))}
                
                </div>

            </div>
        </Page>
    )
}

export default ProjectPage