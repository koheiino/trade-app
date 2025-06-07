'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  User,
  DollarSign,
  Shield,
  Bell,
  Trash2,
  Save,
  AlertTriangle,
  Check,
  X,
  Globe,
  Palette,
  UserCircle,
  Mail,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import type { UserStats } from '@/lib/supabase';

// 通貨ペアのオプション
const CURRENCY_PAIRS = [
  'USD/JPY',
  'EUR/JPY',
  'GBP/JPY',
  'AUD/JPY',
  'EUR/USD',
  'GBP/USD',
  'AUD/USD',
];

// タイムゾーンのオプション
const TIMEZONES = [
  { value: 'Asia/Tokyo', label: '東京 (GMT+9)' },
  { value: 'America/New_York', label: 'ニューヨーク (GMT-5)' },
  { value: 'Europe/London', label: 'ロンドン (GMT+0)' },
  { value: 'Australia/Sydney', label: 'シドニー (GMT+11)' },
];

export default function SettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<
    'profile' | 'trading' | 'app' | 'danger'
  >('profile');
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  // プロフィール設定
  const [profileSettings, setProfileSettings] = useState({
    email: '',
    displayName: '',
    avatarUrl: '',
  });

  // トレード設定
  const [tradingSettings, setTradingSettings] = useState({
    defaultStartAmount: 5000,
    currencyPair: 'USD/JPY',
    defaultLotSize: 0.01,
    riskPercentage: 5,
  });

  // アプリ設定
  const [appSettings, setAppSettings] = useState({
    timezone: 'Asia/Tokyo',
    theme: 'light',
    language: 'ja',
    enableEmailNotifications: true,
    enableDailyReminder: false,
    reminderTime: '09:00',
  });

  // アカウント削除モーダル
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');

  useEffect(() => {
    loadUserSettings();
  }, []);

  const loadUserSettings = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }
      setUser(user);

      // ユーザー統計を取得
      const { data: stats } = await supabase
        .from('user_stats')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (stats) {
        setUserStats(stats);

        // プロフィール設定
        setProfileSettings({
          email: stats.email || user.email || '',
          displayName: stats.display_name || '',
          avatarUrl: stats.avatar_url || '',
        });

        // トレード設定
        setTradingSettings({
          defaultStartAmount: stats.settings?.defaultStartAmount || 5000,
          currencyPair: stats.currency_pair || 'USD/JPY',
          defaultLotSize: Number(stats.default_lot_size) || 0.01,
          riskPercentage: stats.settings?.riskPercentage || 5,
        });

        // アプリ設定
        setAppSettings({
          timezone: stats.timezone || 'Asia/Tokyo',
          theme: stats.theme || 'light',
          language: stats.language || 'ja',
          enableEmailNotifications:
            stats.settings?.enableEmailNotifications ?? true,
          enableDailyReminder: stats.settings?.enableDailyReminder ?? false,
          reminderTime: stats.settings?.reminderTime || '09:00',
        });
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSettings = async () => {
    if (!user) return;

    setSaving(true);
    setMessage(null);

    try {
      // user_statsテーブルを更新
      const { error } = await supabase
        .from('user_stats')
        .update({
          email: profileSettings.email,
          display_name: profileSettings.displayName,
          avatar_url: profileSettings.avatarUrl,
          timezone: appSettings.timezone,
          currency_pair: tradingSettings.currencyPair,
          default_lot_size: tradingSettings.defaultLotSize,
          theme: appSettings.theme,
          language: appSettings.language,
          settings: {
            defaultStartAmount: tradingSettings.defaultStartAmount,
            riskPercentage: tradingSettings.riskPercentage,
            enableEmailNotifications: appSettings.enableEmailNotifications,
            enableDailyReminder: appSettings.enableDailyReminder,
            reminderTime: appSettings.reminderTime,
          },
        })
        .eq('user_id', user.id);

      if (error) throw error;

      setMessage({ type: 'success', text: '設定を保存しました' });

      // 3秒後にメッセージを消す
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error('Error saving settings:', error);
      setMessage({ type: 'error', text: '設定の保存に失敗しました' });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!user || deleteConfirmation !== 'DELETE') return;

    try {
      // まず関連データを削除
      await supabase.from('trades').delete().eq('user_id', user.id);
      await supabase.from('daily_entries').delete().eq('user_id', user.id);
      await supabase.from('user_stats').delete().eq('user_id', user.id);

      // アカウントを削除
      await supabase.auth.signOut();
      router.push('/');
    } catch (error) {
      console.error('Error deleting account:', error);
      setMessage({ type: 'error', text: 'アカウントの削除に失敗しました' });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neutral-900" />
      </div>
    );
  }

  const tabs = [
    { id: 'profile', label: 'プロフィール', icon: UserCircle },
    { id: 'trading', label: 'トレード設定', icon: DollarSign },
    { id: 'app', label: 'アプリ設定', icon: Palette },
    { id: 'danger', label: '危険ゾーン', icon: Shield },
  ] as const;

  return (
    <div className="max-w-4xl space-y-6">
      {/* ヘッダー */}
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">設定</h1>
        <p className="text-neutral-600 mt-1">
          アカウントとアプリケーションの設定を管理します
        </p>
      </div>

      {/* メッセージ表示 */}
      {message && (
        <div
          className={`p-4 rounded-lg flex items-center gap-3 ${
            message.type === 'success'
              ? 'bg-green-50 text-green-700 border border-green-200'
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}
        >
          {message.type === 'success' ? (
            <Check className="w-5 h-5" />
          ) : (
            <AlertTriangle className="w-5 h-5" />
          )}
          <p>{message.text}</p>
        </div>
      )}

      {/* タブナビゲーション */}
      <div className="border-b border-neutral-200">
        <div className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              type="button"
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 pb-3 px-1 border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-neutral-900 text-neutral-900'
                  : 'border-transparent text-neutral-500 hover:text-neutral-700'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* プロフィール設定 */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
          <div className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-neutral-700 mb-2"
              >
                メールアドレス
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-neutral-400" />
                <input
                  id="email"
                  type="email"
                  value={profileSettings.email}
                  onChange={(e) =>
                    setProfileSettings({
                      ...profileSettings,
                      email: e.target.value,
                    })
                  }
                  className="w-full pl-10 pr-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                  disabled
                />
              </div>
              <p className="text-xs text-neutral-500 mt-1">
                メールアドレスは変更できません
              </p>
            </div>

            <div>
              <label
                htmlFor="displayName"
                className="block text-sm font-medium text-neutral-700 mb-2"
              >
                表示名
              </label>
              <input
                id="displayName"
                type="text"
                value={profileSettings.displayName}
                onChange={(e) =>
                  setProfileSettings({
                    ...profileSettings,
                    displayName: e.target.value,
                  })
                }
                placeholder="あなたの名前"
                className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
              />
            </div>

            <div>
              <label
                htmlFor="avatarUrl"
                className="block text-sm font-medium text-neutral-700 mb-2"
              >
                プロフィール画像URL
              </label>
              <input
                id="avatarUrl"
                type="url"
                value={profileSettings.avatarUrl}
                onChange={(e) =>
                  setProfileSettings({
                    ...profileSettings,
                    avatarUrl: e.target.value,
                  })
                }
                placeholder="https://example.com/avatar.jpg"
                className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
              />
            </div>
          </div>
        </div>
      )}

      {/* トレード設定 */}
      {activeTab === 'trading' && (
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
          <div className="space-y-6">
            <div>
              <label
                htmlFor="defaultStartAmount"
                className="block text-sm font-medium text-neutral-700 mb-2"
              >
                デフォルト開始金額
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-neutral-500">
                  ¥
                </span>
                <input
                  id="defaultStartAmount"
                  type="number"
                  value={tradingSettings.defaultStartAmount}
                  onChange={(e) =>
                    setTradingSettings({
                      ...tradingSettings,
                      defaultStartAmount: Number(e.target.value),
                    })
                  }
                  className="w-full pl-8 pr-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="currencyPair"
                className="block text-sm font-medium text-neutral-700 mb-2"
              >
                デフォルト通貨ペア
              </label>
              <select
                id="currencyPair"
                value={tradingSettings.currencyPair}
                onChange={(e) =>
                  setTradingSettings({
                    ...tradingSettings,
                    currencyPair: e.target.value,
                  })
                }
                className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
              >
                {CURRENCY_PAIRS.map((pair) => (
                  <option key={pair} value={pair}>
                    {pair}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="defaultLotSize"
                className="block text-sm font-medium text-neutral-700 mb-2"
              >
                デフォルトロット数
              </label>
              <input
                id="defaultLotSize"
                type="number"
                value={tradingSettings.defaultLotSize}
                onChange={(e) =>
                  setTradingSettings({
                    ...tradingSettings,
                    defaultLotSize: Number(e.target.value),
                  })
                }
                step="0.01"
                min="0.01"
                className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
              />
            </div>

            <div>
              <label
                htmlFor="riskPercentage"
                className="block text-sm font-medium text-neutral-700 mb-2"
              >
                リスク許容度
              </label>
              <div className="relative">
                <input
                  id="riskPercentage"
                  type="number"
                  value={tradingSettings.riskPercentage}
                  onChange={(e) =>
                    setTradingSettings({
                      ...tradingSettings,
                      riskPercentage: Number(e.target.value),
                    })
                  }
                  min="1"
                  max="10"
                  className="w-full pr-8 px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                />
                <span className="absolute right-3 top-3 text-neutral-500">
                  %
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* アプリ設定 */}
      {activeTab === 'app' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5" />
              地域と言語
            </h3>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="timezone"
                  className="block text-sm font-medium text-neutral-700 mb-2"
                >
                  タイムゾーン
                </label>
                <select
                  id="timezone"
                  value={appSettings.timezone}
                  onChange={(e) =>
                    setAppSettings({ ...appSettings, timezone: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                >
                  {TIMEZONES.map((tz) => (
                    <option key={tz.value} value={tz.value}>
                      {tz.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="language"
                  className="block text-sm font-medium text-neutral-700 mb-2"
                >
                  言語
                </label>
                <select
                  id="language"
                  value={appSettings.language}
                  onChange={(e) =>
                    setAppSettings({ ...appSettings, language: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                  disabled
                >
                  <option value="ja">日本語</option>
                  <option value="en">English</option>
                </select>
                <p className="text-xs text-neutral-500 mt-1">
                  現在は日本語のみ対応しています
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Bell className="w-5 h-5" />
              通知設定
            </h3>
            <div className="space-y-4">
              <label className="flex items-center justify-between p-3 rounded-lg hover:bg-neutral-50 cursor-pointer">
                <div>
                  <p className="font-medium text-neutral-900">メール通知</p>
                  <p className="text-sm text-neutral-500">
                    重要な更新やレポートを受け取る
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={appSettings.enableEmailNotifications}
                  onChange={(e) =>
                    setAppSettings({
                      ...appSettings,
                      enableEmailNotifications: e.target.checked,
                    })
                  }
                  className="w-5 h-5 accent-neutral-900"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-lg hover:bg-neutral-50 cursor-pointer">
                <div>
                  <p className="font-medium text-neutral-900">
                    デイリーリマインダー
                  </p>
                  <p className="text-sm text-neutral-500">
                    毎日の記録を忘れないように通知
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={appSettings.enableDailyReminder}
                  onChange={(e) =>
                    setAppSettings({
                      ...appSettings,
                      enableDailyReminder: e.target.checked,
                    })
                  }
                  className="w-5 h-5 accent-neutral-900"
                />
              </label>

              {appSettings.enableDailyReminder && (
                <div className="ml-4">
                  <label
                    htmlFor="reminderTime"
                    className="block text-sm font-medium text-neutral-700 mb-2"
                  >
                    リマインダー時刻
                  </label>
                  <input
                    id="reminderTime"
                    type="time"
                    value={appSettings.reminderTime}
                    onChange={(e) =>
                      setAppSettings({
                        ...appSettings,
                        reminderTime: e.target.value,
                      })
                    }
                    className="px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 危険ゾーン */}
      {activeTab === 'danger' && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-5 h-5 text-red-600" />
            <h2 className="text-lg font-bold text-red-900">危険ゾーン</h2>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-red-900 mb-2">
                アカウントを削除
              </h3>
              <p className="text-sm text-red-700 mb-4">
                この操作は取り消すことができません。すべてのデータが永久に削除されます。
              </p>
              <button
                type="button"
                onClick={() => setShowDeleteModal(true)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                アカウントを削除
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 保存ボタン */}
      {activeTab !== 'danger' && (
        <button
          type="button"
          onClick={handleSaveSettings}
          disabled={saving}
          className="w-full py-3 bg-neutral-900 text-white font-medium rounded-lg hover:bg-neutral-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {saving ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
          ) : (
            <>
              <Save className="w-5 h-5" />
              設定を保存
            </>
          )}
        </button>
      )}

      {/* 削除確認モーダル */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-bold">アカウントを削除しますか？</h3>
            </div>

            <p className="text-neutral-600 mb-4">
              この操作は取り消すことができません。すべてのトレード記録、統計データ、設定が永久に削除されます。
            </p>

            <div className="mb-6">
              <label
                htmlFor="confirmDelete"
                className="block text-sm font-medium text-neutral-700 mb-2"
              >
                確認のため「DELETE」と入力してください
              </label>
              <input
                id="confirmDelete"
                type="text"
                value={deleteConfirmation}
                onChange={(e) => setDeleteConfirmation(e.target.value)}
                placeholder="DELETE"
                className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteConfirmation('');
                }}
                className="flex-1 py-2 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors"
              >
                キャンセル
              </button>
              <button
                type="submit"
                onClick={handleDeleteAccount}
                disabled={deleteConfirmation !== 'DELETE'}
                className="flex-1 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                削除する
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
