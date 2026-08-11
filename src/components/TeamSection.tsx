import { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { Linkedin, Mail, Github } from 'lucide-react';
import {
  FACULTY as _FACULTY,
  COORDINATORS as _COORDINATORS,
  CORE_OPS as _CORE_OPS,
  GENERAL_MEMBERS as _GENERAL_MEMBERS,
} from '../siteData.js';

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */
type RingTier = 'cyan' | 'green' | 'muted';

interface MemberLinks {
  linkedin?: string;
  email?: string;
  github?: string;
}

interface TeamMember {
  id: number;
  name: string;
  role: string;
  avatar?: string;
  ring: RingTier;
  tag?: string;
  links?: MemberLinks;
}

function getInitials(name: string): string {
  const parts = name.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function MemberAvatar({ member }: { member: TeamMember }) {
  const [imageFailed, setImageFailed] = useState(false);
  const hasAvatar = !!member.avatar?.trim() && !imageFailed;

  if (!hasAvatar) {
    return (
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center font-heading font-bold text-base tracking-[0.06em] text-white/90"
        style={{
          ...RING_STYLES[member.ring],
          background:
            member.ring === 'cyan'
              ? 'rgba(0,212,255,0.12)'
              : member.ring === 'green'
                ? 'rgba(0,255,148,0.12)'
                : 'rgba(255,255,255,0.08)',
        }}
        aria-label={member.name}
      >
        {getInitials(member.name)}
      </div>
    );
  }

  return (
    <img
      src={member.avatar}
      alt={member.name}
      className="w-16 h-16 rounded-full object-cover object-center"
      style={RING_STYLES[member.ring]}
      onError={() => setImageFailed(true)}
    />
  );
}

const FACULTY = _FACULTY as TeamMember[];
const COORDINATORS = _COORDINATORS as TeamMember[];
const CORE_OPS = _CORE_OPS as TeamMember[];
const GENERAL_MEMBERS = _GENERAL_MEMBERS as TeamMember[];

/* ─────────────────────────────────────────────
   Ring glow styles per tier
───────────────────────────────────────────── */
const RING_STYLES: Record<RingTier, React.CSSProperties> = {
  cyan: {
    boxShadow:
      '0 0 0 2.5px rgba(0,212,255,0.55), 0 0 18px rgba(0,212,255,0.25)',
  },
  green: {
    boxShadow:
      '0 0 0 2.5px rgba(0,255,148,0.55), 0 0 18px rgba(0,255,148,0.22)',
  },
  muted: {
    boxShadow: '0 0 0 1.5px rgba(255,255,255,0.14)',
  },
};

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

const cardReveal: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: 'easeOut', delay },
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
      className="flex items-center justify-center w-full mb-16"
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
   Sub-section label row
───────────────────────────────────────────── */
function SubHeader({ label, index }: { label: string; index: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className="flex items-center gap-3 mb-5"
    >
      <span
        className="font-heading text-[12px] font-bold tracking-[0.2em] text-neon-cyan"
        style={{ textShadow: '0 0 8px rgba(0,212,255,0.6)' }}
      >
        {index}
      </span>
      <div className="w-px h-4 bg-white/15" />
      <span className="font-heading text-sm font-semibold tracking-[0.2em] uppercase text-white/50">
        {label}
      </span>
      <div className="flex-1 h-px bg-white/[0.06]" />
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Horizontal member card
───────────────────────────────────────────── */
function MemberCard({ member, delay }: { member: TeamMember; delay: number }) {
  const hasLinks =
    !!member.links?.linkedin || !!member.links?.github || !!member.links?.email;

  return (
    <motion.div
      custom={delay}
      variants={cardReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-30px' }}
      whileHover={{
        borderColor:
          member.ring === 'cyan'
            ? 'rgba(0,212,255,0.35)'
            : member.ring === 'green'
              ? 'rgba(0,255,148,0.35)'
              : 'rgba(255,255,255,0.15)',
        background: 'rgba(255,255,255,0.06)',
      }}
      className="flex h-full w-full max-w-[350px] mx-auto min-h-[6.5rem] items-center gap-4 p-3 rounded-xl transition-colors duration-300"
      style={{
        background: 'rgba(255,255,255,0.035)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      {/* ── Circular avatar or initials fallback ── */}
      <div className="flex-shrink-0 self-start">
        <MemberAvatar member={member} />
      </div>

      {/* ── Info block ── */}
      <div className="flex flex-1 flex-col min-w-0 min-h-[4.75rem] justify-between">
        <div>
          <div className="flex items-start gap-2 min-w-0">
            <p
              className="font-heading font-bold text-base tracking-[0.06em] text-white leading-tight truncate flex-1 min-w-0"
              title={member.name}
            >
              {member.name}
            </p>
            {member.tag && (
              <span
                className="font-heading text-[9px] font-bold tracking-[0.15em] uppercase px-1.5 py-0.5 rounded-sm flex-shrink-0 max-w-[4.5rem] truncate"
                style={{
                  background: 'rgba(0,212,255,0.12)',
                  color: 'rgba(0,212,255,0.9)',
                  border: '1px solid rgba(0,212,255,0.25)',
                }}
                title={member.tag}
              >
                {member.tag}
              </span>
            )}
          </div>
          <p
            className="font-heading text-[13px] tracking-[0.07em] text-white/45 mt-0.5 leading-snug line-clamp-2 min-h-[2rem]"
            title={member.role}
          >
            {member.role}
          </p>
        </div>

        {/* ── Contact icons — fixed height slot keeps all cards equal ── */}
        <div className="flex items-center gap-2 mt-1 min-h-[1.5rem]">
          {hasLinks && member.links && (
            <>
              {member.links.linkedin && (
                <a
                  href={member.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-6 h-6 rounded-full border border-white/10 bg-white/5 text-white/40 hover:text-neon-cyan hover:bg-neon-cyan/10 hover:border-neon-cyan/30 transition-all duration-300 hover:shadow-[0_0_8px_rgba(0,212,255,0.2)]"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={12} strokeWidth={2} />
                </a>
              )}

              {member.links.github && (
                <a
                  href={member.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-6 h-6 rounded-full border border-white/10 bg-white/5 text-white/40 hover:text-neon-cyan hover:bg-neon-cyan/10 hover:border-neon-cyan/30 transition-all duration-300 hover:shadow-[0_0_8px_rgba(0,212,255,0.2)]"
                  aria-label="GitHub"
                >
                  <Github size={12} strokeWidth={2} />
                </a>
              )}

              {member.links.email && (
                <a
                  href={`mailto:${member.links.email}`}
                  className="flex items-center justify-center w-6 h-6 rounded-full border border-white/10 bg-white/5 text-white/40 hover:text-neon-cyan hover:bg-neon-cyan/10 hover:border-neon-cyan/30 transition-all duration-300 hover:shadow-[0_0_8px_rgba(0,212,255,0.2)]"
                  aria-label="Email"
                >
                  <Mail size={12} strokeWidth={2} />
                </a>
              )}
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Grid wrapper helpers
───────────────────────────────────────────── */
const MEMBER_GRID_COLS = 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';

function MemberGrid({
  members,
  startDelay = 0,
}: {
  members: TeamMember[];
  startDelay?: number;
}) {
  return (
    <div className={`grid ${MEMBER_GRID_COLS} gap-3 mb-14 auto-rows-fr`}>
      {members.map((member, idx) => (
        <MemberCard key={member.id} member={member} delay={startDelay + idx * 0.07} />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Section export
───────────────────────────────────────────── */
export default function TeamSection() {
  return (
    <section id="team" className="relative py-28 px-6 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(0,212,255,0.03) 0%, transparent 65%)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        <SectionHeader label="Command Crew" />

        <SubHeader index="01" label="Faculty Coordinator" />
        <MemberGrid members={FACULTY} startDelay={0} />

        <SubHeader index="02" label="Student Representative Leads" />
        <MemberGrid members={COORDINATORS} startDelay={0} />

        <SubHeader index="03" label="Core Operations & Web Dev" />
        <MemberGrid members={CORE_OPS} startDelay={0} />

        <SubHeader index="04" label="Active Core Members" />
        <MemberGrid members={GENERAL_MEMBERS} startDelay={0} />
      </div>
    </section>
  );
}
