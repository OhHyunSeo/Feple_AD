"use client";

import { useState, useMemo } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Users, Search, Filter, Star, TrendingUp, TrendingDown, Minus } from "lucide-react";

// 상담사 더미 데이터 (확장된 버전)
const consultants = [
  {
    id: 1,
    name: "김민수",
    department: "고객상담 1팀",
    position: "선임 상담사",
    email: "kim.minsu@company.com",
    phone: "010-1234-5678",
    rating: 4.8,
    evaluationCount: 156,
    completionRate: 98,
    trend: "up",
    joinDate: "2020-03-15",
    lastEvaluation: "2024-12-20",
    status: "active",
    avatar: "김",
  },
  {
    id: 2,
    name: "이영희",
    department: "고객상담 2팀",
    position: "상담사",
    email: "lee.younghee@company.com",
    phone: "010-2345-6789",
    rating: 4.5,
    evaluationCount: 142,
    completionRate: 95,
    trend: "up",
    joinDate: "2021-06-10",
    lastEvaluation: "2024-12-18",
    status: "active",
    avatar: "이",
  },
  {
    id: 3,
    name: "박철수",
    department: "기술지원팀",
    position: "책임 상담사",
    email: "park.chulsoo@company.com",
    phone: "010-3456-7890",
    rating: 4.9,
    evaluationCount: 203,
    completionRate: 99,
    trend: "stable",
    joinDate: "2019-01-20",
    lastEvaluation: "2024-12-22",
    status: "active",
    avatar: "박",
  },
  {
    id: 4,
    name: "정수진",
    department: "고객상담 1팀",
    position: "상담사",
    email: "jung.sujin@company.com",
    phone: "010-4567-8901",
    rating: 4.3,
    evaluationCount: 98,
    completionRate: 92,
    trend: "down",
    joinDate: "2022-09-05",
    lastEvaluation: "2024-12-15",
    status: "active",
    avatar: "정",
  },
  {
    id: 5,
    name: "최동욱",
    department: "VIP상담팀",
    position: "수석 상담사",
    email: "choi.dongwook@company.com",
    phone: "010-5678-9012",
    rating: 4.95,
    evaluationCount: 312,
    completionRate: 100,
    trend: "up",
    joinDate: "2018-11-12",
    lastEvaluation: "2024-12-23",
    status: "active",
    avatar: "최",
  },
];

export default function ConsultantsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [trendFilter, setTrendFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // 검색 및 필터링된 상담사 목록
  const filteredConsultants = useMemo(() => {
    return consultants.filter(consultant => {
      const matchesSearch = searchTerm === "" || 
        consultant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        consultant.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        consultant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        consultant.position.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDepartment = departmentFilter === "" || consultant.department === departmentFilter;
      const matchesTrend = trendFilter === "" || consultant.trend === trendFilter;

      return matchesSearch && matchesDepartment && matchesTrend;
    });
  }, [searchTerm, departmentFilter, trendFilter]);

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

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <Minus className="h-4 w-4 text-gray-400" />;
    }
  };

  // 고유 부서 목록
  const departments = Array.from(new Set(consultants.map(c => c.department)));

  return (
    <DashboardLayout>
      <div className="space-y-6 text-gray-900">
        {/* 페이지 헤더 */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">상담사 관리</h1>
          <p className="text-gray-600 mt-1">상담사 정보 및 평가 현황을 관리합니다</p>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">전체 상담사</p>
                <p className="text-2xl font-bold text-gray-900">{filteredConsultants.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <Star className="h-8 w-8 text-yellow-500" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">평균 평점</p>
                <p className="text-2xl font-bold text-gray-900">
                  {filteredConsultants.length > 0 ? 
                    (filteredConsultants.reduce((sum, c) => sum + c.rating, 0) / filteredConsultants.length).toFixed(1) : 
                    "0.0"
                  }
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">활성 상담사</p>
                <p className="text-2xl font-bold text-gray-900">{filteredConsultants.filter(c => c.status === 'active').length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">신규 상담사</p>
                <p className="text-2xl font-bold text-gray-900">2</p>
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
                placeholder="상담사 이름, 부서, 이메일로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">부서</label>
                  <select
                    value={departmentFilter}
                    onChange={(e) => setDepartmentFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">모든 부서</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">성과 추세</label>
                  <select
                    value={trendFilter}
                    onChange={(e) => setTrendFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">모든 추세</option>
                    <option value="up">상승</option>
                    <option value="stable">안정</option>
                    <option value="down">하락</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setDepartmentFilter("");
                      setTrendFilter("");
                    }}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    초기화
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 상담사 목록 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">
              상담사 목록 ({filteredConsultants.length}명)
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    상담사
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    부서/직급
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    연락처
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    평균 평점
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    평가 횟수
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    완료율
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    추세
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
                {filteredConsultants.map((consultant) => (
                  <tr key={consultant.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                          {consultant.avatar}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {highlightText(consultant.name, searchTerm)}
                          </div>
                          <div className="text-sm text-gray-500">입사일: {consultant.joinDate}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {highlightText(consultant.department, searchTerm)}
                      </div>
                      <div className="text-sm text-gray-500">
                        {highlightText(consultant.position, searchTerm)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {highlightText(consultant.email, searchTerm)}
                      </div>
                      <div className="text-sm text-gray-500">{consultant.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium text-gray-900">{consultant.rating}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className="text-sm text-gray-900">{consultant.evaluationCount}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {consultant.completionRate}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {getTrendIcon(consultant.trend)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        활성
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <button className="text-blue-600 hover:text-blue-900 text-sm font-medium">
                        상세보기
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* 검색 결과가 없을 때 */}
          {filteredConsultants.length === 0 && (
            <div className="px-6 py-8 text-center">
              <p className="text-gray-500">검색 조건에 맞는 상담사가 없습니다.</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
} 