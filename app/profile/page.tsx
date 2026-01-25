'use client';

import { useTranslations } from 'next-intl';
import {
  User as UserIcon, Mail, Shield, Clock, Edit3, Phone,
  Building2, Briefcase, MapPin, BadgeCheck, Camera,
  KeyRound, UserMinus, CalendarDays
} from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { format } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/common/ui/avatar';
import { Button } from '@/components/common/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/common/ui/card';
import InfoItem from '@/components/profile/InfoItem';
import StatusRow from '@/components/profile/StatusRow';
import { Separator } from '@/components/common/ui/Separator';

const ProfilePage = () => {
  const t = useTranslations('Profile');
  const { user } = useAuthStore();

  if (!user) return null;

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return format(new Date(dateString), 'MMMM dd, yyyy');
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase();
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-12">
      {/* Sleek Header Banner */}
      <div className="h-32 bg-linear-to-r from-indigo-600 to-violet-700 w-full" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16">
        <div className="flex flex-col gap-8">

          {/* Top Profile Section */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-6">
              <div className="flex flex-col md:flex-row items-center md:items-end gap-6 -mt-12 md:-mt-16">
                <div className="relative group">
                  {/* The wrapper now uses your size variants. Added 'h-32 w-32' manually or via className since it exceeds your '2xl' variant. */}
                  {user.profile_picture ? (
                    <Avatar className="h-32 w-32">
                      <AvatarImage
                        src={user.profile_picture}
                        alt={`${user.first_name} ${user.last_name}`}
                        className="object-cover"
                      />
                    </Avatar>
                  ) : (
                    <AvatarFallback className="h-32 w-32 border-4 border-white shadow-lg bg-slate-100 text-slate-600 text-3xl font-semibold">
                      {getInitials(user.first_name, user.last_name)}
                    </AvatarFallback>
                  )}

                  {/* Edit Overlay Button */}
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute bottom-1 right-1 rounded-full h-8 w-8 shadow-md border border-slate-200 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>

                <div className="text-center md:text-left pb-2">
                  <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                    {user.first_name} {user.last_name}
                  </h1>
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-1 text-slate-500">
                    <span className="inline-flex items-center gap-1 text-sm font-medium bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded-full">
                      <BadgeCheck className="h-3.5 w-3.5" />
                      {user.agency_details?.role_details?.name || 'User'}
                    </span>
                    <span className="flex items-center gap-1 text-sm">
                      <CalendarDays className="h-4 w-4" />
                      Joined {formatDate(user.date_joined)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pb-2 w-full md:w-auto">
                <Button variant="outline" className="flex-1 md:flex-none border-slate-200">
                  <Edit3 className="mr-2 h-4 w-4" /> Edit Profile
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Main Content */}
            <div className="lg:col-span-8 space-y-8">

              {/* Information Grid */}
              <Card className="border-slate-200 shadow-none">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <UserIcon className="h-5 w-5 text-indigo-600" />
                    Personal Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                  <InfoItem label="Email Address" value={user.email} icon={<Mail />} />
                  <InfoItem label="Phone Number" value={user.phone_number || 'Not provided'} icon={<Phone />} />
                  <InfoItem label="First Name" value={user.first_name} />
                  <InfoItem label="Last Name" value={user.last_name} />
                </CardContent>
              </Card>

              <Card className="border-slate-200 shadow-none">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-indigo-600" />
                    Professional Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                  <InfoItem label="Agency" value={user.agency_details?.branch_details?.agency_name} icon={<Building2 />} />
                  <InfoItem label="Office Location" value={user.agency_details?.branch_details?.name} icon={<MapPin />} />
                  <InfoItem label="Current Role" value={user.agency_details?.role_details?.name} icon={<Shield />} />
                  <InfoItem label="Employee Since" value={formatDate(user.agency_details?.date_joined)} icon={<Clock />} />
                </CardContent>
              </Card>
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              {/* Status Card */}
              <Card className="border-slate-200 shadow-none bg-indigo-50/30">
                <CardHeader>
                  <CardTitle className="text-sm font-semibold uppercase tracking-wider text-slate-500">Account Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <StatusRow
                    label="Account"
                    value={user.is_active ? 'Active' : 'Inactive'}
                    variant={user.is_active ? 'success' : 'danger'}
                  />
                  <StatusRow
                    label="Staff Access"
                    value={user.is_staff ? 'Granted' : 'None'}
                    variant={user.is_staff ? 'blue' : 'gray'}
                  />
                  <Separator className="bg-slate-200" />
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Clock className="h-3 w-3" />
                    Last login: {formatDate(new Date().toISOString())}
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="space-y-3">
                <p className="text-sm font-semibold text-slate-900 px-1">Quick Actions</p>
                <Button variant="outline" className="w-full justify-start border-slate-200 hover:bg-white hover:border-indigo-200 transition-all">
                  <KeyRound className="mr-3 h-4 w-4 text-slate-400" />
                  Change Password
                </Button>
                <Button variant="outline" className="w-full justify-start text-red-600 border-red-50 hover:bg-red-50 hover:border-red-100 transition-all">
                  <UserMinus className="mr-3 h-4 w-4" />
                  Deactivate Account
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default ProfilePage;