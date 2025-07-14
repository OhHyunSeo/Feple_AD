"use client";

import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Users, Search, Filter, ChevronRight, AlertTriangle, ChevronDown, Clock, ChevronLeft } from "lucide-react";

export default function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<string>("");
  const [isTeamDropdownOpen, setIsTeamDropdownOpen] = useState(false);
  const [riskAlertPage, setRiskAlertPage] = useState(0);

  // 검색 데이터 (업데이트된 정적 데이터)
  const searchData = [
    { type: "consultant", title: "김민수", subtitle: "고객상담 1팀 - 선임 상담사", link: "/consultants", score: 4.8 },
    { type: "consultant", title: "이영희", subtitle: "고객상담 2팀 - 상담사", link: "/consultants", score: 4.5 },
    { type: "consultant", title: "박성호", subtitle: "고객상담 1팀 - 상담사", link: "/consultants", score: 4.2 },
    { type: "consultant", title: "최미연", subtitle: "고객상담 3팀 - 팀장", link: "/consultants", score: 4.9 },
    { type: "consultant", title: "노준석", subtitle: "고객상담 1팀 - 상담사", link: "/consultants", score: 3.2 },
  ];

  // 팀 데이터
  const teams = [
    { id: "team1", name: "고객상담 1팀", memberCount: 12, teamLead: "김팀장" },
    { id: "team2", name: "고객상담 2팀", memberCount: 15, teamLead: "이팀장" },
    { id: "team3", name: "고객상담 3팀", memberCount: 10, teamLead: "박팀장" },
    { id: "team4", name: "기술지원팀", memberCount: 8, teamLead: "최팀장" },
  ];

  // 팀별 상담원 데이터
  const teamMembers = {
    team1: [
      { id: "c1", name: "김민수", position: "선임 상담사", status: "활동", callsToday: 23, satisfactionScore: 4.8 },
      { id: "c2", name: "박성호", position: "상담사", status: "활동", callsToday: 18, satisfactionScore: 4.2 },
      { id: "c3", name: "임지원", position: "상담사", status: "휴식", callsToday: 15, satisfactionScore: 4.5 },
      { id: "c12", name: "노준석", position: "상담사", status: "활동", callsToday: 12, satisfactionScore: 3.2 },
    ],
    team2: [
      { id: "c4", name: "이영희", position: "상담사", status: "활동", callsToday: 20, satisfactionScore: 4.5 },
      { id: "c5", name: "정다은", position: "상담사", status: "활동", callsToday: 16, satisfactionScore: 4.3 },
      { id: "c6", name: "강현준", position: "선임 상담사", status: "활동", callsToday: 25, satisfactionScore: 4.7 },
    ],
    team3: [
      { id: "c7", name: "최미연", position: "팀장", status: "활동", callsToday: 12, satisfactionScore: 4.9 },
      { id: "c8", name: "한상욱", position: "상담사", status: "활동", callsToday: 19, satisfactionScore: 4.4 },
      { id: "c9", name: "송예진", position: "상담사", status: "휴식", callsToday: 14, satisfactionScore: 4.6 },
    ],
    team4: [
      { id: "c10", name: "윤진호", position: "기술지원", status: "활동", callsToday: 8, satisfactionScore: 4.8 },
      { id: "c11", name: "조은실", position: "기술지원", status: "활동", callsToday: 10, satisfactionScore: 4.5 },
    ],
  };

  // 점검 추천 상담사 데이터
  const inspectionRecommendations = [
    {
      id: "c15",
      name: "문지호",
      team: "고객상담 1팀",
      position: "상담사",
      lastInspection: "2024-11-15",
      daysSinceInspection: 38,
      recommendationReason: "정기 점검 주기 초과",
      priority: "high",
      qcManager: "김QC"
    },
    {
      id: "c16", 
      name: "서민정",
      team: "고객상담 2팀",
      position: "선임 상담사",
      lastInspection: "2024-12-01",
      daysSinceInspection: 22,
      recommendationReason: "성과 개선 모니터링",
      priority: "medium",
      qcManager: "이QC"
    },
    {
      id: "c17",
      name: "조현우",
      team: "기술지원팀",
      position: "기술지원",
      lastInspection: "2024-10-28",
      daysSinceInspection: 56,
      recommendationReason: "장기 미점검",
      priority: "high",
      qcManager: "박QC"
    },
    {
      id: "c18",
      name: "배수진",
      team: "고객상담 3팀",
      position: "상담사",
      lastInspection: "2024-12-10",
      daysSinceInspection: 13,
      recommendationReason: "신규 교육 후 점검",
      priority: "low",
      qcManager: "최QC"
    }
  ];

  // 위험 등급 상담사 데이터
  const riskAlerts = [
    {
      id: "c12",
      name: "노준석",
      team: "고객상담 1팀",
      position: "상담사",
      riskCategories: [
        { category: "공감적 소통", grade: "F", severity: "critical" },
        { category: "정중함", grade: "G", severity: "warning" }
      ],
      lastEvaluation: "2024-12-23 14:30",
      actionRequired: true
    },
    {
      id: "c13",
      name: "김철호",
      team: "고객상담 2팀", 
      position: "상담사",
      riskCategories: [
        { category: "문제 해결", grade: "F", severity: "critical" }
      ],
      lastEvaluation: "2024-12-23 13:15",
      actionRequired: true
    },
    {
      id: "c14",
      name: "이수정",
      team: "기술지원팀",
      position: "기술지원",
      riskCategories: [
        { category: "감정 안정성", grade: "G", severity: "warning" },
        { category: "대화 흐름", grade: "F", severity: "critical" }
      ],
      lastEvaluation: "2024-12-23 12:45",
      actionRequired: true
    }
  ];

  // 검색 결과 필터링
  const searchResults = searchTerm.length > 0 
    ? searchData.filter(item =>
        item.title.includes(searchTerm) ||
        item.subtitle.includes(searchTerm)
      )
    : [];

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setShowResults(value.length > 0);
  };

  const getTypeIcon = (type: string) => {
    if (type === "consultant") return <Users className="h-4 w-4 text-blue-500" />;
    return <Search className="h-4 w-4 text-gray-500" />;
  };

  const getTypeName = (type: string) => {
    if (type === "consultant") return "상담사";
    return "기타";
  };

  const handleConsultantClick = (consultant: { id: string; name: string; position: string; status: string; callsToday: number; satisfactionScore: number } | { type: string; title: string; subtitle: string; link: string; score: number }) => {
    // 상담 모니터링 페이지로 이동
    if ('id' in consultant) {
      window.location.href = `/performance?consultant=${consultant.id}`;
    } else {
      window.location.href = `/performance?consultant=${consultant.title}`;
    }
  };

  const handleRiskAlertClick = (alert: typeof riskAlerts[0]) => {
    window.location.href = `/performance?consultant=${alert.id}`;
  };

  const handleInspectionRecommendationClick = (recommendation: typeof inspectionRecommendations[0]) => {
    window.location.href = `/performance?consultant=${recommendation.id}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "활동":
        return "bg-green-100 text-green-800";
      case "휴식":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getGradeColor = (grade: string, severity: string) => {
    if (severity === "critical") {
      return "bg-red-500 text-white";
    } else if (severity === "warning") {
      return "bg-orange-500 text-white";
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
  };

  const getSelectedTeamName = () => {
    if (!selectedTeam) return "팀을 선택하세요";
    return teams.find(team => team.id === selectedTeam)?.name || "팀을 선택하세요";
  };

  const getCurrentTeamMembers = () => {
    if (!selectedTeam) return [];
    return teamMembers[selectedTeam as keyof typeof teamMembers] || [];
  };

  // 위험 등급 알림 페이지네이션
  const ITEMS_PER_PAGE = 2;
  const totalPages = Math.ceil(riskAlerts.length / ITEMS_PER_PAGE);
  const paginatedRiskAlerts = riskAlerts.slice(
    riskAlertPage * ITEMS_PER_PAGE,
    (riskAlertPage + 1) * ITEMS_PER_PAGE
  );

  const handlePrevPage = () => {
    setRiskAlertPage(prev => Math.max(0, prev - 1));
  };

  const handleNextPage = () => {
    setRiskAlertPage(prev => Math.min(totalPages - 1, prev + 1));
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 text-gray-900">
        {/* 환영 메시지 */}
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-6 text-white shadow-xl welcome-white-text">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">안녕하세요, 관리자님! 👋</h2>
              <p className="text-white">팀별 상담원 모니터링을 통해 효율적인 관리를 도와드리겠습니다.</p>
            </div>
            <div className="hidden md:block">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                <Users className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* 전역 검색 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="상담사 이름으로 검색..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-lg"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-700">
              <Filter className="h-4 w-4" />
              필터
            </button>
          </div>

          {/* 검색 결과 */}
          {showResults && (
            <div className="mt-4 border-t border-gray-200 pt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-3">검색 결과 ({searchResults.length}개)</h4>
              {searchResults.length > 0 ? (
                <div className="space-y-2">
                  {searchResults.slice(0, 6).map((result, index) => (
                    <div
                      key={index}
                      onClick={() => result.type === "consultant" && handleConsultantClick(result)}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      {getTypeIcon(result.type)}
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900">{result.title}</span>
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            {getTypeName(result.type)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">{result.subtitle}</p>
                      </div>
                      {result.score && (
                        <div className="text-sm font-medium text-gray-900">
                          ⭐ {result.score}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">검색 결과가 없습니다.</p>
              )}
            </div>
          )}
        </div>

        {/* 3열 레이아웃 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* 첫 번째: 점검 추천 상담사 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="h-5 w-5 text-blue-500" />
              <h3 className="text-lg font-semibold text-gray-800">점검 추천 상담사</h3>
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                {inspectionRecommendations.length}건
              </span>
            </div>
            
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {inspectionRecommendations.map((recommendation) => (
                <div 
                  key={recommendation.id}
                  onClick={() => handleInspectionRecommendationClick(recommendation)}
                  className="border border-blue-200 rounded-lg p-4 hover:bg-blue-50 transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-900">{recommendation.name}</h4>
                      <p className="text-sm text-gray-600">{recommendation.team} - {recommendation.position}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(recommendation.priority)}`}>
                      {getPriorityText(recommendation.priority)}
                    </span>
                  </div>
                  
                  <div className="space-y-1 mb-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">마지막 점검</span>
                      <span className="text-gray-800">{recommendation.lastInspection}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">경과 일수</span>
                      <span className={`font-medium ${recommendation.daysSinceInspection > 30 ? 'text-red-600' : 'text-gray-800'}`}>
                        {recommendation.daysSinceInspection}일
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">담당 QC</span>
                      <span className="text-gray-800">{recommendation.qcManager}</span>
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-600 bg-gray-50 rounded p-2">
                    {recommendation.recommendationReason}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 두 번째: 위험 등급 알림 (페이지네이션 적용) */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <h3 className="text-lg font-semibold text-gray-800">위험 등급 알림</h3>
              <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
                {riskAlerts.length}건
              </span>
            </div>
            
            <div className="space-y-4 mb-4">
              {paginatedRiskAlerts.map((alert) => (
                <div 
                  key={alert.id}
                  onClick={() => handleRiskAlertClick(alert)}
                  className="border border-red-200 rounded-lg p-4 hover:bg-red-50 transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900">{alert.name}</h4>
                      <p className="text-sm text-gray-600">{alert.team} - {alert.position}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {getSeverityIcon(alert.riskCategories[0].severity)}
                      <span className="text-xs text-gray-500">긴급</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-3">
                    {alert.riskCategories.map((risk, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">{risk.category}</span>
                        <span className={`px-2 py-1 text-xs font-bold rounded ${getGradeColor(risk.grade, risk.severity)}`}>
                          {risk.grade}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>최근 평가: {alert.lastEvaluation}</span>
                    <ChevronRight className="h-3 w-3" />
                  </div>
                </div>
              ))}
            </div>

            {/* 페이지네이션 */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between">
                <button
                  onClick={handlePrevPage}
                  disabled={riskAlertPage === 0}
                  className="flex items-center gap-1 px-3 py-1 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="h-3 w-3" />
                  이전
                </button>
                <span className="text-sm text-gray-600">
                  {riskAlertPage + 1} / {totalPages}
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={riskAlertPage === totalPages - 1}
                  className="flex items-center gap-1 px-3 py-1 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  다음
                  <ChevronRight className="h-3 w-3" />
                </button>
              </div>
            )}
          </div>

          {/* 세 번째: 팀별 상담원 관리 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">팀별 상담원 관리</h3>
            
            {/* 팀 선택 드롭다운 */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">팀 선택</label>
              <div className="relative">
                <button
                  onClick={() => setIsTeamDropdownOpen(!isTeamDropdownOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 border border-gray-200 rounded-lg hover:border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-colors"
                >
                  <span className="text-gray-900">{getSelectedTeamName()}</span>
                  <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${isTeamDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isTeamDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    {teams.map((team) => (
                      <div
                        key={team.id}
                        onClick={() => handleTeamSelect(team.id)}
                        className="px-4 py-3 hover:bg-pink-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-medium text-gray-900">{team.name}</span>
                            <p className="text-sm text-gray-600">{team.teamLead}</p>
                          </div>
                          <span className="text-xs text-gray-500">{team.memberCount}명</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* 선택된 팀의 상담원 목록 */}
            {selectedTeam && (
              <div className="space-y-3">
                <h4 className="text-md font-semibold text-gray-800">
                  {getSelectedTeamName()} 상담원 목록 ({getCurrentTeamMembers().length}명)
                </h4>
                <div className="grid grid-cols-1 gap-3 max-h-96 overflow-y-auto">
                  {getCurrentTeamMembers().map((member) => (
                    <div
                      key={member.id}
                      onClick={() => handleConsultantClick(member)}
                      className="p-3 border border-gray-200 rounded-lg hover:shadow-md transition-all cursor-pointer hover:border-pink-300"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-semibold text-gray-900">{member.name}</h5>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(member.status)}`}>
                          {member.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{member.position}</p>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">오늘 통화: {member.callsToday}건</span>
                        <span className="text-gray-500">⭐ {member.satisfactionScore}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {!selectedTeam && (
              <div className="text-center py-8 text-gray-500">
                <Users className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                <p>팀을 선택하여 상담원 목록을 확인하세요</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
