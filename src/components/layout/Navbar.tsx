import React, { useState } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { Activity, AlertTriangle, ChevronRight, Menu, Presentation, Shield, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { systemStatus, setPresentationMode, setCommandCenterOpen } = useSimulation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'HOME', href: '#hero' },
    { label: 'LIVE INTELLIGENCE', href: '#live-intelligence' },
    { label: 'SMART MAP', href: '#smart-map' },
    { label: 'SENSORS', href: '#sensors' },
    { label: 'LOST PERSON', href: '#lost-person' },
    { label: 'EMERGENCY', href: '#emergency' },
    { label: 'AI PREDICTION', href: '#prediction' },
    { label: 'PRESENTATION', href: '#presentation', action: () => setPresentationMode(true) },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/85 backdrop-blur-md border-b border-gray-200/80 transition-all">
      {/* Top micro-banner: SIMULATION / DEMO DATA */}
      <div className="bg-gray-900 text-white text-[11px] font-mono py-1 px-4 text-center tracking-wider flex items-center justify-center gap-3">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
        <span>SIMULATION / DEMO DATA • ARCHITECTURAL PROTOTYPE</span>
        <span className="hidden md:inline text-gray-400">|</span>
        <span className="hidden md:inline text-gray-300">SENSE. PREDICT. REDIRECT. PROTECT.</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-gray-900 text-white flex items-center justify-center font-bold font-mono text-sm tracking-wider shadow-xs group-hover:bg-orange-600 transition-colors">
            AK
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold tracking-tight text-gray-950 text-base leading-tight">
              AI KUMBH
            </span>
            <span className="font-mono text-[9px] text-gray-400 tracking-widest uppercase">
              3D Intelligent Crowd System
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <nav className="hidden xl:flex items-center gap-6 text-[12px] font-mono tracking-wider text-gray-600">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                if (link.action) {
                  e.preventDefault();
                  link.action();
                }
              }}
              className="hover:text-gray-950 transition-colors py-1 relative group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-600 group-hover:w-full transition-all duration-200" />
            </a>
          ))}
        </nav>

        {/* Right CTA */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Status Indicator */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-50 border border-gray-200 text-xs font-mono">
            <span
              className={`w-2 h-2 rounded-full ${
                systemStatus === 'OPERATIONAL'
                  ? 'bg-emerald-500'
                  : systemStatus === 'WARNING'
                  ? 'bg-amber-500'
                  : 'bg-rose-500 animate-ping'
              }`}
            />
            <span className="text-gray-600 font-medium text-[11px]">{systemStatus}</span>
          </div>

          {/* Open Command Center Button */}
          <button
            onClick={() => setCommandCenterOpen(true)}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-gray-950 text-white text-xs font-mono font-semibold tracking-wide hover:bg-orange-600 transition-all shadow-xs cursor-pointer"
          >
            <Activity className="w-3.5 h-3.5 text-orange-400" />
            <span>OPEN COMMAND CENTER</span>
          </button>
        </div>

        {/* Mobile menu hamburger */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={() => setCommandCenterOpen(true)}
            className="p-2 rounded-md bg-gray-900 text-white text-xs font-mono"
            title="Open Command Center"
          >
            <Activity className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-md border border-gray-200 text-gray-700 hover:bg-gray-50"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white/98 border-b border-gray-200 px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <div className="flex items-center justify-between pb-2 border-b border-gray-100">
            <span className="font-mono text-xs text-gray-400">NAVIGATION MENU</span>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-gray-100 text-gray-600">
              STATUS: {systemStatus}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  if (link.action) {
                    e.preventDefault();
                    link.action();
                  }
                }}
                className="p-2.5 rounded-md bg-gray-50 hover:bg-orange-50 hover:text-orange-700 transition-colors flex items-center justify-between text-gray-700"
              >
                <span>{link.label}</span>
                <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
              </a>
            ))}
          </div>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              setCommandCenterOpen(true);
            }}
            className="w-full mt-3 py-2.5 rounded-lg bg-gray-900 text-white font-mono text-xs font-semibold flex items-center justify-center gap-2"
          >
            <Activity className="w-4 h-4 text-orange-400" />
            <span>OPEN COMMAND CENTER</span>
          </button>
        </div>
      )}
    </header>
  );
};
