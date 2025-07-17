"use client";

import { useState } from "react";
import { Calendar, AlertTriangle } from "lucide-react";

interface DateFilterProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  onSearch?: () => void;
  showCard?: boolean; // 카드 스타일 표시 여부
}

export default function DateFilter({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onSearch,
  showCard = true,
}: DateFilterProps) {
  const [dateError, setDateError] = useState("");

  // 30일 제한 계산 함수
  const getMinStartDate = (endDateStr: string) => {
    if (!endDateStr) return "";
    const endDate = new Date(endDateStr);
    if (isNaN(endDate.getTime())) return "";
    const minStartDate = new Date(endDate.getTime() - 29 * 24 * 60 * 60 * 1000);
    return minStartDate.toISOString().split("T")[0];
  };

  const getMaxEndDate = (startDateStr: string) => {
    if (!startDateStr) return "";
    const startDate = new Date(startDateStr);
    if (isNaN(startDate.getTime())) return "";
    const maxEndDate = new Date(startDate.getTime() + 29 * 24 * 60 * 60 * 1000);
    const today = new Date();

    return maxEndDate > today
      ? today.toISOString().split("T")[0]
      : maxEndDate.toISOString().split("T")[0];
  };

  // 날짜 유효성 검사
  const validateDates = (newStartDate: string, newEndDate: string) => {
    const today = new Date().toISOString().split("T")[0];

    if (newEndDate > today) {
      return "종료일은 오늘까지만 선택할 수 있습니다.";
    }

    if (newStartDate > newEndDate) {
      return "시작일은 종료일보다 늦을 수 없습니다.";
    }

    return "";
  };

  const handleStartDateChange = (newStartDate: string) => {
    const error = validateDates(newStartDate, endDate);

    if (error) {
      setDateError(error);
      return;
    }

    setDateError("");
    onStartDateChange(newStartDate);
  };

  const handleEndDateChange = (newEndDate: string) => {
    const error = validateDates(startDate, newEndDate);

    if (error) {
      setDateError(error);
      return;
    }

    setDateError("");
    onEndDateChange(newEndDate);
  };

  const content = (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        <Calendar className="h-3 w-3 text-gray-500" />
        <span className="text-xs text-gray-700 font-medium">기간</span>
      </div>

      <div className="flex items-center gap-1">
        <input
          type="date"
          value={startDate}
          min={getMinStartDate(endDate)}
          max={endDate}
          onChange={(e) => handleStartDateChange(e.target.value)}
          className={`px-1 py-1 border rounded text-xs ${
            dateError
              ? "border-red-300 focus:ring-red-500"
              : "border-gray-200 focus:ring-pink-500"
          } focus:outline-none focus:ring-1`}
        />
        <span className="text-gray-400 text-xs">~</span>
        <input
          type="date"
          value={endDate}
          min={startDate}
          max={getMaxEndDate(startDate)}
          onChange={(e) => handleEndDateChange(e.target.value)}
          className={`px-1 py-1 border rounded text-xs ${
            dateError
              ? "border-red-300 focus:ring-red-500"
              : "border-gray-200 focus:ring-pink-500"
          } focus:outline-none focus:ring-1`}
        />
      </div>

      {onSearch && (
        <button
          disabled={!!dateError}
          onClick={onSearch}
          className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
            dateError
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-pink-500 text-white hover:bg-pink-600"
          }`}
        >
          조회
        </button>
      )}

      {/* 에러 메시지 */}
      {dateError && (
        <div className="ml-2 flex items-center gap-1 text-red-600 text-xs">
          <AlertTriangle className="h-3 w-3" />
          <span>{dateError}</span>
        </div>
      )}
    </div>
  );

  if (showCard) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 mb-3">
        {content}
      </div>
    );
  }

  return content;
}
