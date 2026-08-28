"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TRANSLATIONS } from "@/data/translations";
import styles from "./HeroCarousel.module.css";

// Per-slide focal points optimized for both desktop and mobile compositions
const SLIDE_FOCAL_POINTS = [
  "center 65%",   // hero1: Glamping bungalow exterior at night with firepit
  "center center", // hero2: Panoramic twilight landscape
  "center 48%",   // hero3: Pareja en ventanal circular con vista panorámica
  "center 48%",   // hero4: Candlelit outdoor terrace table dinner
];

const SLIDE_TITLES = [
  "Glamping y Bungalow bajo las estrellas",
  "Vista panorámica en Villa de Leyva",
  "Momentos románticos y conexión con la naturaleza",
  "Cena íntima a la luz de las velas"
];

export default function HeroCarousel({ images = [], language = "es", whatsappUrl }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);
  const t = TRANSLATIONS[language]?.hero || TRANSLATIONS.es.hero;

  const total = images.length;

  const nextSlide = () => {
    if (total === 0) return;
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    if (total === 0) return;
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const goToSlide = (idx) => {
    setCurrentIndex(idx);
  };

  // Autoplay slideshow with pause on hover/interaction
  useEffect(() => {
    if (total <= 1 || isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 6000); // 6 seconds per slide

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [total, isPaused]);

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

  const currentImage = images[currentIndex] || "/img/hero1.webp";
  const focalPoint = SLIDE_FOCAL_POINTS[currentIndex % SLIDE_FOCAL_POINTS.length] || "center center";
  const slideTitle = SLIDE_TITLES[currentIndex % SLIDE_TITLES.length] || "Magic Bungalow";

  return (
    <section
      id="home"
      className={styles.heroSection}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {/* Background Slideshow */}
      <div className={styles.carouselContainer}>
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentIndex}
            className={styles.slide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.4}
            onDragEnd={(e, { offset }) => {
              const swipeThreshold = 50;
              if (offset.x < -swipeThreshold) {
                nextSlide();
              } else if (offset.x > swipeThreshold) {
                prevSlide();
              }
            }}
          >
            {/* Ambient background glow for ultra-wide desktop displays */}
            <img
              src={currentImage}
              alt=""
              aria-hidden="true"
              className={styles.ambientBackdrop}
            />

            {/* Main high-resolution hero photo */}
            <img
              src={currentImage}
              alt={`Magic Bungalow - ${slideTitle}`}
              className={`${styles.image} ken-burns`}
              style={{ objectPosition: focalPoint }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Contrast Overlay for Title Readability */}
        <div className={styles.overlay}></div>
      </div>

      {/* Navigation Arrows */}
      {total > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prevSlide();
            }}
            className={`${styles.navBtn} ${styles.prevBtn}`}
            aria-label="Foto anterior"
          >
            <ChevronLeft size={28} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              nextSlide();
            }}
            className={`${styles.navBtn} ${styles.nextBtn}`}
            aria-label="Siguiente foto"
          >
            <ChevronRight size={28} />
          </button>
        </>
      )}

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

      {/* Slide Indicators / Dots */}
      {total > 1 && (
        <div className={styles.indicators}>
          {images.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goToSlide(idx);
              }}
              className={`${styles.indicatorDot} ${currentIndex === idx ? styles.activeDot : ""}`}
              aria-label={`Ver foto ${idx + 1}`}
            >
              <span className={styles.dotFill}></span>
            </button>
          ))}
          <span className={styles.slideCounter}>
            {currentIndex + 1} / {total}
          </span>
        </div>
      )}
    </section>
  );
}
