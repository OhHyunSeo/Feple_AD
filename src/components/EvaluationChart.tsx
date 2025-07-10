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
  { name: "정기평가", value: 45, color: "#3B82F6" },
  { name: "수시평가", value: 30, color: "#10B981" },
  { name: "역량진단", value: 15, color: "#F59E0B" },
  { name: "자기평가", value: 10, color: "#EF4444" },
];

interface EvaluationChartProps {
  type?: "bar" | "pie";
}

export default function EvaluationChart({ type = "bar" }: EvaluationChartProps) {
  if (type === "pie") {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">평가 유형별 분포</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={evaluationTypes}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ${value}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {evaluationTypes.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">월별 평가 진행 현황</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={monthlyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="completed" stackId="a" fill="#10B981" name="완료" />
          <Bar dataKey="inProgress" stackId="a" fill="#F59E0B" name="진행중" />
          <Bar dataKey="notStarted" stackId="a" fill="#EF4444" name="미시작" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
} 