"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import DashboardLayout from "@/components/DashboardLayout";
import { ChevronDown, PhoneCall } from "lucide-react";
import {
  DateFilter,
  CallTimeChart,
  ConsultationTable,
  ConversationDetail,
} from "@/components/features/performance";
import { ScoreChart } from "@/components/features/performance";
import { useDateRange } from "@/context/DateRangeContext";

function QCMonitoringContent() {
  const searchParams = useSearchParams();
  const {
    startDate: contextStartDate,
    endDate: contextEndDate,
    setDateRange,
  } = useDateRange();

  // 로컬 상태 (조회 버튼 클릭 시에만 실제 조회)
  const [localStartDate, setLocalStartDate] = useState(contextStartDate);
  const [localEndDate, setLocalEndDate] = useState(contextEndDate);
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [selectedConsultant, setSelectedConsultant] = useState<string>("");
  const [selectedSessionNo, setSelectedSessionNo] = useState<number | null>(
    null
  );
  const [hasSearched, setHasSearched] = useState(false); // 조회 여부 상태
  const [isInitialAutoSearchDone, setIsInitialAutoSearchDone] =
    useState(false); // 자동 조회 완료 여부 플래그

  // URL 파라미터에서 자동 조회 처리
  useEffect(() => {
    // 자동 조회가 이미 한 번 실행되었다면, 더 이상 URL 파라미터를 확인하지 않음
    if (isInitialAutoSearchDone) {
      return;
    }

    const startDateParam = searchParams.get("startDate");
    const endDateParam = searchParams.get("endDate");
    const departmentParam = searchParams.get("department");
    const consultantParam = searchParams.get("consultant");
    const autoSearchParam = searchParams.get("autoSearch");

    if (
      autoSearchParam === "true" &&
      startDateParam &&
      endDateParam &&
      departmentParam &&
      consultantParam
    ) {
      // URL 파라미터로 상태 설정
      setLocalStartDate(startDateParam);
      setLocalEndDate(endDateParam);
      setSelectedDepartment(departmentParam);
      setSelectedConsultant(consultantParam);

      // 컨텍스트 업데이트
      setDateRange(startDateParam, endDateParam);

      // 자동 조회 실행
      setHasSearched(true);
      setSelectedSessionNo(null);
      // 자동 조회가 완료되었음을 표시
      setIsInitialAutoSearchDone(true);

      console.log(
        "자동 조회 실행:",
        startDateParam,
        "~",
        endDateParam,
        "부서",
        departmentParam,
        "상담원",
        consultantParam
      );
    }
  }, [searchParams, setDateRange, isInitialAutoSearchDone]);

  // 부서 데이터
  const departments = [
    { id: "team1", name: "고객상담 1팀" },
    { id: "team2", name: "고객상담 2팀" },
    { id: "team3", name: "고객상담 3팀" },
    { id: "team4", name: "기술지원팀" },
  ];

  // 부서별 상담원 데이터 (확장된 10명 상담사 포함)
  const consultantsByDepartment = {
    team1: [
      { id: "c1", name: "김민수" },
      { id: "c2", name: "박성호" },
      { id: "c3", name: "임지원" },
      { id: "c12", name: "노준석" },
      { id: "c13", name: "정수민" },
      { id: "c17", name: "오세훈" },
    ],
    team2: [
      { id: "c4", name: "이영희" },
      { id: "c5", name: "정다은" },
      { id: "c6", name: "강현준" },
      { id: "c14", name: "안지혜" },
    ],
    team3: [
      { id: "c7", name: "최미연" },
      { id: "c8", name: "한상욱" },
      { id: "c9", name: "송예진" },
      { id: "c15", name: "황도현" },
      { id: "c18", name: "배수진" },
    ],
    team4: [
      { id: "c10", name: "윤진호" },
      { id: "c11", name: "조은실" },
      { id: "c16", name: "차민영" },
    ],
  };

  // 팀별 평균 통화 시간 데이터 (분)
  const teamCallTimeAverages = {
    team1: 7.2, // 고객상담 1팀
    team2: 6.8, // 고객상담 2팀
    team3: 7.5, // 고객상담 3팀
    team4: 8.1, // 기술지원팀
  };

  const getCurrentConsultants = () => {
    if (!selectedDepartment) return [];
    return (
      consultantsByDepartment[
        selectedDepartment as keyof typeof consultantsByDepartment
      ] || []
    );
  };

  const getSelectedConsultantName = () => {
    const consultants = getCurrentConsultants();
    const consultant = consultants.find((c) => c.id === selectedConsultant);
    return consultant?.name || "";
  };

  const getTeamCallTimeAverage = () => {
    if (!selectedDepartment) return undefined;
    return teamCallTimeAverages[
      selectedDepartment as keyof typeof teamCallTimeAverages
    ];
  };

  // 조회 버튼 클릭 핸들러
  const handleSearch = () => {
    if (!selectedDepartment || !selectedConsultant) {
      alert("부서와 상담원을 모두 선택해주세요.");
      return;
    }

    setDateRange(localStartDate, localEndDate);
    setHasSearched(true);
    setSelectedSessionNo(null);
    console.log(
      "조회",
      localStartDate,
      "~",
      localEndDate,
      "부서",
      selectedDepartment,
      "상담원",
      selectedConsultant
    );
  };

  // 세션 선택 핸들러
  const handleSessionSelect = (sessionNo: number) => {
    setSelectedSessionNo(sessionNo);
  };

  // 상세 정보 닫기 핸들러
  const handleCloseDetail = () => {
    setSelectedSessionNo(null);
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen w-full bg-gray-50 p-3">
        <div className="space-y-3">
          {/* 통합 조회 옵션 - 기간 + 부서 + 상담원 + 조회 버튼 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3">
            <div className="flex items-center gap-3 flex-wrap">
              {/* 날짜 필터 */}
              <DateFilter
                startDate={localStartDate}
                endDate={localEndDate}
                onStartDateChange={setLocalStartDate}
                onEndDateChange={setLocalEndDate}
                showCard={false}
              />

              {/* 부서 선택 */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-700 font-medium">부서</span>
                <div className="relative">
                  <select
                    value={selectedDepartment}
                    onChange={(e) => {
                      setSelectedDepartment(e.target.value);
                      setSelectedConsultant(""); // 부서 변경 시 상담원 초기화
                    }}
                    className="appearance-none px-2 py-1 border border-gray-200 rounded text-xs focus:outline-none focus:ring-2 focus:ring-pink-500 pr-6 min-w-[120px]"
                  >
                    <option value="">부서 선택</option>
                    {departments.map((dept) => (
                      <option key={dept.id} value={dept.id}>
                        {dept.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-1 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* 상담원 선택 */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-700 font-medium">
                  상담원
                </span>
                <div className="relative">
                  <select
                    value={selectedConsultant}
                    onChange={(e) => setSelectedConsultant(e.target.value)}
                    disabled={!selectedDepartment}
                    className="appearance-none px-2 py-1 border border-gray-200 rounded text-xs focus:outline-none focus:ring-2 focus:ring-pink-500 pr-6 disabled:bg-gray-100 disabled:cursor-not-allowed min-w-[100px]"
                  >
                    <option value="">상담원 선택</option>
                    {getCurrentConsultants().map((consultant) => (
                      <option key={consultant.id} value={consultant.id}>
                        {consultant.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-1 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* 조회 버튼 */}
              <button
                onClick={handleSearch}
                className="flex items-center gap-1 px-3 py-1 bg-pink-500 text-white rounded text-xs font-medium hover:bg-pink-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                disabled={!selectedDepartment || !selectedConsultant}
              >
                조회
              </button>
            </div>
          </div>

          {/* 메인 콘텐츠 - 조회 후에만 표시 */}
          {hasSearched && selectedConsultant && (
            <div
              className="grid gap-3 h-full"
              style={{ gridTemplateColumns: "0.6fr 3.2fr 0.6fr" }}
            >
              {/* 첫 번째 열 (0.75): 선택된 상담사 정보 + 점수 + 통화시간 */}
              <div className="space-y-3 h-full overflow-y-auto">
                {/* 선택된 상담사 정보 */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3">
                  <h3 className="text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <PhoneCall className="h-4 w-4 text-purple-500" />
                    선택된 상담사
                  </h3>
                  <div className="text-center bg-purple-50 rounded p-2">
                    <div className="text-lg font-bold text-purple-600">
                      {getSelectedConsultantName()}
                    </div>
                    <div className="text-xs text-gray-600">
                      {
                        departments.find((d) => d.id === selectedDepartment)
                          ?.name
                      }
                    </div>
                  </div>
                </div>

                {/* 상담 점수 (ScoreChart 컴포넌트 사용 - 팀 점수 동적 계산) */}
                <ScoreChart
                  startDate={contextStartDate}
                  endDate={contextEndDate}
                  consultantId={selectedConsultant}
                  useMockData={true}
                />

                {/* 평균 통화 시간 (CallTimeChart 컴포넌트 사용) */}
                <CallTimeChart
                  startDate={contextStartDate}
                  endDate={contextEndDate}
                  teamAverageOverride={getTeamCallTimeAverage()}
                />
              </div>

              {/* 두 번째 열 (2.5): 상담 세션 목록 (ConsultationTable 컴포넌트 사용) */}
              <div className="h-full">
                <ConsultationTable
                  startDate={contextStartDate}
                  endDate={contextEndDate}
                  onSessionSelect={handleSessionSelect}
                  consultantId={selectedConsultant}
                  useMockData={true} // QC 대시보드: Mock 데이터 사용
                />
              </div>

              {/* 세 번째 열 (0.75): 상세 분석 (ConversationDetail 컴포넌트 사용) */}
              <div className="h-full">
                <ConversationDetail
                  sessionNo={selectedSessionNo}
                  onClose={handleCloseDetail}
                  showAudioWhenMissing={true}
                />
              </div>
            </div>
          )}

          {/* 조회 전 안내 메시지 */}
          {!hasSearched && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <div className="text-center">
                <PhoneCall className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-700 mb-2">
                  QC 성과 모니터링
                </h3>
                <p className="text-sm text-gray-500">
                  기간, 부서, 상담원을 선택한 후 조회 버튼을 클릭하면
                  <br />
                  해당 상담사의 성과 데이터를 확인할 수 있습니다.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default function QCMonitoringPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <QCMonitoringContent />
    </Suspense>
  );
}
