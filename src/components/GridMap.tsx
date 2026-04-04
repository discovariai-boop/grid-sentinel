import { MapContainer, TileLayer, CircleMarker, Popup, Polyline } from "react-leaflet";
import { motion } from "framer-motion";
import { powerStations, transmissionLines } from "@/data/mockData";
import "leaflet/dist/leaflet.css";

const statusColors = {
  normal: "#22c55e",
  warning: "#f59e0b",
  critical: "#ef4444",
  offline: "#94a3b8",
};

const typeLabels = {
  coal: "🏭 Coal Power Station",
  solar: "☀️ Solar Farm",
  hydro: "⚡ Hydropower",
  substation: "🔌 Substation",
  wind: "💨 Wind Farm",
};

const GridMap = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="glass-card overflow-hidden h-full"
    >
      <MapContainer
        center={[-23.5, 29.0]}
        zoom={7}
        className="w-full h-full min-h-[400px]"
        style={{ borderRadius: "var(--radius)" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />

        {transmissionLines.map((line, i) => (
          <Polyline
            key={`line-${i}`}
            positions={line}
            pathOptions={{
              color: "#2563eb",
              weight: 2,
              opacity: 0.5,
              dashArray: "8 4",
            }}
          />
        ))}

        {powerStations.map((station) => (
          <CircleMarker
            key={station.id}
            center={[station.lat, station.lng]}
            radius={station.type === "substation" ? 8 : 14}
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
