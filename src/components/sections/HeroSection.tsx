import React from 'react';
import { HeroKumbhScene } from '../3d/HeroKumbhScene';
import { useSimulation } from '../../context/SimulationContext';
import { Activity, ArrowRight, Play, Presentation, ShieldCheck } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { setCommandCenterOpen, setPresentationMode } = useSimulation();

  return (
    <section id="hero" className="relative pt-8 pb-16 md:pt-14 md:pb-24 overflow-hidden bg-tech-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Tagline */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-200/90 text-xs font-mono text-gray-700 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-600" />
            <span className="font-semibold text-gray-900">AI KUMBH</span>
            <span className="text-gray-400">|</span>
            <span>CONCEPTUAL AI + IoT PUBLIC SAFETY ARCHITECTURE</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] text-gray-500 uppercase tracking-wider">
              CORE PHILOSOPHY:
            </span>
            <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-gray-900">
              <span className="text-gray-900">SENSE.</span>
              <span className="text-gray-700">PREDICT.</span>
              <span className="text-orange-600">REDIRECT.</span>
              <span className="text-gray-900">PROTECT.</span>
            </div>
          </div>
        </div>

        {/* Hero Grid: Text & 3D Environment */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Hero Narrative */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <p className="font-mono text-xs text-orange-600 font-semibold tracking-widest uppercase">
                MILLIONS OF PEOPLE.
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-950 tracking-tight leading-[1.08]">
                ONE INTELLIGENT <br className="hidden sm:inline" />
                <span className="text-gray-900">SYSTEM.</span>
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed font-normal pt-2">
                A unified AI + IoT framework synchronizing computer vision, ESP32 edge nodes, IR checkpoints, acoustic sensors, and BLE safety wristbands to forecast crowd pressure before bottlenecks form.
              </p>
            </div>

            {/* Core Pipeline Diagram Mini */}
            <div className="p-4 rounded-xl bg-white border border-gray-200/90 shadow-2xs space-y-2">
              <div className="text-[10px] font-mono text-gray-400 tracking-wider">
                END-TO-END INTELLIGENCE PIPELINE
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono text-gray-700 font-medium overflow-x-auto pb-1">
                <span>PHYSICAL WORLD</span>
                <span className="text-gray-300">→</span>
                <span className="text-gray-900">IoT SENSORS</span>
                <span className="text-gray-300">→</span>
                <span className="text-orange-600">SENSOR FUSION</span>
                <span className="text-gray-300">→</span>
                <span className="text-gray-900">AI PREDICTION</span>
                <span className="text-gray-300">→</span>
                <span className="font-bold text-gray-950">REDIRECT & PROTECT</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setCommandCenterOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gray-950 text-white font-mono text-xs font-semibold tracking-wide hover:bg-orange-600 transition-all shadow-sm cursor-pointer"
              >
                <Activity className="w-4 h-4 text-orange-400" />
                <span>OPEN COMMAND CENTER</span>
              </button>

              <a
                href="#live-intelligence"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white text-gray-800 border border-gray-200 font-mono text-xs font-semibold hover:bg-gray-50 transition-colors shadow-2xs"
              >
                <span>EXPLORE MAP & DATA</span>
                <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
              </a>

              <button
                onClick={() => setPresentationMode(true)}
                className="inline-flex items-center gap-2 px-3.5 py-3 rounded-xl bg-gray-100 text-gray-700 hover:text-gray-950 hover:bg-gray-200 transition-colors font-mono text-xs font-medium cursor-pointer"
                title="Launch full 10-slide presentation"
              >
                <Presentation className="w-4 h-4 text-orange-600" />
                <span>SLIDES</span>
              </button>
            </div>

            {/* Prototype transparency notice */}
            <div className="pt-2 flex items-start gap-2 text-[11px] text-gray-500 font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-gray-400 shrink-0 mt-0.5" />
              <span>
                All crowd volumes, zone elevations, and telemetry feeds shown in this platform are simulated for demonstration.
              </span>
            </div>
          </div>

          {/* Right: 3D Kumbh Interactive Environment */}
          <div className="lg:col-span-7">
            <HeroKumbhScene />
          </div>
        </div>
      </div>
    </section>
  );
};
