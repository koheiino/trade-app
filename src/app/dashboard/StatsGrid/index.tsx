import { DollarSign, TrendingUp, Calendar, Activity } from 'lucide-react';
import StatCard from '@/components/ui/StatCard';
import type { DashboardData } from '../../../types/dashboard';

interface StatsGridProps {
  data: DashboardData;
}

export default function StatsGrid({ data }: StatsGridProps) {
  const {
    currentBalance,
    weeklyProfit,
    monthlyProfit,
    streakDays,
    winRate,
    tradingDays,
  } = data;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      <StatCard
        icon={DollarSign}
        iconColor="text-green-600"
        iconBg="bg-green-100"
        title="現在の残高"
        value={`¥${currentBalance.toLocaleString()}`}
        subtitle="Phase 3 (¥1M - ¥5M)"
      />
      <StatCard
        icon={TrendingUp}
        iconColor="text-blue-600"
        iconBg="bg-blue-100"
        title="週間損益"
        value={`+¥${weeklyProfit.toLocaleString()}`}
        subtitle={`勝率 ${winRate}%`}
        positive
      />
      <StatCard
        icon={Calendar}
        iconColor="text-purple-600"
        iconBg="bg-purple-100"
        title="月間損益"
        value={`+¥${monthlyProfit.toLocaleString()}`}
        subtitle={`${tradingDays}日間取引`}
        positive
      />
      <StatCard
        icon={Activity}
        iconColor="text-orange-600"
        iconBg="bg-orange-100"
        title="連続記録"
        value={`${streakDays}日`}
        subtitle="継続は力なり"
      />
    </div>
  );
}
