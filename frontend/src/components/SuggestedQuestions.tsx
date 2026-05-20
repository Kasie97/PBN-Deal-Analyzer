interface Props {
  onSelect: (question: string) => void;
}

const QUESTIONS = [
  'How do I rescue this deal?',
  'What should I say to the CFO?',
  'How do I handle procurement delays?',
  'What is the biggest hidden risk?',
  'How should I reposition against competitors?'
];

export default function SuggestedQuestions({
  onSelect
}: Props) {
  return (
    <div className="flex flex-wrap gap-3">
      {QUESTIONS.map((question) => (
        <button
          key={question}
          onClick={() => onSelect(question)}
          className="bg-white border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition rounded-full px-4 py-2 text-sm"
        >
          {question}
        </button>
      ))}
    </div>
  );
}