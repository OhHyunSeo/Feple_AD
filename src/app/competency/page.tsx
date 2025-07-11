'use client'

import React, { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import StatCard from '@/components/StatCard'
import EvaluationChart from '@/components/EvaluationChart'
import { Target, TrendingUp, Users, Award, ChevronDown, ChevronUp, UserCheck } from 'lucide-react'
import Link from 'next/link'

// 부서 및 담당자 데이터
const departments = [
  {
    id: 'customer_service_1',
    name: '고객상담 1팀',
    members: [
      { 
        id: 'kim_sangdam', 
        name: '김상담', 
        position: '선임 상담사', 
        avatar: '김',
        competencyScores: {
          communication: 4.5,
          problemSolving: 4.2,
          customerService: 4.8,
          technicalKnowledge: 4.3
        },
        improvements: [
          { area: '의사소통', current: 4.5, target: 4.8, priority: '중간' },
          { area: '문제해결', current: 4.2, target: 4.5, priority: '높음' }
        ]
      },
      { 
        id: 'park_sangdam', 
        name: '박상담', 
        position: '주임 상담사', 
        avatar: '박',
        competencyScores: {
          communication: 4.3,
          problemSolving: 4.0,
          customerService: 4.6,
          technicalKnowledge: 4.1
        },
        improvements: [
          { area: '기술지식', current: 4.1, target: 4.4, priority: '중간' },
          { area: '문제해결', current: 4.0, target: 4.3, priority: '높음' }
        ]
      }
    ]
  },
  {
    id: 'customer_service_2',
    name: '고객상담 2팀',
    members: [
      { 
        id: 'choi_sangdam', 
        name: '최상담', 
        position: '선임 상담사', 
        avatar: '최',
        competencyScores: {
          communication: 4.7,
          problemSolving: 4.4,
          customerService: 4.9,
          technicalKnowledge: 4.5
        },
        improvements: [
          { area: '의사소통', current: 4.7, target: 4.9, priority: '낮음' }
        ]
      }
    ]
  }
];

export default function CompetencyPage() {
  const [selectedDepartment, setSelectedDepartment] = useState('customer_service_1');
  const [selectedMember, setSelectedMember] = useState('kim_sangdam');
  const [showAnalysisDetails, setShowAnalysisDetails] = useState(false);
  const [showImprovementDetails, setShowImprovementDetails] = useState(false);

  const getCurrentDepartment = () => {
    return departments.find(dept => dept.id === selectedDepartment);
  };

  const getCurrentMember = () => {
    const dept = getCurrentDepartment();
    return dept?.members.find(member => member.id === selectedMember);
  };

  const getCompetencyData = () => {
    const member = getCurrentMember();
    if (!member) return [];

    return [
      { name: '의사소통', value: member.competencyScores.communication },
      { name: '문제해결', value: member.competencyScores.problemSolving },
      { name: '고객서비스', value: member.competencyScores.customerService },
      { name: '기술지식', value: member.competencyScores.technicalKnowledge },
    ];
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">역량 진단</h1>
            <p className="text-gray-600 mt-1">상담사들의 핵심 역량을 분석하고 평가합니다</p>
          </div>
          <Link 
            href="/competency/evaluation"
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 flex items-center gap-2"
          >
            <Target className="h-4 w-4 text-white" />
            역량 평가하기
          </Link>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="평균 역량 점수"
            value="82.3"
            icon={Target}
            iconColor="text-purple-600"
          />
          <StatCard
            title="최고 역량 영역"
            value="고객서비스"
            icon={TrendingUp}
            iconColor="text-green-600"
          />
          <StatCard
            title="개선 필요 영역"
            value="리더십"
            icon={Users}
            iconColor="text-blue-600"
          />
          <StatCard
            title="진단 완료자"
            value="128명"
            icon={Award}
            iconColor="text-orange-600"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 전체 역량 분석 */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">전체 역량 분석</h3>
            <EvaluationChart type="pie" />
          </div>

          {/* 부서별 평균 역량 점수 */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">부서별 평균 역량 점수</h3>
            <EvaluationChart type="bar" />
          </div>
        </div>

        {/* 역량별 상세 분석 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UserCheck className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-800">역량별 상세 분석</h3>
              </div>
              <button
                onClick={() => setShowAnalysisDetails(!showAnalysisDetails)}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
              >
                <span className="text-sm">상세보기</span>
                {showAnalysisDetails ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
            </div>
            
            {showAnalysisDetails && (
              <div className="mt-4 space-y-4">
                {/* 부서 선택 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">부서 선택</label>
                  <select
                    value={selectedDepartment}
                    onChange={(e) => {
                      setSelectedDepartment(e.target.value);
                      const newDept = departments.find(d => d.id === e.target.value);
                      if (newDept && newDept.members.length > 0) {
                        setSelectedMember(newDept.members[0].id);
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {departments.map(dept => (
                      <option key={dept.id} value={dept.id}>{dept.name}</option>
                    ))}
                  </select>
                </div>

                {/* 담당자 선택 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">담당자 선택</label>
                  <select
                    value={selectedMember}
                    onChange={(e) => setSelectedMember(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {getCurrentDepartment()?.members.map(member => (
                      <option key={member.id} value={member.id}>{member.name} ({member.position})</option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>
          
          {showAnalysisDetails && (
            <div className="p-6">
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">
                  {getCurrentMember()?.name}님의 역량 분석
                </h4>
                <p className="text-sm text-gray-600">
                  {getCurrentDepartment()?.name} | {getCurrentMember()?.position}
                </p>
              </div>
              
              <div className="space-y-4">
                {getCompetencyData().map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">{item.name}</span>
                    <div className="flex items-center gap-3">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${(item.value / 5) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-semibold text-blue-600 w-8">
                        {item.value.toFixed(1)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 개선 사항 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-800">개선 사항</h3>
              </div>
              <button
                onClick={() => setShowImprovementDetails(!showImprovementDetails)}
                className="flex items-center gap-2 text-green-600 hover:text-green-700"
              >
                <span className="text-sm">상세보기</span>
                {showImprovementDetails ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
            </div>
            
            {showImprovementDetails && (
              <div className="mt-4 space-y-4">
                {/* 부서 선택 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">부서 선택</label>
                  <select
                    value={selectedDepartment}
                    onChange={(e) => {
                      setSelectedDepartment(e.target.value);
                      const newDept = departments.find(d => d.id === e.target.value);
                      if (newDept && newDept.members.length > 0) {
                        setSelectedMember(newDept.members[0].id);
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    {departments.map(dept => (
                      <option key={dept.id} value={dept.id}>{dept.name}</option>
                    ))}
                  </select>
                </div>

                {/* 담당자 선택 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">담당자 선택</label>
                  <select
                    value={selectedMember}
                    onChange={(e) => setSelectedMember(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    {getCurrentDepartment()?.members.map(member => (
                      <option key={member.id} value={member.id}>{member.name} ({member.position})</option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>
          
          {showImprovementDetails && (
            <div className="p-6">
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">
                  {getCurrentMember()?.name}님의 개선 계획
                </h4>
              </div>
              
              <div className="space-y-4">
                {getCurrentMember()?.improvements.map((improvement, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium text-gray-900">{improvement.area}</h5>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        improvement.priority === '높음' 
                          ? 'bg-red-100 text-red-800'
                          : improvement.priority === '중간'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        우선순위: {improvement.priority}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-sm text-gray-600">
                        현재: <span className="font-medium">{improvement.current}</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        목표: <span className="font-medium">{improvement.target}</span>
                      </div>
                      <div className="flex-1">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-600 h-2 rounded-full"
                            style={{ width: `${(improvement.current / improvement.target) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 역량 등급별 현황 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">역량 등급별 현황</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">45명</div>
              <div className="text-sm text-gray-600">우수 (85점 이상)</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">68명</div>
              <div className="text-sm text-gray-600">보통 (70-84점)</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600 mb-1">15명</div>
              <div className="text-sm text-gray-600">개선 필요 (70점 미만)</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-orange-600 h-2 rounded-full" style={{ width: '15%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
} 