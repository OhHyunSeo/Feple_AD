'use client';

import React from 'react';
import {
  Radar,
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';
import { cn } from '@/lib/utils';

interface RadarChartProps {
  data: {
    subject: string;
    A: number;
    fullMark?: number;
  }[];
  className?: string;
}

export function RadarChart({ data, className }: RadarChartProps) {
  return (
    <div className={cn("w-full h-full", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsRadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#E5E7EB" />
          <PolarAngleAxis 
            dataKey="subject"
            tick={{
              fill: '#4B5563',
              fontSize: 12,
              fontWeight: 500,
            }}
          />
          <PolarRadiusAxis angle={30} domain={[0, 5]} />
          <Radar
            name="역할 분석"
            dataKey="A"
            stroke="#8B5CF6"
            fill="#8B5CF6"
            fillOpacity={0.3}
            strokeWidth={2}
            dot={{
              fill: '#8B5CF6',
              r: 4,
              strokeWidth: 2,
              stroke: '#fff',
            }}
          />
        </RechartsRadarChart>
      </ResponsiveContainer>
    </div>
  );
}
