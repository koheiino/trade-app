// // 'use client';

// // import { useState, useEffect } from 'react';
// // import { useRouter, usePathname } from 'next/navigation';
// // import Link from 'next/link';
// // import {
// //   LayoutDashboard,
// //   TrendingUp,
// //   BarChart3,
// //   Settings,
// //   Menu,
// //   X,
// //   LogOut,
// //   ChevronRight,
// // } from 'lucide-react';
// // import { supabase } from '@/lib/supabase';
// // import type { User } from '@supabase/supabase-js';

// // const navigation = [
// //   { name: 'ダッシュボード', href: '/', icon: LayoutDashboard },
// //   { name: 'トレード記録', href: '/records', icon: TrendingUp },
// //   { name: '分析', href: '/analytics', icon: BarChart3 },
// //   { name: '設定', href: '/settings', icon: Settings },
// // ];

// // interface UserStats {
// //   totalTrades: number;
// //   totalProfit: number;
// //   winRate: number;
// // }

// // interface SidebarProps {
// //   user: User;
// //   userStats?: UserStats | null;
// //   pathname: string;
// //   onLogout: () => void;
// //   onClose?: () => void;
// // }

// // function Sidebar({ user, pathname, onLogout, onClose }: SidebarProps) {
// //   return (
// //     <div className="h-full bg-white border-r border-neutral-200 flex flex-col">
// //       {/* ロゴ */}
// //       <div className="flex items-center justify-between p-4 border-b border-neutral-200">
// //         <h1 className="text-xl font-bold text-neutral-900">FX Trading</h1>
// //         {onClose && (
// //           <button
// //             type="button"
// //             onClick={onClose}
// //             className="lg:hidden p-2 rounded-lg hover:bg-neutral-100 transition-colors"
// //           >
// //             <X className="w-5 h-5 text-neutral-700" />
// //           </button>
// //         )}
// //       </div>

// //       {/* ナビゲーション */}
// //       <nav className="flex-1 p-4 space-y-1">
// //         {navigation.map((item) => {
// //           const isActive = pathname === item.href;
// //           return (
// //             <Link
// //               key={item.name}
// //               href={item.href}
// //               onClick={onClose}
// //               className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
// //                 isActive
// //                   ? 'bg-neutral-900 text-white'
// //                   : 'text-neutral-700 hover:bg-neutral-100'
// //               }`}
// //             >
// //               <item.icon className="w-5 h-5" />
// //               <span className="font-medium">{item.name}</span>
// //               {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
// //             </Link>
// //           );
// //         })}
// //       </nav>

// //       {/* ユーザー情報 */}
// //       <div className="p-4 border-t border-neutral-200">
// //         <div className="flex items-center gap-3 mb-3">
// //           <div className="w-10 h-10 bg-neutral-200 rounded-full flex items-center justify-center">
// //             <span className="text-sm font-medium text-neutral-700">
// //               {user.email?.[0]?.toUpperCase()}
// //             </span>
// //           </div>
// //           <div className="flex-1 min-w-0">
// //             <p className="text-sm font-medium text-neutral-900 truncate">
// //               {user.email}
// //             </p>
// //           </div>
// //         </div>
// //         <button
// //           type="button"
// //           onClick={onLogout}
// //           className="flex items-center gap-2 w-full px-3 py-2 text-sm text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
// //         >
// //           <LogOut className="w-4 h-4" />
// //           ログアウト
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }

// // export default function DashboardLayout({
// //   children,
// // }: {
// //   children: React.ReactNode;
// // }) {
// //   const [user, setUser] = useState<User | null>(null);
// //   const [sidebarOpen, setSidebarOpen] = useState(false);
// //   const [loading, setLoading] = useState(true);
// //   const router = useRouter();
// //   const pathname = usePathname();

// //   useEffect(() => {
// //     supabase.auth.getSession().then(({ data: { session } }) => {
// //       if (!session) {
// //         router.push('/login');
// //       } else {
// //         setUser(session.user);
// //       }
// //       setLoading(false);
// //     });

// //     const {
// //       data: { subscription },
// //     } = supabase.auth.onAuthStateChange((_event, session) => {
// //       if (!session) {
// //         router.push('/login');
// //       } else {
// //         setUser(session.user);
// //       }
// //     });

// //     return () => subscription.unsubscribe();
// //   }, [router]);

// //   const handleLogout = async () => {
// //     await supabase.auth.signOut();
// //     router.push('/login');
// //   };

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center bg-neutral-50">
// //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neutral-900" />
// //       </div>
// //     );
// //   }

// //   if (!user) {
// //     return null;
// //   }

// //   return (
// //     <div className="min-h-screen bg-neutral-50">
// //       {/* モバイルサイドバー */}
// //       <div
// //         className={`fixed inset-0 z-50 lg:hidden ${
// //           sidebarOpen ? 'block' : 'hidden'
// //         }`}
// //       >
// //         <div
// //           className="fixed inset-0 bg-neutral-900/50"
// //           onClick={() => setSidebarOpen(false)}
// //           tabIndex={0}
// //           role="button"
// //           aria-label="サイドバーを閉じる"
// //           onKeyDown={(e) => {
// //             if (e.key === 'Enter' || e.key === ' ') {
// //               setSidebarOpen(false);
// //             }
// //           }}
// //         />
// //         <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl">
// //           <Sidebar
// //             user={user}
// //             pathname={pathname}
// //             onLogout={handleLogout}
// //             onClose={() => setSidebarOpen(false)}
// //           />
// //         </div>
// //       </div>

// //       {/* デスクトップサイドバー */}
// //       <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:w-64 lg:block">
// //         <Sidebar user={user} pathname={pathname} onLogout={handleLogout} />
// //       </div>

// //       {/* メインコンテンツ */}
// //       <div className="lg:pl-64">
// //         {/* モバイルヘッダー */}
// //         <div className="sticky top-0 z-40 lg:hidden bg-white border-b border-neutral-200">
// //           <div className="flex items-center justify-between px-4 py-3">
// //             <h1 className="text-lg font-semibold text-neutral-900">
// //               FX Trading Diary
// //             </h1>
// //             <button
// //               type="button"
// //               onClick={() => setSidebarOpen(true)}
// //               className="p-2 rounded-lg hover:bg-neutral-100 transition-colors"
// //             >
// //               <Menu className="w-5 h-5 text-neutral-700" />
// //             </button>
// //           </div>
// //         </div>

// //         {/* ページコンテンツ */}
// //         <main className="py-6 px-4 sm:px-6 lg:px-8">{children}</main>
// //       </div>
// //     </div>
// //   );
// // }

// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter, usePathname } from 'next/navigation';
// import Link from 'next/link';
// import {
//   LayoutDashboard,
//   TrendingUp,
//   BarChart3,
//   Settings,
//   Menu,
//   X,
//   LogOut,
//   ChevronRight,
// } from 'lucide-react';
// import { supabase } from '@/lib/supabase';
// import type { User } from '@supabase/supabase-js';
// // import Sidebar from '@/components/layout/Sidebar';

// const navigation = [
//   { name: 'ダッシュボード', href: '/', icon: LayoutDashboard },
//   { name: 'トレード記録', href: '/records', icon: TrendingUp },
//   { name: '分析', href: '/analytics', icon: BarChart3 },
//   { name: '設定', href: '/settings', icon: Settings },
// ];

// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [user, setUser] = useState<User | null>(null);
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();
//   const pathname = usePathname();

//   useEffect(() => {
//     supabase.auth.getSession().then(({ data: { session } }) => {
//       if (!session) {
//         router.push('/login');
//       } else {
//         setUser(session.user);
//       }
//       setLoading(false);
//     });

//     const {
//       data: { subscription },
//     } = supabase.auth.onAuthStateChange((_event, session) => {
//       if (!session) {
//         router.push('/login');
//       } else {
//         setUser(session.user);
//       }
//     });

//     return () => subscription.unsubscribe();
//   }, [router]);

//   const handleLogout = async () => {
//     await supabase.auth.signOut();
//     router.push('/login');
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-neutral-50">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neutral-900" />
//       </div>
//     );
//   }

//   if (!user) {
//     return null;
//   }

//   return (
//     <div className="min-h-screen bg-neutral-50">
//       {/* モバイルサイドバー */}
//       <div
//         className={`fixed inset-0 z-50 lg:hidden ${
//           sidebarOpen ? 'block' : 'hidden'
//         }`}
//       >
//         <div
//           className="fixed inset-0 bg-neutral-900/50"
//           onClick={() => setSidebarOpen(false)}
//           tabIndex={0}
//           role="button"
//           aria-label="サイドバーを閉じる"
//           onKeyDown={(e) => {
//             if (e.key === 'Enter' || e.key === ' ') {
//               setSidebarOpen(false);
//             }
//           }}
//         />
//         <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl">
//           <Sidebar
//             user={user}
//             pathname={pathname}
//             onLogout={handleLogout}
//             onClose={() => setSidebarOpen(false)}
//           />
//         </div>
//       </div>

//       {/* デスクトップサイドバー */}
//       <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:w-64 lg:block">
//         <Sidebar user={user} pathname={pathname} onLogout={handleLogout} />
//       </div>

//       {/* メインコンテンツ */}
//       <div className="lg:pl-64">
//         {/* モバイルヘッダー */}
//         <div className="sticky top-0 z-40 lg:hidden bg-white border-b border-neutral-200">
//           <div className="flex items-center justify-between px-4 py-3">
//             <h1 className="text-lg font-semibold text-neutral-900">
//               FX Trading Diary
//             </h1>
//             <button
//               type="button"
//               onClick={() => setSidebarOpen(true)}
//               className="p-2 rounded-lg hover:bg-neutral-100 transition-colors"
//             >
//               <Menu className="w-5 h-5 text-neutral-700" />
//             </button>
//           </div>
//         </div>

//         {/* ページコンテンツ */}
//         <main className="py-6 px-4 sm:px-6 lg:px-8">{children}</main>
//       </div>
//     </div>
//   );
// }

// interface SidebarProps {
//   user: User;
//   userStats?: unknown;
//   pathname: string;
//   onLogout: () => void;
//   onClose?: () => void;
// }

// function Sidebar({ user, pathname, onLogout, onClose }: SidebarProps) {
//   return (
//     <div className="h-full bg-white border-r border-neutral-200 flex flex-col">
//       {/* ロゴ */}
//       <div className="flex items-center justify-between p-4 border-b border-neutral-200">
//         <h1 className="text-xl font-bold text-neutral-900">FX Trading</h1>
//         {onClose && (
//           <button
//             type="button"
//             onClick={onClose}
//             className="lg:hidden p-2 rounded-lg hover:bg-neutral-100 transition-colors"
//           >
//             <X className="w-5 h-5 text-neutral-700" />
//           </button>
//         )}
//       </div>

//       {/* ナビゲーション */}
//       <nav className="flex-1 p-4 space-y-1">
//         {navigation.map((item) => {
//           const isActive = pathname === item.href;
//           return (
//             <Link
//               key={item.name}
//               href={item.href}
//               onClick={onClose}
//               className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
//                 isActive
//                   ? 'bg-neutral-900 text-white'
//                   : 'text-neutral-700 hover:bg-neutral-100'
//               }`}
//             >
//               <item.icon className="w-5 h-5" />
//               <span className="font-medium">{item.name}</span>
//               {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
//             </Link>
//           );
//         })}
//       </nav>

//       {/* ユーザー情報 */}
//       <div className="p-4 border-t border-neutral-200">
//         <div className="flex items-center gap-3 mb-3">
//           <div className="w-10 h-10 bg-neutral-200 rounded-full flex items-center justify-center">
//             <span className="text-sm font-medium text-neutral-700">
//               {user.email?.[0]?.toUpperCase()}
//             </span>
//           </div>
//           <div className="flex-1 min-w-0">
//             <p className="text-sm font-medium text-neutral-900 truncate">
//               {user.email}
//             </p>
//           </div>
//         </div>
//         <button
//           type="button"
//           onClick={onLogout}
//           className="flex items-center gap-2 w-full px-3 py-2 text-sm text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
//         >
//           <LogOut className="w-4 h-4" />
//           ログアウト
//         </button>
//       </div>
//     </div>
//   );
// }
'use client';

import { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Calendar,
  Target,
  Award,
  Activity,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Flame, // Fire → Flame に変更
  Star
} from 'lucide-react';
import type { DashboardData } from '@/types/dashboard';

interface DashboardContentProps {
  data?: DashboardData; // オプショナルにして安全性を向上
}

// デフォルトデータ
const defaultData: DashboardData = {
  currentBalance: 0,
  weeklyProfit: 0,
  monthlyProfit: 0,
  streakDays: 0,
  winRate: 0,
  tradingDays: 0,
  recentEntries: [],
};

export default function DashboardContent({ data }: DashboardContentProps) {
  const [animationDelay, setAnimationDelay] = useState(0);
  const [isLoading, setIsLoading] = useState(!data);

  // データが存在しない場合はデフォルトデータを使用
  const safeData = data || defaultData;

  useEffect(() => {
    setAnimationDelay(100);
    if (data) {
      setIsLoading(false);
    }
  }, [data]);

  // ローディング状態の表示
  if (isLoading) {
    return (
      <div className="space-y-8">
        {/* ローディングスケルトン */}
        <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-3xl p-8 animate-pulse">
          <div className="h-8 bg-white/20 rounded mb-4 w-1/3"></div>
          <div className="h-4 bg-white/20 rounded mb-6 w-1/2"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white/10 rounded-xl p-4">
                <div className="w-6 h-6 bg-white/20 rounded mb-2"></div>
                <div className="h-3 bg-white/20 rounded mb-1"></div>
                <div className="h-4 bg-white/20 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl p-6 animate-pulse">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
                <div className="w-16 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const stats = [
    {
      name: '現在の残高',
      value: `¥${safeData.currentBalance.toLocaleString()}`,
      change: '+12.5%',
      changeType: 'positive' as const,
      icon: DollarSign,
      color: 'from-emerald-500 to-green-600',
      description: '前月比',
    },
    {
      name: '今週の利益',
      value: `¥${safeData.weeklyProfit.toLocaleString()}`,
      change: '+8.2%',
      changeType: 'positive' as const,
      icon: TrendingUp,
      color: 'from-blue-500 to-cyan-600',
      description: '先週比',
    },
    {
      name: '今月の利益',
      value: `¥${safeData.monthlyProfit.toLocaleString()}`,
      change: '+15.7%',
      changeType: 'positive' as const,
      icon: BarChart3,
      color: 'from-purple-500 to-indigo-600',
      description: '先月比',
    },
    {
      name: '勝率',
      value: `${safeData.winRate.toFixed(1)}%`,
      change: '+2.1%',
      changeType: 'positive' as const,
      icon: Target,
      color: 'from-orange-500 to-red-600',
      description: '今月平均',
    },
  ];

  const achievements = [
    { icon: Flame, label: '連続記録', value: `${safeData.streakDays}日`, color: 'text-red-500' },
    { icon: Star, label: 'トレード日数', value: `${safeData.tradingDays}日`, color: 'text-yellow-500' },
    { icon: Award, label: '最高利益', value: '¥52,000', color: 'text-purple-500' },
    { icon: Zap, label: '今月の目標達成', value: '85%', color: 'text-blue-500' },
  ];

  return (
    <div className="space-y-8">
      {/* ウェルカムセクション */}
      <div 
        className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-3xl p-8 text-white"
        style={{ 
          animationDelay: `${animationDelay}ms`,
          animation: 'fadeInUp 0.6s ease-out forwards'
        }}
      >
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">おかえりなさい！</h1>
              <p className="text-blue-100 text-lg">
                今日も素晴らしいトレードを始めましょう
              </p>
            </div>
            <div className="hidden md:block">
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                <TrendingUp className="w-10 h-10 text-white" />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {achievements.map((achievement, index) => (
              <div 
                key={achievement.label}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 transition-transform duration-300 hover:scale-105"
                style={{ 
                  animationDelay: `${animationDelay + (index * 100)}ms`,
                  animation: 'fadeInUp 0.6s ease-out forwards'
                }}
              >
                <achievement.icon className={`w-6 h-6 ${achievement.color} mb-2`} />
                <p className="text-white/80 text-sm">{achievement.label}</p>
                <p className="text-white font-bold text-lg">{achievement.value}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* 背景装飾 */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-white/5 to-transparent rounded-full -translate-y-48 translate-x-48"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-white/5 to-transparent rounded-full translate-y-32 -translate-x-32"></div>
      </div>

      {/* 統計カード */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={stat.name}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group"
            style={{ 
              animationDelay: `${animationDelay + 200 + (index * 100)}ms`,
              animation: 'fadeInUp 0.6s ease-out forwards'
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className={`flex items-center text-sm font-medium ${
                stat.changeType === 'positive' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
              }`}>
                {stat.changeType === 'positive' ? (
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 mr-1" />
                )}
                {stat.change}
              </div>
            </div>
            
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                {stat.value}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {stat.name} • {stat.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 最近のアクティビティとクイックアクション */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* 最近のアクティビティ */}
        <div 
          className="xl:col-span-2 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
          style={{ 
            animationDelay: `${animationDelay + 600}ms`,
            animation: 'fadeInUp 0.6s ease-out forwards'
          }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              最近のトレード
            </h2>
            <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors duration-200 hover:scale-105 transform">
              すべて見る →
            </button>
          </div>

          <div className="space-y-4">
            {safeData.recentEntries.length > 0 ? (
              safeData.recentEntries.map((entry, index) => (
                <div
                  key={entry.id}
                  className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200 group cursor-pointer"
                  style={{ 
                    animationDelay: `${animationDelay + 700 + (index * 100)}ms`,
                    animation: 'fadeInUp 0.6s ease-out forwards'
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      entry.profit > 0 
                        ? 'bg-green-100 dark:bg-green-900/20' 
                        : 'bg-red-100 dark:bg-red-900/20'
                    } group-hover:scale-110 transition-transform duration-300`}>
                      {entry.profit > 0 ? (
                        <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
                      ) : (
                        <TrendingDown className="w-5 h-5 text-red-600 dark:text-red-400" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                        {new Date(entry.date).toLocaleDateString('ja-JP', {
                          month: 'short',
                          day: 'numeric',
                          weekday: 'short'
                        })}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {entry.notes}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold text-lg ${
                      entry.profit > 0 
                        ? 'text-green-600 dark:text-green-400' 
                        : 'text-red-600 dark:text-red-400'
                    }`}>
                      {entry.profit > 0 ? '+' : ''}¥{Math.abs(entry.profit).toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {entry.profit > 0 ? '利益' : '損失'}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Activity className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-3" />
                <p className="text-gray-500 dark:text-gray-400 font-medium">
                  まだトレード記録がありません
                </p>
                <p className="text-sm text-gray-400 dark:text-gray-500">
                  最初のトレードを記録してみましょう
                </p>
              </div>
            )}
          </div>
        </div>

        {/* クイックアクション */}
        <div 
          className="space-y-6"
          style={{ 
            animationDelay: `${animationDelay + 800}ms`,
            animation: 'fadeInUp 0.6s ease-out forwards'
          }}
        >
          {/* 今日のトレード */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              今日のトレード
            </h3>
            <div className="space-y-4">
              <button className="w-full p-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
                <div className="flex items-center justify-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  <span className="font-medium">勝ちトレード記録</span>
                </div>
              </button>
              <button className="w-full p-4 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-xl hover:from-red-600 hover:to-rose-700 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
                <div className="flex items-center justify-center gap-2">
                  <TrendingDown className="w-5 h-5" />
                  <span className="font-medium">負けトレード記録</span>
                </div>
              </button>
            </div>
          </div>

          {/* 今日の目標 */}
          <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl p-6 text-white">
            <h3 className="text-lg font-bold mb-4">今日の目標</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-purple-100">利益目標</span>
                <span className="font-bold">¥15,000</span>
              </div>
              <div className="w-full bg-purple-400/30 rounded-full h-2">
                <div className="bg-white h-2 rounded-full w-3/4 transition-all duration-1000"></div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-purple-100">進捗: 75%</span>
                <span className="font-medium">¥11,250</span>
              </div>
            </div>
          </div>

          {/* マーケット状況 */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              マーケット状況
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">USD/JPY</span>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900 dark:text-white">150.25</span>
                  <span className="text-green-600 dark:text-green-400 text-sm">+0.15%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">EUR/USD</span>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900 dark:text-white">1.0875</span>
                  <span className="text-red-600 dark:text-red-400 text-sm">-0.08%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">GBP/JPY</span>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900 dark:text-white">185.42</span>
                  <span className="text-green-600 dark:text-green-400 text-sm">+0.22%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* パフォーマンスチャート（プレースホルダー） */}
      <div 
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
        style={{ 
          animationDelay: `${animationDelay + 900}ms`,
          animation: 'fadeInUp 0.6s ease-out forwards'
        }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            パフォーマンス推移
          </h2>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors duration-200">
              7日
            </button>
            <button className="px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200">
              30日
            </button>
            <button className="px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200">
              90日
            </button>
          </div>
        </div>
        
        {/* チャートプレースホルダー */}
        <div className="h-64 bg-gray-50 dark:bg-gray-700/50 rounded-xl flex items-center justify-center">
          <div className="text-center">
            <Activity className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-3" />
            <p className="text-gray-500 dark:text-gray-400 font-medium">
              パフォーマンスチャート
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500">
              実装予定
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
