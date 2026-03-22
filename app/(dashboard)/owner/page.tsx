import { 
  Users, UserPlus, Clock, IndianRupee, AlertCircle, TrendingUp, CreditCard
} from 'lucide-react';
import { RevenueCard } from '@/components/dashboard/RevenueCard';
import { MemberStatusCard } from '@/components/dashboard/MemberStatusCard';
import { ExpiringCard } from '@/components/dashboard/ExpiringCard';

const checkInsData = [
  { initials:'RK', bg:'bg-violet-100', color:'text-violet-700', name:'Rahul Kumar',  plan:'Monthly · Standard',   time:'9:42 AM' },
  { initials:'PS', bg:'bg-emerald-100',color:'text-emerald-700',name:'Priya Sharma', plan:'Quarterly · Premium',  time:'9:38 AM' },
  { initials:'AM', bg:'bg-blue-100',   color:'text-blue-700',   name:'Arjun Mehta',  plan:'Monthly · Standard',   time:'9:31 AM' },
  { initials:'SJ', bg:'bg-pink-100',   color:'text-pink-700',   name:'Sneha Joshi',  plan:'Annual · Premium',     time:'9:17 AM' },
  { initials:'VD', bg:'bg-amber-100',  color:'text-amber-700',  name:'Vikram Desai', plan:'Monthly · Standard',   time:'9:05 AM' },
];

export default function OwnerDashboardPage() {
  return (
    <div className="flex flex-col gap-6 max-w-[1400px] mx-auto pb-10">
      
      {/* SECTION 1 - PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Welcome back! Here&apos;s what&apos;s happening today.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium border border-gray-200 bg-white text-gray-700 rounded-xl hover:border-violet-300 hover:text-violet-700 transition-colors">
            <CreditCard size={18} />
            Take Payment
          </button>
          <button className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium bg-violet-600 text-white rounded-xl hover:bg-violet-700 shadow-lg shadow-violet-200 transition-all">
            <UserPlus size={18} />
            Add Member
          </button>
        </div>
      </div>

      {/* SECTION 2 - KPI STRIP */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        
        {/* Active Members */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-xs text-gray-500 font-medium">Active Members</span>
            <div className="bg-violet-50 text-violet-600 w-8 h-8 rounded-lg flex items-center justify-center">
              <Users size={16} />
            </div>
          </div>
          <div className="mt-3">
            <h4 className="text-2xl font-bold text-gray-900">284</h4>
            <div className="flex items-center text-emerald-600 text-xs font-medium mt-1 gap-1">
              <TrendingUp size={14} />
              +12 this month
            </div>
          </div>
        </div>

        {/* New Members */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-xs text-gray-500 font-medium">New Members (30d)</span>
            <div className="bg-emerald-50 text-emerald-600 w-8 h-8 rounded-lg flex items-center justify-center">
              <UserPlus size={16} />
            </div>
          </div>
          <div className="mt-3">
            <h4 className="text-2xl font-bold text-gray-900">24</h4>
            <div className="flex items-center text-emerald-600 text-xs font-medium mt-1 gap-1">
              <TrendingUp size={14} />
              +18% vs last month
            </div>
          </div>
        </div>

        {/* Expiring Soon */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-xs text-gray-500 font-medium">Expiring Soon (7d)</span>
            <div className="bg-amber-50 text-amber-600 w-8 h-8 rounded-lg flex items-center justify-center">
              <Clock size={16} />
            </div>
          </div>
          <div className="mt-3">
            <h4 className="text-2xl font-bold text-gray-900">11</h4>
            <div className="flex items-center text-amber-600 text-xs font-medium mt-1 gap-1">
              3 expire today
            </div>
          </div>
        </div>

        {/* Revenue */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-xs text-gray-500 font-medium">Revenue (this month)</span>
            <div className="bg-blue-50 text-blue-600 w-8 h-8 rounded-lg flex items-center justify-center">
              <IndianRupee size={16} />
            </div>
          </div>
          <div className="mt-3">
            <h4 className="text-2xl font-bold text-gray-900">₹1.8L</h4>
            <div className="flex items-center text-emerald-600 text-xs font-medium mt-1 gap-1">
              <TrendingUp size={14} />
              82% collected
            </div>
          </div>
        </div>

        {/* Pending Dues */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-xs text-gray-500 font-medium">Pending Dues</span>
            <div className="bg-red-50 text-red-500 w-8 h-8 rounded-lg flex items-center justify-center">
              <AlertCircle size={16} />
            </div>
          </div>
          <div className="mt-3">
            <h4 className="text-2xl font-bold text-gray-900">₹38,200</h4>
            <div className="flex items-center text-red-500 text-xs font-medium mt-1 gap-1">
              8 overdue 7d+
            </div>
          </div>
        </div>

      </div>

      {/* SECTION 3 - ALERTS STRIP */}
      <div className="flex flex-col gap-3">
        {/* Danger alert */}
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
            <p className="text-sm text-red-800">
              3 memberships expire today &mdash; Rahul Mehta, Priya Singh, and 1 more.
            </p>
          </div>
          <button className="text-sm font-medium text-violet-600 hover:text-violet-700 transition-colors shrink-0 whitespace-nowrap">
            View members &rarr;
          </button>
        </div>

        {/* Warning alert */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
            <p className="text-sm text-amber-800">
              ₹12,400 in dues overdue for more than 7 days from 8 members.
            </p>
          </div>
          <button className="text-sm font-medium text-violet-600 hover:text-violet-700 transition-colors shrink-0 whitespace-nowrap">
            View dues &rarr;
          </button>
        </div>
      </div>

      {/* SECTION 4 - CHARTS ROW */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <RevenueCard />
        <MemberStatusCard />
      </div>

      {/* SECTION 5 - BOTTOM ROW */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        
        {/* Today's Check-ins */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 h-full flex flex-col">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
            <div className="flex items-center gap-3">
              <h3 className="text-sm font-semibold text-gray-900">Today&apos;s Check-ins</h3>
              <span className="bg-violet-100 text-violet-700 text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 tracking-tight">
                47 today
              </span>
            </div>
            <button className="text-xs text-violet-600 font-medium hover:text-violet-700 transition-colors text-left whitespace-nowrap">
              View all &rarr;
            </button>
          </div>
          
          <div className="flex flex-col flex-1">
            {checkInsData.map((item, idx) => (
              <div 
                key={`${item.name}-${idx}`} 
                className="flex items-center pt-3 pb-3 border-b border-gray-50 last:border-0 last:pb-0"
              >
                <div 
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-bold mr-3 ${item.bg} ${item.color}`}
                >
                  {item.initials}
                </div>
                <div className="flex flex-col flex-1 min-w-0 mr-3">
                  <span className="text-sm font-medium text-gray-900 truncate">{item.name}</span>
                  <span className="text-xs text-gray-500 truncate">{item.plan}</span>
                </div>
                <div className="text-xs text-gray-400 shrink-0">
                  {item.time}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Expiring Memberships */}
        <ExpiringCard />
      </div>

    </div>
  );
}
