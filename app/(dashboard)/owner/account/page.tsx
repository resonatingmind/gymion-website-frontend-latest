import { User, Mail, Phone, Lock, Bell } from 'lucide-react';

export default function AccountPage() {
  return (
    <div className="flex flex-col gap-6 max-w-[800px] mx-auto pb-10">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Account</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your personal info and account settings.</p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        {/* Avatar area */}
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
          <div className="w-16 h-16 rounded-2xl bg-violet-100 text-violet-700 flex items-center justify-center font-bold text-2xl">
            J
          </div>
          <div>
            <p className="font-semibold text-gray-900">John Owner</p>
            <p className="text-sm text-gray-500">Owner · Iron Warriors Gym</p>
          </div>
          <button className="ml-auto text-sm text-violet-600 font-medium hover:text-violet-700 transition-colors">
            Change Photo
          </button>
        </div>

        {/* Personal Info Form */}
        <h2 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <User size={16} className="text-violet-600" />
          Personal Information
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: 'First Name', value: 'John', icon: User },
            { label: 'Last Name', value: 'Owner', icon: User },
            { label: 'Email', value: 'john@ironwarriors.in', icon: Mail },
            { label: 'Phone', value: '+91 98765 43210', icon: Phone },
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

        <button className="mt-4 px-4 py-2 text-sm font-medium bg-violet-600 text-white rounded-xl hover:bg-violet-700 shadow-md shadow-violet-200 transition-all">
          Save Changes
        </button>
      </div>

      {/* Security Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Lock size={16} className="text-violet-600" />
          Security
        </h2>
        <div className="flex flex-col gap-3">
          {[
            { label: 'Current Password', placeholder: '••••••••' },
            { label: 'New Password', placeholder: '••••••••' },
            { label: 'Confirm New Password', placeholder: '••••••••' },
          ].map((field) => (
            <div key={field.label}>
              <label className="block text-xs font-medium text-gray-500 mb-1">{field.label}</label>
              <input
                type="password"
                placeholder={field.placeholder}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-300 text-gray-900"
              />
            </div>
          ))}
          <button className="self-start mt-1 px-4 py-2 text-sm font-medium border border-gray-200 bg-white text-gray-700 rounded-xl hover:border-violet-300 hover:text-violet-700 transition-colors">
            Update Password
          </button>
        </div>
      </div>

      {/* Notifications Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Bell size={16} className="text-violet-600" />
          Notifications
        </h2>
        <div className="flex flex-col gap-4">
          {[
            { label: 'Membership expiry alerts', description: 'Get notified when memberships are about to expire.' },
            { label: 'Payment due reminders', description: 'Receive reminders for overdue payments.' },
            { label: 'New member sign-ups', description: 'Alert when a new member joins the gym.' },
          ].map((item) => (
            <div key={item.label} className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-gray-900">{item.label}</p>
                <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
              </div>
              {/* Toggle placeholder */}
              <div className="shrink-0 w-10 h-5 bg-violet-600 rounded-full relative cursor-pointer">
                <div className="absolute right-1 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
