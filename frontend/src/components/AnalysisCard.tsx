interface Props {
  title: string;
  children: React.ReactNode;
}

export default function AnalysisCard({
  title,
  children
}: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <h3 className="text-lg font-bold text-gray-900 mb-4">
        {title}
      </h3>

      {children}
    </div>
  );
}