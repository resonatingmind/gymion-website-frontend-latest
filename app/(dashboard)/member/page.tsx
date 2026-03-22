import {
  Dumbbell,
  CalendarCheck,
  Flame,
  Clock,
  TrendingUp,
  CheckCircle2,
  ChevronRight,
  Star,
  IndianRupee,
} from 'lucide-react';

const upcomingWorkouts = [
  { day: 'Mon', date: '24 Mar', title: 'Chest & Triceps', trainer: 'Tom Trainer', time: '6:30 AM', status: 'scheduled' },
  { day: 'Wed', date: '26 Mar', title: 'Back & Biceps', trainer: 'Tom Trainer', time: '6:30 AM', status: 'scheduled' },
  { day: 'Fri', date: '28 Mar', title: 'Legs & Core', trainer: 'Tom Trainer', time: '7:00 AM', status: 'scheduled' },
];

const recentAttendance = [
  { date: 'Sat, 22 Mar', checkIn: '6:28 AM', checkOut: '7:55 AM', duration: '1h 27m' },
  { date: 'Thu, 20 Mar', checkIn: '6:30 AM', checkOut: '8:00 AM', duration: '1h 30m' },
  { date: 'Tue, 18 Mar', checkIn: '6:45 AM', checkOut: '8:10 AM', duration: '1h 25m' },
  { date: 'Mon, 17 Mar', checkIn: '6:32 AM', checkOut: '7:58 AM', duration: '1h 26m' },
];

const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const attendedDays = [true, true, false, true, true, true, false];

export default function MemberDashboardPage() {
  return (
    <div className="flex flex-col gap-6 max-w-[1400px] mx-auto pb-10">

      {/* SECTION 1 – PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Welcome back, Mike! Keep up the great work 💪</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium bg-violet-600 text-white rounded-xl hover:bg-violet-700 shadow-lg shadow-violet-200 transition-all">
            <CalendarCheck size={18} />
            Mark Attendance
          </button>
        </div>
      </div>

      {/* SECTION 2 – MEMBERSHIP BANNER */}
      <div className="relative overflow-hidden bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl p-5 text-white">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-violet-200 text-xs font-semibold uppercase tracking-widest mb-1">Active Plan</p>
            <h2 className="text-xl font-bold">Premium · Monthly</h2>
            <p className="text-violet-200 text-sm mt-1">Expires on <span className="text-white font-semibold">April 15, 2025</span> · 24 days left</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <p className="text-3xl font-bold">24</p>
              <p className="text-violet-200 text-xs">Days Left</p>
            </div>
            <button className="flex items-center gap-2 bg-white text-violet-700 font-semibold text-sm px-4 py-2 rounded-xl hover:bg-violet-50 transition-colors whitespace-nowrap">
              <IndianRupee size={16} />
              Renew Plan
            </button>
          </div>
        </div>
        {/* Decorative blobs */}
        <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-white/5" />
        <div className="absolute -right-4 top-12 w-24 h-24 rounded-full bg-white/5" />
      </div>

      {/* SECTION 3 – KPI STRIP */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

        {/* Workouts This Month */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-xs text-gray-500 font-medium">Workouts (Mar)</span>
            <div className="bg-violet-50 text-violet-600 w-8 h-8 rounded-lg flex items-center justify-center">
              <Dumbbell size={16} />
            </div>
          </div>
          <div className="mt-3">
            <h4 className="text-2xl font-bold text-gray-900">14</h4>
            <div className="flex items-center text-emerald-600 text-xs font-medium mt-1 gap-1">
              <TrendingUp size={14} />
              +3 vs Feb
            </div>
          </div>
        </div>

        {/* Current Streak */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-xs text-gray-500 font-medium">Current Streak</span>
            <div className="bg-orange-50 text-orange-500 w-8 h-8 rounded-lg flex items-center justify-center">
              <Flame size={16} />
            </div>
          </div>
          <div className="mt-3">
            <h4 className="text-2xl font-bold text-gray-900">6 days</h4>
            <div className="flex items-center text-orange-500 text-xs font-medium mt-1 gap-1">
              🔥 Personal best!
            </div>
          </div>
        </div>

        {/* Avg Session */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-xs text-gray-500 font-medium">Avg Session</span>
            <div className="bg-blue-50 text-blue-600 w-8 h-8 rounded-lg flex items-center justify-center">
              <Clock size={16} />
            </div>
          </div>
          <div className="mt-3">
            <h4 className="text-2xl font-bold text-gray-900">1h 28m</h4>
            <div className="flex items-center text-emerald-600 text-xs font-medium mt-1 gap-1">
              <TrendingUp size={14} />
              +8 min vs Feb
            </div>
          </div>
        </div>

        {/* Attendance Rate */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-xs text-gray-500 font-medium">Attendance Rate</span>
            <div className="bg-emerald-50 text-emerald-600 w-8 h-8 rounded-lg flex items-center justify-center">
              <CheckCircle2 size={16} />
            </div>
          </div>
          <div className="mt-3">
            <h4 className="text-2xl font-bold text-gray-900">82%</h4>
            <div className="flex items-center text-emerald-600 text-xs font-medium mt-1 gap-1">
              <TrendingUp size={14} />
              Above average
            </div>
          </div>
        </div>

      </div>

      {/* SECTION 4 – BOTTOM ROW: Upcoming + Attendance */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">

        {/* Upcoming Workouts */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-sm font-semibold text-gray-900">Upcoming Workouts</h3>
            <button className="text-xs text-violet-600 font-medium hover:text-violet-700 transition-colors flex items-center gap-0.5">
              View all <ChevronRight size={14} />
            </button>
          </div>
          <div className="flex flex-col gap-3">
            {upcomingWorkouts.map((w, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-gray-50 hover:bg-violet-50 transition-colors group">
                {/* Day badge */}
                <div className="flex flex-col items-center justify-center bg-white border border-gray-200 group-hover:border-violet-200 rounded-xl w-12 h-12 shrink-0 transition-colors">
                  <span className="text-[10px] font-semibold text-gray-400 uppercase">{w.day}</span>
                  <span className="text-sm font-bold text-gray-900">{w.date.split(' ')[0]}</span>
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="text-sm font-semibold text-gray-900">{w.title}</span>
                  <span className="text-xs text-gray-500">w/ {w.trainer} · {w.time}</span>
                </div>
                <div className="shrink-0">
                  <span className="bg-violet-100 text-violet-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    Scheduled
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Attendance History */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-900">Attendance</h3>
            <button className="text-xs text-violet-600 font-medium hover:text-violet-700 transition-colors flex items-center gap-0.5">
              Full history <ChevronRight size={14} />
            </button>
          </div>

          {/* This week mini heatmap */}
          <div className="mb-5">
            <p className="text-xs text-gray-400 mb-2 font-medium">This week</p>
            <div className="flex items-center gap-2">
              {weekDays.map((day, i) => (
                <div key={i} className="flex flex-col items-center gap-1 flex-1">
                  <div className={`w-full aspect-square rounded-lg flex items-center justify-center ${
                    attendedDays[i]
                      ? 'bg-violet-600 text-white'
                      : 'bg-gray-100 text-gray-400'
                  }`}>
                    {attendedDays[i] ? <CheckCircle2 size={14} /> : <span className="text-[10px]">–</span>}
                  </div>
                  <span className="text-[10px] text-gray-400 font-medium">{day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent sessions */}
          <div className="flex flex-col gap-2">
            {recentAttendance.map((s, i) => (
              <div key={i} className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
                <div>
                  <p className="text-sm font-medium text-gray-900">{s.date}</p>
                  <p className="text-xs text-gray-500">Check-in: {s.checkIn} · Out: {s.checkOut}</p>
                </div>
                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  {s.duration}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* SECTION 5 – TRAINER CARD */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">My Trainer</h3>
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-violet-100 text-violet-700 text-xl font-bold">
            TT
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-900">Tom Trainer</p>
            <p className="text-sm text-gray-500">Strength & Conditioning · 5 yrs experience</p>
            <div className="flex items-center gap-1 mt-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={12} className={i < 4 ? 'text-amber-400 fill-amber-400' : 'text-gray-300 fill-gray-300'} />
              ))}
              <span className="text-xs text-gray-500 ml-1">4.0 · 38 reviews</span>
            </div>
          </div>
          <button className="shrink-0 text-sm font-medium text-violet-600 border border-violet-200 px-4 py-2 rounded-xl hover:bg-violet-50 transition-colors">
            Message
          </button>
        </div>
      </div>

    </div>
  );
}
