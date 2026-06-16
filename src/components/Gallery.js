"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { TRANSLATIONS } from "@/data/translations";
import styles from "./Gallery.module.css";

export default function Gallery({ images = [], language = "es" }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const t = TRANSLATIONS[language]?.gallery || TRANSLATIONS.es.gallery;

  const openLightbox = (index) => {
    setLightboxIndex(index);
    document.body.style.overflow = "hidden"; // Prevent scrolling
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    document.body.style.overflow = "unset"; // Restore scrolling
  };

  const navigateNext = (e) => {
    e.stopPropagation();
    if (images.length === 0) return;
    setLightboxIndex((prev) => (prev + 1) % images.length);
  };

  const navigatePrev = (e) => {
    e.stopPropagation();
    if (images.length === 0) return;
    setLightboxIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section id="gallery" className={styles.wrapper}>
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.header}>
          <span className={styles.sub}>Visual Journey</span>
          <h2 className={styles.title}>{t.title}</h2>
          <p className={styles.subtitle}>{t.subtitle}</p>
        </div>

        {/* Elegant Grid */}
        <div className={styles.grid}>
          {images.map((image, index) => (
            <motion.div
              key={index}
              className={`${styles.gridItem} ${styles[`item${(index % 6) + 1}`]}`}
              onClick={() => openLightbox(index)}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
            >
              <img
                src={image}
                alt={`Magic Bungalow momentos - Galería ${index + 1}`}
                loading="lazy"
                className={styles.image}
              />
              <div className={styles.overlay}>
                <Maximize2 size={24} className={styles.zoomIcon} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className={styles.lightbox}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button className={styles.closeBtn} onClick={closeLightbox} aria-label="Close Lightbox">
              <X size={28} />
            </button>

            {/* Navigation Buttons */}
            {images.length > 1 && (
              <>
                <button className={`${styles.navBtn} ${styles.prevBtn}`} onClick={navigatePrev} aria-label="Previous image">
                  <ChevronLeft size={36} />
                </button>
                <button className={`${styles.navBtn} ${styles.nextBtn}`} onClick={navigateNext} aria-label="Next image">
                  <ChevronRight size={36} />
                </button>
              </>
            )}

            {/* Image Container */}
            <motion.div
              className={styles.lightboxContent}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={images[lightboxIndex]}
                alt={`Magic Bungalow Ampliada ${lightboxIndex + 1}`}
                className={styles.lightboxImage}
              />
              
              {/* Image Counter Badge */}
              <div className={styles.counter}>
                {lightboxIndex + 1} / {images.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
