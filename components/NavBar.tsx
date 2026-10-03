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
    <nav className="sticky top-0 z-50 w-full border-b border-green-100 bg-white/95 backdrop-blur shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

          <Link
            href="/"
            className="font-bold text-xl text-green-700 hover:text-green-800 transition whitespace-nowrap"
          >
            GreenStreet 🌱
          </Link>

          <div className="grid grid-cols-4 sm:flex items-center w-full sm:w-auto text-center gap-1 sm:gap-6 text-sm sm:text-base font-medium text-gray-600">

            <Link
              href="/"
              className="hover:text-green-700 transition py-1"
            >
              Home
            </Link>

            <button
              onClick={openMyArea}
              className="hover:text-green-700 transition py-1"
            >
              Dashboard
            </button>

            <Link
              href="/about"
              className="hover:text-green-700 transition py-1"
            >
              About
            </Link>

            <Link
              href="/awards"
              className="hover:text-green-700 transition py-1"
            >
              Awards
            </Link>

          </div>
        </div>
      </div>
    </nav>
  );
}

