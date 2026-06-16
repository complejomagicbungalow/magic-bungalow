"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./IntroScreen.module.css";

export default function IntroScreen({ language = "es", onComplete }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2200); // Wait 2.2 seconds before starting fade-out

    return () => clearTimeout(timer);
  }, []);

  const text = language === "en" 
    ? "Experience the magic of Villa de Leyva" 
    : "Vive la magia de Villa de Leyva";

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {isVisible && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
        >
          <div className={styles.content}>
            <motion.div
              className={styles.logoWrapper}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1, transition: { duration: 1, ease: "easeOut" } }}
            >
              <img src="/logo.png" alt="Magic Bungalow Logo" className={styles.logo} />
            </motion.div>
            
            <motion.p
              className={styles.text}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.6, duration: 0.8, ease: "easeOut" } }}
            >
              {text}
            </motion.p>
          </div>
          
          <div className={styles.backgroundEffect}></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
