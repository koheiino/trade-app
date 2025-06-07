import type { StatCardProps } from '../../../types/dashboard';

export default function StatCard({
  icon: Icon,
  iconColor,
  iconBg,
  title,
  value,
  subtitle,
  positive = false,
}: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl ${iconBg}`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
        <span className="text-xs text-gray-500 font-medium">{title}</span>
      </div>
      <p
        className={`text-2xl font-bold mb-1 ${
          positive ? 'text-green-600' : 'text-gray-900'
        }`}
      >
        {value}
      </p>
      <p className="text-sm text-gray-600">{subtitle}</p>
    </div>
  );
}
