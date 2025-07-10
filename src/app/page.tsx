"use client";

import DashboardLayout from "@/components/DashboardLayout";
import StatCard from "@/components/StatCard";
import EvaluationChart from "@/components/EvaluationChart";
import ConsultantTable from "@/components/ConsultantTable";
import { Users, FileText, Target, TrendingUp } from "lucide-react";

export default function DashboardPage() {
  return (
    <DashboardLayout title="대시보드">
      {/* 통계 카드 섹션 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="전체 상담사"
          value={156}
          change={5}
          icon={Users}
          iconColor="text-blue-600"
          description="활동중인 상담사"
          href="/consultants"
        />
        <StatCard
          title="진행중 평가"
          value={42}
          change={-12}
          icon={FileText}
          iconColor="text-green-600"
          description="이번 달 평가"
          href="/evaluations"
        />
        <StatCard
          title="평균 역량 점수"
          value="4.6"
          change={3}
          icon={Target}
          iconColor="text-purple-600"
          description="5점 만점"
          href="/competency"
        />
        <StatCard
          title="목표 달성률"
          value="87%"
          change={8}
          icon={TrendingUp}
          iconColor="text-orange-600"
          description="분기 목표 대비"
          href="/performance"
        />
      </div>

      {/* 차트 섹션 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <EvaluationChart type="bar" />
        <EvaluationChart type="pie" />
      </div>

      {/* 상담사 테이블 섹션 */}
      <ConsultantTable />
    </DashboardLayout>
  );
}
