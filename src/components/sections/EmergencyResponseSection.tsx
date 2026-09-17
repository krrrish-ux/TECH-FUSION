import React from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { AlertOctagon, AlertTriangle, ArrowRight, CheckCircle2, ChevronRight, ShieldAlert, Siren, Stethoscope, Users } from 'lucide-react';

export const EmergencyResponseSection: React.FC = () => {
  const {
    isEmergencyActive,
    triggerEmergency,
    resetEmergency,
    isAlternateRouteActive,
    toggleAlternateRouting,
    sectors,
  } = useSimulation();

  const sector12 = sectors.SECTOR_12;

  return (
    <section id="emergency" className="py-16 md:py-24 bg-white border-t border-gray-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping" />
              <span className="font-mono text-xs text-rose-600 font-semibold tracking-wider uppercase">
                CRITICAL EVENT DECISION SUPPORT
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-950 tracking-tight">
              EMERGENCY RESPONSE
            </h2>
            <p className="text-gray-600 text-sm sm:text-base max-w-2xl mt-1.5 font-normal">
              Simulate high-velocity crowd surges at Sangam approach ghats and observe automated multi-tier decision support protocols.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-md bg-rose-50 border border-rose-200 text-rose-700 font-mono text-xs font-semibold">
              SIMULATION / DEMO DATA
            </span>
            {isEmergencyActive ? (
              <button
                onClick={resetEmergency}
                className="px-4 py-2 rounded-lg bg-gray-900 text-white font-mono text-xs font-semibold hover:bg-gray-800 transition-colors shadow-xs cursor-pointer"
              >
                RESET SIMULATION
              </button>
            ) : (
              <button
                onClick={triggerEmergency}
                className="px-4 py-2 rounded-lg bg-rose-600 text-white font-mono text-xs font-semibold hover:bg-rose-700 transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <AlertOctagon className="w-4 h-4" />
                <span>SIMULATE EMERGENCY</span>
              </button>
            )}
          </div>
        </div>

        {/* Emergency Surge State Panel */}
        <div className={`p-6 sm:p-8 rounded-2xl border transition-all duration-500 mb-10 ${
          isEmergencyActive
            ? 'bg-rose-50/40 border-rose-300 shadow-md ring-1 ring-rose-300'
            : 'bg-gray-50 border-gray-200'
        }`}>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-gray-200">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded font-mono text-xs font-bold ${
                  isEmergencyActive ? 'bg-rose-600 text-white' : 'bg-gray-200 text-gray-700'
                }`}>
                  {isEmergencyActive ? 'CROWD SURGE DETECTED' : 'MONITORING STANDBY'}
                </span>
                <span className="font-mono text-xs text-gray-500">TARGET: SECTOR 12</span>
              </div>
              <h3 className="text-2xl font-extrabold text-gray-950">
                {isEmergencyActive
                  ? 'CRITICAL BOTTLENECK FORMATION AT GHAT APPROACH'
                  : 'Flow Operating Within Predictive Safety Envelope'}
              </h3>
            </div>

            <div className="flex items-center gap-6 font-mono">
              <div>
                <span className="text-xs text-gray-400">CURRENT DENSITY</span>
                <div className={`text-3xl font-extrabold ${isEmergencyActive ? 'text-rose-600' : 'text-gray-900'}`}>
                  {sector12.currentDensity}%
                </div>
              </div>
              <div className="h-10 w-px bg-gray-200" />
              <div>
                <span className="text-xs text-gray-400">PREDICTED (+15M)</span>
                <div className="text-3xl font-extrabold text-orange-600">
                  {sector12.predictedDensity}%
                </div>
              </div>
              <div className="h-10 w-px bg-gray-200" />
              <div>
                <span className="text-xs text-gray-400">RISK INDEX</span>
                <div className={`text-sm font-bold px-2 py-1 rounded ${
                  isEmergencyActive ? 'bg-rose-600 text-white' : 'bg-gray-900 text-white'
                }`}>
                  {sector12.riskLevel}
                </div>
              </div>
            </div>
          </div>

          {/* AI EMERGENCY RECOMMENDATION Directives */}
          <div className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-orange-600" />
                <span className="font-mono text-xs font-bold text-gray-900 uppercase tracking-wider">
                  AI RECOMMENDATION (DECISION SUPPORT)
                </span>
              </div>
              <span className="font-mono text-[11px] text-gray-400">
                RECOMMENDATION REQUIRES HUMAN OFFICER APPROVAL
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
              
              {/* Rec 1 */}
              <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-2xs space-y-2">
                <div className="flex items-center justify-between text-gray-400">
                  <span>ACTION 01</span>
                  <AlertOctagon className="w-4 h-4 text-rose-600" />
                </div>
                <div className="font-bold text-gray-900 text-sm">STOP INCOMING FLOW</div>
                <p className="text-[11px] text-gray-500 font-sans">
                  Halt inbound staging gates at Sector 04 &amp; Western Concourse immediately.
                </p>
              </div>

              {/* Rec 2 */}
              <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-2xs space-y-2">
                <div className="flex items-center justify-between text-gray-400">
                  <span>ACTION 02</span>
                  <ChevronRight className="w-4 h-4 text-orange-600" />
                </div>
                <div className="font-bold text-gray-900 text-sm">OPEN ALTERNATE ROUTE</div>
                <p className="text-[11px] text-gray-500 font-sans">
                  Divert 30% of incoming flow via Corridor B towards Gate C bypass.
                </p>
                <button
                  onClick={toggleAlternateRouting}
                  className="w-full mt-2 py-1.5 rounded bg-orange-600 text-white text-[11px] font-semibold hover:bg-orange-700 transition-colors"
                >
                  {isAlternateRouteActive ? 'ROUTE C ACTIVE (DIVERTING)' : 'EXECUTE ROUTE DIVERSION'}
                </button>
              </div>

              {/* Rec 3 */}
              <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-2xs space-y-2">
                <div className="flex items-center justify-between text-gray-400">
                  <span>ACTION 03</span>
                  <Users className="w-4 h-4 text-blue-600" />
                </div>
                <div className="font-bold text-gray-900 text-sm">DEPLOY FIELD PERSONNEL</div>
                <p className="text-[11px] text-gray-500 font-sans">
                  Dispatch Quick Reaction Teams (QRT-04 and QRT-09) to Ghat Bottleneck.
                </p>
              </div>

              {/* Rec 4 */}
              <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-2xs space-y-2">
                <div className="flex items-center justify-between text-gray-400">
                  <span>ACTION 04</span>
                  <Stethoscope className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="font-bold text-gray-900 text-sm">ALERT MEDICAL UNIT</div>
                <p className="text-[11px] text-gray-500 font-sans">
                  Pre-position mobile triage pods &amp; water stations at Sector 12 perimeter.
                </p>
              </div>
            </div>

            {/* AI Technical Boundaries Note */}
            <div className="mt-6 pt-4 border-t border-gray-200 text-xs font-mono text-gray-500 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <span>
                <strong>OPERATIONAL BOUNDARY:</strong> AI recommendations provide probabilistic decision support to human command officers. The AI does not autonomously override physical gates or crowd barricades.
              </span>
              <span className="text-gray-400 shrink-0">PROTOCOL: IC-994</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
