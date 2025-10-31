'use client';

import { useEffect, useState } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    console.error("Error captured in boundary:", error);
  }, [error]);

  return (
    <div className="flex flex-col justify-center items-center h-screen p-6 text-center">
      {/* HUMAN FRIENDLY MESSAGE */}
      <h1 className="text-4xl font-bold text-red-600">Oops! Something went wrong.</h1>
      <p className="mt-3 text-gray-600 max-w-lg">
        We couldn’t load this page right now. Please try again or return to the home page.
      </p>

      <div className="flex gap-4 mt-6">
        <button
          onClick={reset}
          className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Try Again
        </button>

        <button
          onClick={() => (window.location.href = '/')}
          className="px-5 py-2 border border-gray-400 rounded-md hover:bg-gray-100"
        >
          Go Home
        </button>
      </div>

      {/* ▾ DEBUG DETAILS — only visible if user clicks */}
      <button
        className="mt-6 text-sm underline text-gray-500 hover:text-gray-800"
        onClick={() => setShowDetails(!showDetails)}
      >
        {showDetails ? "Hide error details" : "Show error details"}
      </button>

      {showDetails && (
        <pre className="mt-4 p-4 bg-gray-100 border rounded-md text-left max-w-3xl w-full text-sm text-red-600 overflow-x-auto">
          {error.message || "Unknown error occurred"}
        </pre>
      )}
    </div>
  );
}
