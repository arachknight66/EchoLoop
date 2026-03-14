export interface FirestoreTimestampLike {
  toDate: () => Date;
}

export interface JournalEntryType {
  id?: string;
  text: string;
  mood: string;
  timestamp: Date | string | FirestoreTimestampLike;
  sketch?: string | null;
}

export interface SleepEntryType {
  id?: string;
  date: string;
  hours: number;
}
