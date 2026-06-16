"use client";

import { motion } from "framer-motion";
import { Users, Flame, Compass } from "lucide-react";
import styles from "./AccommodationCard.module.css";

export default function AccommodationCard({
  title,
  shortDesc,
  image,
  capacity,
  features = [],
  btnTextMore = "Ver más",
  btnTextBook = "Reservar",
  onMoreClick,
  onBookClick
}) {
  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Card Image Container */}
      <div className={styles.imageContainer} onClick={onMoreClick}>
        <img src={image} alt={title} className={styles.image} />
        <div className={styles.imageOverlay}></div>
        
        {/* Quick Capacity Badge */}
        <div className={styles.badge}>
          <Users size={14} className={styles.badgeIcon} />
          <span>{capacity}</span>
        </div>
      </div>

      {/* Card Info Content */}
      <div className={styles.info}>
        <h3 className={styles.title} onClick={onMoreClick}>{title}</h3>
        <p className={styles.description}>{shortDesc}</p>
        
        {/* Quick features snippet */}
        <div className={styles.features}>
          {features.slice(0, 2).map((feat, idx) => (
            <span key={idx} className={styles.featureTag}>
              {feat.toLowerCase().includes("chimenea") ? (
                <Flame size={12} className={styles.tagIcon} />
              ) : (
                <Compass size={12} className={styles.tagIcon} />
              )}
              {feat}
            </span>
          ))}
        </div>

        {/* Card Actions */}
        <div className={styles.actions}>
          <button onClick={onMoreClick} className={styles.btnMore}>
            {btnTextMore}
          </button>
          <button onClick={onBookClick} className={styles.btnBook}>
            {btnTextBook}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
