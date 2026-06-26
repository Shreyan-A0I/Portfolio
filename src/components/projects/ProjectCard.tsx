'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import Tag from '@/components/shared/Tag';
import { getProjectGradient } from '@/lib/project-color';

interface ProjectCardProps {
  slug: string;
  title: string;
  description: string;
  headlineMetric: string;
  tech: string[];
  thumbnail?: string;
  category: string;
  github?: string;
  demo?: string;
}

export default function ProjectCard({
  slug,
  title,
  description,
  headlineMetric,
  tech,
  thumbnail,
  category,
  github,
  demo,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);


  return (
    <Link href={`/projects/${slug}`}>
      <div
        className="group relative overflow-hidden rounded-2xl bg-card/40 border border-border-subtle transition-all duration-500 hover:border-accent-amber/50 hover:shadow-lg"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Thumbnail Background */}
        <div
          className={`relative h-40 md:h-56 bg-gradient-to-br ${getProjectGradient(title)} overflow-hidden transition-transform duration-500 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
        >
          {thumbnail && (
            <Image
              src={thumbnail}
              alt={title}
              fill
              className="object-cover opacity-80"
            />
          )}
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Content */}
        <div className="p-6">
          <Tag variant="metric" className="mb-3">
            {category}
          </Tag>

          <h3 className="text-xl font-bold text-text-primary mb-2 group-hover:text-accent-amber transition">
            {title}
          </h3>

          {/* Description - Shows on Hover */}
          <p
            className={`text-base text-text-secondary mb-4 transition-all duration-500 overflow-hidden ${
              isHovered ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            {description}
          </p>

          {/* Metric */}
          <p className="text-accent-amber font-semibold text-base mb-4">
            {headlineMetric}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2">
            {tech.slice(0, 3).map((item) => (
              <Tag key={item} className="text-sm">
                {item}
              </Tag>
            ))}
            {tech.length > 3 && (
              <span className="text-sm text-text-secondary">
                +{tech.length - 3} more
              </span>
            )}
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="inline-flex items-center text-accent-amber text-base font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              View Details
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            {(github || demo) && (
              <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {github && (
                  <a href={github} target="_blank" rel="noopener noreferrer"
                    onClick={e => e.stopPropagation()}
                    className="font-mono text-xs text-text-secondary hover:text-text-primary transition">
                    github ↗
                  </a>
                )}
                {demo && (
                  <a href={demo} target="_blank" rel="noopener noreferrer"
                    onClick={e => e.stopPropagation()}
                    className="font-mono text-xs text-text-secondary hover:text-accent-amber transition">
                    live ↗
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
