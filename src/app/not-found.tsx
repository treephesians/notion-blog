import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-[calc(100dvh-10rem)] bg-[#1D1D1D] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="">
          <div className="relative mx-auto w-60 h-60">
            <Image
              src="/not-found.png"
              alt="Not Found"
              fill
              sizes="240px"
              className="object-contain opacity-90"
              priority
            />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-white mb-4">
          페이지를 찾을 수 없어요
        </h1>

        <p className="text-gray-400 mb-8">
          요청하신 페이지가 존재하지 않거나
          <br />
          이동되었을 수 있습니다.
        </p>

        <div className="space-y-4">
          <Link
            href="/"
            className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
