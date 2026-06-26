'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const NAV_LINKS = [
  { href: '/',         label: 'Home'     },
  { href: '/projects', label: 'Projects' },
  { href: '/feed',     label: 'Feed'     },
  { href: '/resume',   label: 'Resume'   },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

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
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`interactive-link transition text-sm ${
                  isActive(href)
                    ? 'text-text-primary font-semibold border-b border-accent-amber/60 pb-0.5'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {label}
              </Link>
            ))}
            <a
              href="mailto:shreyan.nalwad@gmail.com"
              className="interactive-link text-sm text-text-secondary hover:text-text-primary transition"
            >
              Contact
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-text-primary">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-1">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setIsOpen(false)}
                className={`block py-2 text-sm transition ${
                  isActive(href)
                    ? 'text-text-primary font-semibold'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {isActive(href) && (
                  <span className="mr-2 text-accent-amber">›</span>
                )}
                {label}
              </Link>
            ))}
            <a
              href="mailto:shreyan.nalwad@gmail.com"
              className="block py-2 text-sm text-text-secondary hover:text-text-primary transition"
            >
              Contact
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
