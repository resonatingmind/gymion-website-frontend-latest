"use client";

import { useState } from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { cn } from "@/lib/utils";

const dataMap = {
  month: {
    labels: ['Mar 1', 'Mar 5', 'Mar 10', 'Mar 15', 'Mar 20', 'Mar 22'],
    data: [18400, 42100, 71300, 98600, 131200, 147600],
    collected: "₹1,47,600",
    collectedSub: "82% of target",
    due: "₹32,400",
    dueSub: "From 18 members",
  },
  week: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    data: [4200, 6800, 3100, 7400, 5600, 9200, 2400],
    collected: "₹38,700",
    collectedSub: "This week",
    due: "₹8,100",
    dueSub: "From 5 members",
  },
  today: {
    labels: ['6am', '8am', '10am', '12pm', '2pm', '4pm', '6pm'],
    data: [0, 1200, 4800, 3200, 2100, 1800, 900],
    collected: "₹14,000",
    collectedSub: "Today so far",
    due: "₹38,200",
    dueSub: "Total outstanding",
  }
};

type Period = 'today' | 'week' | 'month';

export function RevenueCard() {
  const [period, setPeriod] = useState<Period>('month');

  const currentData = dataMap[period];
  const chartData = currentData.labels.map((label, i) => ({
    name: label,
    value: currentData.data[i]
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-gray-100 shadow-sm rounded-lg p-3">
          <p className="text-sm font-medium text-gray-900">{label}</p>
          <p className="text-sm font-bold text-violet-600">
            ₹{payload[0].value.toLocaleString("en-IN")}
          </p>
        </div>
      );
    }
    return null;
  };

  const formatYAxis = (tickItem: number) => {
    if (tickItem >= 100000) {
      return `₹${Number(tickItem / 100000).toFixed(1)}L`;
    }
    if (tickItem >= 1000) {
      return `₹${Number(tickItem / 1000).toFixed(0)}k`;
    }
    return `₹${tickItem}`;
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col gap-5 h-full min-h-[320px]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">Revenue</h3>
          <p className="text-xs text-gray-500">March 2026</p>
        </div>
        <div className="flex items-center gap-1 bg-gray-50 p-1 rounded-xl">
          {(['month', 'week', 'today'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={cn(
                "capitalize text-xs px-2.5 py-1 rounded-lg transition-colors",
                period === p 
                  ? "bg-violet-600 text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-800"
              )}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Summaries */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4">
          <p className="text-xs text-emerald-600 font-medium">Collected</p>
          <p className="text-2xl font-bold text-emerald-700 mt-1">{currentData.collected}</p>
          <p className="text-xs text-emerald-600 mt-0.5">{currentData.collectedSub}</p>
        </div>
        <div className="bg-red-50 border border-red-100 rounded-xl p-4">
          <p className="text-xs text-red-500 font-medium">Due / Pending</p>
          <p className="text-2xl font-bold text-red-600 mt-1">{currentData.due}</p>
          <p className="text-xs text-red-400 mt-0.5">{currentData.dueSub}</p>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[160px] w-full mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: "#9ca3af", fontSize: 10 }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: "#9ca3af", fontSize: 10 }}
              tickFormatter={formatYAxis}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#7c3aed" 
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6, fill: "#7c3aed", stroke: "#fff", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
