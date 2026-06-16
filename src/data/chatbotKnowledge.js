export const WHATSAPP_NUMBER = "573214507618"; // Cambia este número por el número real del hotel (formato internacional sin el signo +)

export const CHATBOT_KNOWLEDGE = {
  es: {
    hotelInfo: {
      name: "Magic Bungalow",
      location: "Villa de Leyva, Boyacá, Colombia (a pocos minutos del centro histórico)",
      description: "Un hotel campestre y refugio boutique diseñado para descansar, celebrar el amor y vivir experiencias únicas rodeados de naturaleza. Ofrece una mezcla única de confort colonial y lujo natural.",
      highlights: ["Naturaleza boyacense", "Tranquilidad y privacidad", "Glampings románticos", "Habitaciones con chimenea", "Cabaña familiar", "Espacio para celebraciones", "Fogatas bajo las estrellas"]
    },
    accommodations: {
      boutique: {
        name: "Hotel Boutique",
        description: "Habitaciones acogedoras, privadas y llenas de encanto, rodeadas de naturaleza. Cuentan con baño privado y chimenea. Ideales para parejas, aniversarios y escapadas tranquilas en las frías noches boyacenses.",
        capacity: "Parejas (2 personas)",
        features: ["Baño privado", "Chimenea", "Entorno natural", "Desayuno incluido"]
      },
      garden: {
        name: "Garden Bungalow",
        description: "Una experiencia de glamping romántica, privada y en total conexión con la naturaleza. Cuenta con fogata privada y un diseño íntimo ideal para aniversarios, pedidas de mano, noches de bodas o una luna de miel mágica.",
        capacity: "Parejas (2 personas)",
        features: ["Diseño de glamping circular", "Fogata privada", "Jardín privado", "Ambiente romántico"]
      },
      piramide: {
        name: "Pyramid Bungalow (Glamping Pirámide)",
        description: "Glamping con arquitectura piramidal única y espectacular. Ofrece un espacio muy íntimo, entorno natural y una atmósfera de total tranquilidad, perfecto para desconectarse y reconectar en pareja.",
        capacity: "Parejas (2 personas)",
        features: ["Arquitectura piramidal única", "Ventanal panorámico", "Entorno íntimo", "Noches estrelladas"]
      },
      cabana: {
        name: "Cabaña Familiar",
        description: "Espaciosa cabaña con capacidad para hasta 5 personas, ideal para viajes familiares, grupos de amigos, vacaciones cortas o fines de semana en Boyacá. Ofrece total privacidad y el confort de un hogar campestre.",
        capacity: "Hasta 5 personas",
        features: ["Varias habitaciones/camas", "Cocina equipada", "Sala de estar", "Jardín y zona verde"]
      }
    },
    celebrations: {
      description: "Somos el escenario perfecto para celebrar la vida y el amor. Ofrecemos planes personalizados para aniversarios, cumpleaños, pedidas de mano, matrimonios íntimos, noche de bodas, luna de miel y escapadas románticas.",
      services: [
        "Decoración romántica especial en la habitación o glamping",
        "Arreglos florales y velas",
        "Cenas privadas bajo las estrellas",
        "Tablas de quesos y carnes frías",
        "Vinos, champaña y chocolates premium",
        "Fogatas privadas con masmelos",
        "Planes de pedida de mano sorpresa"
      ],
      ctaText: "Quiero planear una sorpresa"
    },
    tourism: {
      description: "Magic Bungalow es el punto de partida perfecto para explorar la riqueza colonial y natural de Boyacá.",
      places: [
        { name: "Centro Histórico de Villa de Leyva", desc: "Calles empedradas con arquitectura colonial perfectamente preservada." },
        { name: "Plaza Mayor", desc: "La plaza empedrada más grande de Colombia y una de las más imponentes de América." },
        { name: "Santuario de Iguaque y Laguna Sagrada", desc: "Cuna de la mitología Muisca, ideal para caminatas y senderismo ecológico." },
        { name: "Cascadas de La Periquera", desc: "Espectaculares caídas de agua rodeadas de exuberante vegetación boyacense." },
        { name: "Pozos Azules", desc: "Pozos artificiales de aguas de color azul verdoso debido a la riqueza mineral del suelo desértico." },
        { name: "Casa Terracota", desc: "La pieza de cerámica más grande del mundo, construida enteramente de arcilla cocida." },
        { name: "Mirador El Santo", desc: "Un mirador en la cima de la montaña que ofrece una vista panorámica espectacular del pueblo." },
        { name: "Museo Paleontológico y Zona del Fósil", desc: "Exhibición de fósiles prehistóricos marinos de hace más de 110 millones de años." },
        { name: "Ráquira", desc: "Pueblo vecino famoso mundialmente por sus artesanías de arcilla, talleres de alfarería y fachadas coloridas." }
      ]
    },
    booking: {
      process: "Para reservar, haz clic en el botón de WhatsApp o escríbenos directamente. Te confirmaremos tarifas, disponibilidad en tiempo real y te ayudaremos a personalizar tu estadía con planes especiales.",
      whatsappMsg: "Hola, estoy interesado/a en reservar en Magic Bungalow. Me gustaría recibir información sobre disponibilidad, tarifas y alojamientos.",
      url: `https://wa.me/${WHATSAPP_NUMBER}?text=Hola,%20estoy%20interesado/a%20en%20reservar%20en%20Magic%20Bungalow.%20Me%20gustar%C3%ADa%20recibir%20informaci%C3%B3n%20sobre%20disponibilidad,%20tarifas%20y%20alojamientos.`
    },
    contact: {
      address: "Villa de Leyva, Boyacá, Colombia",
      whatsapp: `+${WHATSAPP_NUMBER}`,
      email: "info@magicbungalow.com",
      instagram: "@magicbungalowvilladeleyva",
      facebook: "@magicbungalowvilla",
      tiktok: "@magicbungalow"
    },
    fallbackResponses: {
      notFound: "Para darte una respuesta exacta sobre eso, lo mejor es confirmarlo directamente con nuestro equipo por WhatsApp. ¿Quieres que te abra el chat de reserva?",
      error: "Lo siento, estoy teniendo problemas para conectarme con mi cerebro de IA en este momento. Sin embargo, puedo ayudarte con información general o podemos comunicarnos por WhatsApp."
    },
    quickReplies: [
      { text: "Ver alojamientos", action: "accommodations" },
      { text: "Celebrar aniversario", action: "anniversary" },
      { text: "Pedida de mano", action: "proposal" },
      { text: "Viajo en familia", action: "family" },
      { text: "Turismo cercano", action: "tourism" },
      { text: "Quiero reservar", action: "book" },
      { text: "Hablar por WhatsApp", action: "whatsapp" }
    ]
  },
  en: {
    hotelInfo: {
      name: "Magic Bungalow",
      location: "Villa de Leyva, Boyacá, Colombia (a few minutes from the historic town center)",
      description: "A countryside hotel and boutique retreat designed to relax, celebrate love, and enjoy unique experiences surrounded by nature. It offers a unique blend of colonial warmth and natural luxury.",
      highlights: ["Boyacá nature", "Tranquility & privacy", "Romantic glampings", "Rooms with fireplaces", "Family cabin", "Event spaces", "Bonfires under the stars"]
    },
    accommodations: {
      boutique: {
        name: "Boutique Hotel",
        description: "Cozy, private, and charming rooms surrounded by nature. They feature a private bathroom and fireplace. Ideal for couples, anniversaries, and peaceful getaways during chilly Boyacá nights.",
        capacity: "Couples (2 guests)",
        features: ["Private bathroom", "Fireplace", "Natural surroundings", "Breakfast included"]
      },
      garden: {
        name: "Garden Bungalow",
        description: "A romantic and private glamping experience in total harmony with nature. Features a private firepit and an intimate layout perfect for anniversaries, proposals, wedding nights, or a magical honeymoon.",
        capacity: "Couples (2 guests)",
        features: ["Circular glamping design", "Private firepit", "Private garden", "Romantic ambiance"]
      },
      piramide: {
        name: "Pyramid Bungalow (Pyramid Glamping)",
        description: "Glamping with a unique and spectacular pyramid architecture. It offers an intimate space, natural surroundings, and an atmosphere of absolute peace, perfect for couples to disconnect and reconnect.",
        capacity: "Couples (2 guests)",
        features: ["Unique pyramid architecture", "Panoramic window", "Intimate setting", "Starry nights"]
      },
      cabana: {
        name: "Family Cabin",
        description: "A spacious cabin accommodating up to 5 guests, ideal for family trips, groups of friends, short vacations, or weekends in Boyacá. It offers total privacy and the comfort of a countryside home.",
        capacity: "Up to 5 guests",
        features: ["Multiple rooms/beds", "Fully equipped kitchen", "Living room", "Garden and green areas"]
      }
    },
    celebrations: {
      description: "We are the perfect stage to celebrate life and love. We offer personalized packages for anniversaries, birthdays, proposals, intimate weddings, wedding nights, honeymoons, and romantic getaways.",
      services: [
        "Special romantic decoration in your room or glamping",
        "Flower arrangements and candles",
        "Private dinners under the stars",
        "Cheese and charcuterie boards",
        "Wines, champagne, and premium chocolates",
        "Private campfires with marshmallows",
        "Surprise proposal packages"
      ],
      ctaText: "Plan a surprise"
    },
    tourism: {
      description: "Magic Bungalow is the perfect starting point to explore the colonial and natural richness of Boyacá.",
      places: [
        { name: "Villa de Leyva Historic Center", desc: "Cobblestone streets with perfectly preserved colonial architecture." },
        { name: "Plaza Mayor", desc: "The largest cobblestone square in Colombia and one of the most imposing in the Americas." },
        { name: "Iguaque Sanctuary & Sacred Lagoon", desc: "The birthplace of Muisca mythology, ideal for nature hikes and ecological trekking." },
        { name: "La Periquera Waterfalls", desc: "Spectacular waterfalls surrounded by lush Boyacá vegetation." },
        { name: "Pozos Azules", desc: "Man-made mineral pools featuring vivid blue-green waters set in a desert-like landscape." },
        { name: "Casa Terracota", desc: "The largest piece of pottery in the world, built entirely of baked clay." },
        { name: "El Santo Viewpoint", desc: "A viewpoint on the mountain peak that offers a spectacular panoramic view of the town." },
        { name: "Paleontological Museum & Fossil Zone", desc: "Exhibition of prehistoric marine fossils dating back over 110 million years." },
        { name: "Ráquira", desc: "A neighboring village globally famous for clay pottery, artisan workshops, and colorful facades." }
      ]
    },
    booking: {
      process: "To book, click the WhatsApp button or message us directly. We will confirm rates, real-time availability, and help you customize your stay with special plans.",
      whatsappMsg: "Hi, I'm interested in booking at Magic Bungalow. I would like to receive information about availability, rates and accommodations.",
      url: `https://wa.me/${WHATSAPP_NUMBER}?text=Hi,%20I'm%20interested%20in%20booking%20at%20Magic%20Bungalow.%20I%20would%20like%20to%20receive%20information%20about%20availability,%20rates%20and%20accommodations.`
    },
    contact: {
      address: "Villa de Leyva, Boyacá, Colombia",
      whatsapp: `+${WHATSAPP_NUMBER}`,
      email: "info@magicbungalow.com",
      instagram: "@magicbungalowvilladeleyva",
      facebook: "@magicbungalowvilla",
      tiktok: "@magicbungalow"
    },
    fallbackResponses: {
      notFound: "To give you an exact answer about that, it's best to confirm directly with our team on WhatsApp. Would you like me to open the booking chat?",
      error: "Sorry, I'm having trouble connecting to my AI brain right now. However, I can help you with general information or we can chat via WhatsApp."
    },
    quickReplies: [
      { text: "View accommodations", action: "accommodations" },
      { text: "Celebrate anniversary", action: "anniversary" },
      { text: "Proposal plan", action: "proposal" },
      { text: "Family trip", action: "family" },
      { text: "Nearby attractions", action: "tourism" },
      { text: "I want to book", action: "book" },
      { text: "Chat on WhatsApp", action: "whatsapp" }
    ]
  }
};
