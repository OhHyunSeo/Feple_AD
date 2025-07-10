"use client";

import DashboardLayout from "@/components/DashboardLayout";
import StatCard from "@/components/StatCard";
import EvaluationChart from "@/components/EvaluationChart";
import ConsultantTable from "@/components/ConsultantTable";
import { Users, FileText, Target, TrendingUp, Calendar, Award } from "lucide-react";

export default function DashboardPage() {
  return (
    <DashboardLayout title="대시보드">
      <div className="space-y-6">
        {/* 환영 메시지 */}
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-6 text-white shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold korean-heading mb-2">안녕하세요, 관리자님! 👋</h2>
              <p className="text-pink-100 korean-text">오늘도 효율적인 인사 관리를 위해 함께하겠습니다.</p>
            </div>
            <div className="hidden md:block">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                <Award className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* 통계 카드 섹션 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="전체 상담사"
            value={156}
            change={5}
            icon={Users}
            iconColor="text-pink-500"
            description="활동중인 상담사"
            href="/consultants"
          />
          <StatCard
            title="진행중 평가"
            value={42}
            change={-12}
            icon={FileText}
            iconColor="text-purple-500"
            description="이번 달 평가"
            href="/evaluations"
          />
          <StatCard
            title="평균 역량 점수"
            value="4.6"
            change={3}
            icon={Target}
            iconColor="text-pink-600"
            description="5점 만점"
            href="/competency"
          />
          <StatCard
            title="목표 달성률"
            value="87%"
            change={8}
            icon={TrendingUp}
            iconColor="text-purple-600"
            description="분기 목표 대비"
            href="/performance"
          />
        </div>

        {/* 빠른 액션 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="card-theme p-4 text-center hover:scale-105 transition-transform cursor-pointer">
            <Calendar className="w-8 h-8 text-pink-500 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-900 korean-text">평가 일정</h3>
            <p className="text-sm text-gray-600 korean-text">오늘 3건의 평가가 예정되어 있습니다</p>
          </div>
          <div className="card-theme p-4 text-center hover:scale-105 transition-transform cursor-pointer">
            <Users className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-900 korean-text">새 상담사</h3>
            <p className="text-sm text-gray-600 korean-text">이번 주 신규 등록 5명</p>
          </div>
          <div className="card-theme p-4 text-center hover:scale-105 transition-transform cursor-pointer">
            <Target className="w-8 h-8 text-pink-600 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-900 korean-text">역량 진단</h3>
            <p className="text-sm text-gray-600 korean-text">대기중인 진단 12건</p>
          </div>
        </div>

        {/* 차트 섹션 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card-theme overflow-hidden">
            <div className="p-6 border-b border-pink-100">
              <h3 className="text-lg font-semibold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent korean-heading">
                월별 평가 진행 현황
              </h3>
            </div>
            <div className="p-0">
              <EvaluationChart type="bar" />
            </div>
          </div>
          <div className="card-theme overflow-hidden">
            <div className="p-6 border-b border-pink-100">
              <h3 className="text-lg font-semibold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent korean-heading">
                평가 유형별 분포
              </h3>
            </div>
            <div className="p-0">
              <EvaluationChart type="pie" />
            </div>
          </div>
        </div>

        {/* 상담사 테이블 섹션 */}
        <div className="card-theme overflow-hidden">
          <div className="p-6 border-b border-pink-100">
            <h3 className="text-lg font-semibold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent korean-heading">
              상담사 현황
            </h3>
          </div>
          <ConsultantTable />
        </div>
      </div>
    </DashboardLayout>
  );
}
