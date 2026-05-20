interface Props {
  summary: string;
}

export default function ExecutiveSummary({
  summary
}: Props) {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white">
      <h2 className="text-xl font-bold mb-3">
        Executive Summary
      </h2>

      <p className="leading-relaxed text-blue-50">
        {summary}
      </p>
    </div>
  );
}