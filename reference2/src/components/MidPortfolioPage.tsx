'use client'
import React from 'react';
import { ExternalLink, ChevronRight, Music, Code, Brain, Award, Microscope, BookOpen } from 'lucide-react';
import InstagramEmbed from './InstagramEmbed';
import Navbar from '@/components/navbar/Navbar';

export default function MidPortfolioPage() {
  return (
    <div className=''>
    <div className="z-10">
    <Navbar className='bg-transparent' titleStyle='text-theme-text-primary'/>
  </div>
    <div className="min-h-screen bg-theme-bg-primary text-theme-text-primary">

      {/* Hero Section */}
      <header className="py-40" style={{
        background: 'linear-gradient(to right, var(--accent-primary), var(--accent-secondary))'
      }}>
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Sai Ravi Teja Gangavarapu</h1>
          <p className="text-xl mb-6">Music Technology Researcher & Software Engineer</p>
          <p className="text-lg opacity-90 mb-4">(412) 251-7161 | sairavig@cs.cmu.edu | Pittsburgh, PA | floaredor.vercel.app</p>
          <p className="text-lg opacity-90">Exploring the intersection of AI, Music, and Human-Computer Interaction</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Education */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Brain className="w-6 h-6" />
            Education
          </h2>
          <div className="bg-gray-900 rounded-lg shadow-xl p-6">
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Carnegie Mellon University <span className="text-gray-400">(Aug 2025 – Dec 2026)</span></h3>
              <p className="text-gray-300">Master of Software Engineering - Scalable Systems</p>
              <p className="text-gray-400"></p>
            </div>
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">University of Florida <span className="text-gray-400">(Jan 2024 – May 2024)</span></h3>
              <p className="text-gray-300">Senior Certificate + Master&apos;s coursework in Computer Science, CISE Department</p>
              <p className="text-gray-400 mb-2">GPA: 4.0/4.0</p>
              <p className="text-gray-400">Courses: Analysis of Algorithms, Advanced Data Structures, Computer Graphics, UX Design</p>
            </div>
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Mahindra École Centrale <span className="text-gray-400">(2020 - 2024)</span></h3>
              <p className="text-gray-300">B.Tech, Computer Science and Engineering</p>
              <p className="text-gray-400">Hyderabad, India</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Kennedy High The Global School <span className="text-gray-400">(2018 - 2020)</span></h3>
              <p className="text-gray-300">A-levels - Mathematics, Physics and Chemistry</p>
              <p className="text-gray-400">AAB Grades</p>
            </div>

            {/* MathAcademy */}
            <div className="mt-6 border-t border-gray-800 pt-6">
              <h3 className="text-xl font-semibold mb-2">
                <a href="https://www.mathacademy.com/courses/mathematics-for-machine-learning"
                   className="hover:text-blue-400 flex items-center gap-2"
                   target="_blank"
                   rel="noopener noreferrer">
                  MathAcademy <span className="text-gray-400">(Sep 2024 – Present)</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </h3>
              <div className="flex items-start gap-6">
                <div className="flex-1">
                  <p className="text-gray-300 mb-2">Mathematics for Machine Learning - Daily practice in ML, Probability, Statistics and Calculus</p>
                  {/* <p className="text-gray-400 text-sm">(1 XP ≈ 1 minute of focused problem solving)</p> */}
                </div>
                <img
                  src="/images/left/mathacademy2.png"
                  alt="MathAcademy Progress"
                  className="w-[450px] h-auto rounded-lg shadow-lg transition-transform duration-300 hover:scale-150 hover:z-50"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Research Experience */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Microscope className="w-6 h-6" />
            Research Experience
          </h2>
          <div className="bg-gray-900 rounded-lg shadow-xl p-6">
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Michigan State University Research <span className="text-gray-400">(Sept 2024 – Present)</span></h3>
              <p className="text-gray-400 mb-4">Working on emotional music transitions and therapeutic music generation</p>
              <ul className="list-disc pl-6 text-gray-300">
                <li className="mb-2">Developing therapeutic music generation systems using the iso principle for mood transition</li>
                <li className="mb-2">Investigating multi-objective optimization for raga-based music generation</li>
                <li>Collaboration with Dr. Kalyanmoy Dev and Prof. Arya Kumar</li>
              </ul>
            </div>
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Mahindra École Centrale Research <span className="text-gray-400">(Dec 2022 – Jan 2025)</span></h3>
              <p className="text-gray-400 mb-4">IEEE WCCI 2024 (CEC) Publication</p>
              <ul className="list-disc pl-6 text-gray-300">
                <li className="mb-2">Published research on emotion-targeted music generation using FFT, differential evolution, F C-means, self-organizing maps achieving 85% accuracy in classification</li>
                <li className="mb-2">Implemented ALI-GAN model with t-SNE and PCA for clustering analysis on 1000+ samples</li>
                <li className="mb-2">Built MIR pipelines extracting 100+ features</li>
              </ul>
            </div>
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Fan Lab Research - Genomic ML <span className="text-gray-400">(Feb 2024 – Jun 2024)</span></h3>
              <p className="text-gray-400 mb-4">Research on genomic foundational models and RNA-protein interactions</p>
              <ul className="list-disc pl-6 text-gray-300">
                <li className="mb-2">Applied genomic models for rare disease prediction using transformer architectures, processing 15,000+ DNA sequences</li>
                <li>Developed multi-layer perceptron models using protein embeddings (ESM3) analyzing RNA-binding proteins</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Leadership */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Award className="w-6 h-6" />
            Leadership
          </h2>
          <div className="bg-gray-900 rounded-lg shadow-xl p-6">
            <div className="space-y-6">
              <div className="achievement-item">
                <h3 className="text-xl font-semibold text-blue-400">
                  President, Enigma, the Computer Science Club <span className="text-gray-400">(2021-2023)</span>
                </h3>
                <ul className="list-disc pl-6 text-gray-300">
                  <li className="mb-2">Conducted technical workshops on Gamedev, ML, Linux, heading outreach initiatives increasing the club membership by 40%, reaching over 2000 students</li>
                  <li>Collabs Ubisoft, NVIDIA</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Publications */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <BookOpen className="w-6 h-6" />
            Publications
          </h2>
          <div className="bg-gray-900 rounded-lg shadow-xl p-6">
            <div className="space-y-4">
              <div className="publication-item">
                <h3 className="text-lg font-semibold text-blue-400">
                  &quot;From clicks to insights: analysing online customer reviews for handicraft products&quot;
                </h3>
                <p className="text-gray-400">Technology Analysis & Strategic Management (2025)</p>
              </div>

              <div className="publication-item">
                <h3 className="text-lg font-semibold text-blue-400">
                  &quot;Emotion Aligned Music Composition from Sound Fundamentals Using Differential Evolution&quot;
                </h3>
                <p className="text-gray-400">IEEE Congress on Evolutionary Computation (CEC 2024)</p>
              </div>
            </div>
          </div>
        </section>

        {/* Work Experience */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Code className="w-6 h-6" />
            Work Experience
          </h2>
          <div className="space-y-6">
            <div className="bg-gray-900 rounded-lg shadow-xl p-6">
              <h3 className="text-xl font-semibold mb-2">
                <a href="https://www.instagram.com/tapsta.app/"
                   className="text-xl font-semibold hover:text-blue-400 flex items-center gap-2"
                   target="_blank"
                   rel="noopener noreferrer">
                  Tapsta <span className="text-gray-400">(Jul 2024 – Jun 2025)</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </h3>
              <p className="text-gray-400 mb-4">Founding Software Engineer</p>
              <ul className="list-disc pl-6 text-gray-300">
                <li className="mb-2">Architected end-to-end full-stack social rewards mobile application using React, React Native, FastAPI, and PostgreSQL</li>
                <li className="mb-2">Designed database architecture with 25+ schemas and optimized client-side operations with caching and debouncing, achieving 30% faster response times</li>
                <li className="mb-2">Worked with product team to redesign onboarding flow, driving 40% user retention</li>
                <li className="mb-2">Orchestrated Plaid API integration alongside REST API creation, establishing secure bank connectivity and enabling automated cashback processing, plus ACH transfers for over 1,500 application users</li>
                <li className="mb-2">Made containerized CI/CD pipeline with Docker, AWS, and ArgoCD that reduced deployment time by 70%</li>
                <li className="mb-2">Led development team of 3 SDE interns, establishing code review processes that contributed to 30% faster feature delivery</li>
                <li>Built a semantic people search engine for alumni networks using embedding-based similarity using LangGraph</li>
              </ul>
            </div>

            <div className="bg-gray-900 rounded-lg shadow-xl p-6">
              <h3 className="text-xl font-semibold mb-2">
                <a href="https://garden.finance" 
                   className="text-xl font-semibold hover:text-blue-400 flex items-center gap-2"
                   target="_blank"
                   rel="noopener noreferrer">
                  Catalog.fi
                  <ExternalLink className="w-4 h-4" />
                </a>
              </h3>
              <p className="text-gray-400 mb-4">Software Development Engineer Intern</p>
              <ul className="list-disc pl-6 text-gray-300">
                <li className="mb-2">Taught LLMs to use APIs (incl. function calling), fine-tuning LLaMA/BERT in PyTorch to build a natural-language interface for payroll, achieving 90% natural language to API accuracy and reducing API integration time by 25%</li>
                <li className="mb-2">Implemented full-stack crypto analytics platform using React, FastAPI, Postgres, Pandas, and Golang with real-time monitoring dashboard and a microservice for a leaderboard system for garden.finance, boosting user engagement by 30%</li>
                <li className="mb-2">Improved backend performance using Go and PostgreSQL optimizations, supporting $150M+ trading volume over 30 days with 20% faster queries on garden.finance</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Music Technology Projects */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Music className="w-6 h-6" />
            Music Technology Projects <span className="text-gray-400">(2021 – Present)</span>
          </h2>
          <div className="space-y-6">
            <div className="bg-gray-900 rounded-lg shadow-xl p-6">
              <h3 className="text-xl font-semibold mb-2">Music Theory & Audio Programming Studies</h3>
              <ul className="list-disc pl-6 text-gray-300">
                <li className="mb-2">Currently studying Fundamentals of Music Theory (University of Edinburgh) on Coursera</li>
                <li className="mb-2">Developing audio plugins using C++ & JUCE framework</li>
                <li>Implementing real-time audio processing and synthesis techniques</li>
              </ul>
            </div>
            
            <div className="bg-gray-900 rounded-lg shadow-xl p-6">
              <h3 className="text-xl font-semibold mb-2">
                <a href="https://floaredor.vercel.app/left-brain" 
                   className="text-xl font-semibold hover:text-blue-400 flex items-center gap-2"
                   target="_blank"
                   rel="noopener noreferrer">
                  Samplebox
                  <ExternalLink className="w-4 h-4" />
                </a>
              </h3>
              <p className="text-gray-400 mb-4">Desktop application for music production workflow (30+ active users)</p>
              <ul className="list-disc pl-6 text-gray-300">
                <li className="mb-2">Implemented stem separation and drum kit extraction</li>
                <li className="mb-2">Created algorithmic variations of harmonic samples using music theory principles</li>
                <li>Built with Electron.js, FastAPI, and Librosa</li>
              </ul>
            </div>

            <div className="bg-gray-900 rounded-lg shadow-xl p-6">
              <h3 className="text-xl font-semibold mb-2">
                <a href="https://floaredor.vercel.app/left-brain" 
                   className="text-xl font-semibold hover:text-blue-400 flex items-center gap-2"
                   target="_blank"
                   rel="noopener noreferrer">
                  Text-to-Synthesizer System
                  <ExternalLink className="w-4 h-4" />
                </a>
              </h3>
              <p className="text-gray-400 mb-4">Natural language control of synthesizer parameters</p>
              <ul className="list-disc pl-6 text-gray-300">
                <li className="mb-2">Parameter mapping using LAION-CLAP embeddings</li>
                <li className="mb-2">PyTorch implementation with differential evolution</li>
                <li>STFT-based timbre matching capabilities</li>
              </ul>
            </div>

            <div className="bg-gray-900 rounded-lg shadow-xl p-6">
              <h3 className="text-xl font-semibold mb-2">
                <a href="https://floaredor.vercel.app/left-brain/21" 
                   className="text-xl font-semibold hover:text-blue-400 flex items-center gap-2"
                   target="_blank"
                   rel="noopener noreferrer">
                  Audio-Visual Integration Projects
                  <ExternalLink className="w-4 h-4" />
                </a>
              </h3>
              <ul className="list-disc pl-6 text-gray-300">
                <li className="mb-2">CUDA-accelerated ray tracer with FFT-based audio reactivity</li>
                <li className="mb-2">Audio-reactive GAN art installations</li>
                <li>Boids simulation with audio parameter mapping</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Other Technical Projects */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Code className="w-6 h-6" />
            Other Technical Projects
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-900 rounded-lg shadow-xl p-6">
              <h3 className="text-xl font-semibold mb-2">
                <a href="https://floaredor.vercel.app/left-brain" 
                   className="text-xl font-semibold hover:text-blue-400 flex items-center gap-2"
                   target="_blank"
                   rel="noopener noreferrer">
                  Project RECON
                  <ExternalLink className="w-4 h-4" />
                </a>
              </h3>
              <p className="text-gray-400 mb-4">8-pi compute cluster serving 400+ students</p>
              <ul className="list-disc pl-6 text-gray-300">
                <li className="mb-2">Implemented VLANs and distributed storage</li>
                <li className="mb-2">$2000 funded university infrastructure project</li>
                <li>GlusterFS and OpenMPI implementation</li>
              </ul>
            </div>
            <div className="bg-gray-900 rounded-lg shadow-xl p-6">
              <h3 className="text-xl font-semibold mb-2">
                <a href="https://floaredor.vercel.app/left-brain" 
                   className="text-xl font-semibold hover:text-blue-400 flex items-center gap-2"
                   target="_blank"
                   rel="noopener noreferrer">
                  Co-Write
                  <ExternalLink className="w-4 h-4" />
                </a>
              </h3>
              <p className="text-gray-400 mb-4">AI-powered learning platform with academic integrity focus</p>
              <ul className="list-disc pl-6 text-gray-300">
                <li className="mb-2">Custom RAG model implementation</li>
                <li className="mb-2">Next.js, FastAPI, and LangChain stack</li>
                <li>Professor-defined AI assistance boundaries</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Achievements */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Award className="w-6 h-6" />
            Notable Achievements
          </h2>
          <div className="bg-gray-900 rounded-lg shadow-xl p-6">
            <div className="space-y-6">
              <div className="achievement-item">
                <h3 className="text-xl font-semibold text-blue-400">
                  <a href="https://floaredor.vercel.app/left-brain" 
                     className="flex items-center gap-2 hover:text-blue-300"
                     target="_blank"
                     rel="noopener noreferrer">
                    WaffleHacks 2024 - First Place <span className="text-gray-400">(2024)</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </h3>
                <p className="text-gray-400 mb-2">320+ participants</p>
                <ul className="list-disc pl-6 text-gray-300">
                  <li className="mb-2">Built Chrome extension with RAG system for personalized learning in 24 hours</li>
                </ul>
              </div>

              <div className="achievement-item">
                <h3 className="text-xl font-semibold text-blue-400">
                  <a href="https://floaredor.vercel.app/left-brain" 
                     className="flex items-center gap-2 hover:text-blue-300"
                     target="_blank"
                     rel="noopener noreferrer">
                    Aether Game Jam 2024 - First Place <span className="text-gray-400">(2024)</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </h3>
                <ul className="list-disc pl-6 text-gray-300">
                  <li className="mb-2">Developed top-down horror game using Godot engine in 48 hrs</li>
                  <li className="mb-2">Implemented A* pathfinding algorithm and procedural map generation</li>
                  <li>Created custom sound design and atmospheric effects</li>
                </ul>
              </div>

              <div className="achievement-item">
                <h3 className="text-xl font-semibold text-blue-400">
                  <a href="https://floaredor.vercel.app/left-brain" 
                     className="flex items-center gap-2 hover:text-blue-300"
                     target="_blank"
                     rel="noopener noreferrer">
                    Noderunner Hackathon - First Place
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </h3>
                <p className="text-gray-400 mb-2">50+ participants</p>
                <ul className="list-disc pl-6 text-gray-300">
                  <li className="mb-2">Solo implementation of distributed Raft consensus protocol in 18 hrs</li>
                </ul>
              </div>

              <div className="achievement-item">
                <h3 className="text-xl font-semibold text-blue-400">
                  <a href="https://floaredor.vercel.app/left-brain" 
                     className="flex items-center gap-2 hover:text-blue-300"
                     target="_blank"
                     rel="noopener noreferrer">
                    Talentmapp Hack4Hire 2023 - First Place <span className="text-gray-400">(2023)</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </h3>
                <p className="text-gray-400 mb-2">300+ participants</p>
                <ul className="list-disc pl-6 text-gray-300">
                  <li className="mb-2">Built full-stack task-tracking application with LLM integration</li>
                  <li className="mb-2">Tech stack: MongoDB, Flask, React.js, ChatGPT</li>
                  <li className="mb-2">Implemented secure backend and intelligent task suggestions</li>
                  <li>Deployed the solution in 8 hours</li>
                </ul>
              </div>

              <div className="achievement-item">
                <h3 className="text-xl font-semibold text-blue-400">Finalist, NVIDIA SAP</h3>
                <ul className="list-disc pl-6 text-gray-300">
                  <li>Finalist in the NVIDIA Student Ambassador Program</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Music Compositions & Media */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Music className="w-6 h-6" />
            Music Compositions & Media
          </h2>
          <div className="grid gap-6">
            <div className="bg-gray-900 rounded-lg shadow-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Featured Works</h3>
              <div className="space-y-6">
                <iframe
                  width="100%"
                  height="300"
                  scrolling="no"
                  frameBorder="no"
                  allow="autoplay"
                  src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1197833611&color=%23040406&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
                ></iframe>
                <iframe
                  width="100%"
                  height="166"
                  scrolling="no"
                  frameBorder="no"
                  allow="autoplay"
                  src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1212479563&color=%23040406&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"
                ></iframe>
                <div className="mt-4 space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <InstagramEmbed url="https://www.instagram.com/p/CXgLeW5hTUT/" />
                    <InstagramEmbed url="https://www.instagram.com/reel/CmFQdRwsQAf/" />
                  </div>
                  <h4 className="text-lg font-semibold mt-8 mb-4">GAN Art Showcase + DJ set (5th and 6th page)</h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <InstagramEmbed url="https://www.instagram.com/p/Cpk381-BgGM/" />
                    <InstagramEmbed url="https://www.instagram.com/tv/CluZbX5ANTj" />
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <p className="text-gray-400">
                  My music draws inspiration from artists like Flume, Kasbo, Petit Biscuit, and Tourist, 
                  blending ethereal soundscapes with intricate electronic production. I&apos;m particularly 
                  passionate about experimental sound design, with granular synthesis being one of my 
                  favorite techniques for creating atmospheric pads and textures. My work explores the 
                  space between melodic electronic music and experimental sound design, always pushing 
                  to find new and interesting ways to craft surprising yet pleasing sonic experiences.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Connect</h2>
          <div className="flex flex-wrap gap-4">
            <a href="https://linkedin.com/in/sai-ravi-teja-gangavarapu" 
               className="flex items-center gap-2 text-blue-400 hover:text-blue-300"
               target="_blank"
               rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4" />
              LinkedIn
            </a>
            <a href="https://soundcloud.com/raven-714331711/popular-tracks" 
               className="flex items-center gap-2 text-blue-400 hover:text-blue-300"
               target="_blank"
               rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4" />
              SoundCloud
            </a>
            <a href="https://github.com/floaredor" 
               className="flex items-center gap-2 text-blue-400 hover:text-blue-300"
               target="_blank"
               rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4" />
              GitHub
            </a>
          </div>
        </section>
      </main>

      <footer className="bg-theme-bg-secondary text-theme-text-secondary py-8 mt-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p>© 2024 Sai Ravi Teja Gangavarapu</p>
        </div>
      </footer>
      </div>
      </div>
  );
}