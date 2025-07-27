

// 管理者アカウントの設定
const ADMIN_ACCOUNTS = [
  {
    email: 'admin@fxtradingdiary.com',
    password: 'FXDiary2024!',
    role: 'admin',
    name: 'System Administrator',
  },
  {
    email: 'dev@fxtradingdiary.com',
    password: 'DevMode2024!',
    role: 'developer',
    name: 'Developer',
  },
] as const;

// デモユーザーアカウント
const DEMO_ACCOUNTS = [
  {
    email: 'demo@example.com',
    password: 'demo123',
    role: 'user',
    name: 'Demo User',
  },
  {
    email: 'test@example.com',
    password: 'test123',
    role: 'user',
    name: 'Test User',
  },
] as const;

export interface LocalUser {
  id: string;
  email: string;
  role: 'admin' | 'developer' | 'user';
  name: string;
  isLocal: true;
  loginTime: string;
}

export class LocalAuthService {
  private static readonly SESSION_KEY = 'fx-diary-local-session';
  private static readonly BYPASS_KEY = 'fx-diary-bypass-mode';

  /**
   * ローカル認証でログイン
   */
  static login(email: string, password: string): LocalUser | null {
    const allAccounts = [...ADMIN_ACCOUNTS, ...DEMO_ACCOUNTS];
    const account = allAccounts.find(
      (acc) => acc.email === email && acc.password === password,
    );

    if (!account) {
      return null;
    }

    const user: LocalUser = {
      id: `local_${account.email.split('@')[0]}`,
      email: account.email,
      role: account.role,
      name: account.name,
      isLocal: true,
      loginTime: new Date().toISOString(),
    };

    // セッションを保存
    this.saveSession(user);
    return user;
  }

  /**
   * バイパスモードでログイン（開発用）
   */
  static bypassLogin(): LocalUser {
    const user: LocalUser = {
      id: 'bypass_user',
      email: 'bypass@local.dev',
      role: 'developer',
      name: 'Bypass User',
      isLocal: true,
      loginTime: new Date().toISOString(),
    };

    this.saveSession(user);
    this.enableBypassMode();
    return user;
  }

  /**
   * セッションを保存
   */
  private static saveSession(user: LocalUser): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.SESSION_KEY, JSON.stringify(user));
    }
  }

  /**
   * セッションを取得
   */
  static getSession(): LocalUser | null {
    if (typeof window === 'undefined') {
      console.log('LocalAuthService.getSession: Window is undefined (SSR)');
      return null;
    }

    try {
      const session = localStorage.getItem(this.SESSION_KEY);
      const result = session ? JSON.parse(session) : null;
      console.log('LocalAuthService.getSession: Retrieved session:', result);
      return result;
    } catch (error) {
      console.log('LocalAuthService.getSession: Error parsing session:', error);
      return null;
    }
  }

  /**
   * ログアウト
   */
  static logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.SESSION_KEY);
      localStorage.removeItem(this.BYPASS_KEY);
    }
  }

  /**
   * バイパスモードを有効化
   */
  static enableBypassMode(): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.BYPASS_KEY, 'true');
    }
  }

  /**
   * バイパスモードかどうか確認
   */
  static isBypassMode(): boolean {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(this.BYPASS_KEY) === 'true';
  }

  /**
   * 管理者かどうか確認
   */
  static isAdmin(user: LocalUser | null): boolean {
    return user?.role === 'admin' || user?.role === 'developer';
  }

  /**
   * セッションが有効かどうか確認
   */
  static isValidSession(user: LocalUser | null): boolean {
    if (!user) {
      console.log('LocalAuthService.isValidSession: No user provided');
      return false;
    }

    // 24時間でセッション期限切れ
    const loginTime = new Date(user.loginTime);
    const now = new Date();
    const diffHours = (now.getTime() - loginTime.getTime()) / (1000 * 60 * 60);
    const isValid = diffHours < 24;
    
    console.log('LocalAuthService.isValidSession: User:', user.email, 'Hours since login:', diffHours, 'Is valid:', isValid);
    return isValid;
  }

  /**
   * アカウント一覧を取得（開発用）
   */
  static getAccountList(): Array<{
    email: string;
    role: string;
    name: string;
  }> {
    return [...ADMIN_ACCOUNTS, ...DEMO_ACCOUNTS].map((acc) => ({
      email: acc.email,
      role: acc.role,
      name: acc.name,
    }));
  }
}
