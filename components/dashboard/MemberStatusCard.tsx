"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: 'Active', value: 284, percentage: '74%', color: '#7c3aed' },
  { name: 'Grace period', value: 31, percentage: '8%', color: '#f59e0b' },
  { name: 'Expired', value: 62, percentage: '16%', color: '#ef4444' },
  { name: 'Paused', value: 9, percentage: '2%', color: '#d1d5db' },
];

export function MemberStatusCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 h-full flex flex-col min-h-[320px]">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-semibold text-gray-900">Member Status</h3>
        <button className="text-xs text-violet-600 font-medium hover:text-violet-700 transition-colors">
          View all &rarr;
        </button>
      </div>

      <div className="flex-1 flex flex-col sm:flex-row items-center gap-6 xl:gap-8 justify-center">
        {/* Donut Container */}
        <div className="relative w-[130px] h-[130px] shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={62}
                paddingAngle={2}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-xl font-bold text-gray-900 leading-none">284</span>
            <span className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider">Active</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-3 w-full sm:w-auto flex-1 max-w-[200px]">
          {data.map((item) => (
            <div key={item.name} className="flex items-center">
              <div 
                className="w-2 h-2 rounded-sm mr-2 shrink-0" 
                style={{ backgroundColor: item.color }} 
              />
              <span className="text-xs text-gray-500 mr-auto">{item.name}</span>
              <span className="text-xs font-medium text-gray-900 mr-2">{item.value}</span>
              <span className="text-[10px] text-gray-400 w-8 text-right shrink-0">{item.percentage}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
