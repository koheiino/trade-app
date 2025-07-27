'use client';

import { TrendingUp, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center space-x-2">
              <TrendingUp className="w-8 h-8 text-neutral-900" />
              <span className="text-xl font-bold text-neutral-900">
                FX Trading Diary
              </span>
            </Link>
            <Link
              href="/"
              className="flex items-center space-x-2 text-neutral-700 hover:text-neutral-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>トップページに戻る</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-neutral max-w-none">
          <h1 className="text-3xl font-bold text-neutral-900 mb-8">
            プライバシーポリシー
          </h1>

          <p className="text-neutral-600 mb-8">最終更新日：2025年7月27日</p>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
                1. はじめに
              </h2>
              <p className="text-neutral-700 leading-relaxed">
                FX Trading
                Diary（以下「当社」といいます。）は、お客様の個人情報の保護を重要視し、個人情報の保護に関する法律、その他の関係法令を遵守するとともに、以下のプライバシーポリシー（以下「本ポリシー」といいます。）に従って、個人情報を適切に取り扱います。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
                2. 収集する情報
              </h2>
              <p className="text-neutral-700 leading-relaxed mb-4">
                当社は、本サービスの提供にあたり、以下の個人情報を収集いたします。
              </p>

              <h3 className="text-xl font-medium text-neutral-900 mb-3">
                2.1 お客様から直接提供される情報
              </h3>
              <ul className="list-disc list-inside space-y-2 text-neutral-700 leading-relaxed mb-4">
                <li>氏名、メールアドレス</li>
                <li>パスワード（暗号化して保存）</li>
                <li>トレード記録データ（取引日時、銘柄、価格、数量等）</li>
                <li>感情ログデータ</li>
                <li>日記・ジャーナルデータ</li>
                <li>アップロードされた画像・ファイル</li>
                <li>お問い合わせ内容</li>
              </ul>

              <h3 className="text-xl font-medium text-neutral-900 mb-3">
                2.2 自動的に収集される情報
              </h3>
              <ul className="list-disc list-inside space-y-2 text-neutral-700 leading-relaxed">
                <li>IPアドレス</li>
                <li>ブラウザの種類・バージョン</li>
                <li>OS情報</li>
                <li>アクセス日時</li>
                <li>利用状況（ページビュー、クリック等）</li>
                <li>Cookie情報</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
                3. 情報の利用目的
              </h2>
              <p className="text-neutral-700 leading-relaxed mb-4">
                当社は、収集した個人情報を以下の目的で利用いたします。
              </p>
              <ul className="list-disc list-inside space-y-2 text-neutral-700 leading-relaxed">
                <li>本サービスの提供・運営</li>
                <li>ユーザーサポート・お問い合わせ対応</li>
                <li>AI感情分析機能の提供</li>
                <li>成績分析・統計データの生成</li>
                <li>サービス改善・機能開発</li>
                <li>料金決済・課金管理</li>
                <li>利用規約違反の調査・対応</li>
                <li>重要なお知らせの配信</li>
                <li>
                  マーケティング・プロモーション活動（同意をいただいた場合のみ）
                </li>
                <li>法令に基づく対応</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
                4. 第三者への提供
              </h2>
              <p className="text-neutral-700 leading-relaxed mb-4">
                当社は、以下の場合を除き、個人情報を第三者に提供いたしません。
              </p>
              <ul className="list-disc list-inside space-y-2 text-neutral-700 leading-relaxed">
                <li>お客様の同意がある場合</li>
                <li>法令に基づく場合</li>
                <li>
                  人の生命、身体または財産の保護のために必要がある場合であって、本人の同意を得ることが困難である場合
                </li>
                <li>
                  公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合であって、本人の同意を得ることが困難である場合
                </li>
                <li>
                  国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合であって、本人の同意を得ることにより当該事務の遂行に支障を及ぼすおそれがある場合
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
                5. 第三者サービスの利用
              </h2>
              <p className="text-neutral-700 leading-relaxed mb-4">
                本サービスでは、以下の第三者サービスを利用しており、それぞれのプライバシーポリシーに従って情報が処理されます。
              </p>
              <ul className="list-disc list-inside space-y-2 text-neutral-700 leading-relaxed">
                <li>
                  <strong>Supabase</strong>: データベース・認証サービス
                </li>
                <li>
                  <strong>OpenAI</strong>: AI感情分析サービス
                </li>
                <li>
                  <strong>Stripe</strong>: 決済処理サービス
                </li>
                <li>
                  <strong>Vercel</strong>: ホスティングサービス
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
                6. データの保存期間
              </h2>
              <p className="text-neutral-700 leading-relaxed">
                当社は、個人情報を利用目的の達成に必要な期間のみ保存いたします。アカウント削除後は、法令で定められた保存義務のある情報を除き、個人情報を削除いたします。ただし、サービス改善のための統計データについては、個人を特定できない形で保存する場合があります。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
                7. データセキュリティ
              </h2>
              <p className="text-neutral-700 leading-relaxed mb-4">
                当社は、個人情報の保護のため、以下のセキュリティ対策を実施しています。
              </p>
              <ul className="list-disc list-inside space-y-2 text-neutral-700 leading-relaxed">
                <li>SSL/TLS暗号化による通信の保護</li>
                <li>パスワードのハッシュ化保存</li>
                <li>アクセス権限の適切な管理</li>
                <li>定期的なセキュリティ監査</li>
                <li>従業員への情報セキュリティ教育</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
                8. Cookieの使用
              </h2>
              <p className="text-neutral-700 leading-relaxed mb-4">
                当社は、サービスの利便性向上のためCookieを使用しています。Cookieの使用目的は以下の通りです。
              </p>
              <ul className="list-disc list-inside space-y-2 text-neutral-700 leading-relaxed">
                <li>ログイン状態の維持</li>
                <li>ユーザー設定の保存</li>
                <li>サービス利用状況の分析</li>
                <li>サービス改善のための情報収集</li>
              </ul>
              <p className="text-neutral-700 leading-relaxed mt-4">
                お客様は、ブラウザの設定によりCookieを無効にすることができますが、一部の機能が利用できなくなる場合があります。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
                9. お客様の権利
              </h2>
              <p className="text-neutral-700 leading-relaxed mb-4">
                お客様は、自己の個人情報について、以下の権利を有します。
              </p>
              <ul className="list-disc list-inside space-y-2 text-neutral-700 leading-relaxed">
                <li>個人情報の開示請求</li>
                <li>個人情報の訂正・追加・削除請求</li>
                <li>個人情報の利用停止・消去請求</li>
                <li>個人情報の第三者提供の停止請求</li>
              </ul>
              <p className="text-neutral-700 leading-relaxed mt-4">
                これらの権利を行使される場合は、本人確認を行った上で、合理的な期間内に対応いたします。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
                10. 未成年者の個人情報
              </h2>
              <p className="text-neutral-700 leading-relaxed">
                当社は、18歳未満の方からの個人情報の収集は行いません。18歳未満の方が本サービスを利用される場合は、保護者の同意が必要です。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
                11. 国際的なデータ転送
              </h2>
              <p className="text-neutral-700 leading-relaxed">
                本サービスで使用する第三者サービス（OpenAI、Stripe等）は海外に拠点を置く場合があり、個人情報が海外に転送される可能性があります。これらのサービスは適切なプライバシー保護措置を講じています。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
                12. プライバシーポリシーの変更
              </h2>
              <p className="text-neutral-700 leading-relaxed">
                当社は、法令の変更やサービス内容の変更等に伴い、本ポリシーを変更する場合があります。重要な変更については、サービス内での通知やメールでお知らせいたします。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
                13. お問い合わせ
              </h2>
              <p className="text-neutral-700 leading-relaxed mb-4">
                個人情報の取り扱いに関するお問い合わせは、以下の連絡先までご連絡ください。
              </p>
              <div className="bg-neutral-50 p-4 rounded-lg">
                <p className="text-neutral-700">
                  <strong>FX Trading Diary</strong>
                  <br />
                  メール: privacy@fxtradingdiary.com
                  <br />
                  お問い合わせフォーム:{' '}
                  <Link
                    href="/contact"
                    className="text-blue-600 hover:underline"
                  >
                    /contact
                  </Link>
                </p>
              </div>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-neutral-200">
            <p className="text-sm text-neutral-500">以上</p>
          </div>
        </div>
      </div>
    </div>
  );
}
