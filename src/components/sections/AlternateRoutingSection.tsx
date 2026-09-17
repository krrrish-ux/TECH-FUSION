import React from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { AlternateRouteScene } from '../3d/AlternateRouteScene';
import { ArrowRight, GitFork, ShieldCheck, Shuffle } from 'lucide-react';

export const AlternateRoutingSection: React.FC = () => {
  const { isAlternateRouteActive, toggleAlternateRouting } = useSimulation();

  return (
    <section id="smart-map" className="py-16 md:py-24 bg-white border-t border-gray-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="font-mono text-xs text-orange-600 font-semibold tracking-wider uppercase">
              DYNAMIC FLOW REGULATION
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-950 tracking-tight mt-1">
              SMART ALTERNATE ROUTING
            </h2>
            <p className="text-gray-600 text-sm sm:text-base max-w-2xl mt-1.5">
              Automated bifurcation of inbound pilgrim queues. When Sector 12 exceeds density thresholds, digital advisory boards divert 30% of foot traffic to bypass Corridor B and Gate C.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="px-3 py-1 rounded-md bg-orange-50 border border-orange-200 text-orange-700 font-semibold">
              SIMULATED ROUTING
            </span>
          </div>
        </div>

        {/* Comparison Route Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 font-mono">
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
            <div className="flex items-center justify-between text-xs pb-2 border-b border-gray-200">
              <span className="text-gray-500 uppercase">PRIMARY CHOKEPOINT ARTERY</span>
              <span className="text-gray-900 font-bold">
                {isAlternateRouteActive ? '70% LOAD' : '100% CONGESTION'}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-3 text-sm font-semibold text-gray-900">
              <span>SECTOR 12 STAGING</span>
              <ArrowRight className="w-4 h-4 text-gray-400" />
              <span>MAIN GHAT WALKWAY</span>
              <ArrowRight className="w-4 h-4 text-gray-400" />
              <span className="text-rose-600">MAIN GATE</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-orange-50/50 border border-orange-200">
            <div className="flex items-center justify-between text-xs pb-2 border-b border-orange-200/80">
              <span className="text-orange-800 uppercase">INTELLIGENT BYPASS CORRIDOR</span>
              <span className="text-orange-700 font-bold">
                {isAlternateRouteActive ? '30% DIVERTED' : 'STANDBY MODE'}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-3 text-sm font-semibold text-gray-900">
              <span>SECTOR 12 STAGING</span>
              <ArrowRight className="w-4 h-4 text-orange-400" />
              <span className="text-orange-700">ROUTE B BYPASS</span>
              <ArrowRight className="w-4 h-4 text-orange-400" />
              <span className="text-emerald-700">GATE C TRANSIT</span>
            </div>
          </div>
        </div>

        {/* 3D Flow Splitting Scene */}
        <div className="mb-6">
          <AlternateRouteScene />
        </div>

        {/* Route Decision Support Footer */}
        <div className="p-4 rounded-xl bg-gray-50 border border-gray-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-gray-600">
          <div className="flex items-center gap-2">
            <GitFork className="w-4 h-4 text-orange-600 shrink-0" />
            <span>
              DECISION SUPPORT PROTOCOL: Advisories communicate diversion through LED signage and volunteer personnel.
            </span>
          </div>
          <button
            onClick={toggleAlternateRouting}
            className="px-4 py-2 rounded-lg bg-gray-900 text-white font-mono text-xs font-semibold hover:bg-orange-600 transition-colors cursor-pointer shrink-0"
          >
            {isAlternateRouteActive ? 'RESTORE 100% DEFAULT FLOW' : 'DIVERT 30% OF INFLOW NOW'}
          </button>
        </div>
      </div>
    </section>
  );
};
