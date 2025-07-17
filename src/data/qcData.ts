// QC 대시보드 더미 데이터

// 검색 데이터
export const searchData = [
  {
    type: "consultant",
    title: "김민수",
    subtitle: "고객상담 1팀 - 선임 상담사",
    link: "/consultants",
  },
  {
    type: "consultant",
    title: "이영희",
    subtitle: "고객상담 2팀 - 상담사",
    link: "/consultants",
  },
  {
    type: "consultant",
    title: "박성호",
    subtitle: "고객상담 1팀 - 상담사",
    link: "/consultants",
  },
  {
    type: "consultant",
    title: "최미연",
    subtitle: "고객상담 3팀 - 팀장",
    link: "/consultants",
  },
  {
    type: "consultant",
    title: "노준석",
    subtitle: "고객상담 1팀 - 상담사",
    link: "/consultants",
  },
];

// 팀 데이터
export const teams = [
  { id: "team1", name: "고객상담 1팀", memberCount: 12, teamLead: "김팀장" },
  { id: "team2", name: "고객상담 2팀", memberCount: 15, teamLead: "이팀장" },
  { id: "team3", name: "고객상담 3팀", memberCount: 10, teamLead: "박팀장" },
  { id: "team4", name: "기술지원팀", memberCount: 8, teamLead: "최팀장" },
];

// 팀별 상담원 데이터
export const teamMembers = {
  team1: [
    {
      id: "c1",
      name: "김민수",
      position: "선임 상담사",
      callsToday: 23,
    },
    {
      id: "c2",
      name: "박성호",
      position: "상담사",
      callsToday: 18,
    },
    {
      id: "c3",
      name: "임지원",
      position: "상담사",
      callsToday: 15,
    },
    {
      id: "c12",
      name: "노준석",
      position: "상담사",
      callsToday: 12,
    },
  ],
  team2: [
    {
      id: "c4",
      name: "이영희",
      position: "상담사",
      callsToday: 20,
    },
    {
      id: "c5",
      name: "정다은",
      position: "상담사",
      callsToday: 16,
    },
    {
      id: "c6",
      name: "강현준",
      position: "선임 상담사",
      callsToday: 25,
    },
  ],
  team3: [
    {
      id: "c7",
      name: "최미연",
      position: "팀장",
      callsToday: 12,
    },
    {
      id: "c8",
      name: "한상욱",
      position: "상담사",
      callsToday: 19,
    },
    {
      id: "c9",
      name: "송예진",
      position: "상담사",
      callsToday: 14,
    },
  ],
  team4: [
    {
      id: "c10",
      name: "윤진호",
      position: "기술지원",
      callsToday: 8,
    },
    {
      id: "c11",
      name: "조은실",
      position: "기술지원",
      callsToday: 10,
    },
  ],
};

// 점검 추천 상담사 데이터
export const inspectionRecommendations = [
  {
    id: "c15",
    name: "문지호",
    team: "고객상담 1팀",
    position: "상담사",
    lastInspection: "2025-06-09",
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
    lastInspection: "2025-06-25",
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
    lastInspection: "2025-05-22",
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
    lastInspection: "2025-07-04",
    daysSinceInspection: 13,
    recommendationReason: "신규 교육 후 점검",
    priority: "low",
    qcManager: "최QC",
  },
];

// 위험 등급 상담사 데이터
export const riskAlerts = [
  {
    id: "c12",
    name: "노준석",
    team: "고객상담 1팀",
    position: "상담사",
    riskCategories: [
      { category: "공감적 소통", grade: "F", severity: "warning" },
      { category: "정중함", grade: "G", severity: "critical" },
    ],
    lastEvaluation: "2025-07-17 14:30",
    actionRequired: true,
  },
  {
    id: "c13",
    name: "김철호",
    team: "고객상담 2팀",
    position: "상담사",
    riskCategories: [
      { category: "문제 해결", grade: "F", severity: "warning" },
    ],
    lastEvaluation: "2025-07-16 13:15",
    actionRequired: true,
  },
  {
    id: "c14",
    name: "이수정",
    team: "기술지원팀",
    position: "기술지원",
    riskCategories: [
      { category: "감정 안정성", grade: "G", severity: "critical" },
      { category: "대화 흐름", grade: "F", severity: "warning" },
    ],
    lastEvaluation: "2025-07-17 12:45",
    actionRequired: true,
  },
];
