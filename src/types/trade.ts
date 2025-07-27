export type TradeType = 'buy' | 'sell';
export type TradeResult = 'win' | 'loss' | 'breakeven';
export type TradeStatus = 'open' | 'closed' | 'cancelled';
export type Market = 'forex' | 'stock' | 'crypto' | 'commodity';

export interface Trade {
  id: string;
  userId: string;
  symbol: string;
  type: TradeType;
  entryPrice: number;
  exitPrice?: number;
  quantity: number;
  entryTime: string;
  exitTime?: string;
  result?: TradeResult;
  pnl?: number;
  commission?: number;
  market: Market;
  status: TradeStatus;
  notes?: string;
  emotionId?: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface TradeInput {
  symbol: string;
  type: TradeType;
  entryPrice: number;
  exitPrice?: number;
  quantity: number;
  entryTime: string;
  exitTime?: string;
  market: Market;
  notes?: string;
  tags?: string[];
}

export interface TradeAnalytics {
  totalTrades: number;
  winningTrades: number;
  losingTrades: number;
  winRate: number;
  totalPnl: number;
  averageWin: number;
  averageLoss: number;
  profitFactor: number;
  sharpeRatio?: number;
  maxDrawdown: number;
  consecutiveWins: number;
  consecutiveLosses: number;
}

export interface TradesByPeriod {
  daily: Trade[];
  weekly: Trade[];
  monthly: Trade[];
  yearly: Trade[];
}

export interface TradingSession {
  id: string;
  userId: string;
  date: string;
  trades: Trade[];
  totalPnl: number;
  sessionNotes?: string;
  emotionScore?: number;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}
