"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { Calendar, Clock, Users, Plus, ChevronLeft, ChevronRight, ExternalLink, Play } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

// 일정 데이터 타입 정의
interface ScheduleData {
  id: number;
  title: string;
  type: string;
  date: string;
  time: string;
  consultants: string[];
  evaluator: string;
  status: 'scheduled' | 'pending' | 'completed';
  description: string;
  evaluationId: string;
  isActiveToday: boolean;
}

// 일정 더미 데이터
const scheduleData: ScheduleData[] = [
  {
    id: 1,
    title: "2024년 4분기 정기평가",
    type: "정기평가",
    date: "2024-12-25",
    time: "09:00-17:00",
    consultants: ["김민수", "이영희", "박철수"],
    evaluator: "박부장",
    status: "scheduled",
    description: "4분기 정기 인사평가",
    evaluationId: "1", // 평가 관리의 상세 페이지와 연결
    isActiveToday: false // 현재 진행 가능한 평가인지 여부
  },
  {
    id: 2,
    title: "고객서비스 역량 진단",
    type: "역량진단",
    date: "2024-12-28",
    time: "14:00-16:00",
    consultants: ["정수진", "최동욱"],
    evaluator: "김팀장",
    status: "scheduled",
    description: "고객서비스 핵심 역량 평가",
    evaluationId: "2",
    isActiveToday: true // 현재 진행 가능한 평가
  },
  {
    id: 3,
    title: "신입사원 온보딩 평가",
    type: "수시평가",
    date: "2024-12-30",
    time: "10:00-12:00",
    consultants: ["신입A", "신입B"],
    evaluator: "이부장",
    status: "pending",
    description: "신입사원 적응도 및 기본 역량 평가",
    evaluationId: "3",
    isActiveToday: false
  },
];

export default function SchedulePage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [, setSelectedDate] = useState(new Date());

  // 평가 링크 생성 함수
  const getEvaluationLink = (schedule: ScheduleData) => {
    if (schedule.type === "역량진단") {
      return "/competency/evaluation";
    } else if (schedule.isActiveToday && schedule.status === "scheduled") {
      // 현재 진행 가능한 평가라면 평가 진행 페이지로
      return `/evaluations/${schedule.evaluationId}`;
    } else {
      // 그 외에는 상세보기 페이지로
      return `/evaluations/${schedule.evaluationId}`;
    }
  };

  // 평가 상태에 따른 액션 버튼 렌더링
  const renderActionButton = (schedule: ScheduleData) => {
    if (schedule.type === "역량진단") {
      return (
        <Link 
          href="/competency/evaluation"
          className="text-purple-600 hover:text-purple-900 text-sm font-medium flex items-center gap-1"
        >
          <Play className="h-3 w-3" />
          역량평가
        </Link>
      );
    } else if (schedule.isActiveToday && schedule.status === "scheduled") {
      return (
        <Link 
          href={`/evaluations/${schedule.evaluationId}`}
          className="text-green-600 hover:text-green-900 text-sm font-medium flex items-center gap-1"
        >
          <Play className="h-3 w-3" />
          평가진행
        </Link>
      );
    } else {
      return (
        <Link 
          href={`/evaluations/${schedule.evaluationId}`}
          className="text-blue-600 hover:text-blue-900 text-sm font-medium flex items-center gap-1"
        >
          <ExternalLink className="h-3 w-3" />
          상세보기
        </Link>
      );
    }
  };

  // 달력 관련 함수들
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ko-KR', { 
      year: 'numeric', 
      month: 'long' 
    });
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const getSchedulesForDate = (date: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
    return scheduleData.filter(schedule => schedule.date === dateStr);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDay }, (_, i) => i);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* 페이지 헤더 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">평가 일정</h1>
            <p className="text-gray-600 mt-1">평가 일정을 확인하고 관리합니다</p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
            <Plus className="h-4 w-4" />
            일정 추가
          </button>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">이번 달 평가</p>
                <p className="text-2xl font-bold text-gray-900">{scheduleData.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">예정된 평가</p>
                <p className="text-2xl font-bold text-gray-900">{scheduleData.filter(s => s.status === 'scheduled').length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">평가 대상자</p>
                <p className="text-2xl font-bold text-gray-900">
                  {scheduleData.reduce((acc, curr) => acc + curr.consultants.length, 0)}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">대기 중</p>
                <p className="text-2xl font-bold text-gray-900">{scheduleData.filter(s => s.status === 'pending').length}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 달력 */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">{formatDate(currentDate)}</h3>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => navigateMonth('prev')}
                    className="p-2 hover:bg-gray-100 rounded"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => navigateMonth('next')}
                    className="p-2 hover:bg-gray-100 rounded"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-7 gap-1 mb-4">
                {['일', '월', '화', '수', '목', '금', '토'].map(day => (
                  <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {emptyDays.map(day => (
                  <div key={`empty-${day}`} className="h-20"></div>
                ))}
                {days.map(day => {
                  const daySchedules = getSchedulesForDate(day);
                  return (
                    <div 
                      key={day} 
                      className="h-20 border border-gray-100 p-1 cursor-pointer hover:bg-gray-50"
                      onClick={() => setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
                    >
                      <div className="text-sm font-medium text-gray-900 mb-1">{day}</div>
                      {daySchedules.slice(0, 2).map(schedule => (
                        <Link 
                          key={schedule.id}
                          href={getEvaluationLink(schedule)}
                          className="block text-xs bg-blue-100 text-blue-800 px-1 py-0.5 rounded mb-0.5 truncate hover:bg-blue-200 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {schedule.title}
                        </Link>
                      ))}
                      {daySchedules.length > 2 && (
                        <div className="text-xs text-gray-500">+{daySchedules.length - 2} 더보기</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 일정 목록 */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">다가오는 일정</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {scheduleData.map(schedule => (
                  <div key={schedule.id} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <Link 
                        href={getEvaluationLink(schedule)}
                        className="font-medium text-gray-900 hover:text-blue-600 transition-colors cursor-pointer"
                      >
                        {schedule.title}
                        {schedule.isActiveToday && (
                          <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            진행가능
                          </span>
                        )}
                      </Link>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(schedule.status)}`}>
                        {schedule.status === 'scheduled' ? '예정' : schedule.status === 'pending' ? '대기' : '완료'}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {schedule.date} {schedule.time}
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        {schedule.consultants.join(', ')}
                      </div>
                      <div>평가자: {schedule.evaluator}</div>
                      <div className="text-xs text-gray-500 mt-2">{schedule.description}</div>
                    </div>
                    <div className="mt-3 flex justify-end">
                      {renderActionButton(schedule)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 평가 일정 테이블 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">전체 평가 일정</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    평가명
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    유형
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    일시
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    대상자
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    평가자
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    상태
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    액션
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {scheduleData.map(schedule => (
                  <tr key={schedule.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <Link 
                        href={getEvaluationLink(schedule)}
                        className="block"
                      >
                        <div className="text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors cursor-pointer">
                          {schedule.title}
                          {schedule.isActiveToday && (
                            <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              진행가능
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-500">{schedule.description}</div>
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {schedule.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{schedule.date}</div>
                      <div className="text-sm text-gray-500">{schedule.time}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {schedule.consultants.slice(0, 2).join(', ')}
                        {schedule.consultants.length > 2 && ` 외 ${schedule.consultants.length - 2}명`}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{schedule.evaluator}</div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(schedule.status)}`}>
                        {schedule.status === 'scheduled' ? '예정' : schedule.status === 'pending' ? '대기' : '완료'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center gap-2">
                        {renderActionButton(schedule)}
                        <button className="text-gray-400 hover:text-gray-600 text-sm font-medium">
                          수정
                        </button>
                        <button className="text-red-600 hover:text-red-900 text-sm font-medium">
                          삭제
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 