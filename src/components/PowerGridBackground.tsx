import { motion } from "framer-motion";

const PowerGridBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid-pattern" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="hsl(211, 76%, 38%)" strokeWidth="0.5" />
          </pattern>
          <pattern id="dot-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="1" fill="hsl(211, 76%, 38%)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        <rect width="100%" height="100%" fill="url(#dot-pattern)" />
      </svg>

      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <motion.line x1="0" y1="20%" x2="100%" y2="20%" stroke="hsl(211, 76%, 38%)" strokeWidth="1" strokeDasharray="12 8" opacity={0.06}
          animate={{ strokeDashoffset: [0, -40] }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} />
        <motion.line x1="0" y1="50%" x2="100%" y2="50%" stroke="hsl(152, 60%, 38%)" strokeWidth="1" strokeDasharray="16 12" opacity={0.05}
          animate={{ strokeDashoffset: [0, -56] }} transition={{ duration: 6, repeat: Infinity, ease: "linear" }} />
        <motion.line x1="0" y1="80%" x2="100%" y2="80%" stroke="hsl(211, 76%, 38%)" strokeWidth="1" strokeDasharray="10 6" opacity={0.06}
          animate={{ strokeDashoffset: [0, -32] }} transition={{ duration: 5, repeat: Infinity, ease: "linear" }} />

        <motion.line x1="15%" y1="0" x2="15%" y2="100%" stroke="hsl(152, 60%, 38%)" strokeWidth="0.5" strokeDasharray="8 16" opacity={0.04}
          animate={{ strokeDashoffset: [0, -48] }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} />
        <motion.line x1="50%" y1="0" x2="50%" y2="100%" stroke="hsl(211, 76%, 38%)" strokeWidth="0.5" strokeDasharray="6 20" opacity={0.04}
          animate={{ strokeDashoffset: [0, -52] }} transition={{ duration: 7, repeat: Infinity, ease: "linear" }} />
        <motion.line x1="85%" y1="0" x2="85%" y2="100%" stroke="hsl(152, 60%, 38%)" strokeWidth="0.5" strokeDasharray="8 16" opacity={0.04}
          animate={{ strokeDashoffset: [0, -48] }} transition={{ duration: 9, repeat: Infinity, ease: "linear" }} />

        <motion.line x1="0" y1="0" x2="40%" y2="100%" stroke="hsl(211, 76%, 38%)" strokeWidth="0.8" strokeDasharray="20 30" opacity={0.04}
          animate={{ strokeDashoffset: [0, -100] }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} />
        <motion.line x1="60%" y1="0" x2="100%" y2="100%" stroke="hsl(152, 60%, 38%)" strokeWidth="0.8" strokeDasharray="20 30" opacity={0.04}
          animate={{ strokeDashoffset: [0, -100] }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }} />

        {[
          { cx: "15%", cy: "20%" }, { cx: "50%", cy: "20%" }, { cx: "85%", cy: "20%" },
          { cx: "15%", cy: "50%" }, { cx: "50%", cy: "50%" }, { cx: "85%", cy: "50%" },
          { cx: "15%", cy: "80%" }, { cx: "50%", cy: "80%" }, { cx: "85%", cy: "80%" },
        ].map((node, i) => (
          <g key={i}>
            <motion.circle cx={node.cx} cy={node.cy} r="3" fill="hsl(211, 76%, 38%)" opacity={0.08}
              animate={{ opacity: [0.05, 0.12, 0.05] }} transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }} />
            <circle cx={node.cx} cy={node.cy} r="1" fill="hsl(152, 60%, 38%)" opacity={0.15} />
          </g>
        ))}
      </svg>

      <div className="absolute top-0 right-0 w-64 h-64 opacity-[0.03]">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <path d="M 200 0 L 200 60 L 140 60 L 140 100 L 80 100 L 80 140 L 40 140 L 40 200" fill="none" stroke="hsl(211, 76%, 38%)" strokeWidth="2" />
          <circle cx="200" cy="0" r="4" fill="hsl(211, 76%, 38%)" />
          <circle cx="140" cy="60" r="3" fill="hsl(152, 60%, 38%)" />
          <circle cx="80" cy="100" r="3" fill="hsl(211, 76%, 38%)" />
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 w-64 h-64 opacity-[0.03] rotate-180">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <path d="M 200 0 L 200 60 L 140 60 L 140 100 L 80 100 L 80 140 L 40 140 L 40 200" fill="none" stroke="hsl(152, 60%, 38%)" strokeWidth="2" />
          <circle cx="200" cy="0" r="4" fill="hsl(152, 60%, 38%)" />
          <circle cx="140" cy="60" r="3" fill="hsl(211, 76%, 38%)" />
        </svg>
      </div>
    </div>
  );
};

export default PowerGridBackground;
