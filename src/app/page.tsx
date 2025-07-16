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
    <div className="bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="space-y-6">
          {/* 헤더 */}
          <div className="text-center">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <Settings className="h-7 w-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Feple Dashboard
            </h1>
            <p className="text-base text-gray-600 mb-4">
              상담사 평가 및 QC 관리 시스템
            </p>
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 max-w-md mx-auto">
              <h2 className="text-lg font-semibold text-gray-900 mb-1">
                사용자 유형 선택
              </h2>
              <p className="text-sm text-gray-600">
                귀하의 역할에 맞는 대시보드로 연결해드립니다
              </p>
            </div>
          </div>

          {/* 역할 선택 카드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 상담사 카드 */}
            <div
              className={`bg-white rounded-xl p-5 shadow-lg border-2 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02] ${
                selectedRole === "consultant"
                  ? "border-blue-500 bg-blue-50 shadow-blue-200"
                  : "border-gray-200 hover:border-blue-300"
              }`}
              onClick={() => handleRoleSelect("consultant")}
            >
              <div className="text-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${
                    selectedRole === "consultant"
                      ? "bg-blue-500"
                      : "bg-blue-100"
                  }`}
                >
                  <Users
                    className={`h-6 w-6 ${
                      selectedRole === "consultant"
                        ? "text-white"
                        : "text-blue-600"
                    }`}
                  />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">상담사</h3>
                <p className="text-gray-600 mb-3 text-sm leading-relaxed">
                  개인 성과 조회, 피드백 확인,
                  <br />
                  교육 자료 및 일정 관리
                </p>
                <div className="space-y-1 text-xs text-gray-500">
                  <div className="flex items-center justify-center">
                    <UserCheck className="h-3 w-3 mr-1" />
                    <span>개인 대시보드</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <UserCheck className="h-3 w-3 mr-1" />
                    <span>성과 분석</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <UserCheck className="h-3 w-3 mr-1" />
                    <span>상담 파일 업로드</span>
                  </div>
                </div>
                {selectedRole === "consultant" && (
                  <div className="mt-3 p-2 bg-blue-100 rounded-lg">
                    <p className="text-blue-800 font-medium text-xs">
                      선택됨 ✓
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* QC팀 카드 */}
            <div
              className={`bg-white rounded-xl p-5 shadow-lg border-2 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02] ${
                selectedRole === "qc"
                  ? "border-purple-500 bg-purple-50 shadow-purple-200"
                  : "border-gray-200 hover:border-purple-300"
              }`}
              onClick={() => handleRoleSelect("qc")}
            >
              <div className="text-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${
                    selectedRole === "qc" ? "bg-purple-500" : "bg-purple-100"
                  }`}
                >
                  <Shield
                    className={`h-6 w-6 ${
                      selectedRole === "qc" ? "text-white" : "text-purple-600"
                    }`}
                  />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  QC팀 (품질관리)
                </h3>
                <p className="text-gray-600 mb-3 text-sm leading-relaxed">
                  상담사 모니터링, 평가 관리,
                  <br />팀 성과 분석 및 위험 알림
                </p>
                <div className="space-y-1 text-xs text-gray-500">
                  <div className="flex items-center justify-center">
                    <UserCheck className="h-3 w-3 mr-1" />
                    <span>전체 대시보드</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <UserCheck className="h-3 w-3 mr-1" />
                    <span>평가 관리</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <UserCheck className="h-3 w-3 mr-1" />
                    <span>위험 모니터링</span>
                  </div>
                </div>
                {selectedRole === "qc" && (
                  <div className="mt-3 p-2 bg-purple-100 rounded-lg">
                    <p className="text-purple-800 font-medium text-xs">
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
              className={`inline-flex items-center px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-300 ${
                selectedRole
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 hover:scale-105 shadow-lg hover:shadow-xl"
                  : "bg-gray-300 text-white cursor-not-allowed"
              }`}
            >
              {selectedRole ? (
                <>
                  <span className="!text-white">
                    {selectedRole === "consultant"
                      ? "상담사 대시보드로"
                      : "QC 대시보드로"}
                  </span>
                  <ArrowRight className="ml-2 h-4 w-4 !text-white" />
                </>
              ) : (
                <span>먼저 역할을 선택해주세요</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
