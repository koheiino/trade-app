<<<<<<< HEAD
import type { Metadata } from 'next'
import './globals.css'
=======
import type { Metadata } from 'next';
import './globals.css';
>>>>>>> origin/main

export const metadata: Metadata = {
  title: 'FXトレード成長日記',
  description: 'FX trading diary app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
<<<<<<< HEAD
    <html lang="ja">
      <body>{children}</body>
=======
    <html lang="en">
      <body className="antialiased">{children}</body>
>>>>>>> origin/main
    </html>
  )
}
