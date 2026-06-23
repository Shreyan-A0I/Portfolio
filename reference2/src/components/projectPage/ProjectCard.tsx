import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ProjectCardProps {
  	id: number;
  	title: string;
  description: string;
  technologies: string[];
    image: string;
    isLeft: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ id, title, technologies, description, image, isLeft }) => {
  const href = isLeft ? `/left-brain/${id}` : `/right-brain/${id}`;
  const isGif = image.endsWith('.gif');

  return (
    <Link href={href}>
      <div className="group relative bg-black shadow-md rounded-lg overflow-hidden pt-2 transition duration-500 ease-in-out transform-gpu hover:scale-105 hover:shadow-lg animate-drop-in ">

        <div className="relative h-36 lg:h-48 md:h-48 sm:h-48">
          {isGif ? (
            <Image src={image} alt={title} className="w-full h-full object-cover" />
          ) : (
            <Image src={image} alt={title} layout="fill" objectFit="cover" className='rounded-lg'/>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent bg-black opacity-0 sm:opacity-[0.115] transition duration-500 ease-in-out group-hover:opacity-0"></div>
        </div>
        <div className='w-auto bg-black rounded-md flex flex-wrap justify-start items-center pt-4'>
        {technologies.map((tech, index) => (
          <div key={index} className='m-1'>
            {/* <div className='w-auto flex flex-wrap justify-center items-center rounded-lg bg-gradient-to-r from-pink-800 to-purple-800 px-2 py-1'> */}
            <div className='w-auto flex flex-wrap justify-center items-center rounded-lg bg-gradient-to-br from-black via-gray-900 to-purple-900 hover:from-black hover:via-gray-900 hover:to-purple-800'>
              <span className='text-white text-center text-transparent bg-clip-text bg-gradient-to-br from-white via-purple-200 to-purple-300 px-2 py-1'>{tech}</span>
            </div>
          </div>
        ))}
      </div>
        <div className="py-4 pl-2">
          <h2 className="text-lg sm:text-xl md:text-xl lg:text-xl text-white font-semibold mb-2">{title}</h2>
          <p className="text-gray-300 hidden sm:block opacity-0 group-hover:opacity-100 transition duration-500 ease-in-out">{description}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;