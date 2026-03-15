"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";

type Message = {
  role: "user" | "model";
  parts: [{ text: string }];
};

export default function ReflectionChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      parts: [{ text: "Hi there. I'm here to listen. How are you feeling right now?" }],
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput(""); 
    setIsLoading(true);

    const newMessages: Message[] = [
      ...messages,
      { role: "user", parts: [{ text: userMessage }] },
    ];
    setMessages(newMessages);

    try {
      const safeHistory = messages
        .filter((msg, index) => {
          if (index === 0 && msg.role === "model") return false;
          return true;
        })
        .map(msg => ({
          role: msg.role,
          parts: msg.parts,
        }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          history: safeHistory,
        }),
      });

      if (!response.ok) throw new Error("Network response was not ok");
      
      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        { role: "model", parts: [{ text: data.text }] },
      ]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "model", parts: [{ text: "I'm sorry, I'm having trouble connecting right now. Please take a deep breath and try again in a moment." }] },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="panel-card flex flex-col h-[500px]">
      <div className="border-b border-gray-100 pb-3 mb-4">
        <h2 className="text-xl font-semibold">Reflection Guide</               h2>
        <p className="text-sm text-gray-500">A safe space to untangle your thoughts.</p>
      </div>

      {/* Chat History Window */}
      <div className="flex-grow overflow-y-auto pr-2 mb-4 space-y-4">
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className={`max-w-[85%] text-sm ${
                msg.role === "user"
                  ? "p-3.5 bg-blue-500 text-white rounded-2xl rounded-br-none shadow-sm hover:shadow-md"
                  : "text-gray-800 hover:opacity-80 transition-opacity" // Removed the borders, background, and padding for Gemini
              }`}
            >
              <ReactMarkdown 
                components={{
                  p: ({ node, ...props }) => <p className="mb-2 last:mb-0 leading-relaxed" {...props} />,
                  ul: ({ node, ...props }) => <ul className="list-disc ml-5 mb-2 space-y-1" {...props} />,
                  strong: ({ node, ...props }) => <strong className="font-semibold text-current" {...props} />,
                }}
              >
                {msg.parts[0].text}
              </ReactMarkdown>
            </motion.div>
          </motion.div>
        ))}
        
        {/* Loading Indicator */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            {/* Kept the loading indicator styled so the user knows it's "typing" */}
            <div className="text-gray-500 text-sm flex space-x-1">
              <span className="animate-bounce">.</span>
              <span className="animate-bounce delay-100">.</span>
              <span className="animate-bounce delay-200">.</span>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSendMessage} className="mt-auto flex w-full items-center gap-4 pt-3">
        <motion.input
          whileFocus={{ scale: 1.01 }}
          whileHover={{ borderColor: "#60a5fa" }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your reflection here..."
          // Replaced flex-grow with flex-1 to ensure it properly consumes remaining space
          className="flex-1 min-w-0 h-11 px-4 py-2.5 text-sm border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400/50 bg-white text-gray-800 shadow-sm transition-all box-border"
          disabled={isLoading}
        />
        <motion.button
          type="submit"
          disabled={!input.trim() || isLoading}
          whileHover={{ scale: 1.05, boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)" }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          // Ensure it has a matching box-border height. 
          // Note: Temporarily remove 'panel-button' to test if it's the culprit!
          className="h-11 min-w-[112px] shrink-0 px-5 py-2.5 text-sm font-medium bg-blue-500 text-white rounded-full disabled:opacity-50 shadow-sm transition-all flex items-center justify-center box-border"
        >
          Send
        </motion.button>
      </form>
    </div>
  );
}
