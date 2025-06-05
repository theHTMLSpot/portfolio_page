import { motion } from "framer-motion";

export default function SlideInTitle({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <motion.div className={`w-fit max-w-md overflow-x-hidden ${className}`}>
      <motion.div
        initial={{ translateY: 400 }}
        animate={{ translateY: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="w-full"
      >
        <h1 className="text-foreground text-4xl font-black">{text}</h1>
      </motion.div>
    </motion.div>
  );
}
