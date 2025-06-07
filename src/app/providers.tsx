'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // データの再フェッチ間隔
            staleTime: 60 * 1000, // 1分
            // キャッシュ保持時間
            cacheTime: 5 * 60 * 1000, // 5分
            // ウィンドウフォーカス時の再フェッチを無効化
            refetchOnWindowFocus: false,
            // リトライ設定
            retry: 1,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
