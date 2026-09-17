import React from 'react';
import { SensorFusionScene } from '../3d/SensorFusionScene';
import { ArrowDown, Cpu, Layers, Sparkles } from 'lucide-react';

export const SensorFusionSection: React.FC = () => {
  return (
    <section id="sensor-fusion" className="py-16 md:py-24 bg-white border-t border-gray-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-orange-600 animate-pulse" />
              <span className="font-mono text-xs text-orange-600 font-semibold tracking-wider uppercase">
                NEURAL INTEGRATION ENGINE
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-950 tracking-tight">
              3D SENSOR FUSION AI CORE
            </h2>
            <p className="text-gray-600 text-sm sm:text-base max-w-2xl mt-1.5">
              No single sensor tells the whole truth. The fusion core synthesizes computer vision density, IR directional vectors, BLE dwell times, environmental stress, and acoustic decibel spikes into one authoritative crowd state.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="px-3 py-1 rounded-md bg-gray-50 border border-gray-200 text-gray-700">
              MULTIMODAL KALMAN & NEURAL FILTER
            </span>
          </div>
        </div>

        {/* 3D Sensor Fusion AI Core Scene */}
        <div className="mb-10">
          <SensorFusionScene />
        </div>

        {/* Fusion Convergence Pipeline Cards */}
        <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200/90 shadow-2xs">
          <div className="text-[11px] font-mono text-gray-400 uppercase tracking-wider mb-4">
            MATHEMATICAL FUSION TO ACTION PIPELINE
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-3 text-center font-mono">
            <div className="p-3.5 rounded-xl bg-white border border-gray-200 shadow-2xs">
              <span className="text-[10px] text-gray-400">INPUT 01</span>
              <div className="text-xs font-bold text-gray-900 mt-1">CAMERA CV</div>
              <span className="text-[10px] text-blue-600">Density & Flow</span>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-gray-200 shadow-2xs">
              <span className="text-[10px] text-gray-400">INPUT 02</span>
              <div className="text-xs font-bold text-gray-900 mt-1">IR / ToF</div>
              <span className="text-[10px] text-rose-600">Entry / Exit Tallies</span>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-gray-200 shadow-2xs">
              <span className="text-[10px] text-gray-400">INPUT 03</span>
              <div className="text-xs font-bold text-gray-900 mt-1">BLE SAFETY</div>
              <span className="text-[10px] text-purple-600">Zone Proximity</span>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-gray-200 shadow-2xs">
              <span className="text-[10px] text-gray-400">INPUT 04</span>
              <div className="text-xs font-bold text-gray-900 mt-1">BME280</div>
              <span className="text-[10px] text-emerald-600">Heat & Humidity</span>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-gray-200 shadow-2xs">
              <span className="text-[10px] text-gray-400">INPUT 05</span>
              <div className="text-xs font-bold text-gray-900 mt-1">ACOUSTIC</div>
              <span className="text-[10px] text-amber-600">Decibel Energy</span>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-gray-200 shadow-2xs">
              <span className="text-[10px] text-gray-400">OUTPUT</span>
              <div className="text-xs font-bold text-orange-600 mt-1">AI ACTION</div>
              <span className="text-[10px] text-gray-800">Dynamic Diversion</span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-gray-600 gap-3">
            <span>RESILIENCE BENEFIT: Sensor occlusion on optical cameras is compensated by ground IR beams and BLE beacon density.</span>
            <span className="text-orange-600 font-bold shrink-0">LATENCY: &lt; 250ms INFERENCE</span>
          </div>
        </div>
      </div>
    </section>
  );
};
