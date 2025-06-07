import QuickTradeInput from '../QuickTradeInput';
import StatsGrid from '../StatsGrid';
import ProgressTracker from '../ProgressTracker';
import RecentActivity from '@/app/dashboard/RecentActivity';
import type { DashboardData } from '../../../types/dashboard';

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
