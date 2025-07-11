"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { TrendingUp, Users, FileText, Award, Target, Calendar } from "lucide-react";

export default function PerformanceEvaluationPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6 text-gray-900">
        {/* 페이지 헤더 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 korean-heading">성과 평가</h1>
            <p className="text-gray-600 mt-2">상담사들의 성과 지표와 목표 달성률을 평가합니다</p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600">
              새 평가 생성
            </button>
            <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
              평가 내보내기
            </button>
          </div>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">평균 성과 점수</p>
                <p className="text-2xl font-bold text-gray-900">85.2</p>
                <p className="text-xs text-green-600 mt-1">+3.2% 증가</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <Target className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">목표 달성률</p>
                <p className="text-2xl font-bold text-gray-900">73%</p>
                <p className="text-xs text-blue-600 mt-1">113명 달성</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <Award className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">최우수 팀</p>
                <p className="text-2xl font-bold text-gray-900">VIP상담팀</p>
                <p className="text-xs text-yellow-600 mt-1">96점</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">우수 상담사</p>
                <p className="text-2xl font-bold text-gray-900">42명</p>
                <p className="text-xs text-purple-600 mt-1">90점 이상</p>
              </div>
            </div>
          </div>
        </div>

        {/* 성과 평가 리스트 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">진행중인 성과 평가</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    평가명
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    대상자
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    평가 기간
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    진행률
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    상태
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    액션
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  {
                    name: "2024년 4분기 정기 성과평가",
                    target: "전체 상담사 (156명)",
                    period: "2024.10.01 ~ 2024.12.31",
                    progress: 75,
                    status: "진행중",
                    statusColor: "text-blue-600 bg-blue-100"
                  },
                  {
                    name: "VIP상담팀 월간 평가",
                    target: "VIP상담팀 (12명)",
                    period: "2024.12.01 ~ 2024.12.31",
                    progress: 90,
                    status: "완료",
                    statusColor: "text-green-600 bg-green-100"
                  },
                  {
                    name: "신입사원 성과 진단",
                    target: "신입사원 (8명)",
                    period: "2024.12.15 ~ 2024.12.30",
                    progress: 40,
                    status: "진행중",
                    statusColor: "text-blue-600 bg-blue-100"
                  }
                ].map((evaluation, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{evaluation.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {evaluation.target}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {evaluation.period}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-3">
                          <div
                            className="bg-pink-500 h-2 rounded-full"
                            style={{ width: `${evaluation.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">{evaluation.progress}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${evaluation.statusColor}`}>
                        {evaluation.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-pink-600 hover:text-pink-900 mr-3">
                        보기
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        편집
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 성과 개선 권장사항 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Award className="h-5 w-5 text-yellow-500" />
              우수 성과 사례
            </h3>
            <div className="space-y-4">
              <div className="border-l-4 border-green-400 bg-green-50 p-4 rounded">
                <h4 className="font-medium text-green-800 mb-2">VIP상담팀 - 최다솔 상담사</h4>
                <p className="text-sm text-green-700">
                  월 목표 대비 125% 달성으로 고객 만족도 향상에 크게 기여했습니다.
                </p>
              </div>
              <div className="border-l-4 border-blue-400 bg-blue-50 p-4 rounded">
                <h4 className="font-medium text-blue-800 mb-2">기술지원팀 - 박철수 상담사</h4>
                <p className="text-sm text-blue-700">
                  복잡한 기술 문의에 대한 신속하고 정확한 해결로 평균 처리 시간을 20% 단축했습니다.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-red-500" />
              개선 필요 영역
            </h3>
            <div className="space-y-4">
              <div className="border-l-4 border-red-400 bg-red-50 p-4 rounded">
                <h4 className="font-medium text-red-800 mb-2">고객상담 2팀</h4>
                <p className="text-sm text-red-700">
                  평균 응답 시간이 목표보다 15% 초과되어 추가 교육이 필요합니다.
                </p>
              </div>
              <div className="border-l-4 border-orange-400 bg-orange-50 p-4 rounded">
                <h4 className="font-medium text-orange-800 mb-2">신입사원 그룹</h4>
                <p className="text-sm text-orange-700">
                  업무 숙련도 향상을 위한 멘토링 프로그램 강화가 권장됩니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 