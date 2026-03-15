// Add this new interface to define the shape of your emotion percentages
export interface EmotionData {
  [key: string]: string; // e.g., "sad": "85.20%"
}

export interface FirestoreTimestampLike {
  toDate: () => Date;
}

export interface JournalEntryType {
  id?: string;
  text: string;
  mood: string;
  timestamp: Date | string | FirestoreTimestampLike;
  sketch?: string | null;
  
  // --- New AI Analysis Fields ---
  summary?: string;
  allEmotions?: EmotionData;
  topEmotions?: string[];
}

export interface SleepEntryType {
  id?: string;
  date: string;
  hours: number;
}