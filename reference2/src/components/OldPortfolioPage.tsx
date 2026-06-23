'use client'
import React from 'react';
import { ExternalLink, ChevronRight, Music, Code, Brain, Award, Microscope } from 'lucide-react';
import InstagramEmbed from './InstagramEmbed';
import Navbar from '@/components/navbar/Navbar';

export default function PortfolioPage() {
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
          <div className="bg-theme-bg-secondary rounded-lg shadow-xl p-6">
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
                  MathAcademy
                  <ExternalLink className="w-4 h-4" />
                </a>
              </h3>
              <div className="flex items-start gap-6">
                <div className="flex-1">
                  <p className="text-gray-300 mb-2">Daily rigorous practice to maintain proficiency in machine learning mathematics</p>
                  <p className="text-gray-400 mb-2">Covering linear algebra, multivariable calculus, probability theory, and statistical inference</p>
                  <p className="text-gray-400 text-sm">(1 XP ≈ 1 minute of focused problem solving)</p>
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
          <div className="bg-theme-bg-secondary rounded-lg shadow-xl p-6">
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
              <h3 className="text-xl font-semibold mb-2">Mahindra École Centrale Research <span className="text-gray-400">(Oct 2022 – Sept 2024)</span></h3>
              <p className="text-gray-400 mb-4">IEEE WCCI 2024 (CEC) Publication</p>
              <ul className="list-disc pl-6 text-gray-300">
                <li className="mb-2">Developed novel differential evolution system for emotion-aligned sound synthesis</li>
                <li className="mb-2">Combined music information retrieval with evolutionary computation</li>
                <li className="mb-2">Achieved 90% classification accuracy using self-organizing maps and fuzzy clustering</li>
                <li>Designed pipelines for extracting 100+ time and frequency-based features</li>
              </ul>
            </div>
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Fan Lab Research - Genomic ML <span className="text-gray-400">(Feb 2024 – Present)</span></h3>
              <p className="text-gray-400 mb-4">Research on genomic foundational models and RNA-protein interactions</p>
              <ul className="list-disc pl-6 text-gray-300">
                <li className="mb-2">Conducted research under Dr. Xiao Fan on genomic foundational models using nucleotide variance techniques</li>
                <li>Developing neural network system for RNA-Protein interaction prediction to aid in cancer diagnosis</li>
              </ul>
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
            <div className="bg-theme-bg-secondary rounded-lg shadow-xl p-6">
              <h3 className="text-xl font-semibold mb-2">
                <a href="https://www.instagram.com/tapsta.app/" 
                   className="text-xl font-semibold hover:text-blue-400 flex items-center gap-2"
                   target="_blank"
                   rel="noopener noreferrer">
                  Tapsta
                  <ExternalLink className="w-4 h-4" />
                </a>
              </h3>
              <p className="text-gray-400 mb-4">Lead Software/Founding Engineer</p>
              <ul className="list-disc pl-6 text-gray-300">
                <li className="mb-2">Leading development team of 4 building social media app connecting students with local merchants (1000+ users)</li>
                <li className="mb-2">Designed scalable architecture with 20+ schemas, shipped 50,000+ lines of code across front/backend</li>
                <li className="mb-2">Implemented CI/CD pipelines and optimized database queries</li>
                <li>Mentored 3 SDE interns, accelerating project velocity and code quality</li>
              </ul>
            </div>

            <div className="bg-theme-bg-secondary rounded-lg shadow-xl p-6">
              <h3 className="text-xl font-semibold mb-2">
                <a href="https://oneaiclick.com" 
                   className="text-xl font-semibold hover:text-blue-400 flex items-center gap-2"
                   target="_blank"
                   rel="noopener noreferrer">
                  OneAIclick.com
                  <ExternalLink className="w-4 h-4" />
                </a>
              </h3>
              <p className="text-gray-400 mb-4">Co-Founder/Founding Engineer</p>
              <ul className="list-disc pl-6 text-gray-300">
                <li className="mb-2">Building private LLM pipeline abstraction tooling for easy fine-tuning and deployment</li>
                <li className="mb-2">Developed no-code GUI for fine-tuning open-source HuggingFace LLMs</li>
                <li>Speeding up validation of fine-tuning on custom datasets by 2X over traditional methods</li>
              </ul>
            </div>

            <div className="bg-theme-bg-secondary rounded-lg shadow-xl p-6">
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
                <li className="mb-2">Fine-tuned language models and developed custom API mapping system to teach language models to use APIs.</li>
                <li className="mb-2">Implemented real-time data analytics system for crypto token volume monitoring</li>
                <li>Contributed to facilitating $150M+ in trading volume over 30 days</li>
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
            <div className="bg-theme-bg-secondary rounded-lg shadow-xl p-6">
              <h3 className="text-xl font-semibold mb-2">Music Theory & Audio Programming Studies</h3>
              <ul className="list-disc pl-6 text-gray-300">
                <li className="mb-2">Currently studying Fundamentals of Music Theory (University of Edinburgh) on Coursera</li>
                <li className="mb-2">Developing audio plugins using C++ & JUCE framework</li>
                <li>Implementing real-time audio processing and synthesis techniques</li>
              </ul>
            </div>
            
            <div className="bg-theme-bg-secondary rounded-lg shadow-xl p-6">
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

            <div className="bg-theme-bg-secondary rounded-lg shadow-xl p-6">
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

            <div className="bg-theme-bg-secondary rounded-lg shadow-xl p-6">
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
            <div className="bg-theme-bg-secondary rounded-lg shadow-xl p-6">
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
            <div className="bg-theme-bg-secondary rounded-lg shadow-xl p-6">
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
          <div className="bg-theme-bg-secondary rounded-lg shadow-xl p-6">
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
            <div className="bg-theme-bg-secondary rounded-lg shadow-xl p-6">
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