import React, { createContext, useContext, useState } from 'react';
import { LostPersonDevice, SectorData, SectorId, SensorNode, SystemStatus } from '../types';

interface SimulationContextType {
  totalCrowd: number;
  activeZonesCount: number;
  highDensityZonesCount: number;
  sensorNodeCount: number;
  systemStatus: SystemStatus;
  
  // Sectors
  sectors: Record<SectorId, SectorData>;
  selectedSectorId: SectorId;
  setSelectedSectorId: (id: SectorId) => void;

  // Sensor node failure demo
  isNode07Failed: boolean;
  triggerSensorFailure: () => void;
  restoreSensorNode07: () => void;

  // Alternate route
  isAlternateRouteActive: boolean;
  toggleAlternateRouting: () => void;

  // Emergency surge demo
  isEmergencyActive: boolean;
  triggerEmergency: () => void;
  resetEmergency: () => void;

  // Prediction demo
  isPredictionActive: boolean;
  predictionStep: number;
  runPrediction: () => void;
  resetPrediction: () => void;

  // Lost person wearable demo
  lostPerson: LostPersonDevice;
  startBleSearch: () => void;
  triggerSos: () => void;
  triggerTamper: () => void;
  triggerLostSignal: () => void;
  resetLostPersonState: () => void;

  // Presentation Mode
  presentationMode: boolean;
  setPresentationMode: (open: boolean) => void;
  presentationSlide: number;
  setPresentationSlide: (slide: number) => void;
  nextSlide: () => void;
  prevSlide: () => void;

  // Command Center modal
  commandCenterOpen: boolean;
  setCommandCenterOpen: (open: boolean) => void;

  // Sensor nodes list
  sensorNodes: SensorNode[];
  activeHoveredSensor: string | null;
  setActiveHoveredSensor: (id: string | null) => void;
}

const initialSectors: Record<SectorId, SectorData> = {
  SECTOR_12: {
    id: 'SECTOR_12',
    name: 'Sector 12 — Ghat Approach & Sangam Walkway',
    currentDensity: 87,
    predictedDensity: 94,
    riskLevel: 'CRITICAL',
    recommendedAction: 'REDIRECT INCOMING FLOW VIA ROUTE B TO GATE C',
    crowdCount: 6420,
    capacity: 7000,
    gate: 'Main Gate & Gate C Alternate',
    coordinates: { x: 3.5, y: 1.2, z: -1.0 },
    flowRate: 340,
  },
  SECTOR_07: {
    id: 'SECTOR_07',
    name: 'Sector 07 — South Transit Corridor',
    currentDensity: 58,
    predictedDensity: 64,
    riskLevel: 'MEDIUM',
    recommendedAction: 'MAINTAIN BALANCED CORRIDOR SIGNALS',
    crowdCount: 4120,
    capacity: 7500,
    gate: 'Gate B South',
    coordinates: { x: -2.8, y: 0.6, z: 2.2 },
    flowRate: 210,
  },
  SECTOR_04: {
    id: 'SECTOR_04',
    name: 'Sector 04 — Eastern Staging Grounds',
    currentDensity: 74,
    predictedDensity: 81,
    riskLevel: 'HIGH',
    recommendedAction: 'SLOW ENTRY RATE AT CHECKPOINT 4',
    crowdCount: 5200,
    capacity: 6800,
    gate: 'Gate D East',
    coordinates: { x: -1.2, y: 0.9, z: -3.0 },
    flowRate: 280,
  },
  SECTOR_01: {
    id: 'SECTOR_01',
    name: 'Sector 01 — Western Railway Concourse',
    currentDensity: 42,
    predictedDensity: 48,
    riskLevel: 'LOW',
    recommendedAction: 'NORMAL INFLOW DISPATCH',
    crowdCount: 2680,
    capacity: 8000,
    gate: 'Gate A West',
    coordinates: { x: 1.8, y: 0.4, z: 3.4 },
    flowRate: 150,
  },
};

const initialLostPerson: LostPersonDevice = {
  personId: 'KM-48291',
  wearerName: 'Registered Pilgrim #48291',
  deviceModel: 'BLE-Tag v2.4 (2.4GHz Chirp)',
  lastDetectedZone: 'SECTOR 07',
  lastKnownLocation: 'SECTOR 7 — GATE B',
  timestamp: '14:42',
  status: 'SEARCHING',
  rssi: -72,
  battery: 84,
  tamperState: false,
  sosState: false,
  verificationStatus: 'UNVERIFIED',
};

const initialSensors: SensorNode[] = [
  {
    id: 'CAM-01',
    type: 'CAMERA',
    label: 'AI Computer Vision Station',
    zone: 'Sector 12 Approach',
    status: 'ONLINE',
    signalStrength: '99% Optical Fibre',
    lastUpdate: '1 sec ago',
    metrics: { 'People Counted': 1842, 'Density Index': 'High', 'Frame Rate': '30 fps' },
    description: 'Real-time spatial optical density estimation using edge neural inference.',
  },
  {
    id: 'IR-04',
    type: 'IR_TOF',
    label: 'IR / Time-of-Flight Checkpoint Gate',
    zone: 'Gate B Entry Corridor',
    status: 'ONLINE',
    signalStrength: 'LoRaWAN -62 dBm',
    lastUpdate: '2 sec ago',
    metrics: { 'Inflow Rate': '+1,240 /hr', 'Outflow Rate': '-860 /hr', 'Net Rate': '+380 /hr' },
    description: 'Dual-beam infrared beam break with ToF height gating for directional entry/exit counts.',
    honestyNote: 'Assists with controlled checkpoint entry/exit counting; supplemented by optical and RF nodes.',
  },
  {
    id: 'NODE-07',
    type: 'ESP32',
    label: 'ESP32 Edge Gateway #07',
    zone: 'Sector 07 Transit Hub',
    status: 'ONLINE',
    battery: 'Solar + 3.7V LiPo 96%',
    signalStrength: 'Wi-Fi Mesh / LoRa',
    lastUpdate: '2 sec ago',
    metrics: { 'Active Transceivers': 'BLE + LoRa + I2C', 'Packets/min': 340, 'Uptime': '99.98%' },
    description: 'Edge microcontroller aggregating IR, BME280, Acoustic and BLE beacon packets.',
  },
  {
    id: 'BLE-03',
    type: 'BLE',
    label: 'BLE Safety-Band Receiver Array',
    zone: 'Sector 07 Gateway',
    status: 'ONLINE',
    signalStrength: '-68 dBm (Avg RSSI)',
    lastUpdate: '1 sec ago',
    metrics: { 'Active Wristbands Tracked': 312, 'Proximity Resolution': 'Zone-level (~15-25m)' },
    description: 'Multi-receiver beacon scanner for opt-in pilgrim safety wristbands.',
    honestyNote: 'Provides approximate proximity / zone-level detection. Does not provide exact GPS-level positioning.',
  },
  {
    id: 'BME-02',
    type: 'BME280',
    label: 'BME280 Micro-Climate Pod',
    zone: 'Sector 12 Ghats',
    status: 'ONLINE',
    signalStrength: 'I2C to Node 07',
    lastUpdate: '3 sec ago',
    metrics: { 'Temperature': '32.4°C', 'Relative Humidity': '61%', 'Pressure': '1004 hPa' },
    description: 'Precision temperature, humidity and barometric environmental monitoring.',
    honestyNote: 'BME280 measures temperature, humidity and atmospheric pressure to assess heat stress. It does NOT count crowd population.',
  },
  {
    id: 'ACO-01',
    type: 'ACOUSTIC',
    label: 'Acoustic Sound Level Monitor',
    zone: 'Sector 12 Walkway',
    status: 'ONLINE',
    signalStrength: 'Analog to ADC Node 07',
    lastUpdate: '1 sec ago',
    metrics: { 'Sound Level': '78 dB', 'Activity Classification': 'HIGH', 'Dominant Freq': '450 Hz' },
    description: 'Ambient sound pressure transducer detecting localized vocal surge patterns.',
    honestyNote: 'Sound level is a supplementary activity signal and cannot reliably determine exact crowd population alone.',
  },
];

const SimulationContext = createContext<SimulationContextType | undefined>(undefined);

export const SimulationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [totalCrowd, setTotalCrowd] = useState<number>(18420);
  const [sectors, setSectors] = useState<Record<SectorId, SectorData>>(initialSectors);
  const [selectedSectorId, setSelectedSectorId] = useState<SectorId>('SECTOR_12');
  const [isNode07Failed, setIsNode07Failed] = useState<boolean>(false);
  const [isAlternateRouteActive, setIsAlternateRouteActive] = useState<boolean>(false);
  const [isEmergencyActive, setIsEmergencyActive] = useState<boolean>(false);
  const [isPredictionActive, setIsPredictionActive] = useState<boolean>(false);
  const [predictionStep, setPredictionStep] = useState<number>(0);
  const [lostPerson, setLostPerson] = useState<LostPersonDevice>(initialLostPerson);
  const [presentationMode, setPresentationMode] = useState<boolean>(false);
  const [presentationSlide, setPresentationSlide] = useState<number>(0);
  const [commandCenterOpen, setCommandCenterOpen] = useState<boolean>(false);
  const [sensorNodes, setSensorNodes] = useState<SensorNode[]>(initialSensors);
  const [activeHoveredSensor, setActiveHoveredSensor] = useState<string | null>(null);

  // System Status computation
  const systemStatus: SystemStatus = isEmergencyActive
    ? 'EMERGENCY_ACTIVE'
    : isNode07Failed
    ? 'FAILOVER_MODE'
    : sectors.SECTOR_12.currentDensity > 85
    ? 'WARNING'
    : 'OPERATIONAL';

  const triggerEmergency = () => {
    setIsEmergencyActive(true);
    setTotalCrowd(21850);
    setSectors(prev => ({
      ...prev,
      SECTOR_12: {
        ...prev.SECTOR_12,
        currentDensity: 87,
        predictedDensity: 94,
        riskLevel: 'CRITICAL',
        recommendedAction: 'STOP INCOMING FLOW — OPEN ALTERNATE ROUTE C — DISPATCH MEDICAL TEAMS',
      },
    }));
  };

  const resetEmergency = () => {
    setIsEmergencyActive(false);
    setIsAlternateRouteActive(false);
    setTotalCrowd(18420);
    setSectors(initialSectors);
  };

  const toggleAlternateRouting = () => {
    setIsAlternateRouteActive(prev => {
      const next = !prev;
      if (next) {
        setSectors(s => ({
          ...s,
          SECTOR_12: {
            ...s.SECTOR_12,
            currentDensity: Math.max(68, s.SECTOR_12.currentDensity - 18),
            riskLevel: 'MEDIUM',
            recommendedAction: 'INFLOW DIVERTED: 30% ROUTED VIA CORRIDOR B TO GATE C',
          },
        }));
      } else {
        setSectors(s => ({
          ...s,
          SECTOR_12: {
            ...s.SECTOR_12,
            currentDensity: 87,
            riskLevel: 'CRITICAL',
            recommendedAction: 'REDIRECT INCOMING FLOW VIA ROUTE B TO GATE C',
          },
        }));
      }
      return next;
    });
  };

  const triggerSensorFailure = () => {
    setIsNode07Failed(true);
    setSensorNodes(prev =>
      prev.map(node =>
        node.id === 'NODE-07' ? { ...node, status: 'OFFLINE' } : node
      )
    );
  };

  const restoreSensorNode07 = () => {
    setIsNode07Failed(false);
    setSensorNodes(prev =>
      prev.map(node =>
        node.id === 'NODE-07' ? { ...node, status: 'ONLINE' } : node
      )
    );
  };

  const runPrediction = () => {
    setIsPredictionActive(true);
    setPredictionStep(3); // reveals all future horizons up to +45 min (27,850)
    setTotalCrowd(27850);
    setSectors(prev => ({
      ...prev,
      SECTOR_12: {
        ...prev.SECTOR_12,
        predictedDensity: 94,
        riskLevel: 'CRITICAL',
      },
    }));
  };

  const resetPrediction = () => {
    setIsPredictionActive(false);
    setPredictionStep(0);
    setTotalCrowd(18420);
    setSectors(initialSectors);
  };

  // Lost person actions
  const startBleSearch = () => {
    setLostPerson(prev => ({
      ...prev,
      status: 'SEARCHING',
      timestamp: '14:42',
      verificationStatus: 'UNVERIFIED',
    }));
    // simulate beacon lock
    setTimeout(() => {
      setLostPerson(prev => ({
        ...prev,
        status: 'FOUND',
        lastDetectedZone: 'SECTOR 07',
        lastKnownLocation: 'SECTOR 7 — GATE B RECEIVER CLUSTER',
        rssi: -66,
        verificationStatus: 'POSSIBLE DISTRESS',
      }));
    }, 1200);
  };

  const triggerSos = () => {
    setLostPerson(prev => ({
      ...prev,
      sosState: true,
      status: 'SOS_ACTIVE',
      lastKnownLocation: 'SECTOR 7 — GATE B (SOS TRIGGER PRESSED)',
      verificationStatus: 'EMERGENCY RESPONSE REQUIRED',
    }));
  };

  const triggerTamper = () => {
    setLostPerson(prev => ({
      ...prev,
      tamperState: true,
      status: 'TAMPER_DETECTED',
      verificationStatus: 'POSSIBLE DISTRESS',
    }));
  };

  const triggerLostSignal = () => {
    setLostPerson(prev => ({
      ...prev,
      status: 'LOST_SIGNAL',
      rssi: -99,
      verificationStatus: 'POSSIBLE DISTRESS',
    }));
  };

  const resetLostPersonState = () => {
    setLostPerson(initialLostPerson);
  };

  // Slide navigation
  const nextSlide = () => {
    setPresentationSlide(prev => (prev < 9 ? prev + 1 : prev));
  };
  const prevSlide = () => {
    setPresentationSlide(prev => (prev > 0 ? prev - 1 : prev));
  };

  return (
    <SimulationContext.Provider
      value={{
        totalCrowd,
        activeZonesCount: 8,
        highDensityZonesCount: sectors.SECTOR_12.riskLevel === 'CRITICAL' ? 2 : 1,
        sensorNodeCount: 24,
        systemStatus,
        sectors,
        selectedSectorId,
        setSelectedSectorId,
        isNode07Failed,
        triggerSensorFailure,
        restoreSensorNode07,
        isAlternateRouteActive,
        toggleAlternateRouting,
        isEmergencyActive,
        triggerEmergency,
        resetEmergency,
        isPredictionActive,
        predictionStep,
        runPrediction,
        resetPrediction,
        lostPerson,
        startBleSearch,
        triggerSos,
        triggerTamper,
        triggerLostSignal,
        resetLostPersonState,
        presentationMode,
        setPresentationMode,
        presentationSlide,
        setPresentationSlide,
        nextSlide,
        prevSlide,
        commandCenterOpen,
        setCommandCenterOpen,
        sensorNodes,
        activeHoveredSensor,
        setActiveHoveredSensor,
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
};

export const useSimulation = () => {
  const context = useContext(SimulationContext);
  if (!context) {
    throw new Error('useSimulation must be used within a SimulationProvider');
  }
  return context;
};
