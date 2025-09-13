"use client";
import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const Estimate = () => {
  const ref = useRef(null);
  const shapesRef = useRef(null);
  const shapesInView = useInView(shapesRef, { amount: 0.3 });
  const inView = useInView(ref, { amount: 0.2 });

  return (
    <div
      ref={shapesRef}
      className="relative h-screen flex flex-col items-center justify-center text-white overflow-hidden"
    >
      {/* Animated Shapes */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large curved shape - left side with gradient */}
        <motion.div
          className="absolute left-0 top-0 w-96 h-96 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full opacity-20 blur-sm"
          style={{
            clipPath: "polygon(0% 0%, 50% 0%, 50% 100%, 0% 100%)",
            transform: "translateX(-50%)",
          }}
          initial={{ y: -400, rotate: 0 }}
          animate={shapesInView ? { y: 0, rotate: 10 } : { y: -400, rotate: 0 }}
          transition={{
            duration: 1.2,
            ease: "easeOut",
            delay: 0.2,
          }}
        />

        {/* Floating geometric shapes */}
        <motion.div
          className="absolute left-20 top-20 w-32 h-32 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl opacity-30"
          initial={{ y: -200, x: -100, rotate: 45 }}
          animate={
            shapesInView
              ? { y: 0, x: 0, rotate: 0 }
              : { y: -200, x: -100, rotate: 45 }
          }
          transition={{
            duration: 1,
            ease: "easeOut",
            delay: 0.4,
          }}
        />

        {/* Diamond shape - left side */}
        <motion.div
          className="absolute left-40 top-60 w-24 h-24 bg-gradient-to-r from-pink-500 to-rose-500 opacity-40 rotate-45"
          style={{
            clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
          }}
          initial={{ y: -300, rotate: -15, scale: 0 }}
          animate={
            shapesInView
              ? { y: 0, rotate: 45, scale: 1 }
              : { y: -300, rotate: -15, scale: 0 }
          }
          transition={{
            duration: 1.1,
            ease: "easeOut",
            delay: 0.3,
          }}
        />

        {/* Organic blob shape - right side */}
        <motion.div
          className="absolute right-0 top-0 w-[400px] h-[250px] bg-gradient-to-l from-emerald-500 to-teal-600 opacity-25 blur-[1px]"
          style={{
            borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
            transform: "rotate(10deg)",
          }}
          initial={{ y: -350, x: 200, rotate: 30 }}
          animate={
            shapesInView
              ? { y: 50, x: 50, rotate: 10 }
              : { y: -350, x: 200, rotate: 30 }
          }
          transition={{
            duration: 1.3,
            ease: "easeOut",
            delay: 0.1,
          }}
        />

        {/* Abstract "5" inspired shape - bottom right */}
        <motion.div
          className="absolute right-10 bottom-0 w-64 h-64 bg-gradient-to-t from-yellow-500 to-orange-500 opacity-30"
          style={{
            clipPath:
              "polygon(0% 0%, 80% 0%, 80% 35%, 25% 35%, 25% 55%, 90% 55%, 90% 90%, 15% 90%, 15% 70%, 55% 70%, 55% 60%, 0% 60%)",
            borderRadius: "15px",
          }}
          initial={{ y: 400, rotate: 15 }}
          animate={shapesInView ? { y: 0, rotate: 0 } : { y: 400, rotate: 15 }}
          transition={{
            duration: 1.4,
            ease: "easeOut",
            delay: 0.5,
          }}
        />

        {/* Hexagon with hole */}
        <motion.div
          className="absolute right-1/3 bottom-32 w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 opacity-40"
          style={{
            clipPath:
              "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          }}
          initial={{ y: 300, scale: 0, rotate: 0 }}
          animate={
            shapesInView
              ? { y: 0, scale: 1, rotate: 180 }
              : { y: 300, scale: 0, rotate: 0 }
          }
          transition={{
            duration: 0.8,
            ease: "easeOut",
            delay: 0.7,
          }}
        />

        {/* Floating triangle */}
        <motion.div
          className="absolute left-1/3 bottom-20 w-16 h-16 bg-gradient-to-br from-red-400 to-pink-500 opacity-35"
          style={{
            clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
          }}
          initial={{ y: 250, x: -50, rotate: 0 }}
          animate={
            shapesInView
              ? { y: 0, x: 0, rotate: 360 }
              : { y: 250, x: -50, rotate: 0 }
          }
          transition={{
            duration: 1.2,
            ease: "easeOut",
            delay: 0.6,
          }}
        />
      </div>

      {/* Main content with enhanced styling */}
      <motion.div
        className="relative z-[999999] text-center max-w-2xl mx-auto px-8"
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Background glow for text readability */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm rounded-3xl -z-10"></div>

        <motion.p
          className="text-sm mb-6 text-gray-300 font-medium tracking-wider uppercase z-50"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          Project Estimation Tool
        </motion.p>

        <motion.h2
          className="text-6xl font-bold mb-8 bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        >
          Calculate project time
        </motion.h2>

        <motion.p
          className="text-lg text-gray-300 mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
        >
          Get a precise estimate for your digital project and establish
          realistic budget expectations with our interactive calculator.
        </motion.p>

        <motion.button
          className="group relative border-2 border-white/30 bg-white/5 backdrop-blur-sm h-16 rounded-full px-12 font-semibold text-white hover:bg-white hover:text-black transition-all duration-500 shadow-2xl shadow-white/10 hover:shadow-white/30 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="relative z-10 flex items-center gap-3">
            Start Calculator
            <motion.span
              className="inline-block"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Estimate;
