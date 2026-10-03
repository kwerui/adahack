import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between px-8 py-4 border-b bg-white">
      <Link href="/" className="font-bold text-xl">
        GreenStreet 🌱
      </Link>

      <div className="flex gap-6">
        <Link href="/">Home</Link>
        <Link href="/area">My Area</Link>
        <Link href="/challenge">Challenge</Link>
      </div>
    </nav>
  );
}

