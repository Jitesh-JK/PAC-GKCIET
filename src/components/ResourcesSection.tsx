import { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { Linkedin, Mail, Phone, Network, CalendarDays, Github } from 'lucide-react';
import {
  SESSIONS as _SESSIONS,
  MONTHLY_PAPERS as _MONTHLY_PAPERS,
  CONTACT,
} from '../siteData.js';

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */
interface DownloadLinks {
  pptx?: string;
  pdf?: string;
}

interface Session {
  id: number;
  title: string;
  img?: string;
  description?: string;
  downloadLinks?: DownloadLinks;
  date: string;
}

function parseSessionTitle(title: string): { sessionLabel: string | null; displayTitle: string } {
  const parts = title.split('//').map((part) => part.trim());
  if (parts.length >= 2 && parts[0] && parts.slice(1).join(' // ')) {
    return {
      sessionLabel: parts[0],
      displayTitle: parts.slice(1).join(' // '),
    };
  }
  return { sessionLabel: null, displayTitle: title };
}

interface MonthlyPaper {
  id: number;
  month: string;
  year: string;
  img?: string;
  abstract?: string;
  downloadLinks?: DownloadLinks;
}

interface ContactInfo {
  name: string;
  title: string;
  linkedin?: string;
  github?: string;
  email?: string;
  phone?: string;
}

const SESSIONS = _SESSIONS as Session[];
const MONTHLY_PAPERS = _MONTHLY_PAPERS as MonthlyPaper[];
const contact = CONTACT as ContactInfo;

/* ─────────────────────────────────────────────
   Animation variants
───────────────────────────────────────────── */
const lineDraw: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1.0, ease: 'easeOut', delay: 0.2 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut', delay },
  }),
};

/* ─────────────────────────────────────────────
   Section header (laser lines + tracking dots)
───────────────────────────────────────────── */
function SectionHeader({ label }: { label: string }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className="flex items-center justify-center w-full mb-14"
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

/* ─────────────────────────────────────────────
   Column header (icon + pipe + label)
───────────────────────────────────────────── */
function ColumnHeader({
  icon: Icon,
  label,
  accentColor,
}: {
  icon: React.ElementType;
  label: string;
  accentColor: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -14 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="flex items-center gap-3 mb-5"
    >
      <div
        className="w-10 h-10 flex items-center justify-center rounded-lg flex-shrink-0"
        style={{
          background: `rgba(${accentColor}, 0.09)`,
          border: `1px solid rgba(${accentColor}, 0.3)`,
          boxShadow: `0 0 14px rgba(${accentColor}, 0.12)`,
        }}
      >
        <Icon size={18} strokeWidth={1.6} style={{ color: `rgba(${accentColor}, 0.9)` }} />
      </div>
      <div className="w-px h-5 bg-white/15 flex-shrink-0" />
      <span
        className="font-heading text-xs font-bold tracking-[0.22em] uppercase"
        style={{ color: 'rgba(255,255,255,0.6)' }}
      >
        {label}
      </span>
      <div
        className="flex-1 h-px"
        style={{ background: `linear-gradient(to right, rgba(${accentColor}, 0.25), transparent)` }}
      />
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Session image tile (left column)
───────────────────────────────────────────── */
function SessionTile({ session, delay }: { session: Session; delay: number }) {
  const [hovered, setHovered] = useState(false);
  const hasImage = !!session.img?.trim();
  const hasDescription = !!session.description?.trim();
  const hasPptx = !!session.downloadLinks?.pptx?.trim();
  const hasPdf = !!session.downloadLinks?.pdf?.trim();
  const { sessionLabel, displayTitle } = parseSessionTitle(session.title);

  return (
    <motion.div
      custom={delay}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-20px' }}
      className="relative overflow-hidden rounded-xl cursor-pointer flex flex-col h-full"
      style={{
        aspectRatio: '4/3',
        border: hovered ? '1px solid rgba(0,212,255,0.55)' : '1px solid rgba(0,212,255,0.2)',
        boxShadow: hovered ? '0 0 24px rgba(0,212,255,0.18)' : 'none',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
        background: hasImage ? 'transparent' : 'rgba(0,212,255,0.03)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hasImage && (
        <img
          src={session.img}
          alt={displayTitle}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            transform: hovered ? 'scale(1.07)' : 'scale(1)',
            transition: 'transform 0.5s ease',
          }}
        />
      )}
      {!hasImage && (
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at center, rgba(0,212,255,0.08) 0%, transparent 70%)' }}
        />
      )}
      <div
        className="absolute inset-0"
        style={{
          background: hasImage
            ? 'linear-gradient(to top, rgba(2,2,8,0.97) 0%, rgba(2,2,8,0.7) 45%, rgba(2,2,8,0.15) 80%, transparent 100%)'
            : 'linear-gradient(to top, rgba(2,2,8,0.95) 0%, rgba(2,2,8,0.8) 50%, transparent 100%)',
        }}
      />
      <div className="relative z-10 flex flex-col justify-between h-full min-h-0 p-3">
        {sessionLabel && (
          <p
            className="font-heading font-bold text-[10px] sm:text-xs tracking-[0.22em] uppercase text-neon-cyan text-center flex-shrink-0"
            style={{ textShadow: '0 0 12px rgba(0,212,255,0.55)' }}
          >
            {sessionLabel}
          </p>
        )}

        {hasDescription && (
          <div className="flex-1 flex items-center justify-center min-h-0 px-1 py-2">
            <p className="font-heading text-[9px] sm:text-[10px] tracking-[0.06em] text-white/45 line-clamp-3 leading-relaxed text-center">
              {session.description}
            </p>
          </div>
        )}

        <div className="flex-shrink-0 mt-auto">
          <p className="font-heading font-bold text-sm tracking-[0.07em] text-white leading-tight line-clamp-2 mb-2">
            {displayTitle}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex gap-1.5">
              {hasPptx && (
                <a
                  href={session.downloadLinks!.pptx}
                  download
                  onClick={(e) => e.stopPropagation()}
                  className="font-heading text-[9px] font-bold tracking-[0.18em] px-1.5 py-0.5 rounded transition-all duration-200 hover:bg-cyan-500/20"
                  style={{
                    background: 'rgba(0,212,255,0.09)',
                    border: '1px solid rgba(0,212,255,0.25)',
                    color: 'rgba(0,212,255,0.8)',
                  }}
                >
                  PPTX
                </a>
              )}
              {hasPdf && (
                <a
                  href={session.downloadLinks!.pdf}
                  download
                  onClick={(e) => e.stopPropagation()}
                  className="font-heading text-[9px] font-bold tracking-[0.18em] px-1.5 py-0.5 rounded transition-all duration-200 hover:bg-cyan-500/20"
                  style={{
                    background: 'rgba(0,212,255,0.09)',
                    border: '1px solid rgba(0,212,255,0.25)',
                    color: 'rgba(0,212,255,0.8)',
                  }}
                >
                  PDF
                </a>
              )}
            </div>
            <span className="font-heading text-[9px] tracking-[0.14em] text-white/35 ml-2">
              {session.date}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Calendar month tile (right column)
───────────────────────────────────────────── */
function CalendarTile({ paper, delay }: { paper: MonthlyPaper; delay: number }) {
  const [hovered, setHovered] = useState(false);
  const hasImage = !!paper.img?.trim();
  const hasPptx = !!paper.downloadLinks?.pptx?.trim();
  const hasPdf = !!paper.downloadLinks?.pdf?.trim();
  const hasDownloads = hasPptx || hasPdf;

  return (
    <motion.div
      custom={delay}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-20px' }}
      className="relative overflow-hidden rounded-xl cursor-pointer flex flex-col"
      style={{
        background: 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(8px)',
        border: hovered ? '1px solid rgba(0,212,255,0.4)' : '1px solid rgba(255,255,255,0.09)',
        boxShadow: hovered ? '0 0 16px rgba(0,212,255,0.12)' : 'none',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="px-2.5 pt-2.5 pb-1.5 flex items-baseline gap-1.5 flex-shrink-0">
        <span className="font-heading font-bold text-sm tracking-[0.12em] text-white/90 leading-none">
          {paper.month}
        </span>
        <span className="font-heading text-[10px] tracking-[0.1em] text-white/35 leading-none">
          {paper.year}
        </span>
      </div>
      <div className="relative overflow-hidden flex-shrink-0" style={{ aspectRatio: '1/1' }}>
        {hasImage ? (
          <>
            <img
              src={paper.img}
              alt={`${paper.month} ${paper.year} research`}
              className="w-full h-full object-cover"
              style={{
                transform: hovered ? 'scale(1.08)' : 'scale(1)',
                transition: 'transform 0.45s ease',
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(ellipse at center, transparent 50%, rgba(2,2,8,0.5) 100%)',
              }}
            />
          </>
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: 'radial-gradient(ellipse at center, rgba(0,255,148,0.06) 0%, transparent 70%)' }}
          >
            <CalendarDays size={20} strokeWidth={1} style={{ color: 'rgba(255,255,255,0.12)' }} />
          </div>
        )}
      </div>
      {paper.abstract && (
        <div className="px-2.5 py-1.5 flex-shrink-0" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <p className="font-heading text-[8px] tracking-[0.08em] text-white/40 line-clamp-2 leading-relaxed">
            {paper.abstract}
          </p>
        </div>
      )}
      {hasDownloads && (
        <div
          className="flex items-center gap-1.5 px-2.5 py-2 flex-shrink-0"
          style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
        >
          {hasPptx && (
            <a
              href={paper.downloadLinks!.pptx}
              download
              onClick={(e) => e.stopPropagation()}
              className="font-heading text-[9px] font-bold tracking-[0.18em] px-1.5 py-0.5 rounded transition-all duration-200 hover:bg-cyan-500/20"
              style={{
                background: 'rgba(0,212,255,0.09)',
                border: '1px solid rgba(0,212,255,0.25)',
                color: 'rgba(0,212,255,0.8)',
              }}
            >
              PPTX
            </a>
          )}
          {hasPdf && (
            <a
              href={paper.downloadLinks!.pdf}
              download
              onClick={(e) => e.stopPropagation()}
              className="font-heading text-[9px] font-bold tracking-[0.18em] px-1.5 py-0.5 rounded transition-all duration-200 hover:bg-cyan-500/20"
              style={{
                background: 'rgba(0,212,255,0.09)',
                border: '1px solid rgba(0,212,255,0.25)',
                color: 'rgba(0,212,255,0.8)',
              }}
            >
              PDF
            </a>
          )}
        </div>
      )}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Contact action button (footer)
───────────────────────────────────────────── */
function ContactBtn({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      aria-label={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center justify-center w-14 h-14 rounded-xl transition-all duration-300"
      style={{
        background: hovered ? 'rgba(0,212,255,0.10)' : 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(12px)',
        border: hovered ? '1px solid rgba(0,212,255,0.5)' : '1px solid rgba(255,255,255,0.10)',
        boxShadow: hovered ? '0 0 22px rgba(0,212,255,0.22)' : 'none',
        color: hovered ? 'rgba(0,212,255,0.95)' : 'rgba(255,255,255,0.45)',
      }}
    >
      <Icon size={20} strokeWidth={1.8} />
    </a>
  );
}

/* ─────────────────────────────────────────────
   Section export
───────────────────────────────────────────── */
export default function ResourcesSection() {
  return (
    <section id="resources" className="relative pt-28 pb-14 px-6 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(0,212,255,0.03) 0%, transparent 65%)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        <SectionHeader label="Resource Portal" />

        {/* ── Two-column split ── */}
        <div className="flex flex-col lg:flex-row gap-6 mb-20">
          {/* ── Left column — Meeting Archive Vault ── */}
          <div className="flex-1 min-w-0">
            <ColumnHeader icon={Network} label="Meeting Archive Vault" accentColor="0,212,255" />
            <div
              className="overflow-y-auto pr-1"
              style={{
                maxHeight: '540px',
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(0,212,255,0.3) transparent',
              }}
            >
              <div className="grid grid-cols-2 gap-3 pb-2">
                {SESSIONS.map((session, idx) => (
                  <SessionTile key={session.id} session={session} delay={idx * 0.07} />
                ))}
              </div>
            </div>
          </div>

          {/* Vertical divider (desktop only) */}
          <div
            className="hidden lg:block w-px flex-shrink-0 self-stretch"
            style={{
              background:
                'linear-gradient(to bottom, transparent, rgba(255,255,255,0.07), transparent)',
            }}
          />

          {/* ── Right column — Monthly Research Papers ── */}
          <div className="flex-1 min-w-0">
            <ColumnHeader icon={CalendarDays} label="Monthly Research Papers" accentColor="0,255,148" />
            <div
              className="overflow-y-auto pr-1"
              style={{
                maxHeight: '540px',
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(0,255,148,0.3) transparent',
              }}
            >
              <div className="grid grid-cols-4 gap-2.5 pb-2">
                {MONTHLY_PAPERS.map((paper, idx) => (
                  <CalendarTile key={paper.id} paper={paper} delay={idx * 0.05} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Contact & Systems Interface ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-8"
          style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
        >
          {/* Left — Attribution text */}
          <div className="flex flex-col gap-1">
            <p className="font-heading font-bold text-sm tracking-[0.2em] uppercase text-white">
              Contact and Systems Interface
            </p>
            <p className="font-heading text-[11px] tracking-[0.18em] uppercase text-white/35">
              {contact.name} // {contact.title}
            </p>
          </div>

          {/* Right — Contact buttons (conditionally rendered) */}
          <div className="flex items-center gap-3">
            {contact.linkedin?.trim() && (
              <ContactBtn href={contact.linkedin} icon={Linkedin} label="LinkedIn" />
            )}
            {contact.github?.trim() && (
              <ContactBtn href={contact.github} icon={Github} label="GitHub" />
            )}
            {contact.email?.trim() && (
              <ContactBtn href={`mailto:${contact.email}`} icon={Mail} label="Email" />
            )}
            {contact.phone?.trim() && (
              <ContactBtn href={`tel:${contact.phone}`} icon={Phone} label="Phone" />
            )}
          </div>
        </motion.div>

        {/* ── Copyright ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
          className="mt-10 text-center"
        >
          <p className="font-heading text-[10px] tracking-[0.2em] uppercase text-white/20">
            System Copyright &copy; All rights reserved / contracted.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
