import React, { useState } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { Camera, Cpu, Radio, Thermometer, Volume2, Waves } from 'lucide-react';

export const SensorNetworkIntro: React.FC = () => {
  const { sensorNodes, activeHoveredSensor, setActiveHoveredSensor } = useSimulation();
  const [selectedSensorId, setSelectedSensorId] = useState<string>('CAM-01');

  const getIcon = (type: string) => {
    switch (type) {
      case 'CAMERA': return <Camera className="w-4 h-4 text-blue-600" />;
      case 'IR_TOF': return <Waves className="w-4 h-4 text-rose-600" />;
      case 'ESP32': return <Cpu className="w-4 h-4 text-gray-800" />;
      case 'BLE': return <Radio className="w-4 h-4 text-purple-600" />;
      case 'BME280': return <Thermometer className="w-4 h-4 text-emerald-600" />;
      case 'ACOUSTIC': return <Volume2 className="w-4 h-4 text-amber-600" />;
      default: return <Cpu className="w-4 h-4" />;
    }
  };

  const activeSensor = sensorNodes.find((s) => s.id === (activeHoveredSensor || selectedSensorId)) || sensorNodes[0];

  return (
    <section id="sensors-intro" className="py-16 md:py-24 bg-white border-y border-gray-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="font-mono text-xs text-orange-600 font-semibold tracking-wider uppercase">
              3D SENSOR NETWORK INTRO
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-950 tracking-tight mt-1">
              THE CROWD BECOMES DATA.
            </h2>
            <p className="text-gray-600 text-sm sm:text-base max-w-2xl mt-2">
              Transforming physical movements, thermal readings, acoustic pressure, and RF signals into high-precision multi-sensor telemetry.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="px-2.5 py-1 rounded-md bg-gray-50 border border-gray-200 text-gray-600">
              6 HETEROGENEOUS MODALITIES
            </span>
            <span className="px-2.5 py-1 rounded-md bg-orange-50 border border-orange-200 text-orange-700">
              SIMULATION / DEMO DATA
            </span>
          </div>
        </div>

        {/* Interactive Sensor Nodes Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          {sensorNodes.map((node) => {
            const isSelected = (activeHoveredSensor || selectedSensorId) === node.id;
            return (
              <button
                key={node.id}
                onMouseEnter={() => setActiveHoveredSensor(node.id)}
                onMouseLeave={() => setActiveHoveredSensor(null)}
                onClick={() => setSelectedSensorId(node.id)}
                className={`p-4 rounded-xl text-left transition-all border cursor-pointer relative overflow-hidden ${
                  isSelected
                    ? 'bg-gray-950 text-white border-gray-950 shadow-md transform -translate-y-0.5'
                    : 'bg-gray-50/70 text-gray-900 border-gray-200/80 hover:bg-gray-100/80'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2 rounded-lg ${isSelected ? 'bg-white/10' : 'bg-white border border-gray-200'}`}>
                    {getIcon(node.type)}
                  </div>
                  <span className={`w-2 h-2 rounded-full ${node.status === 'ONLINE' ? 'bg-emerald-400' : 'bg-rose-500'} ${isSelected ? 'animate-ping' : ''}`} />
                </div>
                <div className="font-mono text-[10px] text-gray-400 uppercase">{node.type}</div>
                <div className={`font-bold text-xs mt-0.5 truncate ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                  {node.label}
                </div>
                <div className={`font-mono text-[10px] mt-2 ${isSelected ? 'text-orange-300' : 'text-gray-500'}`}>
                  {node.lastUpdate}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Sensor Detailed Telemetry Card */}
        <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200/90 shadow-2xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-gray-200/80">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-white border border-gray-200 shadow-2xs">
                {getIcon(activeSensor.type)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-gray-200 text-gray-800">
                    {activeSensor.id}
                  </span>
                  <span className="font-mono text-[10px] text-emerald-600 font-semibold">
                    {activeSensor.status}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-950 mt-0.5">{activeSensor.label}</h3>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono text-gray-600">
              <div>
                <span className="text-gray-400">ZONE:</span> <span className="font-semibold text-gray-900">{activeSensor.zone}</span>
              </div>
              <div>
                <span className="text-gray-400">TELEMETRY LINK:</span> <span className="font-semibold text-gray-900">{activeSensor.signalStrength}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-5">
            <div className="md:col-span-1 space-y-2">
              <span className="font-mono text-[11px] text-gray-400 uppercase tracking-wider">
                FUNCTIONAL DESCRIPTION
              </span>
              <p className="text-sm text-gray-700 leading-relaxed font-normal">
                {activeSensor.description}
              </p>
              {activeSensor.honestyNote && (
                <div className="p-3 rounded-lg bg-orange-50/70 border border-orange-200 text-orange-800 text-xs font-mono leading-relaxed mt-2">
                  <span className="font-bold">TECHNICAL DISCLOSURE: </span>
                  {activeSensor.honestyNote}
                </div>
              )}
            </div>

            <div className="md:col-span-2">
              <span className="font-mono text-[11px] text-gray-400 uppercase tracking-wider block mb-2">
                ACTIVE TELEMETRY STREAM (SIMULATED)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {Object.entries(activeSensor.metrics).map(([key, val]) => (
                  <div key={key} className="p-3.5 rounded-xl bg-white border border-gray-200 shadow-2xs">
                    <div className="text-[10px] font-mono text-gray-400">{key}</div>
                    <div className="font-mono text-base font-bold text-gray-950 mt-1">{val}</div>
                  </div>
                ))}
              </div>

              {/* Data Flow Pipeline Indicator */}
              <div className="mt-4 p-3 rounded-xl bg-white border border-gray-200/80 flex items-center justify-between text-[11px] font-mono text-gray-600">
                <span className="text-gray-900 font-semibold">{activeSensor.type} SENSING</span>
                <span className="text-gray-400">→</span>
                <span>ESP32 EDGE BUS</span>
                <span className="text-gray-400">→</span>
                <span>IoT GATEWAY MESH</span>
                <span className="text-gray-400">→</span>
                <span className="font-bold text-orange-600">AI SENSOR FUSION CORE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
