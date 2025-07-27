import type { Trade } from '../../../../types/trade';

interface RecentActivityProps {
  entries: Trade[];
}

export default function RecentActivity({ entries }: RecentActivityProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          最近のアクティビティ
        </h2>
        <button
          type="button"
          className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
        >
          すべて見る →
        </button>
      </div>

      <div className="space-y-4">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-3 h-3 rounded-full ${
                  (entry.pnl || 0) > 0 ? 'bg-green-500' : 'bg-red-500'
                }`}
              />
              <div>
                <p className="font-medium text-gray-900">
                  {new Date(entry.entryTime).toLocaleDateString('ja-JP')}
                </p>
                <p className="text-sm text-gray-500">{entry.notes}</p>
              </div>
            </div>
            <p
              className={`font-semibold ${
                (entry.pnl || 0) > 0 ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {(entry.pnl || 0) > 0 ? '+' : ''}¥
              {Math.abs(entry.pnl || 0).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
