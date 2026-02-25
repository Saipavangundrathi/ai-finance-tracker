import { useEffect, useState } from 'react';
import { analyzeExpenses } from '../api/expenseApi.js';

export default function AIAnalysis({ onClose }) {
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function runAnalysis() {
      setLoading(true);
      setError('');
      try {
        const result = await analyzeExpenses();
        if (isMounted) {
          setAnalysis(result);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.response?.data?.message ?? err.message ?? 'Failed to analyze expenses');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    runAnalysis();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ai-analysis-title"
    >
      <div className="w-full max-w-2xl rounded-xl border border-gray-700/50 bg-gray-800 p-6 shadow-xl">
        <div className="mb-5 flex items-center gap-2">
          <span className="text-2xl" aria-hidden="true">
            🤖
          </span>
          <h2 id="ai-analysis-title" className="text-xl font-semibold text-white">
            AI Finance Analysis
          </h2>
        </div>

        <div className="min-h-[160px] rounded-lg border border-gray-700 bg-gray-900/60 p-4">
          {loading && (
            <div className="flex h-full min-h-[120px] flex-col items-center justify-center gap-3">
              <div
                className="h-9 w-9 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent"
                aria-hidden="true"
              />
              <p className="text-sm text-gray-300">Analyzing your expenses with AI...</p>
            </div>
          )}

          {!loading && error && (
            <p className="whitespace-pre-wrap text-sm text-red-400">{error}</p>
          )}

          {!loading && !error && (
            <div className="text-gray-200 text-sm leading-7">
              {analysis.split('\n').map((line, index) => {
                if (line.startsWith('### ')) {
                  return <h3 key={index} className="text-white font-bold text-base mt-4 mb-1">{line.replace('### ', '')}</h3>;
                }
                if (line.trim() === '') {
                  return <br key={index} />;
                }
                return (
                  <p key={index} className="mb-1 text-gray-200">
                    {line.replace(/\*\*(.*?)\*\*/g, '$1')}
                  </p>
                );
              })}
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-gray-600 bg-gray-700 px-4 py-2 text-sm font-medium text-gray-200 transition hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
