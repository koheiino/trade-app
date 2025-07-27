/**
 * グローバルエラーバウンダリー
 */

'use client';

import React, { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { logger } from '@/utils/logger';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    logger.error('React Error Boundary caught error', error, {
      component: 'ErrorBoundary',
      componentStack: errorInfo.componentStack,
      stack: error.stack,
    });

    this.props.onError?.(error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '400px',
            padding: '2rem',
            textAlign: 'center',
          }}
        >
          <AlertCircle
            style={{
              width: '64px',
              height: '64px',
              color: '#ef4444',
              marginBottom: '1rem',
            }}
          />
          <h2
            style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              marginBottom: '0.5rem',
            }}
          >
            エラーが発生しました
          </h2>
          <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
            申し訳ありませんが、予期しないエラーが発生しました。
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details style={{ marginTop: '1rem', textAlign: 'left' }}>
                <summary>エラー詳細（開発環境）</summary>
                <pre
                  style={{
                    background: '#f3f4f6',
                    padding: '1rem',
                    borderRadius: '0.5rem',
                    overflow: 'auto',
                    marginTop: '0.5rem',
                  }}
                >
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              onClick={this.handleRetry}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                backgroundColor: '#1f2937',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: '500',
              }}
            >
              <RefreshCw style={{ width: '16px', height: '16px' }} />
              再試行
            </button>
            <button
              onClick={() => window.location.reload()}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: 'transparent',
                color: '#374151',
                border: '1px solid #d1d5db',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: '500',
              }}
            >
              ページを再読み込み
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
