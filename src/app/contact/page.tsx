'use client';

import { TrendingUp, ArrowLeft, Mail, MessageSquare, Send, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // 実際の実装では、ここでAPIを呼び出してお問い合わせを送信
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
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

        {/* Success Message */}
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-neutral-900 mb-4">
              お問い合わせを受け付けました
            </h1>
            <p className="text-neutral-600 mb-8">
              ご連絡いただきありがとうございます。<br />
              通常、1-2営業日以内にご返信いたします。
            </p>
            <Link
              href="/"
              className="inline-flex items-center space-x-2 bg-neutral-900 text-white px-6 py-3 rounded-lg hover:bg-neutral-800 transition-colors"
            >
              <span>トップページに戻る</span>
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1">
            <h1 className="text-3xl font-bold text-neutral-900 mb-6">お問い合わせ</h1>
            <p className="text-neutral-600 mb-8">
              ご質問やご要望がございましたら、お気軽にお問い合わせください。できる限り迅速にご対応いたします。
            </p>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-neutral-900 mb-1">メールアドレス</h3>
                  <p className="text-neutral-600">support@fxtradingdiary.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <MessageSquare className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium text-neutral-900 mb-1">対応時間</h3>
                  <p className="text-neutral-600">
                    平日 9:00 - 18:00（土日祝日を除く）<br />
                    通常1-2営業日以内にご返信
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-neutral-50 rounded-lg">
              <h3 className="font-medium text-neutral-900 mb-2">よくあるお問い合わせ</h3>
              <ul className="text-sm text-neutral-600 space-y-1">
                <li>• アカウントの設定方法</li>
                <li>• CSV取引データのアップロード方法</li>
                <li>• サブスクリプションの変更・解約</li>
                <li>• データのエクスポート方法</li>
                <li>• AI感情分析の精度について</li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-neutral-200 rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-neutral-900 mb-6">お問い合わせフォーム</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
                      お名前 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all"
                      placeholder="山田太郎"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                      メールアドレス <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-neutral-700 mb-2">
                    お問い合わせ種別 <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all"
                  >
                    <option value="">選択してください</option>
                    <option value="general">一般的なお問い合わせ</option>
                    <option value="technical">技術的な問題</option>
                    <option value="billing">料金・請求について</option>
                    <option value="feature">機能のご要望</option>
                    <option value="bug">バグ報告</option>
                    <option value="account">アカウントについて</option>
                    <option value="other">その他</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-2">
                    お問い合わせ内容 <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all resize-vertical"
                    placeholder="お問い合わせ内容を詳しくご記入ください..."
                  />
                </div>

                <div className="text-sm text-neutral-600">
                  <p>
                    <span className="text-red-500">*</span> は必須項目です。<br />
                    個人情報の取り扱いについては、
                    <Link href="/privacy" className="text-blue-600 hover:underline">
                      プライバシーポリシー
                    </Link>
                    をご確認ください。
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-neutral-900 text-white py-3 px-6 rounded-lg font-medium hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                      <span>送信中...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>送信する</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}