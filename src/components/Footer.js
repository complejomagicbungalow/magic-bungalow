"use client";

import { MessageCircle, MapPin, Mail } from "lucide-react";
import { TRANSLATIONS } from "@/data/translations";
import styles from "./Footer.module.css";

export default function Footer({ language = "es", whatsappUrl }) {
  const t = TRANSLATIONS[language]?.footer || TRANSLATIONS.es.footer;
  const navT = TRANSLATIONS[language]?.nav || TRANSLATIONS.es.nav;

  const currentYear = new Date().getFullYear();

  const handleNavClick = (e, id) => {
    e.preventDefault();
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

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Main Info Column */}
        <div className={styles.infoCol}>
          <img src="/logo.png" alt="Magic Bungalow Logo" className={styles.logo} />
          <p className={styles.description}>{t.desc}</p>
          <div className={styles.socials}>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="WhatsApp">
              <MessageCircle size={20} />
            </a>
            <a href="https://www.instagram.com/magicbungalowvilladeleyva/" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
            </a>
            <a href="https://www.facebook.com/magicbungalowvilla" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
            <a href="https://www.tiktok.com/@magicbungalow" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="TikTok">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Quick Links Column */}
        <div className={styles.linksCol}>
          <h4 className={styles.heading}>{t.quickLinks}</h4>
          <nav className={styles.nav}>
            <a href="#home" onClick={(e) => handleNavClick(e, "home")} className={styles.link}>{navT.home}</a>
            <a href="#accommodations" onClick={(e) => handleNavClick(e, "accommodations")} className={styles.link}>{navT.accommodations}</a>
            <a href="#celebrations" onClick={(e) => handleNavClick(e, "celebrations")} className={styles.link}>{navT.celebrations}</a>
            <a href="#tourism" onClick={(e) => handleNavClick(e, "tourism")} className={styles.link}>{navT.tourism}</a>
            <a href="#faq" onClick={(e) => handleNavClick(e, "faq")} className={styles.link}>{navT.faq}</a>
          </nav>
        </div>

        {/* Contact Info Column */}
        <div className={styles.contactCol}>
          <h4 className={styles.heading}>{t.contact}</h4>
          <ul className={styles.contactList}>
            <li className={styles.contactItem}>
              <MapPin size={18} className={styles.contactIcon} />
              <span>Villa de Leyva, Boyacá, Colombia</span>
            </li>
            <li className={styles.contactItem}>
              <MessageCircle size={18} className={styles.contactIcon} />
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={styles.whatsappLink}>
                +57 321 450 7618
              </a>
            </li>
            <li className={styles.contactItem}>
              <Mail size={18} className={styles.contactIcon} />
              <span>info@magicbungalow.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* SEO & Bottom bar */}
      <div className={styles.bottomBar}>
        <div className={styles.bottomContainer}>
          <p className={styles.seoParagraph}>{t.seoText}</p>
          <div className={styles.divider}></div>
          <p className={styles.copy}>
            &copy; {currentYear} Magic Bungalow. {t.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
