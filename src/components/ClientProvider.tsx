'use client';

import { useClientScripts } from '@/hooks/useClientScripts';

export function ClientProvider({ children }: { children: React.ReactNode }) {
  // クライアントサイドスクリプトの初期化
  useClientScripts();
  
  return <>{children}</>;
}
