'use client';

import { useState } from 'react';
import DashboardContent from '@/app/(dashboard)/dashboard/DashboardContent';
import type { DashboardData } from '@/types/dashboard';

// 簡単なモックデータ
const mockData: DashboardData = {
  currentBalance: 1500000,
  weeklyProfit: 50000,
  monthlyProfit: 200000,
  streakDays: 5,
  winRate: 75.5,
  tradingDays: 120,
  recentTrades: [],
  recentEmotions: [],
  recentJournals: [],
  analytics: {
    totalTrades: 120,
    winningTrades: 90,
    losingTrades: 30,
    winRate: 75.5,
    totalPnl: 200000,
    averageWin: 10000,
    averageLoss: -5000,
    profitFactor: 2.0,
    maxDrawdown: 50000,
    sharpeRatio: 1.5,
    consecutiveWins: 7,
    consecutiveLosses: 3
  }
};

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex gap-6 min-h-screen bg-gray-50">
      {/* モバイルサイドバーオーバーレイ */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden bg-black/50 backdrop-blur-sm transition-opacity"
          onClick={() => setSidebarOpen(false)}
          tabIndex={0}
          role="button"
          aria-label="サイドバーを閉じる"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              setSidebarOpen(false);
            }
          }}
        />
      )}

      {/* メインコンテンツエリア */}
      <div className="min-h-screen flex-1">
        {/* ヘッダー */}
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">
            ダッシュボード
          </h1>
          <p className="text-neutral-600 mt-1">
            今日も一歩ずつ、着実に成長していきましょう
          </p>
        </div>

        {/* メインコンテンツ */}
        <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
          <DashboardContent data={mockData} />
        </main>
      </div>
    </div>
  );
}
