"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/DashboardLayout";
import { RadarChart } from "@/components/charts/RadarChart";
import { ChevronRight } from "lucide-react";
import { useDateRange } from "@/context/DateRangeContext";
import { useUser } from "@/context/UserContext";

export default function ConsultantDashboardPage() {
  const router = useRouter();
  const { setDateRange } = useDateRange();
  const { userInfo } = useUser(); // useUser 훅에서 userInfo 직접 가져오기
  const [startAnimation, setStartAnimation] = useState(false);

  // 기간 선택 상태
  const [selectedPeriod, setSelectedPeriod] = useState<
    "yesterday" | "lastWeek" | "lastMonth"
  >("yesterday");

  // selectedPeriod가 변경될 때마다 애니메이션을 재동기화
  useEffect(() => {
    // 1. 애니메이션 클래스를 제거하기 위해 상태를 false로 설정
    setStartAnimation(false);

    // 2. DOM 업데이트가 반영된 후, 다음 프레임에서 애니메이션을 다시 시작
    const timer = setTimeout(() => {
      setStartAnimation(true);
    }, 50); // 짧은 지연으로 브라우저가 클래스 제거를 처리할 시간을 줌

    // 클린업 함수
    return () => clearTimeout(timer);
  }, [selectedPeriod]); // selectedPeriod가 바뀔 때마다 이 효과를 재실행

  // 날짜 계산 함수들 (한국 시간 기준)
  const getDateRange = (period: "yesterday" | "lastWeek" | "lastMonth") => {
    // 테스트를 위해 고정된 오늘 날짜 사용
    const today = new Date(Date.now());

    const formatDate = (date: Date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    switch (period) {
      case "yesterday":
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        return {
          startDate: formatDate(yesterday),
          endDate: formatDate(yesterday),
        };

      case "lastWeek":
        // 저번 주 월요일부터 금요일까지
        const dayOfWeek = today.getDay(); // 0=일요일, 1=월요일, ...
        const daysToSubtract = dayOfWeek === 0 ? 13 : dayOfWeek + 6; // 저번 주 월요일까지

        const lastWeekStart = new Date(today);
        lastWeekStart.setDate(today.getDate() - daysToSubtract);

        const lastWeekEnd = new Date(lastWeekStart);
        lastWeekEnd.setDate(lastWeekStart.getDate() + 4); // 금요일까지

        return {
          startDate: formatDate(lastWeekStart),
          endDate: formatDate(lastWeekEnd),
        };

      case "lastMonth":
        // 저번 달 전체 (한국 시간 기준)
        const currentYear = today.getFullYear();
        const currentMonth = today.getMonth();

        // 저번 달의 첫 날과 마지막 날
        const lastMonthStart = new Date(currentYear, currentMonth - 1, 1);
        const lastMonthEnd = new Date(currentYear, currentMonth, 0); // 현재 월의 0일 = 저번 달 마지막 날

        return {
          startDate: formatDate(lastMonthStart),
          endDate: formatDate(lastMonthEnd),
        };

      default:
        const defaultYesterday = new Date(today);
        defaultYesterday.setDate(today.getDate() - 1);
        return {
          startDate: formatDate(defaultYesterday),
          endDate: formatDate(defaultYesterday),
        };
    }
  };

  // 상세 보기 페이지로 이동
  const handleDetailView = () => {
    const { startDate, endDate } = getDateRange(selectedPeriod);

    // 전역 날짜 상태 업데이트
    setDateRange(startDate, endDate);

    // 페이지 이동
    router.push(`/consultant/performance`);
  };

  // 기간별 데이터
  const periodData = {
    yesterday: {
      analysis: {
        strengths: "고객의 말을 경청하고, 친절하게 안내하였습니다.",
        improvements: "전문 용어 사용 시 추가 설명이 필요합니다.",
        coaching: "고객의 감정에 공감하는 멘트를 한 번 더 추가해보세요.",
      },
      avgScore: 75,
      indicators: [
        { label: "정중함 및 언어 품질", score: 60, grade: "G" },
        { label: "대화 흐름 및 응대 태도", score: 80, grade: "B" },
        { label: "공감적 소통", score: 70, grade: "C" },
        { label: "감정 안정성", score: 65, grade: "C" },
        { label: "문제 해결 역량", score: 85, grade: "A" },
      ],
      teamAverage: [
        { label: "정중함 및 언어 품질", score: 78 },
        { label: "대화 흐름 및 응대 태도", score: 82 },
        { label: "공감적 소통", score: 74 },
        { label: "감정 안정성", score: 79 },
        { label: "문제 해결 역량", score: 81 },
      ],
      title: "어제 상담 분석 요약",
      scoreTitle: "어제 평균 점수",
    },
    lastWeek: {
      analysis: {
        strengths:
          "지난 주 동안 꾸준한 고객 응대 품질을 유지하며, 문제 해결 능력이 향상되었습니다.",
        improvements:
          "공감적 소통 부분에서 더 많은 연습이 필요하며, 감정 표현을 다양화해야 합니다.",
        coaching:
          "주간 평균 점수가 상승세를 보이고 있습니다. 이 추세를 유지하며 약점 보완에 집중하세요.",
      },
      avgScore: 78,
      indicators: [
        { label: "정중함 및 언어 품질", score: 72, grade: "C" },
        { label: "대화 흐름 및 응대 태도", score: 85, grade: "A" },
        { label: "공감적 소통", score: 68, grade: "D" },
        { label: "감정 안정성", score: 82, grade: "B" },
        { label: "문제 해결 역량", score: 88, grade: "A" },
      ],
      teamAverage: [
        { label: "정중함 및 언어 품질", score: 79 },
        { label: "대화 흐름 및 응대 태도", score: 83 },
        { label: "공감적 소통", score: 77 },
        { label: "감정 안정성", score: 80 },
        { label: "문제 해결 역량", score: 84 },
      ],
      title: "저번 주 상담 분석 요약",
      scoreTitle: "저번 주 평균 점수",
    },
    lastMonth: {
      analysis: {
        strengths:
          "한 달간 전반적인 상담 품질이 안정적이며, 고객 만족도가 지속적으로 개선되고 있습니다.",
        improvements:
          "월간 데이터를 보면 일관성 있는 서비스 제공에 더 노력이 필요합니다.",
        coaching:
          "월간 성과가 우수합니다. 현재 수준을 유지하며 지속적인 자기계발을 추천합니다.",
      },
      avgScore: 81,
      indicators: [
        { label: "정중함 및 언어 품질", score: 79, grade: "B" },
        { label: "대화 흐름 및 응대 태도", score: 87, grade: "A" },
        { label: "공감적 소통", score: 75, grade: "C" },
        { label: "감정 안정성", score: 84, grade: "A" },
        { label: "문제 해결 역량", score: 90, grade: "A" },
      ],
      teamAverage: [
        { label: "정중함 및 언어 품질", score: 81 },
        { label: "대화 흐름 및 응대 태도", score: 85 },
        { label: "공감적 소통", score: 79 },
        { label: "감정 안정성", score: 82 },
        { label: "문제 해결 역량", score: 86 },
      ],
      title: "저번 달 상담 분석 요약",
      scoreTitle: "저번 달 평균 점수",
    },
  };

  // 현재 선택된 기간의 데이터
  const currentData = periodData[selectedPeriod];

  // RadarChart용 데이터 변환 (subject, A, B 구조)
  const radarData = currentData.indicators.map((item, index) => ({
    subject: item.label,
    A: item.score, // 본인 점수
    B: currentData.teamAverage[index].score, // 동료 평균
    fullMark: 100,
  }));

  // 점수 낮은 2개 지표 추출 (score 오름차순)
  const lowIndicators = [...currentData.indicators]
    .sort((a, b) => a.score - b.score)
    .slice(0, 2);

  // 기간 변경 핸들러
  const handlePeriodChange = (
    period: "yesterday" | "lastWeek" | "lastMonth"
  ) => {
    setSelectedPeriod(period);
  };

  return (
    <DashboardLayout
      onPeriodChange={handlePeriodChange}
      selectedPeriod={selectedPeriod}
    >
      <div className="w-full h-full bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 p-3">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 h-full">
          {/* 왼쪽 카드들 */}
          <div className="flex flex-col gap-3">
            {/* 인사말 카드 */}
            <div className="bg-gradient-to-r from-pink-400 to-purple-400 rounded-xl p-4 shadow-lg flex items-center gap-3 animate-pulse-glow">
              <div className="h-10 w-10 rounded-full bg-white/30 flex items-center justify-center text-xl font-bold text-white shadow">
                {userInfo.initial}
              </div>
              <div>
                <div className="text-lg font-bold text-white flex items-center gap-2">
                  {userInfo.name} 상담사님{" "}
                  <span className="animate-bounce">👋🏻</span>
                </div>
                <div className="text-sm text-pink-100 mt-1">
                  오늘도 힘내세요! Feple이 함께합니다 :)
                </div>
              </div>
            </div>

            {/* 평균 점수 카드 */}
            <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 flex flex-col items-center justify-center relative">
              <div className="text-base text-gray-500 mb-1">
                {currentData.scoreTitle}
              </div>
              <div className="text-4xl font-bold text-pink-600">
                {currentData.avgScore}점
              </div>

              {/* 상세 보기 버튼 */}
              <button
                onClick={handleDetailView}
                className="absolute bottom-2 right-2 flex items-center gap-1 px-2 py-1 text-sm text-gray-500 hover:text-pink-600 hover:bg-pink-50 rounded transition-colors group"
              >
                <span>상세 보기</span>
                <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            {/* 상담 분석 카드 */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col gap-2">
              <div className="text-lg font-semibold text-pink-600 mb-2">
                {currentData.title}
              </div>
              <ul className="text-sm text-gray-700 list-disc pl-4 space-y-1">
                <li>
                  <span className="font-bold">강점:</span>{" "}
                  {currentData.analysis.strengths}
                </li>
                <li>
                  <span className="font-bold">개선점:</span>{" "}
                  {currentData.analysis.improvements}
                </li>
                <li>
                  <span className="font-bold">코칭 멘트:</span>{" "}
                  {currentData.analysis.coaching}
                </li>
              </ul>
            </div>

            {/* 위험 지표 카드 2개 */}
            {lowIndicators.map((item) => (
              <div
                key={item.label}
                className="bg-white rounded-xl p-3 shadow-md border border-gray-100 flex items-center gap-3"
              >
                <div className="text-base font-semibold">{item.label}</div>
                <div className="ml-auto flex items-center gap-2">
                  <span className="text-2xl font-bold">{item.grade}</span>
                  <span
                    className={`h-3 w-3 rounded-full inline-block border border-white ${
                      startAnimation &&
                      ["C", "D", "E", "F", "G"].includes(item.grade)
                        ? "animate-blink"
                        : ""
                    }`}
                    style={{
                      backgroundColor:
                        item.grade === "G"
                          ? "#ef4444"
                          : item.grade === "D"
                          ? "#f97316"
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
            <div className="text-lg font-semibold text-gray-800 mb-2 text-center">
              종합 역량 분석
            </div>
            <div className="h-full flex items-center justify-center">
              <RadarChart data={radarData} showComparison={true} />
            </div>
            {/* 범례 */}
            <div className="flex justify-center items-center gap-4 mt-2">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                <span className="text-sm text-gray-600">내 점수</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-gray-400 border border-gray-300"></div>
                <span className="text-sm text-gray-600">동료 평균</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
