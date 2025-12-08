import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { getSelectedRole, setSelectedRole, getRoleLabel, getRoleEmail, isAdmin, isProfessor, isStudent } from "./utils/role";

// Tailwind helpers
const active = ({ isActive }) =>
  isActive
    ? "flex items-center gap-3 rounded-xl bg-white/10 text-white px-3 py-2"
    : "flex items-center gap-3 rounded-xl text-white/80 hover:text-white hover:bg-white/10 px-3 py-2";

export default function Team1Layout() {
  const [open, setOpen] = React.useState(true);
  const [currentRole, setCurrentRole] = React.useState(getSelectedRole());
  const navigate = useNavigate();

  const handleRoleChange = (e) => {
    const newRole = e.target.value;
    setSelectedRole(newRole);
    setCurrentRole(newRole);
    navigate("/team1/schools");
  };

  const getRoleIcon = () => {
    if (isAdmin()) return "👩‍💻";
    if (isProfessor()) return "👨‍🏫";
    return "👨‍🎓";
  };

  const getRoleColor = () => {
    if (isAdmin()) return "bg-indigo-500/30 border-indigo-400/30";
    if (isProfessor()) return "bg-blue-500/30 border-blue-400/30";
    return "bg-green-500/30 border-green-400/30";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100">
      {/* Top bar */}
      <header className="sticky top-0 z-40 backdrop-blur border-b border-white/10 bg-slate-900/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden inline-flex items-center justify-center rounded-xl border border-white/10 px-3 py-2 hover:bg-white/10"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle sidebar"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
            </button>
            <span className="text-xl font-bold tracking-tight">ITM301 · Team 1</span>
            <span className="hidden sm:inline text-xs font-medium px-2 py-1 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-400/20">Frontend</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:block text-sm text-slate-300/90">2025‑10‑30 · Ulaanbaatar</div>
            <select
              value={currentRole}
              onChange={handleRoleChange}
              className="rounded-lg border border-white/10 bg-slate-800/50 text-white text-sm px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            >
              <option value="admin">Админ</option>
              <option value="professor">Багш</option>
              <option value="student">Оюутан</option>
            </select>
            <div className="flex items-center gap-2 rounded-xl border border-white/10 px-2 py-1">
              <div className={`h-7 w-7 rounded-lg ${getRoleColor()} grid place-items-center`}>{getRoleIcon()}</div>
              <div className="leading-tight">
                <div className="text-sm">{getRoleEmail()}</div>
                <div className="text-[11px] text-slate-400">{getRoleLabel()}</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid lg:grid-cols-[280px,1fr] gap-6">
        {/* Sidebar */}
        <aside className={(open ? "block" : "hidden") + " lg:block"}>
          <nav className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.6)]">
            <Section title="Сургууль (Section 4)">
              <NavLink to="/team1/schools" className={active}>🏫 Сургуулиуд</NavLink>
              {isAdmin() && <NavLink to="/team1/schools/create" className={active}>➕ Шинэ сургууль</NavLink>}
              {isAdmin() && <NavLink to="/team1/report" className={active}>📊 Тайлан/статистик</NavLink>}
            </Section>

            <Section title="Хичээл (Section 5)">
              <NavLink to="/team1/courses" className={active}>📚 Хичээлүүд</NavLink>
              {isAdmin() && <NavLink to="/team1/categories" className={active}>🏷️ Ангиллууд</NavLink>}
              {(isAdmin() || isProfessor()) && <NavLink to="/team1/courses/create" className={active}>➕ Шинэ хичээл</NavLink>}
            </Section>

            <Section title="Агуулга (Section 6)">
              <NavLink to="/team1/courses/11/lessons" className={active}>🧩 Сэдвийн жагсаалт</NavLink>
              {(isAdmin() || isProfessor()) && <NavLink to="/team1/courses/11/lessons/create" className={active}>➕ Сэдэв/агуулга нэмэх</NavLink>}
            </Section>
          </nav>
        </aside>

        {/* Main content */}
        <main className="space-y-4">
          <Breadcrumbs />
          <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/0 p-5 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.6)]">
            <Outlet />
          </div>
          <footer className="text-xs text-slate-400/80 py-4">© 2025 Team 1 · ITM301</footer>
        </main>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="mb-5">
      <div className="text-[11px] uppercase tracking-wider text-slate-300/60 mb-2 px-1">{title}</div>
      <div className="flex flex-col gap-1">{children}</div>
    </div>
  );
}

function Breadcrumbs() {
  const [parts, setParts] = React.useState([]);
  React.useEffect(() => {
    const onHashless = () => {
      const path = window.location.pathname.replace(/^\/+|\/+$/g, "");
      const segs = path ? path.split("/") : [];
      setParts(segs);
    };
    // initialize
    onHashless();
    // add listener
    window.addEventListener("popstate", onHashless);
    // cleanup properly
    return () => window.removeEventListener("popstate", onHashless);
  }, []);

  return (
    <div className="flex items-center gap-2 text-sm text-slate-300">
      <a href="/" className="hover:underline">Нүүр</a>
      {parts.map((p, i) => (
        <React.Fragment key={i}>
          <span className="opacity-60">/</span>
          <span className="capitalize opacity-90">{decodeURIComponent(p)}</span>
        </React.Fragment>
      ))}
    </div>
  );
}