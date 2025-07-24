"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface DateRangeContextType {
  startDate: string;
  endDate: string;
  setDateRange: (startDate: string, endDate: string) => void;
  resetToYesterday: () => void;
}

const DateRangeContext = createContext<DateRangeContextType | undefined>(
  undefined
);

// 어제 날짜 계산 함수 (한국 시간 기준) - 테스트용 고정 날짜
const getYesterdayDate = () => {
  // 테스트를 위해 고정된 오늘 날짜 사용
  const today = new Date(Date.now());

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const year = yesterday.getFullYear();
  const month = String(yesterday.getMonth() + 1).padStart(2, "0");
  const day = String(yesterday.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export function DateRangeProvider({ children }: { children: React.ReactNode }) {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  // 초기값 설정 (어제 날짜)
  useEffect(() => {
    const yesterday = getYesterdayDate();
    setStartDate(yesterday);
    setEndDate(yesterday);
  }, []);

  const setDateRange = (newStartDate: string, newEndDate: string) => {
    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };

  const resetToYesterday = () => {
    const yesterday = getYesterdayDate();
    setStartDate(yesterday);
    setEndDate(yesterday);
  };

  return (
    <DateRangeContext.Provider
      value={{
        startDate,
        endDate,
        setDateRange,
        resetToYesterday,
      }}
    >
      {children}
    </DateRangeContext.Provider>
  );
}

export function useDateRange() {
  const context = useContext(DateRangeContext);
  if (context === undefined) {
    throw new Error("useDateRange must be used within a DateRangeProvider");
  }
  return context;
}
