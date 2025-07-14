'use client'

import { Star, TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { Badge } from '@/components/ui';
import { Consultant } from '@/types';
import { mockConsultants } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface ConsultantTableProps {
  consultants?: Consultant[];
  className?: string;
}

export default function ConsultantTable({ 
  consultants = mockConsultants, 
  className 
}: ConsultantTableProps) {
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

  const getCompletionRateBadgeVariant = (rate: number) => {
    if (rate >= 98) return "success"
    if (rate >= 95) return "warning"
    return "danger"
  }

  return (
    <div className={cn("overflow-x-auto", className)}>
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
              className={cn(
                "transition-colors hover:bg-pink-50",
                index % 2 === 0 ? 'bg-white' : 'bg-pink-25'
              )}
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
                <div className="text-sm text-gray-900 font-medium korean-text">{consultant.team}</div>
                <div className="text-xs text-pink-600 korean-text">{consultant.position}</div>
              </td>
              <td className="px-6 py-4 text-center">
                <div className="flex items-center justify-center gap-2">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className={cn(
                    "text-sm font-bold korean-text",
                    getRatingColor(consultant.rating || 0)
                  )}>
                    {consultant.rating?.toFixed(1) || 'N/A'}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 text-center">
                <span className="text-sm font-semibold text-gray-900 korean-text">
                  {consultant.evaluationCount || 0}
                </span>
              </td>
              <td className="px-6 py-4 text-center">
                <Badge 
                  variant={getCompletionRateBadgeVariant(consultant.completionRate || 0)}
                  className="korean-text"
                >
                  {consultant.completionRate || 0}%
                </Badge>
              </td>
              <td className="px-6 py-4 text-center">
                <div className="flex justify-center">
                  {getTrendIcon(consultant.trend || 'stable')}
                </div>
              </td>
              <td className="px-6 py-4 text-center">
                <span className="text-sm text-gray-600 korean-text">
                  {consultant.lastEvaluation || 'N/A'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
} 