import { AI_CONFIG } from '@/config/aiConfig';
import { getLocalResponse } from './localChatService';

export async function sendMessageToAI(message, language = 'es', conversationHistory = []) {
  const currentLang = language === 'en' ? 'en' : 'es';

  // If AI config is disabled, go straight to local fallback
  if (!AI_CONFIG.useAI) {
    return getLocalResponse(message, currentLang);
  }

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        language: currentLang,
        conversationHistory,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.warn('aiChatService: API responded with error:', response.status, errorData);
      
      if (AI_CONFIG.fallbackToLocal) {
        return getLocalResponse(message, currentLang);
      }
      throw new Error(errorData.error || 'Failed to fetch response from assistant.');
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('aiChatService: Network or server error:', error);
    
    if (AI_CONFIG.fallbackToLocal) {
      return getLocalResponse(message, currentLang);
    }
    
    // Default error string depending on language
    return currentLang === 'es'
      ? 'Lo siento, no puedo conectarme con el asistente en este momento. Por favor escríbenos por WhatsApp.'
      : 'Sorry, I cannot connect with the assistant at this time. Please contact us via WhatsApp.';
  }
}
