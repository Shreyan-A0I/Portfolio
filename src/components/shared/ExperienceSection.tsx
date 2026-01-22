"use client";

import { motion } from "framer-motion";
import { experience, skills } from "@/lib/data";
import { Badge } from "@/components/ui/badge";

export const ExperienceSection = () => {
  return (
    <section id="experience" className="relative py-24 md:py-32">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#C41230]/5 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm font-mono uppercase tracking-wider text-[#C41230] mb-4">
            Professional Journey
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Experience & Skills
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Building expertise at the intersection of AI, biology, and engineering
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Experience */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-3">
              <span className="w-10 h-10 rounded-lg bg-[#C41230]/20 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-[#C41230]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </span>
              Experience
            </h3>

            {experience.map((exp, index) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass glass-hover rounded-xl p-6 border border-[#C41230]/20"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                  <div>
                    <h4 className="text-lg font-bold text-foreground">{exp.role}</h4>
                    <p className="text-[#C41230] font-medium">{exp.company}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground font-mono">
                      {exp.startDate} – {exp.endDate}
                    </p>
                    <p className="text-sm text-muted-foreground">{exp.location}</p>
                  </div>
                </div>

                <ul className="space-y-2">
                  {exp.highlights.map((highlight, i) => (
                    <li
                      key={i}
                      className="text-sm text-muted-foreground flex items-start gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C41230] mt-2 flex-shrink-0" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>

          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-3">
              <span className="w-10 h-10 rounded-lg bg-[#00D4AA]/20 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-[#00D4AA]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </span>
              Technical Arsenal
            </h3>

            <div className="space-y-6">
              {skills.map((skillGroup, index) => (
                <motion.div
                  key={skillGroup.category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="glass rounded-xl p-5 border border-white/5"
                >
                  <h4 className="text-sm font-mono uppercase tracking-wider text-[#00D4AA] mb-3">
                    {skillGroup.category}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((skill) => (
                      <Badge
                        key={skill}
                        variant="outline"
                        className="bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10 hover:text-foreground transition-colors"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* AWS Certification */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-6 glass rounded-xl p-5 border border-[#F59E0B]/20"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-[#F59E0B]/20 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-[#F59E0B]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-foreground">AWS Certified Cloud Practitioner</h4>
                  <p className="text-sm text-muted-foreground">
                    Proficient in AWS services, cloud architecture, security, and cost management
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
