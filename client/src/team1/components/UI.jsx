import React from "react";

export const PageHeader = ({ title, subtitle, right }) => (
  <div className="mb-5 flex items-start justify-between gap-4">
    <div>
      <h1 className="text-2xl font-semibold text-white">{title}</h1>
      {subtitle && <p className="text-sm text-slate-300 mt-1">{subtitle}</p>}
    </div>
    {right}
  </div>
);

export const Card = ({ children, className = "" }) => (
  <div className={`rounded-2xl border border-white/10 bg-white/5 p-5 ${className}`}>{children}</div>
);

export const Button = ({ children, variant = "primary", className = "", ...props }) => {
  const base = "inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium border transition";
  const styles = {
    primary: "bg-indigo-500 hover:bg-indigo-600 border-indigo-400/30 text-white",
    ghost: "bg-transparent hover:bg-white/10 border-white/10 text-white/90",
    danger: "bg-rose-600 hover:bg-rose-700 border-rose-500/30 text-white",
  };
  return (
    <button className={`${base} ${styles[variant]} ${className}`} {...props}>{children}</button>
  );
};

export const Input = ({ label, hint, ...props }) => (
  <label className="block text-sm"> 
    <div className="text-slate-200 mb-1">{label}</div>
    <input
      {...props}
      className="w-full rounded-xl bg-slate-900/60 border border-white/10 px-3 py-2 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
    />
    {hint && <div className="mt-1 text-xs text-slate-400">{hint}</div>}
  </label>
);

export const Select = ({ label, children, ...props }) => (
  <label className="block text-sm">
    <div className="text-slate-200 mb-1">{label}</div>
    <select
      {...props}
      className="w-full rounded-xl bg-slate-900/60 border border-white/10 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
    >
      {children}
    </select>
  </label>
);

export const Textarea = ({ label, rows = 4, ...props }) => (
  <label className="block text-sm">
    <div className="text-slate-200 mb-1">{label}</div>
    <textarea
      rows={rows}
      {...props}
      className="w-full rounded-xl bg-slate-900/60 border border-white/10 px-3 py-2 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
    />
  </label>
);

export const Table = ({ columns = [], children }) => (
  <div className="overflow-x-auto rounded-2xl border border-white/10">
    <table className="min-w-full divide-y divide-white/10">
      <thead className="bg-white/5">
        <tr>
          {columns.map((c) => (
            <th key={c} className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-300">
              {c}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-white/5 bg-white/0">{children}</tbody>
    </table>
  </div>
);