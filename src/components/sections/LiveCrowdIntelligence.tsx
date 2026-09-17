import React from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { DensityMapScene } from '../3d/DensityMapScene';
import { AlertTriangle, CheckCircle2, ShieldAlert, Users, Radio, MapPin } from 'lucide-react';

export const LiveCrowdIntelligence: React.FC = () => {
  const {
    totalCrowd,
    activeZonesCount,
    highDensityZonesCount,
    sensorNodeCount,
    systemStatus,
    triggerEmergency,
    resetEmergency,
    isEmergencyActive,
  } = useSimulation();

  return (
    <section id="live-intelligence" className="py-16 md:py-24 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-orange-600 animate-pulse" />
              <span className="font-mono text-xs text-orange-600 font-semibold tracking-wider uppercase">
                TELEMETRY & SPATIAL DENSITY
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-950 tracking-tight">
              LIVE CROWD INTELLIGENCE
            </h2>
            <p className="text-gray-600 text-sm sm:text-base max-w-2xl mt-1.5">
              Topological terrain elevation where Z-axis height physically represents zone crowd density.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-md bg-white border border-gray-200 text-orange-700 font-mono text-xs font-semibold shadow-2xs">
              SIMULATION / DEMO DATA
            </span>
            {isEmergencyActive ? (
              <button
                onClick={resetEmergency}
                className="px-3 py-1.5 rounded-lg bg-gray-900 text-white font-mono text-xs font-semibold hover:bg-gray-800 transition-colors shadow-2xs"
              >
                RESET SURGE
              </button>
            ) : (
              <button
                onClick={triggerEmergency}
                className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-700 border border-rose-200 font-mono text-xs font-semibold hover:bg-rose-100 transition-colors shadow-2xs"
              >
                SIMULATE CROWD SURGE
              </button>
            )}
          </div>
        </div>

        {/* 5 High-Impact Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5 mb-8">
          <div className="p-4 rounded-xl bg-white border border-gray-200/90 shadow-2xs">
            <div className="flex items-center justify-between text-gray-400 mb-1">
              <span className="font-mono text-[10px] tracking-wider uppercase">TOTAL CROWD</span>
              <Users className="w-3.5 h-3.5 text-gray-400" />
            </div>
            <div className="font-mono text-2xl font-extrabold text-gray-950">
              {totalCrowd.toLocaleString()}
            </div>
            <span className="text-[10px] font-mono text-gray-400">ESTIMATED PILGRIMS</span>
          </div>

          <div className="p-4 rounded-xl bg-white border border-gray-200/90 shadow-2xs">
            <div className="flex items-center justify-between text-gray-400 mb-1">
              <span className="font-mono text-[10px] tracking-wider uppercase">ACTIVE ZONES</span>
              <MapPin className="w-3.5 h-3.5 text-gray-400" />
            </div>
            <div className="font-mono text-2xl font-extrabold text-gray-950">
              0{activeZonesCount}
            </div>
            <span className="text-[10px] font-mono text-gray-400">MONITORED SECTORS</span>
          </div>

          <div className="p-4 rounded-xl bg-white border border-gray-200/90 shadow-2xs">
            <div className="flex items-center justify-between text-gray-400 mb-1">
              <span className="font-mono text-[10px] tracking-wider uppercase">HIGH-DENSITY ZONES</span>
              <AlertTriangle className="w-3.5 h-3.5 text-orange-500" />
            </div>
            <div className="font-mono text-2xl font-extrabold text-orange-600">
              0{highDensityZonesCount}
            </div>
            <span className="text-[10px] font-mono text-gray-400">ELEVATION ELEVATED</span>
          </div>

          <div className="p-4 rounded-xl bg-white border border-gray-200/90 shadow-2xs">
            <div className="flex items-center justify-between text-gray-400 mb-1">
              <span className="font-mono text-[10px] tracking-wider uppercase">SENSOR NODES</span>
              <Radio className="w-3.5 h-3.5 text-gray-400" />
            </div>
            <div className="font-mono text-2xl font-extrabold text-gray-950">
              {sensorNodeCount}
            </div>
            <span className="text-[10px] font-mono text-gray-400">MESH TELEMETRY</span>
          </div>

          <div className="col-span-2 md:col-span-1 p-4 rounded-xl bg-white border border-gray-200/90 shadow-2xs">
            <div className="flex items-center justify-between text-gray-400 mb-1">
              <span className="font-mono text-[10px] tracking-wider uppercase">SYSTEM STATUS</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            </div>
            <div className="font-mono text-base font-extrabold text-gray-950 truncate">
              {systemStatus}
            </div>
            <span className="text-[10px] font-mono text-emerald-600">PREDICTIVE STABLE</span>
          </div>
        </div>

        {/* 3D Crowd Density Elevation Scene */}
        <div className="mb-6">
          <DensityMapScene />
        </div>

        {/* Elevation Mapping Legend Bar */}
        <div className="p-4 rounded-xl bg-white border border-gray-200/90 shadow-2xs flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-2 text-gray-700">
            <span className="font-bold text-gray-900">TERRAIN ELEVATION CODING:</span>
          </div>
          <div className="flex flex-wrap items-center gap-4 sm:gap-8">
            <div className="flex items-center gap-2">
              <span className="w-3 h-2 rounded bg-gray-200" />
              <span className="text-gray-600">LOW DENSITY (&lt;50%)</span>
              <span className="text-gray-400 text-[10px]">→ Flat</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-gray-400" />
              <span className="text-gray-600">MEDIUM (50–75%)</span>
              <span className="text-gray-400 text-[10px]">→ Medium height</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-4 rounded bg-orange-500" />
              <span className="text-gray-600">HIGH (75–85%)</span>
              <span className="text-gray-400 text-[10px]">→ Elevated</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-5 rounded bg-rose-600" />
              <span className="text-rose-700 font-bold">CRITICAL (&gt;85%)</span>
              <span className="text-rose-500 text-[10px]">→ Maximum Elevation</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
