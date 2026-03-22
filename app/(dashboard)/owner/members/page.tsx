import { Users, UserPlus, Search, Filter } from 'lucide-react';

const dummyMembers = [
  { id: 1, name: 'Rahul Kumar', plan: 'Monthly · Standard', status: 'Active', joined: 'Jan 12, 2025', due: 'Apr 12, 2025' },
  { id: 2, name: 'Priya Sharma', plan: 'Quarterly · Premium', status: 'Active', joined: 'Feb 3, 2025', due: 'May 3, 2025' },
  { id: 3, name: 'Arjun Mehta', plan: 'Monthly · Standard', status: 'Expiring Soon', joined: 'Dec 20, 2024', due: 'Mar 25, 2025' },
  { id: 4, name: 'Sneha Joshi', plan: 'Annual · Premium', status: 'Active', joined: 'Mar 1, 2024', due: 'Mar 1, 2026' },
  { id: 5, name: 'Vikram Desai', plan: 'Monthly · Standard', status: 'Overdue', joined: 'Nov 5, 2024', due: 'Mar 5, 2025' },
];

const statusColors: Record<string, string> = {
  'Active': 'bg-emerald-50 text-emerald-700',
  'Expiring Soon': 'bg-amber-50 text-amber-700',
  'Overdue': 'bg-red-50 text-red-600',
};

export default function MembersPage() {
  return (
    <div className="flex flex-col gap-6 max-w-[1400px] mx-auto pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Members</h1>
          <p className="text-sm text-gray-500 mt-1">Manage all your gym members in one place.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-violet-600 text-white rounded-xl hover:bg-violet-700 shadow-lg shadow-violet-200 transition-all">
          <UserPlus size={18} />
          Add Member
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search members..."
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-300"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-200 bg-white text-gray-600 rounded-xl hover:border-violet-300 transition-colors">
          <Filter size={16} />
          Filter
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Members', value: '284', icon: Users },
          { label: 'Active', value: '261', icon: Users },
          { label: 'Overdue', value: '8', icon: Users },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <p className="text-xs text-gray-500 font-medium">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500">Name</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500">Plan</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500">Status</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500">Joined</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500">Due Date</th>
            </tr>
          </thead>
          <tbody>
            {dummyMembers.map((m) => (
              <tr key={m.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                <td className="px-5 py-3.5 font-medium text-gray-900">{m.name}</td>
                <td className="px-5 py-3.5 text-gray-500">{m.plan}</td>
                <td className="px-5 py-3.5">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColors[m.status]}`}>
                    {m.status}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-gray-500">{m.joined}</td>
                <td className="px-5 py-3.5 text-gray-500">{m.due}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
