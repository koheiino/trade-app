'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from '../../components/layout/Sidebar';
import Header from '../../components/layout/Header';
import DashboardContent from '@/app/dashboard/DashboardContent';
import { mockData } from '../../utils/constants';

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

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

      {/* サイドバー */}
      <div
        className={`
          fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:inset-0
        `}
      >
        <Sidebar pathname={pathname} onClose={() => setSidebarOpen(false)} />
      </div>

      {/* メインコンテンツエリア */}
      <div className="min-h-screen flex-1">
        {/* トップバー */}
        <Header
          onMenuClick={() => setSidebarOpen(true)}
          title="ダッシュボード"
          subtitle="今日も一歩ずつ、着実に成長していきましょう"
        />

        {/* メインコンテンツ */}
        <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
          <DashboardContent data={mockData} />
        </main>
      </div>
    </div>
  );
}
