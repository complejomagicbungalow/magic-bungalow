import { CHATBOT_KNOWLEDGE } from '@/data/chatbotKnowledge';

export function getLocalResponse(message, language = 'es') {
  const currentLang = language === 'en' ? 'en' : 'es';
  const k = CHATBOT_KNOWLEDGE[currentLang];
  const text = (message || '').toLowerCase().trim();

  // Helper to check for multiple keywords
  const matches = (keywords) => {
    return keywords.some(keyword => text.includes(keyword));
  };

  // 1. Specific accommodations
  if (matches(['boutique', 'habitación boutique', 'habitacion boutique', 'rooms boutique'])) {
    return `${k.accommodations.boutique.name}: ${k.accommodations.boutique.description}\n\n✨ **${currentLang === 'es' ? 'Características' : 'Features'}:**\n${k.accommodations.boutique.features.map(f => `• ${f}`).join('\n')}\n👥 *${k.accommodations.boutique.capacity}*`;
  }

  if (matches(['garden', 'glamping garden', 'garden bungalow'])) {
    return `${k.accommodations.garden.name}: ${k.accommodations.garden.description}\n\n✨ **${currentLang === 'es' ? 'Características' : 'Features'}:**\n${k.accommodations.garden.features.map(f => `• ${f}`).join('\n')}\n👥 *${k.accommodations.garden.capacity}*`;
  }

  if (matches(['pirámide', 'piramide', 'pyramid', 'pyramid bungalow'])) {
    return `${k.accommodations.piramide.name}: ${k.accommodations.piramide.description}\n\n✨ **${currentLang === 'es' ? 'Características' : 'Features'}:**\n${k.accommodations.piramide.features.map(f => `• ${f}`).join('\n')}\n👥 *${k.accommodations.piramide.capacity}*`;
  }

  if (matches(['cabaña', 'cabana', 'familiar', 'family', 'cabaña familiar'])) {
    return `${k.accommodations.cabana.name}: ${k.accommodations.cabana.description}\n\n✨ **${currentLang === 'es' ? 'Características' : 'Features'}:**\n${k.accommodations.cabana.features.map(f => `• ${f}`).join('\n')}\n👥 *${k.accommodations.cabana.capacity}*`;
  }

  // 2. General Glamping
  if (matches(['glamping', 'glampings'])) {
    return currentLang === 'es'
      ? `Magic Bungalow cuenta con dos espectaculares opciones de Glamping para parejas:\n\n1. **${k.accommodations.garden.name}**: ${k.accommodations.garden.description}\n\n2. **${k.accommodations.piramide.name}**: ${k.accommodations.piramide.description}\n\n¿Te gustaría que te cuente más sobre alguno de ellos o reservar?`
      : `Magic Bungalow offers two spectacular glamping options for couples:\n\n1. **${k.accommodations.garden.name}**: ${k.accommodations.garden.description}\n\n2. **${k.accommodations.piramide.name}**: ${k.accommodations.piramide.description}\n\nWould you like more details on one of them or to book?`;
  }

  // 3. General Accommodations
  if (matches(['alojamiento', 'alojamientos', 'habitación', 'habitacion', 'habitaciones', 'rooms', 'room', 'cabins', 'cabin', 'donde dormir', 'hospedar', 'stay'])) {
    return currentLang === 'es'
      ? `En **Magic Bungalow** ofrecemos 4 tipos de alojamiento rodeados de naturaleza boyacense:\n\n• **${k.accommodations.boutique.name}**: Habitaciones con chimenea para parejas.\n• **${k.accommodations.garden.name}**: Glamping romántico con fogata.\n• **${k.accommodations.piramide.name}**: Glamping con diseño piramidal único.\n• **${k.accommodations.cabana.name}**: Cabaña privada para hasta 5 personas.\n\n¿Cuál te interesa explorar?`
      : `At **Magic Bungalow** we offer 4 types of accommodations surrounded by Boyacá nature:\n\n• **${k.accommodations.boutique.name}**: Boutique rooms with fireplaces for couples.\n• **${k.accommodations.garden.name}**: Romantic glamping with private firepit.\n• **${k.accommodations.piramide.name}**: Glamping with unique pyramid design.\n• **${k.accommodations.cabana.name}**: Private cabin for up to 5 guests.\n\nWhich one would you like to explore?`;
  }

  // 4. Celebrations
  if (matches(['aniversario', 'cumpleaños', 'boda', 'matrimonio', 'propuesta', 'pedida', 'celebrar', 'sorpresa', 'celebracion', 'celebraciones', 'anniversary', 'birthday', 'proposal', 'wedding', 'honeymoon', 'luna de miel', 'noche de bodas'])) {
    return `${k.celebrations.description}\n\n✨ **${currentLang === 'es' ? 'Planes y servicios especiales' : 'Special packages'}:**\n${k.celebrations.services.map(s => `• ${s}`).join('\n')}\n\n💬 *${currentLang === 'es' ? 'Escríbenos para planear algo inolvidable.' : 'Message us to plan an unforgettable surprise.'}*`;
  }

  // 5. Tourism
  if (matches(['turismo', 'atractivos', 'que hacer', 'sitios', 'visitar', 'leyva', 'boyacá', 'boyaca', 'pueblo', 'plaza', 'pozos', 'periquera', 'iguaque', 'fósil', 'fosil', 'terracota', 'ráquira', 'raquira', 'tourism', 'attractions', 'places', 'visit'])) {
    return `${k.tourism.description}\n\n📍 **${currentLang === 'es' ? 'Lugares recomendados' : 'Recommended places'}:**\n${k.tourism.places.map(p => `• **${p.name}**: ${p.desc}`).join('\n')}`;
  }

  // 6. Booking & WhatsApp
  if (matches(['reservar', 'reserva', 'reservas', 'precio', 'tarifa', 'contacto', 'whatsapp', 'teléfono', 'telefono', 'pagar', 'booking', 'book', 'prices', 'rates', 'whatsapp', 'phone', 'cost', 'costo'])) {
    return `${k.booking.process}\n\n📞 **WhatsApp:** ${k.contact.whatsapp}`;
  }

  // 7. General Greetings
  if (matches(['hola', 'buenos dias', 'buenas tardes', 'buenas noches', 'hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'])) {
    return currentLang === 'es'
      ? `¡Hola! Soy Magic Assistant. ¿En qué te puedo ayudar hoy? Puedo darte información de nuestros alojamientos (Hotel Boutique, Glampings y Cabaña), planes de celebración, turismo en Villa de Leyva o guiarte para reservar.`
      : `Hi! I'm Magic Assistant. How can I help you today? I can share information about our accommodations (Boutique Hotel, Glampings, and Cabin), special celebration plans, local tourism, or guide you to book.`;
  }

  // 8. Default fallback
  return k.fallbackResponses.notFound;
}
