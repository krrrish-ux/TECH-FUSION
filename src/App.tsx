import React from 'react';
import { SimulationProvider } from './context/SimulationContext';
import { Navbar } from './components/layout/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { SensorNetworkIntro } from './components/sections/SensorNetworkIntro';
import { LiveCrowdIntelligence } from './components/sections/LiveCrowdIntelligence';
import { AlternateRoutingSection } from './components/sections/AlternateRoutingSection';
import { SensorArchitectureSection } from './components/sections/SensorArchitectureSection';
import { SensorFusionSection } from './components/sections/SensorFusionSection';
import { LostPersonSection } from './components/sections/LostPersonSection';
import { EmergencyResponseSection } from './components/sections/EmergencyResponseSection';
import { AiPredictionSection } from './components/sections/AiPredictionSection';
import { ProjectImpactSection } from './components/sections/ProjectImpactSection';
import { Footer } from './components/layout/Footer';
import { CommandCenterModal } from './components/modals/CommandCenterModal';
import { PresentationMode } from './components/modals/PresentationMode';

export default function App() {
  return (
    <SimulationProvider>
      <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-orange-100 selection:text-orange-900">
        {/* Sticky Glass Navbar */}
        <Navbar />

        {/* Main Content Sections */}
        <main>
          {/* Section 04: Hero 3D Kumbh Environment */}
          <HeroSection />

          {/* Section 06: 3D Sensor Network Intro */}
          <SensorNetworkIntro />

          {/* Section 07 & 08: Live Crowd Intelligence & 3D Density Elevation Map */}
          <LiveCrowdIntelligence />

          {/* Section 09: Smart Alternate Routing & Dynamic Flow Bifurcation */}
          <AlternateRoutingSection />

          {/* Section 10 - 14: The Sensing Layer (CV, IR/ToF, ESP32, BME280, Acoustic) */}
          <SensorArchitectureSection />

          {/* Section 15: 3D Sensor Fusion AI Core */}
          <SensorFusionSection />

          {/* Section 16 - 21: Lost Person System, 3D BLE Wristband, Verification & Privacy */}
          <LostPersonSection />

          {/* Section 22 - 23: Emergency Response & Decision Support */}
          <EmergencyResponseSection />

          {/* Section 24 - 25: AI Crowd Prediction & Timeline Horizons */}
          <AiPredictionSection />

          {/* Section 28: Project Impact & Civic Purpose */}
          <ProjectImpactSection />
        </main>

        {/* Section 31: Minimalist Footer */}
        <Footer />

        {/* Section 26: Unified Command Center Modal */}
        <CommandCenterModal />

        {/* Section 29 & 30: 10-Slide Full-Screen Presentation Mode */}
        <PresentationMode />
      </div>
    </SimulationProvider>
  );
}
