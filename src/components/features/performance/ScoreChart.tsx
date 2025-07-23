"use client";

import { BarChart3 } from "lucide-react";
import ScoreBar from "./ScoreBar";
import { useEffect, useState } from "react";
import { getFixedEvaluationsByConsultant } from "../../../data/fixedQcMockData";
import type { ConsultationData } from "../../../data/consultationData";
import { calculateConsultantTeamScores } from "../../../data/fixedQcMockData";

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
  const [calculatedScores, setCalculatedScores] = useState<ScoreData>({
    min: 0,
    avg: 0,
    max: 0,
  });
  const [calculatedTeamScores, setCalculatedTeamScores] = useState<ScoreData>({
    min: 0,
    avg: 0,
    max: 0,
  });

  // 기간별 점수 계산 (개별 상담사 + 팀)
  useEffect(() => {
    if (useMockData && consultantId && startDate && endDate) {
      console.log(
        `📊 점수 계산 시작: 상담사 ${consultantId}, 기간 ${startDate} ~ ${endDate}`
      );

      try {
        // Mock 데이터 조회
        const allData: ConsultationData[] =
          getFixedEvaluationsByConsultant(consultantId);

        // 기간 필터링
        const startDateTime = new Date(startDate);
        const endDateTime = new Date(endDate);
        endDateTime.setHours(23, 59, 59, 999);

        const filteredData = allData.filter((item: ConsultationData) => {
          const itemDate = new Date(item.datetime);
          return itemDate >= startDateTime && itemDate <= endDateTime;
        });

        console.log(`📅 기간 내 데이터: ${filteredData.length}개`);

        if (filteredData.length > 0) {
          const scores = filteredData.map(
            (item: ConsultationData) => item.finalScore
          );
          const min = Math.min(...scores);
          const max = Math.max(...scores);
          const avg = Math.round(
            scores.reduce((sum: number, score: number) => sum + score, 0) /
              scores.length
          );

          const newScores = { min, avg, max };
          console.log(`📊 계산된 개별 점수:`, newScores);
          setCalculatedScores(newScores);
        } else {
          console.log("📊 해당 기간에 개별 데이터가 없어 기본값 사용");
          setCalculatedScores({ min: 0, avg: 0, max: 0 });
        }

        // 팀 점수 동적 계산 (teamScores prop이 없을 때만)
        if (!teamScores) {
          console.log(`🏢 팀 점수 동적 계산 시작: 상담사 ${consultantId}`);
          try {
            const dynamicTeamScores = calculateConsultantTeamScores(
              consultantId,
              startDate,
              endDate
            );

            if (dynamicTeamScores) {
              console.log(`📊 계산된 팀 점수:`, dynamicTeamScores);
              setCalculatedTeamScores(dynamicTeamScores);
            } else {
              console.log("📊 팀을 찾을 수 없어 기본값 사용");
              setCalculatedTeamScores({ min: 0, avg: 0, max: 0 });
            }
          } catch (error) {
            console.error("📊 팀 점수 계산 오류:", error);
            setCalculatedTeamScores({ min: 0, avg: 0, max: 0 });
          }
        }
      } catch (error) {
        console.error("📊 점수 계산 오류:", error);
        setCalculatedScores({ min: 0, avg: 0, max: 0 });
      }
    }
  }, [consultantId, startDate, endDate, useMockData, teamScores]);

  // 표시할 점수 결정 (props로 받은 것 우선, 없으면 계산된 값)
  const displayScores = myScores || calculatedScores;
  const displayTeamScores = teamScores || calculatedTeamScores;
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
            teamScore={displayTeamScores?.min}
            color="bg-red-400"
          />
          <ScoreBar
            label="평균"
            myScore={displayScores.avg}
            teamScore={displayTeamScores?.avg}
            color="bg-blue-400"
          />
          <ScoreBar
            label="최고"
            myScore={displayScores.max}
            teamScore={displayTeamScores?.max}
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
            {displayTeamScores &&
              (displayTeamScores.min > 0 ||
                displayTeamScores.avg > 0 ||
                displayTeamScores.max > 0) && (
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
