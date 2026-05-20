import type {
  RecommendedAction
} from '../utils/types';

interface Props {
  actions: RecommendedAction[];
}

export default function ActionCard({
  actions
}: Props) {
  return (
    <div className="space-y-4">
      {actions.map((item, idx) => (
        <div
          key={idx}
          className="border border-gray-200 rounded-2xl p-5"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="font-semibold text-gray-900">
              Action {idx + 1}
            </span>

            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                item.priority === 'High'
                  ? 'bg-red-100 text-red-700'
                  : item.priority === 'Medium'
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'bg-green-100 text-green-700'
              }`}
            >
              {item.priority} Priority
            </span>
          </div>

          <p className="text-gray-700 mb-4">
            {item.action}
          </p>

          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-xs font-semibold text-gray-500 mb-1">
              EXPECTED IMPACT
            </p>

            <p className="text-sm text-gray-700">
              {item.expectedImpact}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}