import { motion } from "framer-motion";
import { Shield, AlertTriangle, Radio, Flame, Ambulance, TrafficCone } from "lucide-react";
import { trafficLightStatus } from "@/data/mockData";

const EmergencyPage = () => {
  const quickAlerts = [
    { label: "Power-Related Road Hazard", icon: TrafficCone, color: "bg-warning hover:bg-warning/90 text-warning-foreground" },
    { label: "Hospital Backup Generator Needed", icon: Ambulance, color: "bg-danger hover:bg-danger/90 text-danger-foreground" },
    { label: "Fire Near Power Line", icon: Flame, color: "bg-danger hover:bg-danger/90 text-danger-foreground" },
    { label: "Notify All Emergency Services", icon: Radio, color: "bg-foreground hover:bg-foreground/90 text-background" },
  ];

  return (
    <div className="space-y-6">
      <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xl font-bold text-foreground">
        Emergency & Safety Coordination
      </motion.h2>

      {/* Quick Alert Buttons */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-5">
        <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
          <Shield className="w-4 h-4 text-danger" /> One-Click Emergency Alerts
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {quickAlerts.map((alert, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center gap-3 p-4 rounded-lg font-semibold text-sm transition-colors ${alert.color}`}
            >
              <alert.icon className="w-5 h-5" />
              {alert.label}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Traffic Light Status */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-5">
        <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
          <TrafficCone className="w-4 h-4 text-warning" /> Smart Traffic Light Power Status
        </h3>
        <div className="space-y-2">
          {trafficLightStatus.map((tl, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <span className="text-sm font-medium text-foreground">{tl.intersection}</span>
              <div className="flex items-center gap-3">
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                  tl.status === "active" ? "bg-success/10 text-success" :
                  tl.status === "degraded" ? "bg-warning/10 text-warning" :
                  "bg-danger/10 text-danger"
                }`}>
                  {tl.status.toUpperCase()}
                </span>
                <span className={`text-xs ${tl.backup ? "text-success" : "text-danger"}`}>
                  {tl.backup ? "✓ Backup" : "✗ No Backup"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Cross-Department Integration */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-5">
        <h3 className="text-sm font-semibold text-foreground mb-4">Cross-Department Live Feed</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { dept: "Fire Department", status: "2 Active Responses", icon: Flame, statusColor: "text-danger" },
            { dept: "EMS / Ambulance", status: "All Clear", icon: Ambulance, statusColor: "text-success" },
            { dept: "Transport & Traffic", status: "3 Affected Intersections", icon: TrafficCone, statusColor: "text-warning" },
          ].map((dept, i) => (
            <div key={i} className="p-4 rounded-lg border border-border bg-card">
              <div className="flex items-center gap-2 mb-2">
                <dept.icon className="w-4 h-4 text-muted-foreground" />
                <h4 className="text-sm font-semibold text-foreground">{dept.dept}</h4>
              </div>
              <p className={`text-sm font-medium ${dept.statusColor}`}>{dept.status}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default EmergencyPage;
