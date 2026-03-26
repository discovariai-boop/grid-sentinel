import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, LayoutDashboard, AlertTriangle, BarChart3, Shield, Wrench, ChevronLeft, ChevronRight, Bell } from "lucide-react";

interface SidebarProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

const navItems = [
  { id: "overview", label: "Grid Overview", icon: LayoutDashboard },
  { id: "incidents", label: "Incidents", icon: AlertTriangle },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "emergency", label: "Emergency", icon: Shield },
  { id: "assets", label: "Assets", icon: Wrench },
];

const DashboardSidebar = ({ activePage, onNavigate }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 260 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="h-screen bg-sidebar flex flex-col border-r border-sidebar-border relative z-20"
    >
      <div className="flex items-center gap-3 px-4 py-5 border-b border-sidebar-border">
        <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
          <Zap className="w-5 h-5 text-primary-foreground" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="overflow-hidden">
              <p className="text-sm font-bold text-sidebar-foreground tracking-wide">LPISTH</p>
              <p className="text-xs text-sidebar-muted">Electricity Dept.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`sidebar-item w-full ${activePage === item.id ? "active" : ""}`}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            <AnimatePresence>
              {!collapsed && (
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>
            {item.id === "incidents" && !collapsed && (
              <span className="ml-auto bg-danger text-danger-foreground text-xs font-bold px-2 py-0.5 rounded-full">3</span>
            )}
          </button>
        ))}
      </nav>

      <div className="p-3 border-t border-sidebar-border">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="sidebar-item w-full justify-center"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </motion.aside>
  );
};

export default DashboardSidebar;
