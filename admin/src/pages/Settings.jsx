import { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';

const Settings = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true,
    marketing: false
  });

  const [profile, setProfile] = useState({
    name: 'Admin User',
    email: 'admin@example.com',
    phone: '+92 300 1234567',
    timezone: 'Asia/Karachi'
  });

  const toggleNotification = (type) => {
    setNotifications({ ...notifications, [type]: !notifications[type] });
  };

  return (
    <DashboardLayout>
      <div className="space-y-10">
        {/* Page header */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-3xl"></div>
          <div className="relative bg-gradient-to-br from-white/95 to-slate-50/95 backdrop-blur-xl rounded-3xl p-8 border border-slate-200/60 shadow-2xl shadow-slate-900/5">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-indigo-700 to-purple-600 bg-clip-text text-transparent mb-3">
                  Account Settings
                </h1>
                <p className="text-lg text-slate-600 font-medium">
                  Manage your account preferences and security settings
                </p>
              </div>
              <div className="mt-6 md:mt-0">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-xl shadow-purple-500/25 ring-4 ring-white/50">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Profile Settings */}
          <div className="group">
            <div className="bg-gradient-to-br from-white/95 to-slate-50/95 backdrop-blur-xl rounded-3xl border border-slate-200/60 shadow-2xl shadow-slate-900/5 hover:shadow-3xl transition-all duration-500 overflow-hidden">
              {/* Card Header */}
              <div className="bg-gradient-to-r from-indigo-50/90 to-purple-50/90 backdrop-blur-sm p-6 border-b border-slate-200/40">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/25">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                      Profile Information
                    </h3>
                    <p className="text-sm text-slate-600 font-medium">Update your personal details</p>
                  </div>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-8">
                <div className="space-y-6">
                  {[
                    { id: 'name', label: 'Full Name', type: 'text', value: profile.name, field: 'name' },
                    { id: 'email', label: 'Email Address', type: 'email', value: profile.email, field: 'email' },
                    { id: 'phone', label: 'Phone Number', type: 'tel', value: profile.phone, field: 'phone' }
                  ].map((input) => (
                    <div key={input.id} className="group/input">
                      <label htmlFor={input.id} className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">
                        {input.label}
                      </label>
                      <div className="relative">
                        <input
                          type={input.type}
                          id={input.id}
                          value={input.value}
                          onChange={(e) => setProfile({ ...profile, [input.field]: e.target.value })}
                          className="block w-full px-5 py-4 bg-white/70 backdrop-blur-sm border border-slate-200/60 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 shadow-lg shadow-slate-200/50 focus:shadow-xl focus:shadow-indigo-500/10 text-slate-800 font-medium group-hover/input:shadow-xl"
                        />
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/0 to-purple-500/0 group-focus-within/input:from-indigo-500/5 group-focus-within/input:to-purple-500/5 transition-all duration-300 pointer-events-none"></div>
                      </div>
                    </div>
                  ))}
                  
                  <div className="group/select">
                    <label htmlFor="timezone" className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">
                      Timezone
                    </label>
                    <div className="relative">
                      <select
                        id="timezone"
                        value={profile.timezone}
                        onChange={(e) => setProfile({ ...profile, timezone: e.target.value })}
                        className="block w-full px-5 py-4 bg-white/70 backdrop-blur-sm border border-slate-200/60 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 shadow-lg shadow-slate-200/50 focus:shadow-xl focus:shadow-indigo-500/10 text-slate-800 font-medium group-hover/select:shadow-xl appearance-none cursor-pointer"
                      >
                        <option value="Asia/Karachi">Asia/Karachi (PKT)</option>
                        <option value="UTC">UTC</option>
                        <option value="America/New_York">America/New_York (EST)</option>
                        <option value="Europe/London">Europe/London (GMT)</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                        <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <button className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-6 py-4 rounded-2xl text-sm font-bold hover:shadow-2xl hover:shadow-indigo-500/25 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] uppercase tracking-wider backdrop-blur-sm ring-1 ring-white/20">
                      <div className="flex items-center justify-center space-x-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Update Profile</span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="group">
            <div className="bg-gradient-to-br from-white/95 to-slate-50/95 backdrop-blur-xl rounded-3xl border border-slate-200/60 shadow-2xl shadow-slate-900/5 hover:shadow-3xl transition-all duration-500 overflow-hidden">
              {/* Card Header */}
              <div className="bg-gradient-to-r from-red-50/90 to-pink-50/90 backdrop-blur-sm p-6 border-b border-slate-200/40">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/25">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                      Security Settings
                    </h3>
                    <p className="text-sm text-slate-600 font-medium">Manage your password and security</p>
                  </div>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-8">
                <div className="space-y-6">
                  {[
                    { id: 'current-password', label: 'Current Password', placeholder: 'Enter current password' },
                    { id: 'new-password', label: 'New Password', placeholder: 'Enter new password' },
                    { id: 'confirm-password', label: 'Confirm New Password', placeholder: 'Confirm new password' }
                  ].map((input) => (
                    <div key={input.id} className="group/input">
                      <label htmlFor={input.id} className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">
                        {input.label}
                      </label>
                      <div className="relative">
                        <input
                          type="password"
                          id={input.id}
                          className="block w-full px-5 py-4 bg-white/70 backdrop-blur-sm border border-slate-200/60 rounded-2xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all duration-300 shadow-lg shadow-slate-200/50 focus:shadow-xl focus:shadow-red-500/10 text-slate-800 font-medium group-hover/input:shadow-xl"
                          placeholder={input.placeholder}
                        />
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/0 to-pink-500/0 group-focus-within/input:from-red-500/5 group-focus-within/input:to-pink-500/5 transition-all duration-300 pointer-events-none"></div>
                      </div>
                    </div>
                  ))}
                  
                  <div className="pt-4">
                    <button className="w-full bg-gradient-to-r from-red-500 via-pink-500 to-rose-500 text-white px-6 py-4 rounded-2xl text-sm font-bold hover:shadow-2xl hover:shadow-red-500/25 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] uppercase tracking-wider backdrop-blur-sm ring-1 ring-white/20">
                      <div className="flex items-center justify-center space-x-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                        </svg>
                        <span>Change Password</span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="group">
          <div className="bg-gradient-to-br from-white/95 to-red-50/95 backdrop-blur-xl rounded-3xl border border-red-200/60 shadow-2xl shadow-red-900/5 overflow-hidden">
            {/* Card Header */}
            <div className="bg-gradient-to-r from-red-100/90 to-pink-100/90 backdrop-blur-sm p-6 border-b border-red-200/40">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-rose-700 rounded-2xl flex items-center justify-center shadow-lg shadow-red-600/25">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-red-700 to-rose-600 bg-clip-text text-transparent">
                    Danger Zone
                  </h3>
                  <p className="text-sm text-red-600 font-medium">Irreversible actions require careful consideration</p>
                </div>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-8">
              <div className="space-y-6">
                {[
                  {
                    title: 'Delete Account',
                    description: 'Permanently delete your account and all data',
                    buttonText: 'Delete Account',
                    buttonColor: 'from-red-600 to-rose-700',
                    borderColor: 'border-red-300',
                    bgColor: 'from-red-50/90 to-rose-50/90',
                    icon: 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                  },
                  {
                    title: 'Export Data',
                    description: 'Download all your data in JSON format',
                    buttonText: 'Export Data',
                    buttonColor: 'from-yellow-500 to-orange-600',
                    borderColor: 'border-yellow-300',
                    bgColor: 'from-yellow-50/90 to-orange-50/90',
                    icon: 'M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                  }
                ].map((action, index) => (
                  <div key={index} className={`flex flex-col md:flex-row md:items-center md:justify-between p-6 border ${action.borderColor} rounded-2xl bg-gradient-to-r ${action.bgColor} backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 group/action`}>
                    <div className="flex items-start space-x-4 mb-4 md:mb-0">
                      <div className={`w-10 h-10 bg-gradient-to-br ${action.buttonColor} rounded-xl flex items-center justify-center shadow-lg flex-shrink-0 group-hover/action:scale-110 transition-transform duration-200`}>
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={action.icon} />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 mb-1">{action.title}</h4>
                        <p className="text-sm text-slate-700 font-medium">{action.description}</p>
                      </div>
                    </div>
                    <button className={`bg-gradient-to-r ${action.buttonColor} text-white px-6 py-3 rounded-xl text-sm font-bold hover:shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 whitespace-nowrap ring-1 ring-white/20`}>
                      <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={action.icon} />
                        </svg>
                        <span>{action.buttonText}</span>
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;