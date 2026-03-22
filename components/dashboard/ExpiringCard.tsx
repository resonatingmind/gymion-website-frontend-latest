"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const todayData = [
  { initials:'RM', bg:'bg-pink-100',   color:'text-pink-700',   name:'Rahul Mehta',  plan:'Monthly · Standard',  badge:'Expires today', badgeType:'danger' },
  { initials:'PS', bg:'bg-blue-100',   color:'text-blue-700',   name:'Priya Singh',  plan:'Quarterly · Standard',badge:'Expires today', badgeType:'danger' },
  { initials:'KP', bg:'bg-emerald-100',color:'text-emerald-700',name:'Kiran Patel',  plan:'Monthly · Premium',   badge:'Expires today', badgeType:'danger' },
];

const soonData = [
  { initials:'RM', bg:'bg-pink-100',   color:'text-pink-700',   name:'Rahul Mehta',  plan:'Monthly · Standard',   badge:'Expires today', badgeType:'danger' },
  { initials:'NK', bg:'bg-violet-100', color:'text-violet-700', name:'Neha Kapoor',  plan:'Monthly · Standard',   badge:'In 2 days',     badgeType:'warn'   },
  { initials:'AV', bg:'bg-amber-100',  color:'text-amber-700',  name:'Amit Verma',   plan:'Annual · Premium',     badge:'In 4 days',     badgeType:'warn'   },
  { initials:'SB', bg:'bg-emerald-100',color:'text-emerald-700',name:'Swati Bhat',   plan:'Monthly · Standard',   badge:'In 6 days',     badgeType:'warn'   },
  { initials:'MG', bg:'bg-pink-100',   color:'text-pink-700',   name:'Manish Gupta', plan:'Quarterly · Basic',    badge:'In 7 days',     badgeType:'warn'   },
];

type Period = 'today' | 'soon';

export function ExpiringCard() {
  const [period, setPeriod] = useState<Period>('today');
  
  const data = period === 'today' ? todayData : soonData;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm font-semibold text-gray-900">Expiring Memberships</h3>
        <div className="flex items-center gap-1 bg-gray-50 p-1 rounded-xl">
          <button
            onClick={() => setPeriod('today')}
            className={cn(
              "text-xs px-2.5 py-1 rounded-lg transition-colors",
              period === 'today' 
                ? "bg-violet-600 text-white shadow-sm"
                : "text-gray-500 hover:text-gray-800"
            )}
          >
            Today
          </button>
          <button
            onClick={() => setPeriod('soon')}
            className={cn(
              "text-xs px-2.5 py-1 rounded-lg transition-colors",
              period === 'soon' 
                ? "bg-violet-600 text-white shadow-sm"
                : "text-gray-500 hover:text-gray-800"
            )}
          >
            7 days
          </button>
        </div>
      </div>

      {/* List */}
      <div className="flex flex-col flex-1">
        {data.map((item, idx) => (
          <div 
            key={`${item.name}-${idx}`} 
            className="flex items-center pt-3 pb-3 border-b border-gray-50 last:border-0 last:pb-0"
          >
            <div 
              className={cn(
                "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-bold mr-3",
                item.bg,
                item.color
              )}
            >
              {item.initials}
            </div>
            <div className="flex flex-col flex-1 min-w-0 mr-3">
              <span className="text-sm font-medium text-gray-900 truncate">{item.name}</span>
              <span className="text-xs text-gray-500 truncate">{item.plan}</span>
            </div>
            
            <div className="flex items-center gap-2 shrink-0">
              <span 
                className={cn(
                  "text-[10px] font-semibold px-2 py-0.5 rounded-md",
                  item.badgeType === 'danger' 
                    ? "bg-red-100 text-red-700 border border-red-200" 
                    : "bg-amber-100 text-amber-700 border border-amber-200"
                )}
              >
                {item.badge}
              </span>
              <button className="text-xs text-violet-600 font-medium hover:text-violet-700 transition-colors ml-1 whitespace-nowrap">
                Renew &rarr;
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
