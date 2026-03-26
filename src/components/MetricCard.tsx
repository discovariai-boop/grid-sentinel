import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon: LucideIcon;
  trend?: { value: number; label: string };
  status?: "normal" | "warning" | "critical";
  delay?: number;
}

const statusColors = {
  normal: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
  critical: "bg-danger/10 text-danger",
};

const statusGlow = {
  normal: "",
  warning: "glow-yellow",
  critical: "glow-red pulse-danger",
};

const MetricCard = ({ title, value, unit, icon: Icon, trend, status = "normal", delay = 0 }: MetricCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`metric-card ${statusGlow[status]}`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2.5 rounded-lg ${statusColors[status]}`}>
          <Icon className="w-5 h-5" />
        </div>
        {trend && (
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${trend.value >= 0 ? "bg-danger/10 text-danger" : "bg-success/10 text-success"}`}>
            {trend.value >= 0 ? "↑" : "↓"} {Math.abs(trend.value)}%
          </span>
        )}
      </div>
      <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold text-foreground">{value}</span>
        {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
      </div>
      {/* Decorative accent bar */}
      <div className={`absolute bottom-0 left-0 right-0 h-1 rounded-b-xl ${
        status === "critical" ? "bg-danger" : status === "warning" ? "bg-warning" : "bg-success"
      }`} />
    </motion.div>
  );
};

export default MetricCard;
