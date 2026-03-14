"use client";

import { useState } from "react";
import { useSleep } from "@/hooks/useSleep";
import { auth } from "@/lib/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import type { SleepEntryType } from "@/lib/types";

// ==========================================
// 🛠️ HACKATHON DEV MODE TOGGLE
// Set to 'true' to test with a fake week of data.
// Set to 'false' to use the real Google Fit API.
// ==========================================
const DEV_MODE = false; 

export default function SleepTracker() {
  const { sleepData, importSleepData, loading } = useSleep();
  const [isFetchingAuth, setIsFetchingAuth] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleFetchSmartwatchData = async () => {
    setIsFetchingAuth(true);
    setErrorMsg("");

    try {
      let fitData; 

      if (DEV_MODE) {
        // --- 🧪 MOCK 7-DAY DATA BYPASS ---
        console.log("DEV MODE: Injecting a week of mock smartwatch data...");
        await new Promise((resolve) => setTimeout(resolve, 800)); 
        
        const now = new Date().getTime();
        const mockSessions = [];
        
        // Generate 7 days of sleep data ranging from 6 to 8.5 hours
        for (let i = 6; i >= 0; i--) {
          const endMillis = now - (i * 24 * 60 * 60 * 1000);
          const randomHours = Math.random() * 2.5 + 6; // Random number between 6 and 8.5
          const startMillis = endMillis - (randomHours * 60 * 60 * 1000);
          
          mockSessions.push({
            activityType: 72,
            startTimeMillis: startMillis.toString(),
            endTimeMillis: endMillis.toString(),
          });
        }
        
        fitData = { session: mockSessions };

      } else {
        // --- 🌍 REAL PRODUCTION API (7 DAYS) ---
        const provider = new GoogleAuthProvider();
        provider.addScope("https://www.googleapis.com/auth/fitness.sleep.read");

        const result = await signInWithPopup(auth, provider);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;

        if (!token) throw new Error("Failed to retrieve Google access token.");

        const endTime = new Date().getTime();
        // Changed from 1 day to 7 days (7 * 24 * 60 * 60 * 1000)
        const startTime = endTime - (7 * 24 * 60 * 60 * 1000); 

        const response = await fetch(
          `https://www.googleapis.com/fitness/v1/users/me/sessions?startTime=${startTime}&endTime=${endTime}&activityType=72`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        fitData = await response.json();
      }

      // --- 🧮 DATA PARSING & BULK SAVE ---
      if (!fitData.session || fitData.session.length === 0) {
        setErrorMsg("No sleep data found for the past week. Make sure your watch is synced.");
        return;
      }

      // Map through every session in the array instead of just the last one
      const newEntries: SleepEntryType[] = fitData.session.map((session: any) => {
        const startMillis = parseInt(session.startTimeMillis, 10);
        const endMillis = parseInt(session.endTimeMillis, 10);
        const totalHours = (endMillis - startMillis) / (1000 * 60 * 60);

        return {
          date: new Date(endMillis).toLocaleDateString(),
          hours: Number(totalHours.toFixed(1)),
        };
      });

      // Save all 7 entries to Firestore concurrently using Promise.all
      await Promise.all(newEntries.map(entry => importSleepData(entry)));

    } catch (error) {
      console.error("Error fetching smartwatch data:", error);
      setErrorMsg("Failed to connect to smartwatch data.");
    } finally {
      setIsFetchingAuth(false);
    }
  };

  return (
    <div className="panel-card tracker-card">
      <h2 className="mb-4 text-xl font-semibold">
        Sleep Tracker {DEV_MODE && <span className="text-sm text-red-500 ml-2">(DEV MODE)</span>}
      </h2>
      <div className="mb-4">
        <h3 className="text-lg font-medium">Your Sleep Schedule</h3>
        
        {loading ? (
          <p className="text-sm text-gray-600">Loading your data...</p>
        ) : sleepData.length === 0 ? (
          <p className="text-sm text-gray-600">
            No sleep entries yet. Import smartwatch data to begin.
          </p>
        ) : (
          <ul className="list-disc pl-5">
            {sleepData.map((entry, index) => (
              <li key={entry.id || index}>
                {entry.date}: {entry.hours} hours
              </li>
            ))}
          </ul>
        )}
      </div>

      {errorMsg && <p className="text-red-500 text-sm mb-2">{errorMsg}</p>}

      <button
        onClick={handleFetchSmartwatchData}
        disabled={isFetchingAuth}
        className="panel-button disabled:opacity-50"
      >
        {isFetchingAuth ? "Fetching 7 Days..." : "Import Smartwatch Data"}
      </button>
    </div>
  );
}