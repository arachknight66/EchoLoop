const API_BASE_URL = "http://localhost:8000";

/**
 * Analyzes journal text using the backend API
 * @param text - The journal text to analyze
 * @returns Promise with analysis data
 */
export async function analyzeJournal(text: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/analyze`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error analyzing journal:", error);
    throw error;
  }
}

/**
 * Health check for the backend API
 * @returns Promise with API status
 */
export async function checkAPIHealth() {
  try {
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: "GET",
    });

    return response.ok;
  } catch (error) {
    console.error("Error checking API health:", error);
    return false;
  }
}
