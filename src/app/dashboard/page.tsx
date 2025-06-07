'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  TrendingUp,
  BarChart3,
  Settings,
  Menu,
  X,
  LogOut,
  ChevronRight,
  DollarSign,
  Calendar,
  Activity,
  Target,
  CheckCircle,
  XCircle,
  TrendingDown,
  Bell,
  Search,
  User,
} from 'lucide-react';

const navigation = [
  { name: 'ダッシュボード', href: '/', icon: LayoutDashboard },
  { name: 'トレード記録', href: '/records', icon: TrendingUp },
  { name: '分析', href: '/analytics', icon: BarChart3 },
  { name: '設定', href: '/settings', icon: Settings },
];

// ダミーデータ
const mockData = {
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

export default function ImprovedDashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [quickResult, setQuickResult] = useState('');
  const [quickAmount, setQuickAmount] = useState('');
  const pathname = '/';

  const handleQuickTrade = () => {
    // クイックトレード記録の処理
    console.log('Quick trade recorded:', {
      result: quickResult,
      amount: quickAmount,
    });
    setQuickResult('');
    setQuickAmount('');
  };

  return (
    <div className="flex gap-6 min-h-screen bg-gray-50">
      {/* モバイルサイドバーオーバーレイ */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden bg-black/50 backdrop-blur-sm transition-opacity"
          onClick={() => setSidebarOpen(false)}
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
      <div className="min-h-screen">
        {/* トップバー */}
        <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200">
          <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Menu className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  ダッシュボード
                </h1>
                <p className="text-sm text-gray-500 hidden sm:block">
                  今日も一歩ずつ、着実に成長していきましょう
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <Search className="w-5 h-5 text-gray-600" />
              </button>
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </header>

        {/* メインコンテンツ */}
        <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
          <DashboardContent
            quickResult={quickResult}
            setQuickResult={setQuickResult}
            quickAmount={quickAmount}
            setQuickAmount={setQuickAmount}
            handleQuickTrade={handleQuickTrade}
          />
        </main>
      </div>
    </div>
  );
}

function Sidebar({
  pathname,
  onClose,
}: {
  pathname: string;
  onClose?: () => void;
}) {
  return (
    <div className="h-full flex flex-col bg-white">
      {/* ロゴエリア */}
      <div className="flex items-center justify-between p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">FX Trading</h1>
            <p className="text-xs text-gray-500">Diary</p>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        )}
      </div>

      {/* ナビゲーション */}
      <nav className="flex-1 p-6 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onClose}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }
              `}
            >
              <item.icon
                className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'}`}
              />
              <span className="font-medium">{item.name}</span>
              {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
            </Link>
          );
        })}
      </nav>

      {/* ユーザー情報 */}
      <div className="p-6 border-t border-gray-100">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
            <span className="text-sm font-semibold text-white">U</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              user@example.com
            </p>
            <p className="text-xs text-gray-500">トレーダー</p>
          </div>
        </div>
        <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
          <LogOut className="w-4 h-4" />
          ログアウト
        </button>
      </div>
    </div>
  );
}

function DashboardContent({
  quickResult,
  setQuickResult,
  quickAmount,
  setQuickAmount,
  handleQuickTrade,
}: {
  quickResult: string;
  setQuickResult: (value: string) => void;
  quickAmount: string;
  setQuickAmount: (value: string) => void;
  handleQuickTrade: () => void;
}) {
  return (
    <div className="space-y-8">
      {/* クイック入力エリア */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 lg:p-8">
        <h2 className="text-xl font-bold mb-6 text-gray-900">
          今日のトレード結果
        </h2>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setQuickResult('win')}
              className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                quickResult === 'win'
                  ? 'border-green-500 bg-green-50 shadow-lg shadow-green-500/20'
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
              }`}
            >
              <CheckCircle
                className={`w-8 h-8 mx-auto mb-3 ${quickResult === 'win' ? 'text-green-600' : 'text-gray-400'}`}
              />
              <span className="block font-semibold text-gray-900">勝ち</span>
            </button>
            <button
              onClick={() => setQuickResult('loss')}
              className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                quickResult === 'loss'
                  ? 'border-red-500 bg-red-50 shadow-lg shadow-red-500/20'
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
              }`}
            >
              <XCircle
                className={`w-8 h-8 mx-auto mb-3 ${quickResult === 'loss' ? 'text-red-600' : 'text-gray-400'}`}
              />
              <span className="block font-semibold text-gray-900">負け</span>
            </button>
          </div>

          {quickResult && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <input
                type="number"
                placeholder="金額を入力 (例: 15000)"
                value={quickAmount}
                onChange={(e) => setQuickAmount(e.target.value)}
                className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <button
                onClick={handleQuickTrade}
                disabled={!quickAmount}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/25"
              >
                記録する
              </button>
            </div>
          )}
        </div>

        <div className="mt-6 text-center">
          <button className="text-sm text-gray-600 hover:text-blue-600 font-medium transition-colors">
            詳細な記録を入力する →
          </button>
        </div>
      </div>

      {/* 統計カード */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard
          icon={DollarSign}
          iconColor="text-green-600"
          iconBg="bg-green-100"
          title="現在の残高"
          value={`¥${mockData.currentBalance.toLocaleString()}`}
          subtitle="Phase 3 (¥1M - ¥5M)"
        />
        <StatCard
          icon={TrendingUp}
          iconColor="text-blue-600"
          iconBg="bg-blue-100"
          title="週間損益"
          value={`+¥${mockData.weeklyProfit.toLocaleString()}`}
          subtitle={`勝率 ${mockData.winRate}%`}
          positive
        />
        <StatCard
          icon={Calendar}
          iconColor="text-purple-600"
          iconBg="bg-purple-100"
          title="月間損益"
          value={`+¥${mockData.monthlyProfit.toLocaleString()}`}
          subtitle={`${mockData.tradingDays}日間取引`}
          positive
        />
        <StatCard
          icon={Activity}
          iconColor="text-orange-600"
          iconBg="bg-orange-100"
          title="連続記録"
          value={`${mockData.streakDays}日`}
          subtitle="継続は力なり"
        />
      </div>

      {/* 進捗トラッカー */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 lg:p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">目標達成まで</h2>
          <Target className="w-6 h-6 text-gray-400" />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">次の目標: ¥5,000,000</span>
            <span className="font-semibold text-gray-900">25.0%</span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-1000 ease-out"
              style={{ width: '25%' }}
            />
          </div>

          <div className="flex justify-between text-sm text-gray-500">
            <span>残り ¥3,750,000</span>
            <span>Phase 3 → 4</span>
          </div>
        </div>
      </div>

      {/* 最近のアクティビティ */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 lg:p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            最近のアクティビティ
          </h2>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
            すべて見る →
          </button>
        </div>

        <div className="space-y-4">
          {mockData.recentEntries.map((entry) => (
            <div
              key={entry.id}
              className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-3 h-3 rounded-full ${
                    entry.profit > 0 ? 'bg-green-500' : 'bg-red-500'
                  }`}
                />
                <div>
                  <p className="font-medium text-gray-900">
                    {new Date(entry.date).toLocaleDateString('ja-JP')}
                  </p>
                  <p className="text-sm text-gray-500">{entry.notes}</p>
                </div>
              </div>
              <p
                className={`font-semibold ${
                  entry.profit > 0 ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {entry.profit > 0 ? '+' : ''}¥
                {Math.abs(entry.profit).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  iconColor,
  iconBg,
  title,
  value,
  subtitle,
  positive = false,
}: {
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
  title: string;
  value: string;
  subtitle: string;
  positive?: boolean;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl ${iconBg}`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
        <span className="text-xs text-gray-500 font-medium">{title}</span>
      </div>
      <p
        className={`text-2xl font-bold mb-1 ${positive ? 'text-green-600' : 'text-gray-900'}`}
      >
        {value}
      </p>
      <p className="text-sm text-gray-600">{subtitle}</p>
    </div>
  );
}
