import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"]
});

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"]
});

export const metadata = {
  title: "Magic Bungalow | Hotel Boutique, Glamping y Cabaña en Villa de Leyva",
  description: "Vive una escapada mágica en Villa de Leyva. Magic Bungalow ofrece hotel boutique, glampings románticos y cabaña familiar para 5 personas, ideal para aniversarios, cumpleaños, pedidas de mano, luna de miel y viajes familiares.",
  openGraph: {
    title: "Magic Bungalow | Hotel Boutique, Glamping y Cabaña en Villa de Leyva",
    description: "Vive una escapada mágica en Villa de Leyva. Magic Bungalow ofrece hotel boutique, glampings románticos y cabaña familiar para 5 personas.",
    url: "https://magicbungalow.com",
    siteName: "Magic Bungalow",
    images: [
      {
        url: "/img/hotel1.png",
        width: 1200,
        height: 630,
        alt: "Magic Bungalow Villa de Leyva"
      }
    ],
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Magic Bungalow | Hotel Boutique, Glamping y Cabaña en Villa de Leyva",
    description: "Vive una escapada mágica en Villa de Leyva. Magic Bungalow ofrece hotel boutique, glampings románticos y cabaña familiar.",
    images: ["/img/hotel1.png"],
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    "name": "Magic Bungalow",
    "description": "Magic Bungalow es un hotel boutique, glamping y cabaña familiar en Villa de Leyva, ideal para escapadas románticas, aniversarios, pedidas de mano, luna de miel, viajes familiares y turismo en Boyacá.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Villa de Leyva",
      "addressRegion": "Boyacá",
      "addressCountry": "CO"
    },
    "telephone": "+573123456789",
    "image": "https://magicbungalow.com/img/hotel1.png",
    "priceRange": "$$$",
    "url": "https://magicbungalow.com"
  };

  return (
    <html lang="es" className={`${cormorant.variable} ${montserrat.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
