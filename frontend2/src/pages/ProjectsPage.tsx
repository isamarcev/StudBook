import { FC, useEffect, useState } from 'react'
import { useWallet } from '../hooks/useWallet';
import Project from '../components/Project';
import BottomButton from '../components/BottomButtom';
import Header from '../components/Header';
import Page from '../Page';
import { useNavigate } from 'react-router-dom';
import { checkIfInstructor, getInstructorProjects } from '../controllers/contract';

const test_projects = [
  { id: 1, name: "TEST" },
  { id: 2, name: "TEST2" },
  { id: 3, name: "TEST3" },
  { id: 4, name: "TEST4" },
];

const isInstructor = true;

const ProjectsPage: FC = () => {
  const { walletAddress, connectWallet } = useWallet();
  const navigate = useNavigate();
    const [isInstructor, setIsInstructor] = useState<boolean>(false);
    const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
        if(walletAddress) {
            checkIfInstructor("0x66989a799FC51d889F6df8F9c56eD2Cb3c48984D").then(result => {
                setIsInstructor(result);
                console.log("isInstructor", result);
            })
        }
    }, [walletAddress])

    // useEffect(() => {
    //     setProjects(test_projects);
    // }, [])

    useEffect(() => {
        if (walletAddress) {
            getInstructorProjects(walletAddress).then(result => {
                setProjects(result);
            })
        }
    }, [walletAddress])

    return (
        <Page>
            <div className='flex flex-col gap-4 '>
                <Header isInstructor={isInstructor}/>
                <h1>Projects</h1>
                <div className="flex flex-col gap-4">
                    {projects.map(project => (
                        <Project key={project.id} id={project.id} name={project.name} isInstructor={isInstructor} onClick={() => {navigate(`/project/${project.id}`)}}/>
                    ))}
                </div>

                {isInstructor ? <BottomButton title='Створити проект' onClick={() => {}}/> : null}
            </div>
        </Page>
    )
}

export default ProjectsPage
