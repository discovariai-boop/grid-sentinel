import { useState } from "react";
import { motion } from "framer-motion";
import { Zap, AlertTriangle, Users, Activity, Bell, Search, Shield } from "lucide-react";
import DashboardSidebar from "@/components/DashboardSidebar";
import MetricCard from "@/components/MetricCard";
import GridMap from "@/components/GridMap";
import IncidentCard from "@/components/IncidentCard";
import LoadGauge from "@/components/LoadGauge";
import AnalyticsPage from "@/components/AnalyticsPage";
import EmergencyPage from "@/components/EmergencyPage";
import AssetsPage from "@/components/AssetsPage";
import PowerGridBackground from "@/components/PowerGridBackground";
import { incidents, powerStations } from "@/data/mockData";
import eskomLogo from "@/assets/eskom-logo.jpg";

const OverviewPage = () => (
  <div className="space-y-6">
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-primary/10 border border-primary/20"
    >
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="w-2.5 h-2.5 rounded-full bg-success"
      />
      <span className="text-xs font-semibold text-foreground">GRID STATUS: OPERATIONAL · LOAD SHEDDING STAGE 0</span>
      <span className="text-xs text-muted-foreground ml-auto font-mono">LAST SYNC: {new Date().toLocaleTimeString()}</span>
    </motion.div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard title="Provincial Load" value="8,550" unit="MW" icon={Zap} status="normal" delay={0} trend={{ value: 2.8, label: "vs yesterday" }} />
      <MetricCard title="Active Outages" value="5" icon={AlertTriangle} status="critical" delay={0.1} trend={{ value: 25, label: "vs last week" }} />
      <MetricCard title="Affected Population" value="132,800" icon={Users} status="warning" delay={0.2} />
      <MetricCard title="Emergency Impact" value="3" unit="services" icon={Activity} status="critical" delay={0.3} />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 h-[500px]">
        <GridMap />
      </div>
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-danger" /> Live Incidents
        </h3>
        <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
          {incidents.slice(0, 4).map((inc, i) => (
            <IncidentCard key={inc.id} incident={inc} index={i} compact />
          ))}
        </div>
      </div>
    </div>

    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card p-5">
      <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
        <Zap className="w-4 h-4 text-primary" /> Power Station Load
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {powerStations.slice(0, 4).map((station) => (
          <LoadGauge key={station.id} value={station.currentLoad} max={station.capacity} label={station.name} />
        ))}
      </div>
    </motion.div>
  </div>
);

const IncidentsPage = () => (
  <div className="space-y-4">
    <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xl font-bold text-foreground">
      Real-Time Incident Management
    </motion.h2>
    <div className="space-y-3">
      {incidents.map((inc, i) => (
        <IncidentCard key={inc.id} incident={inc} index={i} />
      ))}
    </div>
  </div>
);

const ElectricityDashboard = () => {
  const [activePage, setActivePage] = useState("overview");

  const renderPage = () => {
    switch (activePage) {
      case "overview": return <OverviewPage />;
      case "incidents": return <IncidentsPage />;
      case "analytics": return <AnalyticsPage />;
      case "emergency": return <EmergencyPage />;
      case "assets": return <AssetsPage />;
      default: return <OverviewPage />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background relative">
      <PowerGridBackground />
      <DashboardSidebar activePage={activePage} onNavigate={setActivePage} />
      <main className="flex-1 overflow-y-auto relative z-10">
        <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-xl border-b border-border px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={eskomLogo} alt="Eskom" className="w-9 h-9 rounded-lg object-cover" />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-foreground">Limpopo Provincial Electricity Command Center</h1>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-primary/15 text-primary border border-primary/20 tracking-wider">LIVE</span>
              </div>
              <p className="text-xs text-muted-foreground">LPECC · Eskom Limpopo Operating Unit · Grid Monitoring & Emergency Response</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                placeholder="Search grid, assets..."
                className="pl-9 pr-4 py-2 rounded-lg bg-muted/50 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ring w-52"
              />
            </div>
            <button className="relative p-2 rounded-lg hover:bg-muted transition-colors">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-danger text-danger-foreground text-[10px] font-bold rounded-full flex items-center justify-center">5</span>
            </button>
            <div className="h-6 w-px bg-border" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <Shield className="w-4 h-4 text-primary-foreground" />
              </div>
              <div className="hidden lg:block">
                <p className="text-xs font-semibold text-foreground">Commander</p>
                <p className="text-[10px] text-muted-foreground">Eskom Limpopo Ops</p>
              </div>
            </div>
          </div>
        </div>
        <div className="p-6">
          {renderPage()}
        </div>
      </main>
    </div>
  );
};

export default ElectricityDashboard;
