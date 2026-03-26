import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from "recharts";
import { loadForecast, weeklyForecast, substationHealth } from "@/data/mockData";
import LoadGauge from "@/components/LoadGauge";

const AnalyticsPage = () => {
  return (
    <div className="space-y-6">
      <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xl font-bold text-foreground">
        Grid Health & Predictive Analytics
      </motion.h2>

      {/* Load Forecast 24h */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">24-Hour Load Forecast</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={loadForecast}>
              <defs>
                <linearGradient id="actualGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(45, 93%, 53%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(45, 93%, 53%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
              <XAxis dataKey="hour" tick={{ fontSize: 11 }} stroke="hsl(220, 10%, 46%)" />
              <YAxis tick={{ fontSize: 11 }} stroke="hsl(220, 10%, 46%)" />
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(220, 13%, 91%)", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }} />
              <Area type="monotone" dataKey="capacity" stroke="hsl(0, 72%, 51%)" strokeDasharray="5 5" fill="none" strokeWidth={1.5} name="Capacity" />
              <Area type="monotone" dataKey="predicted" stroke="hsl(220, 10%, 70%)" fill="none" strokeWidth={1.5} strokeDasharray="3 3" name="Predicted" />
              <Area type="monotone" dataKey="actual" stroke="hsl(45, 93%, 53%)" fill="url(#actualGrad)" strokeWidth={2} name="Actual" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">7-Day Load Forecast</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={weeklyForecast}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} stroke="hsl(220, 10%, 46%)" />
              <YAxis tick={{ fontSize: 11 }} stroke="hsl(220, 10%, 46%)" />
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(220, 13%, 91%)" }} />
              <Legend />
              <Bar dataKey="load" fill="hsl(45, 93%, 53%)" name="Avg Load" radius={[4, 4, 0, 0]} />
              <Bar dataKey="peak" fill="hsl(0, 72%, 51%)" name="Peak" radius={[4, 4, 0, 0]} opacity={0.7} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Substation Risk + Health */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-5">
        <h3 className="text-sm font-semibold text-foreground mb-4">AI Failure Risk Assessment</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {substationHealth.map((sub) => (
            <div key={sub.id} className={`p-4 rounded-lg border ${
              sub.riskScore > 70 ? "border-danger/30 bg-danger/5" : sub.riskScore > 40 ? "border-warning/30 bg-warning/5" : "border-border bg-card"
            }`}>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold text-foreground">{sub.name}</h4>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                  sub.riskScore > 70 ? "bg-danger text-danger-foreground" : sub.riskScore > 40 ? "bg-warning text-warning-foreground" : "bg-success text-success-foreground"
                }`}>
                  Risk: {sub.riskScore}%
                </span>
              </div>
              <LoadGauge value={sub.loadPercent} max={100} label="Load" unit="%" />
              <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                <span>Temp: {sub.temperature}°C</span>
                <span>Health: {sub.health}%</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AnalyticsPage;
