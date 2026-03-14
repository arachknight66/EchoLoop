"use client";

import { useState } from "react";
import { useSleep } from "@/hooks/useSleep";
import { auth } from "@/lib/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import type { SleepEntryType } from "@/lib/types";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";

// ==========================================
// 🛠️ HACKATHON DEV MODE TOGGLE
// Set to 'true' to test with a fake week of data.
// Set to 'false' to use the real Google Fit API.
// ==========================================
const DEV_MODE = true; 

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
        await new Promise((resolve) => setTimeout(resolve, 800)); 
        
        const now = new Date().getTime();
        const mockSessions = [];
        
        for (let i = 6; i >= 0; i--) {
          const endMillis = now - (i * 24 * 60 * 60 * 1000);
          const randomHours = Math.random() * 2.5 + 6; 
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

      const newEntries: SleepEntryType[] = fitData.session.map((session: any) => {
        const startMillis = parseInt(session.startTimeMillis, 10);
        const endMillis = parseInt(session.endTimeMillis, 10);
        const totalHours = (endMillis - startMillis) / (1000 * 60 * 60);

        return {
          date: new Date(endMillis).toLocaleDateString(),
          hours: Number(totalHours.toFixed(1)),
        };
      });

      await Promise.all(newEntries.map(entry => importSleepData(entry)));

    } catch (error) {
      console.error("Error fetching smartwatch data:", error);
      setErrorMsg("Failed to connect to smartwatch data.");
    } finally {
      setIsFetchingAuth(false);
    }
  };

  // Sort data chronologically for the chart (oldest to newest)
  const chartData = [...sleepData].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <div className="panel-card tracker-card flex flex-col h-full">
      <h2 className="mb-4 text-xl font-semibold">
        Sleep Trends {DEV_MODE && <span className="text-sm text-red-500 ml-2">(DEV MODE)</span>}
      </h2>
      
      <div className="flex-grow mb-6">
        {loading ? (
          <div className="h-48 flex items-center justify-center text-sm text-gray-500">
            Loading your data...
          </div>
        ) : sleepData.length === 0 ? (
          <div className="h-48 flex items-center justify-center text-sm text-gray-500 text-center px-4">
            No sleep entries yet. Import smartwatch data to begin visualizing your trends.
          </div>
        ) : (
          <div className="h-56 w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 12, fill: '#6B7280' }} 
                  tickLine={false}
                  axisLine={false}
                  // Optional: format the date to just show Day/Month so it fits nicely
                  tickFormatter={(value) => value.split('/')[0] + '/' + value.split('/')[1]}
                />
                <YAxis 
                  tick={{ fontSize: 12, fill: '#6B7280' }} 
                  tickLine={false}
                  axisLine={false}
                  domain={['dataMin - 1', 'dataMax + 1']}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  labelStyle={{ fontWeight: 'bold', color: '#374151' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="hours" 
                  stroke="#3B82F6" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: '#3B82F6', strokeWidth: 0 }} 
                  activeDot={{ r: 6, fill: '#1D4ED8' }} 
                  animationDuration={1500}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {errorMsg && <p className="text-red-500 text-sm mb-3">{errorMsg}</p>}

      <button
        onClick={handleFetchSmartwatchData}
        disabled={isFetchingAuth}
        className="panel-button disabled:opacity-50 mt-auto"
      >
        {isFetchingAuth ? "Fetching 7 Days..." : "Import Smartwatch Data"}
      </button>
    </div>
  );
}