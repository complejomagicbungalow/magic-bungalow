"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { TRANSLATIONS } from "@/data/translations";
import styles from "./FAQAccordion.module.css";

export default function FAQAccordion({ language = "es" }) {
  const [openIndex, setOpenIndex] = useState(null);
  
  const t = TRANSLATIONS[language]?.faq || TRANSLATIONS.es.faq;
  const items = t.items || [];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className={styles.wrapper}>
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.header}>
          <span className={styles.sub}>Common Questions</span>
          <h2 className={styles.title}>{t.title}</h2>
          <p className={styles.subtitle}>{t.subtitle}</p>
        </div>

        {/* Accordion List */}
        <div className={styles.faqList}>
          {items.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div 
                key={index} 
                className={`${styles.item} ${isOpen ? styles.itemOpen : ""}`}
                itemScope 
                itemProp="mainEntity" 
                itemType="https://schema.org/Question"
              >
                {/* Question Header */}
                <button
                  className={styles.questionButton}
                  onClick={() => toggleAccordion(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span itemProp="name" className={styles.questionText}>{item.q}</span>
                  <motion.div
                    className={styles.icon}
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown size={20} />
                  </motion.div>
                </button>

                {/* Answer Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className={styles.answerWrapper}
                      itemScope 
                      itemProp="acceptedAnswer" 
                      itemType="https://schema.org/Answer"
                    >
                      <div className={styles.answerContent} itemProp="text">
                        <p>{item.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
