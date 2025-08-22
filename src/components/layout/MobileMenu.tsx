"use client";

import Link from "next/link";
import { useState } from "react";

export default function MobileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* 모바일 메뉴 버튼 */}
      <button
        className="md:hidden text-gray-300 hover:text-white"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isMenuOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* 모바일 메뉴 */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#191919]/95 backdrop-blur-md border-t border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/about"
              className="block px-3 py-2 text-base text-gray-300 hover:text-white hover:bg-white/5 rounded-md transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/projects"
              className="block px-3 py-2 text-base text-gray-300 hover:text-white hover:bg-white/5 rounded-md transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Projects
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
