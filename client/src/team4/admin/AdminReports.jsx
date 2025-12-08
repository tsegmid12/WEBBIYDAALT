"use client";
import ExportButton from "../components/admin/ExportButton";
import GrowthChart from "../components/admin/GrowthChart";
import RoleBreakdown from "../components/admin/RoleBreakdown";
import StatsCards from "../components/admin/StatsCards";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

import { useReportsData } from "./useReportsData";

export const AdminReports = () => {
  const { chartData, stats } = useReportsData();

  return (
    <div className="bg-[#f3f7fb] min-h-screen">
      <Topbar />
      <div className="flex pt-14">
        <Sidebar />
        <div className="flex-1 ml-64 px-8 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-[#0e153a]">Тайлан</h1>
              <p className="text-gray-600 mt-1">
                Хэрэглэгчийн статистик, идэвхжил
              </p>
            </div>

            <StatsCards stats={stats} />
            <div className="my-8" />
            <GrowthChart data={chartData} />
            <div className="my-8" />
            <RoleBreakdown stats={stats} />
            <div className="mt-6 text-right">
              <ExportButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
