import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/hooks/useTheme';
import { ClientProvider } from '@/components/ClientProvider';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    template: '%s | FX Trading Diary',
    default: 'FX Trading Diary - プロフェッショナルトレーディング記録',
  },
  description: 'あなたのFXトレーディングを次のレベルへ。包括的な記録、分析、成長追跡ツール。',
  keywords: ['FX', 'Trading', 'Diary', 'Analysis', 'トレード記録', '投資'],
  authors: [{ name: 'FX Trading Diary Team' }],
  creator: 'FX Trading Diary',
  publisher: 'FX Trading Diary',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: '/',
    title: 'FX Trading Diary',
    description: 'プロフェッショナルなFXトレーディング記録・分析ツール',
    siteName: 'FX Trading Diary',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FX Trading Diary',
    description: 'プロフェッショナルなFXトレーディング記録・分析ツール',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={inter.variable} suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#3b82f6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="FX Trading Diary" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body 
        className={`
          ${inter.className} 
          font-sans 
          antialiased 
          bg-gray-50 
          dark:bg-gray-900 
          text-gray-900 
          dark:text-gray-100
          transition-colors 
          duration-300
          selection:bg-blue-100
          dark:selection:bg-blue-900
          selection:text-blue-900
          dark:selection:text-blue-100
        `}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <ClientProvider>
            {/* メインコンテンツ */}
            <div className="min-h-screen flex flex-col">
              {children}
            </div>

            {/* グローバルスクロールインジケーター */}
            <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-800 z-50">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-150 ease-out"
                style={{
                  width: 'var(--scroll-progress, 0%)'
                }}
              />
            </div>

            {/* グローバルトースト通知領域 */}
            <div 
              id="toast-container" 
              className="fixed top-4 right-4 z-50 space-y-2 pointer-events-none"
              aria-live="polite"
              aria-label="通知"
            />

            {/* グローバルモーダル領域 */}
            <div 
              id="modal-root" 
              className="fixed inset-0 z-50 pointer-events-none"
            />

            {/* テーマ初期化スクリプト（FOUC防止） */}
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  // ダークモードの初期化（FOUCを防ぐ）
                  (function() {
                    try {
                      const savedTheme = localStorage.getItem('theme');
                      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                      
                      if (savedTheme === 'dark' || (savedTheme === 'system' && systemDark) || (!savedTheme && systemDark)) {
                        document.documentElement.classList.add('dark');
                      }
                    } catch (e) {
                      console.error('Theme initialization error:', e);
                    }
                  })();
                `
              }}
            />
          </ClientProvider>
        </ThemeProvider>

        {/* 非JavaScript環境用のフォールバック */}
        <noscript>
          <style>
            {`
              .js-only {
                display: none !important;
              }
              .no-js-fallback {
                display: block !important;
              }
            `}
          </style>
          <div className="fixed top-0 left-0 w-full bg-yellow-50 dark:bg-yellow-900 border-b border-yellow-200 dark:border-yellow-800 p-4 z-50">
            <div className="max-w-7xl mx-auto text-center">
              <p className="text-yellow-800 dark:text-yellow-200 font-medium">
                最適な体験のためにJavaScriptを有効にしてください。
              </p>
            </div>
          </div>
        </noscript>
      </body>
    </html>
  );
}
