export type SystemStatus = 'OPERATIONAL' | 'WARNING' | 'EMERGENCY_ACTIVE' | 'FAILOVER_MODE';

export type SectorId = 'SECTOR_12' | 'SECTOR_07' | 'SECTOR_04' | 'SECTOR_01';

export interface SectorData {
  id: SectorId;
  name: string;
  currentDensity: number; // percentage, e.g. 87
  predictedDensity: number; // percentage, e.g. 94
  riskLevel: 'LOW' | 'MEDIUM' | 'MODERATE' | 'HIGH' | 'CRITICAL';
  recommendedAction: string;
  crowdCount: number;
  capacity: number;
  gate: string;
  coordinates: { x: number; y: number; z: number };
  flowRate?: number;
}

export interface SensorNode {
  id: string;
  type: 'CAMERA' | 'IR_TOF' | 'ESP32' | 'BLE' | 'BME280' | 'ACOUSTIC';
  label: string;
  zone: string;
  status: 'ONLINE' | 'OFFLINE' | 'DEGRADED';
  battery?: string;
  signalStrength: string;
  lastUpdate: string;
  metrics: Record<string, string | number>;
  description: string;
  honestyNote?: string;
}

export type LostPersonStatus = 
  | 'IDLE' 
  | 'SEARCHING' 
  | 'FOUND' 
  | 'LOST_SIGNAL' 
  | 'SOS_ACTIVE' 
  | 'TAMPER_DETECTED';

export type VerificationRiskStatus = 
  | 'UNVERIFIED' 
  | 'POSSIBLE DISTRESS' 
  | 'EMERGENCY RESPONSE REQUIRED';

export interface LostPersonDevice {
  personId: string;
  wearerName: string;
  deviceModel: string;
  lastDetectedZone: string;
  lastKnownLocation: string;
  timestamp: string;
  status: LostPersonStatus;
  rssi: number; // dBm
  battery: number; // %
  tamperState: boolean;
  sosState: boolean;
  verificationStatus: VerificationRiskStatus;
}

export interface PredictionDataPoint {
  timeLabel: string;
  minutesOffset: number;
  crowdCount: number;
  densityPercent: number;
  risk: 'LOW' | 'ELEVATED' | 'HIGH' | 'CRITICAL';
}
