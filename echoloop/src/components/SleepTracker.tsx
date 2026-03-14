"use client";

import { useState } from "react";
import { useSleep } from "@/hooks/useSleep";
import { auth } from "@/lib/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import type { SleepEntryType } from "@/lib/types";

export default function SleepTracker() {
  const { sleepData, importSleepData, loading } = useSleep();
  const [isFetchingAuth, setIsFetchingAuth] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleFetchSmartwatchData = async () => {
    setIsFetchingAuth(true);
    setErrorMsg("");

    try {
      // 1. Set up Google Auth Provider with the specific Sleep scope
      const provider = new GoogleAuthProvider();
      provider.addScope("https://www.googleapis.com/auth/fitness.sleep.read");

      // 2. Trigger the Google Login Popup
      const result = await signInWithPopup(auth, provider);
      
      // 3. Extract the OAuth Access Token
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;

      if (!token) throw new Error("Failed to retrieve Google access token.");

      // 4. Define the time range (fetch sleep from the last 24 hours)
      const endTime = new Date().getTime();
      const startTime = endTime - (24 * 60 * 60 * 1000); 

      // 5. Call the Google Fit REST API
      // Activity type 72 specifically represents Sleep in Google Fit
      const response = await fetch(
        `https://www.googleapis.com/fitness/v1/users/me/sessions?startTime=${startTime}&endTime=${endTime}&activityType=72`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      const fitData = await response.json();

      if (!fitData.session || fitData.session.length === 0) {
        setErrorMsg("No sleep data found for last night. Make sure your watch is synced to Google Fit.");
        return;
      }

      // 6. Calculate total sleep hours from the most recent session
      const latestSleepSession = fitData.session[fitData.session.length - 1];
      const startMillis = parseInt(latestSleepSession.startTimeMillis, 10);
      const endMillis = parseInt(latestSleepSession.endTimeMillis, 10);
      
      const totalHours = (endMillis - startMillis) / (1000 * 60 * 60);

      // 7. Format the data to match your SleepEntryType
      const newEntry: SleepEntryType = {
        date: new Date(endMillis).toLocaleDateString(),
        hours: Number(totalHours.toFixed(1)), // Round to 1 decimal place
      };

      // 8. Save to Firestore using your existing hook
      await importSleepData(newEntry);

    } catch (error) {
      console.error("Error fetching smartwatch data:", error);
      setErrorMsg("Failed to connect to smartwatch data.");
    } finally {
      setIsFetchingAuth(false);
    }
  };

  return (
    <div className="panel-card tracker-card">
      <h2 className="mb-4 text-xl font-semibold">Sleep Tracker</h2>
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
        {isFetchingAuth ? "Connecting to Watch..." : "Import Smartwatch Data"}
      </button>
    </div>
  );
}