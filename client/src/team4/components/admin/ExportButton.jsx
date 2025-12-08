const ExportButton = () => {
  const handleExport = () => {
    alert("Excel файл татагдлаа! (Mock)");
  };

  return (
    <button
      onClick={handleExport}
      className="px-6 py-2 bg-[#13C3DA] text-white rounded-lg hover:bg-[#0e9da7] transition flex items-center gap-2"
    >
      <span>Export</span>
      <span>Excel</span>
    </button>
  );
};

export default ExportButton;
