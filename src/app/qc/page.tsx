"use client";

import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import {
  Users,
  Search,
  ChevronRight,
  AlertTriangle,
  ChevronDown,
  Clock,
  ChevronLeft,
} from "lucide-react";
import { getInspectionRecommendations, getRiskAlerts } from "@/data/mockData";
import {
  fixedConsultantInfo,
  teamConsultantMapping,
} from "@/data/fixedQcMockData";
import { useUser } from "@/context/UserContext";

// 18명 전체 상담사 배열 생성
const getAllConsultants = () =>
  Object.entries(fixedConsultantInfo).map(([id, info]) => ({ id, ...info }));
const getConsultantsByTeam = (teamId: string) =>
  (teamConsultantMapping[teamId] || []).map((id) => ({
    id,
    ...fixedConsultantInfo[id],
  }));

// 팀 정보 동적 생성 (실제 18명 기준)
const teamIdToName: Record<string, string> = {
  team1: "고객상담 1팀",
  team2: "고객상담 2팀",
  team3: "고객상담 3팀",
  team4: "기술지원팀",
};
const teams = Object.entries(teamConsultantMapping).map(([id, ids]) => ({
  id,
  name: teamIdToName[id] || id,
  memberCount: ids.length,
  teamLead: "", // 필요시 추가
}));

export default function QCDashboardPage() {
  const { userInfo } = useUser(); // useUser 훅에서 userInfo 직접 가져오기
  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<string>("");
  const [isTeamDropdownOpen, setIsTeamDropdownOpen] = useState(false);
  const [riskAlertPage, setRiskAlertPage] = useState(0);
  const [inspectionPage, setInspectionPage] = useState(0);
  const [teamMemberPage, setTeamMemberPage] = useState(0);

  // 오늘 날짜
  const today = new Date(Date.now());

  // 경과 일수 계산 함수
  const calculateDaysDiff = (dateString: string): number => {
    const targetDate = new Date(dateString);
    const diffTime = today.getTime() - targetDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // 18명 전체 상담사 배열
  const allConsultants = getAllConsultants();

  // 검색 결과 필터링 (18명 전체 상담사 대상)
  const searchResults =
    searchTerm.length > 0
      ? allConsultants.filter(
          (item) =>
            item.name.includes(searchTerm) ||
            item.team.includes(searchTerm) ||
            item.position.includes(searchTerm)
        )
      : [];

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setShowResults(value.length > 0);
  };

  const getTypeIcon = () => <Users className="h-4 w-4 text-blue-500" />;
  const getTypeName = () => "상담사";

  // 상담사 이름으로 부서 찾기
  const findDepartmentByConsultantName = (consultantName: string): string => {
    const departments = {
      team1: ["김민수", "박성호", "임지원", "노준석", "문지호"],
      team2: ["이영희", "정다은", "강현준", "서민정", "김철호"],
      team3: ["최미연", "한상욱", "송예진", "배수진"],
      team4: ["윤진호", "조은실", "조현우", "이수정"],
    };

    for (const [deptId, names] of Object.entries(departments)) {
      if (names.includes(consultantName)) {
        return deptId;
      }
    }
    return "team1"; // 기본값
  };

  // 상담사 이름으로 ID 찾기
  const findConsultantIdByName = (consultantName: string): string => {
    const consultantMap: { [key: string]: string } = {
      // 기존 팀 멤버들
      김민수: "c1",
      박성호: "c2",
      임지원: "c3",
      노준석: "c12",
      이영희: "c4",
      정다은: "c5",
      강현준: "c6",
      최미연: "c7",
      한상욱: "c8",
      송예진: "c9",
      윤진호: "c10",
      조은실: "c11",
      // 점검 추천 상담사들
      문지호: "c15",
      서민정: "c16",
      조현우: "c17",
      배수진: "c18",
      // 긴급 점검 대상 상담사들
      김철호: "c13",
      이수정: "c14",
    };

    return consultantMap[consultantName] || "c1"; // 기본값
  };

  // 전일 날짜 계산
  const getYesterdayDate = (): string => {
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday.toISOString().split("T")[0];
  };

  const handleConsultantClick = (consultant: {
    id: string;
    name: string;
    team: string;
    position: string;
  }) => {
    const yesterdayDate = getYesterdayDate();
    // 팀 정보 추출
    let departmentId = null;
    for (const [team, ids] of Object.entries(teamConsultantMapping)) {
      if (ids.includes(consultant.id)) {
        departmentId = team;
        break;
      }
    }
    window.location.href = `/qc/performance?startDate=${yesterdayDate}&endDate=${yesterdayDate}&department=${departmentId}&consultant=${consultant.id}&autoSearch=true`;
  };

  const handleRiskAlertClick = (alert: {
    id: string;
    name: string;
    team: string;
    position: string;
  }) => {
    const yesterdayDate = getYesterdayDate();
    // id로 팀 찾기
    let departmentId = null;
    for (const [team, ids] of Object.entries(teamConsultantMapping)) {
      if (ids.includes(alert.id)) {
        departmentId = team;
        break;
      }
    }
    window.location.href = `/qc/performance?startDate=${yesterdayDate}&endDate=${yesterdayDate}&department=${departmentId}&consultant=${alert.id}&autoSearch=true`;
  };

  const handleInspectionRecommendationClick = (
    recommendation: (typeof inspectionRecommendations)[0]
  ) => {
    const yesterdayDate = getYesterdayDate();
    const departmentId = findDepartmentByConsultantName(recommendation.name);
    const consultantId = findConsultantIdByName(recommendation.name);

    window.location.href = `/qc/performance?startDate=${yesterdayDate}&endDate=${yesterdayDate}&department=${departmentId}&consultant=${consultantId}&autoSearch=true`;
  };

  const getGradeColor = (grade: string, severity: string) => {
    if (severity === "critical") {
      return "bg-red-500 text-white animate-pulse";
    } else if (severity === "warning") {
      return "bg-orange-500 text-white animate-pulse";
    }
    return "bg-gray-500 text-white";
  };

  const getSeverityIcon = (severity: string) => {
    if (severity === "critical") {
      return <AlertTriangle className="h-4 w-4 text-red-600" />;
    } else if (severity === "warning") {
      return <AlertTriangle className="h-4 w-4 text-orange-600" />;
    }
    return <AlertTriangle className="h-4 w-4 text-gray-600" />;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case "high":
        return "높음";
      case "medium":
        return "보통";
      case "low":
        return "낮음";
      default:
        return "보통";
    }
  };

  const handleTeamSelect = (teamId: string) => {
    setSelectedTeam(teamId);
    setIsTeamDropdownOpen(false);
    setTeamMemberPage(0); // 팀 변경시 페이지 리셋
  };

  const getSelectedTeamName = () => {
    if (!selectedTeam) return "팀을 선택하세요";
    return (
      teams.find((team) => team.id === selectedTeam)?.name || "팀을 선택하세요"
    );
  };

  const getCurrentTeamMembers = () => {
    if (!selectedTeam) return [];
    return getConsultantsByTeam(selectedTeam);
  };

  // 점검 추천 상담사(18명만, mockData에서 동적 생성)
  const ITEMS_PER_PAGE = 2;
  const inspectionRecommendations = getInspectionRecommendations();
  const inspectionTotalPages = Math.ceil(
    inspectionRecommendations.length / ITEMS_PER_PAGE
  );
  const paginatedInspectionRecommendations = inspectionRecommendations.slice(
    inspectionPage * ITEMS_PER_PAGE,
    (inspectionPage + 1) * ITEMS_PER_PAGE
  );

  const handleInspectionPrevPage = () => {
    setInspectionPage((prev) => Math.max(0, prev - 1));
  };

  const handleInspectionNextPage = () => {
    setInspectionPage((prev) => Math.min(inspectionTotalPages - 1, prev + 1));
  };

  // 긴급 점검 대상(18명만, mockData에서 동적 생성)
  const riskAlerts = getRiskAlerts();
  const totalPages = Math.ceil(riskAlerts.length / ITEMS_PER_PAGE);
  const paginatedRiskAlerts = riskAlerts.slice(
    riskAlertPage * ITEMS_PER_PAGE,
    (riskAlertPage + 1) * ITEMS_PER_PAGE
  );

  const handlePrevPage = () => {
    setRiskAlertPage((prev) => Math.max(0, prev - 1));
  };

  const handleNextPage = () => {
    setRiskAlertPage((prev) => Math.min(totalPages - 1, prev + 1));
  };

  // 팀별 상담원 페이지네이션
  const currentTeamMembers = getCurrentTeamMembers();
  const teamTotalPages = Math.ceil(currentTeamMembers.length / ITEMS_PER_PAGE);
  const paginatedTeamMembers = currentTeamMembers.slice(
    teamMemberPage * ITEMS_PER_PAGE,
    (teamMemberPage + 1) * ITEMS_PER_PAGE
  );

  const handleTeamPrevPage = () => {
    setTeamMemberPage((prev) => Math.max(0, prev - 1));
  };

  const handleTeamNextPage = () => {
    setTeamMemberPage((prev) => Math.min(teamTotalPages - 1, prev + 1));
  };

  return (
    <DashboardLayout>
      <div className="w-full h-full bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 p-3">
        <div className="space-y-3">
          {/* 인사말 카드 */}
          <div className="bg-gradient-to-r from-pink-400 to-purple-400 rounded-xl p-4 shadow-lg flex items-center gap-3 animate-pulse-glow">
            <div className="h-10 w-10 rounded-full bg-white/30 flex items-center justify-center text-lg font-bold text-white shadow">
              {userInfo.initial}
            </div>
            <div>
              <div className="text-base font-bold text-white flex items-center gap-2">
                {userInfo.name} 품질 관리자님 <span className="animate-bounce">👋🏻</span>
              </div>
              <div className="text-xs text-pink-100 mt-1">
                오늘도 힘내세요! Feple이 함께합니다 :)
              </div>
            </div>
          </div>

          {/* 검색 섹션 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="상담사 이름으로 검색..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
              />
            </div>

            {/* 검색 결과 */}
            {showResults && (
              <div className="mt-3 border-t border-gray-200 pt-3">
                <h4 className="text-xs font-medium text-gray-700 mb-2">
                  검색 결과 ({searchResults.length}개)
                </h4>
                {searchResults.length > 0 ? (
                  <div className="space-y-2">
                    {searchResults.slice(0, 4).map((consultant) => (
                      <div
                        key={consultant.id}
                        onClick={() => handleConsultantClick(consultant)}
                        className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        {getTypeIcon()}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-900 truncate text-sm">
                              {consultant.name}
                            </span>
                            <span className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full whitespace-nowrap">
                              {getTypeName()}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 truncate">
                            {consultant.team} - {consultant.position}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-2 text-xs">
                    검색 결과가 없습니다.
                  </p>
                )}
              </div>
            )}
          </div>

          {/* 3열 레이아웃 - 완전 반응형 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            {/* 첫 번째: 점검 추천 상담사 */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex flex-col h-[calc(100vh-17rem)]">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="h-4 w-4 text-blue-500 flex-shrink-0" />
                <h3 className="text-sm mt-0.5 font-semibold text-gray-800">
                  점검 추천 상담사
                </h3>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-1.5 py-0.5 rounded-full">
                  {inspectionRecommendations.length}건
                </span>
              </div>

              <div className="space-y-3 overflow-y-auto flex-1">
                {paginatedInspectionRecommendations.map((recommendation) => (
                  <div
                    key={recommendation.id}
                    onClick={() =>
                      handleInspectionRecommendationClick(recommendation)
                    }
                    className="border border-blue-200 rounded-lg p-3 hover:bg-blue-50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 truncate text-sm">
                          {recommendation.name}
                        </h4>
                        <p className="text-xs text-gray-600 truncate">
                          {recommendation.team} - {recommendation.position}
                        </p>
                      </div>
                      <span
                        className={`px-1.5 py-0.5 text-xs font-medium rounded-full whitespace-nowrap ml-2 ${getPriorityColor(
                          recommendation.priority
                        )}`}
                      >
                        {getPriorityText(recommendation.priority)}
                      </span>
                    </div>

                    <div className="space-y-1 mb-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-600">마지막 점검</span>
                        <span className="text-gray-800">
                          {recommendation.lastInspection}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-600">경과 일수</span>
                        <span
                          className={`font-medium ${
                            calculateDaysDiff(recommendation.lastInspection) >
                            30
                              ? "text-red-600"
                              : "text-gray-800"
                          }`}
                        >
                          {calculateDaysDiff(recommendation.lastInspection)}일
                        </span>
                      </div>
                    </div>

                    <div className="text-xs text-gray-600 bg-gray-50 rounded p-1.5">
                      {recommendation.recommendationReason}
                    </div>
                  </div>
                ))}
              </div>

              {/* 페이지네이션 */}
              {inspectionTotalPages > 1 && (
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
                  <button
                    onClick={handleInspectionPrevPage}
                    disabled={inspectionPage === 0}
                    className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs ${
                      inspectionPage === 0
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <ChevronLeft className="h-3 w-3" />
                    이전
                  </button>

                  <span className="text-xs text-gray-600">
                    {inspectionPage + 1} / {inspectionTotalPages}
                  </span>

                  <button
                    onClick={handleInspectionNextPage}
                    disabled={inspectionPage === inspectionTotalPages - 1}
                    className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs ${
                      inspectionPage === inspectionTotalPages - 1
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    다음
                    <ChevronRight className="h-3 w-3" />
                  </button>
                </div>
              )}
            </div>

            {/* 두 번째: 긴급 점검 대상 (페이지네이션 적용) */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex flex-col h-[calc(100vh-17rem)]">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="h-4 w-4 text-red-500 flex-shrink-0" />
                <h3 className="text-sm mt-0.5 font-semibold text-gray-800">
                  긴급 점검 대상
                </h3>
                <span className="bg-red-100 text-red-800 text-xs font-medium px-1.5 py-0.5 rounded-full">
                  {riskAlerts.length}건
                </span>
              </div>

              <div className="space-y-3 flex-1 overflow-y-auto">
                {paginatedRiskAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    onClick={() => handleRiskAlertClick(alert)}
                    className="border border-red-200 rounded-lg p-3 hover:bg-red-50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 truncate text-sm">
                          {alert.name}
                        </h4>
                        <p className="text-xs text-gray-600 truncate">
                          {alert.team} - {alert.position}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 ml-2">
                        {getSeverityIcon(alert.riskCategories[0].severity)}
                        <span className="text-xs text-gray-500 whitespace-nowrap">
                          긴급
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1 mb-2">
                      {alert.riskCategories.map((risk, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between"
                        >
                          <span className="text-xs text-gray-700 truncate">
                            {risk.category}
                          </span>
                          <span
                            className={`px-1.5 py-0.5 text-xs font-bold rounded whitespace-nowrap min-w-[24px] text-center ${getGradeColor(
                              risk.grade,
                              risk.severity
                            )}`}
                          >
                            {risk.grade}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="text-xs text-gray-600 bg-gray-50 rounded p-1.5">
                      <div className="flex items-center justify-between">
                        <span>최근 평가:</span>
                        <span>{alert.lastEvaluation}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* 페이지네이션 */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
                  <button
                    onClick={handlePrevPage}
                    disabled={riskAlertPage === 0}
                    className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs ${
                      riskAlertPage === 0
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <ChevronLeft className="h-3 w-3" />
                    이전
                  </button>

                  <span className="text-xs text-gray-600">
                    {riskAlertPage + 1} / {totalPages}
                  </span>

                  <button
                    onClick={handleNextPage}
                    disabled={riskAlertPage === totalPages - 1}
                    className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs ${
                      riskAlertPage === totalPages - 1
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    다음
                    <ChevronRight className="h-3 w-3" />
                  </button>
                </div>
              )}
            </div>

            {/* 세 번째: 팀별 상담원 관리 */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex flex-col h-[calc(100vh-17rem)]">
              <div className="flex items-center gap-2 mb-3">
                <Users className="h-4 w-4 text-purple-500 flex-shrink-0" />
                <h3 className="text-sm mt-0.5 font-semibold text-gray-800">
                  팀별 상담원 관리
                </h3>
              </div>

              {/* 팀 선택 드롭다운 (동적 teams 사용) */}
              <div className="mb-3">
                <label className="block text-xs font-medium text-gray-700 mb-2">
                  팀 선택
                </label>
                <div className="relative">
                  <button
                    onClick={() => setIsTeamDropdownOpen(!isTeamDropdownOpen)}
                    className="w-full flex items-center justify-between px-3 py-2 border border-gray-200 rounded-lg hover:border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-colors"
                  >
                    <span className="text-gray-900 truncate">
                      {getSelectedTeamName()}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 text-gray-500 transition-transform ${
                        isTeamDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isTeamDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                      {teams.map((team) => (
                        <div
                          key={team.id}
                          onClick={() => handleTeamSelect(team.id)}
                          className="px-3 sm:px-4 py-2 sm:py-3 hover:bg-pink-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1 min-w-0">
                              <span className="font-medium text-gray-900 truncate block text-sm">
                                {team.name}
                              </span>
                              <p className="text-xs text-gray-600 truncate">
                                {team.teamLead}
                              </p>
                            </div>
                            <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                              {team.memberCount}명
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* 선택된 팀의 상담원 목록 */}
              {selectedTeam && (
                <div className="flex flex-col flex-1">
                  <h4 className="text-sm font-semibold text-gray-800 mb-2">
                    {getSelectedTeamName()} 상담원 목록 (
                    {getCurrentTeamMembers().length}명)
                  </h4>
                  <div className="space-y-3 flex-1 overflow-y-auto">
                    {paginatedTeamMembers.map((member) => {
                      return (
                        <div
                          key={member.id}
                          onClick={() => handleConsultantClick(member)}
                          className="p-3 border border-gray-200 rounded-lg hover:shadow-md transition-all cursor-pointer hover:border-pink-300"
                        >
                          <div className="flex flex-col gap-0.5">
                            <h5 className="font-semibold text-gray-900 truncate text-sm">
                              {member.name}
                            </h5>
                            <span className="text-xs text-gray-600 truncate">
                              {member.position}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* 팀별 상담원 페이지네이션 */}
                  {teamTotalPages > 1 && (
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
                      <button
                        onClick={handleTeamPrevPage}
                        disabled={teamMemberPage === 0}
                        className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs ${
                          teamMemberPage === 0
                            ? "text-gray-400 cursor-not-allowed"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <ChevronLeft className="h-3 w-3" />
                        이전
                      </button>

                      <span className="text-xs text-gray-600">
                        {teamMemberPage + 1} / {teamTotalPages}
                      </span>

                      <button
                        onClick={handleTeamNextPage}
                        disabled={teamMemberPage === teamTotalPages - 1}
                        className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs ${
                          teamMemberPage === teamTotalPages - 1
                            ? "text-gray-400 cursor-not-allowed"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        다음
                        <ChevronRight className="h-3 w-3" />
                      </button>
                    </div>
                  )}
                </div>
              )}

              {!selectedTeam && (
                <div className="text-center py-6 text-gray-500 flex-1 flex flex-col items-center justify-center">
                  <Users className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm">
                    팀을 선택하여 상담원 목록을 확인하세요
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
