'use client';

import { useState } from 'react';
import DashboardContent from '@/app/(dashboard)/dashboard/DashboardContent';
import { mockData } from '../../../utils/constants';

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
