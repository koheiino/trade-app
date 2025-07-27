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

          <p className="text-sm text-neutral-500">
            14日間無料トライアル • クレジットカード不要 • いつでもキャンセル可能
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

            <div className="bg-neutral-900 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">従来の方法との違い</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-red-500 pl-4">
                  <p className="text-red-300 text-sm">従来</p>
                  <p className="text-neutral-300">
                    手動記録で挫折、感情分析なし
                  </p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <p className="text-green-300 text-sm">FX Trading Diary</p>
                  <p className="text-white">自動記録 + AI分析で継続的改善</p>
                </div>
              </div>
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

      {/* CTA Section */}
      <section className="py-20 bg-neutral-900 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            今すぐトレードの質を向上させませんか？
          </h2>
          <p className="text-xl text-neutral-300 mb-8">
            14日間の無料トライアルで、AIが分析するトレード日記を体験してください
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
