export default function SystemTab() {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-[#0e153a]">
        Системийн тохиргоо
      </h3>
      <div className="bg-gray-50 p-6 rounded-lg space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium">Автоматаар нөөцлөх</p>
            <span className="text-sm text-gray-600 block">
              Өдөр бүр 02:00 цагт
            </span>
          </div>
          <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm">
            Нөөцлөх
          </button>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium">Системийн лог</p>
            <span className="text-sm text-gray-600 block">
              Сүүлийн 30 хоног
            </span>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
            Харах
          </button>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium">Кэш цэвэрлэх</p>
            <span className="text-sm text-gray-600 block">
              Түр зуурын файлууд
            </span>
          </div>
          <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm">
            Цэвэрлэх
          </button>
        </div>
      </div>
    </div>
  );
}
