import React from 'react';
import { motion } from 'framer-motion';

interface JournalEntryProps {
  text: string;
  moodTag: string;
  timestamp: string;
}

const JournalEntry: React.FC<JournalEntryProps> = ({ text, moodTag, timestamp }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className="p-4 border rounded-lg shadow-md bg-white hover:shadow-lg"
    >
      <p className="text-gray-800">{text}</p>
      <div className="flex justify-between items-center mt-2">
        <span className="text-sm text-gray-500">{moodTag}</span>
        <span className="text-xs text-gray-400">{new Date(timestamp).toLocaleString()}</span>
      </div>
    </motion.div>
  );
};

export default JournalEntry;