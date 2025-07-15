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
      <div className="h-full bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 p-2 sm:p-4 lg:p-6">
        <div className="h-full space-y-4 sm:space-y-6">
          {/* 헤더 */}
          <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl p-4 sm:p-6 text-white shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold mb-2">
                  안녕하세요, {consultantData.name}님! 👋
                </h1>
                <p className="text-sm sm:text-base text-white/90">
                  {consultantData.team} • {consultantData.position}
                </p>
              </div>
              <div className="hidden sm:flex items-center space-x-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 sm:p-3">
                  <div className="text-xs sm:text-sm text-white/80">현재 시각</div>
                  <div className="text-base sm:text-lg font-semibold">
                    {new Date().toLocaleTimeString('ko-KR', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                </div>
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 sm:w-12 sm:h-12 bg-white/30 rounded-full flex items-center justify-center text-lg sm:text-xl font-bold">
                    {consultantData.name.substring(0, 1)}
                  </div>
                </div>
              </div>
              <div className="flex sm:hidden">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center text-sm font-bold">
                    {consultantData.name.substring(0, 1)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 오늘의 성과 메트릭 */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            <div className="bg-white rounded-xl p-3 sm:p-4 lg:p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs sm:text-sm text-gray-600">오늘</div>
                <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
              </div>
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
                {todayStats.callsCompleted}
              </div>
              <div className="text-xs sm:text-sm text-gray-600">완료된 상담</div>
            </div>

            <div className="bg-white rounded-xl p-3 sm:p-4 lg:p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs sm:text-sm text-gray-600">평균</div>
                <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
              </div>
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
                {todayStats.avgCallDuration}
              </div>
              <div className="text-xs sm:text-sm text-gray-600">상담 시간</div>
            </div>

            <div className="bg-white rounded-xl p-3 sm:p-4 lg:p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs sm:text-sm text-gray-600">평점</div>
                <Award className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500" />
              </div>
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
                {todayStats.satisfactionScore}
              </div>
              <div className="text-xs sm:text-sm text-gray-600">만족도 (5점 만점)</div>
            </div>

            <div className="bg-white rounded-xl p-3 sm:p-4 lg:p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs sm:text-sm text-gray-600">해결율</div>
                <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-purple-500" />
              </div>
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
                91%
              </div>
              <div className="text-xs sm:text-sm text-gray-600">문제 해결</div>
            </div>
          </div>

          {/* 메인 콘텐츠 영역 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 h-full lg:h-[calc(100vh-28rem)]">
            {/* 이번 주 성과 */}
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="h-5 w-5 text-blue-500" />
                <h2 className="text-base sm:text-lg font-semibold text-gray-800">이번 주 성과</h2>
              </div>
              
              <div className="space-y-4 sm:space-y-6 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm sm:text-base text-gray-600">총 상담 건수</span>
                  <span className="text-lg sm:text-xl font-bold text-gray-900">{weeklyPerformance.totalCalls}건</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm sm:text-base text-gray-600">평균 만족도</span>
                  <span className="text-lg sm:text-xl font-bold text-gray-900">{weeklyPerformance.avgSatisfaction}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm sm:text-base text-gray-600">개선율</span>
                  <span className="text-lg sm:text-xl font-bold text-green-600">{weeklyPerformance.improvementRate}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm sm:text-base text-gray-600">팀 내 순위</span>
                  <span className="text-lg sm:text-xl font-bold text-gray-900">{weeklyPerformance.rankInTeam}위</span>
                </div>
              </div>
            </div>

            {/* 최근 피드백 */}
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <MessageCircle className="h-5 w-5 text-green-500" />
                <h2 className="text-base sm:text-lg font-semibold text-gray-800">최근 피드백</h2>
              </div>
              
              <div className="space-y-3 sm:space-y-4 flex-1 overflow-y-auto">
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs sm:text-sm font-medium text-green-700">QC 평가</span>
                    <span className="text-xs text-green-600 ml-auto">2시간 전</span>
                  </div>
                  <p className="text-sm sm:text-base text-green-800 leading-relaxed">
                    고객 응대 시 공감대 형성과 정확한 해결책 제시. 체계적인 과정 응대로 자연스러운 대화를 유도했습니다.
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-xs sm:text-sm font-medium text-blue-700">고객 후기</span>
                    <span className="text-xs text-blue-600 ml-auto">1일 전</span>
                  </div>
                                     <p className="text-sm sm:text-base text-blue-800 leading-relaxed">
                     &ldquo;질문에 대한 정확한 답변과 친절한 진행인 문제를 해결해 주셔서 감사합니다!&rdquo;
                   </p>
                </div>
              </div>
            </div>
          </div>

          {/* 개발 진행 중 알림 */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 sm:p-6">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
              <h3 className="text-base sm:text-lg font-semibold text-yellow-800">🚧 개발 진행 중</h3>
            </div>
            <p className="text-sm sm:text-base text-yellow-700">
              상담사 전용 대시보드가 현재 개발 중입니다. 곧 더 많은 기능들을 만나보실 수 있습니다!
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 