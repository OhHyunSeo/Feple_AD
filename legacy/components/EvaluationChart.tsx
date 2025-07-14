"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

// 월별 평가 완료 데이터
const monthlyData = [
  { month: "1월", completed: 65, inProgress: 20, notStarted: 15 },
  { month: "2월", completed: 78, inProgress: 15, notStarted: 7 },
  { month: "3월", completed: 82, inProgress: 12, notStarted: 6 },
  { month: "4월", completed: 71, inProgress: 18, notStarted: 11 },
  { month: "5월", completed: 89, inProgress: 8, notStarted: 3 },
  { month: "6월", completed: 85, inProgress: 10, notStarted: 5 },
];

// 평가 유형별 분포
const evaluationTypes = [
  { name: "정기평가", value: 45, color: "#EC4899" },
  { name: "수시평가", value: 30, color: "#8B5CF6" },
  { name: "역량진단", value: 15, color: "#F59E0B" },
  { name: "자기평가", value: 10, color: "#EF4444" },
];

interface EvaluationChartProps {
  type?: "bar" | "pie";
}

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-pink-200 rounded-lg shadow-lg korean-text">
        <p className="font-semibold text-gray-900">{label}</p>
        {payload.map((entry, index: number) => (
          <p key={index} style={{ color: entry.color }} className="text-sm">
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function EvaluationChart({ type = "bar" }: EvaluationChartProps) {
  if (type === "pie") {
    return (
      <div className="p-6">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={evaluationTypes}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ${value}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              className="korean-text"
            >
              {evaluationTypes.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return (
    <div className="p-6">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={monthlyData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F3E8FF" />
          <XAxis 
            dataKey="month" 
            tick={{ fontSize: 12, fill: '#6B7280' }}
            className="korean-text"
          />
          <YAxis 
            tick={{ fontSize: 12, fill: '#6B7280' }}
            className="korean-text"
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="completed" stackId="a" fill="#EC4899" name="완료" radius={[0, 0, 0, 0]} />
          <Bar dataKey="inProgress" stackId="a" fill="#8B5CF6" name="진행중" radius={[0, 0, 0, 0]} />
          <Bar dataKey="notStarted" stackId="a" fill="#F59E0B" name="미시작" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
} 