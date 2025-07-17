"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import DashboardLayout from "@/components/DashboardLayout";
import {
  DateFilter,
  ScoreChart,
  CallTimeChart,
  TopConsultantsTable,
  ConsultationTable,
  ConversationDetail,
} from "@/components/features/performance";

function ConsultantPerformanceContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // 어제 날짜 계산
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  // URL 파라미터에서 날짜를 가져오거나 기본값 사용
  const getInitialStartDate = () => {
    const paramStartDate = searchParams.get("startDate");
    return (
      paramStartDate ||
      new Date(yesterday.getTime() - 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0]
    );
  };

  const getInitialEndDate = () => {
    const paramEndDate = searchParams.get("endDate");
    return paramEndDate || yesterday.toISOString().split("T")[0];
  };

  const [startDate, setStartDate] = useState(getInitialStartDate());
  const [endDate, setEndDate] = useState(getInitialEndDate());
  const [selectedSessionNo, setSelectedSessionNo] = useState<number | null>(
    null
  );

  // 더미 데이터
  const myScores = {
    min: 45,
    avg: 72,
    max: 85,
  };

  const teamAvgScores = {
    min: 52,
    avg: 68,
    max: 89,
  };

  // 우수상담사 더미 데이터
  const topConsultants = [
    { rank: 1, nickname: "상담왕김철수", weeklyScore: 94, isMe: false },
    { rank: 2, nickname: "친절박영희", weeklyScore: 91, isMe: false },
    { rank: 3, nickname: "전문가이민수", weeklyScore: 89, isMe: false },
    { rank: 4, nickname: "열정정미영", weeklyScore: 87, isMe: false },
    { rank: 5, nickname: "마교준석", weeklyScore: 85, isMe: true },
    { rank: 6, nickname: "신입최준호", weeklyScore: 83, isMe: false },
  ];

  const myRank = 5; // 본인 등수

  const handleSearch = () => {
    console.log("조회:", startDate, "~", endDate);
    // URL 업데이트
    router.push(
      `/consultant/performance?startDate=${startDate}&endDate=${endDate}`
    );
    // TODO: 실제 데이터 조회 로직
  };

  // 상담 세션 선택 핸들러
  const handleSessionSelect = (sessionNo: number) => {
    setSelectedSessionNo(sessionNo);
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen w-full bg-gray-50 p-3">
        {/* 상단 날짜 필터 */}
        <DateFilter
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
          onSearch={handleSearch}
        />

        {/* 메인 콘텐츠 영역 */}
        <div className="grid grid-cols-5 gap-3 items-stretch">
          {/* 좌측 패널 - 기간 내 상담 점수 */}
          <div className="col-span-1 space-y-3">
            <ScoreChart
              myScores={myScores}
              teamScores={teamAvgScores}
              startDate={startDate}
              endDate={endDate}
            />

            <CallTimeChart startDate={startDate} endDate={endDate} />

            <TopConsultantsTable consultants={topConsultants} myRank={myRank} />
          </div>

          {/* 중앙 패널 - 상담 세션 테이블 */}
          <div className="col-span-3 flex flex-col">
            <div className="flex-1">
              <ConsultationTable
                startDate={startDate}
                endDate={endDate}
                onSessionSelect={handleSessionSelect}
              />
            </div>
          </div>

          {/* 우측 패널 - 상담 상세 내용 */}
          <div className="col-span-1 flex flex-col">
            <div className="flex-1">
              <ConversationDetail
                sessionNo={selectedSessionNo}
                onClose={() => setSelectedSessionNo(null)}
              />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default function ConsultantPerformancePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ConsultantPerformanceContent />
    </Suspense>
  );
}
