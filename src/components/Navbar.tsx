import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Radio } from 'lucide-react';
import { NAV_LINKS, JOIN_HUB_URL, ANNOUNCEMENT } from '../siteData.js';

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleNavClick = (href: string) => {
    setDrawerOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/10"
      style={{
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        backgroundColor: 'rgba(2, 2, 8, 0.7)',
      }}
    >
      {/* ── Announcement banner — renders only if ANNOUNCEMENT is set ── */}
      {ANNOUNCEMENT && (
        <div
          className="flex items-center justify-center gap-2 px-4 py-1.5 border-b border-cyan-500/15"
          style={{ background: 'rgba(0,212,255,0.04)' }}
        >
          <Radio
            size={11}
            className="text-neon-cyan flex-shrink-0 animate-pulse"
            strokeWidth={2}
          />
          <p className="font-heading text-[11px] tracking-[0.22em] uppercase text-neon-cyan/70 truncate">
            {ANNOUNCEMENT}
          </p>
          <Radio
            size={11}
            className="text-neon-cyan flex-shrink-0 animate-pulse"
            strokeWidth={2}
          />
        </div>
      )}

      {/* ── Main nav row ── */}
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#home');
          }}
          className="flex items-center gap-2.5 font-heading font-bold text-base tracking-[0.15em] text-white hover:text-neon-cyan transition-colors duration-300"
        >
          {/* Logo container — supports image overlay with fallback styling */}
          <div className="w-7 h-7 rounded-full border border-white/10 bg-white/5 flex items-center justify-center overflow-hidden flex-shrink-0 relative">
            <img 
              src="" // In the future, set this to the logo path (e.g. "/logo.png")
              alt="PAC Logo" 
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
              onError={(e) => {
                e.currentTarget.style.opacity = '0';
              }}
              onLoad={(e) => {
                e.currentTarget.style.opacity = '1';
              }}
              style={{ opacity: 0 }}
            />
            {/* Fallback space-gradient letter */}
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-cyan-500/20 to-purple-500/20 text-[10px] font-bold text-white/90">
              P
            </div>
          </div>
          PAC
        </a>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="font-heading text-[10px] font-bold tracking-[0.2em] uppercase text-white/60 hover:text-neon-cyan transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {/* JOIN THE HUB — only renders if JOIN_HUB_URL is set */}
          {JOIN_HUB_URL && (
            <a
              href={JOIN_HUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center font-heading font-bold text-[10px] tracking-[0.18em] uppercase text-cyan-400 px-4 py-1.5 rounded-sm border border-cyan-500/40 transition-all duration-300 ease-in-out hover:bg-cyan-500/15 hover:border-cyan-400/70 hover:shadow-[0_0_15px_rgba(6,182,212,0.5)]"
            >
              Join the Mission
            </a>
          )}

          {/* Mobile toggle */}
          <button
            className="md:hidden text-white/70 hover:text-neon-cyan transition-colors"
            onClick={() => setDrawerOpen(!drawerOpen)}
            aria-label="Toggle menu"
          >
            {drawerOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* ── Mobile drawer — top-full adapts to nav height (banner present or not) ── */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden absolute top-full left-0 right-0 border-b border-white/10 overflow-hidden"
            style={{
              backgroundColor: 'rgba(2, 2, 8, 0.95)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <div className="flex flex-col py-4 px-6 gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="font-heading py-3 text-[11px] font-semibold tracking-[0.2em] uppercase text-white/60 hover:text-neon-cyan transition-colors duration-300 border-b border-white/5 last:border-0"
                >
                  {link.label}
                </a>
              ))}
              {/* JOIN THE HUB — mobile, only renders if URL is set */}
              {JOIN_HUB_URL && (
                <a
                  href={JOIN_HUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 font-heading font-bold text-[11px] tracking-[0.18em] uppercase text-cyan-400 px-4 py-3 rounded-sm border border-cyan-500/40 text-center transition-all duration-300 ease-in-out hover:bg-cyan-500/15 hover:border-cyan-400/70"
                >
                  Join the Mission
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
