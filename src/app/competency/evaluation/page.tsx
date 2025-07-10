'use client'

import React, { useState } from 'react'
import DashboardLayout from "@/components/DashboardLayout";
import { ArrowLeft, CheckSquare, Users, User } from "lucide-react";
import Link from "next/link";

// 부서 및 담당자 데이터
interface Member {
  id: string;
  name: string;
  position: string;
  avatar: string;
}

interface Department {
  id: string;
  name: string;
  members: Member[];
}

const departments: Department[] = [
  {
    id: 'customer_service_1',
    name: '고객상담 1팀',
    members: [
      { id: 'kim_sangdam', name: '김상담', position: '선임 상담사', avatar: '김' },
      { id: 'park_sangdam', name: '박상담', position: '주임 상담사', avatar: '박' },
      { id: 'lee_sangdam', name: '이상담', position: '상담사', avatar: '이' }
    ]
  },
  {
    id: 'customer_service_2',
    name: '고객상담 2팀',
    members: [
      { id: 'choi_sangdam', name: '최상담', position: '선임 상담사', avatar: '최' },
      { id: 'jung_sangdam', name: '정상담', position: '주임 상담사', avatar: '정' },
      { id: 'kang_sangdam', name: '강상담', position: '상담사', avatar: '강' }
    ]
  },
  {
    id: 'tech_support',
    name: '기술지원팀',
    members: [
      { id: 'oh_tech', name: '오기술', position: '선임 엔지니어', avatar: '오' },
      { id: 'yoon_tech', name: '윤기술', position: '엔지니어', avatar: '윤' }
    ]
  }
];

export default function CompetencyEvaluationPage() {
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [showEvaluation, setShowEvaluation] = useState(false);

  const handleDepartmentChange = (deptId: string) => {
    setSelectedDepartment(deptId);
    setSelectedMember(null);
  };

  const handleMemberSelect = (member: Member) => {
    setSelectedMember(member);
  };

  const handleStartEvaluation = () => {
    if (selectedMember) {
      setShowEvaluation(true);
    }
  };

  const getSelectedDepartment = () => {
    return departments.find(dept => dept.id === selectedDepartment);
  };

  if (showEvaluation && selectedMember) {
    return <CompetencyEvaluationForm member={selectedMember} onBack={() => setShowEvaluation(false)} />;
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* 헤더 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/competency" className="text-gray-500 hover:text-gray-700">
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">역량 평가하기</h1>
              <p className="text-gray-600">평가할 부서와 담당자를 선택하세요</p>
            </div>
          </div>
        </div>

        {/* 부서 선택 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Users className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-800">부서 선택</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {departments.map((dept) => (
              <div
                key={dept.id}
                onClick={() => handleDepartmentChange(dept.id)}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  selectedDepartment === dept.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <h4 className="font-medium text-gray-900">{dept.name}</h4>
                <p className="text-sm text-gray-600">{dept.members.length}명</p>
              </div>
            ))}
          </div>
        </div>

        {/* 담당자 선택 */}
        {selectedDepartment && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <User className="h-5 w-5 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-800">담당자 선택</h3>
              <span className="text-sm text-gray-500">({getSelectedDepartment()?.name})</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {getSelectedDepartment()?.members.map((member) => (
                <div
                  key={member.id}
                  onClick={() => handleMemberSelect(member)}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    selectedMember?.id === member.id
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold">
                      {member.avatar}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{member.name}</h4>
                      <p className="text-sm text-gray-600">{member.position}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 평가 시작 버튼 */}
        {selectedMember && (
          <div className="flex justify-center">
            <button
              onClick={handleStartEvaluation}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 flex items-center gap-2 text-lg font-medium"
            >
              <CheckSquare className="h-5 w-5" />
              {selectedMember.name} 역량 평가 시작
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

// 실제 평가 폼 컴포넌트
function CompetencyEvaluationForm({ member, onBack }: { member: Member, onBack: () => void }) {
  // 기존 평가 폼 코드를 여기로 이동
  const [selectedRatings, setSelectedRatings] = useState<{[key: string]: string}>({});
  const [comments, setComments] = useState<{[key: string]: string}>({});

  const evaluatee = {
    name: member.name,
    position: member.position,
    period: "2024년도 상반기 역량 진단"
  };

  // 역량 데이터 (기존과 동일)
  const competencyItems = [
    {
      id: "communication",
      category: "공통역량",
      name: "의사소통",
      description: "원활한 소통 능력",
      criteria: "고객 및 동료와의 효과적인 의사소통 능력을 평가합니다.",
      expectation: "명확하고 정확한 의사전달이 가능해야 합니다.",
      levels: [
        { level: "S", score: 5, description: "탁월함", color: "bg-purple-600" },
        { level: "A", score: 4, description: "우수함", color: "bg-blue-600" },
        { level: "B", score: 3, description: "보통", color: "bg-green-600" },
        { level: "C", score: 2, description: "미흡", color: "bg-yellow-600" },
        { level: "D", score: 1, description: "개선필요", color: "bg-red-600" }
      ]
    },
    {
      id: "problem_solving",
      category: "공통역량", 
      name: "문제해결",
      description: "창의적 해결 능력",
      criteria: "업무 중 발생하는 문제를 창의적이고 효과적으로 해결하는 능력을 평가합니다.",
      expectation: "다양한 관점에서 문제를 분석하고 해결책을 제시할 수 있어야 합니다.",
      levels: [
        { level: "S", score: 5, description: "탁월함", color: "bg-purple-600" },
        { level: "A", score: 4, description: "우수함", color: "bg-blue-600" },
        { level: "B", score: 3, description: "보통", color: "bg-green-600" },
        { level: "C", score: 2, description: "미흡", color: "bg-yellow-600" },
        { level: "D", score: 1, description: "개선필요", color: "bg-red-600" }
      ]
    },
    {
      id: "customer_service",
      category: "직무역량",
      name: "고객서비스",
      description: "고객 만족 서비스",
      criteria: "고객의 요구사항을 정확히 파악하고 만족스러운 서비스를 제공하는 능력을 평가합니다.",
      expectation: "고객 중심의 사고와 서비스 마인드를 가지고 있어야 합니다.",
      levels: [
        { level: "S", score: 5, description: "탁월함", color: "bg-purple-600" },
        { level: "A", score: 4, description: "우수함", color: "bg-blue-600" },
        { level: "B", score: 3, description: "보통", color: "bg-green-600" },
        { level: "C", score: 2, description: "미흡", color: "bg-yellow-600" },
        { level: "D", score: 1, description: "개선필요", color: "bg-red-600" }
      ]
    },
    {
      id: "technical_knowledge",
      category: "직무역량",
      name: "전문지식",
      description: "업무 전문성",
      criteria: "담당 업무 영역의 전문지식과 기술적 이해도를 평가합니다.",
      expectation: "업무에 필요한 전문지식을 충분히 보유하고 있어야 합니다.",
      levels: [
        { level: "S", score: 5, description: "탁월함", color: "bg-purple-600" },
        { level: "A", score: 4, description: "우수함", color: "bg-blue-600" },
        { level: "B", score: 3, description: "보통", color: "bg-green-600" },
        { level: "C", score: 2, description: "미흡", color: "bg-yellow-600" },
        { level: "D", score: 1, description: "개선필요", color: "bg-red-600" }
      ]
    }
  ];

  const handleRatingChange = (competencyId: string, level: string) => {
    setSelectedRatings(prev => ({
      ...prev,
      [competencyId]: level
    }));
  };

  const handleCommentChange = (competencyId: string, comment: string) => {
    setComments(prev => ({
      ...prev,
      [competencyId]: comment
    }));
  };

  const handleSubmit = () => {
    const evaluationData = {
      evaluatee: member,
      ratings: selectedRatings,
      comments: comments,
      timestamp: new Date().toISOString()
    };
    
    console.log("평가 결과:", evaluationData);
    alert(`${member.name}님의 역량 평가가 완료되었습니다!`);
    onBack();
  };

  const getSelectedScore = (competencyId: string) => {
    const rating = selectedRatings[competencyId];
    if (!rating) return 0;
    const competency = competencyItems.find(item => item.id === competencyId);
    const level = competency?.levels.find(l => l.level === rating);
    return level?.score || 0;
  };

  const progress = 75; // 임시 진행률

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* 헤더 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="text-gray-500 hover:text-gray-700">
              <ArrowLeft className="h-6 w-6" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold">
                {member.avatar}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{member.name} 역량 평가</h1>
                <p className="text-gray-600">{evaluatee.period}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">평가 진행률: {progress}%</span>
            <div className="w-32 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* 평가 대상자 정보 */}
        <div className="bg-purple-50 rounded-lg border border-purple-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-purple-600 text-white p-2 rounded-lg">
              <div className="w-6 h-6 flex items-center justify-center text-sm font-bold">F</div>
            </div>
            <h2 className="text-xl font-bold text-purple-800">Feple 대시보드</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-purple-600 font-medium">평가자 대시보드 (역량 평가 상세 화면)</p>
            </div>
            <div>
              <p className="text-sm text-purple-600 font-medium">평가 대상자</p>
              <p className="text-purple-800 font-bold">{evaluatee.name} {evaluatee.position}</p>
            </div>
            <div>
              <p className="text-sm text-purple-600 font-medium">평가 기간</p>
              <p className="text-purple-800">{evaluatee.period}</p>
            </div>
          </div>
        </div>

        {/* 공통역량 섹션 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="bg-blue-50 px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-blue-800">+ 공통역량</h3>
          </div>
          
          <div className="p-6">
            {competencyItems.filter(item => item.category === "공통역량").map((competency, index) => (
              <div key={competency.id} className="mb-8 last:mb-0">
                <div className="grid grid-cols-12 gap-4 items-start">
                  {/* 역량명 */}
                  <div className="col-span-2">
                    <div className="text-center">
                      <div className="font-medium text-gray-900 mb-1">{competency.name}</div>
                      <div className="text-sm text-gray-600">{competency.description}</div>
                    </div>
                  </div>

                  {/* 평가기준 */}
                  <div className="col-span-3">
                    <div className="text-sm">
                      <div className="font-medium text-gray-700 mb-1">평가기준:</div>
                      <div className="text-gray-600 mb-2">{competency.criteria}</div>
                      <div className="text-blue-600 text-xs">{competency.expectation}</div>
                    </div>
                  </div>

                  {/* 평가 점수 선택 */}
                  <div className="col-span-5">
                    <div className="grid grid-cols-5 gap-2">
                      {competency.levels.map((level) => (
                        <div key={level.level} className="text-center">
                          <button
                            onClick={() => handleRatingChange(competency.id, level.level)}
                            className={`w-full px-2 py-3 rounded-lg border-2 transition-all ${
                              selectedRatings[competency.id] === level.level
                                ? `${level.color} text-white border-gray-800`
                                : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                            }`}
                          >
                            <div className="font-bold text-lg">{level.score}</div>
                            <div className="text-xs">{level.level} : ({level.description})</div>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 점수 */}
                  <div className="col-span-2 text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {getSelectedScore(competency.id)}
                    </div>
                  </div>
                </div>

                {/* 코멘트 영역 */}
                <div className="mt-4">
                  <textarea
                    value={comments[competency.id] || ""}
                    onChange={(e) => handleCommentChange(competency.id, e.target.value)}
                    placeholder="추가 의견이나 피드백을 입력하세요..."
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>

                {index < competencyItems.filter(item => item.category === "공통역량").length - 1 && (
                  <hr className="mt-6 border-gray-200" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 직무역량 섹션 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="bg-green-50 px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-green-800">+ 직무역량</h3>
          </div>
          
          <div className="p-6">
            {competencyItems.filter(item => item.category === "직무역량").map((competency, index) => (
              <div key={competency.id} className="mb-8 last:mb-0">
                <div className="grid grid-cols-12 gap-4 items-start">
                  {/* 역량명 */}
                  <div className="col-span-2">
                    <div className="text-center">
                      <div className="font-medium text-gray-900 mb-1">{competency.name}</div>
                      <div className="text-sm text-gray-600">{competency.description}</div>
                    </div>
                  </div>

                  {/* 평가기준 */}
                  <div className="col-span-3">
                    <div className="text-sm">
                      <div className="font-medium text-gray-700 mb-1">평가기준/평가기준설명:</div>
                      <div className="text-gray-600 mb-2">{competency.criteria}</div>
                      <div className="text-green-600 text-xs">{competency.expectation}</div>
                    </div>
                  </div>

                  {/* 평가 점수 선택 */}
                  <div className="col-span-5">
                    <div className="grid grid-cols-5 gap-2">
                      {competency.levels.map((level) => (
                        <div key={level.level} className="text-center">
                          <button
                            onClick={() => handleRatingChange(competency.id, level.level)}
                            className={`w-full px-2 py-3 rounded-lg border-2 transition-all ${
                              selectedRatings[competency.id] === level.level
                                ? `${level.color} text-white border-gray-800`
                                : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                            }`}
                          >
                            <div className="font-bold text-lg">{level.score}</div>
                            <div className="text-xs">{level.level} : ({level.description})</div>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 점수 */}
                  <div className="col-span-2 text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {getSelectedScore(competency.id)}
                    </div>
                  </div>
                </div>

                {/* 코멘트 영역 */}
                <div className="mt-4">
                  <textarea
                    value={comments[competency.id] || ""}
                    onChange={(e) => handleCommentChange(competency.id, e.target.value)}
                    placeholder="추가 의견이나 피드백을 입력하세요..."
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                  />
                </div>

                {index < competencyItems.filter(item => item.category === "직무역량").length - 1 && (
                  <hr className="mt-6 border-gray-200" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 평가 완료 버튼 */}
        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 flex items-center gap-2 text-lg font-medium"
          >
            <CheckSquare className="h-5 w-5" />
            평가 완료
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
} 