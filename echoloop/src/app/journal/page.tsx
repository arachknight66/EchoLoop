import React, { useState } from 'react';
import { db } from '@/lib/firebase'; // Import Firestore configuration
import { collection, addDoc } from 'firebase/firestore';

const JournalPage = () => {
  const [entry, setEntry] = useState('');
  const [mood, setMood] = useState('');

  const handleSaveEntry = async () => {
    if (entry.trim() === '') return;

    try {
      await addDoc(collection(db, 'journalEntries'), {
        text: entry,
        mood: mood,
        timestamp: new Date(),
      });
      setEntry('');
      setMood('');
      alert('Journal entry saved!');
    } catch (error) {
      console.error('Error saving journal entry: ', error);
      alert('Failed to save entry. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white shadow-md rounded-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4">Journal Entry</h2>
        <textarea
          className="w-full h-32 p-2 border border-gray-300 rounded-md"
          placeholder="Write your thoughts..."
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
        />
        <div className="mt-4">
          <label className="block mb-2">Mood:</label>
          <select
            className="w-full border border-gray-300 rounded-md p-2"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
          >
            <option value="">Select mood</option>
            <option value="happy">Happy</option>
            <option value="sad">Sad</option>
            <option value="anxious">Anxious</option>
            <option value="calm">Calm</option>
          </select>
        </div>
        <button
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md"
          onClick={handleSaveEntry}
        >
          Save Entry
        </button>
      </div>
    </div>
  );
};

export default JournalPage;