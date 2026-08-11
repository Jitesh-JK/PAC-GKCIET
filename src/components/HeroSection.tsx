import { motion, type Variants } from 'framer-motion';
import { Orbit, BookOpen } from 'lucide-react';
import StarfieldCanvas from './StarfieldCanvas';

/* ── Left galaxy zoom ── */
const galaxyZoom: Variants = {
  hidden: { scale: 0.4, opacity: 0 },
  visible: {
    scale: 1.0,
    opacity: 0.7,
    transition: { duration: 2.5, ease: 'easeOut' },
  },
};

/* ── Right Earth zoom ── */
const earthZoom: Variants = {
  hidden: { scale: 0.6, opacity: 0 },
  visible: {
    scale: 1.0,
    opacity: 1,
    transition: { duration: 2.5, ease: 'easeOut' },
  },
};

/* ── Top-right star flare ── */
const starFlareZoom: Variants = {
  hidden: { scale: 0.5, opacity: 0 },
  visible: {
    scale: 1.0,
    opacity: 1,
    transition: { duration: 2.5, ease: 'easeOut' },
  },
};

/* ── PAC acronym letters ── */
const letterP: Variants = {
  hidden: { x: -300, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.8 },
  },
};

const letterC: Variants = {
  hidden: { x: 300, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.8 },
  },
};

const letterA: Variants = {
  hidden: { scale: 0.3, opacity: 0 },
  visible: {
    scale: [0.3, 1.15, 1.0],
    opacity: 1,
    transition: { duration: 0.7, ease: 'easeOut', delay: 1.6, times: [0, 0.6, 1] },
  },
};

/* ── Title reveal ── */
const titleReveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut', delay: 2.4 },
  },
};

const accentLineReveal: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.8, ease: 'easeOut', delay: 2.4 },
  },
};

/* ── Button reveal ── */
const buttonReveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut', delay: 3.0 + i * 0.15 },
  }),
};

export default function HeroSection() {
  const handleScroll = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Starfield canvas base layer */}
      <StarfieldCanvas />

      {/* ── Left galaxy background ── */}
      <motion.div
        variants={galaxyZoom}
        initial="hidden"
        animate="visible"
        className="absolute pointer-events-none"
        style={{
          left: '-10%',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '45vw',
          maxWidth: '600px',
          height: 'auto',
          zIndex: 1,
        }}
      >
        <img
          //src="https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=600"
          src="public/hero_page/galaxy_4.png"
          alt="Galaxy background"
          className="w-full h-auto object-cover rounded-full opacity-90"
          style={{ filter: 'brightness(1.00) saturate(0.9)' , mixBlendMode: 'screen'  }}
        />
      </motion.div>

      {/* ── Right Earth crescent ── */}
      <motion.div
        variants={earthZoom}
        initial="hidden"
        animate="visible"
        className="absolute pointer-events-none"
        style={{
          right: '18%',
          top: '18%',
          transform: 'translateY(-50%)',
          width: '50vw',
          maxWidth: '700px',
          height: 'auto',
          zIndex: 1,
        }}
      >
        <img          
          src="public/hero_page/earth.png"
          alt="Earth crescent"
          className="w-full h-auto object-cover"
          style={{ filter: 'brightness(1.1) contrast(1.1)', mixBlendMode: 'screen' }}
        />
      </motion.div>

      {/* ── Top-right distant star flare ── */}
      <motion.div
        variants={starFlareZoom}
        initial="hidden"
        animate="visible"
        className="absolute pointer-events-none"
        style={{
          right: '8%',
          top: '12%',
          width: '12vw',
          maxWidth: '180px',
          height: 'auto',
          zIndex: 1,
        }}
      >
        <img
          src="public/hero_page/star.jpg"
          alt="Star flare"
          className="w-full h-auto object-cover rounded-full"
          style={{
            filter: 'brightness(1.3) ', mixBlendMode: 'screen',
          }}
        />
      </motion.div>

      {/* Content overlay */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* PAC Acronym */}
        <motion.div
          className="flex items-center justify-center gap-1 md:gap-3 mb-4"
          initial="hidden"
          animate="visible"
        >
          <motion.span
            variants={letterP}
            className="font-heading font-bold text-8xl sm:text-9xl md:text-10xl text-white leading-none"
            style={{ letterSpacing: '0.05em' }}
          >
            P
          </motion.span>
          <motion.span
            variants={letterA}
            className="font-heading font-bold text-8xl sm:text-9xl md:text-10xl text-neon-cyan leading-none"
            style={{
              textShadow:
                '0 0 30px rgba(0,212,255,0.8), 0 0 60px rgba(0,212,255,0.4), 0 0 100px rgba(0,212,255,0.15)',
              letterSpacing: '0.05em',
            }}
          >
            A
          </motion.span>
          <motion.span
            variants={letterC}
            className="font-heading font-bold text-8xl sm:text-9xl md:text-10xl text-white leading-none"
            style={{ letterSpacing: '0.05em' }}
          >
            C
          </motion.span>
        </motion.div>

        {/* Accent line - top */}
        <motion.div
          variants={accentLineReveal}
          initial="hidden"
          animate="visible"
          className="accent-line mx-auto max-w-2xl mb-3 origin-center"
        />

        {/* Title */}
        <motion.h2
          variants={titleReveal}
          initial="hidden"
          animate="visible"
          className="font-heading text-[12px] sm:text-sm md:text-base font-semibold tracking-[0.35em] uppercase text-white/70 mb-3"
        >
          Physics &amp; Astronomy Club
        </motion.h2>

        {/* Accent line - bottom */}
        <motion.div
          variants={accentLineReveal}
          initial="hidden"
          animate="visible"
          className="accent-line mx-auto max-w-2xl mb-8 origin-center"
        />

        {/* Action buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-5"
          initial="hidden"
          animate="visible"
        >
          <motion.button
            custom={0}
            variants={buttonReveal}
            onClick={() => handleScroll('#about')}
            className="glass-btn font-heading px-7 py-3 rounded-full text-xs font-semibold tracking-[0.15em] uppercase text-white/90 flex items-center gap-2.5 whitespace-nowrap"
          >
            <Orbit size={18} />
            Enter Orbit
          </motion.button>
          <motion.button
            custom={1}
            variants={buttonReveal}
            onClick={() => handleScroll('#resources')}
            className="glass-btn font-heading px-7 py-3 rounded-full text-xs font-semibold tracking-[0.15em] uppercase text-white/90 flex items-center gap-2.5 whitespace-nowrap"
          >
            <BookOpen size={18} />
            View Resources
          </motion.button>
        </motion.div>
      </div>

      {/* Bottom fade into cosmic black */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #020208, transparent)', zIndex: 5 }}
      />
    </section>
  );
}
