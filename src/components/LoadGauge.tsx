import { motion } from "framer-motion";

interface LoadGaugeProps {
  value: number;
  max: number;
  label: string;
  unit?: string;
}

const LoadGauge = ({ value, max, label, unit = "MW" }: LoadGaugeProps) => {
  const percent = (value / max) * 100;
  const status = percent > 90 ? "critical" : percent > 75 ? "warning" : "normal";

  const colorMap = {
    normal: { bar: "bg-success", text: "text-success" },
    warning: { bar: "bg-warning", text: "text-warning" },
    critical: { bar: "bg-danger", text: "text-danger" },
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">{label}</span>
        <span className={`text-sm font-bold ${colorMap[status].text}`}>
          {value} / {max} {unit}
        </span>
      </div>
      <div className="h-3 bg-muted rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-full rounded-full ${colorMap[status].bar} ${status === "critical" ? "pulse-danger" : ""}`}
        />
      </div>
      <span className="text-xs text-muted-foreground">{percent.toFixed(1)}% capacity</span>
    </div>
  );
};

export default LoadGauge;
