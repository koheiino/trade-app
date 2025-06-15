import QuickTradeInput from '@/app/(dashboard)/dashboard/QuickTradeInput';
import StatsGrid from '@/app/(dashboard)/dashboard/StatsGrid';
import ProgressTracker from '@/app/(dashboard)/dashboard/ProgressTracker';
import RecentActivity from '@/app/(dashboard)/dashboard/RecentActivity';
import type { DashboardData } from '@/types/dashboard';

interface DashboardContentProps {
  data: DashboardData;
}

export default function DashboardContent({ data }: DashboardContentProps) {
  return (
    <div className="space-y-8">
      {/* クイック入力エリア */}
      <QuickTradeInput />

      {/* 統計カード */}
      <StatsGrid data={data} />

      {/* 進捗トラッカー */}
      <ProgressTracker currentBalance={data.currentBalance} />

      {/* 最近のアクティビティ */}
      <RecentActivity entries={data.recentEntries} />
    </div>
  );
}
