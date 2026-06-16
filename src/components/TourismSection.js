"use client";

import { motion } from "framer-motion";
import { Compass, MapPin, Navigation } from "lucide-react";
import { TRANSLATIONS } from "@/data/translations";
import { CHATBOT_KNOWLEDGE } from "@/data/chatbotKnowledge";
import styles from "./TourismSection.module.css";

export default function TourismSection({ language = "es", whatsappUrl }) {
  const t = TRANSLATIONS[language]?.tourism || TRANSLATIONS.es.tourism;
  const k = CHATBOT_KNOWLEDGE[language]?.tourism || CHATBOT_KNOWLEDGE.es.tourism;

  return (
    <section id="tourism" className={styles.wrapper}>
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.header}>
          <span className={styles.sub}>Villa de Leyva & Boyacá</span>
          <h2 className={styles.title}>{t.title}</h2>
          <p className={styles.subtitle}>{t.subtitle}</p>
        </div>

        {/* Informative Row */}
        <div className={styles.introRow}>
          <p className={styles.introText}>{t.text}</p>
        </div>

        {/* Attractions Grid */}
        <div className={styles.grid}>
          {k.places.map((place, idx) => (
            <motion.div
              key={idx}
              className={styles.card}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.05, duration: 0.5 }}
            >
              <div className={styles.cardHeader}>
                <div className={styles.iconWrapper}>
                  <MapPin size={16} />
                </div>
                <h3 className={styles.cardTitle}>{place.name}</h3>
              </div>
              <p className={styles.cardDesc}>{place.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Tourism CTA */}
        <div className={styles.cta}>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary">
            <Compass size={18} />
            <span>{t.btnPlanTrip}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
