import { CheckCircle, XCircle } from 'lucide-react';
import { useQuickTrade } from '../../../../hooks/useQuickTrade';

export default function QuickTradeInput() {
  const {
    quickResult,
    quickAmount,
    setQuickAmount,
    selectResult,
    handleQuickTrade,
    isValid,
  } = useQuickTrade();

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 lg:p-8">
      <h2 className="text-xl font-bold mb-6 text-gray-900">
        今日のトレード結果
      </h2>
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => selectResult('win')}
            className={`p-6 rounded-xl border-2 transition-all duration-200 ${
              quickResult === 'win'
                ? 'border-green-500 bg-green-50 shadow-lg shadow-green-500/20'
                : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
            }`}
          >
            <CheckCircle
              className={`w-8 h-8 mx-auto mb-3 ${
                quickResult === 'win' ? 'text-green-600' : 'text-gray-400'
              }`}
            />
            <span className="block font-semibold text-gray-900">勝ち</span>
          </button>
          <button
            type="button"
            onClick={() => selectResult('loss')}
            className={`p-6 rounded-xl border-2 transition-all duration-200 ${
              quickResult === 'loss'
                ? 'border-red-500 bg-red-50 shadow-lg shadow-red-500/20'
                : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
            }`}
          >
            <XCircle
              className={`w-8 h-8 mx-auto mb-3 ${
                quickResult === 'loss' ? 'text-red-600' : 'text-gray-400'
              }`}
            />
            <span className="block font-semibold text-gray-900">負け</span>
          </button>
        </div>

        {quickResult && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <label htmlFor="trade-amount" className="sr-only">
              取引金額
            </label>
            <input
              id="trade-amount"
              type="number"
              placeholder="金額を入力 (例: 15000)"
              value={quickAmount}
              onChange={(e) => setQuickAmount(e.target.value)}
              className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            <button
              type="button"
              onClick={handleQuickTrade}
              disabled={!isValid}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/25"
            >
              記録する
            </button>
          </div>
        )}
      </div>

      <div className="mt-6 text-center">
        <button
          type="button"
          className="text-sm text-gray-600 hover:text-blue-600 font-medium transition-colors"
        >
          詳細な記録を入力する →
        </button>
      </div>
    </div>
  );
}
