export interface PowerStation {
  id: string;
  name: string;
  type: "hydro" | "solar" | "thermal" | "substation";
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

export const powerStations: PowerStation[] = [
  { id: "ps1", name: "Muela Hydropower", type: "hydro", lat: -29.25, lng: 28.85, capacity: 72, currentLoad: 58, status: "normal" },
  { id: "ps2", name: "Maseru Solar Farm", type: "solar", lat: -29.31, lng: 27.48, capacity: 25, currentLoad: 18, status: "normal" },
  { id: "ps3", name: "Leribe Substation", type: "substation", lat: -28.87, lng: 28.05, capacity: 45, currentLoad: 42, status: "warning" },
  { id: "ps4", name: "Qacha's Nek Thermal", type: "thermal", lat: -30.12, lng: 28.68, capacity: 30, currentLoad: 28, status: "critical" },
  { id: "ps5", name: "Mohale Dam Solar", type: "solar", lat: -29.89, lng: 28.92, capacity: 15, currentLoad: 12, status: "normal" },
  { id: "ps6", name: "Butha-Buthe Sub", type: "substation", lat: -28.77, lng: 28.25, capacity: 35, currentLoad: 20, status: "normal" },
  { id: "ps7", name: "Thaba-Tseka Grid", type: "substation", lat: -29.52, lng: 28.61, capacity: 40, currentLoad: 38, status: "warning" },
  { id: "ps8", name: "Mafeteng Sub", type: "substation", lat: -29.82, lng: 27.24, capacity: 30, currentLoad: 15, status: "normal" },
];

export const incidents: Incident[] = [
  {
    id: "inc1", title: "Major Transmission Line Fault", location: "N1 Highway, Maseru",
    lat: -29.35, lng: 27.55, severity: "critical", type: "fault",
    affectedPopulation: 45000, estimatedRestoration: "4-6 hours",
    timestamp: "2024-01-15T14:30:00Z",
    description: "High-voltage transmission line down near N1 highway. Traffic lights affected at 12 intersections. Emergency crews dispatched.",
    impactsTraffic: true, impactsEmergency: true,
  },
  {
    id: "inc2", title: "Substation Overload Warning", location: "Leribe Industrial Zone",
    lat: -28.88, lng: 28.06, severity: "high", type: "overload",
    affectedPopulation: 12000, estimatedRestoration: "2-3 hours",
    timestamp: "2024-01-15T15:00:00Z",
    description: "Leribe substation approaching maximum capacity. Load shedding may be required.",
    impactsTraffic: false, impactsEmergency: false,
  },
  {
    id: "inc3", title: "Brush Fire Near Power Line", location: "Route A3, Berea",
    lat: -29.15, lng: 27.95, severity: "high", type: "fire",
    affectedPopulation: 8000, estimatedRestoration: "1-2 hours",
    timestamp: "2024-01-15T13:45:00Z",
    description: "Brush fire detected within 50m of 132kV transmission line. Fire department notified. Preventive line shutdown initiated.",
    impactsTraffic: true, impactsEmergency: true,
  },
  {
    id: "inc4", title: "Scheduled Maintenance - Solar Array", location: "Maseru Solar Farm",
    lat: -29.31, lng: 27.48, severity: "low", type: "maintenance",
    affectedPopulation: 0, estimatedRestoration: "6 hours",
    timestamp: "2024-01-15T08:00:00Z",
    description: "Planned maintenance on inverter units. Partial capacity reduction expected.",
    impactsTraffic: false, impactsEmergency: false,
  },
  {
    id: "inc5", title: "Hospital Backup Generator Alert", location: "Queen Elizabeth II Hospital",
    lat: -29.32, lng: 27.49, severity: "medium", type: "fault",
    affectedPopulation: 500, estimatedRestoration: "30 minutes",
    timestamp: "2024-01-15T16:00:00Z",
    description: "Backup generator at Queen Elizabeth II Hospital showing low fuel. Resupply dispatched.",
    impactsTraffic: false, impactsEmergency: true,
  },
];

export const substationHealth: SubstationHealth[] = [
  { id: "sh1", name: "Muela Hydropower", health: 94, temperature: 42, loadPercent: 80, lastMaintenance: "2024-01-01", nextMaintenance: "2024-04-01", riskScore: 12 },
  { id: "sh2", name: "Maseru Solar Farm", health: 88, temperature: 38, loadPercent: 72, lastMaintenance: "2023-12-15", nextMaintenance: "2024-03-15", riskScore: 18 },
  { id: "sh3", name: "Leribe Substation", health: 62, temperature: 68, loadPercent: 93, lastMaintenance: "2023-10-20", nextMaintenance: "2024-01-20", riskScore: 72 },
  { id: "sh4", name: "Qacha's Nek Thermal", health: 45, temperature: 78, loadPercent: 93, lastMaintenance: "2023-09-01", nextMaintenance: "2024-01-15", riskScore: 85 },
  { id: "sh5", name: "Butha-Buthe Sub", health: 91, temperature: 35, loadPercent: 57, lastMaintenance: "2024-01-10", nextMaintenance: "2024-04-10", riskScore: 8 },
  { id: "sh6", name: "Thaba-Tseka Grid", health: 71, temperature: 58, loadPercent: 95, lastMaintenance: "2023-11-05", nextMaintenance: "2024-02-05", riskScore: 55 },
];

export const loadForecast = Array.from({ length: 24 }, (_, i) => {
  const hour = i;
  const base = 120 + Math.sin((hour - 6) * Math.PI / 12) * 60;
  return {
    hour: `${hour.toString().padStart(2, "0")}:00`,
    actual: Math.round(base + (Math.random() - 0.5) * 20),
    predicted: Math.round(base),
    capacity: 200,
  };
});

export const weeklyForecast = [
  { day: "Mon", load: 165, predicted: 160, peak: 185 },
  { day: "Tue", load: 172, predicted: 168, peak: 192 },
  { day: "Wed", load: 158, predicted: 162, peak: 178 },
  { day: "Thu", load: 180, predicted: 175, peak: 198 },
  { day: "Fri", load: 175, predicted: 170, peak: 195 },
  { day: "Sat", load: 140, predicted: 145, peak: 160 },
  { day: "Sun", load: 130, predicted: 135, peak: 150 },
];

export const trafficLightStatus = [
  { intersection: "Kingsway & Pioneer Rd", status: "active" as const, backup: true },
  { intersection: "Main South & Stadium Rd", status: "offline" as const, backup: false },
  { intersection: "Moshoeshoe Rd & UN Rd", status: "active" as const, backup: true },
  { intersection: "Cathedral Circle", status: "degraded" as const, backup: true },
  { intersection: "Lancers Gap Junction", status: "offline" as const, backup: false },
  { intersection: "Airport Rd & Ring Rd", status: "active" as const, backup: true },
];
