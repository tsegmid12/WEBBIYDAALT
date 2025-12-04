"use client";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import ProfileTab from "../components/admin/ProfileTab";
import SecurityTab from "../components/admin/SecurityTab";
import { NotificationsTab } from "../components/admin/NotificationsTab";
import SchoolTab from "../components/admin/SchoolTab";
import SettingsHeader from "../components/admin/SettingsHeader";
import SettingsTabs from "../components/admin/SettingsTabs";
import SystemTab from "../components/admin/SystemTab";

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState("profile");

  const renderTab = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileTab />;
      case "security":
        return <SecurityTab />;
      case "notifications":
        return <NotificationsTab />;
      case "school":
        return <SchoolTab />;
      case "system":
        return <SystemTab />;
      default:
        return <ProfileTab />;
    }
  };

  return (
    <div className="bg-[#f3f7fb] min-h-screen">
      <Topbar />
      <div className="flex pt-14">
        <Sidebar />
        <div className="flex-1 ml-64 px-8 py-8">
          <div className="max-w-4xl mx-auto">
            <SettingsHeader />
            <div className="bg-white rounded-xl shadow-sm">
              <SettingsTabs activeTab={activeTab} setActiveTab={setActiveTab} />
              <div className="p-6">{renderTab()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
