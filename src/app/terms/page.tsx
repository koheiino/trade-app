'use client';

import { TrendingUp, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center space-x-2">
              <TrendingUp className="w-8 h-8 text-neutral-900" />
              <span className="text-xl font-bold text-neutral-900">FX Trading Diary</span>
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
          <h1 className="text-3xl font-bold text-neutral-900 mb-8">利用規約</h1>
          
          <p className="text-neutral-600 mb-8">
            最終更新日：2024年7月27日
          </p>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">第1条（適用）</h2>
              <p className="text-neutral-700 leading-relaxed">
                この利用規約（以下「本規約」といいます。）は、FX Trading Diary（以下「当社」といいます。）がこのウェブサイト上で提供するサービス（以下「本サービス」といいます。）の利用条件を定めるものです。登録ユーザーの皆さま（以下「ユーザー」といいます。）には、本規約に従って、本サービスをご利用いただきます。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">第2条（利用登録）</h2>
              <ol className="list-decimal list-inside space-y-2 text-neutral-700 leading-relaxed">
                <li>本サービスにおいて、登録希望者が当社の定める方法によって利用登録を申請し、当社がこれを承認することによって、利用登録が完了するものとします。</li>
                <li>当社は、利用登録の申請者に以下の事由があると判断した場合、利用登録の申請を承認しないことがあり、その理由については一切の開示義務を負わないものとします。
                  <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                    <li>利用登録の申請に際して虚偽の事項を届け出た場合</li>
                    <li>本規約に違反したことがある者からの申請である場合</li>
                    <li>その他、当社が利用登録を相当でないと判断した場合</li>
                  </ul>
                </li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">第3条（ユーザーIDおよびパスワードの管理）</h2>
              <ol className="list-decimal list-inside space-y-2 text-neutral-700 leading-relaxed">
                <li>ユーザーは、自己の責任において、本サービスのユーザーIDおよびパスワードを適切に管理するものとします。</li>
                <li>ユーザーは、いかなる場合にも、ユーザーIDおよびパスワードを第三者に譲渡または貸与し、もしくは第三者と共用することはできません。</li>
                <li>当社は、ユーザーIDとパスワードの組み合わせが登録情報と一致してログインされた場合には、そのユーザーIDを登録しているユーザー自身による利用とみなします。</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">第4条（料金および支払方法）</h2>
              <ol className="list-decimal list-inside space-y-2 text-neutral-700 leading-relaxed">
                <li>ユーザーは、本サービスの有料部分の対価として、当社が別途定め、本ウェブサイトに表示する利用料金を、当社が指定する方法により支払うものとします。</li>
                <li>ユーザーが利用料金の支払を遅滞した場合には、ユーザーは年14.6％の割合による遅延損害金を支払うものとします。</li>
                <li>無料トライアル期間中にサブスクリプションをキャンセルした場合、料金は発生しません。</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">第5条（禁止事項）</h2>
              <p className="text-neutral-700 leading-relaxed mb-4">
                ユーザーは、本サービスの利用にあたり、以下の行為をしてはなりません。
              </p>
              <ul className="list-disc list-inside space-y-2 text-neutral-700 leading-relaxed">
                <li>法令または公序良俗に違反する行為</li>
                <li>犯罪行為に関連する行為</li>
                <li>当社、本サービスの他のユーザー、または第三者のサーバーまたはネットワークの機能を破壊したり、妨害したりする行為</li>
                <li>当社のサービスの運営を妨害するおそれのある行為</li>
                <li>他のユーザーに関する個人情報等を収集または蓄積する行為</li>
                <li>不正アクセスをし、またはこれを試みる行為</li>
                <li>他のユーザーに成りすます行為</li>
                <li>当社のサービスに関連して、反社会的勢力に対して直接または間接に利益を供与する行為</li>
                <li>その他、当社が不適切と判断する行為</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">第6条（本サービスの提供の停止等）</h2>
              <ol className="list-decimal list-inside space-y-2 text-neutral-700 leading-relaxed">
                <li>当社は、以下のいずれかの事由があると判断した場合、ユーザーに事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします。
                  <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                    <li>本サービスにかかるコンピュータシステムの保守点検または更新を行う場合</li>
                    <li>地震、落雷、火災、停電または天災などの不可抗力により、本サービスの提供が困難となった場合</li>
                    <li>コンピュータまたは通信回線等が事故により停止した場合</li>
                    <li>その他、当社が本サービスの提供が困難と判断した場合</li>
                  </ul>
                </li>
                <li>当社は、本サービスの提供の停止または中断により、ユーザーまたは第三者が被ったいかなる不利益または損害についても、一切の責任を負わないものとします。</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">第7条（利用制限および登録抹消）</h2>
              <ol className="list-decimal list-inside space-y-2 text-neutral-700 leading-relaxed">
                <li>当社は、ユーザーが以下のいずれかに該当する場合には、事前の通知なく、ユーザーに対して、本サービスの全部もしくは一部の利用を制限し、またはユーザーとしての登録を抹消することができるものとします。
                  <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                    <li>本規約のいずれかの条項に違反した場合</li>
                    <li>登録事項に虚偽の事実があることが判明した場合</li>
                    <li>料金等の支払債務の不履行があった場合</li>
                    <li>当社からの連絡に対し、一定期間返答がない場合</li>
                    <li>本サービスについて、最後の利用から一定期間利用がない場合</li>
                    <li>その他、当社が本サービスの利用を適当でないと判断した場合</li>
                  </ul>
                </li>
                <li>当社は、本条に基づき当社が行った行為によりユーザーに生じた損害について、一切の責任を負いません。</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">第8条（退会）</h2>
              <p className="text-neutral-700 leading-relaxed">
                ユーザーは、当社の定める退会手続により、本サービスから退会できるものとします。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">第9条（保証の否認および免責事項）</h2>
              <ol className="list-decimal list-inside space-y-2 text-neutral-700 leading-relaxed">
                <li>当社は、本サービスに事実上または法律上の瑕疵（安全性、信頼性、正確性、完全性、有効性、特定の目的への適合性、セキュリティなどに関する欠陥、エラーやバグ、権利侵害などを含みます。）がないことを明示的にも黙示的にも保証しておりません。</li>
                <li>当社は、本サービスに起因してユーザーに生じたあらゆる損害について一切の責任を負いません。</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">第10条（サービス内容の変更等）</h2>
              <p className="text-neutral-700 leading-relaxed">
                当社は、ユーザーに通知することなく、本サービスの内容を変更しまたは本サービスの提供を中止することができるものとし、これによってユーザーに生じた損害について一切の責任を負いません。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">第11条（利用規約の変更）</h2>
              <p className="text-neutral-700 leading-relaxed">
                当社は、必要と判断した場合には、ユーザーに通知することなくいつでも本規約を変更することができるものとします。なお、本規約の変更後、本サービスの利用を開始した場合には、当該ユーザーは変更後の規約に同意したものとみなします。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">第12条（個人情報の取扱い）</h2>
              <p className="text-neutral-700 leading-relaxed">
                当社は、本サービスの利用によって取得する個人情報については、当社「プライバシーポリシー」に従い適切に取り扱うものとします。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">第13条（通知または連絡）</h2>
              <p className="text-neutral-700 leading-relaxed">
                ユーザーと当社との間の通知または連絡は、当社の定める方法によって行うものとします。当社は、ユーザーから、当社が別途定める方式に従った変更届け出がない限り、現在登録されている連絡先が有効なものとみなして当該連絡先へ通知または連絡を行い、これらは、発信時にユーザーへ到達したものとみなします。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">第14条（権利義務の譲渡の禁止）</h2>
              <p className="text-neutral-700 leading-relaxed">
                ユーザーは、当社の書面による事前の承諾なく、利用契約上の地位または本規約に基づく権利もしくは義務を第三者に譲渡し、または担保に供することはできません。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-neutral-900 mb-4">第15条（準拠法・裁判管轄）</h2>
              <ol className="list-decimal list-inside space-y-2 text-neutral-700 leading-relaxed">
                <li>本規約の解釈にあたっては、日本法を準拠法とします。</li>
                <li>本サービスに関して紛争が生じた場合には、当社の本店所在地を管轄する裁判所を専属的合意管轄とします。</li>
              </ol>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-neutral-200">
            <p className="text-sm text-neutral-500">
              以上
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}