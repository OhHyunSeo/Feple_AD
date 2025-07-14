import type { Team, Department } from '@/types';

// ===== 팀 데이터 =====
export const TEAMS: Team[] = [
  { id: "team1", name: "고객상담 1팀", memberCount: 12, teamLead: "김팀장" },
  { id: "team2", name: "고객상담 2팀", memberCount: 15, teamLead: "이팀장" },
  { id: "team3", name: "고객상담 3팀", memberCount: 10, teamLead: "박팀장" },
  { id: "team4", name: "기술지원팀", memberCount: 8, teamLead: "최팀장" },
];

// ===== 부서 데이터 =====
export const DEPARTMENTS: Department[] = [
  { id: "all", name: "전체 부서" },
  { id: "team1", name: "고객상담 1팀" },
  { id: "team2", name: "고객상담 2팀" },
  { id: "team3", name: "고객상담 3팀" },
  { id: "team4", name: "기술지원팀" },
];

// ===== 평가 등급 =====
export const EVALUATION_GRADES = {
  EXCELLENT: 'A',
  GOOD: 'B',
  FAIR: 'C',
  POOR: 'D',
  CRITICAL: 'F',
  WARNING: 'G'
} as const;

// ===== 상담사 상태 =====
export const CONSULTANT_STATUS = {
  ACTIVE: 'active',
  BREAK: 'break',
  OFFLINE: 'offline'
} as const;

// ===== 우선순위 레벨 =====
export const PRIORITY_LEVELS = {
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low'
} as const;

// ===== 조회 기간 옵션 =====
export const PERIOD_OPTIONS = [
  { value: '1', label: '1일' },
  { value: '3', label: '3일' },
  { value: '7', label: '1주일' },
  { value: '30', label: '1개월' }
];

// ===== 페이지네이션 설정 =====
export const PAGINATION_CONFIG = {
  DEFAULT_PAGE_SIZE: 10,
  RISK_ALERTS_PAGE_SIZE: 2,
  MAX_PAGE_SIZE: 100,
  MIN_PAGE_SIZE: 5
};

// ===== 스타일 관련 상수 =====
export const THEME_COLORS = {
  primary: {
    50: '#fdf2f8',
    100: '#fce7f3',
    200: '#fbcfe8',
    300: '#f9a8d4',
    400: '#f472b6',
    500: '#ec4899',
    600: '#db2777',
    700: '#be185d',
    800: '#9d174d',
    900: '#831843'
  },
  purple: {
    50: '#faf5ff',
    100: '#f3e8ff',
    200: '#e9d5ff',
    300: '#d8b4fe',
    400: '#c084fc',
    500: '#a855f7',
    600: '#9333ea',
    700: '#7c3aed',
    800: '#6b21a8',
    900: '#581c87'
  },
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827'
  }
};

export const GRADIENTS = {
  primary: 'from-pink-500 to-purple-600',
  secondary: 'from-purple-500 to-indigo-600',
  success: 'from-green-400 to-blue-500',
  warning: 'from-yellow-400 to-orange-500',
  danger: 'from-red-400 to-pink-500'
};

// ===== 상태별 색상 매핑 =====
export const STATUS_COLORS = {
  active: 'bg-green-100 text-green-800',
  break: 'bg-yellow-100 text-yellow-800',
  offline: 'bg-gray-100 text-gray-800'
};

export const PRIORITY_COLORS = {
  high: 'bg-red-100 text-red-800',
  medium: 'bg-yellow-100 text-yellow-800',
  low: 'bg-blue-100 text-blue-800'
};

export const GRADE_COLORS = {
  A: 'bg-green-500 text-white',
  B: 'bg-blue-500 text-white',
  C: 'bg-yellow-500 text-white',
  D: 'bg-orange-500 text-white',
  F: 'bg-red-500 text-white',
  G: 'bg-red-600 text-white'
};

export const SEVERITY_COLORS = {
  excellent: 'text-green-600',
  good: 'text-blue-600',
  fair: 'text-yellow-600',
  poor: 'text-orange-600',
  critical: 'text-red-600',
  warning: 'text-orange-600'
};

// ===== API 관련 상수 =====
export const API_ENDPOINTS = {
  CONSULTANTS: '/api/consultants',
  TEAMS: '/api/teams',
  PERFORMANCE: '/api/performance',
  EVALUATIONS: '/api/evaluations',
  RISK_ALERTS: '/api/risk-alerts',
  INSPECTIONS: '/api/inspections'
};

// ===== 애니메이션 설정 =====
export const ANIMATION_DURATION = {
  FAST: 150,
  DEFAULT: 300,
  SLOW: 500
};

export const TRANSITION_CLASSES = {
  DEFAULT: 'transition-all duration-300 ease-in-out',
  FAST: 'transition-all duration-150 ease-in-out',
  SLOW: 'transition-all duration-500 ease-in-out'
};

// ===== 사이드바 설정 =====
export const SIDEBAR_CONFIG = {
  COLLAPSED_WIDTH: 80,
  EXPANDED_WIDTH: 256,
  HEADER_HEIGHT: 96,
  TRANSITION_DURATION: 300
};

// ===== 폼 검증 규칙 =====
export const VALIDATION_RULES = {
  CONSULTANT_NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 50,
    PATTERN: /^[가-힣a-zA-Z\s]+$/
  },
  SATISFACTION_SCORE: {
    MIN: 0,
    MAX: 5,
    DECIMAL_PLACES: 1
  },
  EVALUATION_SCORE: {
    MIN: 0,
    MAX: 100
  }
};

// ===== 에러 메시지 =====
export const ERROR_MESSAGES = {
  NETWORK_ERROR: '네트워크 연결을 확인해주세요.',
  UNAUTHORIZED: '로그인이 필요합니다.',
  FORBIDDEN: '접근 권한이 없습니다.',
  NOT_FOUND: '요청한 데이터를 찾을 수 없습니다.',
  SERVER_ERROR: '서버에 오류가 발생했습니다.',
  VALIDATION_ERROR: '입력값을 확인해주세요.',
  UNKNOWN_ERROR: '알 수 없는 오류가 발생했습니다.'
};

// ===== 성공 메시지 =====
export const SUCCESS_MESSAGES = {
  DATA_SAVED: '성공적으로 저장되었습니다.',
  DATA_UPDATED: '성공적으로 수정되었습니다.',
  DATA_DELETED: '성공적으로 삭제되었습니다.',
  EVALUATION_COMPLETED: '평가가 완료되었습니다.',
  INSPECTION_SCHEDULED: '점검이 예약되었습니다.'
};

// ===== 로컬 스토리지 키 =====
export const LOCAL_STORAGE_KEYS = {
  USER_PREFERENCES: 'feple_user_preferences',
  SIDEBAR_STATE: 'feple_sidebar_state',
  FILTER_OPTIONS: 'feple_filter_options',
  THEME_MODE: 'feple_theme_mode'
};

// ===== 기본값 =====
export const DEFAULT_VALUES = {
  PAGE_SIZE: PAGINATION_CONFIG.DEFAULT_PAGE_SIZE,
  SORT_FIELD: 'name',
  SORT_DIRECTION: 'asc' as const,
  FILTER_PERIOD: '1',
  FILTER_DEPARTMENT: 'all',
  FILTER_STATUS: 'all'
}; 