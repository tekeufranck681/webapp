import { motion } from "framer-motion";

const FloatingShape = ({
  color,
  size,
  top,
  left,
  delay,
}: {
  color: string; // Accepts HEX, RGB, or Tailwind class
  size: string;  // Tailwind size class like "w-16 h-16"
  top: string;   // Tailwind position class like "top-10"
  left: string;  // Tailwind position class like "left-10"
  delay: number;
}) => {
  return (
    <motion.div
      className={`absolute rounded-full ${size} opacity-20 ${top} ${left}`}
      style={{ backgroundColor: color, willChange: "transform" }}
      animate={{
        y: ["0%", "50%", "0%"],
        x: ["0%", "30%", "0%"],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration: 20,
        ease: "linear",
        repeat: Infinity,
        delay,
      }}
      aria-hidden="true"
    />
  );
};

export default FloatingShape;

