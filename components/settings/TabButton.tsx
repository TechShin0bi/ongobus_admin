import { TabType } from "@/types/settings";
import clsx from "clsx";
import { Dispatch, SetStateAction } from "react";

export const TabButton = ({ id, label, setActiveTab, activeTab }: { id: TabType, label: string, setActiveTab: Dispatch<SetStateAction<TabType>>, activeTab: TabType }) => (
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

