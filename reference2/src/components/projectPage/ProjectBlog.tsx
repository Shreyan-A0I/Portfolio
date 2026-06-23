// components/project-blog.tsx
import React from 'react';
import ReactPlayer from 'react-player';

interface ProjectBlogProps {
  project: {
    description: string;
    blog: string;
    videoLink: string;
  };
}

const ProjectBlog: React.FC<ProjectBlogProps> = ({ project }) => {
  return (
    <div className="flex flex-col max-h-screen" suppressHydrationWarning={true}>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8" suppressHydrationWarning={true}>
          <h2 className="text-2xl font-semibold mb-2 ">Project Description</h2>
          <p className="text-lg text-gray-200 whitespace-pre-line">{project.description}</p>
        </div>
        <div className="flex flex-col gap-4 pb-4">
          <h2 className="text-2xl font-semibold mb-2">More Info</h2>
          <p className="text-lg text-gray-200 whitespace-pre-line">{project.blog}</p>
          {project.videoLink &&
            <div className="mb-8 mt-4">
              <ReactPlayer url={project.videoLink} width="95%" height="60vh" />
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default ProjectBlog;