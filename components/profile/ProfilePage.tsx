'use client';

import { useTranslations } from 'next-intl';
import { User, Mail, Shield, Clock, Edit, Camera } from 'lucide-react';

const adminUser = {
  name: 'John Doe',
  email: 'john.doe@buslink.com',
  role: 'Super Admin',
  avatar: '/user-avatar.png', // Placeholder image
  recentActivity: [
    { id: 1, action: 'Updated bus schedule for route 5A.', timestamp: '2 hours ago' },
    { id: 2, action: 'Cancelled booking #12345.', timestamp: '5 hours ago' },
    { id: 3, action: 'Added a new agency: City Transit.', timestamp: '1 day ago' },
  ],
};

export const ProfilePage = () => {
  const t = useTranslations('Profile');

  return (
    <div className="p-8 space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-gray-900">{t('title')}</h1>
        <p className="text-gray-500 mt-1">{t('description')}</p>
      </header>

      {/* Profile Header */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center space-x-6">
        <div className="relative">
          <img src={adminUser.avatar} alt="User Avatar" className="w-24 h-24 rounded-full" />
          <button className="absolute bottom-0 right-0 bg-indigo-600 text-white p-1.5 rounded-full hover:bg-indigo-700">
            <Camera className="w-4 h-4" />
          </button>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{adminUser.name}</h2>
          <p className="text-gray-600">{adminUser.email}</p>
          <span className="inline-block mt-2 px-3 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
            {adminUser.role}
          </span>
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-900">{t('personalInfo')}</h3>
          <button className="flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800">
            <Edit className="w-4 h-4 mr-1" /> {t('edit')}
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-3">
            <User className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-gray-500">{t('fullName')}</p>
              <p className="font-medium text-gray-800">{adminUser.name}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Mail className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-gray-500">{t('emailAddress')}</p>
              <p className="font-medium text-gray-800">{adminUser.email}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Shield className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-gray-500">{t('role')}</p>
              <p className="font-medium text-gray-800">{adminUser.role}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Security */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('security')}</h3>
        <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">
          {t('changePassword')}
        </button>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('recentActivity')}</h3>
        <ul className="space-y-4">
          {adminUser.recentActivity.map(activity => (
            <li key={activity.id} className="flex items-start space-x-3">
              <Clock className="w-5 h-5 text-gray-400 mt-1" />
              <div>
                <p className="text-sm text-gray-800">{activity.action}</p>
                <p className="text-xs text-gray-500">{activity.timestamp}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
