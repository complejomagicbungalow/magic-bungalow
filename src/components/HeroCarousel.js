"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TRANSLATIONS } from "@/data/translations";
import styles from "./HeroCarousel.module.css";

export default function HeroCarousel({ images = [], language = "es", whatsappUrl }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const t = TRANSLATIONS[language]?.hero || TRANSLATIONS.es.hero;

  // Autoplay slideshow
  useEffect(() => {
    if (images.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000); // 6 seconds per slide

    return () => clearInterval(interval);
  }, [images]);

  const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const currentImage = images[currentIndex] || "/img/hotel1.png";

  return (
    <section id="home" className={styles.heroSection}>
      {/* Background Slideshow */}
      <div className={styles.carouselContainer}>
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentIndex}
            className={styles.slide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <img
              src={currentImage}
              alt="Magic Bungalow Environment"
              className={`${styles.image} ken-burns`}
            />
          </motion.div>
        </AnimatePresence>
        <div className={styles.overlay}></div>
      </div>

      {/* Hero Content */}
      <div className={styles.content}>
        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {t.title}
        </motion.h1>

        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
        >
          {t.subtitle}
        </motion.p>

        <motion.div
          className={styles.btnGroup}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
        >
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            {t.btnBook}
          </a>
          <button
            onClick={() => handleScrollTo("accommodations")}
            className="btn-secondary"
            style={{ color: "var(--color-cream-white)", borderColor: "var(--color-cream-white)" }}
          >
            {t.btnView}
          </button>
        </motion.div>
      </div>


    </section>
  );
}
