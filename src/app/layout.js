import { Cormorant_Garamond, Montserrat } from "next/font/google";
import Script from "next/script";
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
  metadataBase: new URL("https://www.magicbungalow.com"),
  title: "Magic Bungalow | Glampings con Jacuzzi en Villa de Leyva",
  description: "Glampings románticos y pet friendly en Villa de Leyva: Bungalow Garden y Bungalow Pyramid, con jacuzzi, atardeceres y noches estrelladas. Ideal para aniversarios, cumpleaños, pedidas de mano y escapadas en pareja.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Magic Bungalow | Glampings con Jacuzzi en Villa de Leyva",
    description: "Glampings románticos y pet friendly en Villa de Leyva, con jacuzzi y vista a las montañas.",
    url: "https://www.magicbungalow.com",
    siteName: "Magic Bungalow",
    images: [
      {
        url: "/img/garden1.png",
        width: 1200,
        height: 630,
        alt: "Glamping Magic Bungalow en Villa de Leyva"
      }
    ],
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Magic Bungalow | Glampings con Jacuzzi en Villa de Leyva",
    description: "Glampings románticos y pet friendly en Villa de Leyva, con jacuzzi y vista a las montañas.",
    images: ["/img/garden1.png"],
  },
};

const GA_MEASUREMENT_ID = "G-Z0FWK97GT0";

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "name": "Magic Bungalow",
    "description": "Magic Bungalow ofrece glampings románticos y pet friendly en Villa de Leyva (Bungalow Garden y Bungalow Pyramid), con jacuzzi, ideales para escapadas en pareja, aniversarios, pedidas de mano y luna de miel en Boyacá.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Villa de Leyva",
      "addressRegion": "Boyacá",
      "addressCountry": "CO"
    },
    "telephone": "+573214507618",
    "image": "https://www.magicbungalow.com/img/garden1.png",
    "petsAllowed": true,
    "priceRange": "$$$",
    "url": "https://www.magicbungalow.com",
    "sameAs": [
      "https://www.instagram.com/magicbungalowvilladeleyva/",
      "https://www.facebook.com/magicbungalowvilla"
    ]
  };

  return (
    <html lang="es" className={`${cormorant.variable} ${montserrat.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');

            // Mide los clics a WhatsApp (enlaces y botones) como evento whatsapp_click
            (function () {
              var isWa = function (u) { return /wa\.me|whatsapp\.com/i.test(String(u || '')); };
              var track = function (u, via) {
                try { gtag('event', 'whatsapp_click', { link_url: String(u), click_source: via }); } catch (e) {}
              };
              document.addEventListener('click', function (e) {
                var a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
                if (a && isWa(a.href)) track(a.href, 'link');
              }, true);
              var originalOpen = window.open;
              window.open = function (u) {
                if (isWa(u)) track(u, 'button');
                return originalOpen.apply(window, arguments);
              };
            })();
          `}
        </Script>
      </body>
    </html>
  );
}
