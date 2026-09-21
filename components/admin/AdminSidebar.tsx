"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_SECTIONS: { label: string; href: string }[] = [
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: "News", href: "/admin/news" },
  { label: "Videos", href: "/admin/videos" },
  { label: "Programs", href: "/admin/programs" },
  { label: "Gallery", href: "/admin/gallery" },
  { label: "Press Releases", href: "/admin/press-releases" },
  { label: "Announcements", href: "/admin/announcements" },
  { label: "Live TV", href: "/admin/live" },
  { label: "Messages", href: "/admin/messages" },
  { label: "Subscribers", href: "/admin/subscribers" },
  { label: "Settings", href: "/admin/settings" },
];

export default function AdminSidebar({ isAdmin }: { isAdmin: boolean }) {
  const pathname = usePathname();

  return (
    <nav className="space-y-1">
      {NAV_SECTIONS.map((item) => {
        const active = pathname === item.href || pathname.startsWith(item.href + "/");
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`block rounded px-3 py-2 text-sm font-medium transition ${
              active
                ? "bg-navy text-white"
                : "text-navy-dark hover:bg-offwhite"
            }`}
          >
            {item.label}
          </Link>
        );
      })}

      {isAdmin && (
        <>
          <div className="my-3 border-t border-navy/10" />
          <Link
            href="/admin/users"
            className={`block rounded px-3 py-2 text-sm font-medium transition ${
              pathname.startsWith("/admin/users")
                ? "bg-navy text-white"
                : "text-navy-dark hover:bg-offwhite"
            }`}
          >
            Staff Accounts
          </Link>
        </>
      )}
    </nav>
  );
}
