// src/components/DashboardCard.jsx

export default function DashboardCard({
  title,
  value,
  growth,
  subtitle,
  icon,
}) {
  return (
    <div className="bg-white rounded-3xl shadow-md p-6 border-l-4 border-indigo-600 hover:shadow-lg transition-all duration-300">
      
      {/* Top Section */}
      <div className="flex justify-between items-start">
        
        <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center">
          {icon}
        </div>

        <span className="bg-green-100 text-green-600 text-sm font-semibold px-3 py-1 rounded-full">
          ↗ {growth}
        </span>
      </div>

      {/* Value */}
      <h2 className="text-4xl font-bold mt-6 text-gray-900">
        {value}
      </h2>

      {/* Title */}
      <h3 className="text-lg font-semibold mt-3 text-gray-800">
        {title}
      </h3>

      {/* Subtitle */}
      <p className="text-sm text-gray-500 mt-1">
        {subtitle}
      </p>
    </div>
  );
}