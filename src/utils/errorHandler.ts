import type { ApiError } from '@/types/api';

export class AppError extends Error {
  public readonly code: string;
  public readonly details?: Record<string, unknown>;
  public readonly isOperational: boolean;

  constructor(
    message: string,
    code = 'UNKNOWN_ERROR',
    details?: Record<string, unknown>,
    isOperational = true,
  ) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.details = details;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: Record<string, unknown>) {
    super(message, 'VALIDATION_ERROR', details);
    this.name = 'ValidationError';
  }
}

export class AuthenticationError extends AppError {
  constructor(message = 'Authentication required') {
    super(message, 'AUTH_ERROR');
    this.name = 'AuthenticationError';
  }
}

export class AuthorizationError extends AppError {
  constructor(message = 'Insufficient permissions') {
    super(message, 'AUTHORIZATION_ERROR');
    this.name = 'AuthorizationError';
  }
}

export class NetworkError extends AppError {
  constructor(message = 'Network request failed') {
    super(message, 'NETWORK_ERROR');
    this.name = 'NetworkError';
  }
}

export class ServerError extends AppError {
  constructor(message = 'Internal server error') {
    super(message, 'SERVER_ERROR');
    this.name = 'ServerError';
  }
}

export function handleError(error: unknown): ApiError {
  if (error instanceof AppError) {
    return {
      message: error.message,
      code: error.code,
      details: error.details,
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message,
      code: 'UNKNOWN_ERROR',
    };
  }

  if (typeof error === 'string') {
    return {
      message: error,
      code: 'UNKNOWN_ERROR',
    };
  }

  return {
    message: 'An unexpected error occurred',
    code: 'UNKNOWN_ERROR',
    details: { originalError: error },
  };
}

export function getErrorMessage(error: unknown): string {
  const handledError = handleError(error);
  return handledError.message;
}

export function isOperationalError(error: unknown): boolean {
  return error instanceof AppError && error.isOperational;
}

export function logError(
  error: unknown,
  context?: Record<string, unknown>,
): void {
  const handledError = handleError(error);

  console.error('Error occurred:', {
    message: handledError.message,
    code: handledError.code,
    details: handledError.details,
    context,
    timestamp: new Date().toISOString(),
  });

  // In production, send to error reporting service
  if (process.env.NODE_ENV === 'production') {
    // TODO: Integrate with error reporting service (e.g., Sentry)
  }
}

export const ErrorMessages = {
  AUTH: {
    INVALID_CREDENTIALS: 'メールアドレスまたはパスワードが正しくありません',
    EMAIL_NOT_VERIFIED: 'メールアドレスの確認が必要です',
    PASSWORD_TOO_WEAK: 'パスワードが十分に強力ではありません',
    EMAIL_ALREADY_EXISTS: 'このメールアドレスは既に使用されています',
    REGISTRATION_FAILED: 'アカウントの作成に失敗しました',
    LOGIN_FAILED: 'ログインに失敗しました',
    LOGOUT_FAILED: 'ログアウトに失敗しました',
    TOKEN_EXPIRED: 'セッションが期限切れです。再ログインしてください',
  },
  TRADE: {
    INVALID_DATA: '取引データが無効です',
    SAVE_FAILED: '取引の保存に失敗しました',
    DELETE_FAILED: '取引の削除に失敗しました',
    NOT_FOUND: '取引が見つかりません',
    DUPLICATE_ENTRY: '重複する取引エントリです',
  },
  EMOTION: {
    INVALID_TYPE: '無効な感情タイプです',
    SAVE_FAILED: '感情ログの保存に失敗しました',
    ANALYSIS_FAILED: 'AI分析に失敗しました',
  },
  JOURNAL: {
    SAVE_FAILED: 'ジャーナルの保存に失敗しました',
    IMAGE_UPLOAD_FAILED: '画像のアップロードに失敗しました',
    INVALID_FORMAT: '無効なファイル形式です',
    FILE_TOO_LARGE: 'ファイルサイズが大きすぎます',
  },
  NETWORK: {
    CONNECTION_FAILED: 'ネットワークに接続できません',
    TIMEOUT: 'リクエストがタイムアウトしました',
    SERVER_ERROR: 'サーバーエラーが発生しました',
  },
  GENERAL: {
    UNKNOWN: '予期しないエラーが発生しました',
    PERMISSION_DENIED: '権限がありません',
    RATE_LIMIT_EXCEEDED: 'リクエスト回数の上限に達しました',
  },
} as const;
