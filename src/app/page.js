"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Compass, Flame, Heart, Sparkles } from "lucide-react";

// Components
import IntroScreen from "@/components/IntroScreen";
import Header from "@/components/Header";
import HeroCarousel from "@/components/HeroCarousel";
import AccommodationCard from "@/components/AccommodationCard";
import AccommodationDetail from "@/components/AccommodationDetail";
import CelebrationsSection from "@/components/CelebrationsSection";
import TourismSection from "@/components/TourismSection";
import Gallery from "@/components/Gallery";
import FAQAccordion from "@/components/FAQAccordion";
import ChatbotWidget from "@/components/ChatbotWidget";
import Footer from "@/components/Footer";

// Data & Config
import { TRANSLATIONS } from "@/data/translations";
import { WHATSAPP_NUMBER } from "@/data/chatbotKnowledge";
import staticImages from "@/data/images.json";

export default function Home() {
  const [language, setLanguage] = useState("es");
  const [introFinished, setIntroFinished] = useState(false);
  const [images, setImages] = useState(staticImages);
  
  // WhatsApp config prefilled links
  const whatsappMsgEs = "Hola, estoy interesado/a en reservar en Magic Bungalow. Me gustaría recibir información sobre disponibilidad, tarifas y alojamientos.";
  const whatsappMsgEn = "Hi, I'm interested in booking at Magic Bungalow. I would like to receive information about availability, rates and accommodations.";
  const activeWhatsappMsg = language === "en" ? whatsappMsgEn : whatsappMsgEs;
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(activeWhatsappMsg)}`;

  // 1. Language initial loading from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem("magic_bungalow_lang");
    if (savedLanguage === "es" || savedLanguage === "en") {
      setLanguage(savedLanguage);
    }
  }, []);

  // 2. Persist language changes
  const handleSetLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem("magic_bungalow_lang", lang);
    // Update HTML lang attribute
    document.documentElement.lang = lang;
    // Dynamically update document title based on language
    const seoT = TRANSLATIONS[lang]?.seo || TRANSLATIONS.es.seo;
    document.title = seoT.title;
  };

  // 3. Fetch image directory lists dynamically from local API
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch("/api/images");
        if (res.ok) {
          const data = await res.json();
          setImages(data);
        }
      } catch (err) {
        console.warn("Home: Dynamic image fetch failed, using pre-scanned static fallback.", err);
      }
    };
    fetchImages();
  }, []);

  const t = TRANSLATIONS[language] || TRANSLATIONS.es;

  // Handles smooth scrolls with header offset
  const scrollToSection = (id) => {
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

  const getAccommodationFeatures = (key) => {
    if (language === "en") {
      switch (key) {
        case "boutique": return ["Private Bathroom", "Warm Fireplace", "Garden View", "Breakfast Included"];
        case "garden": return ["Circular Glamping", "Private Firepit", "Stargazing Deck", "Surrounding Forest"];
        case "piramide": return ["Pyramid Architecture", "Glass Viewing Panel", "Intimate Setting", "Deck with Chairs"];
        case "cabana": return ["Up to 5 Guests", "Equipped Kitchen", "Living Room", "Private Parking"];
        default: return [];
      }
    } else {
      switch (key) {
        case "boutique": return ["Baño Privado", "Chimenea Cálida", "Vista al Jardín", "Desayuno Incluido"];
        case "garden": return ["Diseño Circular", "Fogata Privada", "Terraza Estrellada", "Bosque Circundante"];
        case "piramide": return ["Diseño Piramidal", "Ventanal de Cristal", "Entorno Íntimo", "Deck con Sillas"];
        case "cabana": return ["Hasta 5 Personas", "Cocina Equipada", "Sala de Estar", "Parqueadero Privado"];
        default: return [];
      }
    }
  };

  return (
    <>
      {/* 1. Intro Screen */}
      {!introFinished && (
        <IntroScreen language={language} onComplete={() => setIntroFinished(true)} />
      )}

      {/* Main Page Content (visible after intro loader) */}
      {introFinished && (
        <div style={{ opacity: 1, transition: "opacity 1s ease" }}>
          
          {/* 2. Sticky Header */}
          <Header language={language} setLanguage={handleSetLanguage} whatsappUrl={whatsappUrl} />

          {/* 3. Hero Carousel Section */}
          <HeroCarousel images={images.hotel} language={language} whatsappUrl={whatsappUrl} />

          {/* 4. Emotional Introduction */}
          <section id="introduction" style={{ backgroundColor: "var(--color-cream-white)" }} className="section">
            <div className="intro-grid">
              
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                style={{ display: "flex", flexDirection: "column", gap: "20px" }}
              >
                <span style={{ fontSize: "0.8rem", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--color-olive)" }}>
                  {t.intro.welcome}
                </span>
                <h2 style={{ fontSize: "2.5rem", fontWeight: "300", fontFamily: "var(--font-serif)", color: "var(--color-dark-warm)" }}>
                  {t.intro.title}
                </h2>
                <p style={{ fontSize: "1.05rem", lineHeight: "1.8", color: "var(--color-dark-muted)" }}>
                  {t.intro.text1}
                </p>
                <p style={{ fontSize: "1.05rem", lineHeight: "1.8", color: "var(--color-dark-muted)" }}>
                  {t.intro.text2}
                </p>
                
                {/* Highlights tags */}
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "12px" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "8px 16px", borderRadius: "9999px", background: "var(--color-beige-warm)", fontSize: "0.85rem", fontWeight: "500", color: "var(--color-coffee-dark)" }}>
                    <Compass size={14} style={{ color: "var(--color-olive)" }} />
                    {t.intro.badgeNature}
                  </span>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "8px 16px", borderRadius: "9999px", background: "var(--color-beige-warm)", fontSize: "0.85rem", fontWeight: "500", color: "var(--color-coffee-dark)" }}>
                    <Flame size={14} style={{ color: "var(--color-olive)" }} />
                    {t.intro.badgeFireplace}
                  </span>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "8px 16px", borderRadius: "9999px", background: "var(--color-beige-warm)", fontSize: "0.85rem", fontWeight: "500", color: "var(--color-coffee-dark)" }}>
                    <Heart size={14} style={{ color: "var(--color-olive)" }} />
                    {t.intro.badgeRomance}
                  </span>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "8px 16px", borderRadius: "9999px", background: "var(--color-beige-warm)", fontSize: "0.85rem", fontWeight: "500", color: "var(--color-coffee-dark)" }}>
                    <Sparkles size={14} style={{ color: "var(--color-olive)" }} />
                    {t.intro.badgeRest}
                  </span>
                </div>
              </motion.div>

              {/* Composition Image */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                style={{ position: "relative", width: "100%", borderRadius: "var(--border-radius-lg)", overflow: "hidden", boxShadow: "var(--shadow-premium)", aspectRatio: "16/11" }}
              >
                <img
                  src={images.hotel[1] || "/img/hotel2.png"}
                  alt="Magic Bungalow Gardens"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </motion.div>
            </div>
          </section>

          {/* 5. Accommodations grid (Overview) */}
          <section id="accommodations" style={{ backgroundColor: "var(--color-beige-warm)" }} className="section">
            <div className="section-header">
              <span style={{ fontSize: "0.8rem", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--color-coffee-soft)", display: "block", marginBottom: "8px" }}>
                Exclusive Retreats
              </span>
              <h2>{t.accommodations.title}</h2>
              <p>{t.accommodations.subtitle}</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "30px" }}>
              <AccommodationCard
                title={t.accommodations.list.boutique.title}
                shortDesc={t.accommodations.list.boutique.shortDesc}
                image={images.boutique[0] || "/img/boutique1.png"}
                capacity={language === "en" ? "2 Guests" : "2 Personas"}
                features={getAccommodationFeatures("boutique")}
                btnTextMore={t.accommodations.btnViewMore}
                btnTextBook={t.accommodations.btnBookNow}
                onMoreClick={() => scrollToSection("boutique")}
                onBookClick={() => window.open(whatsappUrl, "_blank")}
              />
              <AccommodationCard
                title={t.accommodations.list.garden.title}
                shortDesc={t.accommodations.list.garden.shortDesc}
                image={images.garden[0] || "/img/garden1.png"}
                capacity={language === "en" ? "2 Guests" : "2 Personas"}
                features={getAccommodationFeatures("garden")}
                btnTextMore={t.accommodations.btnViewMore}
                btnTextBook={t.accommodations.btnBookNow}
                onMoreClick={() => scrollToSection("garden")}
                onBookClick={() => window.open(whatsappUrl, "_blank")}
              />
              <AccommodationCard
                title={t.accommodations.list.piramide.title}
                shortDesc={t.accommodations.list.piramide.shortDesc}
                image={images.piramide[0] || "/img/piramide1.png"}
                capacity={language === "en" ? "2 Guests" : "2 Personas"}
                features={getAccommodationFeatures("piramide")}
                btnTextMore={t.accommodations.btnViewMore}
                btnTextBook={t.accommodations.btnBookNow}
                onMoreClick={() => scrollToSection("piramide")}
                onBookClick={() => window.open(whatsappUrl, "_blank")}
              />
              <AccommodationCard
                title={t.accommodations.list.cabana.title}
                shortDesc={t.accommodations.list.cabana.shortDesc}
                image={images.cabana[0] || "/img/cabana1.png"}
                capacity={language === "en" ? "Up to 5 Guests" : "Hasta 5 Personas"}
                features={getAccommodationFeatures("cabana")}
                btnTextMore={t.accommodations.btnViewMore}
                btnTextBook={t.accommodations.btnBookNow}
                onMoreClick={() => scrollToSection("cabana")}
                onBookClick={() => window.open(whatsappUrl, "_blank")}
              />
            </div>
          </section>

          {/* 6. Detailed Room Rows */}
          <div style={{ backgroundColor: "var(--color-cream-white)" }}>
            <AccommodationDetail
              id="boutique"
              title={t.accommodations.list.boutique.title}
              description={language === "en" 
                ? "The Magic Bungalow Boutique Hotel offers cozy, private and charming rooms, ideal for couples looking for relaxation, tranquility and a different experience in Villa de Leyva. Every room includes a private bathroom and fireplace, creating a warm and romantic atmosphere for peaceful nights in Boyacá. It is perfect for romantic getaways, anniversaries, birthdays, weekend escapes or travelers who want to stay near the historic town center while remaining connected to nature."
                : "El Hotel Boutique de Magic Bungalow ofrece habitaciones acogedoras, privadas y llenas de encanto, ideales para parejas que buscan descanso, tranquilidad y una experiencia diferente en Villa de Leyva. Todas las habitaciones cuentan con baño privado y chimenea, creando un ambiente cálido y romántico para disfrutar las noches boyacenses. Es perfecto para escapadas románticas, aniversarios, cumpleaños, descanso de fin de semana o para quienes desean hospedarse cerca del centro histórico sin perder el contacto con la naturaleza."
              }
              images={images.boutique}
              capacity={{ label: t.accommodations.capacity, value: language === "en" ? "Couples (2 Guests)" : "Parejas (2 Personas)" }}
              features={getAccommodationFeatures("boutique")}
              whatsappUrl={whatsappUrl}
              imageOnRight={false}
              btnText={t.accommodations.btnBookNow}
              altText="Hotel boutique en Villa de Leyva con chimenea"
            />

            <AccommodationDetail
              id="garden"
              title={t.accommodations.list.garden.title}
              description={language === "en"
                ? "Garden Bungalow is a romantic and private glamping experience surrounded by nature. It is ideal for couples who want to celebrate a special date, relax in an intimate setting or surprise someone with a magical night in Villa de Leyva. Its design invites guests to enjoy peaceful landscapes, a firepit under the stars, a glass of wine and unforgettable moments as a couple. It is perfect for anniversaries, proposals, birthdays, wedding nights or honeymoons."
                : "Garden Bungalow es una experiencia glamping romántica, privada y rodeada de naturaleza. Es ideal para parejas que desean celebrar una fecha especial, descansar en un ambiente íntimo o sorprender a alguien con una noche mágica en Villa de Leyva. Su diseño invita a disfrutar la calma del paisaje, una fogata bajo las estrellas, una copa de vino y momentos inolvidables en pareja. Es perfecto para aniversarios, pedidas de mano, cumpleaños, noche de bodas o luna de miel."
              }
              images={images.garden}
              capacity={{ label: t.accommodations.capacity, value: language === "en" ? "Couples (2 Guests)" : "Parejas (2 Personas)" }}
              features={getAccommodationFeatures("garden")}
              whatsappUrl={whatsappUrl}
              imageOnRight={true}
              btnText={t.accommodations.btnBookNow}
              altText="Glamping romántico en Villa de Leyva Garden Bungalow"
            />

            <AccommodationDetail
              id="piramide"
              title={t.accommodations.list.piramide.title}
              description={language === "en"
                ? "Pyramid Bungalow is a glamping-style accommodation with unique architecture, perfect for travelers looking for a different, intimate and memorable experience in Villa de Leyva. Its special design, natural surroundings and peaceful atmosphere make it an ideal place to relax, celebrate and reconnect. It is an excellent choice for couples who want to enjoy a romantic getaway, celebrate a special occasion or experience a charming stay surrounded by nature."
                : "Pyramid Bungalow es un alojamiento tipo glamping con una arquitectura única, perfecto para quienes buscan una experiencia diferente, íntima y memorable en Villa de Leyva. Su diseño especial, su entorno natural y su atmósfera tranquila lo convierten en un lugar ideal para descansar, celebrar y reconectar. Es una excelente opción para parejas que desean vivir una escapada romántica, celebrar una fecha especial o disfrutar una estadía con encanto en medio de la naturaleza."
              }
              images={images.piramide}
              capacity={{ label: t.accommodations.capacity, value: language === "en" ? "Couples (2 Guests)" : "Parejas (2 Personas)" }}
              features={getAccommodationFeatures("piramide")}
              whatsappUrl={whatsappUrl}
              imageOnRight={false}
              btnText={t.accommodations.btnBookNow}
              altText="Glamping Pirámide en Villa de Leyva Pyramid Bungalow"
            />

            <AccommodationDetail
              id="cabana"
              title={t.accommodations.list.cabana.title}
              description={language === "en"
                ? "The Magic Bungalow Family Cabin is ideal for families or groups of friends who want to enjoy Villa de Leyva with comfort, privacy and contact with nature. It accommodates up to 5 guests and offers a cozy atmosphere to share, relax and create special memories. It is perfect for family trips, birthday celebrations, short vacations, peaceful weekends or getaways with friends in Boyacá."
                : "La Cabaña Familiar de Magic Bungalow es ideal para familias o grupos de amigos que desean disfrutar Villa de Leyva con comodidad, privacidad y contacto con la naturaleza. Tiene capacidad para hasta 5 personas y ofrece un ambiente acogedor para compartir, descansar y crear recuerdos especiales. Es perfecta para viajes familiares, celebraciones de cumpleaños, vacaciones cortas, fines de semana de descanso o planes con amigos en Boyacá."
              }
              images={images.cabana}
              capacity={{ label: t.accommodations.capacity, value: language === "en" ? "Up to 5 Guests" : "Hasta 5 Personas" }}
              features={getAccommodationFeatures("cabana")}
              whatsappUrl={whatsappUrl}
              imageOnRight={true}
              btnText={t.accommodations.btnBookNow}
              altText="Cabaña familiar en Villa de Leyva 5 personas"
            />
          </div>

          {/* 7. Special Celebrations */}
          <CelebrationsSection language={language} whatsappUrl={whatsappUrl} />

          {/* 8. Romantic Experiences Conversion Block */}
          <section style={{ position: "relative", padding: "140px 24px", overflow: "hidden", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 1 }}>
              <img
                src={images.hotel[7] || "/img/hotel8.png"}
                alt="Romantic background"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(44, 42, 41, 0.65)" }}></div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{ position: "relative", zIndex: 10, maxWidth: "700px", textAlign: "center", backgroundColor: "rgba(250, 249, 246, 0.92)", border: "1px solid var(--glass-border)", padding: "48px", borderRadius: "var(--border-radius-lg)", boxShadow: "var(--shadow-strong)" }}
            >
              <Heart size={36} style={{ color: "var(--color-terracotta)", marginBottom: "16px" }} fill="currentColor" />
              <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "2.2rem", fontWeight: "300", color: "var(--color-dark-warm)", marginBottom: "16px" }}>
                {t.experience.title}
              </h2>
              <p style={{ fontSize: "1.05rem", color: "var(--color-dark-muted)", lineHeight: "1.7", marginBottom: "32px" }}>
                {t.experience.text}
              </p>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-terracotta">
                {t.experience.btnSurprise}
              </a>
            </motion.div>
          </section>

          {/* 9. Tourism in Villa de Leyva */}
          <TourismSection language={language} whatsappUrl={whatsappUrl} />

          {/* 10. Photo Gallery */}
          <Gallery images={images.hotel} language={language} />

          {/* 11. FAQ Accordion */}
          <FAQAccordion language={language} />

          {/* 12. Pre-footer Booking CTA */}
          <section style={{ backgroundColor: "var(--color-olive)", color: "var(--color-cream-white)", padding: "80px 24px", textAlign: "center" }}>
            <div style={{ maxWidth: "800px", margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: "24px" }}>
              <Compass size={32} style={{ color: "var(--color-gold)" }} />
              <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "2.6rem", fontWeight: "300", color: "var(--color-cream-white)" }}>
                {t.cta.title}
              </h2>
              <p style={{ fontSize: "1.15rem", color: "var(--color-cream-white)", opacity: 0.9, maxWidth: "600px", lineHeight: "1.6" }}>
                {t.cta.subtitle}
              </p>
              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center", marginTop: "12px" }}>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-terracotta" style={{ background: "var(--color-gold)", color: "var(--color-dark-warm)", boxShadow: "0 4px 14px rgba(197, 160, 89, 0.25)" }}>
                  {t.cta.btn}
                </a>
              </div>
            </div>
          </section>

          {/* 13. Footer */}
          <Footer language={language} whatsappUrl={whatsappUrl} />

          {/* 14. Floating Chatbot Widget (Gemini / Local Assistant) */}
          <ChatbotWidget webLanguage={language} whatsappUrl={whatsappUrl} />
          
        </div>
      )}
    </>
  );
}
