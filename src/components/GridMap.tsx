import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup, Polyline } from "react-leaflet";
import { motion } from "framer-motion";
import { powerStations } from "@/data/mockData";
import "leaflet/dist/leaflet.css";

const statusColors = {
  normal: "#22c55e",
  warning: "#f59e0b",
  critical: "#ef4444",
  offline: "#94a3b8",
};

const typeLabels = {
  hydro: "⚡ Hydropower",
  solar: "☀️ Solar Farm",
  thermal: "🔥 Thermal Plant",
  substation: "🔌 Substation",
};

const transmissionLines: [number, number][][] = [
  [[-29.25, 28.85], [-28.87, 28.05]],
  [[-28.87, 28.05], [-28.77, 28.25]],
  [[-29.25, 28.85], [-29.52, 28.61]],
  [[-29.31, 27.48], [-29.82, 27.24]],
  [[-29.52, 28.61], [-30.12, 28.68]],
  [[-29.25, 28.85], [-29.89, 28.92]],
];

const GridMap = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="glass-card overflow-hidden h-full"
    >
      <MapContainer
        center={[-29.5, 28.2]}
        zoom={8}
        className="w-full h-full min-h-[400px]"
        style={{ borderRadius: "var(--radius)" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />

        {/* Transmission Lines */}
        {transmissionLines.map((line, i) => (
          <Polyline
            key={`line-${i}`}
            positions={line}
            pathOptions={{
              color: "#facc15",
              weight: 2,
              opacity: 0.6,
              dashArray: "8 4",
            }}
          />
        ))}

        {/* Power Stations */}
        {powerStations.map((station) => (
          <CircleMarker
            key={station.id}
            center={[station.lat, station.lng]}
            radius={station.type === "substation" ? 8 : 12}
            pathOptions={{
              color: statusColors[station.status],
              fillColor: statusColors[station.status],
              fillOpacity: 0.7,
              weight: 2,
            }}
          >
            <Popup>
              <div className="p-1">
                <p className="font-bold text-sm">{station.name}</p>
                <p className="text-xs text-muted-foreground">{typeLabels[station.type]}</p>
                <p className="text-xs mt-1">
                  Load: <strong>{station.currentLoad}/{station.capacity} MW</strong>
                </p>
                <p className="text-xs">
                  Status: <span style={{ color: statusColors[station.status] }} className="font-semibold capitalize">{station.status}</span>
                </p>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </motion.div>
  );
};

export default GridMap;
