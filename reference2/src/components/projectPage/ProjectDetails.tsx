import React from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faLink } from '@fortawesome/free-solid-svg-icons';

interface ProjectDetailsProps {
  project: {
    title: string;
    image: string;
    technologies: string[];
    githubLink: string;
    liveLink: string;
  };
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project }) => {
  return (
    <div className="container mx-auto flex-grow pt-20 px-4 lg:pt-36 md:pt-32 sm:pt-32">
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <Image
            src={project.image}
            alt={project.title}
            width={600}
            height={400}
            className="rounded-lg shadow-md max-h-[34vh] max-w-[40vh] lg:max-h-[25rem] lg:max-w-[30rem] md:max-h-[28vh] md:max-w-[30vh] sm:max-h-[28vh] sm:max-w-[30vh]"
          />
        </div>
        <div>
          <h1 className="text-4xl font-bold mb-4 text-gray-200">{project.title}</h1>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-2 text-gray-200">Technologies Used</h2>
            <ul className="list-disc list-inside">
              {project.technologies.map((tech, index) => (
                <li key={index} className="text-lg text-gray-200">
                  {tech}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex space-x-4">
          {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-black text-gray-200 rounded-lg flex items-center space-x-2 hover:bg-gray-800 transition duration-300"
              >
                <FontAwesomeIcon icon={faGithub} />
                <span>GitHub</span>
              </a>
            )}
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="
                px-5 py-2 bg-gray-200 text-black
                rounded-lg flex items-center space-x-2 hover:bg-gray-300
                border hover:border border-purple-900
                shadow-br shadow-sm shadow-purple-900  hover:border-purple-700 hover:shadow-sm
                transition duration-500 ease-in-out 
              "
              >
                <FontAwesomeIcon icon={faLink} />
                <span>Demo</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;