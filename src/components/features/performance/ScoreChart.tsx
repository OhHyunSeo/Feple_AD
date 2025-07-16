"use client";

import { BarChart3 } from "lucide-react";
import ScoreBar from "./ScoreBar";

interface ScoreData {
  min: number;
  avg: number;
  max: number;
}

interface ScoreChartProps {
  myScores: ScoreData;
  teamScores?: ScoreData;
  startDate: string;
  endDate: string;
}

export default function ScoreChart({
  myScores,
  teamScores,
  startDate,
  endDate,
}: ScoreChartProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold performance-header flex items-center gap-1">
          <BarChart3 className="h-3 w-3 text-blue-500" />
          상담 점수
        </h3>
      </div>

      <div className="space-y-2">
        {/* 막대 그래프 */}
        <div className="flex justify-center gap-3">
          <ScoreBar
            label="최저"
            myScore={myScores.min}
            teamScore={teamScores?.min}
            color="bg-red-400"
          />
          <ScoreBar
            label="평균"
            myScore={myScores.avg}
            teamScore={teamScores?.avg}
            color="bg-blue-400"
          />
          <ScoreBar
            label="최고"
            myScore={myScores.max}
            teamScore={teamScores?.max}
            color="bg-green-400"
          />
        </div>

        {/* 범례 */}
        <div className="pt-2 border-t border-gray-100">
          <div className="flex items-center gap-3 text-xs justify-center">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-blue-400 rounded"></div>
              <span className="performance-text-blue">내 점수</span>
            </div>
            {teamScores && (
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded"></div>
                <span className="performance-team-text">팀 평균</span>
              </div>
            )}
          </div>
        </div>

        {/* 기간 표시 */}
        <div className="text-xs performance-text-gray-light text-center pt-1">
          {startDate} ~ {endDate}
        </div>
      </div>
    </div>
  );
}
