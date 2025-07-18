"use client";

import { BarChart3 } from "lucide-react";
import ScoreBar from "./ScoreBar";
import { useEffect, useState } from "react";
import { getMockEvaluationsByConsultant } from "../../../data/qcMockData";

interface ScoreData {
  min: number;
  avg: number;
  max: number;
}

interface ScoreChartProps {
  myScores?: ScoreData; // Optional로 변경 (동적 계산을 위해)
  teamScores?: ScoreData;
  startDate: string;
  endDate: string;
  consultantId?: string; // 동적 계산을 위한 상담사 ID
  useMockData?: boolean; // Mock 데이터 사용 여부
}

export default function ScoreChart({
  myScores,
  teamScores,
  startDate,
  endDate,
  consultantId,
  useMockData = false,
}: ScoreChartProps) {
  const [calculatedScores, setCalculatedScores] = useState<ScoreData>({ min: 0, avg: 0, max: 0 });

  // 기간별 점수 계산
  useEffect(() => {
    if (useMockData && consultantId && startDate && endDate) {
      console.log(`📊 점수 계산 시작: 상담사 ${consultantId}, 기간 ${startDate} ~ ${endDate}`);
      
      try {
        // Mock 데이터 조회
        const allData = getMockEvaluationsByConsultant(consultantId);
        
        // 기간 필터링
        const startDateTime = new Date(startDate);
        const endDateTime = new Date(endDate);
        endDateTime.setHours(23, 59, 59, 999);
        
        const filteredData = allData.filter(item => {
          const itemDate = new Date(item.datetime);
          return itemDate >= startDateTime && itemDate <= endDateTime;
        });
        
        console.log(`📅 기간 내 데이터: ${filteredData.length}개`);
        
        if (filteredData.length > 0) {
          const scores = filteredData.map(item => item.finalScore);
          const min = Math.min(...scores);
          const max = Math.max(...scores);
          const avg = Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length);
          
          const newScores = { min, avg, max };
          console.log(`📊 계산된 점수:`, newScores);
          setCalculatedScores(newScores);
        } else {
          console.log('📊 해당 기간에 데이터가 없어 기본값 사용');
          setCalculatedScores({ min: 0, avg: 0, max: 0 });
        }
      } catch (error) {
        console.error('📊 점수 계산 오류:', error);
        setCalculatedScores({ min: 0, avg: 0, max: 0 });
      }
    }
  }, [consultantId, startDate, endDate, useMockData]);

  // 표시할 점수 결정 (props로 받은 것 우선, 없으면 계산된 값)
  const displayScores = myScores || calculatedScores;
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
            myScore={displayScores.min}
            teamScore={teamScores?.min}
            color="bg-red-400"
          />
          <ScoreBar
            label="평균"
            myScore={displayScores.avg}
            teamScore={teamScores?.avg}
            color="bg-blue-400"
          />
          <ScoreBar
            label="최고"
            myScore={displayScores.max}
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
