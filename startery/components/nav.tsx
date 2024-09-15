"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export function MainNav() {
  const path = usePathname();
  return (
    <div className="border-b">
      <div className="flex h-20 items-center justify-between px-4">
        {/* Logo Section */}
        <div className="flex items-center ml-6">
          <Link href="/">
            <Image src="/logo.png" alt="Logo" width={200} height={200} />
          </Link>
        </div>

        {/* Navigation Section */}
        <nav className="flex items-center space-x-8 lg:space-x-10 mr-6">
          <Link
            href="/dashboard"
            className={`text-xl font-medium ${path === "/dashboard" ? "text-sidebar2" : "text-gray-700"}`}
          >
            Dashboard
          </Link>
          <Link
            href="/bountyboard"
            className={`text-xl font-medium ${path === "/bountyboard" ? "text-sidebar2" : "text-gray-700"}`}
          >
            Bountyboard
          </Link>
          <Link
            href="/profile"
            className={`text-xl font-medium ${path === "/profile" ? "text-sidebar2" : "text-gray-700"}`}
          >
            Profile
          </Link>
        </nav>
      </div>
    </div>
  );
}
