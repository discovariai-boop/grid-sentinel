import { motion } from "framer-motion";
import { AlertTriangle, MapPin, Clock, Users, TrafficCone, Activity } from "lucide-react";
import { Incident } from "@/data/mockData";

interface IncidentCardProps {
  incident: Incident;
  index: number;
  compact?: boolean;
}

const severityConfig = {
  low: { bg: "bg-muted", text: "text-muted-foreground", badge: "bg-muted text-muted-foreground", label: "Low" },
  medium: { bg: "bg-primary/10", text: "text-primary-foreground", badge: "bg-primary text-primary-foreground", label: "Medium" },
  high: { bg: "bg-warning/10", text: "text-warning", badge: "bg-warning text-warning-foreground", label: "High" },
  critical: { bg: "bg-danger/10", text: "text-danger", badge: "bg-danger text-danger-foreground", label: "Critical" },
};

const typeIcons = {
  outage: AlertTriangle,
  fault: Activity,
  fire: AlertTriangle,
  overload: Activity,
  maintenance: Clock,
};

const IncidentCard = ({ incident, index, compact = false }: IncidentCardProps) => {
  const config = severityConfig[incident.severity];
  const TypeIcon = typeIcons[incident.type];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className={`glass-card p-4 hover:shadow-lg transition-all duration-300 cursor-pointer ${
        incident.severity === "critical" ? "border-danger/30 pulse-danger" : ""
      }`}
    >
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg flex-shrink-0 ${config.bg}`}>
          <TypeIcon className={`w-4 h-4 ${config.text}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-sm font-semibold text-foreground truncate">{incident.title}</h4>
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${config.badge}`}>
              {config.label}
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{incident.location}</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />ETA: {incident.estimatedRestoration}</span>
          </div>
          {!compact && (
            <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{incident.description}</p>
          )}
          <div className="flex items-center gap-3">
            {incident.affectedPopulation > 0 && (
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Users className="w-3 h-3" /> {incident.affectedPopulation.toLocaleString()} affected
              </span>
            )}
            {incident.impactsTraffic && (
              <span className="flex items-center gap-1 text-xs text-warning">
                <TrafficCone className="w-3 h-3" /> Traffic Impact
              </span>
            )}
            {incident.impactsEmergency && (
              <span className="flex items-center gap-1 text-xs text-danger">
                <Activity className="w-3 h-3" /> Emergency Impact
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default IncidentCard;
