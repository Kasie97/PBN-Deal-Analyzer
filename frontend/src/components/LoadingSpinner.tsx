export default function LoadingSpinner() {
  const steps = [
    'Evaluating stakeholder alignment',
    'Analyzing deal risks',
    'Assessing close probability',
    'Generating tactical recommendations',
    'Building executive summary'
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-10 text-center animate-fade-in">
      <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-8"></div>

      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        AI Strategist Working...
      </h2>

      <div className="space-y-3 max-w-md mx-auto text-left">
        {steps.map((step) => (
          <div
            key={step}
            className="flex items-center gap-3"
          >
            <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">
              ✓
            </div>

            <p className="text-gray-700">
              {step}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}