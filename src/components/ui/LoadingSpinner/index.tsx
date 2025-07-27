interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function LoadingSpinner({
  size = 'md',
  className = '',
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-2',
    lg: 'h-12 w-12 border-4',
  };

  return (
    <output
      className={`animate-spin rounded-full border-b-neutral-900 ${sizeClasses[size]} ${className}`}
      aria-label="読み込み中"
    >
      <span className="sr-only">読み込み中...</span>
    </output>
  );
}
