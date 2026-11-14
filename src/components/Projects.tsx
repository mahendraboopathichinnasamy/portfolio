'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
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
      data-swarm-target
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{
        y: -8,
        transition: { duration: 0.25, ease: [0.2, 0.8, 0.2, 1] },
      }}
      transition={{ duration: 0.45, delay: (index % projectsData.length) * 0.08 }}
      className="relative p-6 rounded-2xl flex flex-col justify-between group overflow-hidden border border-[#00E5FF]/25 bg-gradient-to-b from-[#081826]/95 via-[#061422]/95 to-[#040C16]/95 backdrop-blur-2xl shadow-[0_16px_40px_rgba(0,0,0,0.7),0_0_20px_rgba(0,229,255,0.08)] hover:border-[#00E5FF]/70 hover:shadow-[0_24px_65px_rgba(0,0,0,0.9),0_0_40px_rgba(0,229,255,0.3)] focus-within:ring-2 focus-within:ring-[#00E5FF] w-[85vw] sm:w-[380px] md:w-[420px] shrink-0 select-none transition-all duration-300"
    >
      {/* Top Specular Rim Lighting Glare */}
      <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#00E5FF]/50 to-transparent pointer-events-none" />

      <div>
        {/* Thumbnail with Skeleton Loader and hover zoom */}
        <div
          onClick={() => onOpenDetails(project)}
          className="relative w-full aspect-video rounded-xl overflow-hidden mb-4 cursor-pointer border border-[#00E5FF]/20 group-hover:border-[#00E5FF]/60 transition-all duration-300 bg-slate-900 shadow-[0_8px_20px_rgba(0,0,0,0.5)]"
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
  const sectionRef = useRef<HTMLElement>(null);
  const [isGrabbing, setIsGrabbing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const [isInView, setIsInView] = useState(false);

  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const hasMovedRef = useRef(false);
  const interactionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const hasAutoScrolledDownRef = useRef(false);

  // 5 Featured Projects (Single non-looping list)
  const displayProjects = projectsData;

  // Pause auto-scroll temporarily when user manually scrolls or drags
  const pauseTemporarily = useCallback(() => {
    setIsUserInteracting(true);
    if (interactionTimeoutRef.current) clearTimeout(interactionTimeoutRef.current);
    interactionTimeoutRef.current = setTimeout(() => {
      setIsUserInteracting(false);
    }, 4000);
  }, []);

  // IntersectionObserver: start auto-scroll when user arrives at projects section
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        if (!entry.isIntersecting) {
          // Reset so auto-scroll can re-run when user comes back
          hasAutoScrolledDownRef.current = false;
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Smooth Auto-Scroll: Runs when user arrives, stops when projects are over, then scrolls down
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const container = scrollContainerRef.current;
    if (!container) return;

    let isRunning = true;
    const speed = 0.75; // ~45px/sec smooth continuous drift

    const step = (timestamp: number) => {
      if (!isRunning) return;

      const isPaused = isHovered || isUserInteracting || modalOpen || isGrabbing || !isInView;

      if (!isPaused && container) {
        if (lastTimeRef.current !== null) {
          const delta = timestamp - lastTimeRef.current;
          // Frame-rate normalized movement
          const pixelsToMove = speed * (delta / 16.67);

          if (container.scrollWidth > container.clientWidth) {
            const maxScroll = container.scrollWidth - container.clientWidth;

            if (container.scrollLeft >= maxScroll - 2) {
              // Projects completed! Stop the auto-scroll
              container.scrollLeft = maxScroll;
              isRunning = false;

              // Automatically scroll the page down to the next section
              if (!hasAutoScrolledDownRef.current) {
                hasAutoScrolledDownRef.current = true;
                setTimeout(() => {
                  const nextSection = document.getElementById('education');
                  if (nextSection) {
                    nextSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }, 800);
              }
              return;
            } else {
              container.scrollLeft += pixelsToMove;
            }
          }
        }
        lastTimeRef.current = timestamp;
      } else {
        lastTimeRef.current = null;
      }

      rafIdRef.current = requestAnimationFrame(step);
    };

    rafIdRef.current = requestAnimationFrame(step);

    return () => {
      isRunning = false;
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [isHovered, isUserInteracting, modalOpen, isGrabbing, isInView]);

  // Smooth mouse wheel conversion: scrolls horizontally through projects, then scrolls down
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const onWheel = (e: WheelEvent) => {
      pauseTemporarily();

      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        const maxScroll = container.scrollWidth - container.clientWidth;

        // If projects are completed and user scrolls down, allow page to scroll down naturally
        if (e.deltaY > 0 && container.scrollLeft >= maxScroll - 2) {
          return;
        }

        // If at start and user scrolls up, allow page to scroll up naturally
        if (e.deltaY < 0 && container.scrollLeft <= 2) {
          return;
        }

        e.preventDefault();
        container.scrollLeft += e.deltaY;
      }
    };

    container.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', onWheel);
    };
  }, [pauseTemporarily]);

  // Mouse Drag-to-Scroll handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    pauseTemporarily();
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
    const container = scrollContainerRef.current;
    container.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    isDraggingRef.current = false;
    setIsGrabbing(false);
  };

  const openProjectDetails = (project: Project) => {
    if (hasMovedRef.current) {
      return;
    }
    setSelectedProject(project);
    setModalOpen(true);
  };

  return (
    <section ref={sectionRef} id="projects" className="relative py-24 px-4 md:px-8 max-w-7xl mx-auto scroll-mt-24">
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

        {/* Clean Controls: All Projects Badge */}
        <div className="flex items-center gap-2.5 self-start md:self-end">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold text-[#03070E] bg-gradient-to-r from-[#00E5FF] to-[#22D3EE] shadow-[0_0_18px_rgba(0,229,255,0.4)]">
            <span>All Projects</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-[#03070E]/20 text-[#03070E]">
              {projectsData.length}
            </span>
          </div>
        </div>
      </div>

      {/* Horizontal Scrollable Projects Container */}
      <div
        ref={scrollContainerRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          handleMouseUpOrLeave();
        }}
        onTouchStart={pauseTemporarily}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        className={`flex gap-6 overflow-x-auto pb-8 pt-5 select-none focus:outline-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
          isGrabbing ? 'cursor-grabbing' : 'cursor-grab'
        }`}
      >
        {displayProjects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            onOpenDetails={openProjectDetails}
          />
        ))}
      </div>

      {/* Elevated Subtle Status Footer */}
      <div className="mt-3 px-1 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-2 font-mono text-[11px] text-slate-400">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-pulse shadow-[0_0_8px_#00E5FF]" />

        </div>
        <div className="hidden sm:flex items-center gap-1.5 font-mono text-[11px] text-slate-400">
          <span className="text-[#00E5FF]">{projectsData.length}</span> Featured Applications
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
