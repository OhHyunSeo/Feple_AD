"use client";

import { useState } from "react";
import { useUser } from "@/context/UserContext";
import {
  Users,
  Shield,
  ArrowRight,
  Mail,
  LayoutDashboard,
  Loader2,
  User,
} from "lucide-react";

export default function LoginPage() {
  const { login, isLoading } = useUser();
  const [role, setRole] = useState<"consultant" | "qc" | null>(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!role) {
      setError("역할이 선택되지 않았습니다.");
      return;
    }
    if (!name.trim()) {
      setError("이름을 입력해주세요.");
      return;
    }
    if (!email.trim()) {
      setError("이메일을 입력해주세요.");
      return;
    }

    login(name.trim(), email.trim(), role);
  };

  const renderRoleSelection = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
          <LayoutDashboard className="h-7 w-7 text-white" />
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
            먼저, 귀하의 역할에 맞는 유형을 선택해주세요
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          className="bg-white rounded-xl p-5 shadow-lg border-2 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02] border-gray-200 hover:border-blue-300"
          onClick={() => setRole("consultant")}
        >
          <div className="text-center">
            <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 bg-blue-100">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">상담사</h3>
            <p className="text-gray-600 text-sm">
              개인 성과 대시보드에 접근합니다
            </p>
          </div>
        </div>
        <div
          className="bg-white rounded-xl p-5 shadow-lg border-2 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02] border-gray-200 hover:border-purple-300"
          onClick={() => setRole("qc")}
        >
          <div className="text-center">
            <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 bg-purple-100">
              <Shield className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              QC팀 (품질관리)
            </h3>
            <p className="text-gray-600 text-sm">
              전체 상담사 관리 대시보드에 접근합니다
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderLoginForm = () => (
    <div className="w-full max-w-md text-center">
      <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
        {role === "consultant" ? (
          <Users className="h-7 w-7 text-white" />
        ) : (
          <Shield className="h-7 w-7 text-white" />
        )}
      </div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        {role === "consultant" ? "상담사" : "QC팀"} 로그인
      </h1>
      <p className="text-base text-gray-600 mb-6">
        이름과 이메일 주소를 입력해주세요
      </p>

      <form
        onSubmit={handleLogin}
        className="bg-white rounded-lg p-6 shadow-md border border-gray-200 space-y-4"
      >
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="이름을 입력하세요"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition"
          />
        </div>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="email"
            placeholder="이메일 주소를 입력하세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-300 ${
            isLoading
              ? "bg-gray-300 text-white cursor-not-allowed"
              : "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 hover:scale-105 shadow-lg hover:shadow-xl"
          }`}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              <span>로그인 중...</span>
            </>
          ) : (
            <>
              <span className="text-white">대시보드 바로가기</span>
              <ArrowRight className="ml-2 h-4 w-4 text-white" />
            </>
          )}
        </button>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </form>
      <button
        onClick={() => {
          setRole(null);
          setError(null);
          setEmail("");
          setName("");
        }}
        className="mt-6 text-sm text-gray-600 hover:text-pink-600 transition"
      >
        &larr; 역할 다시 선택하기
      </button>
    </div>
  );

  return (
    <div className="bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 min-h-screen flex items-center justify-center p-4">
      {!role ? (
        <div className="container mx-auto px-4 py-6 max-w-4xl">
          {renderRoleSelection()}
        </div>
      ) : (
        <div className="w-full max-w-md">{renderLoginForm()}</div>
      )}
    </div>
  );
}
