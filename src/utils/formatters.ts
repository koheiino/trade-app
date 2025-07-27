/**
 * 数値を通貨形式でフォーマットする
 */
export function formatCurrency(
  amount: number,
  currency = 'JPY',
  locale = 'ja-JP',
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: currency === 'JPY' ? 0 : 2,
  }).format(amount);
}

/**
 * 数値をパーセンテージ形式でフォーマットする
 */
export function formatPercentage(
  value: number,
  decimals = 1,
  locale = 'ja-JP',
): string {
  return new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value / 100);
}

/**
 * 大きな数値を短縮形式でフォーマットする (例: 1K, 1M)
 */
export function formatCompactNumber(value: number, locale = 'ja-JP'): string {
  return new Intl.NumberFormat(locale, {
    notation: 'compact',
    compactDisplay: 'short',
  }).format(value);
}

/**
 * 日付をフォーマットする
 */
export function formatDate(
  date: string | Date,
  options: Intl.DateTimeFormatOptions = {},
  locale = 'ja-JP',
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  if (Number.isNaN(dateObj.getTime())) {
    return '無効な日付';
  }

  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  };

  return new Intl.DateTimeFormat(locale, defaultOptions).format(dateObj);
}

/**
 * 日付を相対的な形式でフォーマットする (例: 2日前)
 */
export function formatRelativeTime(
  date: string | Date,
  locale = 'ja-JP',
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'たった今';
  }

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

  if (diffInSeconds < 3600) {
    return rtf.format(-Math.floor(diffInSeconds / 60), 'minute');
  }

  if (diffInSeconds < 86400) {
    return rtf.format(-Math.floor(diffInSeconds / 3600), 'hour');
  }

  if (diffInSeconds < 2592000) {
    return rtf.format(-Math.floor(diffInSeconds / 86400), 'day');
  }

  if (diffInSeconds < 31536000) {
    return rtf.format(-Math.floor(diffInSeconds / 2592000), 'month');
  }

  return rtf.format(-Math.floor(diffInSeconds / 31536000), 'year');
}

/**
 * 時間を「HH:MM」形式でフォーマットする
 */
export function formatTime(date: string | Date, locale = 'ja-JP'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  return new Intl.DateTimeFormat(locale, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(dateObj);
}

/**
 * ファイルサイズをフォーマットする
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';

  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${Number.parseFloat((bytes / k ** i).toFixed(2))} ${sizes[i]}`;
}

/**
 * PnL（損益）を色分けしてフォーマットする
 */
export function formatPnL(amount: number): {
  formatted: string;
  color: string;
  isPositive: boolean;
} {
  const isPositive = amount >= 0;
  const formatted = formatCurrency(Math.abs(amount));

  return {
    formatted: isPositive ? `+${formatted}` : `-${formatted}`,
    color: isPositive ? 'text-green-600' : 'text-red-600',
    isPositive,
  };
}

/**
 * 勝率をフォーマットする
 */
export function formatWinRate(wins: number, total: number): string {
  if (total === 0) return '0%';
  const rate = (wins / total) * 100;
  return `${rate.toFixed(1)}%`;
}

/**
 * プロフィットファクターをフォーマットする
 */
export function formatProfitFactor(
  grossProfit: number,
  grossLoss: number,
): string {
  if (grossLoss === 0) {
    return grossProfit > 0 ? '∞' : '0.00';
  }
  const pf = grossProfit / Math.abs(grossLoss);
  return pf.toFixed(2);
}

/**
 * テキストを切り詰める
 */
export function truncateText(text: string, maxLength = 100): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}

/**
 * 銘柄名をフォーマットする
 */
export function formatSymbol(symbol: string): string {
  return symbol.toUpperCase().replace(/[^A-Z0-9]/g, '');
}
