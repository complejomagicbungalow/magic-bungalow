"use client";

import { motion } from "framer-motion";
import { Heart, Sparkles, Gift, Flame, Cake, Camera, Music, Compass } from "lucide-react";
import { TRANSLATIONS } from "@/data/translations";
import styles from "./CelebrationsSection.module.css";

export default function CelebrationsSection({ language = "es", whatsappUrl }) {
  const t = TRANSLATIONS[language]?.celebrations || TRANSLATIONS.es.celebrations;

  const items = language === "en" ? [
    { name: "Anniversaries", desc: "Celebrate milestones in an intimate, rose-decorated setting.", icon: <Heart size={24} /> },
    { name: "Proposals", desc: "Surprise your partner with a magical setting under the stars.", icon: <Sparkles size={24} /> },
    { name: "Honeymoons", desc: "Start your journey in our luxurious and cozy glampings.", icon: <Flame size={24} /> },
    { name: "Wedding Nights", desc: "Unforgettable, romantic nights with premium details.", icon: <Gift size={24} /> },
    { name: "Intimate Weddings", desc: "Charming family gatherings surrounded by natural beauty.", icon: <Music size={24} /> },
    { name: "Birthdays", desc: "Celebrate another year in a refreshing, natural landscape.", icon: <Cake size={24} /> },
    { name: "Romantic Escapes", desc: "Unplug from the routine and reconnect with your partner.", icon: <Compass size={24} /> },
    { name: "Special Surprises", desc: "We help you craft and coordinate the perfect surprise.", icon: <Camera size={24} /> }
  ] : [
    { name: "Aniversarios", desc: "Celebra tus fechas especiales en un ambiente íntimo decorado con rosas.", icon: <Heart size={24} /> },
    { name: "Pedidas de Mano", desc: "Sorprende a tu pareja con un montaje mágico bajo las estrellas.", icon: <Sparkles size={24} /> },
    { name: "Luna de Miel", desc: "Inicia tu historia en nuestros glampings privados llenos de lujo.", icon: <Flame size={24} /> },
    { name: "Noche de Bodas", desc: "Un espacio romántico inigualable con detalles exclusivos.", icon: <Gift size={24} /> },
    { name: "Matrimonios Íntimos", desc: "Ceremonias hermosas y exclusivas en contacto con la naturaleza.", icon: <Music size={24} /> },
    { name: "Cumpleaños", desc: "Celebra un año más de vida rodeado del mejor aire campestre.", icon: <Cake size={24} /> },
    { name: "Escapadas Románticas", desc: "Desconéctate de la rutina y reconéctate en pareja.", icon: <Compass size={24} /> },
    { name: "Sorpresas Especiales", desc: "Te ayudamos a planear y coordinar el detalle perfecto.", icon: <Camera size={24} /> }
  ];

  return (
    <section id="celebrations" className={styles.wrapper}>
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.header}>
          <span className={styles.sub}>Magic Experiences</span>
          <h2 className={styles.title}>{t.title}</h2>
          <p className={styles.subtitle}>{t.subtitle}</p>
        </div>

        {/* Emotion Paragraph */}
        <motion.div
          className={styles.introBlock}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className={styles.introText}>{t.text}</p>
        </motion.div>

        {/* Celebrations Grid */}
        <div className={styles.grid}>
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              className={styles.card}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.05, duration: 0.6 }}
            >
              <div className={styles.iconBox}>{item.icon}</div>
              <h3 className={styles.cardTitle}>{item.name}</h3>
              <p className={styles.cardDesc}>{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Plan a surprise CTA */}
        <motion.div
          className={styles.cta}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-terracotta">
            <Heart size={18} fill="currentColor" />
            <span>{t.btnPlan}</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
