import clsx from "clsx";

interface TabsProps {
  activeTab: 'agencies' | 'users';
  onTabChange: (tab: 'agencies' | 'users') => void;
}

export default function Tabs({ activeTab, onTabChange }: TabsProps) {
  return (
    <div className="bg-white rounded-lg p-1 inline-flex mb-6 border border-gray-200 w-full md:w-auto shadow-sm">
      <button
        onClick={() => onTabChange('agencies')}
        className={clsx(
          "flex-1 md:flex-none px-8 py-2 text-sm font-medium rounded-md transition-all",
          activeTab === 'agencies'
            ? "bg-gray-100 text-indigo-700 shadow-inner"
            : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
        )}
      >
        Agencies
      </button>
      <button
        onClick={() => onTabChange('users')}
        className={clsx(
          "flex-1 md:flex-none px-8 py-2 text-sm font-medium rounded-md transition-all",
          activeTab === 'users'
            ? "bg-gray-100 text-indigo-700 shadow-inner"
            : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
        )}
      >
        Users
      </button>
    </div>
  );
}
