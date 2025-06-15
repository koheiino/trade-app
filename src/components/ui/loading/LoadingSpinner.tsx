'use client';

import { TrendingUp, Activity, BarChart3, DollarSign } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'dots' | 'pulse' | 'bounce' | 'trading';
  className?: string;
}

export function LoadingSpinner({ 
  size = 'md', 
  variant = 'default',
  className = ''
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  if (variant === 'dots') {
    return (
      <div className={`flex items-center justify-center space-x-2 ${className}`}>
        <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce"></div>
      </div>
    );
  }

  if (variant === 'pulse') {
    return (
      <div className={`${sizeClasses[size]} ${className}`}>
        <div className="w-full h-full bg-blue-600 dark:bg-blue-400 rounded-full animate-pulse"></div>
      </div>
    );
  }

  if (variant === 'bounce') {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <div className={`${sizeClasses[size]} bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-bounce`}></div>
      </div>
    );
  }

  if (variant === 'trading') {
    return (
      <div className={`flex flex-col items-center justify-center space-y-4 ${className}`}>
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-200 dark:border-blue-800 rounded-full"></div>
          <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-600 dark:border-blue-400 rounded-full border-t-transparent animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400 animate-pulse" />
          </div>
        </div>
        <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400">
          <span>データを読み込み中</span>
          <div className="flex space-x-1">
            <div className="w-1 h-1 bg-current rounded-full animate-bounce [animation-delay:0ms]"></div>
            <div className="w-1 h-1 bg-current rounded-full animate-bounce [animation-delay:150ms]"></div>
            <div className="w-1 h-1 bg-current rounded-full animate-bounce [animation-delay:300ms]"></div>
          </div>
        </div>
      </div>
    );
  }

  // デフォルトスピナー
  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <div className="w-full h-full border-2 border-blue-200 dark:border-blue-800 rounded-full"></div>
      <div className="absolute top-0 left-0 w-full h-full border-2 border-blue-600 dark:border-blue-400 rounded-full border-t-transparent animate-spin"></div>
    </div>
  );
}

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'card';
  lines?: number;
  animation?: 'pulse' | 'wave' | 'shimmer';
}

export function Skeleton({ 
  className = '', 
  variant = 'rectangular',
  lines = 1,
  animation = 'pulse'
}: SkeletonProps) {
  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'animate-pulse',
    shimmer: 'relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent',
  };

  if (variant === 'text') {
    return (
      <div className={`space-y-2 ${className}`}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={`h-4 bg-gray-200 dark:bg-gray-700 rounded ${animationClasses[animation]} ${
              index === lines - 1 ? 'w-3/4' : 'w-full'
            }`}
          />
        ))}
      </div>
    );
  }

  if (variant === 'circular') {
    return (
      <div className={`w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full ${animationClasses[animation]} ${className}`} />
    );
  }

  if (variant === 'card') {
    return (
      <div className={`space-y-4 p-6 ${className}`}>
        <div className="flex items-center space-x-4">
          <div className={`w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full ${animationClasses[animation]}`} />
          <div className="flex-1 space-y-2">
            <div className={`h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 ${animationClasses[animation]}`} />
            <div className={`h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 ${animationClasses[animation]}`} />
          </div>
        </div>
        <div className="space-y-2">
          <div className={`h-4 bg-gray-200 dark:bg-gray-700 rounded ${animationClasses[animation]}`} />
          <div className={`h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 ${animationClasses[animation]}`} />
          <div className={`h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6 ${animationClasses[animation]}`} />
        </div>
      </div>
    );
  }

  // rectangular (default)
  return (
    <div className={`h-4 bg-gray-200 dark:bg-gray-700 rounded ${animationClasses[animation]} ${className}`} />
  );
}

interface LoadingPageProps {
  message?: string;
  progress?: number;
}

export function LoadingPage({ 
  message = "データを読み込み中...", 
  progress 
}: LoadingPageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center space-y-8 p-8">
        {/* メインローディングアイコン */}
        <div className="relative">
          <div className="w-24 h-24 mx-auto">
            <div className="absolute inset-0 border-4 border-blue-200 dark:border-blue-800 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-blue-600 dark:border-blue-400 rounded-full border-t-transparent animate-spin"></div>
            <div className="absolute inset-0 border-4 border-purple-600 dark:border-purple-400 rounded-full border-b-transparent animate-spin [animation-direction:reverse] [animation-duration:1.5s]"></div>
          </div>
          
          {/* 中央のアイコン */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>

        {/* フローティングアイコン */}
        <div className="relative w-48 h-24 mx-auto">
          <div className="absolute top-0 left-0 w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center animate-float [animation-delay:0s]">
            <DollarSign className="w-4 h-4 text-green-600 dark:text-green-400" />
          </div>
          <div className="absolute top-0 right-0 w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center animate-float [animation-delay:1s]">
            <BarChart3 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center animate-float [animation-delay:2s]">
            <Activity className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          </div>
        </div>

        {/* メッセージ */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            FX Trading Diary
          </h2>
          <p className="text-gray-600 dark:text-gray-400 animate-pulse">
            {message}
          </p>
        </div>

        {/* プログレスバー */}
        {progress !== undefined && (
          <div className="w-64 mx-auto">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
              <span>読み込み中</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* ローディングドット */}
        <div className="flex items-center justify-center space-x-2">
          <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px); 
          }
          50% { 
            transform: translateY(-10px); 
          }
        }
        
        @keyframes shimmer {
          0% { 
            transform: translateX(-100%); 
          }
          100% { 
            transform: translateX(100%); 
          }
        }
      `}</style>
    </div>
  );
}

// エクスポート
export default {
  LoadingSpinner,
  Skeleton,
  LoadingPage,
};
