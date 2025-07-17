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
  // 날짜 범위 계산 (안전한 처리)
  const getDatesInRange = (start: string, end: string) => {
    try {
      const dates = [];
      const current = new Date(start);
      const endDate = new Date(end);

      // 유효한 날짜인지 확인
      if (isNaN(current.getTime()) || isNaN(endDate.getTime())) {
        return [];
      }

      // 너무 긴 범위는 제한 (최대 31일)
      const maxDays = 31;
      let dayCount = 0;

      while (current <= endDate && dayCount < maxDays) {
        dates.push(new Date(current).toISOString().split("T")[0]);
        current.setDate(current.getDate() + 1);
        dayCount++;
      }

      return dates;
    } catch (error) {
      console.error("날짜 계산 오류:", error);
      return [];
    }
  };

  const dates = getDatesInRange(startDate, endDate);

  // 빈 배열인 경우 기본값 사용
  const safeDates =
    dates.length > 0 ? dates : [new Date().toISOString().split("T")[0]];

  // 고정된 더미 데이터 (hydration 오류 방지)
  const getFixedCallTimeData = (dates: string[]) => {
    // 시드 기반 고정 데이터 (날짜 수에 따라 조정)
    const baseMyTimes = [8.2, 9.1, 7.8, 8.7, 9.3, 8.0, 7.5, 8.9, 9.2, 8.1];
    const baseTeamTimes = [7.1, 7.8, 6.9, 7.3, 7.6, 7.0, 6.8, 7.4, 7.7, 7.2];

    const myTimes = [];
    const teamTimes = [];

    for (let i = 0; i < dates.length; i++) {
      myTimes.push(baseMyTimes[i % baseMyTimes.length]);
      teamTimes.push(baseTeamTimes[i % baseTeamTimes.length]);
    }

    return { myTimes, teamTimes };
  };

  const { myTimes: myCallTimes, teamTimes: teamCallTimes } =
    getFixedCallTimeData(safeDates);

  // 날짜 라벨 처리
  const displayDates = safeDates.map((date, index) => `${index + 1}일차`);

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
