'use client';

import React, { useState, useEffect } from 'react';
import {
  Calendar,
  TrendingUp,
  Award,
  CheckCircle2,
  Target,
  Sparkles,
  Heart,
  LineChart,
  BarChart as BarChartIcon,
  LogOut,
  Mail,
  Lock,
  ArrowRight,
  AlertCircle,
} from 'lucide-react';
import {
  LineChart as RechartsLineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { supabase } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';
import type { UserStats, DailyEntry, Trade } from '@/lib/supabase';

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neutral-900"></div>
      </div>
    );
  }

  return user ? <TradingDiary user={user} /> : <Auth />;
}

// 認証コンポーネント
function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('error');

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      } else {
        // 新規登録の場合はマジックリンクを送信
        const { error } = await supabase.auth.signInWithOtp({
          email,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        });
        if (error) throw error;
        setMessageType('success');
        setMessage('確認メールを送信しました。メールをご確認ください。');
      }
    } catch (error: any) {
      setMessageType('error');
      if (error.message.includes('Email rate limit exceeded')) {
        setMessage('メール送信の制限に達しました。しばらく待ってから再度お試しください。');
      } else {
        setMessage(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50">
      <div className="bg-white p-8 rounded-xl shadow-sm border border-neutral-200 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-8 text-neutral-900">
          FX Trading Diary
        </h2>

        <form onSubmit={handleAuth} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-3 w-5 h-5 text-neutral-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="メールアドレス"
              className="w-full pl-10 pr-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all"
              required
            />
          </div>

          {isLogin && (
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-neutral-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="パスワード"
                className="w-full pl-10 pr-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all"
                required
              />
            </div>
          )}

          {message && (
            <div className={`p-3 rounded-lg flex items-center gap-2 ${
              messageType === 'success' 
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}>
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm">{message}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-neutral-900 text-white font-medium rounded-lg hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <>
                {isLogin ? 'ログイン' : '確認メールを送信'}
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <button
          onClick={() => setIsLogin(!isLogin)}
          className="w-full mt-4 text-center text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
        >
          {isLogin
            ? 'アカウントをお持ちでない方はこちら'
            : 'すでにアカウントをお持ちの方はこちら'}
        </button>

        {!isLogin && (
          <div className="mt-6 p-4 bg-neutral-50 rounded-lg border border-neutral-200">
            <p className="text-sm text-neutral-600">
              <span className="font-medium">新規登録の流れ：</span><br />
              1. メールアドレスを入力して送信<br />
              2. 確認メールのリンクをクリック<br />
              3. パスワードを設定して完了
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// メインのトレード日記コンポーネント
function TradingDiary({ user }: { user: User }) {
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [currentPhase, setCurrentPhase] = useState(1);
  const [balance, setBalance] = useState(5000);
  const [streakDays, setStreakDays] = useState(0);
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
  const [history, setHistory] = useState<DailyEntry[]>([]);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [loading, setLoading] = useState(true);

  // フェーズ設定
  const phases = [
    { phase: 1, range: '5K-20K', target: 20000, riskPercent: 7, maxRisk: 400 },
    { phase: 2, range: '20K-50K', target: 50000, riskPercent: 6, maxRisk: 800 },
    { phase: 3, range: '50K-150K', target: 150000, riskPercent: 5, maxRisk: 1500 },
    { phase: 4, range: '150K-500K', target: 500000, riskPercent: 4, maxRisk: 3000 },
    { phase: 5, range: '500K-1M', target: 1000000, riskPercent: 3, maxRisk: 5000 },
  ];

  const currentPhaseData = phases[currentPhase - 1];
  const progressPercent =
    ((balance - (currentPhase === 1 ? 5000 : phases[currentPhase - 2].target)) /
      (currentPhaseData.target -
        (currentPhase === 1 ? 5000 : phases[currentPhase - 2].target))) *
    100;

  // 励ましのメッセージ
  const motivationalMessages = [
    '今日も一歩前進。継続は力なり。',
    'コツコツが勝つコツ。今日も頑張りました。',
    '積み重ねが未来を作る。明日も楽しみですね。',
    '着実な成長が見えています。この調子で。',
    '今日の努力は明日の自信に。お疲れ様でした。',
  ];

  // データ読み込み
  useEffect(() => {
    loadUserData();
  }, [user]);

  const loadUserData = async () => {
    try {
      // ユーザー統計を取得または作成
      let { data: stats, error: statsError } = await supabase
        .from('user_stats')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (statsError && statsError.code === 'PGRST116') {
        // ユーザー統計が存在しない場合は作成
        const { data: newStats, error: createError } = await supabase
          .from('user_stats')
          .insert({ user_id: user.id })
          .select()
          .single();

        if (createError) throw createError;
        stats = newStats;
      }

      if (stats) {
        setUserStats(stats);
        setCurrentPhase(stats.current_phase);
        setBalance(Number(stats.current_balance));
        setStreakDays(stats.streak_days);
      }

      // 今日のエントリーを確認
      const today = new Date().toISOString().split('T')[0];
      const { data: todayData } = await supabase
        .from('daily_entries')
        .select('*, trades(*)')
        .eq('user_id', user.id)
        .eq('date', today)
        .single();

      if (todayData) {
        setTodayEntry({
          date: new Date(todayData.date).toLocaleDateString('ja-JP'),
          trades: todayData.trades || [],
          profit: Number(todayData.total_profit),
          notes: todayData.notes || '',
          checklist: todayData.checklist,
        });
      }

      // 履歴を読み込み
      const { data: historyData } = await supabase
        .from('daily_entries')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: true });

      if (historyData) {
        setHistory(historyData);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
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
    try {
      const profit = calculateDailyProfit();
      const newBalance = balance + profit;
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
        .single();

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
      const newPhase =
        newBalance >= currentPhaseData.target && currentPhase < 5
          ? currentPhase + 1
          : currentPhase;

      const { error: statsError } = await supabase
        .from('user_stats')
        .update({
          current_balance: newBalance,
          current_phase: newPhase,
          streak_days: streakDays + 1,
        })
        .eq('user_id', user.id);

      if (statsError) throw statsError;

      // ローカルステートを更新
      setBalance(newBalance);
      setStreakDays(streakDays + 1);

      if (newPhase > currentPhase) {
        setCurrentPhase(newPhase);
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 5000);
      }

      // 履歴を再読み込み
      await loadUserData();

      // リセット
      setTodayEntry({
        date: new Date().toLocaleDateString('ja-JP'),
        trades: [],
        profit: 0,
        notes: '',
        checklist: {
          morning: false,
          analysis: false,
          rules: false,
          mental: false,
        },
      });
    } catch (error) {
      console.error('Error saving entry:', error);
      alert('保存中にエラーが発生しました');
    }
  };

  // グラフ用データ生成
  const getChartData = () => {
    if (history.length === 0) return [];

    let cumulativeBalance = 5000;
    return history.map((entry, index) => {
      cumulativeBalance += Number(entry.total_profit);
      return {
        day: `Day ${index + 1}`,
        date: new Date(entry.date).toLocaleDateString('ja-JP'),
        profit: Number(entry.total_profit),
        balance: cumulativeBalance,
        trades: 0, // トレード数は別途クエリが必要
      };
    });
  };

  // 勝率計算（簡易版）
  const getWinRateData = () => {
    const totalProfit = history.reduce(
      (sum, entry) => sum + Number(entry.total_profit),
      0,
    );
    const wins = history.filter(
      (entry) => Number(entry.total_profit) > 0,
    ).length;
    const losses = history.filter(
      (entry) => Number(entry.total_profit) < 0,
    ).length;
    const breakeven = history.filter(
      (entry) => Number(entry.total_profit) === 0,
    ).length;

    return [
      { name: '勝ち', value: wins, color: '#10b981' },
      { name: '負け', value: losses, color: '#ef4444' },
      { name: '引き分け', value: breakeven, color: '#6b7280' },
    ];
  };

  const chartData = getChartData();
  const winRateData = getWinRateData();

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neutral-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* ヘッダー */}
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 mb-6">
          <div className="flex justify-between items-start mb-6">
            <h1 className="text-2xl font-bold text-neutral-900">
              FX Trading Diary
            </h1>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              ログアウト
            </button>
          </div>

          {/* 継続日数 */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 bg-neutral-100 px-4 py-2 rounded-full">
              <Sparkles className="w-5 h-5 text-neutral-700" />
              <span className="font-medium text-neutral-700">
                {streakDays}日連続継続中
              </span>
            </div>
          </div>

          {/* 資金状況 */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-neutral-900 text-white p-4 rounded-lg">
              <p className="text-sm opacity-70 mb-1">現在の資金</p>
              <p className="text-2xl font-bold">¥{balance.toLocaleString()}</p>
            </div>
            <div className="bg-white border-2 border-neutral-900 text-neutral-900 p-4 rounded-lg">
              <p className="text-sm mb-1">現在のフェーズ</p>
              <p className="text-2xl font-bold">Phase {currentPhase}</p>
              <p className="text-xs text-neutral-600">{currentPhaseData.range}</p>
            </div>
          </div>

          {/* 進捗バー */}
          <div>
            <div className="flex justify-between text-sm text-neutral-600 mb-2">
              <span>目標: ¥{currentPhaseData.target.toLocaleString()}</span>
              <span>{Math.min(progressPercent, 100).toFixed(1)}%</span>
            </div>
            <div className="w-full bg-neutral-200 rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-neutral-900 transition-all duration-500"
                style={{ width: `${Math.min(progressPercent, 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* 今日のチェックリスト */}
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 mb-6">
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
                  checked={todayEntry.checklist[key as keyof typeof todayEntry.checklist]}
                  onChange={() => updateChecklist(key as keyof typeof todayEntry.checklist)}
                  className="w-5 h-5 accent-neutral-900"
                />
                <span className="text-neutral-700">{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* トレード記録 */}
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 mb-6">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            今日のトレード記録
          </h2>

          {todayEntry.trades.map((trade, index) => (
            <div key={trade.id} className="mb-4 p-4 bg-neutral-50 rounded-lg">
              <div className="flex items-center gap-4 mb-2">
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
                onChange={(e) => updateTrade(trade.id, 'notes', e.target.value)}
              />
            </div>
          ))}

          <button
            onClick={addTrade}
            className="w-full py-2 bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 transition-colors font-medium"
          >
            + トレード追加
          </button>

          {todayEntry.trades.length > 0 && (
            <div className="mt-4 p-3 bg-neutral-900 text-white rounded-lg">
              <p className="text-lg font-medium">
                本日の損益: ¥{calculateDailyProfit().toLocaleString()}
              </p>
            </div>
          )}
        </div>

        {/* 今日の振り返り */}
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 mb-6">
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
        <button
          onClick={saveDailyEntry}
          className="w-full py-4 bg-neutral-900 text-white font-medium rounded-xl hover:bg-neutral-800 transition-colors"
        >
          今日の記録を保存
        </button>

        {/* モチベーションメッセージ */}
        {todayEntry.trades.length > 0 && (
          <div className="mt-6 p-4 bg-neutral-100 rounded-xl text-center">
            <p className="text-neutral-700">
              {
                motivationalMessages[
                  Math.floor(Math.random() * motivationalMessages.length)
                ]
              }
            </p>
          </div>
        )}

        {/* 統計ボタン */}
        {history.length > 0 && (
          <button
            onClick={() => setShowStats(!showStats)}
            className="w-full mt-6 py-3 bg-white border-2 border-neutral-900 text-neutral-900 font-medium rounded-xl hover:bg-neutral-50 transition-colors flex items-center justify-center gap-2"
          >
            <LineChart className="w-5 h-5" />
            {showStats ? '統計を閉じる' : '成長グラフを見る'}
          </button>
        )}

        {/* 統計セクション */}
        {showStats && history.length > 0 && (
          <div className="mt-6 space-y-6">
            {/* 資金推移グラフ */}
            <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                資金推移グラフ
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient
                      id="colorBalance"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#171717" stopOpacity={0.8} />
                      <stop
                        offset="95%"
                        stopColor="#171717"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                  <XAxis dataKey="day" stroke="#737373" />
                  <YAxis stroke="#737373" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e5e5',
                      borderRadius: '8px',
                    }}
                    labelStyle={{ color: '#171717' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="balance"
                    stroke="#171717"
                    fillOpacity={1}
                    fill="url(#colorBalance)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* 日別損益グラフ */}
            <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <BarChartIcon className="w-5 h-5" />
                日別損益
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                  <XAxis dataKey="day" stroke="#737373" />
                  <YAxis stroke="#737373" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e5e5',
                      borderRadius: '8px',
                    }}
                    labelStyle={{ color: '#171717' }}
                  />
                  <Bar
                    dataKey="profit"
                    fill="#8884d8"
                    shape={(props: any) => {
                      const { fill, x, y, width, height, payload } = props;
                      return (
                        <rect
                          x={x}
                          y={y}
                          width={width}
                          height={height}
                          fill={payload.profit >= 0 ? '#10b981' : '#ef4444'}
                        />
                      );
                    }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* 勝率円グラフ */}
            <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Target className="w-5 h-5" />
                日別勝率
              </h3>
              <div className="flex items-center justify-around">
                <ResponsiveContainer width="50%" height={200}>
                  <PieChart>
                    <Pie
                      data={winRateData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ value, percent }) =>
                        value > 0 ? `${(percent * 100).toFixed(0)}%` : ''
                      }
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {winRateData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-2">
                  {winRateData.map((data) => (
                    <div key={data.name} className="flex items-center gap-2">
                      <div
                        className={`w-4 h-4 rounded`}
                        style={{ backgroundColor: data.color }}
                      />
                      <span className="text-neutral-700">
                        {data.name}: {data.value}日
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 統計サマリー */}
            <div className="bg-neutral-100 rounded-xl p-6">
              <h3 className="text-lg font-bold mb-4">統計サマリー</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-neutral-600 text-sm">総取引日数</p>
                  <p className="text-2xl font-bold text-neutral-900">
                    {history.length}日
                  </p>
                </div>
                <div>
                  <p className="text-neutral-600 text-sm">平均日次損益</p>
                  <p className="text-2xl font-bold text-neutral-900">
                    ¥
                    {history.length > 0
                      ? Math.round(
                          history.reduce(
                            (sum, day) => sum + Number(day.total_profit),
                            0,
                          ) / history.length,
                        ).toLocaleString()
                      : 0}
                  </p>
                </div>
                <div>
                  <p className="text-neutral-600 text-sm">最大利益</p>
                  <p className="text-2xl font-bold text-green-600">
                    +¥
                    {Math.max(
                      ...history.map((day) => Number(day.total_profit)),
                      0,
                    ).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-neutral-600 text-sm">最大損失</p>
                  <p className="text-2xl font-bold text-red-600">
                    ¥
                    {Math.min(
                      ...history.map((day) => Number(day.total_profit)),
                      0,
                    ).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* フェーズアップ祝い */}
        {showCelebration && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-xl shadow-2xl animate-bounce">
              <Award className="w-16 h-16 text-neutral-900 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-center mb-2">
                Phase {currentPhase} 到達おめでとう！
              </h3>
              <p className="text-center text-neutral-600">
                着実な成長が素晴らしいです
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
