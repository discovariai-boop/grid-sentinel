export interface PowerStation {
  id: string;
  name: string;
  type: "coal" | "solar" | "hydro" | "substation" | "wind";
  lat: number;
  lng: number;
  capacity: number;
  currentLoad: number;
  status: "normal" | "warning" | "critical" | "offline";
}

export interface Incident {
  id: string;
  title: string;
  location: string;
  lat: number;
  lng: number;
  severity: "low" | "medium" | "high" | "critical";
  type: "outage" | "fault" | "fire" | "overload" | "maintenance";
  affectedPopulation: number;
  estimatedRestoration: string;
  timestamp: string;
  description: string;
  impactsTraffic: boolean;
  impactsEmergency: boolean;
}

export interface SubstationHealth {
  id: string;
  name: string;
  health: number;
  temperature: number;
  loadPercent: number;
  lastMaintenance: string;
  nextMaintenance: string;
  riskScore: number;
}

// Limpopo Province power stations and Eskom infrastructure
export const powerStations: PowerStation[] = [
  { id: "ps1", name: "Medupi Power Station", type: "coal", lat: -23.68, lng: 27.55, capacity: 4764, currentLoad: 3850, status: "normal" },
  { id: "ps2", name: "Matimba Power Station", type: "coal", lat: -23.67, lng: 27.60, capacity: 3990, currentLoad: 3200, status: "normal" },
  { id: "ps3", name: "Lephalale Solar Park", type: "solar", lat: -23.70, lng: 27.72, capacity: 75, currentLoad: 52, status: "normal" },
  { id: "ps4", name: "Polokwane Substation", type: "substation", lat: -23.90, lng: 29.45, capacity: 800, currentLoad: 720, status: "warning" },
  { id: "ps5", name: "Musina Substation", type: "substation", lat: -22.35, lng: 30.04, capacity: 200, currentLoad: 145, status: "normal" },
  { id: "ps6", name: "Tzaneen Substation", type: "substation", lat: -23.83, lng: 30.16, capacity: 350, currentLoad: 340, status: "critical" },
  { id: "ps7", name: "Thohoyandou Substation", type: "substation", lat: -23.08, lng: 30.48, capacity: 280, currentLoad: 190, status: "normal" },
  { id: "ps8", name: "Mokopane Substation", type: "substation", lat: -24.19, lng: 29.00, capacity: 420, currentLoad: 380, status: "warning" },
  { id: "ps9", name: "Tom Burke Wind Farm", type: "wind", lat: -23.45, lng: 28.42, capacity: 120, currentLoad: 85, status: "normal" },
  { id: "ps10", name: "Bela-Bela Substation", type: "substation", lat: -24.88, lng: 28.29, capacity: 300, currentLoad: 210, status: "normal" },
];

export interface TransmissionLine {
  id: string;
  from: string;
  to: string;
  coordinates: [number, number][];
  voltage: number; // kV
  status: "normal" | "warning" | "critical" | "offline";
  loadPercent: number;
  label: string;
}

// Limpopo transmission lines with status
export const transmissionLines: TransmissionLine[] = [
  { id: "tl1", from: "ps1", to: "ps2", coordinates: [[-23.68, 27.55], [-23.67, 27.60]], voltage: 400, status: "normal", loadPercent: 62, label: "Medupi–Matimba 400kV" },
  { id: "tl2", from: "ps1", to: "ps8", coordinates: [[-23.68, 27.55], [-23.95, 28.30], [-24.19, 29.00]], voltage: 400, status: "critical", loadPercent: 94, label: "Medupi–Mokopane 400kV" },
  { id: "tl3", from: "ps8", to: "ps4", coordinates: [[-24.19, 29.00], [-24.05, 29.25], [-23.90, 29.45]], voltage: 275, status: "warning", loadPercent: 85, label: "Mokopane–Polokwane 275kV" },
  { id: "tl4", from: "ps4", to: "ps6", coordinates: [[-23.90, 29.45], [-23.87, 29.80], [-23.83, 30.16]], voltage: 132, status: "critical", loadPercent: 97, label: "Polokwane–Tzaneen 132kV" },
  { id: "tl5", from: "ps4", to: "ps7", coordinates: [[-23.90, 29.45], [-23.50, 29.95], [-23.08, 30.48]], voltage: 132, status: "normal", loadPercent: 55, label: "Polokwane–Thohoyandou 132kV" },
  { id: "tl6", from: "ps5", to: "ps7", coordinates: [[-22.35, 30.04], [-22.70, 30.26], [-23.08, 30.48]], voltage: 132, status: "normal", loadPercent: 48, label: "Musina–Thohoyandou 132kV" },
  { id: "tl7", from: "ps8", to: "ps10", coordinates: [[-24.19, 29.00], [-24.55, 28.65], [-24.88, 28.29]], voltage: 275, status: "normal", loadPercent: 58, label: "Mokopane–Bela-Bela 275kV" },
  { id: "tl8", from: "ps1", to: "ps9", coordinates: [[-23.68, 27.55], [-23.56, 27.98], [-23.45, 28.42]], voltage: 132, status: "normal", loadPercent: 40, label: "Medupi–Tom Burke 132kV" },
  { id: "tl9", from: "ps5", to: "ps4", coordinates: [[-22.35, 30.04], [-23.10, 29.75], [-23.90, 29.45]], voltage: 275, status: "warning", loadPercent: 78, label: "Musina–Polokwane 275kV" },
];

export const incidents: Incident[] = [
  {
    id: "inc1", title: "Major Transmission Line Trip", location: "N1 Highway, Mokopane",
    lat: -24.20, lng: 29.01, severity: "critical", type: "fault",
    affectedPopulation: 85000, estimatedRestoration: "4-6 hours",
    timestamp: "2024-01-15T14:30:00Z",
    description: "400kV transmission line tripped between Medupi and Mokopane substation. Load shedding Stage 2 implemented for affected areas. Traffic lights offline at 18 intersections.",
    impactsTraffic: true, impactsEmergency: true,
  },
  {
    id: "inc2", title: "Substation Transformer Overload", location: "Polokwane Industrial",
    lat: -23.91, lng: 29.46, severity: "high", type: "overload",
    affectedPopulation: 32000, estimatedRestoration: "2-3 hours",
    timestamp: "2024-01-15T15:00:00Z",
    description: "Polokwane main substation transformer T3 approaching thermal limit. Load redistribution in progress.",
    impactsTraffic: false, impactsEmergency: false,
  },
  {
    id: "inc3", title: "Veld Fire Near Transmission Line", location: "R71, Tzaneen Corridor",
    lat: -23.84, lng: 30.10, severity: "high", type: "fire",
    affectedPopulation: 15000, estimatedRestoration: "1-2 hours",
    timestamp: "2024-01-15T13:45:00Z",
    description: "Veld fire detected within 80m of 132kV line on R71 corridor. Eskom fire crew and Limpopo Fire Services deployed. Preventive line de-energisation initiated.",
    impactsTraffic: true, impactsEmergency: true,
  },
  {
    id: "inc4", title: "Planned Maintenance - Medupi Unit 3", location: "Medupi Power Station",
    lat: -23.68, lng: 27.55, severity: "low", type: "maintenance",
    affectedPopulation: 0, estimatedRestoration: "48 hours",
    timestamp: "2024-01-15T08:00:00Z",
    description: "Scheduled boiler maintenance on Unit 3. Capacity reduced by 794MW. Other units operating normally.",
    impactsTraffic: false, impactsEmergency: false,
  },
  {
    id: "inc5", title: "Hospital Backup Generator Failure", location: "Mankweng Hospital, Polokwane",
    lat: -23.88, lng: 29.72, severity: "medium", type: "fault",
    affectedPopulation: 800, estimatedRestoration: "45 minutes",
    timestamp: "2024-01-15T16:00:00Z",
    description: "Diesel generator at Mankweng Hospital failed to start during load shedding. Emergency mobile generator dispatched.",
    impactsTraffic: false, impactsEmergency: true,
  },
];

export const substationHealth: SubstationHealth[] = [
  { id: "sh1", name: "Medupi Power Station", health: 92, temperature: 48, loadPercent: 81, lastMaintenance: "2024-01-01", nextMaintenance: "2024-04-01", riskScore: 15 },
  { id: "sh2", name: "Matimba Power Station", health: 88, temperature: 52, loadPercent: 80, lastMaintenance: "2023-12-15", nextMaintenance: "2024-03-15", riskScore: 20 },
  { id: "sh3", name: "Polokwane Substation", health: 58, temperature: 72, loadPercent: 90, lastMaintenance: "2023-10-20", nextMaintenance: "2024-01-20", riskScore: 78 },
  { id: "sh4", name: "Tzaneen Substation", health: 42, temperature: 81, loadPercent: 97, lastMaintenance: "2023-09-01", nextMaintenance: "2024-01-15", riskScore: 88 },
  { id: "sh5", name: "Mokopane Substation", health: 65, temperature: 62, loadPercent: 90, lastMaintenance: "2023-11-10", nextMaintenance: "2024-02-10", riskScore: 55 },
  { id: "sh6", name: "Bela-Bela Substation", health: 91, temperature: 38, loadPercent: 70, lastMaintenance: "2024-01-10", nextMaintenance: "2024-04-10", riskScore: 10 },
];

export const loadForecast = Array.from({ length: 24 }, (_, i) => {
  const hour = i;
  const base = 6000 + Math.sin((hour - 6) * Math.PI / 12) * 2500;
  return {
    hour: `${hour.toString().padStart(2, "0")}:00`,
    actual: Math.round(base + (Math.random() - 0.5) * 800),
    predicted: Math.round(base),
    capacity: 9500,
  };
});

export const weeklyForecast = [
  { day: "Mon", load: 7800, predicted: 7600, peak: 8500 },
  { day: "Tue", load: 8100, predicted: 7900, peak: 8800 },
  { day: "Wed", load: 7500, predicted: 7700, peak: 8200 },
  { day: "Thu", load: 8400, predicted: 8100, peak: 9100 },
  { day: "Fri", load: 8000, predicted: 7800, peak: 8700 },
  { day: "Sat", load: 6200, predicted: 6500, peak: 7000 },
  { day: "Sun", load: 5800, predicted: 6000, peak: 6500 },
];

export const trafficLightStatus = [
  { intersection: "N1 & R101 Mokopane", status: "active" as const, backup: true },
  { intersection: "Thabo Mbeki & Grobler St, Polokwane", status: "offline" as const, backup: false },
  { intersection: "R71 & University Rd, Mankweng", status: "active" as const, backup: true },
  { intersection: "N1 & Kranskop Toll Plaza", status: "degraded" as const, backup: true },
  { intersection: "R81 & Tzaneen CBD", status: "offline" as const, backup: false },
  { intersection: "N1 & Bela-Bela Off-ramp", status: "active" as const, backup: true },
];
