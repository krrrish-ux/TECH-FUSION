import React from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { WristbandBleScene } from '../3d/WristbandBleScene';
import { AlertCircle, AlertOctagon, CheckCircle2, Lock, Radio, RotateCcw, Search, Shield, ShieldAlert, UserCheck } from 'lucide-react';

export const LostPersonSection: React.FC = () => {
  const {
    lostPerson,
    startBleSearch,
    triggerSos,
    triggerTamper,
    triggerLostSignal,
    resetLostPersonState,
  } = useSimulation();

  return (
    <section id="lost-person" className="py-16 md:py-24 bg-[#FAFAFA] border-t border-gray-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="font-mono text-xs text-orange-600 font-semibold tracking-wider uppercase">
              OPT-IN BLE SAFETY ECOSYSTEM
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-950 tracking-tight mt-1">
              FIND. CONNECT. REUNITE.
            </h2>
            <p className="text-gray-600 text-sm sm:text-base max-w-2xl mt-1.5 font-normal">
              An opt-in safety-band concept designed to help locate registered pilgrims by their last detected zone using localized Bluetooth Low Energy receiver nodes.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-md bg-white border border-gray-200 font-mono text-xs text-gray-700 shadow-2xs">
              ZONE-LEVEL PROXIMITY RESOLUTION
            </span>
          </div>
        </div>

        {/* 3D Wristband & Receiver Network Scene */}
        <div className="mb-8">
          <WristbandBleScene />
        </div>

        {/* Live Device Dossier & Interactive Simulation Triggers */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Active Device Record Card */}
          <div className="lg:col-span-6 p-6 rounded-2xl bg-white border border-gray-200/90 shadow-2xs space-y-4 font-mono">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <span className="text-[10px] text-gray-400 uppercase">ACTIVE PILGRIM TAG</span>
                <div className="text-lg font-bold text-gray-950">{lostPerson.personId}</div>
              </div>
              <span
                className={`px-2.5 py-1 rounded text-xs font-semibold tracking-wider ${
                  lostPerson.status === 'SOS_ACTIVE'
                    ? 'bg-rose-50 text-rose-700 border border-rose-200'
                    : lostPerson.status === 'LOST_SIGNAL'
                    ? 'bg-amber-50 text-amber-700 border border-amber-200'
                    : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                }`}
              >
                STATUS: {lostPerson.status}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-gray-50 border border-gray-200/80">
                <span className="text-[10px] text-gray-400">LAST DETECTED ZONE</span>
                <div className="font-bold text-gray-900 mt-0.5">{lostPerson.lastDetectedZone}</div>
              </div>
              <div className="p-3 rounded-lg bg-gray-50 border border-gray-200/80">
                <span className="text-[10px] text-gray-400">LAST TIMESTAMP</span>
                <div className="font-bold text-gray-900 mt-0.5">{lostPerson.timestamp} IST</div>
              </div>
              <div className="p-3 rounded-lg bg-gray-50 border border-gray-200/80">
                <span className="text-[10px] text-gray-400">SIGNAL STRENGTH</span>
                <div className="font-bold text-orange-600 mt-0.5">
                  {lostPerson.status === 'LOST_SIGNAL' ? 'DISCONNECTED' : `${lostPerson.rssi} dBm`}
                </div>
              </div>
              <div className="p-3 rounded-lg bg-gray-50 border border-gray-200/80">
                <span className="text-[10px] text-gray-400">TAG BATTERY</span>
                <div className="font-bold text-gray-900 mt-0.5">{lostPerson.battery}% (Li-Coin)</div>
              </div>
              <div className="p-3 rounded-lg bg-gray-50 border border-gray-200/80">
                <span className="text-[10px] text-gray-400">TAMPER LATCH</span>
                <div className={`font-bold mt-0.5 ${lostPerson.tamperState ? 'text-amber-600' : 'text-emerald-600'}`}>
                  {lostPerson.tamperState ? 'RELEASED' : 'SECURE'}
                </div>
              </div>
              <div className="p-3 rounded-lg bg-gray-50 border border-gray-200/80">
                <span className="text-[10px] text-gray-400">SOS PIN</span>
                <div className={`font-bold mt-0.5 ${lostPerson.sosState ? 'text-rose-600' : 'text-gray-600'}`}>
                  {lostPerson.sosState ? 'ACTIVATED' : 'NORMAL'}
                </div>
              </div>
            </div>

            <div className="pt-2 text-xs text-gray-600">
              <span className="text-gray-400">LAST KNOWN FIXED BEACON: </span>
              <span className="font-bold text-gray-900">{lostPerson.lastKnownLocation}</span>
            </div>

            <div className="pt-3 border-t border-gray-100 flex flex-wrap items-center gap-2">
              <button
                onClick={startBleSearch}
                className="flex-1 py-2 px-3 rounded-lg bg-gray-900 text-white font-mono text-xs font-semibold hover:bg-orange-600 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Search className="w-3.5 h-3.5" />
                <span>START SEARCH</span>
              </button>
              <button
                onClick={resetLostPersonState}
                className="py-2 px-3 rounded-lg border border-gray-200 text-gray-700 font-mono text-xs font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                title="Reset simulation state"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>RESET</span>
              </button>
            </div>
          </div>

          {/* Interactive Event Simulator & Multi-Sensor Verification */}
          <div className="lg:col-span-6 space-y-4">
            <div className="p-6 rounded-2xl bg-white border border-gray-200/90 shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <span className="font-mono text-xs font-bold text-gray-900">SIMULATE EVENT TRIGGERS</span>
                <span className="font-mono text-[10px] text-gray-400">OPERATIONAL TEST RIG</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 font-mono text-xs">
                <button
                  onClick={triggerSos}
                  className="p-3 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 font-semibold transition-colors text-left flex flex-col justify-between h-24"
                >
                  <AlertOctagon className="w-4 h-4 text-rose-600" />
                  <div>
                    <div className="font-bold">SIMULATE SOS</div>
                    <span className="text-[10px] text-rose-600/80">Pilgrim initiates distress</span>
                  </div>
                </button>

                <button
                  onClick={triggerTamper}
                  className="p-3 rounded-xl bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 font-semibold transition-colors text-left flex flex-col justify-between h-24"
                >
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  <div>
                    <div className="font-bold">TAMPER DETECTED</div>
                    <span className="text-[10px] text-amber-700/80">Strap switch opened</span>
                  </div>
                </button>

                <button
                  onClick={triggerLostSignal}
                  className="p-3 rounded-xl bg-gray-50 text-gray-800 border border-gray-200 hover:bg-gray-100 font-semibold transition-colors text-left flex flex-col justify-between h-24"
                >
                  <Radio className="w-4 h-4 text-gray-500" />
                  <div>
                    <div className="font-bold">LOST SIGNAL</div>
                    <span className="text-[10px] text-gray-500">Beacon heartbeat drops</span>
                  </div>
                </button>
              </div>

              {/* Event Analysis & Verification Banner */}
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-2 font-mono text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">VERIFICATION CLASSIFICATION:</span>
                  <span className="font-bold text-gray-900">{lostPerson.verificationStatus}</span>
                </div>
                <div className="text-[11px] text-gray-600">
                  {lostPerson.status === 'LOST_SIGNAL' && (
                    <div className="text-amber-800 space-y-1">
                      <span className="font-bold">UNUSUAL EVENT DETECTED (AWAITING VERIFICATION)</span>
                      <p className="font-sans text-xs text-gray-600">
                        Possible causes: battery depleted, Bluetooth interference, device damaged, wristband removed, network node issue, or outside coverage zone.
                      </p>
                    </div>
                  )}
                  {lostPerson.status === 'TAMPER_DETECTED' && (
                    <p className="text-amber-800">
                      <strong>POSSIBLE DISTRESS — HUMAN VERIFICATION REQUIRED.</strong> Tamper detection does not prove criminal activity or abduction; wristband may have snagged or been removed voluntarily.
                    </p>
                  )}
                  {lostPerson.status === 'SOS_ACTIVE' && (
                    <p className="text-rose-700 font-bold">
                      EMERGENCY RESPONSE REQUIRED: Volunteer dispatch notified for Sector 07 — Gate B.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* BLE Technical Limitation Banner */}
            <div className="p-4 rounded-xl bg-white border border-gray-200 text-xs font-mono text-gray-700 space-y-1">
              <div className="flex items-center gap-2 font-bold text-gray-900">
                <Radio className="w-4 h-4 text-purple-600" />
                <span>BLE TECHNICAL BOUNDARIES & HONESTY:</span>
              </div>
              <p className="font-sans text-xs text-gray-600 leading-relaxed">
                "BLE provides approximate proximity / zone-level detection. It does not provide exact GPS-level positioning by itself."
              </p>
            </div>
          </div>
        </div>

        {/* Multi-Sensor Verification Workflow */}
        <div className="p-6 rounded-2xl bg-white border border-gray-200/90 shadow-2xs mb-10">
          <div className="text-center max-w-2xl mx-auto mb-6">
            <span className="font-mono text-xs text-orange-600 font-semibold tracking-wider uppercase">
              MULTI-SENSOR VERIFICATION LOGIC
            </span>
            <h3 className="text-xl font-bold text-gray-950 mt-1">
              "A LOST SIGNAL IS NOT A CONCLUSION. IT IS A SIGNAL TO VERIFY."
            </h3>
            <p className="text-xs text-gray-500 font-mono mt-1">
              Workflow: DETECT → VERIFY → RESPOND → REUNITE
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center font-mono">
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
              <div className="w-8 h-8 rounded-full bg-gray-900 text-white text-xs font-bold flex items-center justify-center mx-auto mb-2">
                01
              </div>
              <div className="font-bold text-gray-900 text-sm">DETECT</div>
              <p className="text-[11px] text-gray-500 font-sans mt-1">
                BLE heartbeat interruption, tamper contact opening, or physical SOS press received by ESP32 gateway.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
              <div className="w-8 h-8 rounded-full bg-orange-600 text-white text-xs font-bold flex items-center justify-center mx-auto mb-2">
                02
              </div>
              <div className="font-bold text-gray-900 text-sm">VERIFY</div>
              <p className="text-[11px] text-gray-500 font-sans mt-1">
                Cross-correlate with nearby optical density, gate entry logs, and family companion contact confirmation.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
              <div className="w-8 h-8 rounded-full bg-gray-900 text-white text-xs font-bold flex items-center justify-center mx-auto mb-2">
                03
              </div>
              <div className="font-bold text-gray-900 text-sm">RESPOND</div>
              <p className="text-[11px] text-gray-500 font-sans mt-1">
                Dispatch nearest ground assistance marshals to the specific 25-meter sector corridor with registered photo ID.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center mx-auto mb-2">
                04
              </div>
              <div className="font-bold text-gray-900 text-sm">REUNITE</div>
              <p className="text-[11px] text-gray-500 font-sans mt-1">
                Safe reconnection at authorized Lost-and-Found registration camp with cryptographically signed verification.
              </p>
            </div>
          </div>
        </div>

        {/* Privacy Framework */}
        <div className="p-6 rounded-2xl bg-gray-900 text-white">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-gray-800">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-white/10 text-orange-400">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold">SAFETY SYSTEM — NOT SURVEILLANCE</h3>
                <span className="font-mono text-xs text-gray-400">Strict Ethical & Privacy Safeguards</span>
              </div>
            </div>
            <span className="font-mono text-xs text-emerald-400 font-semibold px-2.5 py-1 rounded bg-emerald-950/80 border border-emerald-800">
              PRIVACY-BY-DESIGN COMPLIANT
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 pt-6 text-xs font-mono">
            <div>
              <span className="text-orange-400">01. OPT-IN WEARABLE</span>
              <p className="text-gray-300 font-sans mt-1">Issued solely on voluntary registration by families.</p>
            </div>
            <div>
              <span className="text-orange-400">02. UNIQUE EPHEMERAL IDS</span>
              <p className="text-gray-300 font-sans mt-1">Rotating cryptographic tokens prevent tracking.</p>
            </div>
            <div>
              <span className="text-orange-400">03. AUTHORIZED ACCESS</span>
              <p className="text-gray-300 font-sans mt-1">Restricted to credentialed camp police and medics.</p>
            </div>
            <div>
              <span className="text-orange-400">04. SECURE COMMS</span>
              <p className="text-gray-300 font-sans mt-1">AES-128 encrypted LoRaWAN telemetry payload.</p>
            </div>
            <div>
              <span className="text-orange-400">05. LIMITED RETENTION</span>
              <p className="text-gray-300 font-sans mt-1">Automated data purging 48 hours post-event.</p>
            </div>
            <div>
              <span className="text-orange-400">06. NO UNRESTRICTED CV</span>
              <p className="text-gray-300 font-sans mt-1">No mass biometric indexing or facial database.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
