"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, FileText, Mail } from "lucide-react";
import { portfolioData } from "./portfolio";
import Image from "next/image";

export default function Home() {
  const sectionKeys = Object.keys(portfolioData.sections);
  const [activeSection, setActiveSection] = useState(sectionKeys[0]);

  return (
    <div className="flex h-screen bg-app-bg text-text-main overflow-hidden">
      {/* Left Sidebar */}
      <aside className="w-80 bg-sidebar-white border-r border-slate-200 flex flex-col z-30 shadow-sm">
        <div className="flex flex-col items-center py-12 px-8 border-b border-slate-50">
          <div className="relative w-28 h-28 rounded-full mb-6 border-4 border-app-bg shadow-sm overflow-hidden bg-slate-100">
            <Image
              src="/dp.jpg"
              alt="Muhammad Saleem"
              fill
              className="object-cover"
              priority
            />
          </div>

          <h1 className="text-xl font-bold text-heading-dark text-center tracking-tight">
            {portfolioData.profile.name}
          </h1>
          <div className="flex items-center gap-2 mt-2 text-slate-500 text-xs font-medium">
            <Mail size={12} className="text-accent-blue" />
            <span>{portfolioData.profile.email}</span>
          </div>

          <a
            href="/CV.pdf"
            target="_blank"
            className="mt-6 flex items-center gap-2 px-6 py-2.5 bg-heading-dark text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition-all shadow-sm active:scale-95"
          >
            <FileText size={14} />
            View CV
          </a>
        </div>

        {/* Sidebar Section Label */}
        <div className="mt-8 px-8">
          <h3 className="text-[14px] text-slate-600 font-bold uppercase tracking-[0.15em] mb-4">
            Achievements
          </h3>
        </div>

        <nav className="flex flex-col gap-1 px-4 overflow-y-auto">
          {sectionKeys.map((section) => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              // focus:outline-none and focus:ring-0 removes the browser's click-border
              className={`flex items-center justify-between text-left px-5 py-3.5 rounded-xl transition-all duration-200 text-sm font-semibold focus:outline-none focus:ring-0
                ${
                  activeSection === section
                    ? "bg-slate-100 text-accent-blue shadow-xs"
                    : "text-slate-500 hover:bg-slate-50 hover:text-heading-dark"
                }`}
            >
              {section}
              {activeSection === section && <ChevronRight size={14} />}
            </button>
          ))}
        </nav>

        <div className="mt-auto p-8 text-[10px] text-slate-400 text-center uppercase tracking-widest font-bold">
          © 2026 Research Portfolio
        </div>
      </aside>

      {/* Right Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-app-bg relative">
        <header className="sticky top-0 z-20 bg-app-bg/80 backdrop-blur-md px-12 lg:px-24 py-7 border-b border-slate-200/50">
          <div className="max-w-3xl mx-auto w-full">
            <h2 className="text-2xl font-extrabold tracking-tight text-heading-dark">
              {activeSection}
            </h2>
            <div className="h-1 w-12 bg-accent-blue mt-4 rounded-full"></div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-12 lg:px-24 py-12">
          <div className="max-w-3xl mx-auto w-full">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-0"
            >
              {portfolioData.sections[activeSection]?.map((item, idx) => (
                <article
                  key={idx}
                  className="relative pl-10 pb-12 group last:pb-0"
                >
                  <div className="absolute left-[7px] top-2 bottom-0 w-[2px] bg-slate-200 group-last:hidden"></div>
                  <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-white border-2 border-slate-300 group-hover:border-accent-blue transition-colors z-10 shadow-sm"></div>

                  <div className="flex flex-col gap-4">
                    <h3 className="text-xl font-bold text-heading-dark leading-tight group-hover:text-accent-blue transition-colors">
                      {item.title}
                    </h3>

                    <div className="space-y-2.5">
                      {Object.entries(item).map(([key, value]) => {
                        if (key === "title" || !value) return null;

                        return (
                          <div
                            key={key}
                            className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 text-sm leading-relaxed"
                          >
                            <span className="font-bold text-slate-800 sm:min-w-[110px] shrink-0">
                              {key}:
                            </span>

                            <div className="flex flex-wrap gap-2">
                              {Array.isArray(value) ? (
                                value.map((link, lIdx) => (
                                  <React.Fragment key={lIdx}>
                                    <a
                                      href={link.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-accent-blue font-semibold underline decoration-transparent hover:decoration-accent-blue transition-all duration-200 hover:text-blue-800"
                                    >
                                      {link.label}
                                    </a>
                                    {lIdx < value.length - 1 && (
                                      <span className="text-slate-300">|</span>
                                    )}
                                  </React.Fragment>
                                ))
                              ) : (
                                <span className="text-text-main font-medium">
                                  {value}
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </article>
              ))}
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
