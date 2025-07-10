"use client";

import { useState } from "react";
import Link from "next/link";
import DashboardLayout from "@/components/DashboardLayout";
import StatCard from "@/components/StatCard";
import EvaluationChart from "@/components/EvaluationChart";
import ConsultantTable from "@/components/ConsultantTable";
import { Users, FileText, Target, TrendingUp, Calendar, Award, Search, Filter } from "lucide-react";

export default function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);

  // 검색 데이터 (정적 데이터)
  const searchData = [
    { type: "consultant", title: "김민수", subtitle: "고객상담 1팀 - 선임 상담사", link: "/consultants", score: 4.8 },
    { type: "consultant", title: "이영희", subtitle: "고객상담 2팀 - 상담사", link: "/consultants", score: 4.5 },
    { type: "evaluation", title: "2024년 4분기 정기평가", subtitle: "정기평가 - 김민수", link: "/evaluations/1", score: null },
    { type: "evaluation", title: "신입사원 역량진단", subtitle: "역량진단 - 이영희", link: "/evaluations/2", score: null },
    { type: "competency", title: "고객응대 역량", subtitle: "공통역량", link: "/competency", score: null },
    { type: "competency", title: "문제해결 역량", subtitle: "직무역량", link: "/competency", score: null },
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
    if (type === "evaluation") return <FileText className="h-4 w-4 text-green-500" />;
    if (type === "competency") return <Target className="h-4 w-4 text-purple-500" />;
    return <Search className="h-4 w-4 text-gray-500" />;
  };

  const getTypeName = (type: string) => {
    if (type === "consultant") return "상담사";
    if (type === "evaluation") return "평가";
    if (type === "competency") return "역량";
    return "기타";
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 text-gray-900">
        {/* 환영 메시지 */}
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-6 text-white shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">안녕하세요, 관리자님! 👋</h2>
              <p className="text-pink-100">오늘도 효율적인 인사 관리를 위해 함께하겠습니다.</p>
            </div>
            <div className="hidden md:block">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                <Award className="w-12 h-12 text-white" />
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
                placeholder="상담사, 평가, 역량 등 전체 검색..."
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
                    <Link
                      key={index}
                      href={result.link}
                      onClick={() => setShowResults(false)}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
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
                    </Link>
                  ))}
                  {searchResults.length > 6 && (
                    <div className="text-center pt-2">
                      <button className="text-sm text-blue-600 hover:text-blue-800">
                        더 보기 ({searchResults.length - 6}개 추가)
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">검색 결과가 없습니다.</p>
              )}
            </div>
          )}
        </div>

        {/* 통계 카드 섹션 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="전체 상담사"
            value={156}
            change={5}
            icon={Users}
            iconColor="text-pink-500"
            description="활동중인 상담사"
            href="/consultants"
          />
          <StatCard
            title="진행중 평가"
            value={42}
            change={-12}
            icon={FileText}
            iconColor="text-purple-500"
            description="이번 달 평가"
            href="/evaluations"
          />
          <StatCard
            title="평균 역량 점수"
            value="4.6"
            change={3}
            icon={Target}
            iconColor="text-pink-600"
            description="5점 만점"
            href="/competency"
          />
          <StatCard
            title="목표 달성률"
            value="87%"
            change={8}
            icon={TrendingUp}
            iconColor="text-purple-600"
            description="분기 목표 대비"
            href="/performance"
          />
        </div>

        {/* 빠른 액션 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/schedule" className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center hover:shadow-md transition-shadow cursor-pointer">
            <Calendar className="w-8 h-8 text-pink-500 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-900">평가 일정</h3>
            <p className="text-sm text-gray-600">오늘 3건의 평가가 예정되어 있습니다</p>
          </Link>
          <Link href="/consultants" className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center hover:shadow-md transition-shadow cursor-pointer">
            <Users className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-900">새 상담사</h3>
            <p className="text-sm text-gray-600">이번 주 신규 등록 5명</p>
          </Link>
          <Link href="/competency" className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center hover:shadow-md transition-shadow cursor-pointer">
            <Target className="w-8 h-8 text-pink-600 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-900">역량 진단</h3>
            <p className="text-sm text-gray-600">대기중인 진단 12건</p>
          </Link>
        </div>

        {/* 차트 섹션 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">월별 평가 진행 현황</h3>
            </div>
            <div className="p-0">
              <EvaluationChart type="bar" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">평가 유형별 분포</h3>
            </div>
            <div className="p-0">
              <EvaluationChart type="pie" />
            </div>
          </div>
        </div>

        {/* 상담사 테이블 섹션 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">상담사 현황</h3>
          </div>
          <ConsultantTable />
        </div>
      </div>
    </DashboardLayout>
  );
}
