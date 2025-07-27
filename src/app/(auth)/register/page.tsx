'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LocalAuthService } from '@/lib/local-auth';
import type { LocalUser } from '@/lib/local-auth';

export default function RegisterPageSimple() {
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLocalLogin = () => {
    console.log('Attempting local login with:', email, password);
    const user = LocalAuthService.login(email, password);
    if (user) {
      console.log('Login successful:', user);
      router.push('/dashboard');
    } else {
      console.log('Login failed');
      alert('ログインに失敗しました');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h1>Register Page (Simple)</h1>
      
      <button
        onClick={() => {
          console.log('Button clicked, current dialogOpen:', dialogOpen);
          setDialogOpen(!dialogOpen);
          console.log('Setting dialogOpen to:', !dialogOpen);
        }}
        style={{
          padding: '10px 20px',
          backgroundColor: '#ff6b35',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginBottom: '20px',
        }}
      >
        開発・緊急時認証 {dialogOpen ? '(開いている)' : '(閉じている)'}
      </button>

      {dialogOpen && (
        <div style={{
          border: '2px solid #ff6b35',
          padding: '20px',
          borderRadius: '8px',
          backgroundColor: '#fff',
        }}>
          <h3>ローカル認証</h3>
          
          <div style={{ marginBottom: '10px' }}>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@fxtradingdiary.com"
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '4px',
              }}
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="FXDiary2024!"
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '4px',
              }}
            />
          </div>

          <button
            onClick={handleLocalLogin}
            style={{
              padding: '10px 20px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginRight: '10px',
            }}
          >
            ログイン
          </button>

          <button
            onClick={() => setDialogOpen(false)}
            style={{
              padding: '10px 20px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            閉じる
          </button>

          <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
            <p>使用可能アカウント:</p>
            <p>admin@fxtradingdiary.com / FXDiary2024!</p>
            <p>dev@fxtradingdiary.com / DevMode2024!</p>
          </div>
        </div>
      )}
    </div>
  );
}