"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import wearOsLogo from "./Wear_OS.svg";
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
const DEV_MODE = false; 

export default function SleepTracker() {
  const { sleepData, importSleepData, loading } = useSleep();
  const [isFetchingAuth, setIsFetchingAuth] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const mockSleepData: SleepEntryType[] = [
    { date: "3/9/2026", hours: 6.9 },
    { date: "3/10/2026", hours: 7.4 },
    { date: "3/11/2026", hours: 7.1 },
    { date: "3/12/2026", hours: 8.0 },
    { date: "3/13/2026", hours: 7.6 },
    { date: "3/14/2026", hours: 8.2 },
    { date: "3/15/2026", hours: 7.8 },
  ];

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

  const displayData = sleepData.length > 0 ? sleepData : DEV_MODE ? mockSleepData : [];

  // Sort data chronologically for the chart (oldest to newest)
  const chartData = [...displayData].sort(
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
        ) : chartData.length === 0 ? (
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
                  tick={{ fontSize: 12, fill: '#DCDBCE' }} 
                  tickLine={false}
                  axisLine={false}
                  // Optional: format the date to just show Day/Month so it fits nicely
                  tickFormatter={(value) => value.split('/')[0] + '/' + value.split('/')[1]}
                />
                <YAxis 
                  tick={{ fontSize: 12, fill: '#DCDBCE' }} 
                  tickLine={false}
                  axisLine={false}
                  domain={['dataMin - 1', 'dataMax + 1']}
                />
                <Tooltip 
                  contentStyle={{
                    borderRadius: '8px',
                    border: '1px solid rgba(220, 219, 206, 0.2)',
                    background: 'rgba(30, 30, 30, 0.95)',
                    color: '#FFFFFF'
                  }}
                  labelStyle={{ fontWeight: 'bold', color: '#DCDBCE' }}
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

        {!loading && DEV_MODE && sleepData.length === 0 && (
          <p className="mt-2 text-xs text-gray-400">
            Showing mock trend data. Click Import Smartwatch Data to replace with real smartwatch entries.
          </p>
        )}
      </div>

      {errorMsg && <p className="text-red-500 text-sm mb-3">{errorMsg}</p>}

      <div className="mb-4 flex justify-center">
        <Image
          src={wearOsLogo}
          alt="Wear OS"
          width={280}
          height={400}
          priority
          className="opacity-80 hover:opacity-100 transition-opacity"
        />
      </div>

      <motion.button
        onClick={handleFetchSmartwatchData}
        disabled={isFetchingAuth}
        whileHover={{ scale: 1.05, boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)" }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className="panel-button disabled:opacity-50 disabled:hover:scale-100 mt-auto"
      >
        {isFetchingAuth ? "Fetching 7 Days..." : "Import Smartwatch Data"}
      </motion.button>
    </div>
  );
}