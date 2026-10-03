"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  function openMyArea() {
    const savedArea = localStorage.getItem("lastAreaUrl");

    if (savedArea) {
      router.push(savedArea);
    } else {
      router.push("/");
    }
  }

  return (
<nav className="sticky top-0 z-50 w-full flex items-center justify-between px-4 sm:px-8 py-4 border-b border-green-100 bg-white/95 backdrop-blur shadow-sm">      
<Link
  href="/"
  className="font-bold text-xl text-green-700 hover:text-green-800 transition"
>
  GreenStreet 🌱
</Link>

<div className="flex items-center gap-3 sm:gap-6 text-sm sm:text-base font-medium text-gray-600">
            <Link href="/">Home</Link>

        <button
          onClick={openMyArea}
className="hover:text-green-700 transition"        >
          My Dashboard
        </button>

        <Link
          href="/about"
className="hover:text-green-700 transition"        >
          About
        </Link>

        <Link
          href="/awards"
className="hover:text-green-700 transition"        >
          Awards
        </Link>
      </div>
    </nav>
  );
}

