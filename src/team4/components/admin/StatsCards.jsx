import PropTypes from "prop-types";

const StatsCards = ({ stats }) => {
  const cards = [
    {
      label: "Нийт хэрэглэгч",
      value: stats.total,
      color: "bg-[#13C3DA]",
    },
    {
      label: "Оюутнууд",
      value: stats.students,
      color: "bg-blue-100",
    },
    {
      label: "Багш нар",
      value: stats.teachers,
      color: "bg-green-100",
    },
    {
      label: "Өнөөдөр идэвхтэй",
      value: stats.activeToday,
      color: "bg-emerald-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((c, i) => (
        <div
          key={i}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">{c.label}</p>
              <p className="text-3xl font-bold text-[#0e153a] mt-1">
                {c.value}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

StatsCards.propTypes = {
  stats: PropTypes.shape({
    total: PropTypes.number.isRequired,
    students: PropTypes.number.isRequired,
    teachers: PropTypes.number.isRequired,
    activeToday: PropTypes.number.isRequired,
  }).isRequired,
};

export default StatsCards;
