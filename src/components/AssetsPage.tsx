import { motion } from "framer-motion";
import { Wrench, Battery, Sun, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import { substationHealth, powerStations } from "@/data/mockData";
import LoadGauge from "@/components/LoadGauge";

const AssetsPage = () => {
  const maintenanceSchedule = [
    { asset: "Leribe Substation", task: "Transformer inspection", date: "Jan 20, 2024", crew: "Team Alpha", priority: "urgent" as const },
    { asset: "Qacha's Nek Thermal", task: "Turbine overhaul", date: "Jan 22, 2024", crew: "Team Bravo", priority: "urgent" as const },
    { asset: "Maseru Solar Farm", task: "Inverter replacement", date: "Jan 25, 2024", crew: "Team Charlie", priority: "normal" as const },
    { asset: "Butha-Buthe Sub", task: "Routine inspection", date: "Feb 10, 2024", crew: "Team Delta", priority: "normal" as const },
  ];

  const backupGenerators = [
    { location: "Queen Elizabeth II Hospital", fuel: 72, status: "active" as const },
    { location: "Maseru Border Post", fuel: 95, status: "standby" as const },
    { location: "LPISTH Command Center", fuel: 88, status: "standby" as const },
    { location: "Moshoeshoe I Airport", fuel: 45, status: "active" as const },
  ];

  return (
    <div className="space-y-6">
      <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xl font-bold text-foreground">
        Asset & Maintenance Management
      </motion.h2>

      {/* Station Status Grid */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-5">
        <h3 className="text-sm font-semibold text-foreground mb-4">Power Station Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {powerStations.map((station) => (
            <div key={station.id} className={`p-4 rounded-lg border ${
              station.status === "critical" ? "border-danger/30 bg-danger/5" :
              station.status === "warning" ? "border-warning/30 bg-warning/5" :
              "border-border bg-card"
            }`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-muted-foreground capitalize">{station.type}</span>
                <span className={`w-2 h-2 rounded-full ${
                  station.status === "normal" ? "bg-success" :
                  station.status === "warning" ? "bg-warning" :
                  "bg-danger pulse-danger"
                }`} />
              </div>
              <h4 className="text-sm font-semibold text-foreground mb-2">{station.name}</h4>
              <LoadGauge value={station.currentLoad} max={station.capacity} label="" />
            </div>
          ))}
        </div>
      </motion.div>

      {/* Maintenance Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <Wrench className="w-4 h-4" /> Maintenance Schedule
          </h3>
          <div className="space-y-3">
            {maintenanceSchedule.map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <div className={`p-1.5 rounded ${item.priority === "urgent" ? "bg-danger/10" : "bg-muted"}`}>
                  {item.priority === "urgent" ? <AlertTriangle className="w-4 h-4 text-danger" /> : <CheckCircle className="w-4 h-4 text-success" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{item.asset}</p>
                  <p className="text-xs text-muted-foreground">{item.task} • {item.crew}</p>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" /> {item.date}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Backup Generators */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <Battery className="w-4 h-4" /> Backup Generators
          </h3>
          <div className="space-y-3">
            {backupGenerators.map((gen, i) => (
              <div key={i} className="p-3 rounded-lg bg-muted/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">{gen.location}</span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    gen.status === "active" ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"
                  }`}>
                    {gen.status.toUpperCase()}
                  </span>
                </div>
                <LoadGauge value={gen.fuel} max={100} label="Fuel Level" unit="%" />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AssetsPage;
