import React from 'react';
import { useRouter } from 'next/router';
import Navbar from '@/components/navbar/Navbar';
import ProjectDetails from '@/components/projectPage/ProjectDetails';
import ProjectBlog from '@/components/projectPage/ProjectBlog';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubLink: string;
  liveLink: string;
  blog: string;
  videoLink: string;
}

const Project: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const [project, setProject] = React.useState<Project | null>(null);

  React.useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch('/projects/right/right-projects.json');
        const data: Record<string, Project> = await response.json();
        const projectData = data[id as string];
        setProject(projectData);
      } catch (error) {
        console.error('Error fetching project:', error);
      }
    };

    if (id) {
      fetchProject();
    }
  }, [id]);

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar titleStyle='text-white'/>
      <ProjectDetails project={project} />
      <ProjectBlog project={project} />
    </div>
  );
};
export default Project;