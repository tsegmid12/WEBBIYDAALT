const tabs = [
  { id: "profile", label: "Хувийн мэдээлэл" },
  { id: "security", label: "Нууцлал" },
  { id: "notifications", label: "Мэдэгдэл" },
  { id: "system", label: "Систем" },
];

export default function SettingsTabs({ activeTab, setActiveTab }) {
  return (
    <div className="border-b border-gray-200">
      <nav className="flex space-x-8 px-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === tab.id
                ? "border-[#13C3DA] text-[#13C3DA]"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
