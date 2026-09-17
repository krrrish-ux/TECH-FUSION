import React from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { Activity, ArrowUp, Heart, Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setPresentationMode, setCommandCenterOpen } = useSimulation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white border-t border-gray-200/90 text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-gray-100">
          
          {/* Col 1: Brand & Tagline */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gray-950 text-white flex items-center justify-center font-bold font-mono text-sm tracking-wider shadow-2xs">
                AK
              </div>
              <span className="font-extrabold text-gray-950 text-lg tracking-tight">
                AI KUMBH
              </span>
            </div>

            <div className="font-mono text-xs font-bold text-gray-900 tracking-wider">
              SENSE. PREDICT. REDIRECT. PROTECT.
            </div>

            <p className="text-xs text-gray-500 font-normal leading-relaxed max-w-sm">
              A conceptual 3D AI + IoT crowd-management and public-safety platform architected to safeguard mass gatherings through multi-sensor edge intelligence.
            </p>

            <div className="pt-2">
              <button
                onClick={() => setCommandCenterOpen(true)}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-gray-950 text-white text-xs font-mono font-semibold hover:bg-orange-600 transition-colors shadow-2xs cursor-pointer"
              >
                <Activity className="w-3.5 h-3.5 text-orange-400" />
                <span>OPEN COMMAND CENTER</span>
              </button>
            </div>
          </div>

          {/* Col 2: Navigation Map */}
          <div className="md:col-span-4 space-y-3 font-mono text-xs">
            <span className="font-bold text-gray-900 tracking-wider uppercase text-[11px] block">
              SYSTEM SECTIONS
            </span>
            <div className="grid grid-cols-2 gap-2 text-gray-600">
              <a href="#hero" className="hover:text-gray-950 transition-colors">HOME</a>
              <a href="#live-intelligence" className="hover:text-gray-950 transition-colors">LIVE INTELLIGENCE</a>
              <a href="#smart-map" className="hover:text-gray-950 transition-colors">3D SMART MAP</a>
              <a href="#sensors" className="hover:text-gray-950 transition-colors">SENSING LAYER</a>
              <a href="#sensor-fusion" className="hover:text-gray-950 transition-colors">SENSOR FUSION</a>
              <a href="#lost-person" className="hover:text-gray-950 transition-colors">LOST PERSON</a>
              <a href="#emergency" className="hover:text-gray-950 transition-colors">EMERGENCY</a>
              <a href="#prediction" className="hover:text-gray-950 transition-colors">AI PREDICTION</a>
              <button
                onClick={() => setPresentationMode(true)}
                className="text-left hover:text-orange-600 transition-colors font-bold text-gray-900"
              >
                SLIDES (10)
              </button>
            </div>
          </div>

          {/* Col 3: Ethical & Technical Mandates */}
          <div className="md:col-span-3 space-y-3 font-mono text-xs">
            <span className="font-bold text-gray-900 tracking-wider uppercase text-[11px] block">
              CORE PRINCIPLES
            </span>
            <div className="space-y-2 text-gray-500 text-[11px] font-sans">
              <p>• Edge computing prioritizes privacy over centralized video recording.</p>
              <p>• Multi-sensor verification prevents false panic alarms.</p>
              <p>• AI recommendations remain strictly decision-support for human commanders.</p>
            </div>
          </div>
        </div>

        {/* Prototype Transparency Notice */}
        <div className="pt-8 pb-6 text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-800 text-[11px] font-mono font-semibold">
            <Shield className="w-3.5 h-3.5" />
            <span>ARCHITECTURAL PROTOTYPE NOTICE</span>
          </div>

          <p className="text-xs text-gray-500 leading-relaxed font-sans">
            This website demonstrates a conceptual AI + IoT architecture. Sensor readings, crowd counts, predictions, locations, and emergency events shown here are simulated for demonstration purposes.
          </p>
        </div>

        {/* Bottom Line */}
        <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-400">
          <div>
            © {new Date().getFullYear()} AI KUMBH — 3D INTELLIGENT CROWD MANAGEMENT SYSTEM
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-gray-900 transition-colors cursor-pointer"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
