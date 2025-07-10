"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { ArrowLeft, Save, Users, FileText, Target } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// 상담사 목록 (실제로는 API에서 가져와야 함)
const consultants = [
  { id: 1, name: "김민수", department: "고객상담 1팀", position: "선임 상담사" },
  { id: 2, name: "이영희", department: "고객상담 2팀", position: "상담사" },
  { id: 3, name: "박철수", department: "기술지원팀", position: "책임 상담사" },
  { id: 4, name: "정수진", department: "고객상담 1팀", position: "상담사" },
  { id: 5, name: "최동욱", department: "VIP상담팀", position: "수석 상담사" },
];

// 평가 유형
const evaluationTypes = [
  { id: "regular", name: "정기평가", description: "분기별 정기 인사평가" },
  { id: "irregular", name: "수시평가", description: "특별한 상황에 따른 평가" },
  { id: "competency", name: "역량진단", description: "핵심 역량 평가 및 진단" },
  { id: "self", name: "자기평가", description: "본인이 직접 작성하는 평가" },
];

export default function CreateEvaluationPage() {
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    consultant: "",
    evaluator: "",
    dueDate: "",
    description: "",
    criteria: [
      { name: "의사소통 능력", weight: 20, description: "" },
      { name: "업무 수행 능력", weight: 25, description: "" },
      { name: "고객 서비스", weight: 25, description: "" },
      { name: "팀워크", weight: 15, description: "" },
      { name: "문제 해결 능력", weight: 15, description: "" },
    ]
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCriteriaChange = (index: number, field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      criteria: prev.criteria.map((criterion, i) => 
        i === index ? { ...criterion, [field]: value } : criterion
      )
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 여기서 평가 생성 API 호출
    console.log("평가 생성:", formData);
    alert("평가가 생성되었습니다!");
  };

  const selectedConsultant = consultants.find(c => c.id === parseInt(formData.consultant));

  return (
    <DashboardLayout title="평가 생성">
      <div className="space-y-6">
        {/* 헤더 */}
        <div className="flex items-center gap-4">
          <Link href="/evaluations" className="text-gray-500 hover:text-gray-700">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">새 평가 생성</h1>
            <p className="text-gray-600 mt-1">상담사별 맞춤형 평가를 생성합니다</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 기본 정보 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="h-5 w-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-800">기본 정보</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  평가명 *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="예: 2024년 4분기 정기평가"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  평가 유형 *
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => handleInputChange("type", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">평가 유형을 선택하세요</option>
                  {evaluationTypes.map(type => (
                    <option key={type.id} value={type.id}>{type.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  평가 대상자 *
                </label>
                <select
                  value={formData.consultant}
                  onChange={(e) => handleInputChange("consultant", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">상담사를 선택하세요</option>
                  {consultants.map(consultant => (
                    <option key={consultant.id} value={consultant.id}>
                      {consultant.name} ({consultant.department})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  평가자 *
                </label>
                <input
                  type="text"
                  value={formData.evaluator}
                  onChange={(e) => handleInputChange("evaluator", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="예: 박부장"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  마감일 *
                </label>
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => handleInputChange("dueDate", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                평가 설명
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="평가의 목적과 주요 내용을 설명해주세요"
              />
            </div>
          </div>

          {/* 선택된 상담사 정보 */}
          {selectedConsultant && (
            <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
              <div className="flex items-center gap-2 mb-3">
                <Users className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-blue-800">평가 대상자 정보</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-blue-600 font-medium">이름</p>
                  <p className="text-blue-800">{selectedConsultant.name}</p>
                </div>
                <div>
                  <p className="text-sm text-blue-600 font-medium">부서</p>
                  <p className="text-blue-800">{selectedConsultant.department}</p>
                </div>
                <div>
                  <p className="text-sm text-blue-600 font-medium">직급</p>
                  <p className="text-blue-800">{selectedConsultant.position}</p>
                </div>
              </div>
            </div>
          )}

          {/* 평가 기준 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Target className="h-5 w-5 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-800">평가 기준</h3>
            </div>
            
            <div className="space-y-4">
              {formData.criteria.map((criterion, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        평가 항목
                      </label>
                      <input
                        type="text"
                        value={criterion.name}
                        onChange={(e) => handleCriteriaChange(index, "name", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        가중치 (%)
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={criterion.weight}
                        onChange={(e) => handleCriteriaChange(index, "weight", parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        설명
                      </label>
                      <input
                        type="text"
                        value={criterion.description}
                        onChange={(e) => handleCriteriaChange(index, "description", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="평가 기준 설명"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                전체 가중치 합계: <span className="font-medium">{formData.criteria.reduce((sum, c) => sum + c.weight, 0)}%</span>
                {formData.criteria.reduce((sum, c) => sum + c.weight, 0) !== 100 && (
                  <span className="text-red-600 ml-2">(100%가 되도록 조정해주세요)</span>
                )}
              </p>
            </div>
          </div>

          {/* 저장 버튼 */}
          <div className="flex justify-end gap-4">
            <Link
              href="/evaluations"
              className="px-6 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              취소
            </Link>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              평가 생성
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
} 