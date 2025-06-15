'use client';

import { useEffect } from 'react';

export function useClientScripts() {
  useEffect(() => {
    // スクロール進捗の計算
    function updateScrollProgress() {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      document.documentElement.style.setProperty('--scroll-progress', scrollPercent + '%');
    }

    // パフォーマンス最適化されたスクロールリスナー
    let ticking = false;
    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateScrollProgress();
          ticking = false;
        });
        ticking = true;
      }
    }

    // フォントロード最適化
    function optimizeFontLoading() {
      if ('fonts' in document) {
        Promise.all([
          document.fonts.load('400 16px Inter'),
          document.fonts.load('500 16px Inter'),
          document.fonts.load('600 16px Inter'),
          document.fonts.load('700 16px Inter'),
        ]).then(() => {
          document.documentElement.classList.add('fonts-loaded');
        }).catch(console.error);
      }
    }

    // ビューポート高さの修正（モバイル対応）
    function setVH() {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', vh + 'px');
    }

    // レイアウトシフト防止
    function preventLayoutShift() {
      // 画像の遅延読み込み対応
      if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target as HTMLImageElement;
              const src = img.dataset.src;
              if (src) {
                img.src = src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
              }
            }
          });
        });

        // 遅延読み込み画像を監視
        document.querySelectorAll('img[data-src]').forEach(img => {
          imageObserver.observe(img);
        });
      }
    }

    // システムテーマ変更の監視
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    function handleThemeChange(e: MediaQueryListEvent) {
      if (localStorage.getItem('theme') === 'system' || !localStorage.getItem('theme')) {
        if (e.matches) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    }

    // 初期化
    optimizeFontLoading();
    setVH();
    preventLayoutShift();
    updateScrollProgress();

    // イベントリスナーの設定
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', setVH, { passive: true });
    mediaQuery.addEventListener('change', handleThemeChange);

    // ページ読み込み完了時
    const handleLoad = () => {
      document.body.classList.add('page-loaded');
      
      // 初期スクロール位置の復元
      if (window.location.hash) {
        setTimeout(() => {
          const element = document.querySelector(window.location.hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    // クリーンアップ
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', setVH);
      mediaQuery.removeEventListener('change', handleThemeChange);
      window.removeEventListener('load', handleLoad);
    };
  }, []);
}
