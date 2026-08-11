import { useMemo, useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import {
  GALLERY_IMAGES as _GALLERY_IMAGES,
  ALL_LOGS_PREVIEW as _ALL_LOGS_PREVIEW,
  FILTER_TABS as _FILTER_TABS,
} from '../siteData.js';

type FilterKey = 'ALL' | string;

interface GalleryImage {
  category: string;
  activityLabel: string;
  src: string;
}

const GALLERY_IMAGES = _GALLERY_IMAGES as GalleryImage[];
const ALL_LOGS_PREVIEW = _ALL_LOGS_PREVIEW as GalleryImage[];
const FILTER_TABS: { key: FilterKey; label: string }[] = _FILTER_TABS as {
  key: FilterKey;
  label: string;
}[];

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
      className="flex items-center justify-center w-full mb-12"
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

/* ── Single gallery card ── */
function GalleryCard({
  image,
  onImageError,
}: {
  image: GalleryImage;
  onImageError: (src: string) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const [failed, setFailed] = useState(false);

  if (failed) return null;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="relative overflow-hidden rounded-lg cursor-pointer group"
      style={{
        border: hovered
          ? '1px solid rgba(0,212,255,0.5)'
          : '1px solid rgba(255,255,255,0.05)',
        boxShadow: hovered ? '0 0 20px rgba(0,212,255,0.15)' : 'none',
        transition: 'border 0.3s ease, box-shadow 0.3s ease',
        aspectRatio: '4 / 3',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.img
        src={image.src}
        alt={image.activityLabel}
        className="w-full h-full object-cover"
        animate={{ scale: hovered ? 1.07 : 1.0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        onError={() => {
          setFailed(true);
          onImageError(image.src);
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to top, rgba(2,2,8,0.75) 0%, transparent 60%)',
        }}
      />

      <div className="absolute bottom-3 left-3 right-3 z-10">
        <p
          className="font-heading text-[11px] tracking-[0.1em] leading-tight"
          style={{
            color: hovered ? 'rgb(0,212,255)' : 'rgba(255,255,255,0.7)',
            textShadow: hovered ? '0 0 8px rgba(0,212,255,0.7)' : 'none',
            transition: 'color 0.25s ease',
          }}
        >
          {image.activityLabel}
        </p>
      </div>
    </motion.div>
  );
}

export default function GallerySection() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('ALL');
  const [failedSrcs, setFailedSrcs] = useState<Set<string>>(() => new Set());

  const handleImageError = (src: string) => {
    setFailedSrcs((prev) => {
      if (prev.has(src)) return prev;
      const next = new Set(prev);
      next.add(src);
      return next;
    });
  };

  const isValid = (img: GalleryImage) => !failedSrcs.has(img.src);

  const filteredImages = useMemo(() => {
    if (activeFilter === 'ALL') {
      const preview = ALL_LOGS_PREVIEW.filter(isValid);
      if (preview.length >= 12) return preview.slice(0, 12);

      const used = new Set(preview.map((img) => img.src));
      const backfill = GALLERY_IMAGES.filter((img) => isValid(img) && !used.has(img.src));
      return [...preview, ...backfill].slice(0, 12);
    }

    return GALLERY_IMAGES.filter((img) => img.category === activeFilter && isValid(img));
  }, [activeFilter, failedSrcs]);

  return (
    <section id="gallery" className="relative py-28 px-6 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(0,212,255,0.03) 0%, transparent 65%)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        <SectionHeader label="Gallery" />

        {/* ── Filter tabs ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          <div
            className="flex flex-wrap justify-center gap-2 p-2 rounded-xl"
            style={{
              background: 'rgba(255,255,255,0.03)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            {FILTER_TABS.map((tab) => {
              const isActive = activeFilter === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveFilter(tab.key)}
                  className="relative font-heading text-[11px] font-semibold tracking-[0.15em] uppercase px-4 py-2 rounded-lg transition-all duration-300"
                  style={{
                    color: isActive ? 'rgb(0,212,255)' : 'rgba(255,255,255,0.45)',
                    background: isActive ? 'rgba(0,212,255,0.08)' : 'transparent',
                    border: isActive
                      ? '1px solid rgba(0,212,255,0.45)'
                      : '1px solid transparent',
                    boxShadow: isActive ? '0 0 14px rgba(0,212,255,0.18)' : 'none',
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* ── Image grid with AnimatePresence ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {filteredImages.map((image, idx) => (
              <motion.div
                key={`${image.category}-${image.src}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut', delay: idx * 0.06 }}
              >
                <GalleryCard image={image} onImageError={handleImageError} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
