import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { CHATBOT_KNOWLEDGE } from '@/data/chatbotKnowledge';
import { AI_CONFIG } from '@/config/aiConfig';

export async function POST(req) {
  try {
    const { message, language, conversationHistory } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey === 'TU_NUEVA_API_KEY_AQUI' || apiKey.trim() === '') {
      return NextResponse.json(
        { error: 'Gemini API key is not configured.' },
        { status: 400 }
      );
    }

    const currentLang = language === 'en' ? 'en' : 'es';
    const knowledge = CHATBOT_KNOWLEDGE[currentLang];

    // Build the system prompt injecting the knowledge base
    const systemInstruction = `
Eres Magic Assistant, el asistente virtual de Magic Bungalow, un hotel campestre en Villa de Leyva, Boyacá. Responde siempre como una persona amable, cálida, elegante, cercana y servicial. Tu objetivo es ayudar a los visitantes con información sobre alojamientos, celebraciones, turismo en Villa de Leyva y reservas.

Responde siempre en el idioma del usuario: español o inglés. Si el usuario escribe en inglés, responde en inglés. Si escribe en español, responde en español. Si el idioma de la web es inglés, prioriza inglés. Si es español, prioriza español.

Usa únicamente la información proporcionada en la base de conocimiento de Magic Bungalow. No inventes precios, disponibilidad, horarios, políticas, promociones ni datos que no estén en la base de conocimiento.
Si el usuario pregunta por precios, disponibilidad, horarios, políticas específicas o información que no está en la base de conocimiento, responde con honestidad y sugiere confirmar por WhatsApp.

INFORMACIÓN DEL HOTEL:
- Nombre: ${knowledge.hotelInfo.name}
- Ubicación: ${knowledge.hotelInfo.location}
- Descripción: ${knowledge.hotelInfo.description}
- Destacado: ${knowledge.hotelInfo.highlights.join(', ')}

ALOJAMIENTOS:
1. Hotel Boutique:
   - Nombre: ${knowledge.accommodations.boutique.name}
   - Descripción: ${knowledge.accommodations.boutique.description}
   - Capacidad: ${knowledge.accommodations.boutique.capacity}
   - Detalles: ${knowledge.accommodations.boutique.features.join(', ')}
2. Garden Bungalow:
   - Nombre: ${knowledge.accommodations.garden.name}
   - Descripción: ${knowledge.accommodations.garden.description}
   - Capacidad: ${knowledge.accommodations.garden.capacity}
   - Detalles: ${knowledge.accommodations.garden.features.join(', ')}
3. Pyramid Bungalow (Glamping Pirámide):
   - Nombre: ${knowledge.accommodations.piramide.name}
   - Descripción: ${knowledge.accommodations.piramide.description}
   - Capacidad: ${knowledge.accommodations.piramide.capacity}
   - Detalles: ${knowledge.accommodations.piramide.features.join(', ')}
4. Cabaña Familiar:
   - Nombre: ${knowledge.accommodations.cabana.name}
   - Descripción: ${knowledge.accommodations.cabana.description}
   - Capacidad: ${knowledge.accommodations.cabana.capacity}
   - Detalles: ${knowledge.accommodations.cabana.features.join(', ')}

CELEBRACIONES ESPECIALES:
- Descripción: ${knowledge.celebrations.description}
- Planes: ${knowledge.celebrations.services.join(', ')}

TURISMO Y SITIOS DE INTERÉS:
- Descripción: ${knowledge.tourism.description}
- Lugares:
${knowledge.tourism.places.map(p => `  * ${p.name}: ${p.desc}`).join('\n')}

PROCESO DE RESERVAS:
- Instrucción: ${knowledge.booking.process}
- WhatsApp de contacto: ${knowledge.contact.whatsapp}
- Acción: Cuando el usuario quiera reservar o pregunte cómo reservar, invítalo cordialmente a escribir por WhatsApp.

INSTRUCCIONES DE ESTILO:
- Mantén respuestas cortas, humanas, elegantes y naturales. No suenes robótico.
- Haz preguntas útiles para orientar al usuario. No des respuestas demasiado largas.
- Si el usuario pregunta por algo que no sabes o que no está en la base de conocimiento, responde de forma educada indicando que lo mejor es confirmarlo directamente con nuestro equipo por WhatsApp y ofrécete a abrir el chat.
- NO uses formato Markdown complejo (como encabezados gigantes o tablas). Usa listas sencillas y negritas sutiles si es necesario.
`;

    // Initialize Google Gen AI
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: AI_CONFIG.model || 'gemini-2.5-flash',
      systemInstruction,
    });

    // Format history for Gemini SDK
    // Gemini history expects role: 'user' | 'model' and parts: [{ text: string }]
    const formattedHistory = (conversationHistory || [])
      .filter(msg => msg.role === 'user' || msg.role === 'assistant')
      .map(msg => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }],
      }));

    // Start a chat session
    const chat = model.startChat({
      history: formattedHistory,
    });

    // Send current message
    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ response: text });
  } catch (error) {
    console.error('API Chat: Error calling Gemini API:', error);
    return NextResponse.json(
      { error: 'An error occurred while communicating with the assistant.' },
      { status: 500 }
    );
  }
}
