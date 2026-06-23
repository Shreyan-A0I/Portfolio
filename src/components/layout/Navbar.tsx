'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border-subtle bg-obsidian/95 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="text-lg font-bold text-accent-amber">
            Shreyan
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8">
            <Link
              href="/"
              className="interactive-link text-text-secondary hover:text-text-primary transition"
            >
              Home
            </Link>
            <Link
              href="/projects"
              className="interactive-link text-text-secondary hover:text-text-primary transition"
            >
              Projects
            </Link>
            <Link
              href="/about"
              className="interactive-link text-text-secondary hover:text-text-primary transition"
            >
              About
            </Link>
            <Link
              href="/resume"
              className="interactive-link text-text-secondary hover:text-text-primary transition"
            >
              Resume
            </Link>
            <a
              href="mailto:shreyan.nalwad@gmail.com"
              className="interactive-link text-text-secondary hover:text-text-primary transition"
            >
              Contact
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-text-primary"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="block text-text-secondary hover:text-text-primary py-2"
            >
              Home
            </Link>
            <Link
              href="/projects"
              onClick={() => setIsOpen(false)}
              className="block text-text-secondary hover:text-text-primary py-2"
            >
              Projects
            </Link>
            <Link
              href="/about"
              onClick={() => setIsOpen(false)}
              className="block text-text-secondary hover:text-text-primary py-2"
            >
              About
            </Link>
            <Link
              href="/resume"
              onClick={() => setIsOpen(false)}
              className="block text-text-secondary hover:text-text-primary py-2"
            >
              Resume
            </Link>
            <a
              href="mailto:shreyan.nalwad@gmail.com"
              className="block text-text-secondary hover:text-text-primary py-2"
            >
              Contact
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
