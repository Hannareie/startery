import Link from "next/link";

export function MainNav() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center justify-end px-4">
        <nav className="flex items-center space-x-8 lg:space-x-10 mx-6">
          <Link href="/dashboard" className="text-md font-medium">
            Dashboard
          </Link>
          <Link href="/bountyboard" className="text-md font-medium">
            Bountyboard
          </Link>
          <Link href="/profile" className="text-md font-medium">
            Profile
          </Link>
        </nav>
      </div>
    </div>
  );
}
