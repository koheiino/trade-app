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

// const navigation = [
//   { name: 'ダッシュボード', href: '/', icon: LayoutDashboard },
//   { name: 'トレード記録', href: '/records', icon: TrendingUp },
//   { name: '分析', href: '/analytics', icon: BarChart3 },
//   { name: '設定', href: '/settings', icon: Settings },
// ];

// interface UserStats {
//   totalTrades: number;
//   totalProfit: number;
//   winRate: number;
// }

// interface SidebarProps {
//   user: User;
//   userStats?: UserStats | null;
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
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';
// import Sidebar from '@/components/layout/Sidebar';

const navigation = [
  { name: 'ダッシュボード', href: '/', icon: LayoutDashboard },
  { name: 'トレード記録', href: '/records', icon: TrendingUp },
  { name: '分析', href: '/analytics', icon: BarChart3 },
  { name: '設定', href: '/settings', icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push('/login');
      } else {
        setUser(session.user);
      }
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.push('/login');
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neutral-900" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* モバイルサイドバー */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${
          sidebarOpen ? 'block' : 'hidden'
        }`}
      >
        <div
          className="fixed inset-0 bg-neutral-900/50"
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
        <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl">
          <Sidebar
            user={user}
            pathname={pathname}
            onLogout={handleLogout}
            onClose={() => setSidebarOpen(false)}
          />
        </div>
      </div>

      {/* デスクトップサイドバー */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:w-64 lg:block">
        <Sidebar user={user} pathname={pathname} onLogout={handleLogout} />
      </div>

      {/* メインコンテンツ */}
      <div className="lg:pl-64">
        {/* モバイルヘッダー */}
        <div className="sticky top-0 z-40 lg:hidden bg-white border-b border-neutral-200">
          <div className="flex items-center justify-between px-4 py-3">
            <h1 className="text-lg font-semibold text-neutral-900">
              FX Trading Diary
            </h1>
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg hover:bg-neutral-100 transition-colors"
            >
              <Menu className="w-5 h-5 text-neutral-700" />
            </button>
          </div>
        </div>

        {/* ページコンテンツ */}
        <main className="py-6 px-4 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}

interface SidebarProps {
  user: User;
  userStats?: unknown;
  pathname: string;
  onLogout: () => void;
  onClose?: () => void;
}

function Sidebar({ user, pathname, onLogout, onClose }: SidebarProps) {
  return (
    <div className="h-full bg-white border-r border-neutral-200 flex flex-col">
      {/* ロゴ */}
      <div className="flex items-center justify-between p-4 border-b border-neutral-200">
        <h1 className="text-xl font-bold text-neutral-900">FX Trading</h1>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="lg:hidden p-2 rounded-lg hover:bg-neutral-100 transition-colors"
          >
            <X className="w-5 h-5 text-neutral-700" />
          </button>
        )}
      </div>

      {/* ナビゲーション */}
      <nav className="flex-1 p-4 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isActive
                  ? 'bg-neutral-900 text-white'
                  : 'text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
              {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
            </Link>
          );
        })}
      </nav>

      {/* ユーザー情報 */}
      <div className="p-4 border-t border-neutral-200">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-neutral-200 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-neutral-700">
              {user.email?.[0]?.toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-neutral-900 truncate">
              {user.email}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onLogout}
          className="flex items-center gap-2 w-full px-3 py-2 text-sm text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
        >
          <LogOut className="w-4 h-4" />
          ログアウト
        </button>
      </div>
    </div>
  );
}
