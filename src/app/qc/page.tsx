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
import {
  searchData,
  teams,
  teamMembers,
  inspectionRecommendations,
  riskAlerts,
} from "@/data/qcData";

export default function QCDashboardPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<string>("");
  const [isTeamDropdownOpen, setIsTeamDropdownOpen] = useState(false);
  const [riskAlertPage, setRiskAlertPage] = useState(0);
  const [inspectionPage, setInspectionPage] = useState(0);
  const [teamMemberPage, setTeamMemberPage] = useState(0);

  // QC 정보
  const qcName = "점소이현서";
  const qcInitial = qcName[0];

  // 오늘 날짜
  const today = new Date(Date.now());

  // 경과 일수 계산 함수
  const calculateDaysDiff = (dateString: string): number => {
    const targetDate = new Date(dateString);
    const diffTime = today.getTime() - targetDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // 검색 결과 필터링
  const searchResults =
    searchTerm.length > 0
      ? searchData.filter(
          (item) =>
            item.title.includes(searchTerm) ||
            item.subtitle.includes(searchTerm)
        )
      : [];

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setShowResults(value.length > 0);
  };

  const getTypeIcon = (type: string) => {
    if (type === "consultant")
      return <Users className="h-4 w-4 text-blue-500" />;
    return <Search className="h-4 w-4 text-gray-500" />;
  };

  const getTypeName = (type: string) => {
    if (type === "consultant") return "상담사";
    return "기타";
  };

  const handleConsultantClick = (
    consultant:
      | {
          id: string;
          name: string;
          position: string;
          callsToday: number;
        }
      | {
          type: string;
          title: string;
          subtitle: string;
          link: string;
        }
  ) => {
    // 상담 모니터링 페이지로 이동
    if ("id" in consultant) {
      window.location.href = `/performance?consultant=${consultant.id}`;
    } else {
      window.location.href = `/performance?consultant=${consultant.title}`;
    }
  };

  const handleRiskAlertClick = (alert: (typeof riskAlerts)[0]) => {
    window.location.href = `/performance?consultant=${alert.id}`;
  };

  const handleInspectionRecommendationClick = (
    recommendation: (typeof inspectionRecommendations)[0]
  ) => {
    window.location.href = `/performance?consultant=${recommendation.id}`;
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
    return teamMembers[selectedTeam as keyof typeof teamMembers] || [];
  };

  // 점검 추천 상담사 페이지네이션
  const ITEMS_PER_PAGE = 2;
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

  // 위험 등급 알림 페이지네이션
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
              {qcInitial}
            </div>
            <div>
              <div className="text-base font-bold text-white flex items-center gap-2">
                {qcName} QC님 <span className="animate-bounce">👋🏻</span>
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
                    {searchResults.slice(0, 4).map((result, index) => (
                      <div
                        key={index}
                        onClick={() =>
                          result.type === "consultant" &&
                          handleConsultantClick(result)
                        }
                        className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        {getTypeIcon(result.type)}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-900 truncate text-sm">
                              {result.title}
                            </span>
                            <span className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full whitespace-nowrap">
                              {getTypeName(result.type)}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 truncate">
                            {result.subtitle}
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
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-600">담당 QC</span>
                        <span className="text-gray-800 truncate">
                          {recommendation.qcManager}
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

            {/* 두 번째: 위험 등급 알림 (페이지네이션 적용) */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex flex-col h-[calc(100vh-17rem)]">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="h-4 w-4 text-red-500 flex-shrink-0" />
                <h3 className="text-sm mt-0.5 font-semibold text-gray-800">
                  위험 등급 알림
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

              {/* 팀 선택 드롭다운 */}
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
                    {paginatedTeamMembers.map((member) => (
                      <div
                        key={member.id}
                        onClick={() => handleConsultantClick(member)}
                        className="p-3 border border-gray-200 rounded-lg hover:shadow-md transition-all cursor-pointer hover:border-pink-300"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <h5 className="font-semibold text-gray-900 truncate text-sm">
                            {member.name}
                          </h5>
                        </div>
                        <p className="text-xs text-gray-600 mb-1 truncate">
                          {member.position}
                        </p>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-500 truncate">
                            오늘 통화: {member.callsToday}건
                          </span>
                        </div>
                      </div>
                    ))}
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
