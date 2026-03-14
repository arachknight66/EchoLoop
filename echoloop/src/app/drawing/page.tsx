"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ReflectionChatbot from "@/components/ReflectionChatbot";

const quotes = [
  {
    text: "The mind is everything. What you think, you become.",
    author: "Buddha",
  },
  {
    text: "In the middle of difficulty lies opportunity.",
    author: "Albert Einstein",
  },
  {
    text: "Be yourself; everyone else is already taken.",
    author: "Oscar Wilde",
  },
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
  },
  {
    text: "Life is what happens when you're busy making other plans.",
    author: "John Lennon",
  },
  {
    text: "It is during our darkest moments that we must focus to see the light.",
    author: "Aristotle",
  },
  {
    text: "The only impossible journey is the one you never begin.",
    author: "Tony Robbins",
  },
  {
    text: "Happiness is not something ready made. It comes from your own actions.",
    author: "Dalai Lama",
  },
  {
    text: "You are never too old to set another goal or to dream a new dream.",
    author: "C.S. Lewis",
  },
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
  },
];

function getQuoteOfDay() {
  const today = new Date();
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000
  );
  return quotes[dayOfYear % quotes.length];
}

export default function DrawingPage() {
  const [quote, setQuote] = useState(quotes[0]);

  useEffect(() => {
    setQuote(getQuoteOfDay());
  }, []);

  return (
    <div className="reflection-page-container">
      <motion.section
        className="reflection-page-shell"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Daily Quote Section */}
        <motion.div
          className="quote-of-day"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="quote-icon">✦</div>
          <blockquote className="quote-text">"{quote.text}"</blockquote>
          <p className="quote-author">— {quote.author}</p>
        </motion.div>

        {/* Chatbot Section */}
        <motion.div
          className="reflection-chatbot-wrapper"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="chatbot-section-header">
            <p className="chatbot-kicker">Reflection Companion</p>
            <h1 className="chatbot-section-title">Share your thoughts</h1>
            <p className="chatbot-section-copy">
              A quiet space for meaningful conversation and self-discovery.
            </p>
          </div>
          <ReflectionChatbot />
        </motion.div>
      </motion.section>
    </div>
  );
}
