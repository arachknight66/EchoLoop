"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type Message = {
  id: string;
  text: string;
  sender: "user" | "bot";
};

const initialMessages: Message[] = [
  {
    id: "1",
    text: "What's on your mind today?",
    sender: "bot",
  },
];

const botResponses = [
  "That's interesting. Tell me more.",
  "I see. How did that make you feel?",
  "Keep exploring those thoughts.",
  "Your reflection shows growth.",
  "What else is present for you?",
  "That's a meaningful observation.",
];

export default function ReflectionChatbot() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");

  const handleSendMessage = () => {
    if (input.trim() === "") return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Simulate bot response
    setTimeout(() => {
      const randomResponse =
        botResponses[Math.floor(Math.random() * botResponses.length)];
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        sender: "bot",
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 500);
  };

  return (
    <motion.div
      className="chatbot-card sidebar-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <h3 className="sidebar-card__title">Reflection Companion</h3>
      
      <div className="chatbot-messages">
        {messages.map((message, idx) => (
          <motion.div
            key={message.id}
            className={`chatbot-message ${message.sender}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <p className="message-text">{message.text}</p>
          </motion.div>
        ))}
      </div>

      <div className="chatbot-input-group">
        <input
          type="text"
          className="chatbot-input"
          placeholder="Share your thoughts..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSendMessage();
            }
          }}
        />
        <motion.button
          className="chatbot-send-btn"
          onClick={handleSendMessage}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={input.trim() === ""}
        >
          ↓
        </motion.button>
      </div>
    </motion.div>
  );
}
