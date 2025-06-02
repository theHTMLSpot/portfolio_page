"use client";

import { motion } from "framer-motion";

const barCount = 6;

export default function RevealBars() {
  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {[...Array(barCount)].map((_, i) => {
        const delay = Math.random() * 0.6; // up to 0.8s random delay
        const duration = 0.8 + Math.random() * 0.4; // 0.8s to 1.2s duration

        return (
          <motion.div
            key={i}
            initial={{ height: "100vh" }}
            animate={{ height: 0 }}
            transition={{
              delay,
              duration,
              ease: "easeInOut",
            }}
            className="absolute top-20 w-[calc(100%/6)] bg-teal-900"
            style={{ left: `${(100 / barCount) * i}%` }}
          />
        );
      })}
    </div>
  );
}
