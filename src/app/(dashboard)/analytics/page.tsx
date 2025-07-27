'use client';

import { useState, useEffect } from 'react';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Target,
  Brain,
  Calendar,
  Filter,
  Download,
  Activity,
  PieChart,
} from 'lucide-react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// サンプルデータ（実際はAPIから取得）
const sampleData = {
  overview: {
    totalTrades: 142,
    winRate: 68.3,
    profitFactor: 2.4,
    totalPnL: 234500,
    avgWin: 12500,
    avgLoss: -5200,
    maxDrawdown: -8.7,
  },
  monthlyPerformance: [
    { month: '1月', pnl: 45000, trades: 23, winRate: 65, cumulativePnL: 45000 },
    { month: '2月', pnl: 38000, trades: 28, winRate: 71, cumulativePnL: 83000 },
    { month: '3月', pnl: 52000, trades: 31, winRate: 68, cumulativePnL: 135000 },
    { month: '4月', pnl: 41000, trades: 26, winRate: 73, cumulativePnL: 176000 },
    { month: '5月', pnl: 58000, trades: 34, winRate: 70, cumulativePnL: 234500 },
  ],
  dailyPerformance: [
    { date: '5/1', pnl: 12000, cumulativePnL: 176000 },
    { date: '5/2', pnl: -3000, cumulativePnL: 188000 },
    { date: '5/3', pnl: 8500, cumulativePnL: 185000 },
    { date: '5/4', pnl: 15000, cumulativePnL: 193500 },
    { date: '5/5', pnl: -2000, cumulativePnL: 208500 },
    { date: '5/6', pnl: 22000, cumulativePnL: 206500 },
    { date: '5/7', pnl: 5500, cumulativePnL: 228500 },
    { date: '5/8', pnl: 6000, cumulativePnL: 234500 },
  ],
  emotionAnalysis: [
    { emotion: '冷静', trades: 45, winRate: 82, avgPnL: 8500, fill: '#22c55e' },
    { emotion: '興奮', trades: 32, winRate: 45, avgPnL: -2100, fill: '#ef4444' },
    { emotion: '不安', trades: 28, winRate: 39, avgPnL: -3200, fill: '#f97316' },
    { emotion: '集中', trades: 37, winRate: 78, avgPnL: 7800, fill: '#3b82f6' },
  ],
  winLossData: [
    { name: '勝ちトレード', value: 97, fill: '#22c55e' },
    { name: '負けトレード', value: 45, fill: '#ef4444' },
  ],
  timeAnalysis: [
    { time: '9:00', trades: 35, winRate: 74, avgPnL: 6500 },
    { time: '11:00', trades: 28, winRate: 68, avgPnL: 4200 },
    { time: '13:00', trades: 31, winRate: 65, avgPnL: 3800 },
    { time: '15:00', trades: 25, winRate: 72, avgPnL: 5100 },
    { time: '17:00', trades: 23, winRate: 61, avgPnL: 2900 },
  ],
};

const COLORS = ['#3b82f6', '#22c55e', '#f97316', '#ef4444', '#8b5cf6'];

export default function AnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('3months');
  const [selectedTab, setSelectedTab] = useState('overview');

  const StatCard = ({ 
    title, 
    value, 
    subtitle, 
    icon: Icon, 
    trend = null,
    colorClass = 'text-blue-600'
  }: {
    title: string;
    value: string | number;
    subtitle?: string;
    icon: any;
    trend?: 'up' | 'down' | null;
    colorClass?: string;
  }) => (
    <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-neutral-600">{title}</p>
          <div className="flex items-center mt-2">
            <p className={`text-2xl font-bold ${colorClass}`}>{value}</p>
            {trend && (
              <div className={`ml-2 flex items-center ${
                trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {trend === 'up' ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
              </div>
            )}
          </div>
          {subtitle && (
            <p className="text-xs text-neutral-500 mt-1">{subtitle}</p>
          )}
        </div>
        <div className={`p-3 rounded-lg bg-neutral-50`}>
          <Icon className={`w-6 h-6 ${colorClass}`} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto">
      {/* ヘッダー */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">トレード分析</h1>
            <p className="mt-1 text-sm text-neutral-600">
              詳細なパフォーマンス分析とインサイト
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex items-center space-x-4">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="bg-white border border-neutral-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="1month">1ヶ月</option>
              <option value="3months">3ヶ月</option>
              <option value="6months">6ヶ月</option>
              <option value="1year">1年</option>
            </select>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" />
              エクスポート
            </button>
          </div>
        </div>
      </div>

      {/* タブナビゲーション */}
      <div className="mb-8">
        <div className="border-b border-neutral-200">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', name: '概要', icon: BarChart3 },
              { id: 'emotions', name: '感情分析', icon: Brain },
              { id: 'timing', name: 'タイミング分析', icon: Calendar },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                  selectedTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-neutral-500 hover:text-neutral-700'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* 概要タブ */}
      {selectedTab === 'overview' && (
        <div className="space-y-8">
          {/* パフォーマンス指標 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="総取引数"
              value={sampleData.overview.totalTrades}
              subtitle="過去3ヶ月"
              icon={BarChart3}
              trend="up"
            />
            <StatCard
              title="勝率"
              value={`${sampleData.overview.winRate}%`}
              subtitle="平均より+12%"
              icon={Target}
              trend="up"
              colorClass="text-green-600"
            />
            <StatCard
              title="総損益"
              value={`¥${sampleData.overview.totalPnL.toLocaleString()}`}
              subtitle="前月比+8%"
              icon={DollarSign}
              trend="up"
              colorClass="text-blue-600"
            />
            <StatCard
              title="プロフィットファクター"
              value={sampleData.overview.profitFactor}
              subtitle="推奨値: 1.5以上"
              icon={TrendingUp}
              colorClass="text-purple-600"
            />
          </div>

          {/* チャートグリッド */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 累積損益チャート */}
            <div className="bg-white rounded-xl border border-neutral-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-neutral-900">累積損益推移</h3>
                <Activity className="w-5 h-5 text-blue-600" />
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={sampleData.dailyPerformance}>
                  <defs>
                    <linearGradient id="colorPnL" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="date" 
                    stroke="#64748b"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="#64748b"
                    fontSize={12}
                    tickFormatter={(value) => `¥${(value / 1000).toFixed(0)}k`}
                  />
                  <Tooltip 
                    formatter={(value) => [`¥${Number(value).toLocaleString()}`, '累積損益']}
                    labelStyle={{ color: '#1f2937' }}
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="cumulativePnL"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorPnL)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* 勝敗比率 */}
            <div className="bg-white rounded-xl border border-neutral-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-neutral-900">勝敗比率</h3>
                <PieChart className="w-5 h-5 text-green-600" />
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsPieChart>
                  <Tooltip 
                    formatter={(value) => [`${value}回`, '']}
                    labelStyle={{ color: '#1f2937' }}
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <RechartsPieChart data={sampleData.winLossData}>
                    {sampleData.winLossData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </RechartsPieChart>
                </RechartsPieChart>
              </ResponsiveContainer>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">97</p>
                  <p className="text-sm text-neutral-600">勝ちトレード</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-red-600">45</p>
                  <p className="text-sm text-neutral-600">負けトレード</p>
                </div>
              </div>
            </div>
          </div>

          {/* 月別パフォーマンスバーチャート */}
          <div className="bg-white rounded-xl border border-neutral-200 p-6">
            <h3 className="text-lg font-bold text-neutral-900 mb-6">月別パフォーマンス</h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={sampleData.monthlyPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis 
                  dataKey="month" 
                  stroke="#64748b"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#64748b"
                  fontSize={12}
                  tickFormatter={(value) => `¥${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'pnl' ? `¥${Number(value).toLocaleString()}` : `${value}%`,
                    name === 'pnl' ? '損益' : '勝率'
                  ]}
                  labelStyle={{ color: '#1f2937' }}
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Bar dataKey="pnl" fill="#3b82f6" name="損益" radius={[4, 4, 0, 0]} />
                <Bar dataKey="winRate" fill="#22c55e" name="勝率" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* 感情分析タブ */}
      {selectedTab === 'emotions' && (
        <div className="space-y-8">
          {/* 感情別パフォーマンスチャート */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 感情別勝率バーチャート */}
            <div className="bg-white rounded-xl border border-neutral-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-neutral-900">感情別勝率</h3>
                <Brain className="w-5 h-5 text-purple-600" />
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={sampleData.emotionAnalysis} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis 
                    type="number" 
                    stroke="#64748b"
                    fontSize={12}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <YAxis 
                    type="category"
                    dataKey="emotion" 
                    stroke="#64748b"
                    fontSize={12}
                    width={60}
                  />
                  <Tooltip 
                    formatter={(value) => [`${value}%`, '勝率']}
                    labelStyle={{ color: '#1f2937' }}
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="winRate" radius={[0, 4, 4, 0]}>
                    {sampleData.emotionAnalysis.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* 感情別取引数 */}
            <div className="bg-white rounded-xl border border-neutral-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-neutral-900">感情別取引数</h3>
                <Target className="w-5 h-5 text-blue-600" />
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsPieChart>
                  <Tooltip 
                    formatter={(value) => [`${value}回`, '取引数']}
                    labelStyle={{ color: '#1f2937' }}
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <Pie data={sampleData.emotionAnalysis} dataKey="trades" nameKey="emotion">
                    {sampleData.emotionAnalysis.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 感情別平均損益 */}
          <div className="bg-white rounded-xl border border-neutral-200 p-6">
            <h3 className="text-lg font-bold text-neutral-900 mb-6">感情別平均損益</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={sampleData.emotionAnalysis}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis 
                  dataKey="emotion" 
                  stroke="#64748b"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#64748b"
                  fontSize={12}
                  tickFormatter={(value) => `¥${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip 
                  formatter={(value) => [`¥${Number(value).toLocaleString()}`, '平均損益']}
                  labelStyle={{ color: '#1f2937' }}
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="avgPnL" radius={[4, 4, 0, 0]}>
                  {sampleData.emotionAnalysis.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* AI推奨事項 */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200 p-6">
            <div className="flex items-center mb-4">
              <Brain className="w-6 h-6 text-blue-600 mr-3" />
              <h3 className="text-lg font-bold text-neutral-900">AI推奨事項</h3>
            </div>
            <div className="space-y-3">
              <div className="bg-white rounded-lg p-4 border-l-4 border-green-500">
                <p className="font-medium text-green-800">✅ 推奨行動</p>
                <p className="text-sm text-neutral-700 mt-1">
                  「冷静」「集中」状態での取引を増やしましょう。これらの感情状態では勝率が80%近くになっています。
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 border-l-4 border-red-500">
                <p className="font-medium text-red-800">⚠️ 注意事項</p>
                <p className="text-sm text-neutral-700 mt-1">
                  「興奮」「不安」状態での取引は控えることをお勧めします。損失リスクが高くなっています。
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* タイミング分析タブ */}
      {selectedTab === 'timing' && (
        <div className="space-y-8">
          {/* 時間帯別パフォーマンスチャート */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 時間帯別勝率 */}
            <div className="bg-white rounded-xl border border-neutral-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-neutral-900">時間帯別勝率</h3>
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={sampleData.timeAnalysis}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="time" 
                    stroke="#64748b"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="#64748b"
                    fontSize={12}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip 
                    formatter={(value) => [`${value}%`, '勝率']}
                    labelStyle={{ color: '#1f2937' }}
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="winRate" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8, stroke: '#3b82f6', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* 時間帯別取引数 */}
            <div className="bg-white rounded-xl border border-neutral-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-neutral-900">時間帯別取引数</h3>
                <BarChart3 className="w-5 h-5 text-green-600" />
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={sampleData.timeAnalysis}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="time" 
                    stroke="#64748b"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="#64748b"
                    fontSize={12}
                  />
                  <Tooltip 
                    formatter={(value) => [`${value}回`, '取引数']}
                    labelStyle={{ color: '#1f2937' }}
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="trades" fill="#22c55e" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 時間帯別平均損益 */}
          <div className="bg-white rounded-xl border border-neutral-200 p-6">
            <h3 className="text-lg font-bold text-neutral-900 mb-6">時間帯別平均損益</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={sampleData.timeAnalysis}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis 
                  dataKey="time" 
                  stroke="#64748b"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#64748b"
                  fontSize={12}
                  tickFormatter={(value) => `¥${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip 
                  formatter={(value) => [`¥${Number(value).toLocaleString()}`, '平均損益']}
                  labelStyle={{ color: '#1f2937' }}
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="avgPnL" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* 最適取引時間 */}
          <div className="bg-green-50 rounded-xl border border-green-200 p-6">
            <div className="flex items-center mb-4">
              <Target className="w-6 h-6 text-green-600 mr-3" />
              <h3 className="text-lg font-bold text-neutral-900">最適取引時間</h3>
            </div>
            <p className="text-neutral-700 mb-4">
              あなたのデータ分析によると、以下の時間帯での取引が最も成果を上げています：
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4 border-l-4 border-green-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-green-800">9:00 - 11:00</p>
                    <p className="text-sm text-neutral-600">勝率74% | 平均利益¥6,500</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl">🏆</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-blue-800">15:00 - 17:00</p>
                    <p className="text-sm text-neutral-600">勝率72% | 平均利益¥5,100</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl">🎯</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}