import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import {
  X,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Layers,
  Radio,
} from 'lucide-react';
import {
  GALLERY_IMAGES as _GALLERY_IMAGES,
  GALLERY_ACTIVITIES as _GALLERY_ACTIVITIES,
  IMAGE_SUBHEADINGS as _IMAGE_SUBHEADINGS,
} from '../siteData.js';

interface GalleryImage {
  category: string;
  activityLabel: string;
  src: string;
  subheading?: string;
}

interface GalleryActivity {
  folder: string;
  label: string;
  subtitle?: string;
  sortOrder: number;
}

interface TimelineItem {
  folder: string;
  label: string;
  subtitle?: string;
}

const GALLERY_IMAGES = _GALLERY_IMAGES as GalleryImage[];
const GALLERY_ACTIVITIES = (_GALLERY_ACTIVITIES ?? []) as GalleryActivity[];
const IMAGE_SUBHEADINGS = (_IMAGE_SUBHEADINGS ?? {}) as Record<string, string>;

function getSubheading(img: GalleryImage): string | undefined {
  if (img.subheading) return img.subheading;
  const filename = img.src.split('/').pop() ?? '';
  const relative = img.src.replace(/^\/gallery\//, '');
  return (
    IMAGE_SUBHEADINGS[img.src] ??
    IMAGE_SUBHEADINGS[relative] ??
    IMAGE_SUBHEADINGS[filename] ??
    undefined
  );
}

/* ── Laser line draw animation ── */
const lineDraw: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1.0, ease: 'easeOut', delay: 0.2 },
  },
};

/* ── Section header (laser lines + tracking dots) ── */
function SectionHeader({ label }: { label: string }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className="flex items-center justify-center w-full mb-10"
    >
      <div className="flex items-center flex-1">
        <motion.div
          variants={lineDraw}
          className="flex-1 h-px origin-right"
          style={{ background: 'linear-gradient(to left, rgba(0,212,255,0.7), transparent)' }}
        />
        <div
          className="w-1.5 h-1.5 rounded-full bg-white flex-shrink-0"
          style={{ boxShadow: '0 0 6px rgba(255,255,255,0.9)' }}
        />
      </div>
      <h2
        className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl tracking-[0.25em] uppercase text-white px-6 whitespace-nowrap"
        style={{ textShadow: '0 0 40px rgba(255,255,255,0.3)' }}
      >
        {label}
      </h2>
      <div className="flex items-center flex-1">
        <div
          className="w-1.5 h-1.5 rounded-full bg-white flex-shrink-0"
          style={{ boxShadow: '0 0 6px rgba(255,255,255,0.9)' }}
        />
        <motion.div
          variants={lineDraw}
          className="flex-1 h-px origin-left"
          style={{ background: 'linear-gradient(to right, rgba(0,212,255,0.7), transparent)' }}
        />
      </div>
    </motion.div>
  );
}

/* ── Sci-Fi Corner Brackets ── */
function SciFiCorners() {
  return (
    <>
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-400/60 pointer-events-none z-10" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan-400/60 pointer-events-none z-10" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyan-400/60 pointer-events-none z-10" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-400/60 pointer-events-none z-10" />
    </>
  );
}

/* ── Single Gallery Card ── */
function GalleryCard({
  image,
  index,
  onSelect,
  onImageError,
}: {
  image: GalleryImage;
  index: number;
  onSelect: () => void;
  onImageError: (src: string) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const [failed, setFailed] = useState(false);

  if (failed) return null;

  const subheading = getSubheading(image);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.35, ease: 'easeOut', delay: Math.min(index * 0.03, 0.25) }}
      className="relative overflow-hidden rounded-xl cursor-pointer group bg-[#070714]"
      style={{
        border: hovered ? '1px solid rgba(0,212,255,0.65)' : '1px solid rgba(255,255,255,0.07)',
        boxShadow: hovered ? '0 0 25px rgba(0,212,255,0.22)' : 'none',
        aspectRatio: '4 / 3',
        transition: 'border 0.25s ease, box-shadow 0.25s ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onSelect}
    >
      {/* Corner notches */}
      <div className="absolute top-1.5 left-1.5 w-2 h-2 border-t border-l border-cyan-400/40 pointer-events-none z-20 group-hover:border-cyan-400 transition-colors" />
      <div className="absolute top-1.5 right-1.5 w-2 h-2 border-t border-r border-cyan-400/40 pointer-events-none z-20 group-hover:border-cyan-400 transition-colors" />
      <div className="absolute bottom-1.5 left-1.5 w-2 h-2 border-b border-l border-cyan-400/40 pointer-events-none z-20 group-hover:border-cyan-400 transition-colors" />
      <div className="absolute bottom-1.5 right-1.5 w-2 h-2 border-b border-r border-cyan-400/40 pointer-events-none z-20 group-hover:border-cyan-400 transition-colors" />

      {/* Image */}
      <motion.img
        src={image.src}
        alt={image.activityLabel}
        className="w-full h-full object-cover"
        animate={{ scale: hovered ? 1.08 : 1.0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        onError={() => {
          setFailed(true);
          onImageError(image.src);
        }}
      />

      {/* Subtle hover gradient overlay */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: hovered
            ? 'linear-gradient(to top, rgba(2,2,8,0.6) 0%, rgba(0,212,255,0.06) 50%, transparent 100%)'
            : 'linear-gradient(to top, rgba(2,2,8,0.3) 0%, transparent 60%)',
          transition: 'background 0.3s ease',
        }}
      />

      {/* Center hover inspect button */}
      <div
        className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
        style={{
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'scale(1)' : 'scale(0.8)',
          transition: 'all 0.25s ease',
        }}
      >
        <div className="w-10 h-10 rounded-full bg-black/70 border border-cyan-400/80 flex items-center justify-center shadow-[0_0_20px_rgba(0,212,255,0.5)]">
          <Maximize2 className="w-4 h-4 text-cyan-300" />
        </div>
      </div>

      {/* Optional subtle subheading (only rendered if defined in IMAGE_SUBHEADINGS) */}
      {subheading && (
        <div className="absolute bottom-2.5 left-2.5 z-20 pointer-events-none">
          <span
            className="inline-block font-heading text-[10px] sm:text-[11px] font-semibold tracking-[0.14em] uppercase px-2 py-0.5 rounded bg-black/75 border border-white/10"
            style={{
              color: hovered ? 'rgb(0,212,255)' : 'rgba(255,255,255,0.75)',
              borderColor: hovered ? 'rgba(0,212,255,0.45)' : 'rgba(255,255,255,0.1)',
              boxShadow: hovered ? '0 0 10px rgba(0,212,255,0.2)' : 'none',
              transition: 'all 0.25s ease',
            }}
          >
            {subheading}
          </span>
        </div>
      )}
    </motion.div>
  );
}

/* ── Interactive Lightbox Modal (Pop-up & Zoom) ── */
function LightboxModal({
  images,
  currentIndex,
  onClose,
  onNavigate,
}: {
  images: GalleryImage[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
}) {
  const [zoomScale, setZoomScale] = useState<number>(1);
  const isDraggingRef = useRef<boolean>(false);
  const currentImage = images[currentIndex];
  const subheading = currentImage ? getSubheading(currentImage) : undefined;

  const totalImages = images.length;

  // Reset zoom on index change
  useEffect(() => {
    setZoomScale(1);
  }, [currentIndex]);

  const zoomIn = useCallback(() => {
    setZoomScale((prev) => Math.min(Number((prev + 0.5).toFixed(1)), 4));
  }, []);

  const zoomOut = useCallback(() => {
    setZoomScale((prev) => Math.max(Number((prev - 0.5).toFixed(1)), 1));
  }, []);

  const resetZoom = useCallback(() => {
    setZoomScale(1);
  }, []);

  const toggleZoom = useCallback(() => {
    setZoomScale((prev) => (prev > 1 ? 1 : 2.5));
  }, []);

  const navigateNext = useCallback(() => {
    if (totalImages <= 1) return;
    onNavigate((currentIndex + 1) % totalImages);
  }, [currentIndex, totalImages, onNavigate]);

  const navigatePrev = useCallback(() => {
    if (totalImages <= 1) return;
    onNavigate((currentIndex - 1 + totalImages) % totalImages);
  }, [currentIndex, totalImages, onNavigate]);

  // Mouse wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.stopPropagation();
    const factor = e.deltaY < 0 ? 0.25 : -0.25;
    setZoomScale((prev) => Math.max(1, Math.min(4, Number((prev + factor).toFixed(2)))));
  };

  // Keyboard navigation & lock body scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        navigateNext();
      } else if (e.key === 'ArrowLeft') {
        navigatePrev();
      } else if (e.key === '+' || e.key === '=') {
        zoomIn();
      } else if (e.key === '-' || e.key === '_') {
        zoomOut();
      } else if (e.key === '0') {
        resetZoom();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const origOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = origOverflow;
    };
  }, [onClose, navigateNext, navigatePrev, zoomIn, zoomOut, resetZoom]);

  if (!currentImage) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 bg-[#020208]/92 backdrop-blur-xl"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 10 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 10 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-6xl max-h-[92vh] flex flex-col bg-[#060612]/95 border border-cyan-500/30 rounded-2xl shadow-[0_0_60px_rgba(0,212,255,0.2)] overflow-hidden"
      >
        <SciFiCorners />

        {/* ── Lightbox Header / Controls Toolbar ── */}
        <div className="relative z-30 flex items-center justify-between px-4 py-3 sm:px-6 bg-[#090918]/80 border-b border-cyan-500/20 backdrop-blur-md">
          {/* Subheading or Spacer */}
          {subheading ? (
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#00d4ff]" />
              <span className="font-heading text-xs sm:text-sm font-semibold tracking-[0.16em] uppercase text-cyan-300">
                {subheading}
              </span>
            </div>
          ) : (
            <div className="w-8 sm:w-10" />
          )}

          {/* Interactive Zoom Toolbar */}
          <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-black/50 border border-white/10">
            <button
              onClick={zoomOut}
              disabled={zoomScale <= 1}
              title="Zoom Out (-)"
              className="p-1 sm:p-1.5 rounded text-white/60 hover:text-cyan-400 hover:bg-white/5 disabled:opacity-30 disabled:hover:text-white/60 transition-colors"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={toggleZoom}
              title="Click to toggle 100% / 250%"
              className="font-heading text-xs font-semibold tracking-wider px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20 transition-colors min-w-[54px] text-center"
            >
              {Math.round(zoomScale * 100)}%
            </button>
            <button
              onClick={zoomIn}
              disabled={zoomScale >= 4}
              title="Zoom In (+)"
              className="p-1 sm:p-1.5 rounded text-white/60 hover:text-cyan-400 hover:bg-white/5 disabled:opacity-30 disabled:hover:text-white/60 transition-colors"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={resetZoom}
              title="Reset View (0)"
              className="p-1 sm:p-1.5 rounded text-white/60 hover:text-cyan-400 hover:bg-white/5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Clean "×" Close Button */}
          <button
            onClick={onClose}
            aria-label="Close Lightbox"
            className="p-1.5 sm:p-2 rounded-lg border border-white/15 hover:border-cyan-400 bg-white/5 hover:bg-cyan-500/20 text-white/80 hover:text-cyan-300 transition-all duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ── Main Viewport (Zoom & Pan Stage) ── */}
        <div
          className="relative flex-1 min-h-[300px] sm:min-h-[440px] md:min-h-[560px] max-h-[78vh] overflow-hidden flex items-center justify-center bg-black/75 select-none"
          onWheel={handleWheel}
        >
          {/* Navigation chevrons */}
          {totalImages > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigatePrev();
                }}
                aria-label="Previous Image"
                className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-30 p-2.5 sm:p-3 rounded-full bg-[#080816]/85 border border-white/10 hover:border-cyan-400 hover:bg-cyan-500/20 text-white/70 hover:text-cyan-300 shadow-xl backdrop-blur-md transition-all duration-200"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateNext();
                }}
                aria-label="Next Image"
                className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-30 p-2.5 sm:p-3 rounded-full bg-[#080816]/85 border border-white/10 hover:border-cyan-400 hover:bg-cyan-500/20 text-white/70 hover:text-cyan-300 shadow-xl backdrop-blur-md transition-all duration-200"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </>
          )}

          {/* Draggable & Scalable Image Container */}
          <motion.div
            drag={zoomScale > 1}
            dragElastic={0.15}
            dragConstraints={{
              left: -350 * (zoomScale - 1),
              right: 350 * (zoomScale - 1),
              top: -250 * (zoomScale - 1),
              bottom: 250 * (zoomScale - 1),
            }}
            onDragStart={() => {
              isDraggingRef.current = true;
            }}
            onDragEnd={() => {
              setTimeout(() => {
                isDraggingRef.current = false;
              }, 60);
            }}
            animate={{
              scale: zoomScale,
              x: zoomScale === 1 ? 0 : undefined,
              y: zoomScale === 1 ? 0 : undefined,
            }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            onClick={() => {
              if (isDraggingRef.current) return;
              toggleZoom();
            }}
            className={`relative flex items-center justify-center ${
              zoomScale > 1 ? 'cursor-grab active:cursor-grabbing' : 'cursor-zoom-in'
            }`}
          >
            <img
              src={currentImage.src}
              alt={currentImage.activityLabel}
              className="max-w-[90vw] md:max-w-4xl max-h-[72vh] object-contain rounded-lg shadow-2xl pointer-events-none"
              draggable={false}
            />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Main GallerySection Component ── */
export default function GallerySection() {
  const [failedSrcs, setFailedSrcs] = useState<Set<string>>(() => new Set());
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleImageError = useCallback((src: string) => {
    setFailedSrcs((prev) => {
      if (prev.has(src)) return prev;
      const next = new Set(prev);
      next.add(src);
      return next;
    });
  }, []);

  const isValid = useCallback((img: GalleryImage) => !failedSrcs.has(img.src), [failedSrcs]);

  // Build clean timeline items list from GALLERY_ACTIVITIES (descending order by sortOrder: higher numbers at top)
  const timelineItems: TimelineItem[] = useMemo(() => {
    const sorted = [...GALLERY_ACTIVITIES].sort((a, b) => (b.sortOrder ?? 0) - (a.sortOrder ?? 0));
    const items: TimelineItem[] = [];

    for (const act of sorted) {
      const hasImages = GALLERY_IMAGES.some((img) => img.category === act.folder && isValid(img));
      if (hasImages) {
        items.push({
          folder: act.folder,
          label: act.label,
          subtitle: act.subtitle,
        });
      }
    }

    return items;
  }, [isValid]);

  // Default directly to first timeline activity (highest sortOrder)
  const defaultFilter = useMemo(() => {
    const sorted = [...GALLERY_ACTIVITIES].sort((a, b) => (b.sortOrder ?? 0) - (a.sortOrder ?? 0));
    return sorted[0]?.folder ?? 'meeting';
  }, []);

  const [activeFilter, setActiveFilter] = useState<string>(defaultFilter);

  // Keep activeFilter in sync if timelineItems update
  useEffect(() => {
    if (timelineItems.length > 0 && !timelineItems.some((i) => i.folder === activeFilter)) {
      setActiveFilter(timelineItems[0].folder);
    }
  }, [timelineItems, activeFilter]);

  // Compute filtered images for current selection
  const filteredImages = useMemo(() => {
    return GALLERY_IMAGES.filter((img) => img.category === activeFilter && isValid(img));
  }, [activeFilter, isValid]);

  // Scroll main panel to top when changing timeline node
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activeFilter]);

  const activeTimelineItem = timelineItems.find((i) => i.folder === activeFilter) ?? timelineItems[0];

  return (
    <section id="gallery" className="relative py-28 px-4 sm:px-6 overflow-hidden">
      {/* Background radial gradient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 10%, rgba(0,212,255,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <SectionHeader label="Gallery" />

        {/* ── Main Master-Detail Container ── */}
        <div
          className="relative rounded-2xl bg-[#04040d]/90 border border-cyan-500/20 shadow-[0_0_50px_rgba(0,212,255,0.05)] backdrop-blur-xl overflow-hidden p-4 sm:p-6"
        >
          <SciFiCorners />

          {/* ── Split View Layout (Left Sidebar + Right Main Panel) ── */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* ── Left Sidebar (Timeline Activities) ── */}
            <div className="w-full md:w-80 lg:w-[22rem] shrink-0 flex flex-col">
              {/* Sidebar Header */}
              <div className="flex items-center pb-3 mb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  <span className="font-heading text-xs font-bold tracking-[0.2em] uppercase text-white">
                    TIMELINE ARCHIVE
                  </span>
                </div>
              </div>

              {/* Scrollable Timeline List (~6-7 items visible, then scrolls internally) */}
              <div className="relative flex flex-row md:flex-col overflow-x-auto md:overflow-y-auto md:max-h-[500px] gap-2.5 pb-2 md:pb-0 pr-0 md:pr-2 select-none">
                {/* Vertical Spine Line (Visible on desktop) */}
                <div
                  className="hidden md:block absolute left-[17px] top-4 bottom-4 w-px pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(to bottom, rgba(0,212,255,0.7) 0%, rgba(0,212,255,0.2) 85%, transparent 100%)',
                  }}
                />

                {timelineItems.map((item) => {
                  const isActive = activeFilter === item.folder;
                  return (
                    <button
                      key={item.folder}
                      onClick={() => setActiveFilter(item.folder)}
                      className="relative shrink-0 md:shrink flex items-start p-4 md:py-4 md:pl-10 md:pr-4 rounded-xl transition-all duration-300 text-left group"
                      style={{
                        background: isActive
                          ? 'linear-gradient(90deg, rgba(0,212,255,0.14) 0%, rgba(0,212,255,0.02) 100%)'
                          : 'rgba(255,255,255,0.02)',
                        border: isActive
                          ? '1px solid rgba(0,212,255,0.7)'
                          : '1px solid rgba(255,255,255,0.06)',
                        boxShadow: isActive
                          ? '0 0 20px rgba(0,212,255,0.25), inset 0 0 15px rgba(0,212,255,0.08)'
                          : 'none',
                      }}
                    >
                      {/* Timeline Node Dot (on desktop spine, vertically aligned with title) */}
                      <div
                        className={`hidden md:block absolute left-[13px] top-5 -translate-y-1/2 rounded-full transition-all duration-300 ${
                          isActive
                            ? 'w-2.5 h-2.5 bg-cyan-400 shadow-[0_0_12px_#00d4ff] ring-4 ring-cyan-400/25'
                            : 'w-2 h-2 bg-white/20 group-hover:bg-cyan-400/60'
                        }`}
                      />

                      {/* Active indicator bar */}
                      {isActive && (
                        <div className="absolute left-0 top-2.5 bottom-2.5 w-1 rounded-r bg-cyan-400 shadow-[0_0_10px_#00d4ff]" />
                      )}

                      <div className="min-w-0 pr-1 flex-1">
                        <p
                          className="font-heading text-sm sm:text-base tracking-[0.15em] uppercase font-bold transition-all duration-200 leading-snug"
                          style={{
                            color: isActive ? 'rgb(0,212,255)' : 'rgba(255,255,255,0.75)',
                            textShadow: isActive ? '0 0 10px rgba(0,212,255,0.7)' : 'none',
                          }}
                        >
                          {item.label}
                        </p>
                        {item.subtitle && (
                          <p
                            className="font-heading text-[11px] sm:text-xs tracking-wider uppercase transition-colors whitespace-pre-line break-words mt-1 leading-snug"
                            style={{
                              color: isActive ? 'rgba(0,212,255,0.75)' : 'rgba(255,255,255,0.45)',
                            }}
                          >
                            {item.subtitle}
                          </p>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ── Right Main Panel (Image Grid & Independent Scroll) ── */}
            <div className="flex-1 min-w-0 flex flex-col bg-[#050512]/60 rounded-xl border border-white/5 p-4 sm:p-5">
              {/* Right Panel Header */}
              <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#00d4ff]" />
                  <h3 className="font-heading font-bold text-base sm:text-lg tracking-[0.2em] uppercase text-white">
                    {activeTimelineItem?.label}
                  </h3>
                </div>

                <span className="font-heading text-xs tracking-wider text-white/40 uppercase">
                  {filteredImages.length} {filteredImages.length === 1 ? 'IMAGE' : 'IMAGES'}
                </span>
              </div>

              {/* Independent Scroll Container */}
              <div
                ref={scrollContainerRef}
                className="flex-1 h-[500px] md:h-[500px] max-h-[72vh] overflow-y-auto pr-2"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeFilter}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                  >
                    {filteredImages.map((image, idx) => (
                      <GalleryCard
                        key={`${image.category}-${image.src}`}
                        image={image}
                        index={idx}
                        onSelect={() => setLightboxIndex(idx)}
                        onImageError={handleImageError}
                      />
                    ))}
                  </motion.div>
                </AnimatePresence>

                {filteredImages.length === 0 && (
                  <div className="py-24 text-center flex flex-col items-center justify-center">
                    <Radio className="w-10 h-10 text-cyan-400/40 mb-3 animate-pulse" />
                    <p className="font-heading text-sm uppercase tracking-widest text-white/50">
                      NO IMAGES FOUND
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Interactive Lightbox Modal (Pop-up & Zoom) ── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <LightboxModal
            images={filteredImages}
            currentIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onNavigate={(newIndex) => setLightboxIndex(newIndex)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}