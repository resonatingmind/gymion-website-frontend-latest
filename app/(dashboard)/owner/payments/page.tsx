import { IndianRupee, TrendingUp, AlertCircle, CreditCard } from 'lucide-react';

const dummyPayments = [
  { id: 1, member: 'Priya Sharma', amount: '₹3,500', plan: 'Quarterly · Premium', date: 'Mar 20, 2025', status: 'Paid' },
  { id: 2, member: 'Arjun Mehta', amount: '₹1,200', plan: 'Monthly · Standard', date: 'Mar 18, 2025', status: 'Paid' },
  { id: 3, member: 'Vikram Desai', amount: '₹1,200', plan: 'Monthly · Standard', date: 'Mar 5, 2025', status: 'Overdue' },
  { id: 4, member: 'Sneha Joshi', amount: '₹12,000', plan: 'Annual · Premium', date: 'Mar 1, 2025', status: 'Paid' },
  { id: 5, member: 'Pooja Iyer', amount: '₹1,200', plan: 'Monthly · Standard', date: 'Feb 28, 2025', status: 'Overdue' },
];

const statusColors: Record<string, string> = {
  'Paid': 'bg-emerald-50 text-emerald-700',
  'Overdue': 'bg-red-50 text-red-600',
  'Pending': 'bg-amber-50 text-amber-700',
};

export default function PaymentsPage() {
  return (
    <div className="flex flex-col gap-6 max-w-[1400px] mx-auto pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
          <p className="text-sm text-gray-500 mt-1">Track revenue, dues, and transaction history.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-violet-600 text-white rounded-xl hover:bg-violet-700 shadow-lg shadow-violet-200 transition-all">
          <CreditCard size={18} />
          Record Payment
        </button>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Revenue This Month', value: '₹1,82,400', icon: IndianRupee, color: 'bg-blue-50 text-blue-600', sub: '82% collected' },
          { label: 'Pending Dues', value: '₹38,200', icon: AlertCircle, color: 'bg-red-50 text-red-500', sub: '8 members overdue' },
          { label: 'Growth vs Last Month', value: '+12%', icon: TrendingUp, color: 'bg-emerald-50 text-emerald-600', sub: '₹19,600 more' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${stat.color}`}>
              <stat.icon size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">{stat.label}</p>
              <p className="text-xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-xs text-gray-400 mt-0.5">{stat.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Transactions table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-900">Recent Transactions</h2>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500">Member</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500">Plan</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500">Amount</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500">Date</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500">Status</th>
            </tr>
          </thead>
          <tbody>
            {dummyPayments.map((p) => (
              <tr key={p.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                <td className="px-5 py-3.5 font-medium text-gray-900">{p.member}</td>
                <td className="px-5 py-3.5 text-gray-500">{p.plan}</td>
                <td className="px-5 py-3.5 font-semibold text-gray-900">{p.amount}</td>
                <td className="px-5 py-3.5 text-gray-500">{p.date}</td>
                <td className="px-5 py-3.5">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColors[p.status]}`}>
                    {p.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
