import React, { useState } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import {
  Activity,
  AlertOctagon,
  AlertTriangle,
  Camera,
  CheckCircle2,
  ChevronRight,
  Cpu,
  Eye,
  GitFork,
  Maximize2,
  Minimize2,
  Radio,
  RotateCcw,
  Search,
  Shield,
  ShieldAlert,
  Thermometer,
  Volume2,
  Waves,
  X,
} from 'lucide-react';

export const CommandCenterModal: React.FC = () => {
  const {
    commandCenterOpen,
    setCommandCenterOpen,
    totalCrowd,
    activeZonesCount,
    highDensityZonesCount,
    systemStatus,
    sectors,
    sensorNodes,
    isEmergencyActive,
    triggerEmergency,
    resetEmergency,
    isAlternateRouteActive,
    toggleAlternateRouting,
    lostPerson,
    startBleSearch,
    triggerSos,
    triggerTamper,
    triggerLostSignal,
    isNode07Failed,
    triggerSensorFailure,
    restoreSensorNode07,
  } = useSimulation();

  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'SECTORS' | 'SENSORS' | 'SAFETY_BLE'>('OVERVIEW');

  if (!commandCenterOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-gray-950/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-7xl h-[92vh] max-h-[950px] bg-[#FCFCFD] rounded-2xl border border-gray-300 shadow-2xl flex flex-col overflow-hidden">
        
        {/* Top Header Bar */}
        <div className="px-5 py-3.5 bg-white border-b border-gray-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-gray-950 text-white flex items-center justify-center font-mono text-xs font-bold shadow-2xs">
              AK
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-gray-950 text-sm tracking-tight font-mono">
                  AI KUMBH UNIFIED COMMAND &amp; CONTROL CONSOLE
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-orange-100 text-orange-800">
                  LIVE TELEMETRY
                </span>
              </div>
              <span className="text-[10px] font-mono text-gray-400 block">
                TERMINAL: C2-SANGAM-NORTH • INCIDENT COMMAND PROTOCOL IC-994
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs">
            <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-md bg-gray-50 border border-gray-200">
              <span
                className={`w-2 h-2 rounded-full ${
                  systemStatus === 'OPERATIONAL' ? 'bg-emerald-500' : 'bg-rose-500 animate-ping'
                }`}
              />
              <span className="font-semibold text-gray-800 text-[11px]">{systemStatus}</span>
            </div>

            <button
              onClick={() => setCommandCenterOpen(false)}
              className="p-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 hover:text-gray-950 transition-colors cursor-pointer"
              title="Close console"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Global Ticker & Sub-Navigation */}
        <div className="px-5 py-2.5 bg-gray-50 border-b border-gray-200 flex flex-wrap items-center justify-between gap-3 text-xs font-mono shrink-0">
          <div className="flex items-center gap-1 sm:gap-2">
            {(['OVERVIEW', 'SECTORS', 'SENSORS', 'SAFETY_BLE'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === tab
                    ? 'bg-gray-900 text-white shadow-xs'
                    : 'text-gray-600 hover:bg-gray-200/70 hover:text-gray-900'
                }`}
              >
                {tab.replace('_', ' ')}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 text-[11px] text-gray-500">
            <span>TOTAL CROWD: <strong className="text-gray-900">{totalCrowd.toLocaleString()}</strong></span>
            <span>HIGH RISK ZONES: <strong className="text-rose-600">{highDensityZonesCount}</strong></span>
            <span>NODES ONLINE: <strong className="text-gray-900">{sensorNodes.length - (isNode07Failed ? 1 : 0)}/{sensorNodes.length}</strong></span>
          </div>
        </div>

        {/* Main Command Center Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'OVERVIEW' && (
            <div className="space-y-6">
              
              {/* Emergency Banner Alert if Active */}
              {isEmergencyActive && (
                <div className="p-4 rounded-xl bg-rose-50 border border-rose-300 text-rose-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs animate-pulse">
                  <div className="flex items-center gap-3">
                    <AlertOctagon className="w-5 h-5 text-rose-600 shrink-0" />
                    <div>
                      <div className="font-bold text-rose-800">
                        CRITICAL CONGESTION ALERT: SECTOR 12 (DENSITY 87% → PROJECTED 94%)
                      </div>
                      <span className="text-rose-700 text-[11px]">
                        Dynamic diversion advisory dispatched to field signs and marshals.
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={toggleAlternateRouting}
                      className="px-3 py-1.5 rounded bg-rose-600 text-white font-bold hover:bg-rose-700 transition-colors"
                    >
                      {isAlternateRouteActive ? 'ROUTE C OPEN (30% DIVERT)' : 'ACTIVATE ALTERNATE ROUTE'}
                    </button>
                    <button
                      onClick={resetEmergency}
                      className="px-3 py-1.5 rounded border border-rose-300 text-rose-800 bg-white hover:bg-rose-100"
                    >
                      RESET
                    </button>
                  </div>
                </div>
              )}

              {/* 4 Quick Telemetry Widgets */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
                <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-2xs">
                  <div className="flex items-center justify-between text-gray-400 text-xs mb-1">
                    <span>SECTOR 12 INFLOW</span>
                    <Activity className="w-4 h-4 text-orange-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-950">{sectors.SECTOR_12.currentDensity}%</div>
                  <div className="text-[10px] text-gray-500 mt-1">STATUS: {sectors.SECTOR_12.riskLevel}</div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-2xs">
                  <div className="flex items-center justify-between text-gray-400 text-xs mb-1">
                    <span>DYNAMIC ROUTE SPLIT</span>
                    <GitFork className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-950">
                    {isAlternateRouteActive ? '70% / 30%' : '100% / 0%'}
                  </div>
                  <div className="text-[10px] text-gray-500 mt-1">
                    {isAlternateRouteActive ? 'BYPASS ACTIVE (GATE C)' : 'DEFAULT MAIN GATE'}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-2xs">
                  <div className="flex items-center justify-between text-gray-400 text-xs mb-1">
                    <span>SAFETY WRISTBAND</span>
                    <Radio className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-950">{lostPerson.personId}</div>
                  <div className="text-[10px] text-gray-500 mt-1">
                    {lostPerson.status} • {lostPerson.lastDetectedZone}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-2xs">
                  <div className="flex items-center justify-between text-gray-400 text-xs mb-1">
                    <span>FAILOVER MESH</span>
                    <Cpu className="w-4 h-4 text-gray-700" />
                  </div>
                  <div className="text-2xl font-bold text-gray-950">
                    {isNode07Failed ? 'FAILOVER ON' : 'OPTIMAL'}
                  </div>
                  <div className="text-[10px] text-gray-500 mt-1">
                    {isNode07Failed ? 'NODE 07 OFFLINE (REROUTED)' : 'ALL 24 NODES REPORTING'}
                  </div>
                </div>
              </div>

              {/* Central Operational Matrices Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 font-mono">
                
                {/* Sector Matrix Table */}
                <div className="lg:col-span-8 p-5 rounded-2xl bg-white border border-gray-200 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                    <span className="text-xs font-bold text-gray-950">LIVE SECTOR TELEMETRY MATRIX</span>
                    <span className="text-[10px] text-gray-400">8 REGISTERED PILGRIM CONCOURSES</span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-gray-100 text-[10px] text-gray-400 uppercase">
                          <th className="py-2">ZONE</th>
                          <th className="py-2">NAME</th>
                          <th className="py-2">CROWD</th>
                          <th className="py-2">DENSITY</th>
                          <th className="py-2">FLOW</th>
                          <th className="py-2">STATUS</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {Object.values(sectors).map((s) => (
                          <tr key={s.id} className="hover:bg-gray-50/80 transition-colors">
                            <td className="py-2.5 font-bold text-gray-950">{s.id.replace('_', ' ')}</td>
                            <td className="py-2.5 text-gray-600">{s.name}</td>
                            <td className="py-2.5 text-gray-900 font-semibold">{s.crowdCount.toLocaleString()}</td>
                            <td className="py-2.5">
                              <span className={`font-bold ${s.currentDensity > 80 ? 'text-rose-600' : s.currentDensity > 70 ? 'text-orange-600' : 'text-gray-900'}`}>
                                {s.currentDensity}%
                              </span>
                            </td>
                            <td className="py-2.5 text-gray-600">{s.flowRate} / min</td>
                            <td className="py-2.5">
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                  s.riskLevel === 'CRITICAL'
                                    ? 'bg-rose-50 text-rose-700 border border-rose-200'
                                    : s.riskLevel === 'HIGH'
                                    ? 'bg-orange-50 text-orange-700 border border-orange-200'
                                    : s.riskLevel === 'MODERATE'
                                    ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                    : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                }`}
                              >
                                {s.riskLevel}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* System Test Controls */}
                <div className="lg:col-span-4 p-5 rounded-2xl bg-white border border-gray-200 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                    <span className="text-xs font-bold text-gray-950">INCIDENT RIG CONTROLS</span>
                    <span className="text-[10px] text-gray-400">DEMO HOOKS</span>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 space-y-2">
                      <div className="text-[11px] font-bold text-gray-900">CROWD SURGE SCENARIO</div>
                      <p className="text-[10px] text-gray-500 font-sans">
                        Simulate rapid accumulation at Sector 12 bottleneck.
                      </p>
                      {isEmergencyActive ? (
                        <button
                          onClick={resetEmergency}
                          className="w-full py-2 rounded bg-gray-900 text-white font-semibold hover:bg-gray-800 transition-colors"
                        >
                          RESET CROWD SURGE
                        </button>
                      ) : (
                        <button
                          onClick={triggerEmergency}
                          className="w-full py-2 rounded bg-rose-600 text-white font-semibold hover:bg-rose-700 transition-colors"
                        >
                          TRIGGER CROWD SURGE
                        </button>
                      )}
                    </div>

                    <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 space-y-2">
                      <div className="text-[11px] font-bold text-gray-900">ESP32 SENSOR FAILOVER</div>
                      <p className="text-[10px] text-gray-500 font-sans">
                        Simulate edge hardware outage on Node 07.
                      </p>
                      {isNode07Failed ? (
                        <button
                          onClick={restoreSensorNode07}
                          className="w-full py-2 rounded bg-gray-900 text-white font-semibold hover:bg-gray-800 transition-colors"
                        >
                          RESTORE NODE 07
                        </button>
                      ) : (
                        <button
                          onClick={triggerSensorFailure}
                          className="w-full py-2 rounded bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300 transition-colors"
                        >
                          FAIL NODE 07 (DEMO RESILIENCE)
                        </button>
                      )}
                    </div>

                    <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 space-y-2">
                      <div className="text-[11px] font-bold text-gray-900">SAFETY BAND EVENT</div>
                      <p className="text-[10px] text-gray-500 font-sans">
                        Simulate pilgrim SOS alert or tamper switch.
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={triggerSos}
                          className="py-1.5 rounded bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-bold hover:bg-rose-100"
                        >
                          SOS DISTRESS
                        </button>
                        <button
                          onClick={triggerTamper}
                          className="py-1.5 rounded bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold hover:bg-amber-100"
                        >
                          TAMPER OPEN
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SECTORS */}
          {activeTab === 'SECTORS' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
              {Object.values(sectors).map((s) => (
                <div key={s.id} className="p-4 rounded-xl bg-white border border-gray-200 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                    <span className="font-bold text-gray-900 text-xs">{s.id.replace('_', ' ')}</span>
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${
                        s.riskLevel === 'CRITICAL' ? 'bg-rose-50 text-rose-700' : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {s.riskLevel}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-gray-900">{s.name}</h4>
                    <span className="text-[10px] text-gray-400">CAPACITY: {s.capacity.toLocaleString()}</span>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-400">DENSITY:</span>
                      <span className="font-bold text-gray-900">{s.currentDensity}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-full ${
                          s.currentDensity > 80 ? 'bg-rose-500' : s.currentDensity > 70 ? 'bg-orange-500' : 'bg-gray-900'
                        }`}
                        style={{ width: `${s.currentDensity}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[11px] pt-1">
                      <span className="text-gray-400">PREDICTED:</span>
                      <span className="text-orange-600 font-bold">{s.predictedDensity}%</span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-gray-400">FLOW:</span>
                      <span className="text-gray-700">{s.flowRate} / min</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: SENSORS */}
          {activeTab === 'SENSORS' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 font-mono">
              {sensorNodes.map((node) => (
                <div key={node.id} className="p-4 rounded-xl bg-white border border-gray-200 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                    <span className="font-bold text-xs text-gray-900">{node.id}</span>
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${
                        node.status === 'ONLINE' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                      }`}
                    >
                      {node.status}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-gray-900">{node.label}</h4>
                    <span className="text-[10px] text-gray-400">ZONE: {node.zone} • {node.type}</span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-gray-50 border border-gray-100 text-xs space-y-1">
                    {Object.entries(node.metrics).map(([k, v]) => (
                      <div key={k} className="flex justify-between text-[11px]">
                        <span className="text-gray-400">{k}:</span>
                        <span className="font-bold text-gray-900">{v}</span>
                      </div>
                    ))}
                  </div>

                  <div className="text-[10px] text-gray-400">
                    SIGNAL: {node.signalStrength} • UPDATED: {node.lastUpdate}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: SAFETY_BLE */}
          {activeTab === 'SAFETY_BLE' && (
            <div className="max-w-3xl mx-auto p-6 rounded-2xl bg-white border border-gray-200 shadow-2xs font-mono space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div>
                  <span className="text-xs text-gray-400">OPT-IN SAFETY TAG DOSSIER</span>
                  <h3 className="text-xl font-bold text-gray-950 mt-0.5">{lostPerson.personId}</h3>
                </div>
                <span className="px-2.5 py-1 rounded text-xs font-bold bg-gray-100 text-gray-800">
                  {lostPerson.status}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
                  <span className="text-[10px] text-gray-400">LAST KNOWN ZONE</span>
                  <div className="font-bold text-gray-950 mt-1">{lostPerson.lastDetectedZone}</div>
                </div>
                <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
                  <span className="text-[10px] text-gray-400">LAST TIMESTAMP</span>
                  <div className="font-bold text-gray-950 mt-1">{lostPerson.timestamp} IST</div>
                </div>
                <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
                  <span className="text-[10px] text-gray-400">SIGNAL RSSI</span>
                  <div className="font-bold text-orange-600 mt-1">{lostPerson.rssi} dBm</div>
                </div>
                <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
                  <span className="text-[10px] text-gray-400">BATTERY</span>
                  <div className="font-bold text-gray-950 mt-1">{lostPerson.battery}%</div>
                </div>
                <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
                  <span className="text-[10px] text-gray-400">TAMPER LATCH</span>
                  <div className="font-bold text-gray-950 mt-1">{lostPerson.tamperState ? 'RELEASED' : 'SECURE'}</div>
                </div>
                <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
                  <span className="text-[10px] text-gray-400">SOS SWITCH</span>
                  <div className="font-bold text-gray-950 mt-1">{lostPerson.sosState ? 'ACTIVE' : 'STANDBY'}</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-600 space-y-1">
                <div className="font-bold text-gray-900">VERIFICATION EVALUATION:</div>
                <p className="font-sans text-xs text-gray-600">
                  {lostPerson.status === 'LOST_SIGNAL'
                    ? 'Heartbeat interrupted. Awaiting field marshal visual verification. Benign explanations evaluated: coin cell depletion, physical obstacle shadowing, removed band.'
                    : lostPerson.status === 'SOS_ACTIVE'
                    ? 'Distress switch depressed by wearer. Immediate notification dispatched to Sector 07 mobile triage and assistance camp.'
                    : 'Beacon packet transmitting normally at 1Hz interval to perimeter ESP32 gateways.'}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={startBleSearch}
                  className="flex-1 py-2 rounded-lg bg-gray-900 text-white text-xs font-semibold hover:bg-orange-600 transition-colors cursor-pointer"
                >
                  START TARGETED ZONE SEARCH
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Console Footer */}
        <div className="px-5 py-3 bg-white border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-gray-500 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>AI KUMBH CENTRAL REPLICATION RUNNING • SECURE DISPATCH ENCRYPTED</span>
          </div>
          <div className="text-gray-400 text-[11px]">
            PRESS ESC OR CLOSE TO EXIT FULLSCREEN MONITOR
          </div>
        </div>
      </div>
    </div>
  );
};
