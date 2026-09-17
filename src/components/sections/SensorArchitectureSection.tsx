import React, { useState } from 'react';
import { Esp32NodeScene } from '../3d/Esp32NodeScene';
import { Camera, CheckCircle2, Cpu, Eye, Gauge, Radio, Thermometer, Volume2, Waves } from 'lucide-react';

export const SensorArchitectureSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ALL' | 'CAMERA' | 'IR_TOF' | 'ESP32' | 'BME280' | 'ACOUSTIC'>('ALL');
  const [irSimulatedTally, setIrSimulatedTally] = useState({ entry: 1240, exit: 860 });
  const [isBeamTriggered, setIsBeamTriggered] = useState(false);

  const triggerIrBeam = () => {
    setIsBeamTriggered(true);
    setIrSimulatedTally((prev) => ({ ...prev, entry: prev.entry + 1 }));
    setTimeout(() => setIsBeamTriggered(false), 800);
  };

  return (
    <section id="sensors" className="py-16 md:py-24 bg-[#FAFAFA] border-t border-gray-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12">
          <span className="font-mono text-xs text-orange-600 font-semibold tracking-wider uppercase">
            PHYSICAL-TO-DIGITAL SENSING INFRASTRUCTURE
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-950 tracking-tight mt-1">
            THE SENSING LAYER
          </h2>
          <p className="text-gray-600 text-base max-w-2xl mt-1 italic">
            "Turning the physical crowd into real-time data."
          </p>
          <div className="mt-3 inline-block px-2.5 py-1 rounded bg-white border border-gray-200 text-gray-500 font-mono text-xs">
            SIMULATION / DEMO DATA • INDEPENDENT TELEMETRY BUSES
          </div>
        </div>

        {/* 1. Camera Computer Vision & IR/ToF Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          
          {/* CAMERA: Computer Vision */}
          <div className="p-6 rounded-2xl bg-white border border-gray-200/90 shadow-2xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-600">
                  <Camera className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-base">COMPUTER VISION CAMERA</h3>
                  <span className="font-mono text-[10px] text-gray-400">EDGE INFERENCE OPTICAL SENSOR</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-mono text-[10px] font-semibold border border-emerald-200">
                ACTIVE
              </span>
            </div>

            {/* Pipeline Flow */}
            <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200/80">
              <div className="text-[10px] font-mono text-gray-400 mb-1.5 uppercase">CV PROCESSING PIPELINE</div>
              <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-mono font-medium text-gray-700">
                <span className="bg-white px-2 py-1 rounded border border-gray-200">CAMERA</span>
                <span className="text-gray-400">→</span>
                <span className="bg-white px-2 py-1 rounded border border-gray-200">COMPUTER VISION</span>
                <span className="text-gray-400">→</span>
                <span className="bg-white px-2 py-1 rounded border border-gray-200">PERSON DETECTION</span>
                <span className="text-gray-400">→</span>
                <span className="bg-white px-2 py-1 rounded border border-gray-200">DENSITY ESTIMATION</span>
                <span className="text-gray-400">→</span>
                <span className="bg-orange-50 text-orange-700 px-2 py-1 rounded border border-orange-200">MOVEMENT ANALYSIS</span>
              </div>
            </div>

            {/* Simulated CV Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                <span className="font-mono text-[10px] text-gray-400 uppercase">PEOPLE DETECTED</span>
                <div className="font-mono text-2xl font-bold text-gray-950 mt-1">1,842</div>
                <span className="text-[10px] font-mono text-gray-500">BOUNDING BOXES / FRAME</span>
              </div>
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                <span className="font-mono text-[10px] text-gray-400 uppercase">DENSITY INDEX</span>
                <div className="font-mono text-2xl font-bold text-orange-600 mt-1">HIGH</div>
                <span className="text-[10px] font-mono text-gray-500">3.8 PERSONS / M²</span>
              </div>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed font-normal">
              Edge convolutional networks process video streams locally on camera enclosures, transmitting only aggregated headcount bounding vectors and spatial optical flow velocities rather than raw video feeds, preserving pilgrim privacy.
            </p>
          </div>

          {/* IR / ToF SENSOR */}
          <div className="p-6 rounded-2xl bg-white border border-gray-200/90 shadow-2xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-600">
                  <Waves className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-base">IR / ToF CHECKPOINT SENSOR</h3>
                  <span className="font-mono text-[10px] text-gray-400">DIRECTIONAL BEAM BREAK & TIME-OF-FLIGHT</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-mono text-[10px] font-semibold border border-emerald-200">
                ONLINE
              </span>
            </div>

            {/* Interactive Beam Break Trigger Simulation */}
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200/80 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-gray-500">INTERACTIVE CHECKPOINT GATE:</span>
                <button
                  onClick={triggerIrBeam}
                  className="px-3 py-1 rounded bg-gray-900 text-white font-mono text-[11px] font-semibold hover:bg-orange-600 transition-colors cursor-pointer"
                >
                  SIMULATE PERSON CROSSING
                </button>
              </div>

              {/* Graphic beam corridor */}
              <div className="relative h-12 bg-white rounded-lg border border-gray-200 flex items-center justify-between px-6 overflow-hidden">
                <div className="w-3 h-8 bg-gray-800 rounded-xs" />
                <div className={`flex-1 h-0.5 mx-2 transition-all duration-300 ${isBeamTriggered ? 'bg-rose-600 h-1 shadow-xs' : 'bg-rose-400'}`} />
                <div className="w-3 h-8 bg-gray-800 rounded-xs" />
                {isBeamTriggered && (
                  <span className="absolute inset-0 bg-rose-50/70 flex items-center justify-center font-mono text-xs font-bold text-rose-700">
                    IR BEAM INTERRUPTED → ENTRY RECORDED (+1)
                  </span>
                )}
              </div>
            </div>

            {/* Tally Cards */}
            <div className="grid grid-cols-3 gap-3 font-mono text-center">
              <div className="p-3 rounded-xl bg-gray-50 border border-gray-200">
                <span className="text-[10px] text-gray-400">ENTRY</span>
                <div className="text-lg font-bold text-emerald-600 mt-0.5">+{irSimulatedTally.entry}</div>
              </div>
              <div className="p-3 rounded-xl bg-gray-50 border border-gray-200">
                <span className="text-[10px] text-gray-400">EXIT</span>
                <div className="text-lg font-bold text-rose-600 mt-0.5">-{irSimulatedTally.exit}</div>
              </div>
              <div className="p-3 rounded-xl bg-gray-50 border border-gray-200">
                <span className="text-[10px] text-gray-400">NET FLOW</span>
                <div className="text-lg font-bold text-gray-950 mt-0.5">
                  +{irSimulatedTally.entry - irSimulatedTally.exit}
                </div>
              </div>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed font-normal">
              IR beam-break and Time-of-Flight (ToF) distance sensors assist with controlled checkpoint entry/exit counting. Dual-beam sequencing establishes transit direction with low latency and zero privacy intrusion.
            </p>
          </div>
        </div>

        {/* 2. ESP32 Edge Node 3D Interactive Environment */}
        <div className="mb-12">
          <div className="mb-4">
            <span className="font-mono text-xs text-orange-600 font-semibold tracking-wider uppercase">
              DISTRIBUTED EDGE HARDWARE
            </span>
            <h3 className="text-2xl font-bold text-gray-950 mt-0.5">
              ESP32 IoT SENSOR NODE ARCHITECTURE
            </h3>
            <p className="text-gray-600 text-sm max-w-2xl mt-1">
              Low-power microcontrollers aggregating daughter sensors over I2C, SPI, and UART, broadcasting telemetry packets via LoRaWAN and Wi-Fi mesh to central gateways.
            </p>
          </div>
          <Esp32NodeScene />
        </div>

        {/* 3. BME280 & Acoustic Sensor with Technical Honesty */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* BME280 Environment Monitoring */}
          <div className="p-6 rounded-2xl bg-white border border-gray-200/90 shadow-2xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600">
                  <Thermometer className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-base">BME280 ENVIRONMENTAL SENSING</h3>
                  <span className="font-mono text-[10px] text-gray-400">MICRO-CLIMATE & HEAT STRESS PROFILING</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-mono text-[10px] font-semibold border border-emerald-200">
                CALIBRATED
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 font-mono text-center">
              <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200">
                <span className="text-[10px] text-gray-400">TEMPERATURE</span>
                <div className="text-xl font-bold text-gray-900 mt-1">32.4°C</div>
                <span className="text-[9px] text-gray-500">AMBIENT</span>
              </div>
              <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200">
                <span className="text-[10px] text-gray-400">HUMIDITY</span>
                <div className="text-xl font-bold text-gray-900 mt-1">61%</div>
                <span className="text-[9px] text-gray-500">RELATIVE</span>
              </div>
              <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200">
                <span className="text-[10px] text-gray-400">PRESSURE</span>
                <div className="text-xl font-bold text-gray-900 mt-1">1004 hPa</div>
                <span className="text-[9px] text-gray-500">BAROMETRIC</span>
              </div>
            </div>

            {/* Technical Honesty Disclaimer */}
            <div className="p-4 rounded-xl bg-orange-50/70 border border-orange-200 text-xs font-mono text-orange-900 space-y-1">
              <div className="font-bold flex items-center gap-1.5">
                <span>TECHNICAL CLARITY & SCIENTIFIC HONESTY:</span>
              </div>
              <p className="leading-relaxed">
                BME280 measures temperature, humidity and atmospheric pressure. These measurements provide environmental context alongside crowd information (such as heat index risk and dehydration probability). <strong>BME280 does NOT measure crowd population.</strong>
              </p>
            </div>
          </div>

          {/* Acoustic Sensor */}
          <div className="p-6 rounded-2xl bg-white border border-gray-200/90 shadow-2xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-600">
                  <Volume2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-base">ACOUSTIC SOUND LEVEL TRANSDUCER</h3>
                  <span className="font-mono text-[10px] text-gray-400">DECIBEL PRESSURE & ANOMALOUS SURGE AUDIO</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-mono text-[10px] font-semibold border border-emerald-200">
                SAMPLING
              </span>
            </div>

            {/* Sound Wave Animation Visualizer */}
            <div className="p-4 rounded-xl bg-gray-900 text-white font-mono space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">SOUND LEVEL:</span>
                <span className="text-orange-400 font-bold text-sm">78 dB</span>
                <span className="text-gray-400">ACTIVITY:</span>
                <span className="text-emerald-400 font-bold text-sm">HIGH</span>
              </div>

              {/* Animated waveform bars */}
              <div className="flex items-end justify-between h-14 gap-1 pt-2">
                {[40, 65, 80, 55, 90, 75, 60, 85, 95, 70, 60, 88, 72, 84, 50, 65, 78, 92, 80, 60].map(
                  (val, idx) => (
                    <div
                      key={idx}
                      className="w-full bg-orange-500 rounded-xs transition-all duration-300"
                      style={{ height: `${val}%`, opacity: 0.5 + (val / 100) * 0.5 }}
                    />
                  )
                )}
              </div>
            </div>

            {/* Technical Honesty Disclaimer */}
            <div className="p-4 rounded-xl bg-orange-50/70 border border-orange-200 text-xs font-mono text-orange-900 space-y-1">
              <div className="font-bold flex items-center gap-1.5">
                <span>TECHNICAL CLARITY & SCIENTIFIC HONESTY:</span>
              </div>
              <p className="leading-relaxed">
                Sound level is a supplementary activity signal and cannot reliably determine exact crowd population by itself. Ambient chants, river sounds, and PA announcements require acoustic band-filtering before serving as anomalous surge indicators.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
