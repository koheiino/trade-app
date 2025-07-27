import type { LucideIcon } from 'lucide-react';
import type { Trade, TradeAnalytics } from './trade';
import type { Emotion } from './emotion';
import type { JournalEntry } from './journal';

export interface NavigationItem {
  name: string;
  href: string;
  icon: LucideIcon;
  badge?: number;
  isActive?: boolean;
}

export interface DashboardData {
  currentBalance: number;
  weeklyProfit: number;
  monthlyProfit: number;
  streakDays: number;
  winRate: number;
  tradingDays: number;
  recentTrades: Trade[];
  recentEmotions: Emotion[];
  recentJournals: JournalEntry[];
  analytics: TradeAnalytics;
}

export interface StatCardProps {
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
  title: string;
  value: string | number;
  subtitle: string;
  positive?: boolean;
  loading?: boolean;
  onClick?: () => void;
}

export interface QuickTradeState {
  result: 'win' | 'loss' | 'breakeven' | '';
  amount: string;
  symbol: string;
  notes: string;
  emotion?: string;
}

export interface SidebarProps {
  pathname: string;
  onClose?: () => void;
  navigationItems: NavigationItem[];
}

export interface HeaderProps {
  onMenuClick: () => void;
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export interface DashboardCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  loading?: boolean;
  error?: string | null;
  onRefresh?: () => void;
}

export interface ProgressData {
  current: number;
  target: number;
  period: 'daily' | 'weekly' | 'monthly' | 'yearly';
  label: string;
}

export interface ActivityItem {
  id: string;
  type: 'trade' | 'journal' | 'emotion' | 'goal';
  title: string;
  description: string;
  timestamp: string;
  status?: 'success' | 'warning' | 'error' | 'info';
  link?: string;
}
