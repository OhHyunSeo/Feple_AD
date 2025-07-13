"use client";

import { useState } from "react";
import Link from "next/link";
import DashboardLayout from "@/components/DashboardLayout";
import { Users, FileText, Target, TrendingUp, Search, Filter, Award, ChevronRight } from "lucide-react";

export default function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);

  // 검색 데이터 (업데이트된 정적 데이터)
  const searchData = [
    { type: "consultant", title: "김민수", subtitle: "고객상담 1팀 - 선임 상담사", link: "/consultants", score: 4.8 },
    { type: "consultant", title: "이영희", subtitle: "고객상담 2팀 - 상담사", link: "/consultants", score: 4.5 },
    { type: "consultant", title: "박성호", subtitle: "고객상담 1팀 - 상담사", link: "/consultants", score: 4.2 },
    { type: "consultant", title: "최미연", subtitle: "고객상담 3팀 - 팀장", link: "/consultants", score: 4.9 },
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

  const handleConsultantClick = (consultant: any) => {
    // 상담 모니터링 페이지로 이동
    window.location.href = `/performance?consultant=${consultant.id}`;
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

        {/* 팀별 상담원 관리 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">팀별 상담원 관리</h3>
          
          {/* 팀 선택 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {teams.map((team) => (
              <div
                key={team.id}
                onClick={() => setSelectedTeam(selectedTeam === team.id ? null : team.id)}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${
                  selectedTeam === team.id
                    ? 'border-pink-500 bg-pink-50'
                    : 'border-gray-200 hover:border-pink-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900">{team.name}</h4>
                    <p className="text-sm text-gray-600">{team.teamLead}</p>
                    <p className="text-xs text-gray-500 mt-1">{team.memberCount}명</p>
                  </div>
                  <ChevronRight className={`h-5 w-5 transition-transform ${
                    selectedTeam === team.id ? 'rotate-90' : ''
                  } text-pink-500`} />
                </div>
              </div>
            ))}
          </div>

          {/* 선택된 팀의 상담원 목록 */}
          {selectedTeam && (
            <div className="border-t border-gray-200 pt-6">
              <h4 className="text-md font-semibold text-gray-800 mb-4">
                {teams.find(t => t.id === selectedTeam)?.name} 상담원 목록
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {teamMembers[selectedTeam as keyof typeof teamMembers]?.map((member) => (
                  <div
                    key={member.id}
                    onClick={() => handleConsultantClick(member)}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all cursor-pointer hover:border-pink-300"
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
        </div>
      </div>
    </DashboardLayout>
  );
}
