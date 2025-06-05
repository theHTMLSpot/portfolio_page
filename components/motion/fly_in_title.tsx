import { motion } from "framer-motion";

export default function FlyInTitle({ text }: { text: string }) {
  return (
    <motion.div className="w-full max-w-md overflow-hidden">
      <motion.div
        initial={{ translateX: -220 }}
        animate={{ translateX: 0 }}
        transition={{ duration: 0.2, delay: 0.1 }}
        className="relative flex items-center gap-2 pl-2"
      >
        {/* SPEED LINES (Overlayed) */}
        <motion.div className="pointer-events-none absolute inset-y-0 left-0 z-50 flex flex-col items-start justify-center">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              initial={{ translateX: -50, opacity: 1 }}
              animate={{ translateX: 0, opacity: 0 }}
              transition={{
                duration: 0.4,
                delay: 0.1 + i * 0.2,
                ease: "easeOut",
              }}
              className="my-0.5 h-1 w-10 rounded-full bg-white"
            />
          ))}
        </motion.div>

        {/* TITLE */}
        <h2 className="text-foreground text-4xl font-black">{text}</h2>
      </motion.div>
    </motion.div>
  );
}
