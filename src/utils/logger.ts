/**
 * 環境に応じたログシステム
 * 開発環境：console出力
 * 本番環境：エラーレポーティングサービスへ送信
 */

export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
}

interface LogContext {
  component?: string;
  action?: string;
  userId?: string;
  [key: string]: unknown;
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';

  private formatMessage(
    level: LogLevel,
    message: string,
    context?: LogContext,
  ): string {
    const timestamp = new Date().toISOString();
    const contextStr = context ? ` | ${JSON.stringify(context)}` : '';
    return `[${timestamp}] ${level.toUpperCase()}: ${message}${contextStr}`;
  }

  debug(message: string, context?: LogContext): void {
    if (this.isDevelopment) {
      console.debug(this.formatMessage(LogLevel.DEBUG, message, context));
    }
  }

  info(message: string, context?: LogContext): void {
    if (this.isDevelopment) {
      console.info(this.formatMessage(LogLevel.INFO, message, context));
    }
    // 本番環境では分析サービスに送信
  }

  warn(message: string, context?: LogContext): void {
    if (this.isDevelopment) {
      console.warn(this.formatMessage(LogLevel.WARN, message, context));
    }
    // 本番環境では監視システムに送信
  }

  error(message: string, error?: Error, context?: LogContext): void {
    const errorContext = {
      ...context,
      stack: error?.stack,
      name: error?.name,
    };

    if (this.isDevelopment) {
      console.error(this.formatMessage(LogLevel.ERROR, message, errorContext));
    }
    // 本番環境ではエラートラッキングサービス（Sentry等）に送信
  }

  // 認証関連の専用ログ
  auth(action: string, success: boolean, context?: LogContext): void {
    const authContext = {
      ...context,
      component: 'auth',
      action,
      success,
    };

    if (success) {
      this.info(`Authentication ${action} successful`, authContext);
    } else {
      this.warn(`Authentication ${action} failed`, authContext);
    }
  }

  // API関連の専用ログ
  api(method: string, url: string, status: number, context?: LogContext): void {
    const apiContext = {
      ...context,
      component: 'api',
      method,
      url,
      status,
    };

    if (status >= 200 && status < 300) {
      this.debug(`API ${method} ${url} - ${status}`, apiContext);
    } else if (status >= 400) {
      this.error(`API ${method} ${url} - ${status}`, undefined, apiContext);
    }
  }
}

export const logger = new Logger();
