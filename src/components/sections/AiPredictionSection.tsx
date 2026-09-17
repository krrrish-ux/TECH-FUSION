import React, { useState } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { ArrowRight, BarChart3, Clock, LineChart, Play, RotateCcw, TrendingUp } from 'lucide-react';

export const AiPredictionSection: React.FC = () => {
  const { isPredictionActive, runPrediction, resetPrediction } = useSimulation();
  const [selectedHorizon, setSelectedHorizon] = useState<number>(3); // +45 MIN default when active

  const horizonData = [
    { label: 'NOW', offset: '0 MIN', crowd: 18420, density: '68%', risk: 'STABLE', color: 'text-gray-900', barHeight: 45 },
    { label: '+15 MIN', offset: '+15 MIN', crowd: 21100, density: '76%', risk: 'MODERATE', color: 'text-gray-900', barHeight: 60 },
    { label: '+30 MIN', offset: '+30 MIN', crowd: 24900, density: '86%', risk: 'ELEVATED', color: 'text-orange-600', barHeight: 80 },
    { label: '+45 MIN', offset: '+45 MIN', crowd: 27850, density: '94%', risk: 'CRITICAL', color: 'text-rose-600', barHeight: 98 },
  ];

  return (
    <section id="prediction" className="py-16 md:py-24 bg-[#FAFAFA] border-t border-gray-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-orange-600 animate-pulse" />
              <span className="font-mono text-xs text-orange-600 font-semibold tracking-wider uppercase">
                TEMPORAL INFERENCE ENGINE
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-950 tracking-tight">
              AI CROWD PREDICTION
            </h2>
            <p className="text-gray-600 text-sm sm:text-base max-w-2xl mt-1.5 font-normal">
              Forecasting crowd accumulation 15, 30, and 45 minutes into the future to transition management from reactive policing to proactive routing.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-md bg-white border border-gray-200 text-gray-700 font-mono text-xs shadow-2xs">
              SIMULATION / DEMO DATA
            </span>
            {isPredictionActive ? (
              <button
                onClick={resetPrediction}
                className="px-4 py-2 rounded-lg bg-gray-900 text-white font-mono text-xs font-semibold hover:bg-gray-800 transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>RESET TIMELINE</span>
              </button>
            ) : (
              <button
                onClick={runPrediction}
                className="px-4 py-2 rounded-lg bg-orange-600 text-white font-mono text-xs font-semibold hover:bg-orange-700 transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>RUN PREDICTION MODEL</span>
              </button>
            )}
          </div>
        </div>

        {/* Prediction Data Visualization Canvas / Chart */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-gray-200/90 shadow-2xs mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
            <div>
              <span className="font-mono text-xs text-gray-400 uppercase tracking-wider">
                TEMPORAL CROWD TRAJECTORY CURVE
              </span>
              <h3 className="text-xl font-bold text-gray-950 mt-0.5">
                {isPredictionActive ? 'Projected Convergence: Peak Pressure at +45m' : 'Baseline Historical Flow Pattern'}
              </h3>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="text-gray-400">MODEL CONFIDENCE:</span>
              <span className="font-bold text-gray-900">89.4% (SIMULATED)</span>
            </div>
          </div>

          {/* Graphical Curve & Horizon Bars */}
          <div className="pt-8 pb-4">
            <div className="grid grid-cols-4 gap-3 sm:gap-6 items-end h-64 border-b border-gray-200 pb-4">
              {horizonData.map((d, idx) => {
                const isRevealed = isPredictionActive || idx === 0;
                return (
                  <div
                    key={d.label}
                    onClick={() => setSelectedHorizon(idx)}
                    className="flex flex-col items-center justify-end h-full group cursor-pointer"
                  >
                    <div className="text-center mb-2 font-mono">
                      <span className="text-[10px] sm:text-xs text-gray-400 block">{d.offset}</span>
                      <span className={`text-xs sm:text-base font-bold ${isRevealed ? d.color : 'text-gray-300'}`}>
                        {isRevealed ? d.crowd.toLocaleString() : '—'}
                      </span>
                    </div>

                    <div className="w-full max-w-[90px] bg-gray-100 rounded-t-xl overflow-hidden h-44 flex items-end p-1">
                      <div
                        className={`w-full rounded-t-lg transition-all duration-1000 ${
                          !isRevealed
                            ? 'bg-gray-200 h-2'
                            : idx === 3
                            ? 'bg-rose-500'
                            : idx === 2
                            ? 'bg-orange-500'
                            : 'bg-gray-900'
                        }`}
                        style={{ height: isRevealed ? `${d.barHeight}%` : '8%' }}
                      />
                    </div>

                    <div className="mt-3 font-mono text-center">
                      <span className="text-[10px] font-bold text-gray-700 block">{d.label}</span>
                      <span
                        className={`text-[9px] px-1.5 py-0.5 rounded ${
                          !isRevealed
                            ? 'bg-gray-100 text-gray-400'
                            : d.risk === 'CRITICAL'
                            ? 'bg-rose-50 text-rose-700 font-bold'
                            : d.risk === 'ELEVATED'
                            ? 'bg-orange-50 text-orange-700 font-bold'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {isRevealed ? d.risk : 'PROJECTED'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Model Horizon Takeaway */}
          <div className="mt-6 pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs">
            <div className="flex items-center gap-2 text-gray-700">
              <TrendingUp className="w-4 h-4 text-orange-600 shrink-0" />
              <span>
                {isPredictionActive
                  ? 'RECOMMENDED PROACTIVE ACTION: Divert 30% of incoming flow at Sector 04 staging before Sector 12 exceeds 90% threshold in 25 minutes.'
                  : 'Click "Run Prediction Model" to compute future trajectory using multi-modal sensor fusion.'}
              </span>
            </div>
            <span className="text-gray-400 text-[11px] shrink-0">WINDOW: T+45 MIN</span>
          </div>
        </div>

        {/* Prediction Pipeline Diagram */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-gray-200/90 shadow-2xs">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="font-mono text-xs text-orange-600 font-semibold tracking-wider uppercase">
              DATA CONVERGENCE TOPOLOGY
            </span>
            <h3 className="text-2xl font-bold text-gray-950 mt-1">
              PROTOTYPE PREDICTION PIPELINE
            </h3>
            <p className="text-xs text-gray-500 font-mono mt-1">
              Grounded on multi-modal telemetry inputs rather than univariate extrapolations.
            </p>
          </div>

          {/* Step visual */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-center font-mono text-xs">
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 flex flex-col justify-between">
              <div className="text-[10px] text-gray-400 uppercase">STEP 01: INPUTS</div>
              <div className="font-bold text-gray-900 mt-2">
                CURRENT CROWD + ENTRY/EXIT + CAMERA + BLE + ENV
              </div>
              <span className="text-[10px] text-gray-500 mt-2">6 Real-Time Telemetry Streams</span>
            </div>

            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 flex flex-col justify-between">
              <div className="text-[10px] text-gray-400 uppercase">STEP 02: HISTORICAL</div>
              <div className="font-bold text-gray-900 mt-2">
                PAST BATHING RITUAL CURVES &amp; TRAIN SCHEDULES
              </div>
              <span className="text-[10px] text-gray-500 mt-2">Temporal Prior Priors</span>
            </div>

            <div className="p-4 rounded-xl bg-gray-950 text-white flex flex-col justify-between shadow-xs">
              <div className="text-[10px] text-orange-400 uppercase">STEP 03: MODEL</div>
              <div className="font-bold text-white mt-2">
                PROTOTYPE PREDICTION MODEL
              </div>
              <span className="text-[10px] text-gray-400 mt-2">LSTM + Spatial Graph Neural Net</span>
            </div>

            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 flex flex-col justify-between">
              <div className="text-[10px] text-gray-400 uppercase">STEP 04: OUTPUT</div>
              <div className="font-bold text-gray-900 mt-2">
                FUTURE ACCUMULATION &amp; BOTTLENECK RISK
              </div>
              <span className="text-[10px] text-orange-600 mt-2">Risk Index (0–100)</span>
            </div>

            <div className="p-4 rounded-xl bg-orange-50/70 border border-orange-200 flex flex-col justify-between text-orange-950">
              <div className="text-[10px] text-orange-600 uppercase">STEP 05: ADVISORY</div>
              <div className="font-bold mt-2">
                DYNAMIC ROUTE RECOMMENDATION
              </div>
              <span className="text-[10px] text-orange-700 mt-2">Bifurcate Inflow (30%)</span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200 text-center font-mono text-xs text-gray-500">
            PROTOTYPE DISCLAIMER: Designed as a decision support aid for transit controllers. Does not claim deterministic real-world accuracy without site-calibrated edge parameters.
          </div>
        </div>
      </div>
    </section>
  );
};
