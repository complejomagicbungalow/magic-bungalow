"use client";

import { useState, useEffect } from "react";
import { Menu, X, Globe } from "lucide-react";
import { TRANSLATIONS } from "@/data/translations";
import styles from "./Header.module.css";

export default function Header({ language, setLanguage, whatsappUrl }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const t = TRANSLATIONS[language]?.nav || TRANSLATIONS.es.nav;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of header
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

  const toggleLanguage = () => {
    const nextLang = language === "es" ? "en" : "es";
    setLanguage(nextLang);
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.container}>
        {/* Logo */}
        <a href="#home" onClick={(e) => handleNavClick(e, "home")} className={styles.logoLink}>
          <img src="/logo.png" alt="Magic Bungalow Logo" className={styles.logo} />
        </a>

        {/* Desktop Navigation */}
        <nav className={styles.desktopNav}>
          <a href="#home" onClick={(e) => handleNavClick(e, "home")} className={styles.navLink}>{t.home}</a>
          <a href="#accommodations" onClick={(e) => handleNavClick(e, "accommodations")} className={styles.navLink}>{t.accommodations}</a>
          <a href="#celebrations" onClick={(e) => handleNavClick(e, "celebrations")} className={styles.navLink}>{t.celebrations}</a>
          <a href="#tourism" onClick={(e) => handleNavClick(e, "tourism")} className={styles.navLink}>{t.tourism}</a>
          <a href="#faq" onClick={(e) => handleNavClick(e, "faq")} className={styles.navLink}>{t.faq}</a>
        </nav>

        {/* Desktop Controls */}
        <div className={styles.controls}>
          {/* Language Selector */}
          <button onClick={toggleLanguage} className={styles.langBtn} aria-label="Toggle language">
            <Globe size={18} />
            <span className={styles.langText}>{language === "es" ? "EN" : "ES"}</span>
          </button>

          {/* WhatsApp CTA */}
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={styles.ctaBtn}>
            {t.whatsappBtn}
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className={styles.mobileToggle} 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div className={`${styles.mobileDrawer} ${mobileMenuOpen ? styles.mobileDrawerOpen : ""}`}>
        <nav className={styles.mobileNav}>
          <a href="#home" onClick={(e) => handleNavClick(e, "home")} className={styles.mobileNavLink}>{t.home}</a>
          <a href="#accommodations" onClick={(e) => handleNavClick(e, "accommodations")} className={styles.mobileNavLink}>{t.accommodations}</a>
          <a href="#celebrations" onClick={(e) => handleNavClick(e, "celebrations")} className={styles.mobileNavLink}>{t.celebrations}</a>
          <a href="#tourism" onClick={(e) => handleNavClick(e, "tourism")} className={styles.mobileNavLink}>{t.tourism}</a>
          <a href="#faq" onClick={(e) => handleNavClick(e, "faq")} className={styles.mobileNavLink}>{t.faq}</a>

          <div className={styles.mobileControls}>
            <button onClick={() => { toggleLanguage(); setMobileMenuOpen(false); }} className={styles.mobileLangBtn}>
              <Globe size={18} />
              <span>{language === "es" ? "English (EN)" : "Español (ES)"}</span>
            </button>

            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={styles.mobileCtaBtn}>
              {t.whatsappBtn}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
