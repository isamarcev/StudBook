import { FC } from 'react'
import { useWallet } from '../hooks/useWallet';
import Project from '../components/Project';
import BottomButton from '../components/BottomButtom';
import Header from '../components/Header';
import Page from '../Page';
import { useParams } from 'react-router-dom';

const projects = [
    {id: 1, name: "TEST"},
    {id: 2, name: "TEST2"},
    {id: 3, name: "TEST3"},
    {id: 4, name: "TEST4"},
]

const isInstructor = true;

const ProjectPage: FC = () => {
    
    const { walletAddress, connectWallet } = useWallet();
    const { id } = useParams();

    const project = projects.find(project => project.id === Number(id));

    return (
        <Page>
            <div className='flex flex-col gap-4 '>
                <Header isInstructor={isInstructor}/>
                <h1>{project?.name}</h1>
                <div className="flex flex-col gap-4">
                    {projects.map(project => (
                        <Project key={project.id} id={project.id} name={project.name} isInstructor={isInstructor}/>
                    ))}
                </div>

                {isInstructor ? <BottomButton title='Створити проект' onClick={() => {}}/> : null}
            </div>
        </Page>
    )
}

export default ProjectPage