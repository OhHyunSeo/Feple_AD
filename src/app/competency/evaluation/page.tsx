"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { ArrowLeft, User, Target, Save, Clock, CheckSquare } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// 역량 평가 항목
const competencyItems = [
  {
    id: "communication",
    category: "공통역량",
    name: "커뮤니케이션",
    description: "고객 안전에게 명확하고 친절하게 설명하며 어려운 용어는 쉽게 설명",
    criteria: "인사, 반말 금지, 어려운 용어의 쉬운 설명",
    expectation: "S : (Outstanding) 상기 3개 기준 만족",
    levels: [
      { level: "S", score: 90, description: "Outstanding", color: "bg-green-500" },
      { level: "A", score: 80, description: "Exceeds Expectations", color: "bg-blue-500" },
      { level: "B", score: 70, description: "Meets Expectations", color: "bg-yellow-500" },
      { level: "C", score: 60, description: "Below Expectations", color: "bg-orange-500" },
      { level: "D", score: 50, description: "Unsatisfactory", color: "bg-red-500" }
    ]
  },
  {
    id: "teamwork", 
    category: "공통역량",
    name: "공감능력",
    description: "고객의 감정을 이해하고 표현은 모두는 능력",
    criteria: "고객 불만, 감정 표현시 이해받다니 능력 사용",
    expectation: "눈의 접촉 후, 환인 될때 - 대를 받아 2시간 이상 세심",
    levels: [
      { level: "S", score: 100, description: "Outstanding", color: "bg-green-500" },
      { level: "A", score: 90, description: "Exceeds Expectations", color: "bg-blue-500" },
      { level: "B", score: 80, description: "Meets Expectations", color: "bg-yellow-500" },
      { level: "C", score: 70, description: "Below Expectations", color: "bg-orange-500" },
      { level: "D", score: 60, description: "Unsatisfactory", color: "bg-red-500" }
    ]
  },
  {
    id: "problemsolving",
    category: "직무역량", 
    name: "문제해결능력",
    description: "고객 문제를 정확히 파악하고 단계별로 해결하는 능력",
    criteria: "문제를 빨리 다양한 방법으로 해결하기 위해 노력한다",
    expectation: "1.문제인파 빠른 후 - 방고 단계다영 대한 모의인앤 해결해옴 수 있다.",
    levels: [
      { level: "S", score: 94, description: "Outstanding", color: "bg-green-500" },
      { level: "A", score: 84, description: "Exceeds Expectations", color: "bg-blue-500" },
      { level: "B", score: 80, description: "Meets Expectations", color: "bg-yellow-500" },
      { level: "C", score: 70, description: "Below Expectations", color: "bg-orange-500" },
      { level: "D", score: 60, description: "Unsatisfactory", color: "bg-red-500" }
    ]
  }
];

// 평가 대상자 정보
const evaluatee = {
  name: "최이하빙",
  position: "(직위:팀장/직급:상담팀)",
  period: "24년 / 4000byte"
};

export default function CompetencyEvaluationPage() {
  const [selectedRatings, setSelectedRatings] = useState<{[key: string]: string}>({});
  const [comments, setComments] = useState<{[key: string]: string}>({});

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
      evaluatee,
      ratings: selectedRatings,
      comments,
      submittedAt: new Date().toISOString()
    };
    
    console.log("평가 제출:", evaluationData);
    alert("역량 진단 평가가 제출되었습니다!");
  };

  const getSelectedScore = (competencyId: string) => {
    const rating = selectedRatings[competencyId];
    if (!rating) return 0;
    
    const competency = competencyItems.find(item => item.id === competencyId);
    const level = competency?.levels.find(l => l.level === rating);
    return level?.score || 0;
  };

  const getTotalScore = () => {
    return competencyItems.reduce((total, item) => {
      return total + getSelectedScore(item.id);
    }, 0);
  };

  const getAverageScore = () => {
    const total = getTotalScore();
    return competencyItems.length > 0 ? (total / competencyItems.length).toFixed(1) : "0";
  };

  return (
    <DashboardLayout title="역량 진단 평가">
      <div className="space-y-6">
        {/* 헤더 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/competency" className="text-gray-500 hover:text-gray-700">
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">역량 진단 평가</h1>
              <p className="text-gray-600 mt-1">상담사의 핵심 역량을 평가합니다</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-gray-600">평균 점수</p>
              <p className="text-2xl font-bold text-blue-600">{getAverageScore()}</p>
            </div>
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              저장
            </button>
          </div>
        </div>

        {/* 평가 대상자 정보 */}
        <div className="bg-purple-50 rounded-lg border border-purple-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-purple-600 text-white p-2 rounded-lg">
              <img src="/api/placeholder/40/40" alt="LGU+" className="w-6 h-6" />
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
              <p className="text-sm text-purple-600 font-medium">조이아빙 달림에 대한 평가의견</p>
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