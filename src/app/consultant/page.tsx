"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { RadarChart } from "@/components/charts/RadarChart";

export default function ConsultantDashboardPage() {
  // 전일 상담 분석
  const yesterdayAnalysis = {
    strengths: "고객의 말을 경청하고, 친절하게 안내하였습니다.",
    improvements: "전문 용어 사용 시 추가 설명이 필요합니다.",
    coaching: "고객의 감정에 공감하는 멘트를 한 번 더 추가해보세요.",
  };

  // 전일 평균 점수
  const yesterdayAvgScore = 75;

  // 5대 지표 점수 및 등급 (예시)
  const indicators = [
    { label: "정중함 및 언어 품질", score: 60, grade: "G" },
    { label: "대화 흐름 및 응대 태도", score: 80, grade: "B" },
    { label: "공감적 소통", score: 70, grade: "C" },
    { label: "감정 안정성", score: 65, grade: "C" },
    { label: "문제 해결 역량", score: 85, grade: "A" },
  ];

  // RadarChart용 데이터 변환 (subject, A 구조)
  const radarData = indicators.map((item) => ({
    subject: item.label,
    A: item.score,
    fullMark: 100,
  }));

  // 점수 낮은 2개 지표 추출 (score 오름차순)
  const lowIndicators = [...indicators]
    .sort((a, b) => a.score - b.score)
    .slice(0, 2);

  // 상담사 정보 (이니셜, 이름)
  const userName = "마교준석";
  const userInitial = userName[0];

  return (
    <DashboardLayout>
      <div className="w-full h-full bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 p-3">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 h-full">
          {/* 왼쪽 카드들 */}
          <div className="flex flex-col gap-3">
            {/* 인사말 카드 */}
            <div className="bg-gradient-to-r from-pink-400 to-purple-400 rounded-xl p-4 shadow-lg flex items-center gap-3 animate-pulse-glow">
              <div className="h-10 w-10 rounded-full bg-white/30 flex items-center justify-center text-lg font-bold text-white shadow">
                {userInitial}
              </div>
              <div>
                <div className="text-base font-bold text-white flex items-center gap-2">
                  {userName} 상담사님 <span className="animate-bounce">👋</span>
                </div>
                <div className="text-xs text-pink-100 mt-1">
                  오늘도 힘내세요! Feple이 함께합니다 :)
                </div>
              </div>
            </div>

            {/* 전일 상담 분석 카드 */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col gap-2">
              <div className="text-base font-semibold text-pink-600 mb-2">
                어제 상담 분석 요약
              </div>
              <ul className="text-xs text-gray-700 list-disc pl-4 space-y-1">
                <li>
                  <span className="font-bold">강점:</span>{" "}
                  {yesterdayAnalysis.strengths}
                </li>
                <li>
                  <span className="font-bold">개선점:</span>{" "}
                  {yesterdayAnalysis.improvements}
                </li>
                <li>
                  <span className="font-bold">코칭 멘트:</span>{" "}
                  {yesterdayAnalysis.coaching}
                </li>
              </ul>
            </div>

            {/* 전일 평균 점수 카드 */}
            <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 flex flex-col items-center justify-center">
              <div className="text-sm text-gray-500 mb-1">어제 평균 점수</div>
              <div className="text-3xl font-bold text-pink-600">
                {yesterdayAvgScore}점
              </div>
            </div>

            {/* 위험 지표 카드 2개 */}
            {lowIndicators.map((item) => (
              <div
                key={item.label}
                className="bg-white rounded-xl p-3 shadow-md border border-gray-100 flex items-center gap-3"
              >
                <div className="text-sm font-semibold">{item.label}</div>
                <div className="ml-auto flex items-center gap-2">
                  <span className="text-xl font-bold">{item.grade}</span>
                  <span
                    className={
                      "h-3 w-3 rounded-full inline-block border border-white animate-blink"
                    }
                    style={{
                      backgroundColor:
                        item.grade === "G"
                          ? "#ef4444"
                          : item.grade === "C"
                          ? "#facc15"
                          : "#4ade80",
                    }}
                  ></span>
                </div>
              </div>
            ))}
          </div>

          {/* 오른쪽 차트 */}
          <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100 flex flex-col justify-center h-full">
            <div className="text-base font-semibold text-gray-800 mb-2 text-center">
              종합 역량 분석
            </div>
            <div className="h-full flex items-center justify-center">
              <RadarChart data={radarData} />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
