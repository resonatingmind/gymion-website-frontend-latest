import { CalendarCheck, Clock, TrendingUp } from 'lucide-react';

const dummyCheckins = [
  { id: 1, name: 'Rahul Kumar', time: '9:42 AM', plan: 'Monthly · Standard', date: 'Today' },
  { id: 2, name: 'Priya Sharma', time: '9:38 AM', plan: 'Quarterly · Premium', date: 'Today' },
  { id: 3, name: 'Arjun Mehta', time: '9:31 AM', plan: 'Monthly · Standard', date: 'Today' },
  { id: 4, name: 'Sneha Joshi', time: '9:17 AM', plan: 'Annual · Premium', date: 'Today' },
  { id: 5, name: 'Vikram Desai', time: '9:05 AM', plan: 'Monthly · Standard', date: 'Today' },
  { id: 6, name: 'Pooja Iyer', time: '8:55 AM', plan: 'Monthly · Standard', date: 'Today' },
];

export default function AttendancePage() {
  return (
    <div className="flex flex-col gap-6 max-w-[1400px] mx-auto pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Attendance</h1>
          <p className="text-sm text-gray-500 mt-1">Track daily check-ins and member activity.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-violet-600 text-white rounded-xl hover:bg-violet-700 shadow-lg shadow-violet-200 transition-all">
          <CalendarCheck size={18} />
          Mark Attendance
        </button>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Today's Check-ins", value: '47', icon: CalendarCheck, color: 'bg-violet-50 text-violet-600' },
          { label: 'Peak Hour', value: '8–10 AM', icon: Clock, color: 'bg-blue-50 text-blue-600' },
          { label: 'Avg / Day (30d)', value: '51', icon: TrendingUp, color: 'bg-emerald-50 text-emerald-600' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}>
              <stat.icon size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">{stat.label}</p>
              <p className="text-xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Check-in log */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-900">Today&apos;s Log</h2>
          <span className="bg-violet-100 text-violet-700 text-[11px] font-bold px-2.5 py-1 rounded-full">
            47 check-ins
          </span>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500">Member</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500">Plan</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500">Date</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500">Time</th>
            </tr>
          </thead>
          <tbody>
            {dummyCheckins.map((c) => (
              <tr key={c.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                <td className="px-5 py-3.5 font-medium text-gray-900">{c.name}</td>
                <td className="px-5 py-3.5 text-gray-500">{c.plan}</td>
                <td className="px-5 py-3.5 text-gray-500">{c.date}</td>
                <td className="px-5 py-3.5 text-gray-500">{c.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
