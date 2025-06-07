import { Target } from 'lucide-react';

interface ProgressTrackerProps {
  currentBalance: number;
  targetBalance?: number;
}

export default function ProgressTracker({
  currentBalance,
  targetBalance = 5000000,
}: ProgressTrackerProps) {
  const progress = (currentBalance / targetBalance) * 100;
  const remaining = targetBalance - currentBalance;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">目標達成まで</h2>
        <Target className="w-6 h-6 text-gray-400" />
      </div>

      <div className="space-y-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">
            次の目標: ¥{targetBalance.toLocaleString()}
          </span>
          <span className="font-semibold text-gray-900">
            {progress.toFixed(1)}%
          </span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-1000 ease-out"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>

        <div className="flex justify-between text-sm text-gray-500">
          <span>残り ¥{remaining.toLocaleString()}</span>
          <span>Phase 3 → 4</span>
        </div>
      </div>
    </div>
  );
}
