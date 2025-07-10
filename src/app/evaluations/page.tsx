"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { FileText, Search, Filter, Plus, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

// 평가 더미 데이터
const evaluations = [
  {
    id: 1,
    title: "2024년 4분기 정기평가",
    type: "정기평가",
    consultant: "김민수",
    department: "고객상담 1팀",
    evaluator: "이팀장",
    progress: 100,
    score: 4.8,
    dueDate: "2024-12-31",
    completedDate: "2024-12-28",
    status: "completed",
  },
  {
    id: 2,
    title: "신입사원 역량진단",
    type: "역량진단",
    consultant: "이영희",
    department: "고객상담 2팀",
    evaluator: "박부장",
    progress: 75,
    score: null,
    dueDate: "2025-01-15",
    completedDate: null,
    status: "in_progress",
  },
  {
    id: 3,
    title: "VIP 고객 응대 수시평가",
    type: "수시평가",
    consultant: "박철수",
    department: "기술지원팀",
    evaluator: "최수석",
    progress: 0,
    score: null,
    dueDate: "2025-01-10",
    completedDate: null,
    status: "pending",
  },
  {
    id: 4,
    title: "고객만족도 개선 평가",
    type: "수시평가",
    consultant: "정수진",
    department: "고객상담 1팀",
    evaluator: "이팀장",
    progress: 50,
    score: null,
    dueDate: "2024-12-20",
    completedDate: null,
    status: "overdue",
  },
  {
    id: 5,
    title: "연말 종합평가",
    type: "정기평가",
    consultant: "최동욱",
    department: "VIP상담팀",
    evaluator: "김이사",
    progress: 100,
    score: 4.95,
    dueDate: "2024-12-30",
    completedDate: "2024-12-29",
    status: "completed",
  },
];

export default function EvaluationsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // 검색 및 필터링된 평가 목록
  const filteredEvaluations = useMemo(() => {
    return evaluations.filter(evaluation => {
      const matchesSearch = searchTerm === "" || 
        evaluation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        evaluation.consultant.toLowerCase().includes(searchTerm.toLowerCase()) ||
        evaluation.evaluator.toLowerCase().includes(searchTerm.toLowerCase()) ||
        evaluation.department.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === "" || evaluation.status === statusFilter;
      const matchesType = typeFilter === "" || evaluation.type === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [searchTerm, statusFilter, typeFilter]);

  // 검색어 하이라이트 함수
  const highlightText = (text: string, search: string) => {
    if (!search || search.length === 0) return text;
    
    const parts = text.split(search);
    if (parts.length === 1) return text;
    
    return (
      <>
        {parts.map((part, index) => 
          index === parts.length - 1 ? (
            part
          ) : (
            <span key={index}>
              {part}
              <span className="search-highlight">{search}</span>
            </span>
          )
        )}
      </>
    );
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            완료
          </span>
        );
      case "in_progress":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <Clock className="w-3 h-3 mr-1" />
            진행중
          </span>
        );
      case "pending":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <AlertCircle className="w-3 h-3 mr-1" />
            대기
          </span>
        );
      case "overdue":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircle className="w-3 h-3 mr-1" />
            지연
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            알 수 없음
          </span>
        );
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "정기평가":
        return "bg-blue-100 text-blue-800";
      case "수시평가":
        return "bg-green-100 text-green-800";
      case "역량진단":
        return "bg-purple-100 text-purple-800";
      case "자기평가":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const completedCount = filteredEvaluations.filter(e => e.status === "completed").length;
  const inProgressCount = filteredEvaluations.filter(e => e.status === "in_progress").length;
  const overdueCount = filteredEvaluations.filter(e => e.status === "overdue").length;

  // 고유 평가 유형 목록
  const evaluationTypes = Array.from(new Set(evaluations.map(e => e.type)));

  return (
    <DashboardLayout>
      <div className="space-y-6 text-gray-900">
        {/* 페이지 헤더 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">평가 관리</h1>
            <p className="text-gray-600 mt-1">상담사 평가 생성, 진행, 완료 상황을 관리합니다</p>
          </div>
          <Link href="/evaluations/create" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
            <Plus className="h-4 w-4" />
            평가 생성
          </Link>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">전체 평가</p>
                <p className="text-2xl font-bold text-gray-900">{filteredEvaluations.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">완료된 평가</p>
                <p className="text-2xl font-bold text-gray-900">{completedCount}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">진행중 평가</p>
                <p className="text-2xl font-bold text-gray-900">{inProgressCount}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <XCircle className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">지연된 평가</p>
                <p className="text-2xl font-bold text-gray-900">{overdueCount}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 검색 및 필터 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="평가명, 상담사, 평가자로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">모든 상태</option>
              <option value="completed">완료</option>
              <option value="in_progress">진행중</option>
              <option value="pending">대기</option>
              <option value="overdue">지연</option>
            </select>
            <select 
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">모든 유형</option>
              {evaluationTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="filter-button flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <Filter className="h-4 w-4" />
              필터
            </button>
          </div>

          {/* 확장 필터 */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setStatusFilter("");
                    setTypeFilter("");
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  모든 필터 초기화
                </button>
                <div className="text-sm text-gray-500">
                  총 {filteredEvaluations.length}개의 평가가 검색되었습니다.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 평가 목록 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">
              평가 목록 ({filteredEvaluations.length}개)
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    평가명
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    유형
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    상담사
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    평가자
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    진행률
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    점수
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    마감일
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    상태
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    액션
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredEvaluations.map((evaluation) => (
                  <tr key={evaluation.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <Link href={`/evaluations/${evaluation.id}`} className="text-sm font-medium text-blue-600 hover:text-blue-900 cursor-pointer">
                        {highlightText(evaluation.title, searchTerm)}
                      </Link>
                      <div className="text-sm text-gray-500">ID: {evaluation.id}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(evaluation.type)}`}>
                        {evaluation.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Link href={`/evaluations/${evaluation.id}`} className="text-sm text-blue-600 hover:text-blue-900 cursor-pointer">
                        {highlightText(evaluation.consultant, searchTerm)}
                      </Link>
                      <div className="text-sm text-gray-500">
                        {highlightText(evaluation.department, searchTerm)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {highlightText(evaluation.evaluator, searchTerm)}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center">
                        <div className="w-16">
                          <div className="bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${evaluation.progress}%` }}
                            ></div>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">{evaluation.progress}%</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {evaluation.score ? (
                        <span className="text-sm font-medium text-gray-900">{evaluation.score}</span>
                      ) : (
                        <span className="text-sm text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="text-sm text-gray-900">{evaluation.dueDate}</div>
                      {evaluation.completedDate && (
                        <div className="text-xs text-gray-500">완료: {evaluation.completedDate}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {getStatusBadge(evaluation.status)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center gap-2">
                        <Link href={`/evaluations/${evaluation.id}`} className="text-blue-600 hover:text-blue-900 text-sm font-medium">
                          상세보기
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* 검색 결과가 없을 때 */}
          {filteredEvaluations.length === 0 && (
            <div className="px-6 py-8 text-center">
              <p className="text-gray-500">검색 조건에 맞는 평가가 없습니다.</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
} 