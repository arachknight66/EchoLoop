import React from 'react';
import { motion, Variants } from "framer-motion";

interface JournalEntryProps {
  text: string;
  moodTag: string;
  timestamp: string;
}

const JournalEntry: React.FC<JournalEntryProps> = ({ text, moodTag, timestamp }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -6, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.15)" }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className="p-4 border rounded-lg shadow-md bg-white hover:shadow-xl cursor-pointer transition-colors"
    >
      <p className="text-gray-800">{text}</p>
      <div className="flex justify-between items-center mt-2 gap-2">
        <motion.span 
          className="text-sm text-gray-500 px-2 py-1 rounded bg-gray-100 font-medium"
          whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.1)" }}
        >
          {moodTag}
        </motion.span>
        <span className="text-xs text-gray-400">{new Date(timestamp).toLocaleString()}</span>
      </div>
    </motion.div>
  );
};

export default JournalEntry;
