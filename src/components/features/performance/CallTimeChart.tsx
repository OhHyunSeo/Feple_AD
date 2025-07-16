"use client";

import { Clock } from "lucide-react";
import SparkLineChart from "./SparkLineChart";

interface CallTimeChartProps {
  startDate: string;
  endDate: string;
}

export default function CallTimeChart({
  startDate,
  endDate,
}: CallTimeChartProps) {
  // 날짜 범위 계산
  const getDatesInRange = (start: string, end: string) => {
    const dates = [];
    const current = new Date(start);
    const endDate = new Date(end);

    while (current <= endDate) {
      dates.push(new Date(current).toISOString().split("T")[0]);
      current.setDate(current.getDate() + 1);
    }
    return dates;
  };

  const dates = getDatesInRange(startDate, endDate);

  // 더미 데이터 생성 (실제로는 API에서 받아올 데이터)
  const generateCallTimeData = (
    length: number,
    baseTime: number,
    variance: number
  ) => {
    return Array.from({ length }, () =>
      Math.max(0, baseTime + (Math.random() - 0.5) * variance)
    );
  };

  const myCallTimes = generateCallTimeData(dates.length, 8.5, 4); // 평균 8.5분, 변동폭 4분
  const teamCallTimes = generateCallTimeData(dates.length, 7.2, 3); // 팀 평균 7.2분, 변동폭 3분

  // 날짜 라벨 처리
  const displayDates = dates.map((date, index) => `${index + 1}일차`);

  // 평균값 계산
  const myAverage =
    myCallTimes.reduce((sum, time) => sum + time, 0) / myCallTimes.length;
  const teamAverage =
    teamCallTimes.reduce((sum, time) => sum + time, 0) / teamCallTimes.length;

  // 시간 포맷팅 (분:초)
  const formatTime = (minutes: number) => {
    const mins = Math.floor(minutes);
    const secs = Math.round((minutes - mins) * 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3">
      <div className="mb-2">
        <h3 className="text-sm font-semibold performance-header flex items-center gap-1">
          <Clock className="h-3 w-3 text-green-500" />
          평균 통화 시간
        </h3>
      </div>

      <div className="space-y-2">
        {/* 평균값 표시 */}
        <div className="flex justify-between text-xs">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-pink-500 rounded"></div>
            <span className="performance-text-pink">
              내 평균: {formatTime(myAverage)}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-gray-400 rounded"></div>
            <span className="performance-team-text">
              팀 평균: {formatTime(teamAverage)}
            </span>
          </div>
        </div>

        {/* 스파크 라인 차트 */}
        <div className="flex justify-center">
          <SparkLineChart
            data={myCallTimes}
            teamData={teamCallTimes}
            xLabels={displayDates}
            width={200}
            height={80}
          />
        </div>

        {/* 기간 표시 */}
        <div className="text-xs performance-text-gray-light text-center pt-1 border-gray-100">
          {startDate} ~ {endDate}
        </div>
      </div>
    </div>
  );
}
