"use client";

import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Calendar, ArrowLeft, ChevronDown, MessageCircle, BarChart3, Play, Pause, Clock, PhoneCall, Award } from "lucide-react";

// Session 타입 정의
interface SessionData {
  id: number;
  datetime: string;
  finalScore: number;
  politeness: string;
  empathy: string;
  problemSolving: string;
  emotionalStability: string;
  conversationFlow: string;
  result: string;
  feedback: {
    strengths: string[];
    improvements: string[];
    coaching: string[];
  };
}

export default function MonitoringPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("1"); // 디폴트 1일
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all");
  const [selectedConsultant, setSelectedConsultant] = useState<string>("all");
  const [selectedSession, setSelectedSession] = useState<SessionData | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalTime] = useState(64); // 1:04



  // 부서 데이터
  const departments = [
    { id: "all", name: "전체 부서" },
    { id: "team1", name: "고객상담 1팀" },
    { id: "team2", name: "고객상담 2팀" },
    { id: "team3", name: "고객상담 3팀" },
    { id: "team4", name: "기술지원팀" },
  ];

  // 부서별 상담원 데이터
  const consultantsByDepartment = {
    all: [
      { id: "all", name: "전체 상담원" },
      { id: "c1", name: "김민수" },
      { id: "c2", name: "박성호" },
      { id: "c3", name: "임지원" },
      { id: "c4", name: "이영희" },
      { id: "c5", name: "정다은" },
      { id: "c6", name: "강현준" },
      { id: "c7", name: "최미연" },
      { id: "c8", name: "한상욱" },
      { id: "c9", name: "송예진" },
      { id: "c10", name: "윤진호" },
      { id: "c11", name: "조은실" },
    ],
    team1: [
      { id: "all", name: "전체 상담원" },
      { id: "c1", name: "김민수" },
      { id: "c2", name: "박성호" },
      { id: "c3", name: "임지원" },
    ],
    team2: [
      { id: "all", name: "전체 상담원" },
      { id: "c4", name: "이영희" },
      { id: "c5", name: "정다은" },
      { id: "c6", name: "강현준" },
    ],
    team3: [
      { id: "all", name: "전체 상담원" },
      { id: "c7", name: "최미연" },
      { id: "c8", name: "한상욱" },
      { id: "c9", name: "송예진" },
    ],
    team4: [
      { id: "all", name: "전체 상담원" },
      { id: "c10", name: "윤진호" },
      { id: "c11", name: "조은실" },
    ],
  };

  // 상담 품질 요약 데이터
  const qualitySummary = {
    average: 75,
    highest: 100,
    lowest: 50,
  };

  // 업무 통계 데이터 (월화수목금 상담 시간)
  const workStats = {
    data: [
      { day: "월", time: 450, deadline: 480 }, // 7.5시간, 데드라인 8시간
      { day: "화", time: 420, deadline: 480 },
      { day: "수", time: 510, deadline: 480 }, // 데드라인 초과
      { day: "목", time: 390, deadline: 480 },
      { day: "금", time: 460, deadline: 480 },
    ]
  };

  // 우수 상담사 데이터
  const topConsultants = [
    { rank: 1, name: "구북동오이메", score: 84 },
    { rank: 2, name: "오탁한세용", score: 79 },
    { rank: 3, name: "현미현식", score: 70 },
    { rank: 4, name: "마교준식", score: 43 }
  ];

  // 상담 세션 데이터
  const sessionData: SessionData[] = [
    { 
      id: 20, 
      datetime: "2025-07-07 13:30:46", 
      finalScore: 70, 
      politeness: "F", 
      empathy: "G", 
      problemSolving: "C", 
      emotionalStability: "G", 
      conversationFlow: "A", 
      result: "미흡",
      feedback: {
        strengths: [
          "대화흐름(A): 원활한 대화 진행 능력이 뛰어남",
          "구체적인 사례를 통한 설명으로 상황설명 효과적"
        ],
        improvements: [
          "정중함(F): 대화에서 예의나 존중을 표현하는 대 부족함이 있음",
          "톤톤, 자동응답 능력이 위험 대상 사람하는 언어나 태도를 주의하시길 바랍니다."
        ],
        coaching: [
          "대화 시작부터 정중한 인사와 친근한 톤을 사용해보세요",
          "고객의 입장에서 생각하는 공감 표현을 늘려보시기 바랍니다"
        ]
      }
    },
    { 
      id: 19, 
      datetime: "2025-07-07 13:11:05", 
      finalScore: 70, 
      politeness: "F", 
      empathy: "G", 
      problemSolving: "C", 
      emotionalStability: "G", 
      conversationFlow: "A", 
      result: "미흡",
      feedback: {
        strengths: ["대화 흐름 관리 능력", "안정적인 감정 조절"],
        improvements: ["언어 예의 개선", "공감 표현 증대"],
        coaching: ["고객 중심 사고로 접근하세요"]
      }
    },
    { 
      id: 18, 
      datetime: "2025-07-07 13:08:09", 
      finalScore: 70, 
      politeness: "F", 
      empathy: "G", 
      problemSolving: "C", 
      emotionalStability: "G", 
      conversationFlow: "A", 
      result: "미흡",
      feedback: {
        strengths: ["일관된 응대 태도", "문제 상황 파악"],
        improvements: ["정중한 언어 사용", "해결 방안 다양화"],
        coaching: ["더 많은 해결 옵션을 제시해보세요"]
      }
    },
    { 
      id: 17, 
      datetime: "2025-07-07 12:56:36", 
      finalScore: 70, 
      politeness: "F", 
      empathy: "G", 
      problemSolving: "C", 
      emotionalStability: "G", 
      conversationFlow: "A", 
      result: "미흡",
      feedback: {
        strengths: ["체계적인 상담 진행", "감정 안정성"],
        improvements: ["언어 품질 향상", "고객 공감도"],
        coaching: ["고객의 감정을 먼저 인정해주세요"]
      }
    },
    { 
      id: 16, 
      datetime: "2025-07-07 12:52:18", 
      finalScore: 70, 
      politeness: "F", 
      empathy: "G", 
      problemSolving: "C", 
      emotionalStability: "G", 
      conversationFlow: "A", 
      result: "미흡",
      feedback: {
        strengths: ["논리적 설명", "차분한 응대"],
        improvements: ["친근감 표현", "적극적 해결책"],
        coaching: ["더 따뜻한 어조로 대화해보세요"]
      }
    },
    { 
      id: 15, 
      datetime: "2025-07-07 12:51:19", 
      finalScore: 70, 
      politeness: "F", 
      empathy: "G", 
      problemSolving: "C", 
      emotionalStability: "G", 
      conversationFlow: "A", 
      result: "미흡",
      feedback: {
        strengths: ["일관된 서비스", "안정적 진행"],
        improvements: ["예의 표현", "감정적 교감"],
        coaching: ["고객의 니즈를 더 깊이 파악해보세요"]
      }
    },
    { 
      id: 14, 
      datetime: "2025-07-07 12:48:01", 
      finalScore: 70, 
      politeness: "F", 
      empathy: "G", 
      problemSolving: "C", 
      emotionalStability: "G", 
      conversationFlow: "A", 
      result: "미흡",
      feedback: {
        strengths: ["체계적 접근", "침착한 대응"],
        improvements: ["정중함 개선", "공감 능력"],
        coaching: ["고객의 상황을 더 이해하려 노력하세요"]
      }
    },
    { 
      id: 13, 
      datetime: "2025-07-07 12:58:04", 
      finalScore: 70, 
      politeness: "F", 
      empathy: "G", 
      problemSolving: "C", 
      emotionalStability: "G", 
      conversationFlow: "A", 
      result: "미흡",
      feedback: {
        strengths: ["대화 주도권", "상황 판단"],
        improvements: ["언어 매너", "고객 배려"],
        coaching: ["더 세심한 배려를 보여주세요"]
      }
    },
    { 
      id: 12, 
      datetime: "2025-07-07 10:54:55", 
      finalScore: 70, 
      politeness: "F", 
      empathy: "G", 
      problemSolving: "C", 
      emotionalStability: "G", 
      conversationFlow: "A", 
      result: "미흡",
      feedback: {
        strengths: ["명확한 전달", "안정감"],
        improvements: ["친절함", "해결 의지"],
        coaching: ["고객이 만족할 수 있는 해결책을 찾아보세요"]
      }
    },
    { 
      id: 11, 
      datetime: "2025-07-07 10:06:29", 
      finalScore: 70, 
      politeness: "F", 
      empathy: "G", 
      problemSolving: "C", 
      emotionalStability: "G", 
      conversationFlow: "A", 
      result: "미흡",
      feedback: {
        strengths: ["차근차근 설명", "차분함"],
        improvements: ["정중한 태도", "적극성"],
        coaching: ["고객의 입장에서 먼저 생각해보세요"]
      }
    }
  ];

  // 채팅 대화 데이터
  const chatConversation = [
    { time: "0분 01초", timestamp: 1, speaker: "고객", message: "안녕하세요" },
    { time: "0분 05초", timestamp: 5, speaker: "상담사", message: "네 안녕하십니다. 상담사입니다." },
    { time: "0분 10초", timestamp: 10, speaker: "고객", message: "네 안녕하세요" },
    { time: "0분 27초", timestamp: 27, speaker: "상담사", message: "아, 그 문 안녕하십니다." },
    { time: "0분 40초", timestamp: 40, speaker: "고객", message: "안녕하세요. 고객입니다." },
    { time: "1분 04초", timestamp: 64, speaker: "상담사", message: "안녕하세요. 무엇을 도와드릴까요?" }
  ];



  const getCurrentConsultants = () => {
    return consultantsByDepartment[selectedDepartment as keyof typeof consultantsByDepartment] || consultantsByDepartment.all;
  };

  const getGradeColor = (grade: string) => {
    switch(grade) {
      case 'A': return 'bg-green-100 text-green-800';
      case 'B': return 'bg-blue-100 text-blue-800';
      case 'C': return 'bg-yellow-100 text-yellow-800';
      case 'D': return 'bg-orange-100 text-orange-800';
      case 'F': return 'bg-red-100 text-red-800';
      case 'G': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getResultColor = (result: string) => {
    switch(result) {
      case '우수': return 'bg-green-100 text-green-800';
      case '보통': return 'bg-yellow-100 text-yellow-800';
      case '미흡': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleTimeClick = (timestamp: number) => {
    setCurrentTime(timestamp);
    setIsPlaying(true);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 text-gray-900">
        {/* 상단 헤더 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => window.location.href = '/'}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              대시보드로
            </button>
            <h1 className="text-3xl font-bold text-gray-900">상담 모니터링</h1>
          </div>
        </div>

        {/* 조회 옵션 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-6">
            {/* 기간 선택 */}
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-700">기간:</span>
              <select 
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                <option value="1">1일</option>
                <option value="3">3일</option>
                <option value="7">1주일</option>
                <option value="30">1개월</option>
              </select>
            </div>

            {/* 부서 선택 */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700">부서:</span>
              <div className="relative">
                <select 
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 pr-8"
                >
                  {departments.map((dept) => (
                    <option key={dept.id} value={dept.id}>{dept.name}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* 상담원 선택 */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700">상담원:</span>
              <div className="relative">
                <select 
                  value={selectedConsultant}
                  onChange={(e) => setSelectedConsultant(e.target.value)}
                  className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 pr-8"
                >
                  {getCurrentConsultants().map((consultant) => (
                    <option key={consultant.id} value={consultant.id}>{consultant.name}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* 조회 버튼 */}
            <button className="flex items-center gap-2 px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors">
              조회
            </button>
          </div>
        </div>

        {/* 메인 콘텐츠 - 3단 레이아웃 */}
        <div className="grid grid-cols-4 gap-6 h-[calc(100vh-300px)]">
          {/* 좌측 패널 */}
          <div className="col-span-1 space-y-6 overflow-y-auto">
            {/* 상담품질 요약 */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">상담품질 요약</h2>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">{qualitySummary.average}점</div>
                  <div className="text-sm text-gray-600">평균 점수</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">{qualitySummary.highest}점</div>
                  <div className="text-sm text-gray-600">최고 점수</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600 mb-1">{qualitySummary.lowest}점</div>
                  <div className="text-sm text-gray-600">최저 점수</div>
                </div>
              </div>
            </div>

            {/* 업무 통계 현황 */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h2 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-purple-500" />
                업무 통계 현황
              </h2>
              <div className="relative h-32">
                <svg className="w-full h-full">
                  {/* Y축 */}
                  <line x1="30" y1="10" x2="30" y2="110" stroke="#e5e7eb" strokeWidth="1"/>
                  {/* X축 */}
                  <line x1="30" y1="110" x2="180" y2="110" stroke="#e5e7eb" strokeWidth="1"/>
                  
                  {/* 데드라인 (빨간선) */}
                  <line 
                    x1="30" 
                    y1={110 - (480 / 600 * 100)} 
                    x2="180" 
                    y2={110 - (480 / 600 * 100)} 
                    stroke="#ef4444" 
                    strokeWidth="1" 
                    strokeDasharray="3,3"
                  />
                  
                  {/* 데이터 포인트 */}
                  {workStats.data.map((item, index) => {
                    const x = 50 + (index * 25);
                    const y = 110 - (item.time / 600 * 100);
                    const isOverDeadline = item.time > item.deadline;
                    
                    return (
                      <g key={index}>
                        {/* 바 */}
                        <rect
                          x={x - 8}
                          y={y}
                          width="16"
                          height={110 - y}
                          fill={isOverDeadline ? "#ef4444" : "#3b82f6"}
                          opacity="0.7"
                        />
                        {/* X축 레이블 */}
                        <text x={x} y="125" textAnchor="middle" className="text-xs fill-gray-700">
                          {item.day}
                        </text>
                      </g>
                    );
                  })}
                </svg>
                <div className="text-xs text-gray-500 mt-1">지난 주 업무 상담시간 (순단위)</div>
              </div>
            </div>

            {/* 지난 주 우수상담사 */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h2 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <Award className="h-4 w-4 text-yellow-500" />
                지난 주 우수상담사
              </h2>
              <div className="space-y-2">
                {topConsultants.map((consultant) => (
                  <div key={consultant.rank} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-1.5 py-0.5 rounded ${consultant.rank === 1 ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-600'}`}>
                        {consultant.rank}등
                      </span>
                      <span className="text-gray-700">{consultant.name}</span>
                    </div>
                    <span className="font-medium text-gray-800">{consultant.score}점</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 중앙 패널 - 상담 세션 테이블 */}
          <div className="col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-4 overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <PhoneCall className="h-5 w-5 text-blue-500" />
                총 결과 건수 {sessionData.length}건
              </h3>
            </div>
            
            <div className="overflow-auto h-[calc(100%-60px)]">
              <table className="w-full text-sm">
                <thead className="sticky top-0 bg-gray-50">
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 px-3 text-xs font-medium text-gray-600">No</th>
                    <th className="text-left py-2 px-3 text-xs font-medium text-gray-600">상담일시</th>
                    <th className="text-left py-2 px-3 text-xs font-medium text-gray-600">최종점수</th>
                    <th className="text-left py-2 px-3 text-xs font-medium text-gray-600">정중함 및 언어 품질</th>
                    <th className="text-left py-2 px-3 text-xs font-medium text-gray-600">공감적 소통</th>
                    <th className="text-left py-2 px-3 text-xs font-medium text-gray-600">문제 해결 역량</th>
                    <th className="text-left py-2 px-3 text-xs font-medium text-gray-600">감정 안정성</th>
                    <th className="text-left py-2 px-3 text-xs font-medium text-gray-600">대화 흐름 및 응대 태도</th>
                    <th className="text-left py-2 px-3 text-xs font-medium text-gray-600">종합 피드백</th>
                  </tr>
                </thead>
                <tbody>
                  {sessionData.map((session) => (
                    <tr 
                      key={session.id} 
                      className={`border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${selectedSession?.id === session.id ? 'bg-pink-50' : ''}`}
                      onClick={() => setSelectedSession(session)}
                    >
                      <td className="py-2 px-3 text-xs">{session.id}</td>
                      <td className="py-2 px-3 text-xs">{session.datetime}</td>
                      <td className="py-2 px-3 text-xs font-medium">{session.finalScore}</td>
                      <td className="py-2 px-3">
                        <span className={`px-1.5 py-0.5 rounded-full text-xs font-medium ${getGradeColor(session.politeness)}`}>
                          {session.politeness}
                        </span>
                      </td>
                      <td className="py-2 px-3">
                        <span className={`px-1.5 py-0.5 rounded-full text-xs font-medium ${getGradeColor(session.empathy)}`}>
                          {session.empathy}
                        </span>
                      </td>
                      <td className="py-2 px-3">
                        <span className={`px-1.5 py-0.5 rounded-full text-xs font-medium ${getGradeColor(session.problemSolving)}`}>
                          {session.problemSolving}
                        </span>
                      </td>
                      <td className="py-2 px-3">
                        <span className={`px-1.5 py-0.5 rounded-full text-xs font-medium ${getGradeColor(session.emotionalStability)}`}>
                          {session.emotionalStability}
                        </span>
                      </td>
                      <td className="py-2 px-3">
                        <span className={`px-1.5 py-0.5 rounded-full text-xs font-medium ${getGradeColor(session.conversationFlow)}`}>
                          {session.conversationFlow}
                        </span>
                      </td>
                      <td className="py-2 px-3">
                        <span className={`px-1.5 py-0.5 rounded-full text-xs font-medium ${getResultColor(session.result)}`}>
                          {session.result}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 우측 패널 */}
          <div className="col-span-1 space-y-4 overflow-y-auto">
            {/* 전체 피드백 */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-purple-500" />
                선택한 전체 기간의 지표에 대한 전체적인 피드백 (요약 기준)
              </h3>
              
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-green-600 mb-2 text-sm">강점</h4>
                  <div className="space-y-1">
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div>
                      <p className="text-xs text-gray-700">대화의 흐름과 응대 태도가 전반적으로 우수함. 상황설명 진행과 세심 배려하고 있습니다.</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div>
                      <p className="text-xs text-gray-700">구체적인 사례를 통한 설명으로 상담 진행 능력이 기능하고 있습니다.</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-red-600 mb-2 text-sm">개선점</h4>
                  <div className="space-y-1">
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5 flex-shrink-0"></div>
                      <p className="text-xs text-gray-700">정중함과 언어 품질에서 지속적인 개선 필요. 상담에서 강점을 더 좋 이해하는데 면안하는 언기를 옮습니다.</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5 flex-shrink-0"></div>
                      <p className="text-xs text-gray-700">등등, 질문을는 능력이 위해 대응 시 사용하는 언어나 태도를 주의하시길 바랍니다. 상담원의 습득이 느 통안을 좋습니다.</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-blue-600 mb-2 text-sm">중점 코칭 멘트</h4>
                  <div className="bg-blue-50 rounded-lg p-3">
                    <p className="text-xs text-blue-700">
                      서로의 응대 단계를 좋은 감정 회복으로, 상담원의 상황을 더 좋 이해하므로 면안하는 언어를 옮습니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 채팅 대화 */}
            {selectedSession && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <h4 className="font-medium text-gray-800 mb-3 text-sm">상담 대화 내용</h4>
                <div className="bg-gray-50 rounded-lg p-3 max-h-48 overflow-y-auto">
                  {chatConversation.map((chat, index) => (
                    <div key={index} className="flex items-start gap-2 mb-2">
                      <button
                        onClick={() => handleTimeClick(chat.timestamp)}
                        className="text-xs text-blue-600 hover:text-blue-800 cursor-pointer min-w-[35px]"
                      >
                        {chat.time}
                      </button>
                      <div className="flex-1">
                        <span className={`text-xs font-medium ${chat.speaker === '상담사' ? 'text-blue-600' : 'text-green-600'}`}>
                          {chat.speaker}
                        </span>
                        <p className="text-xs text-gray-700 mt-0.5">{chat.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 오디오 플레이어 */}
            {selectedSession && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="bg-gray-100 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-600">{formatTime(currentTime)}</span>
                    <span className="text-xs text-gray-600">{formatTime(totalTime)}</span>
                  </div>
                  <div className="bg-gray-300 rounded-full h-1.5 mb-3">
                    <div 
                      className="bg-pink-500 h-1.5 rounded-full transition-all duration-300"
                      style={{ width: `${(currentTime / totalTime) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-center gap-3">
                    <button
                      onClick={() => setCurrentTime(Math.max(0, currentTime - 5))}
                      className="p-1.5 text-gray-600 hover:text-gray-800"
                    >
                      <Clock className="h-3 w-3" />
                    </button>
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="p-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors"
                    >
                      {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                    </button>
                    <button
                      onClick={() => setCurrentTime(Math.min(totalTime, currentTime + 5))}
                      className="p-1.5 text-gray-600 hover:text-gray-800"
                    >
                      <Clock className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 