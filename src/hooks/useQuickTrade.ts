import { useState, useCallback } from 'react';
import { QuickTradeState } from '../types/dashboard';

export function useQuickTrade() {
  const [quickResult, setQuickResult] = useState<'win' | 'loss' | ''>('');
  const [quickAmount, setQuickAmount] = useState('');

  const handleQuickTrade = useCallback(() => {
    if (!quickResult || !quickAmount) return;

    // クイックトレード記録の処理
    console.log('Quick trade recorded:', {
      result: quickResult,
      amount: quickAmount,
    });

    // フォームをリセット
    setQuickResult('');
    setQuickAmount('');
  }, [quickResult, quickAmount]);

  const selectResult = useCallback((result: 'win' | 'loss') => {
    setQuickResult(result);
  }, []);

  const isValid = quickResult && quickAmount;

  return {
    quickResult,
    quickAmount,
    setQuickAmount,
    selectResult,
    handleQuickTrade,
    isValid,
  };
}
