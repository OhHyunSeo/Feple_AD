"use client";

import { useState, Suspense, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import {
  DateFilter,
  ScoreChart,
  CallTimeChart,
  TopConsultantsTable,
  ConsultationTable,
  ConversationDetail,
} from "@/components/features/performance";
import { useDateRange } from "@/context/DateRangeContext";

function ConsultantPerformanceContent() {
  const {
    startDate: contextStartDate,
    endDate: contextEndDate,
    setDateRange,
  } = useDateRange();

  // 로컬 상태 (실제 조회는 조회 버튼 클릭 시에만)
  const [localStartDate, setLocalStartDate] = useState(contextStartDate);
  const [localEndDate, setLocalEndDate] = useState(contextEndDate);
  const [selectedSessionNo, setSelectedSessionNo] = useState<number | null>(
    null
  );
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(
    null
  );

  // Context 값이 변경되면 로컬 상태도 업데이트
  useEffect(() => {
    if (contextStartDate && contextEndDate) {
      setLocalStartDate(contextStartDate);
      setLocalEndDate(contextEndDate);
    }
  }, [contextStartDate, contextEndDate]);

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

  // 조회 버튼 클릭 시에만 전역 날짜 상태 업데이트
  const handleSearch = () => {
    console.log("조회:", localStartDate, "~", localEndDate);

    // 전역 상태 업데이트 (조회 버튼 클릭 시에만)
    setDateRange(localStartDate, localEndDate);

    // TODO: 실제 데이터 조회 로직
  };

  // 상담 세션 선택 핸들러
  const handleSessionSelect = (sessionNo: number, sessionId?: string) => {
    setSelectedSessionNo(sessionNo);
    setSelectedSessionId(sessionId || null);
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen w-full bg-gray-50 p-3">
        {/* 상단 날짜 필터 */}
        <DateFilter
          startDate={localStartDate}
          endDate={localEndDate}
          onStartDateChange={setLocalStartDate}
          onEndDateChange={setLocalEndDate}
          onSearch={handleSearch}
        />

        {/* 메인 콘텐츠 영역 */}
        <div className="grid grid-cols-5 gap-3 items-stretch">
          {/* 좌측 패널 - 기간 내 상담 점수 */}
          <div className="col-span-1 space-y-3">
            <ScoreChart
              myScores={myScores}
              teamScores={teamAvgScores}
              startDate={contextStartDate}
              endDate={contextEndDate}
            />

            <CallTimeChart
              startDate={contextStartDate}
              endDate={contextEndDate}
            />

            <TopConsultantsTable consultants={topConsultants} myRank={myRank} />
          </div>

          {/* 중앙 패널 - 상담 세션 테이블 */}
          <div className="col-span-3 flex flex-col">
            <div className="flex-1">
              <ConsultationTable
                startDate={contextStartDate}
                endDate={contextEndDate}
                onSessionSelect={handleSessionSelect}
              />
            </div>
          </div>

          {/* 우측 패널 - 상담 상세 내용 */}
          <div className="col-span-1 flex flex-col">
            <div className="flex-1">
              <ConversationDetail
                sessionNo={selectedSessionNo}
                sessionId={selectedSessionId}
                onClose={() => {
                  setSelectedSessionNo(null);
                  setSelectedSessionId(null);
                }}
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
