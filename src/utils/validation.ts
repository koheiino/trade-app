import type {
  AuthValidationErrors,
  LoginCredentials,
  RegisterCredentials,
} from '@/types/auth';
import type { TradeInput } from '@/types/trade';
import type { EmotionInput } from '@/types/emotion';
import type { JournalInput } from '@/types/journal';
import { ValidationError } from './errorHandler';

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePassword(password: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push('パスワードは8文字以上である必要があります');
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('大文字を1文字以上含める必要があります');
  }

  if (!/[a-z]/.test(password)) {
    errors.push('小文字を1文字以上含める必要があります');
  }

  if (!/\d/.test(password)) {
    errors.push('数字を1文字以上含める必要があります');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function validateLoginCredentials(
  credentials: LoginCredentials,
): AuthValidationErrors {
  const errors: AuthValidationErrors = {};

  if (!credentials.email) {
    errors.email = 'メールアドレスを入力してください';
  } else if (!validateEmail(credentials.email)) {
    errors.email = '有効なメールアドレスを入力してください';
  }

  if (!credentials.password) {
    errors.password = 'パスワードを入力してください';
  }

  return errors;
}

export function validateRegisterCredentials(
  credentials: RegisterCredentials,
): AuthValidationErrors {
  const errors: AuthValidationErrors = {};

  if (!credentials.email) {
    errors.email = 'メールアドレスを入力してください';
  } else if (!validateEmail(credentials.email)) {
    errors.email = '有効なメールアドレスを入力してください';
  }

  if (!credentials.password) {
    errors.password = 'パスワードを入力してください';
  } else {
    const passwordValidation = validatePassword(credentials.password);
    if (!passwordValidation.isValid) {
      errors.password = passwordValidation.errors[0];
    }
  }

  if (!credentials.confirmPassword) {
    errors.confirmPassword = 'パスワードの確認を入力してください';
  } else if (credentials.password !== credentials.confirmPassword) {
    errors.confirmPassword = 'パスワードが一致しません';
  }

  return errors;
}

export function validateTradeInput(trade: TradeInput): void {
  const errors: string[] = [];

  if (!trade.symbol?.trim()) {
    errors.push('銘柄を入力してください');
  }

  if (!trade.type) {
    errors.push('取引タイプを選択してください');
  }

  if (!trade.entryPrice || trade.entryPrice <= 0) {
    errors.push('有効なエントリー価格を入力してください');
  }

  if (trade.exitPrice && trade.exitPrice <= 0) {
    errors.push('有効なエグジット価格を入力してください');
  }

  if (!trade.quantity || trade.quantity <= 0) {
    errors.push('有効な数量を入力してください');
  }

  if (!trade.entryTime) {
    errors.push('エントリー時間を入力してください');
  }

  if (!trade.market) {
    errors.push('市場を選択してください');
  }

  if (errors.length > 0) {
    throw new ValidationError('取引データが無効です', { errors });
  }
}

export function validateEmotionInput(emotion: EmotionInput): void {
  const errors: string[] = [];

  if (!emotion.type) {
    errors.push('感情タイプを選択してください');
  }

  if (!emotion.intensity || emotion.intensity < 1 || emotion.intensity > 5) {
    errors.push('感情の強度は1から5の間で選択してください');
  }

  if (emotion.description && emotion.description.length > 500) {
    errors.push('感情の説明は500文字以内で入力してください');
  }

  if (errors.length > 0) {
    throw new ValidationError('感情データが無効です', { errors });
  }
}

export function validateJournalInput(journal: JournalInput): void {
  const errors: string[] = [];

  if (!journal.title?.trim()) {
    errors.push('タイトルを入力してください');
  } else if (journal.title.length > 100) {
    errors.push('タイトルは100文字以内で入力してください');
  }

  if (!journal.content?.trim()) {
    errors.push('内容を入力してください');
  } else if (journal.content.length > 10000) {
    errors.push('内容は10000文字以内で入力してください');
  }

  if (!journal.date) {
    errors.push('日付を選択してください');
  }

  if (journal.mood && (journal.mood < 1 || journal.mood > 10)) {
    errors.push('気分は1から10の間で選択してください');
  }

  if (errors.length > 0) {
    throw new ValidationError('ジャーナルデータが無効です', { errors });
  }
}

export function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, '');
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function isValidDate(date: string): boolean {
  const parsed = new Date(date);
  return !Number.isNaN(parsed.getTime());
}

export function validateFileUpload(
  file: File,
  options: {
    maxSize?: number;
    allowedTypes?: string[];
  } = {},
): void {
  const errors: string[] = [];
  const {
    maxSize = 5 * 1024 * 1024,
    allowedTypes = ['image/jpeg', 'image/png', 'image/webp'],
  } = options;

  if (file.size > maxSize) {
    errors.push(
      `ファイルサイズは${Math.round(maxSize / (1024 * 1024))}MB以下にしてください`,
    );
  }

  if (!allowedTypes.includes(file.type)) {
    errors.push('対応していないファイル形式です');
  }

  if (errors.length > 0) {
    throw new ValidationError('ファイルが無効です', { errors });
  }
}
