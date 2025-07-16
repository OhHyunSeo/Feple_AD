import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex items-center justify-center gap-2 mt-4">
      {/* 이전 페이지 */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`flex items-center justify-center w-8 h-8 rounded border text-sm ${
          currentPage === 1
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white text-gray-600 hover:bg-gray-50 border-gray-300"
        }`}
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {/* 페이지 번호들 */}
      {visiblePages.map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === "number" && onPageChange(page)}
          disabled={page === "..."}
          className={`flex items-center justify-center w-8 h-8 rounded border text-sm ${
            page === currentPage
              ? "bg-pink-500 text-white border-pink-500"
              : page === "..."
              ? "bg-white text-gray-400 cursor-default border-gray-200"
              : "bg-white text-gray-600 hover:bg-gray-50 border-gray-300"
          }`}
        >
          {page}
        </button>
      ))}

      {/* 다음 페이지 */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`flex items-center justify-center w-8 h-8 rounded border text-sm ${
          currentPage === totalPages
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white text-gray-600 hover:bg-gray-50 border-gray-300"
        }`}
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
