"use client";

import { Star, TrendingUp, TrendingDown, Minus } from "lucide-react";

// 상담사 더미 데이터
const consultants = [
  {
    id: 1,
    name: "김민수",
    department: "고객상담 1팀",
    position: "선임 상담사",
    rating: 4.8,
    evaluationCount: 156,
    completionRate: 98,
    trend: "up",
    lastEvaluation: "2024-12-20",
  },
  {
    id: 2,
    name: "이영희",
    department: "고객상담 2팀",
    position: "상담사",
    rating: 4.5,
    evaluationCount: 142,
    completionRate: 95,
    trend: "up",
    lastEvaluation: "2024-12-18",
  },
  {
    id: 3,
    name: "박철수",
    department: "기술지원팀",
    position: "책임 상담사",
    rating: 4.9,
    evaluationCount: 203,
    completionRate: 99,
    trend: "stable",
    lastEvaluation: "2024-12-22",
  },
  {
    id: 4,
    name: "정수진",
    department: "고객상담 1팀",
    position: "상담사",
    rating: 4.3,
    evaluationCount: 98,
    completionRate: 92,
    trend: "down",
    lastEvaluation: "2024-12-15",
  },
  {
    id: 5,
    name: "최동욱",
    department: "VIP상담팀",
    position: "수석 상담사",
    rating: 4.95,
    evaluationCount: 312,
    completionRate: 100,
    trend: "up",
    lastEvaluation: "2024-12-23",
  },
];

export default function ConsultantTable() {
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

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">상담사 평가 현황</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                상담사
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                부서/직급
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
                최근 평가일
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {consultants.map((consultant) => (
              <tr key={consultant.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{consultant.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{consultant.department}</div>
                  <div className="text-xs text-gray-500">{consultant.position}</div>
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
                  <span className="text-sm text-gray-500">{consultant.lastEvaluation}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 