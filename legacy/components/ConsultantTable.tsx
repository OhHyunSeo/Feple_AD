'use client'

import { Star, TrendingUp, TrendingDown, Minus } from 'lucide-react'

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
]

export default function ConsultantTable() {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-500" />
      default:
        return <Minus className="h-4 w-4 text-gray-400" />
    }
  }

  const getRatingColor = (rating: number) => {
    if (rating >= 4.8) return "text-pink-600"
    if (rating >= 4.5) return "text-purple-600"
    if (rating >= 4.0) return "text-blue-600"
    return "text-gray-600"
  }

  const getCompletionRateStyle = (rate: number) => {
    if (rate >= 98) return "bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700"
    if (rate >= 95) return "bg-green-100 text-green-700"
    if (rate >= 90) return "bg-yellow-100 text-yellow-700"
    return "bg-red-100 text-red-700"
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full table-theme">
        <thead>
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold text-white korean-text">
              상담사
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-white korean-text">
              부서/직급
            </th>
            <th className="px-6 py-4 text-center text-sm font-semibold text-white korean-text">
              평균 평점
            </th>
            <th className="px-6 py-4 text-center text-sm font-semibold text-white korean-text">
              평가 횟수
            </th>
            <th className="px-6 py-4 text-center text-sm font-semibold text-white korean-text">
              완료율
            </th>
            <th className="px-6 py-4 text-center text-sm font-semibold text-white korean-text">
              추세
            </th>
            <th className="px-6 py-4 text-center text-sm font-semibold text-white korean-text">
              최근 평가일
            </th>
          </tr>
        </thead>
        <tbody>
          {consultants.map((consultant, index) => (
            <tr 
              key={consultant.id} 
              className={`transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-pink-25'}`}
            >
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm korean-text">
                      {consultant.name.charAt(0)}
                    </span>
                  </div>
                  <div className="text-sm font-semibold text-gray-900 korean-text">
                    {consultant.name}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-900 font-medium korean-text">{consultant.department}</div>
                <div className="text-xs text-pink-600 korean-text">{consultant.position}</div>
              </td>
              <td className="px-6 py-4 text-center">
                <div className="flex items-center justify-center gap-2">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className={`text-sm font-bold korean-text ${getRatingColor(consultant.rating)}`}>
                    {consultant.rating}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 text-center">
                <span className="text-sm font-semibold text-gray-900 korean-text">
                  {consultant.evaluationCount}
                </span>
              </td>
              <td className="px-6 py-4 text-center">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold korean-text ${getCompletionRateStyle(consultant.completionRate)}`}>
                  {consultant.completionRate}%
                </span>
              </td>
              <td className="px-6 py-4 text-center">
                <div className="flex justify-center">
                  {getTrendIcon(consultant.trend)}
                </div>
              </td>
              <td className="px-6 py-4 text-center">
                <span className="text-sm text-gray-600 korean-text">{consultant.lastEvaluation}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
} 