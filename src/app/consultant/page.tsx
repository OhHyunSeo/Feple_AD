"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { BarChart3, MessageCircle, Clock, TrendingUp, Award, AlertCircle } from "lucide-react";

export default function ConsultantDashboardPage() {
  // 상담사 개인 데이터 (예시)
  const consultantData = {
    name: "김민수",
    id: "C001",
    team: "고객상담 1팀",
    position: "선임 상담사",
    profileImage: null
  };

  const todayStats = {
    callsCompleted: 23,
    avgCallDuration: "5분 32초",
    satisfactionScore: 4.8,
    resolvedIssues: 21
  };

  const weeklyPerformance = {
    totalCalls: 142,
    avgSatisfaction: 4.7,
    improvementRate: "+12%",
    rankInTeam: 2
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 p-6">
        {/* 헤더 */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                안녕하세요, {consultantData.name}님! 👋
              </h1>
              <p className="text-gray-600">
                {consultantData.team} • {consultantData.position}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <div className="text-sm text-gray-600">현재 시각</div>
                <div className="text-lg font-semibold">
                  {new Date().toLocaleTimeString('ko-KR', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 오늘의 성과 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <MessageCircle className="h-6 w-6 text-blue-600" />
              </div>
              <span className="text-sm text-gray-500">오늘</span>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {todayStats.callsCompleted}
            </div>
            <div className="text-sm text-gray-600">완료된 상담</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
              <span className="text-sm text-gray-500">평균</span>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {todayStats.avgCallDuration}
            </div>
            <div className="text-sm text-gray-600">상담 시간</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Award className="h-6 w-6 text-yellow-600" />
              </div>
              <span className="text-sm text-gray-500">만족도</span>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {todayStats.satisfactionScore}
            </div>
            <div className="text-sm text-gray-600">평점 (5점 만점)</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <span className="text-sm text-gray-500">해결율</span>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {Math.round((todayStats.resolvedIssues / todayStats.callsCompleted) * 100)}%
            </div>
            <div className="text-sm text-gray-600">문제 해결</div>
          </div>
        </div>

        {/* 주요 섹션들 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* 이번 주 성과 */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
              이번 주 성과
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">총 상담 건수</span>
                <span className="font-semibold">{weeklyPerformance.totalCalls}건</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">평균 만족도</span>
                <span className="font-semibold">{weeklyPerformance.avgSatisfaction}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">개선률</span>
                <span className="font-semibold text-green-600">{weeklyPerformance.improvementRate}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">팀 내 순위</span>
                <span className="font-semibold text-blue-600">{weeklyPerformance.rankInTeam}위</span>
              </div>
            </div>
          </div>

          {/* 최근 피드백 */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <MessageCircle className="h-5 w-5 mr-2 text-green-600" />
              최근 피드백
            </h2>
            <div className="space-y-3">
              <div className="p-4 border border-green-200 rounded-lg bg-green-50">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-sm font-medium text-green-800">QC 평가</span>
                  <span className="text-xs text-green-600">2시간 전</span>
                </div>
                <p className="text-sm text-green-700">
                  고객 응대 시 공감 표현이 매우 자연스럽고 효과적입니다. 
                  문제 해결 과정도 체계적으로 진행하셨습니다.
                </p>
              </div>
              <div className="p-4 border border-blue-200 rounded-lg bg-blue-50">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-sm font-medium text-blue-800">고객 후기</span>
                  <span className="text-xs text-blue-600">1일 전</span>
                </div>
                <p className="text-sm text-blue-700">
                  &ldquo;친절하고 정확한 안내 덕분에 문제가 빠르게 해결되었습니다. 감사합니다!&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 개발 예정 알림 */}
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-6 border border-purple-200">
          <div className="flex items-center mb-3">
            <AlertCircle className="h-5 w-5 text-purple-600 mr-2" />
            <h3 className="text-lg font-semibold text-purple-900">
              🚧 개발 진행 중
            </h3>
          </div>
          <p className="text-purple-700 mb-4">
            상담사 전용 대시보드가 현재 개발 중입니다. 곧 더 많은 기능들을 만나보실 수 있습니다!
          </p>
          <div className="text-sm text-purple-600">
            <strong>예정 기능:</strong> 개인 성과 분석, 스킬 개발 추천, 교육 자료, 일정 관리, 고객 히스토리 등
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 