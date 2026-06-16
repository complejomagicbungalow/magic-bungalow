"use client";

import { motion } from "framer-motion";
import { Users, Flame, Home, Compass, ShieldCheck } from "lucide-react";
import ImageCarousel from "./ImageCarousel";
import styles from "./AccommodationDetail.module.css";

export default function AccommodationDetail({
  id,
  title,
  description,
  images = [],
  capacity,
  features = [],
  whatsappUrl,
  imageOnRight = false,
  btnText = "Reservar Ahora",
  altText
}) {
  const isBoutique = id === "boutique";
  const isGlamping = id === "garden" || id === "piramide";

  const getIcon = (feat) => {
    const text = feat.toLowerCase();
    if (text.includes("chimenea") || text.includes("fire")) return <Flame size={18} className={styles.featIcon} />;
    if (text.includes("baño") || text.includes("bath") || text.includes("cocina") || text.includes("kitchen")) return <Home size={18} className={styles.featIcon} />;
    if (text.includes("cama") || text.includes("room") || text.includes("capacidad")) return <Users size={18} className={styles.featIcon} />;
    return <Compass size={18} className={styles.featIcon} />;
  };

  return (
    <section id={id} className={`${styles.detailSection} ${imageOnRight ? styles.reverse : ""}`}>
      {/* Visual Carousel Column */}
      <motion.div
        className={styles.mediaColumn}
        initial={{ opacity: 0, x: imageOnRight ? 40 : -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <ImageCarousel images={images} altText={altText} />
      </motion.div>

      {/* Info Details Column */}
      <motion.div
        className={styles.infoColumn}
        initial={{ opacity: 0, x: imageOnRight ? -40 : 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <span className={styles.categoryLabel}>
          {isBoutique ? "Hotel Boutique" : isGlamping ? "Glamping Premium" : "Alojamiento Campestre"}
        </span>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>

        {/* Capacity Indicator */}
        <div className={styles.capacityRow}>
          <Users size={18} className={styles.capacityIcon} />
          <span><strong>{capacity.label}:</strong> {capacity.value}</span>
        </div>

        {/* Features Grid */}
        <div className={styles.featuresGrid}>
          {features.map((feat, index) => (
            <div key={index} className={styles.featureItem}>
              {getIcon(feat)}
              <span className={styles.featureText}>{feat}</span>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className={styles.actions}>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
            {btnText}
          </a>
        </div>
      </motion.div>
    </section>
  );
}
