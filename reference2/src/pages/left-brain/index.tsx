import React from 'react';
import Navbar from '@/components/navbar/Navbar';
import ProjectGrid, { Project } from '@/components/projectPage/ProjectGrid';

const LeftBrain: React.FC = () => {
  const [projects, setProjects] = React.useState<Project[]>([]);

  React.useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/projects/left/left-projects.json');
        const data: Record<string, Project> = await response.json();
        const projectsData = Object.values(data).map((project) => ({
          ...project,
          isLeft: true,
        }));
        setProjects(projectsData);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="flex flex-col gap-14 sm:gap-24 md:gap-24 lg:gap-24 bg-black">
      <Navbar />
      <div className="container mx-auto pt-20 px-4 lg:pt-36 md:lg:pt-36 sm:lg:pt-36">
        <ProjectGrid projects={projects} />
      </div>
    </div>
  );
};

export default LeftBrain;