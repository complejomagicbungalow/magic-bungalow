"use client";

import { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { TRANSLATIONS } from "@/data/translations";
import { CHATBOT_KNOWLEDGE } from "@/data/chatbotKnowledge";
import { sendMessageToAI } from "@/services/aiChatService";
import styles from "./ChatbotWidget.module.css";

export default function ChatbotWidget({ webLanguage = "es", whatsappUrl }) {
  const [isOpen, setIsOpen] = useState(false);
  const [chatLanguage, setChatLanguage] = useState(webLanguage);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasChosenLanguage, setHasChosenLanguage] = useState(false);

  const messagesEndRef = useRef(null);
  const t = TRANSLATIONS[chatLanguage]?.chatbot || TRANSLATIONS.es.chatbot;
  const k = CHATBOT_KNOWLEDGE[chatLanguage] || CHATBOT_KNOWLEDGE.es;

  // Sync language with main website if the user hasn't explicitly overridden it in chat yet
  useEffect(() => {
    if (!hasChosenLanguage) {
      setChatLanguage(webLanguage);
    }
  }, [webLanguage, hasChosenLanguage]);

  // Initial welcome message
  useEffect(() => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: TRANSLATIONS[chatLanguage]?.chatbot.welcome || TRANSLATIONS.es.chatbot.welcome,
        isWelcome: true
      }
    ]);
  }, [chatLanguage]);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const handleSendMessage = async (text) => {
    if (!text.trim()) return;

    // 1. Add user message
    const userMsg = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    // 2. Format conversation history (excluding welcome)
    const history = messages
      .filter((m) => !m.isWelcome)
      .map((m) => ({
        role: m.role,
        content: m.content
      }));

    // 3. Request reply
    try {
      const reply = await sendMessageToAI(text, chatLanguage, history);
      
      // Artificial delay for organic feeling
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: `assistant-${Date.now()}`,
            role: "assistant",
            content: reply
          }
        ]);
        setIsTyping(false);
      }, 800);
    } catch (err) {
      console.error(err);
      setIsTyping(false);
    }
  };

  const handleQuickReply = (action, text) => {
    // If selecting language
    if (action === "lang-es") {
      setChatLanguage("es");
      setHasChosenLanguage(true);
      addAssistantMessage("Perfecto, hablemos en Español. ¿Cómo te puedo ayudar hoy?");
      return;
    }
    if (action === "lang-en") {
      setChatLanguage("en");
      setHasChosenLanguage(true);
      addAssistantMessage("Great, let's chat in English. How can I assist you today?");
      return;
    }

    // Standard Quick replies
    if (action === "whatsapp" || action === "book") {
      // Redirect to whatsapp
      window.open(whatsappUrl, "_blank");
      handleSendMessage(text);
      return;
    }

    // Send the quick reply as a message
    handleSendMessage(text);
  };

  const addAssistantMessage = (content) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content
        }
      ]);
      setIsTyping(false);
    }, 600);
  };

  // Basic HTML formatter for markdown symbols (like bold ** and bullet points)
  const formatText = (text) => {
    if (!text) return "";
    let formatted = text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    
    // Bold text **word**
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    // Line breaks
    formatted = formatted.replace(/\n/g, "<br />");
    return formatted;
  };

  const quickRepliesList = hasChosenLanguage
    ? (chatLanguage === "en" ? k.quickReplies : k.quickReplies)
    : [
        { text: "Español", action: "lang-es" },
        { text: "English", action: "lang-en" }
      ];

  return (
    <div className={styles.widgetWrapper}>
      {/* Floating launcher button */}
      <motion.button
        className={`${styles.launcher} pulse-button`}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open chat assistant"
      >
        <MessageSquare size={24} className={styles.launcherIcon} />
        <span className={styles.launcherText}>{t.launcher}</span>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.chatWindow}
            initial={{ opacity: 0, scale: 0.85, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
          >
            {/* Header */}
            <div className={styles.chatHeader}>
              <div className={styles.headerInfo}>
                <img src="/logo.png" alt="Magic Assistant" className={styles.avatar} />
                <div>
                  <h4 className={styles.name}>Magic Assistant</h4>
                  <div className={styles.statusRow}>
                    <span className={styles.statusDot}></span>
                    <span className={styles.statusText}>{t.status}</span>
                  </div>
                </div>
              </div>
              <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
                <X size={20} />
              </button>
            </div>

            {/* Message stream */}
            <div className={styles.messageStream}>
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`${styles.messageRow} ${
                    msg.role === "user" ? styles.rowUser : styles.rowBot
                  }`}
                >
                  <div
                    className={`${styles.bubble} ${
                      msg.role === "user" ? styles.bubbleUser : styles.bubbleBot
                    }`}
                  >
                    <span
                      className="bot-response"
                      dangerouslySetInnerHTML={{ __html: formatText(msg.content) }}
                    />
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className={`${styles.messageRow} ${styles.rowBot}`}>
                  <div className={`${styles.bubble} ${styles.bubbleBot} ${styles.bubbleTyping}`}>
                    <span className={styles.typingText}>{t.typing}</span>
                    <div className={styles.typingDots}>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Quick replies */}
            <div className={styles.quickRepliesContainer}>
              {quickRepliesList.map((reply, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickReply(reply.action, reply.text)}
                  className={styles.quickReplyBtn}
                >
                  {reply.action === "whatsapp" && <MessageCircle size={12} style={{ marginRight: 4 }} />}
                  {reply.text}
                </button>
              ))}
            </div>

            {/* Input form */}
            <form
              className={styles.inputForm}
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue);
              }}
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={t.inputPlaceholder}
                className={styles.inputField}
                disabled={isTyping}
              />
              <button
                type="submit"
                className={styles.sendBtn}
                disabled={!inputValue.trim() || isTyping}
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
