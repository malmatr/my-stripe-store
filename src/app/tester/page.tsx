"use client";

import { useState } from "react";

export default function TesterPage() {
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const testApi = async () => {
    setLoading(true);
    setResult(null); // Clear previous results
    try {
      const response = await fetch(`/api/tester`);
      if (response.ok) {
        const data = await response.json();
        setResult(`Success: ${JSON.stringify(data)}`);
      } else {
        setResult(`Error: ${response.status} - ${response.statusText}`);
      }
    } catch (error: any) {
      setResult(`Fetch Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-center">API Route Tester</h1>
      <p className="mb-6 text-center text-gray-600">
        Click this button to send a request from this page (the client) to your
        new API route (the server).
      </p>
      <button
        onClick={testApi}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Testing..." : "Test /api/tester"}
      </button>
      {result && (
        <div className="mt-8 p-6 bg-gray-100 rounded-lg shadow-inner w-full max-w-2xl">
          <h2 className="text-xl font-semibold mb-2">Result:</h2>
          <pre className="text-sm bg-gray-800 text-green-400 p-4 rounded-md whitespace-pre-wrap break-words">
            {result}
          </pre>
        </div>
      )}
    </div>
  );
}
