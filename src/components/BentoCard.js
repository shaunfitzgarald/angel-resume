import React from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';

export const BentoCard = ({ className = '', children, delay = 0, onClick, noPadding = false }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, type: "spring", stiffness: 100 }}
      whileHover={{ scale: 0.98 }}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-[#1e293b]/50 ${noPadding ? '' : 'p-6 sm:p-8'} backdrop-blur-lg border border-white/10 hover:border-white/20 transition-all shadow-2xl break-inside-avoid ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(123, 97, 255, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative z-10 w-full h-full flex flex-col">
        {children}
      </div>
    </motion.div>
  );
};
