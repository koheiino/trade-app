import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'FXトレード成長日記',
  description: 'FX trading diary app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
