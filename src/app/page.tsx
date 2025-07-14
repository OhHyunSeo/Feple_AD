"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Users, Shield, ArrowRight, UserCheck, Settings } from "lucide-react";

export default function RoleSelectionPage() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const router = useRouter();

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
  };

  const handleContinue = () => {
    if (selectedRole === "consultant") {
      router.push("/consultant");
    } else if (selectedRole === "qc") {
      router.push("/qc");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Settings className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              Feple Dashboard
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              상담사 평가 및 QC 관리 시스템에 오신 것을 환영합니다
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 max-w-md mx-auto">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              사용자 유형 선택
            </h2>
            <p className="text-gray-600 mb-6">
              귀하의 역할에 맞는 대시보드로 연결해드립니다
            </p>
          </div>
        </div>

        {/* 역할 선택 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* 상담사 카드 */}
          <div 
            className={`bg-white rounded-2xl p-8 shadow-lg border-2 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 ${
              selectedRole === "consultant" 
                ? "border-blue-500 bg-blue-50 shadow-blue-200" 
                : "border-gray-200 hover:border-blue-300"
            }`}
            onClick={() => handleRoleSelect("consultant")}
          >
            <div className="text-center">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 ${
                selectedRole === "consultant" ? "bg-blue-500" : "bg-blue-100"
              }`}>
                <Users className={`h-8 w-8 ${
                  selectedRole === "consultant" ? "text-white" : "text-blue-600"
                }`} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                상담사
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                개인 성과 조회, 피드백 확인, 
                <br />교육 자료 및 일정 관리
              </p>
              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex items-center justify-center">
                  <UserCheck className="h-4 w-4 mr-2" />
                  <span>개인 대시보드</span>
                </div>
                <div className="flex items-center justify-center">
                  <UserCheck className="h-4 w-4 mr-2" />
                  <span>성과 분석</span>
                </div>
                <div className="flex items-center justify-center">
                  <UserCheck className="h-4 w-4 mr-2" />
                  <span>교육 자료</span>
                </div>
              </div>
              {selectedRole === "consultant" && (
                <div className="mt-6 p-3 bg-blue-100 rounded-lg">
                  <p className="text-blue-800 font-medium text-sm">
                    선택됨 ✓
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* QC팀 카드 */}
          <div 
            className={`bg-white rounded-2xl p-8 shadow-lg border-2 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 ${
              selectedRole === "qc" 
                ? "border-purple-500 bg-purple-50 shadow-purple-200" 
                : "border-gray-200 hover:border-purple-300"
            }`}
            onClick={() => handleRoleSelect("qc")}
          >
            <div className="text-center">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 ${
                selectedRole === "qc" ? "bg-purple-500" : "bg-purple-100"
              }`}>
                <Shield className={`h-8 w-8 ${
                  selectedRole === "qc" ? "text-white" : "text-purple-600"
                }`} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                QC팀 (품질관리)
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                상담사 모니터링, 평가 관리,
                <br />팀 성과 분석 및 위험 알림
              </p>
              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex items-center justify-center">
                  <UserCheck className="h-4 w-4 mr-2" />
                  <span>전체 대시보드</span>
                </div>
                <div className="flex items-center justify-center">
                  <UserCheck className="h-4 w-4 mr-2" />
                  <span>평가 관리</span>
                </div>
                <div className="flex items-center justify-center">
                  <UserCheck className="h-4 w-4 mr-2" />
                  <span>위험 모니터링</span>
                </div>
              </div>
              {selectedRole === "qc" && (
                <div className="mt-6 p-3 bg-purple-100 rounded-lg">
                  <p className="text-purple-800 font-medium text-sm">
                    선택됨 ✓
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 계속하기 버튼 */}
        <div className="text-center">
          <button
            onClick={handleContinue}
            disabled={!selectedRole}
            className={`inline-flex items-center px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 ${
              selectedRole
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 hover:scale-105 shadow-lg hover:shadow-xl"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {selectedRole ? (
              <>
                <span>
                  {selectedRole === "consultant" ? "상담사 대시보드로" : "QC 대시보드로"}
                </span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            ) : (
              <span>먼저 역할을 선택해주세요</span>
            )}
          </button>
        </div>

        {/* 안내 메시지 */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 max-w-2xl mx-auto">
            <p className="text-gray-600 text-sm leading-relaxed">
              <strong>안내:</strong> 역할에 따라 다른 기능과 정보에 접근할 수 있습니다. 
              상담사는 개인 성과와 피드백을, QC팀은 전체 모니터링과 관리 기능을 이용하실 수 있습니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
