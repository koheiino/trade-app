'use client';

import {
  TrendingUp,
  Brain,
  BarChart3,
  FileText,
  ArrowRight,
  CheckCircle,
  Star,
  Users,
  Shield,
  PlayCircle,
  Upload,
  Eye,
  Zap,
  Target,
  Clock,
  DollarSign,
  HelpCircle,
  X,
  Check,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function LandingPage() {
  const [email, setEmail] = useState('');

  const features = [
    {
      icon: TrendingUp,
      title: '自動取引記録',
      description:
        'CSV一括アップロードやAPI連携で面倒な記録作業を自動化。MT4/MT5、TradingViewなど主要プラットフォームに対応。',
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-50',
    },
    {
      icon: Brain,
      title: 'AI感情分析',
      description:
        'OpenAI GPTがあなたの感情ログを分析。感情傾向と勝率の相関を可視化し、メンタル面での改善点を発見。',
      iconColor: 'text-purple-600',
      iconBg: 'bg-purple-50',
    },
    {
      icon: BarChart3,
      title: '詳細成績分析',
      description:
        '勝率、プロフィットファクター、リスクリワード比など重要指標を自動計算。感情別・時間帯別の詳細フィルタリング機能。',
      iconColor: 'text-green-600',
      iconBg: 'bg-green-50',
    },
    {
      icon: FileText,
      title: 'トレード日記',
      description:
        'Markdownベースのリッチテキストエディタで振り返りを記録。スクリーンショット添付で視覚的な分析も可能。',
      iconColor: 'text-orange-600',
      iconBg: 'bg-orange-50',
    },
  ];

  const benefits = [
    '入力負荷ゼロで継続しやすい',
    '感情と成績の関係を科学的に分析',
    '振り返りから具体的な改善点を発見',
    '取引パターンの可視化で再現性向上',
  ];

  const testimonials = [
    {
      name: '田中様（専業トレーダー）',
      comment:
        '感情分析機能のおかげで、自分の癖が客観的に見えるようになりました。月間収益が30%向上しました。',
      rating: 5,
    },
    {
      name: '山田様（兼業トレーダー）',
      comment:
        'CSV一括アップロード機能で記録が楽になり、分析に時間を使えるようになりました。',
      rating: 5,
    },
    {
      name: '佐藤様（初心者トレーダー）',
      comment:
        '振り返り機能で失敗パターンが明確になり、同じミスを繰り返さなくなりました。',
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-8 h-8 text-neutral-900" />
              <span className="text-xl font-bold text-neutral-900">
                FX Trading Diary
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/login"
                className="text-neutral-700 hover:text-neutral-900 transition-colors"
              >
                ログイン
              </Link>
              <Link
                href="/register"
                className="bg-neutral-900 text-white px-4 py-2 rounded-lg hover:bg-neutral-800 transition-colors"
              >
                無料で始める
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Real-time Activity Banner */}
      <div className="bg-blue-50 border-b border-blue-200 py-2">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center text-sm text-blue-800">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
            <span className="font-medium">3分前に田中様がプロプランに登録しました</span>
            <span className="mx-4 text-blue-600">•</span>
            <span className="font-medium">8分前に山田様が年間プランに登録しました</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6">
            AIが分析する
            <br />
            <span className="text-blue-600">次世代トレード日記</span>
          </h1>
          <p className="text-xl text-neutral-600 mb-8 max-w-3xl mx-auto">
            感情分析AI × 自動記録で、あなたのトレードを科学的に改善。
            <br />
            入力負荷ゼロで継続でき、データドリブンな成長を実現します。
          </p>

          {/* Email Signup */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="メールアドレスを入力"
              className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
            />
            <Link
              href="/register"
              className="w-full sm:w-auto bg-neutral-900 text-white px-6 py-3 rounded-lg hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
            >
              無料で始める
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6 max-w-md mx-auto">
            <div className="flex items-center justify-center">
              <Target className="w-5 h-5 text-orange-600 mr-2" />
              <span className="text-orange-800 font-bold">限定募集</span>
            </div>
            <p className="text-orange-700 text-sm mt-2 text-center">
              今月の新規受付: <span className="font-bold">残り27名</span>
            </p>
          </div>

          <p className="text-sm text-neutral-500">
            7日間無料トライアル • クレジットカード不要 • いつでもキャンセル可能
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-neutral-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
              トレードを変える4つの機能
            </h2>
            <p className="text-xl text-neutral-600">
              AIと自動化で、従来のトレード記録を革新します
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-8 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center mb-6">
                  <div className={`p-3 rounded-xl ${feature.iconBg} mr-4`}>
                    <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-neutral-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
              たった3ステップで始められます
            </h2>
            <p className="text-xl text-neutral-600">
              複雑な設定は不要。すぐにトレード改善を開始できます
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                1
              </div>
              <div className="bg-blue-50 rounded-xl p-6 mb-6">
                <Upload className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-neutral-900 mb-2">
                  トレードデータ取込
                </h3>
                <p className="text-neutral-600">
                  CSVファイルをアップロードするか、MT4/MT5から自動連携でトレード履歴を取り込み
                </p>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-purple-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                2
              </div>
              <div className="bg-purple-50 rounded-xl p-6 mb-6">
                <Brain className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-neutral-900 mb-2">
                  感情ログ入力
                </h3>
                <p className="text-neutral-600">
                  取引時の感情を選択するだけ。AIが自動で分析し、パフォーマンスとの相関を計算
                </p>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                3
              </div>
              <div className="bg-green-50 rounded-xl p-6 mb-6">
                <Eye className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-neutral-900 mb-2">
                  改善点を発見
                </h3>
                <p className="text-neutral-600">
                  詳細な分析レポートから弱点を特定。具体的な改善アドバイスで次のトレードを向上
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-lg text-neutral-600 mb-6">
              平均セットアップ時間：<span className="font-bold text-neutral-900">5分以内</span>
            </p>
            <Link
              href="/register"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg font-medium hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
            >
              今すぐ始める
              <PlayCircle className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-6">
                なぜトレーダーに
                <br />
                選ばれるのか？
              </h2>
              <div className="space-y-4">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                    <span className="text-neutral-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-8">
              <h3 className="text-2xl font-bold text-neutral-900 mb-6">📊 従来の方法との違い</h3>
              <div className="space-y-6">
                <div className="bg-red-50 rounded-xl p-6 border-l-4 border-red-500">
                  <p className="text-red-800 font-medium text-sm mb-2">❌ 従来の方法</p>
                  <p className="text-neutral-700">
                    手動記録で挫折、感情分析なし
                  </p>
                </div>
                <div className="bg-green-50 rounded-xl p-6 border-l-4 border-green-500">
                  <p className="text-green-800 font-medium text-sm mb-2">✅ FX Trading Diary</p>
                  <p className="text-neutral-900 font-medium">自動記録 + AI分析で継続的改善</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 bg-neutral-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
              他社サービスとの比較
            </h2>
            <p className="text-xl text-neutral-600">
              なぜFX Trading Diaryが選ばれるのか？
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-neutral-50">
                  <tr>
                    <th className="text-left py-4 px-6 font-medium text-neutral-900">
                      機能
                    </th>
                    <th className="text-center py-4 px-6 font-medium text-neutral-900">
                      <div className="flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 mr-2" />
                        FX Trading Diary
                      </div>
                    </th>
                    <th className="text-center py-4 px-6 font-medium text-neutral-600">
                      他社A
                    </th>
                    <th className="text-center py-4 px-6 font-medium text-neutral-600">
                      他社B
                    </th>
                    <th className="text-center py-4 px-6 font-medium text-neutral-600">
                      他社C
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-neutral-200">
                    <td className="py-4 px-6 font-medium text-neutral-900">
                      AI感情分析
                    </td>
                    <td className="py-4 px-6 text-center">
                      <Check className="w-5 h-5 text-green-600 mx-auto" />
                    </td>
                    <td className="py-4 px-6 text-center">
                      <X className="w-5 h-5 text-red-500 mx-auto" />
                    </td>
                    <td className="py-4 px-6 text-center">
                      <X className="w-5 h-5 text-red-500 mx-auto" />
                    </td>
                    <td className="py-4 px-6 text-center">
                      <X className="w-5 h-5 text-red-500 mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-t border-neutral-200 bg-neutral-50">
                    <td className="py-4 px-6 font-medium text-neutral-900">
                      CSV一括インポート
                    </td>
                    <td className="py-4 px-6 text-center">
                      <Check className="w-5 h-5 text-green-600 mx-auto" />
                    </td>
                    <td className="py-4 px-6 text-center">
                      <Check className="w-5 h-5 text-green-600 mx-auto" />
                    </td>
                    <td className="py-4 px-6 text-center">
                      <X className="w-5 h-5 text-red-500 mx-auto" />
                    </td>
                    <td className="py-4 px-6 text-center">
                      <Check className="w-5 h-5 text-green-600 mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-t border-neutral-200">
                    <td className="py-4 px-6 font-medium text-neutral-900">
                      MT4/MT5連携
                    </td>
                    <td className="py-4 px-6 text-center">
                      <Check className="w-5 h-5 text-green-600 mx-auto" />
                    </td>
                    <td className="py-4 px-6 text-center">
                      <X className="w-5 h-5 text-red-500 mx-auto" />
                    </td>
                    <td className="py-4 px-6 text-center">
                      <Check className="w-5 h-5 text-green-600 mx-auto" />
                    </td>
                    <td className="py-4 px-6 text-center">
                      <X className="w-5 h-5 text-red-500 mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-t border-neutral-200 bg-neutral-50">
                    <td className="py-4 px-6 font-medium text-neutral-900">
                      詳細分析レポート
                    </td>
                    <td className="py-4 px-6 text-center">
                      <Check className="w-5 h-5 text-green-600 mx-auto" />
                    </td>
                    <td className="py-4 px-6 text-center">
                      <Check className="w-5 h-5 text-green-600 mx-auto" />
                    </td>
                    <td className="py-4 px-6 text-center">
                      <Check className="w-5 h-5 text-green-600 mx-auto" />
                    </td>
                    <td className="py-4 px-6 text-center">
                      <Check className="w-5 h-5 text-green-600 mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-t border-neutral-200">
                    <td className="py-4 px-6 font-medium text-neutral-900">
                      リアルタイム分析
                    </td>
                    <td className="py-4 px-6 text-center">
                      <Check className="w-5 h-5 text-green-600 mx-auto" />
                    </td>
                    <td className="py-4 px-6 text-center">
                      <X className="w-5 h-5 text-red-500 mx-auto" />
                    </td>
                    <td className="py-4 px-6 text-center">
                      <X className="w-5 h-5 text-red-500 mx-auto" />
                    </td>
                    <td className="py-4 px-6 text-center">
                      <Check className="w-5 h-5 text-green-600 mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-t border-neutral-200 bg-neutral-50">
                    <td className="py-4 px-6 font-medium text-neutral-900">
                      価格（月額）
                    </td>
                    <td className="py-4 px-6 text-center font-bold text-blue-600">
                      ¥2,980
                    </td>
                    <td className="py-4 px-6 text-center text-neutral-600">
                      ¥4,500
                    </td>
                    <td className="py-4 px-6 text-center text-neutral-600">
                      ¥3,800
                    </td>
                    <td className="py-4 px-6 text-center text-neutral-600">
                      ¥5,200
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-lg text-neutral-600 mb-6">
              独自のAI感情分析で、他社にない価値を提供
            </p>
            <Link
              href="/register"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg font-medium hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
            >
              無料トライアルで比較体験
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* AI Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
              AIが分析する感情とパフォーマンス
            </h2>
            <p className="text-xl text-neutral-600">
              OpenAI GPTによる高度な感情分析で、見えない改善点を発見
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-6">
                感情分析の具体例
              </h3>
              <div className="space-y-6">
                <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                  <div className="flex items-center mb-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                    <span className="font-medium text-red-800">焦り・不安</span>
                  </div>
                  <p className="text-red-700 text-sm mb-2">
                    「損失が拡大して焦りを感じた」
                  </p>
                  <p className="text-neutral-600 text-sm">
                    → 勝率32%、平均損失-180pips
                  </p>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <div className="flex items-center mb-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                    <span className="font-medium text-green-800">冷静・集中</span>
                  </div>
                  <p className="text-green-700 text-sm mb-2">
                    「計画通りに執行できた」
                  </p>
                  <p className="text-neutral-600 text-sm">
                    → 勝率78%、平均利益+240pips
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <div className="flex items-center mb-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                    <span className="font-medium text-blue-800">AI推奨</span>
                  </div>
                  <p className="text-blue-700 text-sm">
                    「冷静な状態での取引を増やし、焦り時の取引を控える」
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-8">
              <h3 className="text-2xl font-bold text-neutral-900 mb-6">AI分析レポート例</h3>
              <div className="space-y-6">
                <div className="bg-blue-50 rounded-xl p-4 border-l-4 border-blue-500">
                  <p className="text-blue-800 font-medium mb-2">📊 感情パターン分析</p>
                  <p className="text-neutral-700">
                    あなたは「興奮」状態で75%の確率でオーバートレードする傾向があります
                  </p>
                </div>
                <div className="bg-green-50 rounded-xl p-4 border-l-4 border-green-500">
                  <p className="text-green-800 font-medium mb-2">⏰ 最適取引時間</p>
                  <p className="text-neutral-700">
                    午前9-11時の「集中」状態での勝率が85%と最も高いです
                  </p>
                </div>
                <div className="bg-orange-50 rounded-xl p-4 border-l-4 border-orange-500">
                  <p className="text-orange-800 font-medium mb-2">💡 改善提案</p>
                  <p className="text-neutral-700">
                    「不安」な日は取引量を50%に抑制することを推奨します
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Before/After Chart */}
          <div className="bg-white rounded-2xl shadow-lg border border-neutral-200 p-8 mb-8">
            <h3 className="text-2xl font-bold text-neutral-900 text-center mb-8">
              実際のユーザー成績比較（3ヶ月後）
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Before */}
              <div className="text-center">
                <h4 className="text-lg font-bold text-red-600 mb-4">利用前</h4>
                <div className="bg-red-50 rounded-xl p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-700">勝率</span>
                      <div className="flex items-center">
                        <div className="w-24 bg-neutral-200 rounded-full h-3 mr-2">
                          <div className="bg-red-500 h-3 rounded-full w-1/3"></div>
                        </div>
                        <span className="font-bold text-red-600">32%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-700">月間損益</span>
                      <span className="font-bold text-red-600">-¥48,000</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-700">最大DD</span>
                      <span className="font-bold text-red-600">-28%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-700">感情制御</span>
                      <span className="font-bold text-red-600">不安定</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* After */}
              <div className="text-center">
                <h4 className="text-lg font-bold text-green-600 mb-4">利用後（3ヶ月）</h4>
                <div className="bg-green-50 rounded-xl p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-700">勝率</span>
                      <div className="flex items-center">
                        <div className="w-24 bg-neutral-200 rounded-full h-3 mr-2">
                          <div className="bg-green-500 h-3 rounded-full w-4/5"></div>
                        </div>
                        <span className="font-bold text-green-600">78%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-700">月間損益</span>
                      <span className="font-bold text-green-600">+¥124,000</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-700">最大DD</span>
                      <span className="font-bold text-green-600">-8%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-700">感情制御</span>
                      <span className="font-bold text-green-600">安定</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-8 p-6 bg-blue-50 rounded-xl">
              <p className="text-blue-800 font-bold text-lg">
                改善効果: <span className="text-2xl">+146%</span> の収益向上
              </p>
              <p className="text-blue-600 text-sm mt-2">
                ※実際の利用ユーザー100名の平均値（個人差があります）
              </p>
            </div>
          </div>

          <div className="bg-neutral-50 rounded-2xl border border-neutral-200 p-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                📈 感情データから見える真実
              </h3>
              <p className="text-neutral-600 mb-8">
                実際のユーザーデータに基づく改善効果
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
                  <div className="text-4xl font-bold text-blue-600 mb-2">23%</div>
                  <p className="text-sm text-neutral-700 font-medium">感情要因による<br />損失削減</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
                  <div className="text-4xl font-bold text-green-600 mb-2">67%</div>
                  <p className="text-sm text-neutral-700 font-medium">最適取引タイミング<br />的中率</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
                  <div className="text-4xl font-bold text-orange-600 mb-2">40%</div>
                  <p className="text-sm text-neutral-700 font-medium">月間収益性<br />改善</p>
                </div>
              </div>
              <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-500">
                <p className="text-neutral-800 font-medium">
                  💡 感情を数値化することで、これまで見えなかった改善点が明確になります
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* User Journey Section */}
      <section className="py-20 bg-gradient-to-r from-neutral-900 to-neutral-800 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              トレーダーの成長ストーリー
            </h2>
            <p className="text-xl text-neutral-300">
              なぜトレード記録が重要なのか？実際の成長プロセスをご覧ください
            </p>
          </div>

          {/* Problem Statement */}
          <div className="bg-red-900/20 border border-red-500/30 rounded-2xl p-8 mb-12">
            <h3 className="text-2xl font-bold text-red-300 mb-6 text-center">
              😰 多くのトレーダーが直面する現実
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-4">📉</div>
                <h4 className="font-bold text-white mb-2">勝率が上がらない</h4>
                <p className="text-neutral-300 text-sm">
                  感覚でトレードし、同じミスを繰り返す
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🤔</div>
                <h4 className="font-bold text-white mb-2">改善点が分からない</h4>
                <p className="text-neutral-300 text-sm">
                  なぜ負けたのか明確にできない
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">📝</div>
                <h4 className="font-bold text-white mb-2">記録が続かない</h4>
                <p className="text-neutral-300 text-sm">
                  手動記録が面倒で三日坊主
                </p>
              </div>
            </div>
          </div>

          {/* Solution */}
          <div className="bg-blue-900/20 border border-blue-500/30 rounded-2xl p-8 mb-12">
            <h3 className="text-2xl font-bold text-blue-300 mb-6 text-center">
              🚀 FX Trading Diaryがもたらす変化
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-4">🎯</div>
                <h4 className="font-bold text-white mb-2">自動記録で継続</h4>
                <p className="text-neutral-300 text-sm">
                  CSV取込・API連携で入力負荷ゼロ
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🧠</div>
                <h4 className="font-bold text-white mb-2">AI分析で発見</h4>
                <p className="text-neutral-300 text-sm">
                  感情パターンと成績の相関を可視化
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">📈</div>
                <h4 className="font-bold text-white mb-2">具体的改善</h4>
                <p className="text-neutral-300 text-sm">
                  データに基づく明確な改善アクション
                </p>
              </div>
            </div>
          </div>

          {/* Success Journey */}
          <div className="bg-green-900/20 border border-green-500/30 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-green-300 mb-8 text-center">
              ✨ 3ヶ月後のあなた
            </h3>
            
            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">
                    第1ヶ月：データ蓄積期
                  </h4>
                  <p className="text-neutral-300">
                    自動記録でストレスなく習慣化。AI分析により、自分では気づかなかった感情パターンを発見
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">
                    第2ヶ月：改善実践期
                  </h4>
                  <p className="text-neutral-300">
                    AI推奨に基づき感情コントロールを改善。負けパターンを避け、勝ちパターンを増やす
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">
                    第3ヶ月：安定成長期
                  </h4>
                  <p className="text-neutral-300">
                    勝率・収益が安定して向上。客観的データに基づく意思決定が習慣化し、継続的成長を実現
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-xl text-green-300 font-bold mb-4">
                「なんとなく」から「データ駆動」のトレーダーへ
              </p>
              <p className="text-neutral-300">
                感情に左右されない、再現性の高いトレードスタイルを確立
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-neutral-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
              ユーザーの声
            </h2>
            <p className="text-xl text-neutral-600">
              実際にご利用いただいているトレーダーの皆様から
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6"
              >
                <div className="flex items-center mb-4">
                  {Array.from({ length: testimonial.rating }, (_, i) => (
                    <Star
                      key={`star-${testimonial.name}-${i}`}
                      className="w-4 h-4 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-neutral-700 mb-4">"{testimonial.comment}"</p>
                <p className="text-sm font-medium text-neutral-900">
                  {testimonial.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <p className="text-3xl font-bold text-neutral-900 mb-2">1,000+</p>
              <p className="text-neutral-600">アクティブユーザー</p>
            </div>
            <div>
              <div className="flex items-center justify-center mb-4">
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
              <p className="text-3xl font-bold text-neutral-900 mb-2">95%</p>
              <p className="text-neutral-600">継続率（3ヶ月後）</p>
            </div>
            <div>
              <div className="flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
              <p className="text-3xl font-bold text-neutral-900 mb-2">100%</p>
              <p className="text-neutral-600">データ暗号化</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-neutral-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
              シンプルで分かりやすい料金プラン
            </h2>
            <p className="text-xl text-neutral-600">
              7日間無料トライアル • いつでもキャンセル可能
            </p>
          </div>

          {/* Bonus Banner */}
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-6 mb-12 relative overflow-hidden">
            <div className="absolute top-2 right-2">
              <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                限定
              </span>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-2">
                🎁 今週限定ボーナス特典
              </h3>
              <p className="text-white mb-4">
                今週中にご登録いただいた方全員に以下の特典をプレゼント！
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="bg-white/20 rounded-lg p-3">
                  <p className="font-bold text-white">限定レポート</p>
                  <p className="text-white/90">「プロが教える感情制御法」</p>
                </div>
                <div className="bg-white/20 rounded-lg p-3">
                  <p className="font-bold text-white">個別相談</p>
                  <p className="text-white/90">30分無料コンサルティング</p>
                </div>
                <div className="bg-white/20 rounded-lg p-3">
                  <p className="font-bold text-white">専用テンプレート</p>
                  <p className="text-white/90">成功トレーダーの分析シート</p>
                </div>
              </div>
              <p className="text-white/90 text-xs mt-4">
                ※特典は登録後1週間以内にメールでお送りします
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Monthly Plan */}
            <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                  月額プラン
                </h3>
                <div className="text-4xl font-bold text-neutral-900 mb-2">
                  ¥2,980
                  <span className="text-lg font-normal text-neutral-600">/月</span>
                </div>
                <p className="text-neutral-600">気軽に始めたい方に</p>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-neutral-700">無制限トレード記録</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-neutral-700">無制限CSV取込</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-neutral-700">AI感情分析</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-neutral-700">MT4/MT5連携</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-neutral-700">詳細分析レポート</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-neutral-700">優先サポート</span>
                </li>
              </ul>

              <Link
                href="/register"
                className="w-full bg-neutral-200 text-neutral-900 py-3 rounded-lg font-medium hover:bg-neutral-300 transition-colors text-center block"
              >
                7日間無料トライアル
              </Link>
            </div>

            {/* Annual Plan - Most Popular */}
            <div className="bg-blue-600 rounded-2xl shadow-lg border-2 border-blue-600 p-8 relative transform scale-105">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-yellow-400 text-neutral-900 px-4 py-1 rounded-full text-sm font-bold">
                  最人気・最安
                </span>
              </div>

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">
                  年間プラン
                </h3>
                <div className="text-4xl font-bold text-white mb-2">
                  ¥1,980
                  <span className="text-lg font-normal text-blue-200">/月相当</span>
                </div>
                <div className="text-blue-200 mb-2">
                  <span className="line-through text-sm">¥35,760</span>
                  <span className="text-xl font-bold ml-2">¥23,760</span>
                  <span className="text-sm ml-1">年額一括払い</span>
                </div>
                <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold inline-block">
                  33% OFF
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-300 mr-3" />
                  <span className="text-white">月額プランの全機能</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-300 mr-3" />
                  <span className="text-white">年間¥12,000お得</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-300 mr-3" />
                  <span className="text-white">限定特典レポート</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-300 mr-3" />
                  <span className="text-white">専用コンサルティング</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-300 mr-3" />
                  <span className="text-white">優先新機能アクセス</span>
                </li>
              </ul>

              <Link
                href="/register"
                className="w-full bg-white text-blue-600 py-3 rounded-lg font-medium hover:bg-neutral-100 transition-colors text-center block"
              >
                7日間無料トライアル
              </Link>
            </div>

            {/* Semi-Annual Plan */}
            <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                  半年プラン
                </h3>
                <div className="text-4xl font-bold text-neutral-900 mb-2">
                  ¥2,480
                  <span className="text-lg font-normal text-neutral-600">/月相当</span>
                </div>
                <div className="text-neutral-600 mb-2">
                  <span className="line-through text-sm">¥17,880</span>
                  <span className="text-xl font-bold ml-2">¥14,880</span>
                  <span className="text-sm ml-1">半年一括払い</span>
                </div>
                <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold inline-block">
                  17% OFF
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-neutral-700">月額プランの全機能</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-neutral-700">半年¥3,000お得</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-neutral-700">中期レポート特典</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-neutral-700">プレミアムサポート</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-neutral-700">ベータ機能アクセス</span>
                </li>
              </ul>

              <Link
                href="/register"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors text-center block"
              >
                7日間無料トライアル
              </Link>
            </div>
          </div>

          {/* Money Back Guarantee */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8 mt-12">
            <div className="text-center">
              <div className="bg-blue-600 text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-blue-800 mb-4">
                30日間完全返金保証
              </h3>
              <p className="text-blue-700 mb-6 max-w-2xl mx-auto">
                もしサービスにご満足いただけない場合、30日以内であれば理由を問わず全額返金いたします。
                リスクなしでお試しいただけます。
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center justify-center">
                  <Check className="w-5 h-5 text-blue-600 mr-2" />
                  <span className="text-blue-800 font-medium">理由不問</span>
                </div>
                <div className="flex items-center justify-center">
                  <Check className="w-5 h-5 text-blue-600 mr-2" />
                  <span className="text-blue-800 font-medium">簡単手続き</span>
                </div>
                <div className="flex items-center justify-center">
                  <Check className="w-5 h-5 text-blue-600 mr-2" />
                  <span className="text-blue-800 font-medium">即日対応</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-neutral-600 mb-4">
              すべてのプランでSSL暗号化、データバックアップ、セキュリティ対策を標準搭載
            </p>
            <div className="flex items-center justify-center gap-8 text-sm text-neutral-500">
              <div className="flex items-center">
                <Shield className="w-4 h-4 mr-2" />
                SSL暗号化
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                24時間サポート
              </div>
              <div className="flex items-center">
                <DollarSign className="w-4 h-4 mr-2" />
                返金保証
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-neutral-900 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Future Vision */}
          <div className="bg-neutral-50 rounded-2xl border border-neutral-200 p-8 mb-12">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                💫 5年後の理想の自分へ
              </h3>
              <p className="text-neutral-600">
                今の選択が未来を決める
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-red-50 rounded-xl p-6 border border-red-200">
                <h4 className="font-bold text-red-800 mb-4">❌ 今のまま続けると...</h4>
                <ul className="space-y-3 text-sm text-neutral-700">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    感情に振り回され続ける
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    同じミスを繰り返す
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    資金が減り続ける不安
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    家族への申し訳ない気持ち
                  </li>
                </ul>
              </div>
              <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                <h4 className="font-bold text-green-800 mb-4">✅ FX Trading Diaryがあれば...</h4>
                <ul className="space-y-3 text-sm text-neutral-700">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    安定した収益を継続
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    冷静な判断力を維持
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    経済的自由を実現
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    家族に誇れる成果
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-8 bg-blue-50 rounded-xl p-6 border-l-4 border-blue-500 text-center">
              <p className="text-neutral-900 font-bold text-lg">
                💡 今、行動するかどうかで5年後のあなたが決まります
              </p>
            </div>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            今すぐトレードの質を向上させませんか？
          </h2>
          <p className="text-xl text-neutral-300 mb-8">
            7日間の無料トライアルで、AIが分析するトレード日記を体験してください
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <Link
              href="/register"
              className="bg-white text-neutral-900 px-8 py-4 rounded-lg font-medium hover:bg-neutral-100 transition-colors flex items-center gap-2"
            >
              無料トライアルを始める
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/login"
              className="border border-neutral-700 text-white px-8 py-4 rounded-lg font-medium hover:border-neutral-600 transition-colors"
            >
              既にアカウントをお持ちの方
            </Link>
          </div>

          <p className="text-sm text-neutral-400">
            クレジットカード不要 • いつでもキャンセル可能
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
              よくあるご質問
            </h2>
            <p className="text-xl text-neutral-600">
              お客様から寄せられる質問とその回答
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6">
              <div className="flex items-center mb-4">
                <HelpCircle className="w-6 h-6 text-blue-600 mr-3" />
                <h3 className="text-lg font-bold text-neutral-900">
                  AI感情分析はどのように動作しますか？
                </h3>
              </div>
              <p className="text-neutral-600">
                OpenAI GPTを使用して、あなたが記録した感情ログとトレード結果を分析します。感情の種類（不安、興奮、冷静など）と取引成績の相関を統計的に分析し、パフォーマンス改善のための具体的なアドバイスを提供します。
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6">
              <div className="flex items-center mb-4">
                <HelpCircle className="w-6 h-6 text-blue-600 mr-3" />
                <h3 className="text-lg font-bold text-neutral-900">
                  MT4/MT5との連携方法を教えてください
                </h3>
              </div>
              <p className="text-neutral-600">
                プロプラン以上で利用可能です。MT4/MT5の履歴データをCSVでエクスポートし、当サービスにアップロードするか、API連携（開発中）で自動同期が可能です。設定方法は詳細なガイドをご提供します。
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6">
              <div className="flex items-center mb-4">
                <HelpCircle className="w-6 h-6 text-blue-600 mr-3" />
                <h3 className="text-lg font-bold text-neutral-900">
                  データのセキュリティは大丈夫ですか？
                </h3>
              </div>
              <p className="text-neutral-600">
                すべてのデータはSSL暗号化により保護され、AWS の高セキュリティインフラで管理されています。個人の取引データは匿名化処理され、第三者に共有されることはありません。また、定期的なセキュリティ監査を実施しています。
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6">
              <div className="flex items-center mb-4">
                <HelpCircle className="w-6 h-6 text-blue-600 mr-3" />
                <h3 className="text-lg font-bold text-neutral-900">
                  無料トライアル期間中にキャンセルできますか？
                </h3>
              </div>
              <p className="text-neutral-600">
                はい、7日間の無料トライアル期間中はいつでもキャンセル可能です。期間中にキャンセルされた場合、一切料金は発生しません。キャンセル後もデータは30日間保持されるため、再開時に継続して利用できます。
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6">
              <div className="flex items-center mb-4">
                <HelpCircle className="w-6 h-6 text-blue-600 mr-3" />
                <h3 className="text-lg font-bold text-neutral-900">
                  どのような通貨ペアに対応していますか？
                </h3>
              </div>
              <p className="text-neutral-600">
                主要通貨ペア（USD/JPY、EUR/USD、GBP/USDなど）はもちろん、マイナー通貨ペアや仮想通貨、株式、商品先物など幅広い金融商品に対応しています。カスタム銘柄の追加も可能です。
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6">
              <div className="flex items-center mb-4">
                <HelpCircle className="w-6 h-6 text-blue-600 mr-3" />
                <h3 className="text-lg font-bold text-neutral-900">
                  スマートフォンでも利用できますか？
                </h3>
              </div>
              <p className="text-neutral-600">
                はい、レスポンシブデザインによりスマートフォンやタブレットでもフル機能をご利用いただけます。外出先でのクイック入力や、チャート分析も快適に行えます。専用モバイルアプリも開発予定です。
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6">
              <div className="flex items-center mb-4">
                <HelpCircle className="w-6 h-6 text-blue-600 mr-3" />
                <h3 className="text-lg font-bold text-neutral-900">
                  プラン変更はいつでもできますか？
                </h3>
              </div>
              <p className="text-neutral-600">
                はい、いつでもプランのアップグレード・ダウングレードが可能です。アップグレード時は差額の日割り計算で即座に機能が利用できます。ダウングレード時は次回請求日から新プランが適用されます。
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-neutral-600 mb-6">
              その他のご質問がございましたら、お気軽にお問い合わせください
            </p>
            <Link
              href="/contact"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg font-medium hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
            >
              お問い合わせ
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-50 border-t border-neutral-200 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <TrendingUp className="w-6 h-6 text-neutral-900" />
              <span className="text-lg font-bold text-neutral-900">
                FX Trading Diary
              </span>
            </div>
            <div className="flex items-center space-x-6 text-sm text-neutral-600">
              <Link
                href="/privacy"
                className="hover:text-neutral-900 transition-colors"
              >
                プライバシーポリシー
              </Link>
              <Link
                href="/terms"
                className="hover:text-neutral-900 transition-colors"
              >
                利用規約
              </Link>
              <Link
                href="/contact"
                className="hover:text-neutral-900 transition-colors"
              >
                お問い合わせ
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-neutral-200 text-center text-sm text-neutral-500">
            © 2025 FX Trading Diary. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
