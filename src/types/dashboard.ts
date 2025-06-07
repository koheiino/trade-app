import type { LucideIcon } from 'lucide-react';

export interface NavigationItem {
  name: string;
  href: string;
  icon: LucideIcon;
}

export interface TradeEntry {
  id: number;
  date: string;
  profit: number;
  notes: string;
}

export interface DashboardData {
  currentBalance: number;
  weeklyProfit: number;
  monthlyProfit: number;
  streakDays: number;
  winRate: number;
  tradingDays: number;
  recentEntries: TradeEntry[];
}

export interface StatCardProps {
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
  title: string;
  value: string;
  subtitle: string;
  positive?: boolean;
}

export interface QuickTradeState {
  result: 'win' | 'loss' | '';
  amount: string;
}

export interface SidebarProps {
  pathname: string;
  onClose?: () => void;
}

export interface HeaderProps {
  onMenuClick: () => void;
  title: string;
  subtitle?: string;
}
