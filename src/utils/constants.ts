import { LayoutDashboard, TrendingUp, BarChart3, Settings } from 'lucide-react';
import type { NavigationItem, DashboardData } from '../types/dashboard';

export const navigation: NavigationItem[] = [
  { name: 'ダッシュボード', href: '/', icon: LayoutDashboard },
  { name: 'トレード記録', href: '/records', icon: TrendingUp },
  { name: '分析', href: '/analytics', icon: BarChart3 },
  { name: '設定', href: '/settings', icon: Settings },
];

export const mockData: DashboardData = {
  currentBalance: 1250000,
  weeklyProfit: 45000,
  monthlyProfit: 125000,
  streakDays: 7,
  winRate: 68.5,
  tradingDays: 5,
  recentEntries: [
    { id: 1, date: '2025-06-07', profit: 15000, notes: 'USD/JPY ロング' },
    { id: 2, date: '2025-06-06', profit: -8000, notes: 'EUR/USD ショート' },
    { id: 3, date: '2025-06-05', profit: 22000, notes: 'GBP/JPY ロング' },
  ],
};
