import { LayoutDashboard, TrendingUp, BarChart3, Settings } from 'lucide-react';

export const navigationWithDashboard = [
  { name: 'ダッシュボード', href: '/dashboard', icon: LayoutDashboard },
  { name: 'トレード記録', href: '/dashboard/records', icon: TrendingUp },
  { name: '分析', href: '/dashboard/analytics', icon: BarChart3 },
  { name: '設定', href: '/dashboard/settings', icon: Settings },
];

export const navigation = navigationWithDashboard;
