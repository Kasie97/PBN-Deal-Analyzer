interface Props {
  steps: string[];
}

export default function ReasoningSteps({
  steps
}: Props) {
  return (
    <div className="space-y-3">
      {steps.map((step, idx) => (
        <div
          key={idx}
          className="flex items-start gap-3 bg-blue-50 rounded-xl p-4"
        >
          <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center mt-0.5">
            ✓
          </div>

          <p className="text-sm text-gray-700">
            {step}
          </p>
        </div>
      ))}
    </div>
  );
}