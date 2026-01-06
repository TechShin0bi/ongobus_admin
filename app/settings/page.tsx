"use client";

import React, { useState } from "react";
import { 
  Save, Upload, Shield, Lock, CreditCard, Globe, 
  Users, FileText, Bell, History, Key, CheckCircle 
} from "lucide-react";
import clsx from "clsx";

// --- Types ---

type TabType = 'general' | 'branding' | 'financial' | 'policies' | 'users' | 'integrations' | 'security' | 'audit';

// --- Components ---

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabType>('general');

  // --- Sub-Components for Tab Content ---

  const GeneralTab = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">Company Profile</h3>
        <p className="text-sm text-gray-500 mb-6">Manage your organization's basic information.</p>
        
        <div className="grid gap-6 max-w-3xl">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
            <input 
              type="text" 
              defaultValue="BusLink Admin Corp." 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <textarea 
              rows={3}
              defaultValue="123 Main St, Anytown, AT 12345" 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
            <input 
              type="email" 
              defaultValue="contact@buslink.com" 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const BrandingTab = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">Branding & Appearance</h3>
        <p className="text-sm text-gray-500 mb-6">Customize the look and feel of your customer-facing portal.</p>

        <div className="grid gap-8 max-w-3xl">
          <div className="flex items-start gap-6">
             <div className="w-24 h-24 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400">
                <Upload size={24} />
             </div>
             <div>
               <h4 className="text-sm font-medium text-gray-900">Company Logo</h4>
               <p className="text-xs text-gray-500 mb-3">Recommended size: 512x512px (PNG, JPG)</p>
               <button className="px-3 py-1.5 border border-gray-300 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50">
                 Upload New
               </button>
             </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Primary Brand Color</label>
            <div className="flex gap-3">
               <input type="color" defaultValue="#5C61F4" className="h-10 w-20 p-1 rounded border border-gray-300 cursor-pointer" />
               <input type="text" defaultValue="#5C61F4" className="w-32 px-3 py-2 border border-gray-300 rounded-lg text-sm uppercase" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Portal Theme</label>
            <div className="flex gap-4">
               <div className="border-2 border-indigo-600 rounded-lg p-3 bg-white w-32 cursor-pointer">
                  <div className="h-2 w-16 bg-gray-200 rounded mb-2"></div>
                  <div className="h-2 w-10 bg-gray-100 rounded"></div>
                  <p className="text-xs text-center mt-2 font-medium text-indigo-700">Light</p>
               </div>
               <div className="border border-gray-200 rounded-lg p-3 bg-gray-900 w-32 cursor-pointer opacity-60 hover:opacity-100">
                  <div className="h-2 w-16 bg-gray-700 rounded mb-2"></div>
                  <div className="h-2 w-10 bg-gray-800 rounded"></div>
                  <p className="text-xs text-center mt-2 font-medium text-white">Dark</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const FinancialTab = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
       <div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">Financial Settings</h3>
        <p className="text-sm text-gray-500 mb-6">Configure currency, taxes, and payment gateways.</p>

        <div className="grid gap-6 max-w-3xl">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Default Currency</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white">
                <option>USD ($)</option>
                <option>EUR (€)</option>
                <option>KES (KSh)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tax Rate (%)</label>
              <input type="number" defaultValue="16" className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm" />
            </div>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
            <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
              <CreditCard size={16} /> Payment Gateways
            </h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between bg-white p-3 rounded border border-gray-200">
                <span className="text-sm font-medium">Stripe</span>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  <span className="text-xs text-gray-500">Connected</span>
                  <button className="text-xs text-indigo-600 font-medium ml-2">Configure</button>
                </div>
              </div>
              <div className="flex items-center justify-between bg-white p-3 rounded border border-gray-200">
                <span className="text-sm font-medium">M-Pesa API</span>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  <span className="text-xs text-gray-500">Connected</span>
                  <button className="text-xs text-indigo-600 font-medium ml-2">Configure</button>
                </div>
              </div>
              <div className="flex items-center justify-between bg-white p-3 rounded border border-gray-200">
                <span className="text-sm font-medium">PayPal</span>
                <button className="text-xs text-gray-500 font-medium border border-gray-300 px-2 py-1 rounded hover:bg-gray-50">Connect</button>
              </div>
            </div>
          </div>
        </div>
       </div>
    </div>
  );

  const PoliciesTab = () => (
     <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">Legal & Policies</h3>
        <p className="text-sm text-gray-500 mb-6">Set up your terms of service and cancellation policies.</p>
        
        <div className="space-y-6 max-w-4xl">
           <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cancellation & Refund Policy</label>
              <textarea 
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500"
                defaultValue="Cancellations made 24 hours before departure are eligible for a 90% refund. No refunds for cancellations within 2 hours of departure."
              />
           </div>
           <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Terms of Service URL</label>
              <div className="flex gap-2">
                <input type="text" defaultValue="https://buslink.com/terms" className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50" disabled />
                <button className="px-3 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">
                  <Globe size={16} />
                </button>
              </div>
           </div>
        </div>
      </div>
     </div>
  );

  const UsersTab = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="flex justify-between items-center">
         <div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">Users & Permissions</h3>
          <p className="text-sm text-gray-500">Manage team access and roles.</p>
         </div>
         <button className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700">
            Invite User
         </button>
      </div>

      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-700 font-medium border-b border-gray-200">
            <tr>
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <tr>
              <td className="px-4 py-3 font-medium">Admin User (You)</td>
              <td className="px-4 py-3"><span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-xs font-bold">Owner</span></td>
              <td className="px-4 py-3 text-green-600 text-xs font-bold">Active</td>
              <td className="px-4 py-3 text-right text-gray-400">Locked</td>
            </tr>
            <tr>
              <td className="px-4 py-3">Sarah Manager</td>
              <td className="px-4 py-3">Manager</td>
              <td className="px-4 py-3 text-green-600 text-xs font-bold">Active</td>
              <td className="px-4 py-3 text-right"><button className="text-indigo-600 hover:underline">Edit</button></td>
            </tr>
            <tr>
              <td className="px-4 py-3">John Agent</td>
              <td className="px-4 py-3">Support Agent</td>
              <td className="px-4 py-3 text-gray-400 text-xs font-bold">Invited</td>
              <td className="px-4 py-3 text-right"><button className="text-red-500 hover:underline">Revoke</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  const IntegrationsTab = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">Integrations</h3>
        <p className="text-sm text-gray-500 mb-6">Connect external tools and services.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           {/* Google Maps */}
           <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 bg-blue-100 rounded flex items-center justify-center text-blue-600">
                    <Globe size={20} />
                 </div>
                 <div>
                    <h4 className="text-sm font-bold text-gray-900">Google Maps Platform</h4>
                    <p className="text-xs text-gray-500">For route visualization</p>
                 </div>
              </div>
              <div className="relative inline-block w-10 align-middle select-none">
                 <input type="checkbox" defaultChecked className="absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer border-gray-300 checked:right-0 checked:border-green-500"/>
                 <label className="block overflow-hidden h-5 rounded-full bg-gray-300 cursor-pointer checked:bg-green-500"></label>
              </div>
           </div>

           {/* Twilio */}
           <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 bg-red-100 rounded flex items-center justify-center text-red-600">
                    <Bell size={20} />
                 </div>
                 <div>
                    <h4 className="text-sm font-bold text-gray-900">Twilio SMS</h4>
                    <p className="text-xs text-gray-500">For ticket notifications</p>
                 </div>
              </div>
              <button className="text-xs bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded font-medium">Setup</button>
           </div>
        </div>
      </div>
    </div>
  );

  const SecurityTab = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div>
         <h3 className="text-lg font-bold text-gray-900 mb-1">Security Settings</h3>
         <p className="text-sm text-gray-500 mb-6">Configure access controls and authentication.</p>

         <div className="space-y-4 max-w-2xl">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
               <div className="flex items-center gap-3">
                  <Shield size={20} className="text-indigo-600" />
                  <div>
                     <h4 className="text-sm font-bold text-gray-900">Two-Factor Authentication (2FA)</h4>
                     <p className="text-xs text-gray-500">Enforce 2FA for all admin accounts.</p>
                  </div>
               </div>
               <div className="relative inline-block w-10 h-6 align-middle select-none">
                  <input type="checkbox" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer border-gray-300"/>
                  <label className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
               </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
               <div className="flex items-center gap-3">
                  <Lock size={20} className="text-indigo-600" />
                  <div>
                     <h4 className="text-sm font-bold text-gray-900">Password Policy</h4>
                     <p className="text-xs text-gray-500">Require special characters and rotation every 90 days.</p>
                  </div>
               </div>
               <div className="relative inline-block w-10 h-6 align-middle select-none">
                  <input type="checkbox" defaultChecked className="absolute block w-4 h-4 mt-1 ml-1 rounded-full bg-indigo-600 shadow-sm appearance-none cursor-pointer"/>
                  <label className="block overflow-hidden h-6 rounded-full bg-indigo-200 cursor-pointer"></label>
               </div>
            </div>
         </div>
      </div>
    </div>
  );

  const AuditLogsTab = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
       <div>
         <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Audit Logs</h3>
              <p className="text-sm text-gray-500">Track system activities and changes.</p>
            </div>
            <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50">
               <History size={14} /> Export Logs
            </button>
         </div>

         <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full text-xs text-left">
               <thead className="bg-gray-50 text-gray-700 font-medium border-b border-gray-200">
                  <tr>
                     <th className="px-4 py-3">Timestamp</th>
                     <th className="px-4 py-3">User</th>
                     <th className="px-4 py-3">Action</th>
                     <th className="px-4 py-3">Details</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-100 text-gray-600">
                  <tr>
                     <td className="px-4 py-3">2024-07-28 14:30:22</td>
                     <td className="px-4 py-3 font-medium text-gray-900">Admin User</td>
                     <td className="px-4 py-3">Update Settings</td>
                     <td className="px-4 py-3">Changed tax rate to 16%</td>
                  </tr>
                  <tr>
                     <td className="px-4 py-3">2024-07-28 11:15:00</td>
                     <td className="px-4 py-3 font-medium text-gray-900">Sarah Manager</td>
                     <td className="px-4 py-3">Login</td>
                     <td className="px-4 py-3">Successful login from IP 192.168.1.1</td>
                  </tr>
                  <tr>
                     <td className="px-4 py-3">2024-07-27 09:45:10</td>
                     <td className="px-4 py-3 font-medium text-gray-900">System</td>
                     <td className="px-4 py-3">Backup</td>
                     <td className="px-4 py-3">Automated database backup completed</td>
                  </tr>
               </tbody>
            </table>
         </div>
       </div>
    </div>
  );

  // --- Tab Navigation Helper ---
  
  const TabButton = ({ id, label }: { id: TabType, label: string }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={clsx(
        "px-4 py-2 text-sm font-medium whitespace-nowrap border-b-2 transition-colors",
        activeTab === id 
          ? "border-indigo-600 text-indigo-600" 
          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
      )}
    >
      {label}
    </button>
  );

  return (
    <div >
      
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage your system configuration, preferences, and account details.
        </p>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white border border-gray-200 rounded-t-xl shadow-sm mb-0 overflow-x-auto no-scrollbar">
        <div className="flex px-4 pt-2">
          <TabButton id="general" label="General" />
          <TabButton id="branding" label="Branding" />
          <TabButton id="financial" label="Financial" />
          <TabButton id="policies" label="Policies" />
          <TabButton id="users" label="Users & Permissions" />
          <TabButton id="integrations" label="Integrations" />
          <TabButton id="security" label="Security" />
          <TabButton id="audit" label="Audit Logs" />
        </div>
      </div>

      {/* Main Content Area (Dynamic based on Tab) */}
      <div className="bg-white border-x border-b border-gray-200 rounded-b-xl shadow-sm p-6 min-h-[500px]">
        {activeTab === 'general' && <GeneralTab />}
        {activeTab === 'branding' && <BrandingTab />}
        {activeTab === 'financial' && <FinancialTab />}
        {activeTab === 'policies' && <PoliciesTab />}
        {activeTab === 'users' && <UsersTab />}
        {activeTab === 'integrations' && <IntegrationsTab />}
        {activeTab === 'security' && <SecurityTab />}
        {activeTab === 'audit' && <AuditLogsTab />}

        {/* Global Save Button (visible on most tabs usually, but let's keep it here for simplicity) */}
        {activeTab !== 'audit' && (
           <div className="mt-8 pt-6 border-t border-gray-100">
             <button className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 shadow-sm shadow-indigo-200 transition-colors">
               <Save size={18} /> Save Changes
             </button>
           </div>
        )}
      </div>

      <footer className="mt-8 text-center text-sm text-gray-500 pb-8">
        © 2026 BusLink Admin Dashboard. All rights reserved.
      </footer>

    </div>
  );
}