import { FC } from "react";
import Project from "../components/Project";
import BottomButton from "../components/BottomButtom";
import Header from "../components/Header";
import Page from "../Page";
import { useAllProjects } from "../hooks/useAllProjects";
import { useInstructor } from "../hooks/useInstructor";

const ProjectsPage: FC = () => {
  const isInstructor = useInstructor();
  const { projects } = useAllProjects();

  return (
    <Page>
      <div className="flex flex-col gap-4 ">
        <Header isInstructor={isInstructor} />
        <h1>Projects</h1>
        <div className="flex flex-col gap-4">
          {projects.map((project) => (
            <Project
              key={project.projectId}
              id={project.projectId}
              name={project.name}
              isInstructor={isInstructor}
            />
          ))}
        </div>

        {isInstructor ? (
          <BottomButton title="Створити проект" onClick={() => {}} />
        ) : null}
      </div>
    </Page>
  );
};

export default ProjectsPage;
