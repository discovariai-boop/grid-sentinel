import { useEffect, useState, useMemo } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup, Polyline, useMap } from "react-leaflet";
import { motion } from "framer-motion";
import { powerStations, transmissionLines } from "@/data/mockData";
import { AlertTriangle, Zap, Activity } from "lucide-react";
import "leaflet/dist/leaflet.css";

const statusColors: Record<string, string> = {
  normal: "#22c55e",
  warning: "#f59e0b",
  critical: "#ef4444",
  offline: "#94a3b8",
};

const lineStatusStyles: Record<string, { color: string; glowColor: string; weight: number; dashArray: string }> = {
  normal: { color: "#2563eb", glowColor: "rgba(37,99,235,0.25)", weight: 3, dashArray: "12 6" },
  warning: { color: "#f59e0b", glowColor: "rgba(245,158,11,0.4)", weight: 4, dashArray: "8 4" },
  critical: { color: "#ef4444", glowColor: "rgba(239,68,68,0.5)", weight: 5, dashArray: "6 3" },
  offline: { color: "#94a3b8", glowColor: "rgba(148,163,184,0.15)", weight: 2, dashArray: "4 8" },
};

const typeLabels: Record<string, string> = {
  coal: "🏭 Coal Power Station",
  solar: "☀️ Solar Farm",
  hydro: "⚡ Hydropower",
  substation: "🔌 Substation",
  wind: "💨 Wind Farm",
};

// Animated line component that cycles dash offset for current flow
const AnimatedLine = ({ line }: { line: typeof transmissionLines[0] }) => {
  const [dashOffset, setDashOffset] = useState(0);
  const style = lineStatusStyles[line.status];

  useEffect(() => {
    const speed = line.status === "critical" ? 60 : line.status === "warning" ? 40 : 20;
    const interval = setInterval(() => {
      setDashOffset((prev) => (prev - 1) % 100);
    }, speed);
    return () => clearInterval(interval);
  }, [line.status]);

  const isUrgent = line.status === "critical" || line.status === "warning";

  return (
    <>
      {/* Outer glow layer */}
      <Polyline
        positions={line.coordinates}
        pathOptions={{
          color: style.glowColor,
          weight: style.weight + (isUrgent ? 10 : 4),
          opacity: isUrgent ? 0.6 : 0.2,
          lineCap: "round",
          lineJoin: "round",
        }}
      />
      {/* Mid glow for critical */}
      {line.status === "critical" && (
        <Polyline
          positions={line.coordinates}
          pathOptions={{
            color: "#ef4444",
            weight: style.weight + 6,
            opacity: 0.3,
            lineCap: "round",
            lineJoin: "round",
          }}
        />
      )}
      {/* Main animated line */}
      <Polyline
        positions={line.coordinates}
        pathOptions={{
          color: style.color,
          weight: style.weight,
          opacity: 0.9,
          dashArray: style.dashArray,
          dashOffset: String(dashOffset),
          lineCap: "round",
          lineJoin: "round",
        }}
      >
        <Popup>
          <div className="p-2 min-w-[200px]">
            <p className="font-bold text-sm flex items-center gap-1">
              <Zap className="w-3.5 h-3.5" /> {line.label}
            </p>
            <div className="mt-2 space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Voltage</span>
                <span className="font-semibold">{line.voltage} kV</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Load</span>
                <span className="font-semibold" style={{ color: statusColors[line.status] }}>{line.loadPercent}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                <div
                  className="h-1.5 rounded-full transition-all"
                  style={{
                    width: `${line.loadPercent}%`,
                    backgroundColor: statusColors[line.status],
                  }}
                />
              </div>
              <div className="flex justify-between text-xs mt-1">
                <span className="text-muted-foreground">Status</span>
                <span className="font-semibold capitalize" style={{ color: statusColors[line.status] }}>
                  {line.status === "critical" ? "⚠ CRITICAL" : line.status === "warning" ? "⚡ WARNING" : line.status}
                </span>
              </div>
            </div>
          </div>
        </Popup>
      </Polyline>
    </>
  );
};

// Pulsing station marker
const StationMarker = ({ station }: { station: typeof powerStations[0] }) => {
  const isUrgent = station.status === "critical" || station.status === "warning";
  const loadPercent = Math.round((station.currentLoad / station.capacity) * 100);

  return (
    <>
      {/* Pulse ring for urgent stations */}
      {isUrgent && (
        <CircleMarker
          center={[station.lat, station.lng]}
          radius={station.type === "substation" ? 16 : 22}
          pathOptions={{
            color: statusColors[station.status],
            fillColor: "transparent",
            fillOpacity: 0,
            weight: 2,
            opacity: 0.4,
            dashArray: "4 4",
          }}
        />
      )}
      {/* Main marker */}
      <CircleMarker
        center={[station.lat, station.lng]}
        radius={station.type === "substation" ? 9 : 15}
        pathOptions={{
          color: statusColors[station.status],
          fillColor: statusColors[station.status],
          fillOpacity: isUrgent ? 0.85 : 0.65,
          weight: isUrgent ? 3 : 2,
        }}
      >
        <Popup>
          <div className="p-2 min-w-[220px]">
            <p className="font-bold text-sm">{station.name}</p>
            <p className="text-xs text-muted-foreground">{typeLabels[station.type]}</p>
            <div className="mt-2 space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Load</span>
                <span className="font-bold">{station.currentLoad} / {station.capacity} MW</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all"
                  style={{
                    width: `${loadPercent}%`,
                    backgroundColor: statusColors[station.status],
                  }}
                />
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Utilization</span>
                <span className="font-semibold" style={{ color: statusColors[station.status] }}>{loadPercent}%</span>
              </div>
              {isUrgent && (
                <div className="flex items-center gap-1 text-xs mt-1 px-2 py-1 rounded-md" style={{ backgroundColor: `${statusColors[station.status]}15`, color: statusColors[station.status] }}>
                  <AlertTriangle className="w-3 h-3" />
                  <span className="font-semibold">Immediate attention required</span>
                </div>
              )}
            </div>
          </div>
        </Popup>
      </CircleMarker>
    </>
  );
};

const GridMap = () => {
  const urgentLines = transmissionLines.filter((l) => l.status === "critical" || l.status === "warning");
  const normalLines = transmissionLines.filter((l) => l.status === "normal" || l.status === "offline");

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="glass-card overflow-hidden h-full relative"
    >
      {/* Legend */}
      <div className="absolute top-3 right-3 z-[1000] glass-card p-3 space-y-1.5 text-xs">
        <p className="font-bold text-foreground text-[11px] mb-2 flex items-center gap-1"><Activity className="w-3 h-3" /> Grid Status</p>
        {[
          { label: "Normal", color: "#22c55e" },
          { label: "Warning", color: "#f59e0b" },
          { label: "Critical", color: "#ef4444" },
          { label: "Offline", color: "#94a3b8" },
        ].map((s) => (
          <div key={s.label} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: s.color, boxShadow: `0 0 6px ${s.color}` }} />
            <span className="text-muted-foreground">{s.label}</span>
          </div>
        ))}
        {urgentLines.length > 0 && (
          <div className="pt-1.5 mt-1.5 border-t border-border">
            <p className="text-danger font-bold flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> {urgentLines.length} lines need attention</p>
          </div>
        )}
      </div>

      <MapContainer
        center={[-23.5, 29.0]}
        zoom={7}
        className="w-full h-full min-h-[400px]"
        style={{ borderRadius: "var(--radius)" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        {/* Render normal lines first, then urgent ones on top */}
        {normalLines.map((line) => (
          <AnimatedLine key={line.id} line={line} />
        ))}
        {urgentLines.map((line) => (
          <AnimatedLine key={line.id} line={line} />
        ))}

        {powerStations.map((station) => (
          <StationMarker key={station.id} station={station} />
        ))}
      </MapContainer>
    </motion.div>
  );
};

export default GridMap;
