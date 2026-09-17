import React, { useEffect } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  GitFork,
  HeartHandshake,
  Layers,
  Maximize,
  Radio,
  Shield,
  ShieldAlert,
  Sparkles,
  TrendingDown,
  Users,
  X,
} from 'lucide-react';

export const PresentationMode: React.FC = () => {
  const { presentationMode, setPresentationMode, presentationSlide, setPresentationSlide } = useSimulation();

  const slides = [
    {
      num: '01',
      title: 'AI KUMBH',
      subtitle: 'SENSE. PREDICT. REDIRECT. PROTECT.',
      category: 'PROJECT INITIATIVE',
      content: (
        <div className="space-y-6 max-w-2xl">
          <p className="text-xl sm:text-2xl text-gray-700 font-normal leading-relaxed">
            A conceptual AI + IoT intelligent crowd management and public-safety platform architected for mass gatherings such as Kumbh Mela.
          </p>
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-xs font-mono text-gray-600 space-y-2">
            <div className="font-bold text-gray-900">CORE SYSTEM ARCHITECTURE:</div>
            <div>Multi-sensor edge acquisition • Distributed ESP32 nodes • Neural sensor fusion • Dynamic route balancing • Opt-in BLE pilgrim reuniting</div>
          </div>
        </div>
      ),
    },
    {
      num: '02',
      title: 'THE SCALE OF KUMBH MELA',
      subtitle: 'Understanding the Dynamics of Mass Gathering',
      category: 'THE CHALLENGE',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono">
          <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200 space-y-2">
            <div className="text-3xl font-extrabold text-gray-950">50M+</div>
            <div className="text-xs font-bold text-gray-800">PEAK PILGRIM DAYS</div>
            <p className="text-xs text-gray-500 font-sans mt-2">
              Millions converge on sacred riverbanks within tight, historic geographic bottlenecks.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200 space-y-2">
            <div className="text-3xl font-extrabold text-orange-600">&gt; 5 / m²</div>
            <div className="text-xs font-bold text-gray-800">CRITICAL DENSITY THRESHOLD</div>
            <p className="text-xs text-gray-500 font-sans mt-2">
              Physical congestion transforms from free laminar walking into shockwave turbulent surges.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200 space-y-2">
            <div className="text-3xl font-extrabold text-rose-600">REACTION LAG</div>
            <div className="text-xs font-bold text-gray-800">THE CORE DANGER</div>
            <p className="text-xs text-gray-500 font-sans mt-2">
              Traditional policing responds after choke points lock up, when diversion is nearly impossible.
            </p>
          </div>
        </div>
      ),
    },
    {
      num: '03',
      title: 'FROM REACTION TO PREDICTION',
      subtitle: 'The Paradigm Shift to Intelligent Public Safety',
      category: 'THE VISION',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200 space-y-3 font-mono">
            <span className="text-xs font-bold text-gray-400">LEGACY CONVENTIONAL METHODS</span>
            <ul className="text-xs text-gray-600 space-y-2 list-disc pl-4 font-sans">
              <li>Manual watchtowers relying on subjective human eyesight.</li>
              <li>Barricade closures deployed after crush density already forms.</li>
              <li>Uncoordinated megaphone announcements causing sudden panics.</li>
              <li>Paper and loud-speaker lost person camps with heavy delays.</li>
            </ul>
          </div>
          <div className="p-6 rounded-2xl bg-orange-50/50 border border-orange-200 space-y-3 font-mono">
            <span className="text-xs font-bold text-orange-700">AI KUMBH PREDICTIVE FRAMEWORK</span>
            <ul className="text-xs text-gray-800 space-y-2 list-disc pl-4 font-sans">
              <li>Continuous multi-modal IoT telemetry + edge inference.</li>
              <li>15 to 45-minute temporal accumulation forecasting.</li>
              <li>Pre-emptive automated 30% inflow bifurcation at staging gates.</li>
              <li>Opt-in BLE mesh tags enabling compassionate, verified reuniting.</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      num: '04',
      title: 'THE 4 CORE ARCHITECTURE LAYERS',
      subtitle: 'From Physical Ingestion to Real-World Protection',
      category: 'SYSTEM TOPOLOGY',
      content: (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-center">
          <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 space-y-2">
            <div className="w-8 h-8 rounded-full bg-gray-900 text-white text-xs font-bold flex items-center justify-center mx-auto">1</div>
            <div className="font-bold text-sm text-gray-950">SENSING LAYER</div>
            <p className="text-[11px] text-gray-500 font-sans">Cameras, IR/ToF gates, acoustic transceivers, and BME280 nodes.</p>
          </div>
          <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 space-y-2">
            <div className="w-8 h-8 rounded-full bg-gray-900 text-white text-xs font-bold flex items-center justify-center mx-auto">2</div>
            <div className="font-bold text-sm text-gray-950">EDGE &amp; MESH</div>
            <p className="text-[11px] text-gray-500 font-sans">ESP32 microcontrollers communicating over LoRaWAN and Wi-Fi mesh.</p>
          </div>
          <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 space-y-2">
            <div className="w-8 h-8 rounded-full bg-orange-600 text-white text-xs font-bold flex items-center justify-center mx-auto">3</div>
            <div className="font-bold text-sm text-gray-950">FUSION CORE</div>
            <p className="text-[11px] text-gray-500 font-sans">Multimodal Kalman filters, LSTM trajectory models, and risk scoring.</p>
          </div>
          <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 space-y-2">
            <div className="w-8 h-8 rounded-full bg-gray-900 text-white text-xs font-bold flex items-center justify-center mx-auto">4</div>
            <div className="font-bold text-sm text-gray-950">RESPONSE LAYER</div>
            <p className="text-[11px] text-gray-500 font-sans">Dynamic digital signage, QRT dispatch, and unified C2 console.</p>
          </div>
        </div>
      ),
    },
    {
      num: '05',
      title: 'HETEROGENEOUS SENSING LAYER',
      subtitle: 'Multiple Modalities for Total Operational Picture',
      category: 'HARDWARE & SENSING',
      content: (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 font-mono text-xs">
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
            <span className="text-gray-400">CAMERA CV</span>
            <div className="font-bold text-gray-900 mt-1">Optical Headcount</div>
            <p className="text-[11px] text-gray-500 font-sans mt-1">Local edge bounding boxes prevent streaming personal biometrics.</p>
          </div>
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
            <span className="text-gray-400">IR / ToF GATES</span>
            <div className="font-bold text-gray-900 mt-1">Directional Tallies</div>
            <p className="text-[11px] text-gray-500 font-sans mt-1">Exact entry and exit counts at controlled corridor gateways.</p>
          </div>
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
            <span className="text-gray-400">ESP32 NODES</span>
            <div className="font-bold text-gray-900 mt-1">Distributed Edge Hub</div>
            <p className="text-[11px] text-gray-500 font-sans mt-1">Self-healing mesh ensures failover when individual nodes drop.</p>
          </div>
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
            <span className="text-gray-400">BLE ANTENNAS</span>
            <div className="font-bold text-gray-900 mt-1">Zone Proximity</div>
            <p className="text-[11px] text-gray-500 font-sans mt-1">Passive listener arrays for opt-in family wristbands.</p>
          </div>
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
            <span className="text-gray-400">BME280 ENVIRONMENT</span>
            <div className="font-bold text-gray-900 mt-1">Heat Stress Index</div>
            <p className="text-[11px] text-gray-500 font-sans mt-1">Monitors temperature &amp; humidity context (not crowd count).</p>
          </div>
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
            <span className="text-gray-400">ACOUSTIC TRANSDUCER</span>
            <div className="font-bold text-gray-900 mt-1">Decibel Spike Detection</div>
            <p className="text-[11px] text-gray-500 font-sans mt-1">Supplementary audio pressure flag for distress cries.</p>
          </div>
        </div>
      ),
    },
    {
      num: '06',
      title: 'THE SENSOR FUSION CORE',
      subtitle: 'Eliminating Single Points of Failure and Hallucinations',
      category: 'NEURAL CONVERGENCE',
      content: (
        <div className="space-y-6 max-w-3xl">
          <p className="text-lg text-gray-700 font-normal leading-relaxed">
            In dense gatherings, camera lenses get blocked by dust or flags, while individual radio tags can be shadowed by water or bodies. The Sensor Fusion Core cross-validates disparate streams.
          </p>
          <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200 font-mono text-xs space-y-3">
            <div className="text-gray-400 uppercase">Cross-Validation Axiom</div>
            <div className="text-sm font-bold text-gray-900">
              "If the camera detects density, the IR gate records positive net flow, and acoustic levels elevate synchronously — certainty exceeds 95%."
            </div>
            <div className="text-gray-500 text-[11px]">
              Conversely, an acoustic spike alone without optical or IR corroboration is correctly classified as a localized ritual chant rather than an emergency crush.
            </div>
          </div>
        </div>
      ),
    },
    {
      num: '07',
      title: 'SMART DYNAMIC ROUTING',
      subtitle: 'Gentle Flow Bifurcation (70% Primary / 30% Bypass)',
      category: 'REDIRECT',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono">
          <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200 space-y-2">
            <div className="text-xs text-gray-400 uppercase">PRIMARY CHOKEPOINT</div>
            <div className="text-lg font-bold text-gray-950">SECTOR 12 → MAIN GHAT</div>
            <p className="text-xs text-gray-600 font-sans mt-2">
              Reduced from 100% saturation to 70% capacity, preventing the threshold where stampedes can physically trigger.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-orange-50/60 border border-orange-200 space-y-2">
            <div className="text-xs text-orange-700 uppercase">INTELLIGENT BYPASS</div>
            <div className="text-lg font-bold text-gray-950">CORRIDOR B → GATE C</div>
            <p className="text-xs text-gray-700 font-sans mt-2">
              30% diversion safely absorbs overflow along wide, underutilized secondary avenues, informed by automated LED signage.
            </p>
          </div>
        </div>
      ),
    },
    {
      num: '08',
      title: 'OPT-IN BLE LOST PERSON RECOVERY',
      subtitle: 'Find. Connect. Reunite.',
      category: 'HUMANITARIAN RECOVERY',
      content: (
        <div className="space-y-4 max-w-3xl font-mono">
          <p className="text-base text-gray-700 font-sans leading-relaxed">
            Every year, thousands of elderly pilgrims and young children lose touch with families amidst Kumbh crowds. AI Kumbh implements an opt-in BLE wearable system with a strict multi-sensor verification logic.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
              <span className="text-gray-400">01. DETECT</span>
              <div className="font-bold mt-1">Zone Beacons</div>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
              <span className="text-gray-400">02. VERIFY</span>
              <div className="font-bold mt-1">Multi-Sensor Logic</div>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
              <span className="text-gray-400">03. RESPOND</span>
              <div className="font-bold mt-1">Targeted Marshals</div>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
              <span className="text-gray-400">04. REUNITE</span>
              <div className="font-bold mt-1">Camp Connection</div>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-gray-100 text-xs text-gray-600">
            ETHICAL CLAUSE: "A lost signal is not a conclusion — it is a signal to verify. Disconnections are assessed for benign battery drainage before declaring alerts."
          </div>
        </div>
      ),
    },
    {
      num: '09',
      title: 'EMERGENCY RESPONSE PROTOCOLS',
      subtitle: 'Automated Decision Support for Command Officers',
      category: 'PROTECT',
      content: (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-center text-xs">
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-1">
            <span className="text-gray-400">ACTION 01</span>
            <div className="font-bold text-gray-900">STOP INCOMING</div>
            <p className="text-[10px] text-gray-500 font-sans">Halt feeder staging gates instantly.</p>
          </div>
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-1">
            <span className="text-gray-400">ACTION 02</span>
            <div className="font-bold text-orange-600">OPEN BYPASS</div>
            <p className="text-[10px] text-gray-500 font-sans">Direct 30% to secondary corridors.</p>
          </div>
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-1">
            <span className="text-gray-400">ACTION 03</span>
            <div className="font-bold text-gray-900">DISPATCH QRT</div>
            <p className="text-[10px] text-gray-500 font-sans">Deploy marshals to coordinates.</p>
          </div>
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-1">
            <span className="text-gray-400">ACTION 04</span>
            <div className="font-bold text-emerald-600">ALERT MEDICAL</div>
            <p className="text-[10px] text-gray-500 font-sans">Pre-stage oxygen &amp; triage carts.</p>
          </div>
        </div>
      ),
    },
    {
      num: '10',
      title: 'CONCLUSION & ARCHITECTURAL SUMMARY',
      subtitle: 'Safer, Smarter, Compassionate Pilgrimage',
      category: 'PROJECT IMPACT',
      content: (
        <div className="space-y-6 max-w-2xl font-mono">
          <div className="p-6 rounded-2xl bg-gray-950 text-white space-y-4">
            <span className="text-xs text-orange-400 font-bold uppercase tracking-wider">AI KUMBH SUMMARY</span>
            <p className="text-sm font-sans text-gray-200 leading-relaxed">
              By combining real-time edge telemetry with predictive sensor fusion, AI Kumbh transforms mass crowd management from reactive crisis response into proactive, dignified, and compassionate protection.
            </p>
            <div className="pt-2 flex items-center gap-4 text-xs">
              <span className="text-orange-400">SENSE.</span>
              <span className="text-white">PREDICT.</span>
              <span className="text-orange-400">REDIRECT.</span>
              <span className="text-white">PROTECT.</span>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const current = slides[presentationSlide];

  // Keyboard arrow listeners
  useEffect(() => {
    if (!presentationMode) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        if (presentationSlide < slides.length - 1) {
          setPresentationSlide(presentationSlide + 1);
        }
      } else if (e.key === 'ArrowLeft') {
        if (presentationSlide > 0) {
          setPresentationSlide(presentationSlide - 1);
        }
      } else if (e.key === 'Escape') {
        setPresentationMode(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [presentationMode, presentationSlide]);

  if (!presentationMode) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#FCFCFD] text-gray-900 flex flex-col justify-between p-6 sm:p-10 select-none animate-in fade-in duration-200">
      
      {/* Presentation Top Bar */}
      <div className="flex items-center justify-between font-mono text-xs border-b border-gray-200 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded bg-gray-950 text-white flex items-center justify-center font-bold text-xs">
            AK
          </div>
          <div>
            <span className="font-extrabold text-gray-950 text-sm">AI KUMBH</span>
            <span className="text-gray-400 text-[10px] block">PRESENTATION DECK</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="px-2.5 py-1 rounded bg-gray-100 font-bold text-gray-900 text-xs">
            {current.num} / {slides.length.toString().padStart(2, '0')}
          </span>

          <button
            onClick={() => setPresentationMode(false)}
            className="p-2 rounded-lg border border-gray-200 hover:bg-gray-100 text-gray-600 hover:text-gray-950 transition-colors cursor-pointer"
            title="Exit presentation (ESC)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Slide Content Canvas */}
      <div className="max-w-5xl mx-auto w-full my-auto py-8">
        <div className="space-y-4">
          <div className="inline-block px-3 py-1 rounded-full bg-orange-50 border border-orange-200 font-mono text-xs font-semibold text-orange-700 uppercase">
            {current.category}
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-950 tracking-tight">
            {current.title}
          </h1>

          <p className="text-base sm:text-xl text-gray-500 font-normal">
            {current.subtitle}
          </p>

          <div className="pt-8">
            {current.content}
          </div>
        </div>
      </div>

      {/* Bottom Controls & Progress Bar */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2 text-gray-400">
            <span>USE ARROW KEYS (← / →) OR CLICK BUTTONS</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => presentationSlide > 0 && setPresentationSlide(presentationSlide - 1)}
              disabled={presentationSlide === 0}
              className="p-2.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
              title="Previous slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => presentationSlide < slides.length - 1 && setPresentationSlide(presentationSlide + 1)}
              disabled={presentationSlide === slides.length - 1}
              className="p-2.5 rounded-lg bg-gray-950 text-white hover:bg-orange-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
              title="Next slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Linear Progress Bar */}
        <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-orange-600 h-full transition-all duration-300 rounded-full"
            style={{ width: `${((presentationSlide + 1) / slides.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};
