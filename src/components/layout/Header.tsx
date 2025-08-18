import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#191919]/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* 로고 */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative h-8 w-8 rounded-full overflow-hidden">
              <Image
                src="/profile.png"
                fill
                alt="profile"
                className="object-cover"
              />
            </div>
            <span className="text-xl font-bold text-white">JBlog</span>
          </Link>

          {/* 네비게이션 */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/about"
              className="text-gray-300 hover:text-white transition-colors duration-200"
            >
              About
            </Link>
            <Link
              href="/projects"
              className="text-gray-300 hover:text-white transition-colors duration-200"
            >
              Projects
            </Link>
            <Link
              href="/books"
              className="text-gray-300 hover:text-white transition-colors duration-200"
            >
              Books
            </Link>
          </nav>

          {/* 모바일 메뉴 버튼 */}
          <button className="md:hidden text-gray-300 hover:text-white">
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
