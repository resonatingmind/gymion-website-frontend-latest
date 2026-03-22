import { Dumbbell, UserPlus, Star } from 'lucide-react';

const dummyTrainers = [
  { id: 1, name: 'Karan Kapoor', speciality: 'Strength & Conditioning', members: 18, rating: 4.9, status: 'Active' },
  { id: 2, name: 'Meera Nair', speciality: 'Yoga & Flexibility', members: 22, rating: 4.8, status: 'Active' },
  { id: 3, name: 'Rohit Singh', speciality: 'Cardio & HIIT', members: 15, rating: 4.7, status: 'Active' },
  { id: 4, name: 'Anjali Verma', speciality: 'CrossFit', members: 10, rating: 4.5, status: 'On Leave' },
];

export default function TrainersPage() {
  return (
    <div className="flex flex-col gap-6 max-w-[1400px] mx-auto pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Trainers</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your training staff.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-violet-600 text-white rounded-xl hover:bg-violet-700 shadow-lg shadow-violet-200 transition-all">
          <UserPlus size={18} />
          Add Trainer
        </button>
      </div>

      {/* Trainer Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {dummyTrainers.map((trainer) => (
          <div key={trainer.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col gap-3">
            {/* Avatar placeholder */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-violet-100 text-violet-700 flex items-center justify-center font-bold text-lg">
                {trainer.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 truncate">{trainer.name}</p>
                <p className="text-xs text-gray-500 truncate">{trainer.speciality}</p>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">{trainer.members} members</span>
              <span className="flex items-center gap-1 text-amber-500 font-medium">
                <Star size={14} fill="currentColor" />
                {trainer.rating}
              </span>
            </div>

            <span
              className={`self-start text-[11px] font-semibold px-2.5 py-1 rounded-full ${
                trainer.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
              }`}
            >
              {trainer.status}
            </span>
          </div>
        ))}
      </div>

      {/* Placeholder table area */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center gap-3 mb-4">
          <Dumbbell size={20} className="text-violet-600" />
          <h2 className="text-sm font-semibold text-gray-900">Trainer Schedule (Coming Soon)</h2>
        </div>
        <p className="text-sm text-gray-400">Weekly schedule and session assignments will appear here.</p>
      </div>
    </div>
  );
}
