import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between px-8 py-4 border-b bg-white">
      <Link href="/" className="font-bold text-xl text-green-600">
        GreenStreet 🌱
      </Link>

      <div className="flex gap-6 text-gray-700">
        <Link href="/">Home</Link>
        <Link href="/area">My Area</Link>
        <Link href="/challenge">Challenge</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Awards</Link>
      </div>
    </nav>
  );
}

