import { motion } from "framer-motion";

export default function ShakeOnError({
  children,
  trigger,
}: {
  children: React.ReactNode;
  trigger: boolean;
}) {
  return (
    <motion.div
      animate={
        trigger
          ? {
              x: [0, -4, 4, -4, 4, 0],
              rotateZ: [0, -1, 1, -1, 1, 0],
            }
          : false
      }
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}
