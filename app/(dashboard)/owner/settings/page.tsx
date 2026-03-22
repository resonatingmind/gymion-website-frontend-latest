import { Settings, Building2, Clock, CreditCard, Users } from 'lucide-react';

const settingSections = [
  {
    icon: Building2,
    title: 'Gym Profile',
    description: 'Update your gym name, address, contact details, and logo.',
    color: 'bg-violet-50 text-violet-600',
  },
  {
    icon: Clock,
    title: 'Operating Hours',
    description: 'Set opening and closing times for each day of the week.',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: CreditCard,
    title: 'Membership Plans',
    description: 'Create and manage pricing plans (Monthly, Quarterly, Annual).',
    color: 'bg-emerald-50 text-emerald-600',
  },
  {
    icon: Users,
    title: 'Staff & Permissions',
    description: 'Manage admin and trainer access levels and roles.',
    color: 'bg-amber-50 text-amber-600',
  },
];

export default function GymSetupPage() {
  return (
    <div className="flex flex-col gap-6 max-w-[1400px] mx-auto pb-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gym Setup</h1>
          <p className="text-sm text-gray-500 mt-1">Configure your gym&apos;s settings and preferences.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-violet-600 text-white rounded-xl hover:bg-violet-700 shadow-lg shadow-violet-200 transition-all">
          <Settings size={18} />
          Save Changes
        </button>
      </div>

      {/* Gym Profile Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-sm font-semibold text-gray-900 mb-4">Gym Profile</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: 'Gym Name', value: 'Iron Warriors Gym' },
            { label: 'Phone Number', value: '+91 98765 43210' },
            { label: 'Email', value: 'contact@ironwarriors.in' },
            { label: 'City', value: 'Bengaluru, Karnataka' },
          ].map((field) => (
            <div key={field.label}>
              <label className="block text-xs font-medium text-gray-500 mb-1">{field.label}</label>
              <input
                type="text"
                defaultValue={field.value}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-300 text-gray-900"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Settings Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {settingSections.map((section) => (
          <div
            key={section.title}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-start gap-4 hover:border-violet-200 transition-colors cursor-pointer group"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${section.color}`}>
              <section.icon size={20} />
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm group-hover:text-violet-700 transition-colors">
                {section.title}
              </p>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">{section.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
