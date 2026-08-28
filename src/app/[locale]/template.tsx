"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname} className="relative">
        {children}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="pointer-events-none fixed inset-0 z-[70]"
        >
          <div className="absolute inset-0 bg-paper" />
          <div
            className="absolute inset-0 opacity-30 mix-blend-multiply"
            style={{
              backgroundImage:
                "linear-gradient(transparent 0%, rgba(27,34,48,0.06) 1px)",
              backgroundSize: "100% 4px",
            }}
          />
        </motion.div>
        <motion.div
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: 1 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="pointer-events-none fixed inset-0 z-[80] origin-top bg-[#ece4d3]"
        />
        <motion.div
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: 1 }}
          transition={{ duration: 0.7, ease: "easeInOut", delay: 0.05 }}
          className="pointer-events-none fixed inset-0 z-[81] origin-bottom bg-[#f6f1e7]"
        />
      </motion.div>
    </AnimatePresence>
  );
}
