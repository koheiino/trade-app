'use client';

import Link from 'next/link';
import { X, LogOut, ChevronRight } from 'lucide-react';
import type { User } from '@supabase/supabase-js';
import type { NavigationItem } from '@/types/dashboard';

interface SidebarProps {
  user: User;
  pathname: string;
  onLogout: () => void;
  onClose?: () => void;
  navigationItems: NavigationItem[];
}

export default function Sidebar({
  user,
  pathname,
  onLogout,
  onClose,
  navigationItems,
}: SidebarProps) {
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
            aria-label="サイドバーを閉じる"
          >
            <X className="w-5 h-5 text-neutral-700" />
          </button>
        )}
      </div>

      {/* ナビゲーション */}
      <nav className="flex-1 p-4 space-y-1">
        {navigationItems.map((item) => {
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
              aria-current={isActive ? 'page' : undefined}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
              {item.badge && item.badge > 0 && (
                <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                  {item.badge > 99 ? '99+' : item.badge}
                </span>
              )}
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
              {user.email?.[0]?.toUpperCase() || 'U'}
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
