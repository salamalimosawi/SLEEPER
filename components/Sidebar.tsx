"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: "🏠" },
  { href: "/sleep-diary", label: "Sleep Diary", icon: "🛏" },
  { href: "/wind-down", label: "Wind-Down", icon: "🌙" },
  { href: "/insights", label: "Insights", icon: "📊" },
  { href: "/progress", label: "Progress", icon: "🌱" },
  { href: "/settings", label: "Settings", icon: "⚙️" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 min-h-screen border-r p-4 flex flex-col gap-2">
      <div className="mb-6">
        <h1 className="text-xl font-bold">Code Sleep</h1>
        <p className="text-xs text-gray-500">
          Sleep better, intentionally
        </p>
      </div>

      {navItems.map((item) => {
        const active = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2 rounded text-sm
              ${active ? "bg-black text-white" : "hover:bg-gray-100"}
            `}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        );
      })}
    </aside>
  );
}