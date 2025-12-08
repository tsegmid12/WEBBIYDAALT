import PropTypes from "prop-types";

const roleInfo = {
  schoolstudent: { label: "Оюутан", color: "bg-blue-100 text-blue-800" },
  schoolteacher: { label: "Багш", color: "bg-green-100 text-green-800" },
  schooladmin: {
    label: "Сургуулийн админ",
    color: "bg-purple-100 text-purple-800",
  },
  total: { label: "Нийт", color: "bg-[#13C3DA] text-white" },
};

const RoleBreakdown = ({ stats }) => {
  const entries = [
    { role: "schoolstudent", count: stats.students },
    { role: "schoolteacher", count: stats.teachers },
    { role: "schooladmin", count: stats.admins },
    { role: "total", count: stats.total },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-xl font-semibold text-[#0e153a] mb-4">
        Хэрэглэгчид дүрслэлээр
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {entries.map(({ role, count }) => {
          const { label, color } = roleInfo[role];
          return (
            <div key={role} className={`p-4 rounded-lg border ${color}`}>
              <p className="text-sm font-medium">{label}</p>
              <p
                className={`text-2xl font-bold mt-1 ${
                  role === "total" ? "text-white" : "text-gray-900"
                }`}
              >
                {count}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

RoleBreakdown.propTypes = {
  stats: PropTypes.shape({
    students: PropTypes.number.isRequired,
    teachers: PropTypes.number.isRequired,
    admins: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
  }).isRequired,
};

export default RoleBreakdown;
