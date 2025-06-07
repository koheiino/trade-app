// import type { Metadata } from 'next';
// import './globals.css';

// export const metadata: Metadata = {
//   title: 'FXトレード成長日記',
//   description: 'FX trading diary app',
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="ja">
//       <body>{children}</body>
//     </html>
//   );
// }

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'FX Trading Diary',
    template: '%s | FX Trading Diary',
  },
  description: 'FXトレードの成長を記録・分析するダイアリーアプリ',
  keywords: ['FX', 'トレード', '日記', '分析', '成長記録'],
  authors: [{ name: 'FX Trading Diary Team' }],
  creator: 'FX Trading Diary',
  publisher: 'FX Trading Diary',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#171717' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={inter.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
