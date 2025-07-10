"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { TrendingUp, Award, Target, Users } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

// 성과 데이터
const performanceData = [
  { month: "1월", score: 78, target: 80 },
  { month: "2월", score: 82, target: 80 },
  { month: "3월", score: 85, target: 80 },
  { month: "4월", score: 79, target: 80 },
  { month: "5월", score: 88, target: 80 },
  { month: "6월", score: 91, target: 80 },
];

const departmentPerformance = [
  { department: "고객상담 1팀", current: 85, target: 80 },
  { department: "고객상담 2팀", current: 78, target: 80 },
  { department: "기술지원팀", current: 92, target: 85 },
  { department: "VIP상담팀", current: 96, target: 90 },
];

const achievementData = [
  { name: "목표 달성", value: 73, color: "#10B981" },
  { name: "목표 미달성", value: 27, color: "#EF4444" },
];

export default function PerformancePage() {
  return (
    <DashboardLayout title="성과 분석">
      <div className="space-y-6">
        {/* 페이지 헤더 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">성과 분석</h1>
            <p className="text-gray-600 mt-1">상담사들의 성과 지표와 목표 달성률을 분석합니다</p>
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

        {/* 차트 섹션 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 월별 성과 추이 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">월별 성과 추이</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="score" stroke="#3B82F6" strokeWidth={2} name="실제 성과" />
                <Line type="monotone" dataKey="target" stroke="#EF4444" strokeDasharray="5 5" name="목표" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* 목표 달성률 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">목표 달성률</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={achievementData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {achievementData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 부서별 성과 비교 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">부서별 성과 비교</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={departmentPerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="department" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="current" fill="#3B82F6" name="현재 성과" />
              <Bar dataKey="target" fill="#E5E7EB" name="목표" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 성과 순위 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">이번 달 성과 순위</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {[
                { rank: 1, name: "최동욱", department: "VIP상담팀", score: 98, badge: "🏆" },
                { rank: 2, name: "박철수", department: "기술지원팀", score: 96, badge: "🥈" },
                { rank: 3, name: "김민수", department: "고객상담 1팀", score: 94, badge: "🥉" },
                { rank: 4, name: "이영희", department: "고객상담 2팀", score: 92, badge: "" },
                { rank: 5, name: "정수진", department: "고객상담 1팀", score: 89, badge: "" },
              ].map((item) => (
                <div key={item.rank} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="text-lg font-bold text-gray-600 w-8">
                      {item.badge || item.rank}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-600">{item.department}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">{item.score}점</p>
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${item.score}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 성과 개선 액션 아이템 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">성과 개선 액션 아이템</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border-l-4 border-red-400 bg-red-50 p-4">
                <h4 className="font-medium text-red-800 mb-2">개선 필요 팀</h4>
                <ul className="text-sm text-red-700 space-y-1">
                  <li>• 고객상담 2팀: 목표 대비 -2점</li>
                  <li>• 추가 교육 및 멘토링 프로그램 필요</li>
                </ul>
              </div>
              <div className="border-l-4 border-green-400 bg-green-50 p-4">
                <h4 className="font-medium text-green-800 mb-2">우수 사례</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• VIP상담팀 베스트 프랙티스 공유</li>
                  <li>• 기술지원팀 효율적 업무 프로세스 벤치마킹</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 