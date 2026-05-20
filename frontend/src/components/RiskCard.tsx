interface Props {
  risks: string[];
}

export default function RiskCard({
  risks
}: Props) {
  return (
    <div className="space-y-3">
      {risks.map((risk, idx) => (
        <div
          key={idx}
          className="bg-red-50 border border-red-200 rounded-xl p-4"
        >
          <p className="text-sm text-red-800">
            ⚠️ {risk}
          </p>
        </div>
      ))}
    </div>
  );
}