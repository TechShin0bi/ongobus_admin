"use client"; // Ensure this is at the very top

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Search, Plus, ChevronDown, Edit } from "lucide-react";
import { Modal } from "@/components/common/ui/Modal";
import { AddBusForm } from "./AddBusForm";
import clsx from "clsx";
import { Bus } from "@/types/buses";

interface BusListProps {
  buses: Bus[];
  selectedBusId: string;
  onSelectBus: (id: string) => void;
  agencies: string[];
}

export const BusList = ({
  buses,
  selectedBusId,
  onSelectBus,
  agencies,
}: BusListProps) => {
  const t = useTranslations("Buses");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getStatusTranslationKey = (status: Bus["status"]) => {
    const key = `status.${status.toLowerCase()}` as
      | "status.active"
      | "status.maintenance"
      | "status.retired";
    return key;
  };

  return (
    <>
      <div className="xl:col-span-4 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden h-[calc(100vh-140px)] flex flex-col">
        <div className="p-4 border-b border-gray-100 bg-white sticky top-0 z-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-900">{t("busFleet")}</h2>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-1.5 bg-indigo-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
            >
              <Plus size={16} /> {t("addNewBus")}
            </button>
          </div>

          <div className="relative mb-3">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder={t("searchPlaceholder")}
              className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div className="flex gap-2">
            <div className="relative flex-1">
              <select className="w-full appearance-none bg-gray-50 border border-gray-300 text-gray-700 py-1.5 px-3 rounded-lg text-sm focus:outline-none">
                <option>{t("allBusTypes")}</option>
                <option value="AC">{t("types.ac")}</option>
                <option value="Non-AC">{t("types.nonAc")}</option>
                <option value="Sleeper">{t("types.sleeper")}</option>
              </select>
              <ChevronDown className="absolute right-2 top-2.5 h-3 w-3 text-gray-500 pointer-events-none" />
            </div>
            <div className="relative flex-1">
              <select className="w-full appearance-none bg-gray-50 border border-gray-300 text-gray-700 py-1.5 px-3 rounded-lg text-sm focus:outline-none">
                <option>{t("allAgencies")}</option>
                {agencies.map((agency) => (
                  <option key={agency} value={agency}>
                    {agency}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-2.5 h-3 w-3 text-gray-500 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="overflow-y-auto flex-1 p-2 space-y-2">
          {buses.map((bus) => (
            <div
              key={bus.id}
              onClick={() => onSelectBus(bus.id)}
              className={clsx(
                "flex gap-3 p-3 rounded-lg cursor-pointer border transition-all",
                selectedBusId === bus.id
                  ? "bg-indigo-50 border-indigo-200"
                  : "bg-white border-gray-100 hover:border-gray-300",
              )}
            >
              <img
                src={bus.image}
                alt={bus.regNumber}
                className="w-16 h-16 rounded-lg object-cover bg-gray-200"
              />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h3 className="text-sm font-bold text-gray-900 truncate">
                    {bus.regNumber}
                  </h3>
                  <span
                    className={clsx(
                      "text-[10px] px-2 py-0.5 rounded-full font-medium",
                      bus.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600",
                    )}
                  >
                    {t(getStatusTranslationKey(bus.status))}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {`${bus.type.toLowerCase().replace("-", "").toUpperCase()}`} •{" "}
                  {bus.seats} {t("seats")}
                </p>
                <p className="text-xs text-indigo-600 mt-0.5 font-medium">
                  {bus.agency}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="p-2 border-t border-gray-100 mt-auto">
          <button className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-indigo-600 p-2 rounded-lg w-full justify-start">
            <Edit size={16} /> {t("editList")}
          </button>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={t("addNewBus")}
      >
        <AddBusForm
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </>
  );
};
