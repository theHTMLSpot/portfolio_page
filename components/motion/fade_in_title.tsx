import { Title } from "../components";
import { motion } from "framer-motion";

export default function FadeInTitle({
  text,
  className,
  duration,
}: {
  text: string;
  className?: string;
  duration?: number;
}) {
  return (
    <motion.div
      key={text}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: duration || 2 }}
      className={`flex h-full ${className}`}
    >
      <Title level={1} className="h-full font-bold">
        {text}
      </Title>
    </motion.div>
  );
}
