"use client";

import { useState } from "react";
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

export default function QCMonitoringPage() {
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

  // 부서 데이터
  const departments = [
    { id: "team1", name: "고객상담 1팀" },
    { id: "team2", name: "고객상담 2팀" },
    { id: "team3", name: "고객상담 3팀" },
    { id: "team4", name: "기술지원팀" },
  ];

  // 부서별 상담원 데이터
  const consultantsByDepartment = {
    team1: [
      { id: "c1", name: "김민수" },
      { id: "c2", name: "박성호" },
      { id: "c3", name: "임지원" },
      { id: "c12", name: "노준석" },
    ],
    team2: [
      { id: "c4", name: "이영희" },
      { id: "c5", name: "정다은" },
      { id: "c6", name: "강현준" },
    ],
    team3: [
      { id: "c7", name: "최미연" },
      { id: "c8", name: "한상욱" },
      { id: "c9", name: "송예진" },
    ],
    team4: [
      { id: "c10", name: "윤진호" },
      { id: "c11", name: "조은실" },
    ],
  };

  // 상담사별 점수 데이터
  const consultantScores = {
    c1: { min: 65, avg: 78, max: 85 },
    c2: { min: 55, avg: 72, max: 82 },
    c3: { min: 60, avg: 75, max: 88 },
    c12: { min: 45, avg: 62, max: 75 },
    c4: { min: 70, avg: 82, max: 90 },
    c5: { min: 58, avg: 73, max: 86 },
    c6: { min: 75, avg: 85, max: 92 },
    c7: { min: 80, avg: 88, max: 95 },
    c8: { min: 62, avg: 76, max: 84 },
    c9: { min: 68, avg: 79, max: 87 },
    c10: { min: 55, avg: 70, max: 81 },
    c11: { min: 72, avg: 83, max: 89 },
  };

  // 팀별 점수 데이터 (각 상담사가 속한 팀의 평균 점수)
  const teamScores = {
    team1: { min: 56, avg: 72, max: 84 }, // 고객상담 1팀
    team2: { min: 68, avg: 80, max: 89 }, // 고객상담 2팀
    team3: { min: 70, avg: 81, max: 89 }, // 고객상담 3팀
    team4: { min: 64, avg: 77, max: 85 }, // 기술지원팀
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

  const getConsultantScores = () => {
    if (!selectedConsultant) return { min: 0, avg: 0, max: 0 };
    return (
      consultantScores[selectedConsultant as keyof typeof consultantScores] || {
        min: 0,
        avg: 0,
        max: 0,
      }
    );
  };

  const getTeamScores = () => {
    if (!selectedDepartment) return undefined;
    return teamScores[selectedDepartment as keyof typeof teamScores];
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
      <div className="w-full min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 p-3">
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
              className="grid gap-3 h-[calc(100vh-10rem)]"
              style={{ gridTemplateColumns: "0.75fr 2.5fr 0.75fr" }}
            >
              {/* 첫 번째 열 (0.7): 선택된 상담사 정보 + 점수 + 통화시간 */}
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

                {/* 상담 점수 (ScoreChart 컴포넌트 사용) */}
                <ScoreChart
                  myScores={getConsultantScores()}
                  teamScores={getTeamScores()}
                  startDate={contextStartDate}
                  endDate={contextEndDate}
                />

                {/* 평균 통화 시간 (CallTimeChart 컴포넌트 사용) */}
                <CallTimeChart
                  startDate={contextStartDate}
                  endDate={contextEndDate}
                  teamAverageOverride={getTeamCallTimeAverage()}
                />
              </div>

              {/* 두 번째 열 (2.6): 상담 세션 목록 (ConsultationTable 컴포넌트 사용) */}
              <div className="h-full">
                <ConsultationTable
                  startDate={contextStartDate}
                  endDate={contextEndDate}
                  onSessionSelect={handleSessionSelect}
                  consultantId={selectedConsultant}
                />
              </div>

              {/* 세 번째 열 (0.7): 상세 분석 (ConversationDetail 컴포넌트 사용) */}
              <div className="h-full">
                <ConversationDetail
                  sessionNo={selectedSessionNo}
                  onClose={handleCloseDetail}
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
