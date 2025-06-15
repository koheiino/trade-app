'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Calendar,
  TrendingUp,
  CheckCircle2,
  Heart,
  Plus,
  Save,
  Trash2,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';
import type { UserStats, DailyEntry, Trade } from '@/lib/supabase';

export default function RecordsPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [todayEntry, setTodayEntry] = useState({
    date: new Date().toLocaleDateString('ja-JP'),
    trades: [] as Array<{ id: string; result: number; notes: string }>,
    profit: 0,
    notes: '',
    checklist: {
      morning: false,
      analysis: false,
      rules: false,
      mental: false,
    },
  });

  useEffect(() => {
    loadTodayData();
  }, []);

  const loadTodayData = async () => {
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
        .maybeSingle();

      if (stats) {
        setUserStats(stats);
      }

      // 今日のエントリーを確認
      const today = new Date().toISOString().split('T')[0];
      const { data: todayData } = await supabase
        .from('daily_entries')
        .select('*, trades(*)')
        .eq('user_id', user.id)
        .eq('date', today)
        .maybeSingle();

      if (todayData) {
        setTodayEntry({
          date: new Date(todayData.date).toLocaleDateString('ja-JP'),
          trades: todayData.trades || [],
          profit: Number(todayData.total_profit),
          notes: todayData.notes || '',
          checklist: todayData.checklist,
        });
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const addTrade = () => {
    const newTrade = {
      id: `temp-${Date.now()}`,
      result: 0,
      notes: '',
    };
    setTodayEntry({
      ...todayEntry,
      trades: [...todayEntry.trades, newTrade],
    });
  };

  const updateTrade = (id: string, field: string, value: string | number) => {
    setTodayEntry({
      ...todayEntry,
      trades: todayEntry.trades.map((t) =>
        t.id === id ? { ...t, [field]: value } : t,
      ),
    });
  };

  const deleteTrade = (id: string) => {
    setTodayEntry({
      ...todayEntry,
      trades: todayEntry.trades.filter((t) => t.id !== id),
    });
  };

  const updateChecklist = (item: keyof typeof todayEntry.checklist) => {
    setTodayEntry({
      ...todayEntry,
      checklist: {
        ...todayEntry.checklist,
        [item]: !todayEntry.checklist[item],
      },
    });
  };

  const calculateDailyProfit = () => {
    return todayEntry.trades.reduce(
      (sum, trade) => sum + Number(trade.result),
      0,
    );
  };

  const saveDailyEntry = async () => {
    if (!user || !userStats) return;

    setSaving(true);
    try {
      const profit = calculateDailyProfit();
      const newBalance = Number(userStats.current_balance) + profit;
      const today = new Date().toISOString().split('T')[0];

      // 日次エントリーを保存または更新
      const { data: entryData, error: entryError } = await supabase
        .from('daily_entries')
        .upsert({
          user_id: user.id,
          date: today,
          total_profit: profit,
          notes: todayEntry.notes,
          checklist: todayEntry.checklist,
        })
        .select()
        .maybeSingle();

      if (entryError) throw entryError;

      // トレードを保存
      if (entryData && todayEntry.trades.length > 0) {
        // 既存のトレードを削除
        await supabase
          .from('trades')
          .delete()
          .eq('daily_entry_id', entryData.id);

        // 新しいトレードを保存
        const trades = todayEntry.trades
          .filter((t) => t.result !== 0)
          .map((t) => ({
            daily_entry_id: entryData.id,
            user_id: user.id,
            result: t.result,
            notes: t.notes,
          }));

        if (trades.length > 0) {
          const { error: tradesError } = await supabase
            .from('trades')
            .insert(trades);

          if (tradesError) throw tradesError;
        }
      }

      // ユーザー統計を更新
      const phases = [
        { phase: 1, target: 20000 },
        { phase: 2, target: 50000 },
        { phase: 3, target: 150000 },
        { phase: 4, target: 500000 },
        { phase: 5, target: 1000000 },
      ];

      const currentPhaseData = phases[userStats.current_phase - 1];
      const newPhase =
        newBalance >= currentPhaseData.target && userStats.current_phase < 5
          ? userStats.current_phase + 1
          : userStats.current_phase;

      const { error: statsError } = await supabase
        .from('user_stats')
        .update({
          current_balance: newBalance,
          current_phase: newPhase,
          streak_days: userStats.streak_days + 1,
        })
        .eq('user_id', user.id);

      if (statsError) throw statsError;

      // ダッシュボードに戻る
      router.push('/');
    } catch (error) {
      console.error('Error saving entry:', error);
      alert('保存中にエラーが発生しました');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neutral-900" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">トレード記録</h1>
          <p className="text-neutral-600 mt-1 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {todayEntry.date}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-neutral-600">現在の残高</p>
          <p className="text-2xl font-bold text-neutral-900">
            ¥{userStats?.current_balance.toLocaleString() || '0'}
          </p>
        </div>
      </div>

      {/* 今日のチェックリスト */}
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5" />
          今日のチェックリスト
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {Object.entries({
            morning: '朝のルーティン完了',
            analysis: 'チャート分析実施',
            rules: 'ルール遵守',
            mental: 'メンタル管理OK',
          }).map(([key, label]) => (
            <label
              key={key}
              className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg cursor-pointer hover:bg-neutral-100 transition-colors"
            >
              <input
                type="checkbox"
                checked={
                  todayEntry.checklist[key as keyof typeof todayEntry.checklist]
                }
                onChange={() =>
                  updateChecklist(key as keyof typeof todayEntry.checklist)
                }
                className="w-5 h-5 accent-neutral-900"
              />
              <span className="text-neutral-700">{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* トレード記録 */}
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          トレード記録
        </h2>

        <div className="space-y-4">
          {todayEntry.trades.map((trade, index) => (
            <div key={trade.id} className="p-4 bg-neutral-50 rounded-lg">
              <div className="flex items-start gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-4">
                    <span className="font-medium text-neutral-700">
                      トレード {index + 1}
                    </span>
                    <input
                      type="number"
                      placeholder="損益（円）"
                      className="flex-1 p-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                      value={trade.result}
                      onChange={(e) =>
                        updateTrade(trade.id, 'result', e.target.value)
                      }
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="メモ（パターン、反省点など）"
                    className="w-full p-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                    value={trade.notes}
                    onChange={(e) =>
                      updateTrade(trade.id, 'notes', e.target.value)
                    }
                  />
                </div>
                <button
                  type="button"
                  onClick={() => deleteTrade(trade.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addTrade}
            className="w-full py-3 bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 transition-colors font-medium flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            トレード追加
          </button>
        </div>

        {todayEntry.trades.length > 0 && (
          <div className="mt-6 p-4 bg-neutral-900 text-white rounded-lg">
            <p className="text-sm opacity-70">本日の損益</p>
            <p className="text-2xl font-bold">
              {calculateDailyProfit() >= 0 ? '+' : ''}¥
              {calculateDailyProfit().toLocaleString()}
            </p>
          </div>
        )}
      </div>

      {/* 今日の振り返り */}
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Heart className="w-5 h-5" />
          今日の振り返り
        </h2>
        <textarea
          className="w-full p-3 border border-neutral-200 rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent resize-none"
          placeholder="今日の気づき、明日への意気込みなど..."
          value={todayEntry.notes}
          onChange={(e) =>
            setTodayEntry({ ...todayEntry, notes: e.target.value })
          }
        />
      </div>

      {/* 保存ボタン */}
      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => router.push('/')}
          className="flex-1 py-3 border border-neutral-200 text-neutral-700 font-medium rounded-xl hover:bg-neutral-50 transition-colors"
        >
          キャンセル
        </button>
        <button
          type="button"
          onClick={saveDailyEntry}
          disabled={saving}
          className="flex-1 py-3 bg-neutral-900 text-white font-medium rounded-xl hover:bg-neutral-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {saving ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
          ) : (
            <>
              <Save className="w-5 h-5" />
              記録を保存
            </>
          )}
        </button>
      </div>
    </div>
  );
}
