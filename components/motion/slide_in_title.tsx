import useHasMounted from "@/hooks/hasMounted";
import { motion } from "framer-motion";

export default function SlideInTitle({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const hasMounted = useHasMounted();

  if (!hasMounted) {
    return (
      <div className={`w-fit max-w-md overflow-x-hidden ${className}`}>
        <h1 className="text-foreground text-4xl font-black">{text}</h1>
      </div>
    );
  }

  return (
    <motion.div className={`h-20 w-fit max-w-md ${className}`}>
      <motion.div
        initial={{ translateY: 50, opacity: 0 }}
        whileInView={{ translateY: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
        className="w-full"
      >
        <h1 className="text-foreground text-4xl font-black">{text}</h1>
      </motion.div>
    </motion.div>
  );
}
