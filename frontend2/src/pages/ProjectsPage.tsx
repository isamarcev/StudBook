import { FC, useEffect, useState } from 'react'
import { useWallet } from '../hooks/useWallet';
import Project from '../components/Project';
import BottomButton from '../components/BottomButtom';
import Header from '../components/Header';
import Page from '../Page';
import { useNavigate } from 'react-router-dom';
import { checkIfInstructor, getInstructorProjects } from '../controllers/contract';
import { useInstructor } from '../hooks/useInstructor';
import { useAllProjects } from '../hooks/useAllProjects';

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
  const isInstructor = useInstructor();
  const {projects, loading, error} = useAllProjects();


    return (
        <Page>
            <div className='flex flex-col gap-4 '>
                <Header isInstructor={isInstructor}/>
                <h1 className='text-3xl'>Проекти:</h1>
                <div className="flex flex-col gap-4">
                    {projects.map(project => (
                        <Project key={project.projectId} 
                        id={project.projectId} 
                        name={project.name} 
                        isInstructor={isInstructor} 
                        description={project.description}
                        onClick=
                        {
                          isInstructor ?
                          () => {navigate(`/project/${project.projectId}`)}
                          : () => {navigate(`/apply/${project.projectId}`)}
                        }/>
                    ))}
                </div>

        {isInstructor ? (
          <BottomButton title="Створити проект" onClick={() => {navigate(`/create-project`)}} />
        ) : null}
      </div>
    </Page>
  );
};

export default ProjectsPage;
