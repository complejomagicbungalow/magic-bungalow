"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./ImageCarousel.module.css";

export default function ImageCarousel({
  images = [],
  altText = "Magic Bungalow stay room",
  autoplayDelay = 5000,
  enableAutoplay = true
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef(null);

  const total = images.length;

  const nextSlide = () => {
    if (total === 0) return;
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    if (total === 0) return;
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  // Autoplay hook
  useEffect(() => {
    if (!enableAutoplay || total <= 1 || isHovered) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(nextSlide, autoplayDelay);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [total, enableAutoplay, autoplayDelay, isHovered]);

  if (total === 0) {
    return <div className={styles.placeholder}>No images available</div>;
  }

  return (
    <div
      className={styles.carousel}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
    >
      {/* Slider Viewport */}
      <div className={styles.viewport}>
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={currentIndex}
            className={styles.slide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.6}
            onDragEnd={(e, { offset }) => {
              const swipeThreshold = 50;
              if (offset.x < -swipeThreshold) {
                nextSlide();
              } else if (offset.x > swipeThreshold) {
                prevSlide();
              }
            }}
          >
            <img
              src={images[currentIndex]}
              alt={`${altText} - Imagen ${currentIndex + 1}`}
              loading="lazy"
              className={styles.image}
            />
          </motion.div>
        </AnimatePresence>

        {/* Gradient Overlay */}
        <div className={styles.bottomOverlay}></div>

        {/* Navigation Arrows */}
        {total > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); prevSlide(); }}
              className={`${styles.arrowBtn} ${styles.leftArrow}`}
              aria-label="Previous Slide"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); nextSlide(); }}
              className={`${styles.arrowBtn} ${styles.rightArrow}`}
              aria-label="Next Slide"
            >
              <ChevronRight size={22} />
            </button>
          </>
        )}

        {/* Minimal Indicators (Dots) */}
        {total > 1 && (
          <div className={styles.dots}>
            {images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => { e.stopPropagation(); setCurrentIndex(index); }}
                className={`${styles.dot} ${currentIndex === index ? styles.activeDot : ""}`}
                aria-label={`Go to slide ${index + 1}`}
              ></button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
