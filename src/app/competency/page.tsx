"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { Target, BarChart3, Users, TrendingUp } from "lucide-react";
import Link from "next/link";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

// 역량 데이터
const competencyData = [
  { competency: "의사소통", score: 85, fullMark: 100 },
  { competency: "문제해결", score: 78, fullMark: 100 },
  { competency: "고객서비스", score: 92, fullMark: 100 },
  { competency: "기술지식", score: 76, fullMark: 100 },
  { competency: "팀워크", score: 88, fullMark: 100 },
  { competency: "리더십", score: 65, fullMark: 100 },
];

const departmentScores = [
  { department: "고객상담 1팀", score: 82 },
  { department: "고객상담 2팀", score: 79 },
  { department: "기술지원팀", score: 85 },
  { department: "VIP상담팀", score: 91 },
];

export default function CompetencyPage() {
  return (
    <DashboardLayout title="역량 진단">
      <div className="space-y-6">
        {/* 페이지 헤더 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">역량 진단</h1>
            <p className="text-gray-600 mt-1">상담사들의 핵심 역량을 분석하고 평가합니다</p>
          </div>
          <Link href="/competency/evaluation" className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center gap-2">
            <Target className="h-4 w-4" />
            역량 평가하기
          </Link>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <Target className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">평균 역량 점수</p>
                <p className="text-2xl font-bold text-gray-900">82.3</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">최고 역량 영역</p>
                <p className="text-2xl font-bold text-gray-900">고객서비스</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">개선 필요 영역</p>
                <p className="text-2xl font-bold text-gray-900">리더십</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">진단 완료자</p>
                <p className="text-2xl font-bold text-gray-900">128명</p>
              </div>
            </div>
          </div>
        </div>

        {/* 차트 섹션 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 역량 레이더 차트 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">전체 역량 분석</h3>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={competencyData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="competency" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                <Radar
                  name="역량 점수"
                  dataKey="score"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* 부서별 평균 점수 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">부서별 평균 역량 점수</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departmentScores}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="department" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="score" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 역량별 상세 분석 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">역량별 상세 분석</h3>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              {competencyData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900">{item.competency}</span>
                      <span className="text-sm text-gray-500">{item.score}/100</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${item.score}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="ml-4 flex items-center">
                    {item.score >= 80 ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        우수
                      </span>
                    ) : item.score >= 70 ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        보통
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        개선필요
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 개선 권장사항 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">개선 권장사항</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="border-l-4 border-yellow-400 bg-yellow-50 p-4">
                <div className="flex">
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-yellow-800">리더십 역량 강화 필요</h4>
                    <p className="mt-1 text-sm text-yellow-700">
                      평균 점수가 65점으로 다른 역량 대비 낮습니다. 리더십 교육 프로그램 참여를 권장합니다.
                    </p>
                  </div>
                </div>
              </div>
              <div className="border-l-4 border-blue-400 bg-blue-50 p-4">
                <div className="flex">
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-blue-800">기술지식 업데이트</h4>
                    <p className="mt-1 text-sm text-blue-700">
                      기술지식 점수가 76점입니다. 최신 기술 트렌드 교육이 필요합니다.
                    </p>
                  </div>
                </div>
              </div>
              <div className="border-l-4 border-green-400 bg-green-50 p-4">
                <div className="flex">
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-green-800">고객서비스 우수</h4>
                    <p className="mt-1 text-sm text-green-700">
                      고객서비스 역량이 92점으로 매우 우수합니다. 모범 사례로 활용 가능합니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 