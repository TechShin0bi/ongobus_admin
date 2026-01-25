"use client";

import { useState } from "react";
import { Save } from "lucide-react";
import { useTranslations } from "next-intl";
import { TabButton } from "@/components/settings/TabButton";
import { AuditLogsTab } from "@/components/settings/AuditLogsTab";
import { GeneralTab } from "@/components/settings/GeneralTab";
import { BrandingTab } from "@/components/settings/BrandingTab";
import { FinancialTab } from "@/components/settings/FinancialTab";
import { PoliciesTab } from "@/components/settings/PoliciesTab";
import { UsersTab } from "@/components/settings/UsersTab";
import { IntegrationsTab } from "@/components/settings/IntegrationsTab";
import { SecurityTab } from "@/components/settings/SecurityTab";
import { TabType } from "@/types/settings";

// --- Components ---

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabType>('general');
  const t = useTranslations('settings');
  
  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{t('title')}</h1>
        <p className="text-sm text-gray-500 mt-1">
          {t('subtitle')}
        </p>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white border border-gray-200 rounded-t-xl shadow-sm mb-0 overflow-x-auto no-scrollbar">
        <div className="flex px-4 pt-2">
          <TabButton id="general" label={t('tabs.general')} setActiveTab={setActiveTab} activeTab={activeTab} />
          <TabButton id="branding" label={t('tabs.branding')} setActiveTab={setActiveTab} activeTab={activeTab} />
          <TabButton id="financial" label={t('tabs.financial')} setActiveTab={setActiveTab} activeTab={activeTab} />
          <TabButton id="policies" label={t('tabs.policies')} setActiveTab={setActiveTab} activeTab={activeTab} />
          <TabButton id="users" label={t('tabs.users')} setActiveTab={setActiveTab} activeTab={activeTab} />
          <TabButton id="integrations" label={t('tabs.integrations')} setActiveTab={setActiveTab} activeTab={activeTab} />
          <TabButton id="security" label={t('tabs.security')} setActiveTab={setActiveTab} activeTab={activeTab} />
          <TabButton id="audit" label={t('tabs.audit')} setActiveTab={setActiveTab} activeTab={activeTab} />
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

        {/* Global Save Button */}
        {activeTab !== 'audit' && (
           <div className="mt-8 pt-6 border-t border-gray-100">
             <button className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 shadow-sm shadow-indigo-200 transition-colors">
               <Save size={18} /> {t('saveButton.label')}
             </button>
           </div>
        )}
      </div>

      <footer className="mt-8 text-center text-sm text-gray-500 pb-8">
        {t('footer')}
      </footer>

    </div>
  );
}