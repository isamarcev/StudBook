import { FC } from 'react'
import { useWallet } from '../hooks/useWallet';
import Project from '../components/Project';

const projects = [
    {id: 1, name: "TEST"},
    {id: 2, name: "TEST2"},
    {id: 3, name: "TEST3"},
    {id: 4, name: "TEST4"},
]

const ProjectsPage: FC = () => {
    
    const { walletAddress, connectWallet } = useWallet();



    return (
        <div>
            <h1>Projects</h1>
            <div>
                {projects.map(project => (
                    <Project key={project.id} id={project.id} name={project.name} />
                ))}
            </div>

        </div>
    )
}

export default ProjectsPage