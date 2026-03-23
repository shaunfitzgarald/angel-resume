import React from 'react';
import { motion } from 'framer-motion';

const DeepSpaceBackground = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#0a0a0c]">
      {/* Electric Purple Blob */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#7B61FF] rounded-full mix-blend-screen filter blur-[100px] md:blur-[150px] opacity-40"
      />
      
      {/* Cyan Blob */}
      <motion.div
        animate={{
          scale: [1, 1.5, 1],
          x: [0, -100, 0],
          y: [0, 100, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-[#00E5FF] rounded-full mix-blend-screen filter blur-[120px] md:blur-[180px] opacity-30"
      />
      
      {/* Sunset Orange Blob */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 50, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[40%] left-[30%] w-[40vw] h-[40vw] bg-[#FF5E3A] rounded-full mix-blend-screen filter blur-[100px] md:blur-[130px] opacity-20"
      />
      
      {/* Noise Overlay for Texture */}
      <div 
        className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      ></div>
    </div>
  );
};

export default DeepSpaceBackground;
