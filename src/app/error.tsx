"use client";

import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // 에러 로깅 (개발 시에만)
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#1D1D1D] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* 에러 아이콘 */}
        <div className="mb-8">
          <div className="mx-auto w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
        </div>

        {/* 에러 메시지 */}
        <h1 className="text-2xl font-bold text-white mb-4">
          앗! 문제가 발생했어요
        </h1>

        <p className="text-gray-400 mb-8">
          페이지를 불러오는 중에 오류가 발생했습니다.
          <br />
          잠시 후 다시 시도해주세요.
        </p>

        {/* 에러 정보 (개발 모드에서만 표시) */}
        {process.env.NODE_ENV === "development" && (
          <div className="mb-8 p-4 bg-gray-800/50 rounded-lg text-left">
            <h3 className="text-sm font-medium text-red-400 mb-2">
              개발 모드 에러 정보:
            </h3>
            <code className="text-xs text-gray-300 break-all">
              {error.message}
            </code>
          </div>
        )}

        {/* 액션 버튼들 */}
        <div className="space-y-4">
          <button
            onClick={reset}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
          >
            다시 시도
          </button>

          <button
            onClick={() => (window.location.href = "/")}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
          >
            홈으로 돌아가기
          </button>
        </div>

        {/* 추가 도움말 */}
        <p className="text-sm text-gray-500 mt-8">
          문제가 지속되면{" "}
          <a
            href="mailto:your-email@example.com"
            className="text-blue-400 hover:text-blue-300 underline"
          >
            문의
          </a>
          해주세요.
        </p>
      </div>
    </div>
  );
}
