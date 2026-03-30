"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  FileCheck,
  ArrowLeft,
  Download,
  Maximize2,
  Minimize2,
  Mail,
} from "lucide-react";
import { portfolioData } from "../portfolio";
import Image from "next/image";
import Link from "next/link";

export default function DocumentsPage() {
  const docKeys = Object.keys(portfolioData.documents);
  const [activeDoc, setActiveDoc] = useState(docKeys[0]);
  const [isFullScreen, setIsFullScreen] = useState(false);

  return (
    <div className="flex h-screen bg-app-bg text-text-main overflow-hidden font-sans relative">
      {/* Sidebar - Animated Slide */}
      <AnimatePresence>
        {!isFullScreen && (
          <motion.aside
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="w-80 bg-sidebar-white border-r border-slate-200 flex flex-col z-30 shadow-sm"
          >
            <div className="flex flex-col items-center py-12 px-8 border-b border-slate-50">
              <div className="relative w-28 h-28 rounded-full mb-4 border-4 border-app-bg shadow-sm overflow-hidden bg-slate-100">
                <Image
                  src="/dp.jpg"
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              </div>
              <h1 className="text-xl font-bold text-heading-dark text-center tracking-tight">
                {portfolioData.profile.name}
              </h1>
              <div className="flex items-center gap-2 mt-2 text-slate-500 text-xs font-medium">
                <Mail size={12} className="text-accent-blue" />
                <span>{portfolioData.profile.email}</span>
              </div>

              <Link
                href="/"
                className="mt-6 flex items-center gap-2 px-4 py-2 text-slate-600 text-[10px] font-bold rounded-lg hover:bg-slate-50 transition-all border border-slate-200 uppercase tracking-widest"
              >
                <ArrowLeft size={12} /> Main Portfolio
              </Link>
            </div>

            <div className="flex-1 overflow-y-auto py-8 px-4">
              <div className="px-4">
                <h3 className="text-[14px] text-slate-600 font-bold uppercase tracking-[0.15em] mb-4 flex items-center gap-2">
                  <FileCheck size={12} /> Documents
                </h3>
              </div>

              <nav className="flex flex-col gap-1">
                {docKeys.map((key) => (
                  <button
                    key={key}
                    onClick={() => setActiveDoc(key)}
                    className={`flex items-center justify-between text-left px-5 py-3.5 rounded-xl transition-all duration-200 text-sm font-semibold focus:outline-none focus:ring-0
                      ${
                        activeDoc === key
                          ? "bg-slate-100 text-accent-blue shadow-xs"
                          : "text-slate-500 hover:bg-slate-50"
                      }`}
                  >
                    {key}
                    {activeDoc === key && <ChevronRight size={14} />}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6 text-[10px] text-slate-400 text-center uppercase tracking-widest font-bold border-t border-slate-50">
              © 2026 Documents Portal
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-app-bg relative h-full">
        {/* Floating Controller - MOVED TO LEFT SIDE */}
        <AnimatePresence>
          {isFullScreen && (
            <motion.div
              initial={{ y: -100, x: 0 }}
              animate={{ y: 24, x: 24 }} // Positions it 24px from top and left
              exit={{ y: -100, x: 24 }}
              className="absolute left-0 z-50 flex items-center gap-2 bg-slate-900/90 backdrop-blur-lg p-2 rounded-full shadow-2xl border-2 border-white/50"
            >
              <div className="flex gap-1 px-2">
                {docKeys.map((key) => (
                  <button
                    key={key}
                    onClick={() => setActiveDoc(key)}
                    className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all
                      ${activeDoc === key ? "bg-white text-slate-900 shadow-lg" : "text-white/50 hover:text-white"}`}
                  >
                    {key}
                  </button>
                ))}
              </div>
              <div className="w-[1px] h-4 bg-white/20 mx-1" />
              <button
                onClick={() => setIsFullScreen(false)}
                className="p-2 bg-red-500/20 text-red-400 rounded-full hover:bg-red-500 hover:text-white transition-all mr-1"
                title="Exit Full View"
              >
                <Minimize2 size={16} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Standard Header */}
        {!isFullScreen && (
          <header className="sticky top-0 z-20 bg-app-bg/80 backdrop-blur-md px-12 lg:px-12 py-3 pt-5 border-b border-slate-200/50 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight text-heading-dark">
                {activeDoc}
              </h2>
              <div className="h-1 w-8 bg-accent-blue mt-1.5 rounded-full"></div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsFullScreen(true)}
                className="flex items-center gap-2 px-4 py-2.5 text-slate-600 bg-white border border-slate-200 text-xs font-bold rounded-lg hover:bg-slate-50 shadow-sm transition-all active:scale-95"
              >
                <Maximize2 size={14} /> Full View
              </button>
              <a
                href={portfolioData.documents[activeDoc]}
                download
                className="flex items-center gap-2 px-4 py-2.5 bg-heading-dark text-white text-xs font-bold rounded-lg hover:bg-slate-800 transition-all shadow-sm active:scale-95"
              >
                <Download size={14} /> Save Copy
              </a>
            </div>
          </header>
        )}

        {/* PDF Frame */}
        <div
          className={`flex-1 transition-all duration-500 ease-in-out ${isFullScreen ? "p-0" : "p-4 lg:px-10 lg:py-4"}`}
        >
          <motion.div
            layout
            className={`h-full w-full bg-white transition-all duration-500 overflow-hidden
              ${
                isFullScreen
                  ? "rounded-none border-none"
                  : "rounded-2xl border border-slate-300"
              }`}
          >
            <iframe
              src={`${portfolioData.documents[activeDoc]}#view=FitH&scrollbar=1&toolbar=1`}
              className="w-full h-full border-none"
              title={activeDoc}
            />
          </motion.div>
        </div>
      </main>
    </div>
  );
}
