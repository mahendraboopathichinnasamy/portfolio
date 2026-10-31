'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  ArrowRight,
  Layers,
} from 'lucide-react';
import { projectsData } from '@/config/portfolioData';
import { Project } from '@/types/portfolio';
import ProjectModal from './ProjectModal';

interface ProjectsProps {
  onOpenContact: () => void;
}

function ProjectCard({
  project,
  index,
  onOpenDetails,
}: {
  project: Project;
  index: number;
  onOpenDetails: (project: Project) => void;
}) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{
        y: -10,
        transition: { duration: 0.25, ease: [0.2, 0.8, 0.2, 1] },
      }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="glass-card p-6 rounded-2xl flex flex-col justify-between group overflow-hidden border border-[#00E5FF]/20 hover:border-[#00E5FF]/60 hover:shadow-[0_20px_45px_rgba(0,0,0,0.8),0_0_30px_rgba(0,229,255,0.25)] focus-within:ring-2 focus-within:ring-[#00E5FF] w-[85vw] sm:w-[380px] md:w-[420px] shrink-0 snap-start select-none transition-colors transition-shadow duration-300"
    >
      <div>
        {/* Thumbnail with Skeleton Loader and hover zoom */}
        <div
          onClick={() => onOpenDetails(project)}
          className="relative w-full aspect-video rounded-xl overflow-hidden mb-4 cursor-pointer border border-[#00E5FF]/20 group-hover:border-[#00E5FF]/60 transition-all duration-300 bg-slate-900"
        >
          {/* Skeleton placeholder before image is loaded */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-slate-800 animate-pulse flex items-center justify-center">
              <span className="text-xs text-slate-500 font-mono">Loading Preview...</span>
            </div>
          )}

          <Image
            src={project.image}
            alt={project.title}
            fill
            draggable={false}
            className={`object-cover group-hover:scale-105 transition-all duration-500 pointer-events-none ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            sizes="(max-width: 768px) 85vw, 420px"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#050B14] via-transparent to-transparent opacity-75 group-hover:opacity-40 transition-opacity" />

          {/* Floating Category Badge */}
          <div className="absolute top-3 left-3 px-3 py-1 rounded-md bg-[#050B14]/85 border border-[#00E5FF]/30 backdrop-blur-md text-[11px] font-semibold text-[#00E5FF] flex items-center gap-1.5 shadow-sm">
            <Layers className="w-3 h-3" />
            <span>{project.category}</span>
          </div>

          {/* View Details Hover Overlay Action */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/45 backdrop-blur-xs">
            <span className="px-4 py-2 rounded-full bg-[#00E5FF] text-[#03070E] text-xs font-bold shadow-[0_0_20px_#00E5FF] flex items-center gap-1.5 transform scale-95 group-hover:scale-100 transition-transform">
              <span>Inspect Architecture</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

        {/* Title & Description */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3
            onClick={() => onOpenDetails(project)}
            className="text-lg font-bold text-white group-hover:text-[#00E5FF] transition-colors cursor-pointer line-clamp-1"
          >
            {project.title}
          </h3>
          <button
            onClick={() => onOpenDetails(project)}
            aria-label={`Open details for ${project.title}`}
            className="w-8 h-8 rounded-lg bg-[#00E5FF]/10 border border-[#00E5FF]/25 flex items-center justify-center text-[#00E5FF] group-hover:bg-[#00E5FF] group-hover:text-[#03070E] transition-all duration-200 shrink-0 focus:outline-none focus:ring-2 focus:ring-[#00E5FF] cursor-pointer"
          >
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3 line-clamp-2">
          {project.description}
        </p>

        {/* Metrics Pill */}
        <div className="mb-4">
          <span className="text-[11px] font-mono text-[#22D3EE] bg-[#00E5FF]/5 border border-[#00E5FF]/20 px-3 py-1 rounded-md inline-block line-clamp-1">
            {project.metrics}
          </span>
        </div>
      </div>

      {/* Tech Stack Tags & Action Button */}
      <div className="pt-4 border-t border-[#00E5FF]/10 flex items-center justify-between gap-2">
        <div className="flex flex-wrap gap-1.5">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-white/5 border border-white/10 text-slate-300"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="px-2 py-1 rounded-md text-[11px] font-medium text-slate-400">
              +{project.tags.length - 3}
            </span>
          )}
        </div>

        <button
          onClick={() => onOpenDetails(project)}
          className="text-xs font-bold text-[#00E5FF] hover:underline flex items-center gap-1 cursor-pointer shrink-0"
        >
          <span>Read Details</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.article>
  );
}

export default function Projects({ onOpenContact }: ProjectsProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isGrabbing, setIsGrabbing] = useState(false);

  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const hasMovedRef = useRef(false);

  const updateScrollProgress = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      const maxScroll = scrollWidth - clientWidth;
      if (maxScroll > 0) {
        setScrollProgress((scrollLeft / maxScroll) * 100);
      }
    }
  };

  // Smooth mouse wheel to horizontal scroll conversion with seamless page scroll handoff
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const onWheel = (e: WheelEvent) => {
      // If user is scrolling vertically with the mouse wheel
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        const maxScroll = container.scrollWidth - container.clientWidth;
        if (maxScroll <= 0) return;

        // Scrolling DOWN / RIGHT
        if (e.deltaY > 0) {
          const remainingHorizontal = maxScroll - container.scrollLeft;

          // If already at or near the end (within 10px), allow normal vertical page scroll
          if (remainingHorizontal <= 10) {
            return;
          }

          e.preventDefault();
          if (e.deltaY >= remainingHorizontal) {
            container.scrollLeft = maxScroll;
            const leftover = e.deltaY - remainingHorizontal;
            if (leftover > 0) {
              window.scrollBy({ top: leftover, behavior: 'auto' });
            }
          } else {
            container.scrollLeft += e.deltaY;
          }
          updateScrollProgress();
        }
        // Scrolling UP / LEFT
        else if (e.deltaY < 0) {
          const remainingHorizontal = container.scrollLeft;

          // If already at or near the start (within 10px), allow normal vertical page scroll
          if (remainingHorizontal <= 10) {
            return;
          }

          e.preventDefault();
          const absDelta = Math.abs(e.deltaY);
          if (absDelta >= remainingHorizontal) {
            container.scrollLeft = 0;
            const leftover = absDelta - remainingHorizontal;
            if (leftover > 0) {
              window.scrollBy({ top: -leftover, behavior: 'auto' });
            }
          } else {
            container.scrollLeft += e.deltaY;
          }
          updateScrollProgress();
        }
      }
    };

    container.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('resize', updateScrollProgress);
    updateScrollProgress();

    return () => {
      container.removeEventListener('wheel', onWheel);
      window.removeEventListener('resize', updateScrollProgress);
    };
  }, []);

  // Mouse Drag-to-Scroll handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollContainerRef.current) return;
    isDraggingRef.current = true;
    hasMovedRef.current = false;
    startXRef.current = e.pageX - scrollContainerRef.current.offsetLeft;
    scrollLeftRef.current = scrollContainerRef.current.scrollLeft;
    setIsGrabbing(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || !scrollContainerRef.current) return;
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    if (Math.abs(walk) > 5) {
      hasMovedRef.current = true;
    }
    scrollContainerRef.current.scrollLeft = scrollLeftRef.current - walk;
    updateScrollProgress();
  };

  const handleMouseUpOrLeave = () => {
    isDraggingRef.current = false;
    setIsGrabbing(false);
  };

  const openProjectDetails = (project: Project) => {
    if (hasMovedRef.current) {
      // User was dragging to scroll, don't trigger modal opening
      return;
    }
    setSelectedProject(project);
    setModalOpen(true);
  };

  return (
    <section id="projects" className="relative py-24 px-4 md:px-8 max-w-7xl mx-auto scroll-mt-24">
      {/* Background radial glow */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[#00E5FF]/8 blur-[140px] rounded-full pointer-events-none -z-10" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Selected{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-[#22D3EE]">
              Projects
            </span>
          </h2>
        </div>

        {/* Controls: "All Projects" Pill Only (Horizontal scroll buttons removed) */}
        <div className="flex items-center gap-3 self-start md:self-end">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-[#03070E] bg-gradient-to-r from-[#00E5FF] to-[#22D3EE] shadow-[0_0_18px_rgba(0,229,255,0.4)]">
            <span>All Projects</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-[#03070E]/20 text-[#03070E]">
              {projectsData.length}
            </span>
          </div>
        </div>
      </div>

      {/* Horizontal Scrollable Projects Container with Mouse Wheel & Drag-to-Scroll */}
      <div
        ref={scrollContainerRef}
        onScroll={updateScrollProgress}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        className={`flex gap-6 overflow-x-auto pb-8 pt-5 select-none focus:outline-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
          isGrabbing ? 'cursor-grabbing' : 'cursor-grab'
        } ${isGrabbing ? '' : 'snap-x snap-proximity'}`}
      >
        {projectsData.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            onOpenDetails={openProjectDetails}
          />
        ))}
      </div>

      {/* Cyber Scroll Indicator & Progress Bar */}
      <div className="mt-2 px-1 flex items-center justify-between gap-4 text-xs text-slate-400">
        <div className="flex items-center gap-2 font-mono text-[11px] text-slate-400">
          <span className="w-2 h-2 rounded-full bg-[#00E5FF] shadow-[0_0_8px_#00E5FF]" />
          <span>Scroll with mouse wheel or drag horizontally</span>
        </div>
        <div className="flex-1 max-w-[200px] h-1.5 bg-[#081826] border border-[#00E5FF]/25 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#00E5FF] to-[#22D3EE] rounded-full transition-all duration-100 shadow-[0_0_10px_#00E5FF]"
            style={{ width: `${Math.max(20, Math.min(100, scrollProgress))}%` }}
          />
        </div>
      </div>

      {/* Interactive Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onOpenContact={onOpenContact}
      />
    </section>
  );
}
