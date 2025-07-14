"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Card } from "@/components/ui";
import { monthlyEvaluationData, evaluationTypeDistribution } from "@/data/mockData";

interface EvaluationChartProps {
  type?: "bar" | "pie";
  title?: string;
  className?: string;
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

export default function EvaluationChart({ 
  type = "bar", 
  title,
  className 
}: EvaluationChartProps) {
  if (type === "pie") {
    return (
      <Card title={title} className={className}>
        <div className="p-6">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={evaluationTypeDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                className="korean-text"
              >
                {evaluationTypeDistribution.map((entry: { color: string }, index: number) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>
    );
  }

  return (
    <Card title={title} className={className}>
      <div className="p-6">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyEvaluationData}>
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
    </Card>
  );
} 