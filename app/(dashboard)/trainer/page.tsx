import {
  Users,
  CalendarCheck,
  TrendingUp,
  Clock,
  ChevronRight,
  Star,
  CheckCircle2,
  Dumbbell,
  UserPlus,
} from 'lucide-react';

const myMembers = [
  { initials: 'RK', bg: 'bg-violet-100', color: 'text-violet-700', name: 'Rahul Kumar',  plan: 'Monthly · Premium',    streak: 8,  nextSession: 'Today, 7:00 AM' },
  { initials: 'PS', bg: 'bg-emerald-100', color: 'text-emerald-700', name: 'Priya Sharma', plan: 'Quarterly · Standard',  streak: 14, nextSession: 'Today, 8:30 AM' },
  { initials: 'AM', bg: 'bg-blue-100',    color: 'text-blue-700',    name: 'Arjun Mehta',  plan: 'Monthly · Standard',   streak: 3,  nextSession: 'Tue, 6:30 AM' },
  { initials: 'SJ', bg: 'bg-pink-100',    color: 'text-pink-700',    name: 'Sneha Joshi',  plan: 'Annual · Premium',     streak: 21, nextSession: 'Wed, 7:00 AM' },
];

const todaysSchedule = [
  { time: '6:30 AM', member: 'Rahul Kumar',  type: 'Chest & Triceps', duration: '1h', status: 'upcoming' },
  { time: '8:30 AM', member: 'Priya Sharma', type: 'Back & Biceps',   duration: '1h', status: 'upcoming' },
  { time: '10:00 AM',member: 'Arjun Mehta',  type: 'Legs & Core',     duration: '1h 30m', status: 'done' },
  { time: '5:00 PM', member: 'Sneha Joshi',  type: 'Cardio & HIIT',   duration: '45m', status: 'upcoming' },
];

const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const sessionsDone = [3, 2, 4, 3, 0, 2, 0];

export default function TrainerDashboardPage() {
  return (
    <div className="flex flex-col gap-6 max-w-[1400px] mx-auto pb-10">

      {/* SECTION 1 – PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Trainer Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Good morning, Tom! You have 3 sessions today.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium border border-gray-200 bg-white text-gray-700 rounded-xl hover:border-violet-300 hover:text-violet-700 transition-colors">
            <CalendarCheck size={18} />
            View Schedule
          </button>
          <button className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium bg-violet-600 text-white rounded-xl hover:bg-violet-700 shadow-lg shadow-violet-200 transition-all">
            <UserPlus size={18} />
            Add Member
          </button>
        </div>
      </div>

      {/* SECTION 2 – KPI STRIP */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

        {/* My Members */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-xs text-gray-500 font-medium">My Members</span>
            <div className="bg-violet-50 text-violet-600 w-8 h-8 rounded-lg flex items-center justify-center">
              <Users size={16} />
            </div>
          </div>
          <div className="mt-3">
            <h4 className="text-2xl font-bold text-gray-900">18</h4>
            <div className="flex items-center text-emerald-600 text-xs font-medium mt-1 gap-1">
              <TrendingUp size={14} />
              +2 this month
            </div>
          </div>
        </div>

        {/* Sessions Today */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-xs text-gray-500 font-medium">Sessions Today</span>
            <div className="bg-blue-50 text-blue-600 w-8 h-8 rounded-lg flex items-center justify-center">
              <CalendarCheck size={16} />
            </div>
          </div>
          <div className="mt-3">
            <h4 className="text-2xl font-bold text-gray-900">4</h4>
            <div className="flex items-center text-blue-600 text-xs font-medium mt-1 gap-1">
              1 completed · 3 upcoming
            </div>
          </div>
        </div>

        {/* Avg Rating */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-xs text-gray-500 font-medium">Avg Rating</span>
            <div className="bg-amber-50 text-amber-500 w-8 h-8 rounded-lg flex items-center justify-center">
              <Star size={16} />
            </div>
          </div>
          <div className="mt-3">
            <h4 className="text-2xl font-bold text-gray-900">4.8</h4>
            <div className="flex items-center text-amber-500 text-xs font-medium mt-1 gap-1">
              ★ from 38 reviews
            </div>
          </div>
        </div>

        {/* Sessions This Month */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-xs text-gray-500 font-medium">Sessions (Mar)</span>
            <div className="bg-emerald-50 text-emerald-600 w-8 h-8 rounded-lg flex items-center justify-center">
              <Dumbbell size={16} />
            </div>
          </div>
          <div className="mt-3">
            <h4 className="text-2xl font-bold text-gray-900">62</h4>
            <div className="flex items-center text-emerald-600 text-xs font-medium mt-1 gap-1">
              <TrendingUp size={14} />
              +11 vs Feb
            </div>
          </div>
        </div>

      </div>

      {/* SECTION 3 – MAIN CONTENT ROW */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">

        {/* Today's Schedule */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <h3 className="text-sm font-semibold text-gray-900">Today&apos;s Schedule</h3>
              <span className="bg-violet-100 text-violet-700 text-[10px] font-bold px-2 py-0.5 rounded-full tracking-tight">
                4 sessions
              </span>
            </div>
            <button className="text-xs text-violet-600 font-medium hover:text-violet-700 transition-colors flex items-center gap-0.5">
              Full calendar <ChevronRight size={14} />
            </button>
          </div>
          <div className="flex flex-col gap-3">
            {todaysSchedule.map((s, i) => (
              <div key={i} className={`flex items-center gap-4 p-3 rounded-xl transition-colors ${
                s.status === 'done' ? 'bg-gray-50 opacity-60' : 'bg-gray-50 hover:bg-violet-50'
              }`}>
                {/* Time */}
                <div className="flex flex-col items-center justify-center w-14 shrink-0">
                  <span className="text-xs font-bold text-gray-700">{s.time}</span>
                  <span className="text-[10px] text-gray-400">{s.duration}</span>
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="text-sm font-semibold text-gray-900 truncate">{s.member}</span>
                  <span className="text-xs text-gray-500">{s.type}</span>
                </div>
                <div className="shrink-0">
                  {s.status === 'done' ? (
                    <span className="flex items-center gap-1 text-emerald-600 text-[10px] font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                      <CheckCircle2 size={10} /> Done
                    </span>
                  ) : (
                    <span className="bg-violet-100 text-violet-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Upcoming
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* My Members */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-sm font-semibold text-gray-900">My Members</h3>
            <button className="text-xs text-violet-600 font-medium hover:text-violet-700 transition-colors flex items-center gap-0.5">
              View all <ChevronRight size={14} />
            </button>
          </div>
          <div className="flex flex-col">
            {myMembers.map((m, i) => (
              <div key={i} className="flex items-center pt-3 pb-3 border-b border-gray-50 last:border-0 last:pb-0 group cursor-pointer hover:px-2 transition-all rounded-xl">
                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-bold mr-3 ${m.bg} ${m.color}`}>
                  {m.initials}
                </div>
                <div className="flex flex-col flex-1 min-w-0 mr-3">
                  <span className="text-sm font-medium text-gray-900 truncate">{m.name}</span>
                  <span className="text-xs text-gray-500 truncate">{m.plan}</span>
                </div>
                <div className="flex flex-col items-end shrink-0 gap-0.5">
                  <span className="text-[10px] font-semibold text-orange-500">🔥 {m.streak}d streak</span>
                  <span className="text-[10px] text-gray-400">{m.nextSession}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* SECTION 4 – WEEKLY ACTIVITY HEATMAP */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-900">Weekly Session Activity</h3>
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <div className="w-3 h-3 rounded-sm bg-gray-100" /> Less
            <div className="w-3 h-3 rounded-sm bg-violet-200" />
            <div className="w-3 h-3 rounded-sm bg-violet-400" />
            <div className="w-3 h-3 rounded-sm bg-violet-600" /> More
          </div>
        </div>
        <div className="flex items-end gap-3">
          {weekDays.map((day, i) => {
            const count = sessionsDone[i];
            const intensity = count === 0 ? 'bg-gray-100' : count <= 2 ? 'bg-violet-200' : count <= 3 ? 'bg-violet-400' : 'bg-violet-600';
            return (
              <div key={i} className="flex flex-col items-center gap-2 flex-1">
                <div className="flex flex-col items-center justify-end gap-1 w-full" style={{ height: '80px' }}>
                  <div
                    className={`w-full rounded-lg transition-all ${intensity}`}
                    style={{ height: count === 0 ? '12px' : `${(count / 4) * 64 + 16}px` }}
                    title={`${count} sessions`}
                  />
                </div>
                <span className="text-xs text-gray-400 font-medium">{day}</span>
                <span className="text-[10px] text-gray-400">{count > 0 ? count : '–'}</span>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
