import { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { Telescope, Users, FlaskConical, BookMarked } from 'lucide-react';
import { ABOUT_CARDS, ABOUT_METRICS } from '../siteData.js';

const ICON_LOOKUP: Record<string, React.ElementType> = {
  Telescope,
  Users,
  FlaskConical,
  BookMarked,
};

/* ── Fade-up animation variant ── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut', delay },
  }),
};

/* ── Laser line stretch variant ── */
const lineDraw: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1.0, ease: 'easeOut', delay: 0.2 },
  },
};

/* ── Metric counter variant ── */
const metricReveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut', delay },
  }),
};


/* ── Single flip card ── */
function FlipCard({
  icon: Icon,
  front,
  back,
  delay,
}: {
  icon: React.ElementType;
  front: string;
  back: string;
  delay: number;
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: 'easeOut', delay }}
      className="relative h-56 cursor-pointer"
      style={{ perspective: '1000px' }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      {/* Card inner — rotates on hover */}
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ type: 'spring', stiffness: 120, damping: 18 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* FRONT face */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-xl border border-white/10 px-5 py-6"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            background: 'rgba(255,255,255,0.04)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <Icon size={28} className="text-neon-cyan opacity-70" strokeWidth={1.5} />
          <p className="font-heading font-bold text-sm tracking-[0.12em] uppercase text-white text-center leading-snug">
            {front}
          </p>
        </div>

        {/* BACK face */}
        <div
          className="absolute inset-0 flex items-center justify-center rounded-xl px-5 py-6"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: 'rgba(0,212,255,0.06)',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 0 30px rgba(0,212,255,0.2), inset 0 0 0 1px rgba(0,212,255,0.25)',
          }}
        >
          <p className="font-heading text-[13px] font-medium tracking-[0.05em] text-white/85 text-center leading-relaxed">
            {back}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Section header with laser lines ── */
function SectionHeader({ label }: { label: string }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className="flex items-center justify-center gap-0 w-full mb-14"
    >
      {/* Left laser line */}
      <div className="flex items-center flex-1">
        <motion.div
          variants={lineDraw}
          className="flex-1 h-px origin-right"
          style={{
            background: 'linear-gradient(to left, rgba(0,212,255,0.7), transparent)',
          }}
        />
        {/* Tracking dot */}
        <div
          className="w-1.5 h-1.5 rounded-full bg-white flex-shrink-0"
          style={{ boxShadow: '0 0 6px rgba(255,255,255,0.9)' }}
        />
      </div>

      {/* Header text */}
      <motion.h2
        variants={fadeUp}
        className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl tracking-[0.25em] uppercase text-white px-6 whitespace-nowrap"
        style={{ textShadow: '0 0 40px rgba(255,255,255,0.3)' }}
      >
        {label}
      </motion.h2>

      {/* Right laser line */}
      <div className="flex items-center flex-1">
        {/* Tracking dot */}
        <div
          className="w-1.5 h-1.5 rounded-full bg-white flex-shrink-0"
          style={{ boxShadow: '0 0 6px rgba(255,255,255,0.9)' }}
        />
        <motion.div
          variants={lineDraw}
          className="flex-1 h-px origin-left"
          style={{
            background: 'linear-gradient(to right, rgba(0,212,255,0.7), transparent)',
          }}
        />
      </div>
    </motion.div>
  );
}

export default function AboutSection() {
  return (
    <section id="about" className="relative py-28 px-6 overflow-hidden">
      {/* Subtle background overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(0,212,255,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* ── Section header ── */}
        <SectionHeader label="About the Club" />

        {/* ── Content blocks ── */}
        <div className="grid md:grid-cols-2 gap-10 mb-14">
          {/* Our Mission */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            custom={0}
            variants={fadeUp}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-6 h-px bg-neon-cyan opacity-70" />
              <h3 className="font-heading font-bold text-base tracking-[0.15em] uppercase text-white">
                Our Mission
              </h3>
            </div>
            <p className="font-heading text-sm font-medium tracking-[0.04em] text-white/55 leading-relaxed">
              To foster a vibrant scientific and observational culture at GKCIET where students can
              bridge the gap between theoretical physics and deep-sky observation. We encourage
              open-source astro contributions and physics problem-solving as a learning tool, and
              celebrate the laws of the universe through collaborative study.
            </p>
          </motion.div>

          {/* History at PAC */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            custom={0.15}
            variants={fadeUp}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-6 h-px bg-neon-cyan opacity-70" />
              <h3 className="font-heading font-bold text-base tracking-[0.15em] uppercase text-white">
                History at PAC
              </h3>
            </div>
            <p className="font-heading text-sm font-medium tracking-[0.04em] text-white/55 leading-relaxed">
              Established in 2025, PAC carries forward the spirit of pioneer stargazing and physics
              discovery. We stay grounded by seamlessly tracking transits, focusing on hands-on
              telescope operations, night camps, collaborative research, analyzing observational
              datasets, and keeping our astronomical horizons ever forward.
            </p>
          </motion.div>
        </div>

        {/* ── Telemetry metrics row ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="flex flex-wrap items-center justify-center gap-0 mb-20"
        >
          {ABOUT_METRICS.map((metric, idx) => (
            <motion.div
              key={metric.label}
              custom={metric.delay}
              variants={metricReveal}
              className="flex items-center"
            >
              <div className="flex flex-col items-center px-10 py-4">
                <span
                  className="font-heading font-bold text-2xl md:text-3xl tracking-[0.1em] text-neon-cyan"
                  style={{ textShadow: '0 0 20px rgba(0,212,255,0.5)' }}
                >
                  {metric.value}
                </span>
                <span className="font-heading text-[10px] tracking-[0.2em] uppercase text-white/40 mt-1">
                  {metric.label}
                </span>
              </div>
              {idx < 2 && (
                <div className="h-10 w-px bg-white/10 self-center" />
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* ── WHY JOIN PAC? sub-header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center mb-10"
        >
          <h3
            className="font-heading font-bold text-xl sm:text-2xl tracking-[0.25em] uppercase text-white"
            style={{ textShadow: '0 0 30px rgba(255,255,255,0.2)' }}
          >
            Why Join PAC?
          </h3>
          <div className="accent-line mx-auto max-w-xs mt-3" />
        </motion.div>

        {/* ── Flip card grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {ABOUT_CARDS.map((card, idx) => (
            <FlipCard
              key={card.front}
              icon={ICON_LOOKUP[card.iconName]}
              front={card.front}
              back={card.back}
              delay={idx * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
