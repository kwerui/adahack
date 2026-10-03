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
    <nav className="w-full flex items-center justify-between px-8 py-4 border-b bg-white">
      <Link
        href="/"
        className="font-bold text-xl text-green-600"
      >
        GreenStreet 🌱
      </Link>

      <div className="flex gap-6 text-gray-700">
        <Link href="/">Home</Link>

        <button
          onClick={openMyArea}
          className="hover:text-green-600"
        >
          My Area
        </button>

        <Link
          href="/about"
          className="hover:text-green-600"
        >
          About
        </Link>

        <Link
          href="/awards"
          className="hover:text-green-600"
        >
          Awards
        </Link>
      </div>
    </nav>
  );
}

