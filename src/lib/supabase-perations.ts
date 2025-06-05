import { supabase } from './supabase';

// トレード統計を取得
export async function getTradeStats(userId: string) {
  const { data: trades, error } = await supabase
    .from('trades')
    .select('result')
    .eq('user_id', userId);

  if (error || !trades) return null;

  const wins = trades.filter((t) => t.result > 0).length;
  const losses = trades.filter((t) => t.result < 0).length;
  const breakeven = trades.filter((t) => t.result === 0).length;
  const totalProfit = trades.reduce((sum, t) => sum + Number(t.result), 0);

  return {
    wins,
    losses,
    breakeven,
    totalTrades: trades.length,
    winRate: trades.length > 0 ? (wins / trades.length) * 100 : 0,
    totalProfit,
  };
}

// 月間パフォーマンスを取得
export async function getMonthlyPerformance(
  userId: string,
  year: number,
  month: number,
) {
  const startDate = new Date(year, month - 1, 1).toISOString().split('T')[0];
  const endDate = new Date(year, month, 0).toISOString().split('T')[0];

  const { data, error } = await supabase
    .from('daily_entries')
    .select('date, total_profit')
    .eq('user_id', userId)
    .gte('date', startDate)
    .lte('date', endDate)
    .order('date', { ascending: true });

  return data || [];
}

// 連続記録日数を再計算
export async function recalculateStreak(userId: string) {
  const { data, error } = await supabase
    .from('daily_entries')
    .select('date')
    .eq('user_id', userId)
    .order('date', { ascending: false });

  if (!data || data.length === 0) return 0;

  let streak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < data.length; i++) {
    const entryDate = new Date(data[i].date);
    entryDate.setHours(0, 0, 0, 0);

    const diffDays = Math.floor(
      (today.getTime() - entryDate.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (diffDays === i) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}
