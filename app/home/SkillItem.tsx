"use client";
import { motion } from "framer-motion";

interface SkillItemProps {
  title: string;
  progress?: string;
  index: number;
}

export const SkillItem: React.FC<SkillItemProps> = ({
  title,
  progress,
  index,
}) => {
  const fadeInAnimationVariants = {
    initial: { opacity: 0.5, y: 50 },
    animate: { opacity: 1, y: 0, transition: { delay: 0.05 * index } },
  };

  return (
    <motion.button
      className={`text-xs md:text-base borderBlack rounded-xl px-5 py-3 cursor-pointer bg-white/10 ${
        progress ? "hover:bg-green-600" : "hover:bg-red-500"
      } hover:text-${
        progress ? "hover:bg-green-600" : "hover:bg-red-500"
      } transition-all duration-300`}
      variants={fadeInAnimationVariants}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      onClick={() => progress && window.open(progress, "_blank")}
      custom={index}
    >
      {title}
    </motion.button>
  );
};
