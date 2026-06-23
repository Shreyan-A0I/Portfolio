'use client'
import React from 'react';
import { ExternalLink, ChevronRight, Music, Code, Brain, Award, Microscope, BookOpen } from 'lucide-react';
import InstagramEmbed from './InstagramEmbed';
import Navbar from '@/components/navbar/Navbar';

export default function PortfolioPage() {
  return (
    <div className=''>
    <style jsx>{`
      .win95-window {
        background: #c0c0c0;
        border-top: 2px solid #ffffff;
        border-left: 2px solid #ffffff;
        border-right: 2px solid #000000;
        border-bottom: 2px solid #000000;
        box-shadow: inset 1px 1px 0 0 #dfdfdf, inset -1px -1px 0 0 #808080;
      }

      .win95-title-bar {
        background: linear-gradient(90deg, #000080, #1084d0);
        color: white;
        padding: 2px 4px;
        font-weight: bold;
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 11px;
        letter-spacing: 0.5px;
      }

      .win95-content {
        background: #c0c0c0;
        padding: 8px;
      }

      .win95-inset {
        border-top: 2px solid #808080;
        border-left: 2px solid #808080;
        border-right: 2px solid #dfdfdf;
        border-bottom: 2px solid #dfdfdf;
        background: white;
        padding: 8px;
      }

      .win95-button {
        background: #c0c0c0;
        border-top: 2px solid #ffffff;
        border-left: 2px solid #ffffff;
        border-right: 2px solid #000000;
        border-bottom: 2px solid #000000;
        padding: 4px 12px;
        font-size: 11px;
        cursor: pointer;
      }

      .win95-button:active {
        border-top: 2px solid #000000;
        border-left: 2px solid #000000;
        border-right: 2px solid #ffffff;
        border-bottom: 2px solid #ffffff;
      }

      .win95-desktop {
        background: #008080;
        min-height: 100vh;
        font-family: 'MS Sans Serif', 'Microsoft Sans Serif', sans-serif;
      }

      .win95-taskbar {
        background: #c0c0c0;
        border-top: 2px solid #ffffff;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        height: 32px;
        display: flex;
        align-items: center;
        padding: 0 4px;
        z-index: 1000;
      }

      .win95-start-button {
        background: #c0c0c0;
        border-top: 2px solid #ffffff;
        border-left: 2px solid #ffffff;
        border-right: 2px solid #000000;
        border-bottom: 2px solid #000000;
        padding: 2px 8px;
        font-weight: bold;
        display: flex;
        align-items: center;
        gap: 4px;
      }
    `}</style>
    <div className="z-10">
    <Navbar className='bg-transparent' titleStyle='text-theme-text-primary' hideTitle={true}/>
  </div>
    <div className="win95-desktop" style={{paddingBottom: '50px'}}>

      {/* Hero Section */}
      <header className="pt-32 pb-6 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="win95-window mb-4">
            <div className="win95-title-bar">
              <span>📋 Portfolio</span>
            </div>
            <div className="win95-content">
              <div className="win95-inset">
                <h1 className="text-2xl font-bold mb-2" style={{color: '#000080'}}>Sai Ravi Teja Gangavarapu</h1>
                <p className="mb-1" style={{color: '#000000'}}><strong>Music Technology Researcher & Software Engineer</strong></p>
                <p className="text-sm mb-1" style={{color: '#000000'}}>(412) 251-7161 | sairavig@cs.cmu.edu | Pittsburgh, PA | floaredor.vercel.app</p>
                <p className="text-sm" style={{color: '#000000'}}>Exploring the intersection of AI, Music, and Human-Computer Interaction</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 pb-16">
        {/* About Me */}
        <section className="mb-4">
          <div className="win95-window">
            <div className="win95-title-bar">
              <span>💬 About Me</span>
            </div>
            <div className="win95-content">
              <div className="win95-inset">
                <p className="text-sm leading-relaxed mb-3" style={{color: '#000000'}}>
                  I started out making music. I&apos;d spend entire nights producing tracks just because I loved it (and cuz I only had FL Studio trial version). The best part was when a song actually meant something - to me, and to whoever listened. That feeling of translating emotion into sound got me hooked on the idea that technology could be creative. So I ended up studying computer science and machine learning, trying to figure out how to mix code with art.
                </p>
                <p className="text-sm leading-relaxed mb-3" style={{color: '#000000'}}>
                  These days I&apos;m into music production, philosophy books, building weird tech projects, and going to hackathons. I like working on stuff that&apos;s both technical and creative - like training neural nets to make music, building tools for artists, or just seeing what strange sounds I can get a computer to make.
                </p>
                <p className="text-sm leading-relaxed" style={{color: '#000000'}}>
                  I like making things that are useful or interesting. That&apos;s pretty much it.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Education */}
        <section className="mb-4">
          <div className="win95-window">
            <div className="win95-title-bar">
              <span>🎓 Education</span>
            </div>
            <div className="win95-content">
              <div className="win95-inset">
                <div className="mb-4">
                  <h3 className="text-sm font-bold mb-1" style={{color: '#000080'}}>Carnegie Mellon University <span style={{color: '#000000', fontWeight: 'normal'}}>(Aug 2025 – Dec 2026)</span></h3>
                  <p className="text-sm" style={{color: '#000000'}}>Master of Software Engineering - Scalable Systems</p>
                </div>
                <div className="mb-4">
                  <h3 className="text-sm font-bold mb-1" style={{color: '#000080'}}>University of Florida <span style={{color: '#000000', fontWeight: 'normal'}}>(Jan 2024 – May 2024)</span></h3>
                  <p className="text-sm" style={{color: '#000000'}}>Senior Certificate + Master&apos;s coursework in Computer Science, CISE Department</p>
                  <p className="text-sm" style={{color: '#000000'}}>GPA: 4.0/4.0</p>
                  <p className="text-sm" style={{color: '#000000'}}>Courses: Analysis of Algorithms, Advanced Data Structures, Computer Graphics, UX Design</p>
                </div>
                <div className="mb-4">
                  <h3 className="text-sm font-bold mb-1" style={{color: '#000080'}}>Mahindra École Centrale <span style={{color: '#000000', fontWeight: 'normal'}}>(2020 - 2024)</span></h3>
                  <p className="text-sm" style={{color: '#000000'}}>B.Tech, Computer Science and Engineering</p>
                  <p className="text-sm" style={{color: '#000000'}}>Hyderabad, India</p>
                </div>
                <div className="mb-4">
                  <h3 className="text-sm font-bold mb-1" style={{color: '#000080'}}>Kennedy High The Global School <span style={{color: '#000000', fontWeight: 'normal'}}>(2018 - 2020)</span></h3>
                  <p className="text-sm" style={{color: '#000000'}}>A-levels - Mathematics, Physics and Chemistry</p>
                  <p className="text-sm" style={{color: '#000000'}}>AAB Grades</p>
                </div>

                {/* MathAcademy */}
                <div className="mt-4 pt-4" style={{borderTop: '2px dotted #808080'}}>
                  <h3 className="text-sm font-bold mb-2" style={{color: '#000080'}}>
                    <a href="https://www.mathacademy.com/courses/mathematics-for-machine-learning"
                       className="hover:underline"
                       style={{color: '#000080'}}
                       target="_blank"
                       rel="noopener noreferrer">
                      MathAcademy <span style={{color: '#000000', fontWeight: 'normal'}}>(Sep 2024 – Present)</span>
                    </a>
                  </h3>
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <p className="text-sm mb-2" style={{color: '#000000'}}>Mathematics for Machine Learning - Daily practice in ML, Probability, Statistics and Calculus</p>
                    </div>
                    <img
                      src="/images/left/mathacademy2.png"
                      alt="MathAcademy Progress"
                      className="w-[300px] h-auto"
                      style={{border: '2px solid #000000'}}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Music Technology Projects */}
        <section className="mb-4">
          <div className="win95-window">
            <div className="win95-title-bar">
              <span>🎵 Music Technology Projects (2021 – Present)</span>
            </div>
            <div className="win95-content space-y-3">
              <div className="win95-inset">
                <h3 className="text-sm font-bold mb-2" style={{color: '#000080'}}>Music Theory & Audio Programming Studies</h3>
                <ul className="list-disc pl-5 text-sm" style={{color: '#000000'}}>
                  <li className="mb-1">Currently studying Fundamentals of Music Theory (University of Edinburgh) on Coursera and doing a bit of simply piano :)</li>
                  <li className="mb-1">and Audio Signal Processing for Music Applications by Professor Xavier Serra - Stanford</li>
                  <li className="mb-1">Developing audio plugins using C++ & JUCE framework</li>
                  <li>Implementing real-time audio processing and synthesis techniques</li>
                </ul>
              </div>

              <div className="win95-inset">
                <h3 className="text-sm font-bold mb-1" style={{color: '#000080'}}>
                  <a href="https://floaredor.vercel.app/left-brain"
                     className="hover:underline"
                     style={{color: '#000080'}}
                     target="_blank"
                     rel="noopener noreferrer">
                    Samplebox 🔗
                  </a>
                </h3>
                <p className="text-xs mb-2" style={{color: '#000000'}}>Desktop application for music production workflow (30+ active users)</p>
                <ul className="list-disc pl-5 text-sm" style={{color: '#000000'}}>
                  <li className="mb-1">Implemented stem separation and drum kit extraction</li>
                  <li className="mb-1">Created algorithmic variations of harmonic samples using music theory principles</li>
                  <li>Built with Electron.js, FastAPI, and Librosa</li>
                </ul>
              </div>

              <div className="win95-inset">
                <h3 className="text-sm font-bold mb-1" style={{color: '#000080'}}>
                  <a href="https://floaredor.vercel.app/left-brain"
                     className="hover:underline"
                     style={{color: '#000080'}}
                     target="_blank"
                     rel="noopener noreferrer">
                    Text-to-Synthesizer System 🔗
                  </a>
                </h3>
                <p className="text-xs mb-2" style={{color: '#000000'}}>Natural language control of synthesizer parameters</p>
                <ul className="list-disc pl-5 text-sm" style={{color: '#000000'}}>
                  <li className="mb-1">Parameter mapping using LAION-CLAP embeddings</li>
                  <li className="mb-1">PyTorch implementation with differential evolution</li>
                  <li>STFT-based timbre matching capabilities</li>
                </ul>
              </div>

              <div className="win95-inset">
                <h3 className="text-sm font-bold mb-1" style={{color: '#000080'}}>
                  <a href="https://floaredor.vercel.app/left-brain/21"
                     className="hover:underline"
                     style={{color: '#000080'}}
                     target="_blank"
                     rel="noopener noreferrer">
                    Audio-Visual Integration Projects 🔗
                  </a>
                </h3>
                <ul className="list-disc pl-5 text-sm" style={{color: '#000000'}}>
                  <li className="mb-1">CUDA-accelerated ray tracer with FFT-based audio reactivity</li>
                  <li className="mb-1">Audio-reactive GAN art installations</li>
                  <li>Boids simulation with audio parameter mapping</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Music Compositions & Media */}
        <section className="mb-4">
          <div className="win95-window">
            <div className="win95-title-bar">
              <span>🎼 Music Compositions & Media</span>
            </div>
            <div className="win95-content">
              <div className="win95-inset">
                <div className="mb-4">
                  <p className="text-sm" style={{color: '#000000'}}>
                    I make electronic music inspired by artists like Flume, Kasbo, Petit Biscuit, and Tourist.
                    I spend a lot of time on sound design - granular synthesis is my go-to for making atmospheric
                    textures and pads. I&apos;m always trying to make sounds that are interesting and pleasing at the same time.
                  </p>
                </div>
                <h3 className="text-sm font-bold mb-3" style={{color: '#000080'}}>Featured Works</h3>
                <div className="space-y-4">
                  <div style={{border: '2px solid #000000'}}>
                    <iframe
                      width="100%"
                      height="300"
                      scrolling="no"
                      frameBorder="no"
                      allow="autoplay"
                      src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1197833611&color=%23040406&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
                    ></iframe>
                  </div>
                  <div style={{border: '2px solid #000000'}}>
                    <iframe
                      width="100%"
                      height="166"
                      scrolling="no"
                      frameBorder="no"
                      allow="autoplay"
                      src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1212479563&color=%23040406&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"
                    ></iframe>
                  </div>
                  <div className="mt-4 space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <InstagramEmbed url="https://www.instagram.com/p/CXgLeW5hTUT/" />
                      <InstagramEmbed url="https://www.instagram.com/reel/CmFQdRwsQAf/" />
                    </div>
                    <h4 className="text-sm font-bold mt-4 mb-2" style={{color: '#000080'}}>GAN Art Showcase + DJ set (5th and 6th page)</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <InstagramEmbed url="https://www.instagram.com/p/Cpk381-BgGM/" />
                      <InstagramEmbed url="https://www.instagram.com/tv/CluZbX5ANTj" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Research Experience */}
        <section className="mb-4">
          <div className="win95-window">
            <div className="win95-title-bar">
              <span>🔬 Research Experience</span>
            </div>
            <div className="win95-content">
              <div className="win95-inset">
                <p className="text-sm leading-relaxed mb-4" style={{color: '#000000'}}>
                  I am fortunate to have worked with Professor Prafulla Kalapatapu and Dr. Arya Kumar Bhattacharya at Mahindra École Centrale, and Dr. Xiao Fan at the University of Florida.
                </p>
                <div className="mb-4">
                  <h3 className="text-sm font-bold mb-1" style={{color: '#000080'}}>Michigan State University Research <span style={{color: '#000000', fontWeight: 'normal'}}>(Sept 2024 – Present)</span></h3>
                  <p className="text-xs mb-2" style={{color: '#000000'}}>Working on emotional music transitions and therapeutic music generation</p>
                  <ul className="list-disc pl-5 text-sm" style={{color: '#000000'}}>
                    <li className="mb-1">Developing therapeutic music generation systems using the iso principle for mood transition</li>
                    <li className="mb-1">Investigating multi-objective optimization for raga-based music generation</li>
                    <li>Collaboration with Dr. Kalyanmoy Dev and Prof. Arya Kumar</li>
                  </ul>
                </div>
                <div className="mb-4">
                  <h3 className="text-sm font-bold mb-1" style={{color: '#000080'}}>Mahindra École Centrale Research <span style={{color: '#000000', fontWeight: 'normal'}}>(Dec 2022 – Jan 2025)</span></h3>
                  <p className="text-xs mb-2" style={{color: '#000000'}}>IEEE WCCI 2024 (CEC) Publication</p>
                  <ul className="list-disc pl-5 text-sm" style={{color: '#000000'}}>
                    <li className="mb-1">Published research on emotion-targeted music generation using FFT, differential evolution, F C-means, self-organizing maps achieving 85% accuracy in classification</li>
                    <li className="mb-1">Implemented ALI-GAN model with t-SNE and PCA for clustering analysis on 1000+ samples</li>
                    <li className="mb-1">Built MIR pipelines extracting 100+ features</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-bold mb-1" style={{color: '#000080'}}>Fan Lab Research - Genomic ML <span style={{color: '#000000', fontWeight: 'normal'}}>(Feb 2024 – Jun 2024)</span></h3>
                  <p className="text-xs mb-2" style={{color: '#000000'}}>Research on genomic foundational models and RNA-protein interactions</p>
                  <ul className="list-disc pl-5 text-sm" style={{color: '#000000'}}>
                    <li className="mb-1">Applied genomic models for rare disease prediction using transformer architectures, processing 15,000+ DNA sequences</li>
                    <li>Developed multi-layer perceptron models using protein embeddings (ESM3) analyzing RNA-binding proteins</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Publications */}
        <section className="mb-4">
          <div className="win95-window">
            <div className="win95-title-bar">
              <span>📚 Publications</span>
            </div>
            <div className="win95-content">
              <div className="win95-inset">
                <div className="space-y-3">
                  <div>
                    <h3 className="text-sm font-bold" style={{color: '#000080'}}>
                      &quot;From clicks to insights: analysing online customer reviews for handicraft products&quot;
                    </h3>
                    <p className="text-xs" style={{color: '#000000'}}>Technology Analysis & Strategic Management (2025)</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold" style={{color: '#000080'}}>
                      &quot;Emotion Aligned Music Composition from Sound Fundamentals Using Differential Evolution&quot;
                    </h3>
                    <p className="text-xs" style={{color: '#000000'}}>IEEE Congress on Evolutionary Computation (CEC 2024)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Work Experience */}
        <section className="mb-4">
          <div className="win95-window">
            <div className="win95-title-bar">
              <span>💼 Work Experience</span>
            </div>
            <div className="win95-content space-y-3">
              <div className="win95-inset">
                <h3 className="text-sm font-bold mb-1" style={{color: '#000080'}}>
                  <a href="https://www.instagram.com/tapsta.app/"
                     className="hover:underline"
                     style={{color: '#000080'}}
                     target="_blank"
                     rel="noopener noreferrer">
                    Tapsta 🔗 <span style={{color: '#000000', fontWeight: 'normal'}}>(Jul 2024 – Jun 2025)</span>
                  </a>
                </h3>
                <p className="text-xs mb-2" style={{color: '#000000'}}>Founding Software Engineer</p>
                <ul className="list-disc pl-5 text-sm" style={{color: '#000000'}}>
                  <li className="mb-1">Architected end-to-end full-stack social rewards mobile application using React, React Native, FastAPI, and PostgreSQL</li>
                  <li className="mb-1">Designed database architecture with 25+ schemas and optimized client-side operations with caching and debouncing, achieving 30% faster response times</li>
                  <li className="mb-1">Worked with product team to redesign onboarding flow, driving 40% user retention</li>
                  <li className="mb-1">Orchestrated Plaid API integration alongside REST API creation, establishing secure bank connectivity and enabling automated cashback processing, plus ACH transfers for over 1,500 application users</li>
                  <li className="mb-1">Made containerized CI/CD pipeline with Docker, AWS, and ArgoCD that reduced deployment time by 70%</li>
                  <li className="mb-1">Led development team of 3 SDE interns, establishing code review processes that contributed to 30% faster feature delivery</li>
                  <li>Built a semantic people search engine for alumni networks using embedding-based similarity using LangGraph</li>
                </ul>
              </div>

              <div className="win95-inset">
                <h3 className="text-sm font-bold mb-1" style={{color: '#000080'}}>
                  <a href="https://garden.finance"
                     className="hover:underline"
                     style={{color: '#000080'}}
                     target="_blank"
                     rel="noopener noreferrer">
                    Catalog.fi 🔗
                  </a>
                </h3>
                <p className="text-xs mb-2" style={{color: '#000000'}}>Software Development Engineer Intern</p>
                <ul className="list-disc pl-5 text-sm" style={{color: '#000000'}}>
                  <li className="mb-1">Taught LLMs to use APIs (incl. function calling), fine-tuning LLaMA/BERT in PyTorch to build a natural-language interface for payroll, achieving 90% natural language to API accuracy and reducing API integration time by 25%</li>
                  <li className="mb-1">Implemented full-stack crypto analytics platform using React, FastAPI, Postgres, Pandas, and Golang with real-time monitoring dashboard and a microservice for a leaderboard system for garden.finance, boosting user engagement by 30%</li>
                  <li className="mb-1">Improved backend performance using Go and PostgreSQL optimizations, supporting $150M+ trading volume over 30 days with 20% faster queries on garden.finance</li>
                </ul>
              </div>
            </div>
          </div>
        </section>


        {/* Other Technical Projects */}
        <section className="mb-4">
          <div className="win95-window">
            <div className="win95-title-bar">
              <span>⚙️ Other Technical Projects</span>
            </div>
            <div className="win95-content">
              <div className="grid md:grid-cols-2 gap-3">
                <div className="win95-inset">
                  <h3 className="text-sm font-bold mb-1" style={{color: '#000080'}}>
                    <a href="https://floaredor.vercel.app/left-brain"
                       className="hover:underline"
                       style={{color: '#000080'}}
                       target="_blank"
                       rel="noopener noreferrer">
                      Project RECON 🔗
                    </a>
                  </h3>
                  <p className="text-xs mb-2" style={{color: '#000000'}}>8-pi compute cluster serving 400+ students</p>
                  <ul className="list-disc pl-5 text-sm" style={{color: '#000000'}}>
                    <li className="mb-1">Implemented VLANs and distributed storage</li>
                    <li className="mb-1">$2000 funded university infrastructure project</li>
                    <li>GlusterFS and OpenMPI implementation</li>
                  </ul>
                </div>
                <div className="win95-inset">
                  <h3 className="text-sm font-bold mb-1" style={{color: '#000080'}}>
                    <a href="https://floaredor.vercel.app/left-brain"
                       className="hover:underline"
                       style={{color: '#000080'}}
                       target="_blank"
                       rel="noopener noreferrer">
                      Co-Write 🔗
                    </a>
                  </h3>
                  <p className="text-xs mb-2" style={{color: '#000000'}}>AI-powered learning platform with academic integrity focus</p>
                  <ul className="list-disc pl-5 text-sm" style={{color: '#000000'}}>
                    <li className="mb-1">Custom RAG model implementation</li>
                    <li className="mb-1">Next.js, FastAPI, and LangChain stack</li>
                    <li>Professor-defined AI assistance boundaries</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Leadership */}
        <section className="mb-4">
          <div className="win95-window">
            <div className="win95-title-bar">
              <span>👔 Leadership</span>
            </div>
            <div className="win95-content">
              <div className="win95-inset">
                <div>
                  <h3 className="text-sm font-bold mb-1" style={{color: '#000080'}}>
                    President, Enigma, the Computer Science Club <span style={{color: '#000000', fontWeight: 'normal'}}>(2021-2023)</span>
                  </h3>
                  <ul className="list-disc pl-5 text-sm" style={{color: '#000000'}}>
                    <li className="mb-1">Conducted technical workshops on Gamedev, ML, Linux, heading outreach initiatives increasing the club membership by 40%, reaching over 2000 students</li>
                    <li>Collabs Ubisoft, NVIDIA</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Achievements */}
        <section className="mb-4">
          <div className="win95-window">
            <div className="win95-title-bar">
              <span>🏆 Notable Achievements</span>
            </div>
            <div className="win95-content">
              <div className="win95-inset">
                <div className="space-y-3">
                  <div>
                    <h3 className="text-sm font-bold mb-1" style={{color: '#000080'}}>
                      <a href="https://floaredor.vercel.app/left-brain"
                         className="hover:underline"
                         style={{color: '#000080'}}
                         target="_blank"
                         rel="noopener noreferrer">
                        WaffleHacks 2024 - First Place 🔗 <span style={{color: '#000000', fontWeight: 'normal'}}>(2024)</span>
                      </a>
                    </h3>
                    <p className="text-xs mb-1" style={{color: '#000000'}}>320+ participants</p>
                    <ul className="list-disc pl-5 text-sm" style={{color: '#000000'}}>
                      <li>Built Chrome extension with RAG system for personalized learning in 24 hours</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold mb-1" style={{color: '#000080'}}>
                      <a href="https://floaredor.vercel.app/left-brain"
                         className="hover:underline"
                         style={{color: '#000080'}}
                         target="_blank"
                         rel="noopener noreferrer">
                        Aether Game Jam 2024 - First Place 🔗 <span style={{color: '#000000', fontWeight: 'normal'}}>(2024)</span>
                      </a>
                    </h3>
                    <ul className="list-disc pl-5 text-sm" style={{color: '#000000'}}>
                      <li className="mb-1">Developed top-down horror game using Godot engine in 48 hrs</li>
                      <li className="mb-1">Implemented A* pathfinding algorithm and procedural map generation</li>
                      <li>Created custom sound design and atmospheric effects</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold mb-1" style={{color: '#000080'}}>
                      <a href="https://floaredor.vercel.app/left-brain"
                         className="hover:underline"
                         style={{color: '#000080'}}
                         target="_blank"
                         rel="noopener noreferrer">
                        Noderunner Hackathon - First Place 🔗
                      </a>
                    </h3>
                    <p className="text-xs mb-1" style={{color: '#000000'}}>50+ participants</p>
                    <ul className="list-disc pl-5 text-sm" style={{color: '#000000'}}>
                      <li>Solo implementation of distributed Raft consensus protocol in 18 hrs</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold mb-1" style={{color: '#000080'}}>
                      <a href="https://floaredor.vercel.app/left-brain"
                         className="hover:underline"
                         style={{color: '#000080'}}
                         target="_blank"
                         rel="noopener noreferrer">
                        Talentmapp Hack4Hire 2023 - First Place 🔗 <span style={{color: '#000000', fontWeight: 'normal'}}>(2023)</span>
                      </a>
                    </h3>
                    <p className="text-xs mb-1" style={{color: '#000000'}}>300+ participants</p>
                    <ul className="list-disc pl-5 text-sm" style={{color: '#000000'}}>
                      <li className="mb-1">Built full-stack task-tracking application with LLM integration</li>
                      <li className="mb-1">Tech stack: MongoDB, Flask, React.js, ChatGPT</li>
                      <li className="mb-1">Implemented secure backend and intelligent task suggestions</li>
                      <li>Deployed the solution in 8 hours</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold mb-1" style={{color: '#000080'}}>Finalist, NVIDIA SAP</h3>
                    <ul className="list-disc pl-5 text-sm" style={{color: '#000000'}}>
                      <li>Finalist in the NVIDIA Student Ambassador Program</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* Contact */}
        <section>
          <div className="win95-window">
            <div className="win95-title-bar">
              <span>📧 Connect</span>
            </div>
            <div className="win95-content">
              <div className="win95-inset">
                <div className="flex flex-wrap gap-3">
                  <a href="https://linkedin.com/in/sai-ravi-teja-gangavarapu"
                     className="win95-button text-sm"
                     style={{color: '#000000'}}
                     target="_blank"
                     rel="noopener noreferrer">
                    LinkedIn 🔗
                  </a>
                  <a href="https://soundcloud.com/raven-714331711/popular-tracks"
                     className="win95-button text-sm"
                     style={{color: '#000000'}}
                     target="_blank"
                     rel="noopener noreferrer">
                    SoundCloud 🔗
                  </a>
                  <a href="https://github.com/floaredor"
                     className="win95-button text-sm"
                     style={{color: '#000000'}}
                     target="_blank"
                     rel="noopener noreferrer">
                    GitHub 🔗
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Windows 95 Taskbar */}
      <div className="win95-taskbar">
        <div className="win95-start-button">
          <span style={{fontSize: '14px'}}>🪟</span>
          <span style={{fontSize: '11px'}}>Start</span>
        </div>
        <div className="flex-1 ml-2 text-xs flex items-center" style={{color: '#000000'}}>
          <div className="win95-button px-3 py-1">
            📋 Portfolio - Sai Ravi Teja Gangavarapu
          </div>
        </div>
        <div className="win95-button px-2 text-xs flex items-center gap-1" style={{minWidth: '70px', justifyContent: 'center'}}>
          <span>🕐</span>
          <span>{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>

      </div>
      </div>
  );
}