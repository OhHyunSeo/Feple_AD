"use client";

import React from "react";
import {
  Radar,
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import { cn } from "@/lib/utils";

interface RadarChartProps {
  data: {
    subject: string;
    A: number; // 본인 점수
    B?: number; // 동료 평균 점수 (선택적)
    fullMark?: number;
  }[];
  className?: string;
  showComparison?: boolean; // 동료 평균 표시 여부
}

export function RadarChart({
  data,
  className,
  showComparison = false,
}: RadarChartProps) {
  return (
    <div className={cn("w-full h-full", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsRadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#E5E7EB" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{
              fill: "#4B5563",
              fontSize: 12,
              fontWeight: 500,
            }}
          />
          <PolarRadiusAxis angle={30} domain={[0, 100]} />

          {/* 동료 평균 (회색 배경) */}
          {showComparison && (
            <Radar
              name="동료 평균"
              dataKey="B"
              stroke="#9CA3AF"
              fill="#9CA3AF"
              fillOpacity={0.15}
              strokeWidth={1.5}
              strokeDasharray="3 3"
              dot={{
                fill: "#9CA3AF",
                r: 3,
                strokeWidth: 1,
                stroke: "#fff",
              }}
            />
          )}

          {/* 본인 점수 (보라색) */}
          <Radar
            name="내 점수"
            dataKey="A"
            stroke="#8B5CF6"
            fill="#8B5CF6"
            fillOpacity={0.3}
            strokeWidth={2}
            dot={{
              fill: "#8B5CF6",
              r: 4,
              strokeWidth: 2,
              stroke: "#fff",
            }}
          />
        </RechartsRadarChart>
      </ResponsiveContainer>
    </div>
  );
}
