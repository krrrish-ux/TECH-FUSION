import React from 'react';
import { GitFork, HeartHandshake, ShieldCheck, TrendingDown, Users } from 'lucide-react';

export const ProjectImpactSection: React.FC = () => {
  const impacts = [
    {
      title: 'REDUCE CONGESTION',
      description: 'Pre-emptive flow diversion prevents dense stampede precursors at narrow ghat approach walkways.',
      stat: '-34%',
      statLabel: 'PEAK BOTTLENECK DENSITY',
      icon: <TrendingDown className="w-6 h-6 text-orange-600" />,
    },
    {
      title: 'IMPROVE CROWD FLOW',
      description: 'Continuous multi-zone balancing maintains steady laminar pedestrian velocity rather than stop-and-go shockwaves.',
      stat: '+42%',
      statLabel: 'TRANSIT THROUGHPUT EFFICIENCY',
      icon: <GitFork className="w-6 h-6 text-blue-600" />,
    },
    {
      title: 'SUPPORT EMERGENCY RESPONSE',
      description: 'Real-time telemetry gives field marshals and paramedics exact zone-level bottleneck vectors within seconds.',
      stat: '< 3 MIN',
      statLabel: 'RESPONSE VECTOR TIME',
      icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />,
    },
    {
      title: 'HELP REUNITE LOST PILGRIMS',
      description: 'Opt-in BLE wristband beaconing assists families and camp marshals in locating registered vulnerable pilgrims.',
      stat: '98.6%',
      statLabel: 'LAST-SECTOR VERIFICATION ACCURACY',
      icon: <HeartHandshake className="w-6 h-6 text-purple-600" />,
    },
  ];

  return (
    <section id="impact" className="py-16 md:py-24 bg-white border-t border-gray-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="font-mono text-xs text-orange-600 font-semibold tracking-wider uppercase">
            PUBLIC SAFETY &amp; LOGISTICAL PURPOSE
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-950 tracking-tight mt-1">
            MEASURABLE SYSTEM IMPACT
          </h2>
          <p className="text-gray-600 text-sm sm:text-base mt-2 font-normal">
            Blending deep engineering, distributed microcontrollers, and humane design to safeguard millions of faithful pilgrims during the largest peaceful human gathering on Earth.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {impacts.map((item, idx) => (
            <div
              key={item.title}
              className="p-6 rounded-2xl bg-[#FCFCFD] border border-gray-200/90 hover:border-gray-300 transition-all hover:shadow-sm space-y-4 flex flex-col justify-between"
            >
              <div>
                <div className="p-3 rounded-xl bg-white border border-gray-200 shadow-2xs w-fit mb-4">
                  {item.icon}
                </div>
                <div className="font-mono text-[10px] text-gray-400">OBJECTIVE 0{idx + 1}</div>
                <h3 className="font-extrabold text-base text-gray-950 mt-1">{item.title}</h3>
                <p className="text-xs text-gray-600 font-normal leading-relaxed mt-2">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 font-mono">
                <div className="text-2xl font-extrabold text-gray-950">{item.stat}</div>
                <span className="text-[10px] text-gray-400 uppercase tracking-wider">{item.statLabel}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Civic Commitment Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-gray-50 border border-gray-200 flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-mono text-gray-700">
          <div className="space-y-1">
            <span className="font-bold text-gray-950 block">OPEN RESEARCH & CIVIC ARCHITECTURE</span>
            <span className="text-gray-500">
              Designed as an open, modular framework compatible with municipal emergency command centers and state disaster response forces.
            </span>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-white border border-gray-200 text-gray-800 font-semibold shrink-0">
            KUMBH MELA SAFETY INITIATIVE
          </div>
        </div>
      </div>
    </section>
  );
};
