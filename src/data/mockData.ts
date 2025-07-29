import type {
  Consultant,
  InspectionRecommendation,
  RiskAlert,
  SessionData,
  SearchResult,
  PerformanceStats,
  WeeklyPerformance,
} from "@/types";

// ===== 상담사 데이터 =====
export const mockConsultants: Consultant[] = [
  {
    id: "c1",
    name: "김민수",
    team: "고객상담 1팀",
    position: "선임 상담사",
    status: "active",
    callsToday: 23,
    satisfactionScore: 4.8,
    rating: 4.8,
    evaluationCount: 156,
    completionRate: 98,
    trend: "up",
    lastEvaluation: "2024-12-20",
  },
  {
    id: "c2",
    name: "박성호",
    team: "고객상담 1팀",
    position: "상담사",
    status: "active",
    callsToday: 18,
    satisfactionScore: 4.2,
    rating: 4.2,
    evaluationCount: 98,
    completionRate: 92,
    trend: "down",
    lastEvaluation: "2024-12-15",
  },
  {
    id: "c3",
    name: "임지원",
    team: "고객상담 1팀",
    position: "상담사",
    status: "break",
    callsToday: 15,
    satisfactionScore: 4.5,
    rating: 4.5,
    evaluationCount: 120,
    completionRate: 95,
    trend: "up",
    lastEvaluation: "2024-12-18",
  },
  {
    id: "c4",
    name: "이영희",
    team: "고객상담 2팀",
    position: "상담사",
    status: "active",
    callsToday: 20,
    satisfactionScore: 4.5,
    rating: 4.5,
    evaluationCount: 142,
    completionRate: 95,
    trend: "up",
    lastEvaluation: "2024-12-18",
  },
  {
    id: "c5",
    name: "정다은",
    team: "고객상담 2팀",
    position: "상담사",
    status: "active",
    callsToday: 16,
    satisfactionScore: 4.3,
    rating: 4.3,
    evaluationCount: 110,
    completionRate: 93,
    trend: "stable",
    lastEvaluation: "2024-12-19",
  },
  {
    id: "c6",
    name: "강현준",
    team: "고객상담 2팀",
    position: "선임 상담사",
    status: "active",
    callsToday: 25,
    satisfactionScore: 4.7,
    rating: 4.7,
    evaluationCount: 180,
    completionRate: 97,
    trend: "up",
    lastEvaluation: "2024-12-21",
  },
  {
    id: "c7",
    name: "최미연",
    team: "고객상담 3팀",
    position: "팀장",
    status: "active",
    callsToday: 12,
    satisfactionScore: 4.9,
    rating: 4.9,
    evaluationCount: 203,
    completionRate: 99,
    trend: "stable",
    lastEvaluation: "2024-12-22",
  },
  {
    id: "c8",
    name: "한상욱",
    team: "고객상담 3팀",
    position: "상담사",
    status: "active",
    callsToday: 19,
    satisfactionScore: 4.4,
    rating: 4.4,
    evaluationCount: 135,
    completionRate: 94,
    trend: "up",
    lastEvaluation: "2024-12-20",
  },
  {
    id: "c9",
    name: "송예진",
    team: "고객상담 3팀",
    position: "상담사",
    status: "break",
    callsToday: 14,
    satisfactionScore: 4.6,
    rating: 4.6,
    evaluationCount: 125,
    completionRate: 96,
    trend: "stable",
    lastEvaluation: "2024-12-17",
  },
  {
    id: "c10",
    name: "윤진호",
    team: "기술지원팀",
    position: "기술지원",
    status: "active",
    callsToday: 8,
    satisfactionScore: 4.8,
    rating: 4.8,
    evaluationCount: 89,
    completionRate: 98,
    trend: "up",
    lastEvaluation: "2024-12-19",
  },
  {
    id: "c11",
    name: "조은실",
    team: "기술지원팀",
    position: "기술지원",
    status: "active",
    callsToday: 10,
    satisfactionScore: 4.5,
    rating: 4.5,
    evaluationCount: 95,
    completionRate: 96,
    trend: "stable",
    lastEvaluation: "2024-12-18",
  },
  {
    id: "c12",
    name: "노준석",
    team: "고객상담 1팀",
    position: "상담사",
    status: "active",
    callsToday: 12,
    satisfactionScore: 3.2,
    rating: 3.2,
    evaluationCount: 78,
    completionRate: 85,
    trend: "down",
    lastEvaluation: "2024-12-23",
  },
  {
    id: "c13",
    name: "김철호",
    team: "고객상담 2팀",
    position: "상담사",
    status: "active",
    callsToday: 14,
    satisfactionScore: 3.5,
    rating: 3.5,
    evaluationCount: 82,
    completionRate: 87,
    trend: "down",
    lastEvaluation: "2024-12-23",
  },
  {
    id: "c14",
    name: "이수정",
    team: "기술지원팀",
    position: "기술지원",
    status: "active",
    callsToday: 9,
    satisfactionScore: 3.8,
    rating: 3.8,
    evaluationCount: 67,
    completionRate: 89,
    trend: "down",
    lastEvaluation: "2024-12-23",
  },
];

// ===== 팀별 상담원 매핑 =====
export const teamMembersMap = {
  team1: mockConsultants.filter((c) => c.team === "고객상담 1팀"),
  team2: mockConsultants.filter((c) => c.team === "고객상담 2팀"),
  team3: mockConsultants.filter((c) => c.team === "고객상담 3팀"),
  team4: mockConsultants.filter((c) => c.team === "기술지원팀"),
  all: mockConsultants,
};

// ===== 점검 추천 상담사 데이터 =====
export const mockInspectionRecommendations: InspectionRecommendation[] = [
  {
    id: "c15",
    name: "문지호",
    team: "고객상담 1팀",
    position: "상담사",
    lastInspection: "2024-11-15",
    daysSinceInspection: 38,
    recommendationReason: "정기 점검 주기 초과",
    priority: "high",
    qcManager: "김QC",
  },
  {
    id: "c16",
    name: "서민정",
    team: "고객상담 2팀",
    position: "선임 상담사",
    lastInspection: "2024-12-01",
    daysSinceInspection: 22,
    recommendationReason: "성과 개선 모니터링",
    priority: "medium",
    qcManager: "이QC",
  },
  {
    id: "c17",
    name: "조현우",
    team: "기술지원팀",
    position: "기술지원",
    lastInspection: "2024-10-28",
    daysSinceInspection: 56,
    recommendationReason: "장기 미점검",
    priority: "high",
    qcManager: "박QC",
  },
  {
    id: "c18",
    name: "배수진",
    team: "고객상담 3팀",
    position: "상담사",
    lastInspection: "2024-12-10",
    daysSinceInspection: 13,
    recommendationReason: "신규 교육 후 점검",
    priority: "low",
    qcManager: "최QC",
  },
];

// ===== 긴급 점검 대상 데이터 =====
export const mockRiskAlerts: RiskAlert[] = [
  {
    id: "c12",
    name: "노준석",
    team: "고객상담 1팀",
    position: "상담사",
    riskCategories: [
      { category: "공감적 소통", grade: "F", severity: "critical" },
      { category: "정중함", grade: "G", severity: "warning" },
    ],
    lastEvaluation: "2024-12-23 14:30",
    actionRequired: true,
  },
  {
    id: "c13",
    name: "김철호",
    team: "고객상담 2팀",
    position: "상담사",
    riskCategories: [
      { category: "문제 해결", grade: "F", severity: "critical" },
    ],
    lastEvaluation: "2024-12-23 13:15",
    actionRequired: true,
  },
  {
    id: "c14",
    name: "이수정",
    team: "기술지원팀",
    position: "기술지원",
    riskCategories: [
      { category: "감정 안정성", grade: "G", severity: "warning" },
      { category: "대화 흐름", grade: "F", severity: "critical" },
    ],
    lastEvaluation: "2024-12-23 12:45",
    actionRequired: true,
  },
];

// ===== 검색 데이터 =====
export const mockSearchData: SearchResult[] = [
  {
    type: "consultant",
    title: "김민수",
    subtitle: "고객상담 1팀 - 선임 상담사",
    link: "/consultants",
    score: 4.8,
  },
  {
    type: "consultant",
    title: "이영희",
    subtitle: "고객상담 2팀 - 상담사",
    link: "/consultants",
    score: 4.5,
  },
  {
    type: "consultant",
    title: "박성호",
    subtitle: "고객상담 1팀 - 상담사",
    link: "/consultants",
    score: 4.2,
  },
  {
    type: "consultant",
    title: "최미연",
    subtitle: "고객상담 3팀 - 팀장",
    link: "/consultants",
    score: 4.9,
  },
  {
    type: "consultant",
    title: "노준석",
    subtitle: "고객상담 1팀 - 상담사",
    link: "/consultants",
    score: 3.2,
  },
];

// ===== 평가 세션 데이터 =====
export const mockSessionData: SessionData[] = [
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
      strengths: ["대화 흐름이 자연스러움", "기본적인 응답 태도가 양호"],
      improvements: ["공감적 소통 능력 개선 필요", "정중함 표현 향상 요구"],
      coaching: ["고객 감정 인식 훈련", "공감 표현 스크립트 연습"],
    },
  },
  {
    id: 19,
    datetime: "2025-07-07 12:11:05",
    finalScore: 75,
    politeness: "C",
    empathy: "B",
    problemSolving: "B",
    emotionalStability: "A",
    conversationFlow: "A",
    result: "양호",
    feedback: {
      strengths: ["문제 해결 접근이 체계적", "감정 안정성 우수"],
      improvements: ["정중함 표현 개선", "더 적극적인 공감 표현"],
      coaching: ["고객 응대 매너 교육", "공감적 언어 사용법 훈련"],
    },
  },
  {
    id: 18,
    datetime: "2025-07-07 11:05:09",
    finalScore: 82,
    politeness: "B",
    empathy: "A",
    problemSolving: "A",
    emotionalStability: "B",
    conversationFlow: "A",
    result: "양호",
    feedback: {
      strengths: ["문제 해결이 신속하고 정확", "고객과의 소통이 원활"],
      improvements: ["정중함에서 일부 개선 여지", "감정 조절 안정성 향상"],
      coaching: ["스트레스 관리 기법", "고객 응대 시 감정 조절법"],
    },
  },
];

// ===== 성과 통계 데이터 =====
export const mockTodayStats: PerformanceStats = {
  callsCompleted: 23,
  avgCallDuration: "5분 32초",
  satisfactionScore: 4.8,
  resolvedIssues: 21,
};

export const mockWeeklyPerformance: WeeklyPerformance = {
  totalCalls: 142,
  avgSatisfaction: 4.7,
  improvementRate: "+12%",
  rankInTeam: 2,
};

// ===== 차트 데이터 =====
export const monthlyEvaluationData = [
  { month: "1월", completed: 65, inProgress: 20, notStarted: 15 },
  { month: "2월", completed: 78, inProgress: 15, notStarted: 7 },
  { month: "3월", completed: 82, inProgress: 12, notStarted: 6 },
  { month: "4월", completed: 71, inProgress: 18, notStarted: 11 },
  { month: "5월", completed: 89, inProgress: 8, notStarted: 3 },
  { month: "6월", completed: 85, inProgress: 10, notStarted: 5 },
];

// ===== 부서별 상담원 데이터 (기존 구조 호환) =====
export const consultantsByDepartment = {
  all: [
    { id: "all", name: "전체 상담원" },
    ...mockConsultants.map((c) => ({ id: c.id, name: c.name })),
  ],
  team1: [
    { id: "all", name: "전체 상담원" },
    ...teamMembersMap.team1.map((c) => ({ id: c.id, name: c.name })),
  ],
  team2: [
    { id: "all", name: "전체 상담원" },
    ...teamMembersMap.team2.map((c) => ({ id: c.id, name: c.name })),
  ],
  team3: [
    { id: "all", name: "전체 상담원" },
    ...teamMembersMap.team3.map((c) => ({ id: c.id, name: c.name })),
  ],
  team4: [
    { id: "all", name: "전체 상담원" },
    ...teamMembersMap.team4.map((c) => ({ id: c.id, name: c.name })),
  ],
};

// ===== 헬퍼 함수들 =====
export const getConsultantById = (id: string): Consultant | undefined => {
  return mockConsultants.find((c) => c.id === id);
};

export const getConsultantsByTeam = (teamId: string): Consultant[] => {
  if (teamId === "all") return mockConsultants;

  const teamNameMap: Record<string, string> = {
    team1: "고객상담 1팀",
    team2: "고객상담 2팀",
    team3: "고객상담 3팀",
    team4: "기술지원팀",
  };

  const teamName = teamNameMap[teamId];
  return teamName ? mockConsultants.filter((c) => c.team === teamName) : [];
};

export const getConsultantsByStatus = (
  status: Consultant["status"]
): Consultant[] => {
  return mockConsultants.filter((c) => c.status === status);
};

export const getHighRiskConsultants = (): Consultant[] => {
  return mockConsultants.filter((c) => c.satisfactionScore < 4.0);
};

export const getTopPerformers = (limit: number = 5): Consultant[] => {
  return [...mockConsultants]
    .sort((a, b) => b.satisfactionScore - a.satisfactionScore)
    .slice(0, limit);
};

// ===== QC 대시보드용 동적 데이터 생성 =====
import { fixedConsultantInfo } from "./fixedQcMockData";

// 점검 추천 상담사: 상담사별로 daysSinceInspection, priority, lastInspection, recommendationReason 등 다르게
export function getInspectionRecommendations() {
  const config: Record<string, Partial<InspectionRecommendation>> = {
    c1: {
      daysSinceInspection: 40,
      priority: "high",
      lastInspection: "2025-05-30",
      recommendationReason: "정기 점검 주기 초과",
    },
    c2: {
      daysSinceInspection: 25,
      priority: "medium",
      lastInspection: "2025-06-10",
      recommendationReason: "성과 개선 필요",
    },
    c3: {
      daysSinceInspection: 10,
      priority: "low",
      lastInspection: "2025-06-25",
      recommendationReason: "신규 교육 후 점검",
    },
    c4: {
      daysSinceInspection: 35,
      priority: "high",
      lastInspection: "2025-06-01",
      recommendationReason: "장기 미점검",
    },
    c5: {
      daysSinceInspection: 5,
      priority: "low",
      lastInspection: "2025-06-30",
      recommendationReason: "정기 점검 예정",
    },
  };
  return Object.entries(fixedConsultantInfo)
    .filter(([id]) => config[id])
    .map(([id, info]) => ({
      id,
      name: info.name,
      team: info.team,
      position: info.position,
      lastInspection: config[id]?.lastInspection ?? "2025-06-01",
      daysSinceInspection: config[id]?.daysSinceInspection ?? 0,
      recommendationReason:
        config[id]?.recommendationReason ?? "정기 점검 주기 초과",
      priority: config[id]?.priority ?? "low",
    }));
}

// 긴급 점검 대상: 상담사별로 riskCategories 등 다르게
export function getRiskAlerts() {
  const config: Record<
    string,
    {
      riskCategories: RiskAlert["riskCategories"];
      lastEvaluation: string;
      actionRequired: boolean;
    }
  > = {
    c12: {
      riskCategories: [
        { category: "공감적 소통", grade: "F", severity: "warning" },
        { category: "정중함", grade: "G", severity: "critical" },
      ],
      lastEvaluation: "2025-07-17 14:30",
      actionRequired: true,
    },
    c13: {
      riskCategories: [
        { category: "문제 해결", grade: "F", severity: "critical" },
      ],
      lastEvaluation: "2025-07-16 13:15",
      actionRequired: true,
    },
    c14: {
      riskCategories: [
        { category: "감정 안정성", grade: "G", severity: "warning" },
        { category: "대화 흐름", grade: "F", severity: "critical" },
      ],
      lastEvaluation: "2025-07-17 12:45",
      actionRequired: true,
    },
    c7: {
      riskCategories: [{ category: "정중함", grade: "D", severity: "warning" }],
      lastEvaluation: "2025-07-15 10:00",
      actionRequired: false,
    },
    // ... 필요시 추가
  };
  return Object.entries(fixedConsultantInfo)
    .filter(([id]) => config[id])
    .map(([id, info]) => ({
      id,
      name: info.name,
      team: info.team,
      position: info.position,
      riskCategories: config[id].riskCategories,
      lastEvaluation: config[id].lastEvaluation,
      actionRequired: config[id].actionRequired,
    }));
}
