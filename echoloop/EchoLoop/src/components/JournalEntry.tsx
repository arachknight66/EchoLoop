import React from 'react';

interface JournalEntryProps {
  text: string;
  moodTag: string;
  timestamp: string;
}

const JournalEntry: React.FC<JournalEntryProps> = ({ text, moodTag, timestamp }) => {
  return (
    <div className="p-4 border rounded-lg shadow-md bg-white">
      <p className="text-gray-800">{text}</p>
      <div className="flex justify-between items-center mt-2">
        <span className="text-sm text-gray-500">{moodTag}</span>
        <span className="text-xs text-gray-400">{new Date(timestamp).toLocaleString()}</span>
      </div>
    </div>
  );
};

export default JournalEntry;