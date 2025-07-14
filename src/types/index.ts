// ===== 기본 엔티티 타입 =====

export interface Consultant {
  id: string;
  name: string;
  team: string;
  position: string;
  status: 'active' | 'break' | 'offline';
  callsToday: number;
  satisfactionScore: number;
  rating?: number;
  evaluationCount?: number;
  completionRate?: number;
  trend?: 'up' | 'down' | 'stable';
  lastEvaluation?: string;
}

export interface Team {
  id: string;
  name: string;
  memberCount: number;
  teamLead: string;
}

export interface Department {
  id: string;
  name: string;
}

// ===== 평가 관련 타입 =====

export interface SessionData {
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

export interface EvaluationGrade {
  category: string;
  grade: 'A' | 'B' | 'C' | 'D' | 'F' | 'G';
  severity: 'excellent' | 'good' | 'fair' | 'poor' | 'critical' | 'warning';
}

// ===== QC 관련 타입 =====

export interface InspectionRecommendation {
  id: string;
  name: string;
  team: string;
  position: string;
  lastInspection: string;
  daysSinceInspection: number;
  recommendationReason: string;
  priority: 'high' | 'medium' | 'low';
  qcManager: string;
}

export interface RiskAlert {
  id: string;
  name: string;
  team: string;
  position: string;
  riskCategories: EvaluationGrade[];
  lastEvaluation: string;
  actionRequired: boolean;
}

// ===== 검색 및 필터 관련 타입 =====

export interface SearchResult {
  type: 'consultant' | 'team' | 'evaluation';
  title: string;
  subtitle: string;
  link: string;
  score?: number;
}

export interface FilterOptions {
  period?: '1' | '3' | '7' | '30';
  department?: string;
  consultant?: string;
  status?: Consultant['status'];
  priority?: InspectionRecommendation['priority'];
}

// ===== 통계 및 성과 관련 타입 =====

export interface PerformanceStats {
  callsCompleted: number;
  avgCallDuration: string;
  satisfactionScore: number;
  resolvedIssues: number;
}

export interface WeeklyPerformance {
  totalCalls: number;
  avgSatisfaction: number;
  improvementRate: string;
  rankInTeam: number;
}

export interface TeamStats {
  totalMembers: number;
  activeMembers: number;
  avgSatisfaction: number;
  totalCallsToday: number;
}

// ===== UI 관련 타입 =====

export interface PaginationOptions {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface SortOptions {
  field: string;
  direction: 'asc' | 'desc';
}

export interface ModalState {
  isOpen: boolean;
  data?: unknown;
  type?: 'view' | 'edit' | 'delete' | 'create';
}

// ===== 컴포넌트 Props 타입 =====

export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface TableProps<T> extends BaseComponentProps {
  data: T[];
  columns: TableColumn<T>[];
  isLoading?: boolean;
  onRowClick?: (item: T) => void;
  onSort?: (field: keyof T, direction: 'asc' | 'desc') => void;
}

export interface TableColumn<T> {
  key: keyof T;
  title: string;
  sortable?: boolean;
  render?: (value: unknown, item: T) => React.ReactNode;
}

export interface ButtonProps extends BaseComponentProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export interface CardProps extends BaseComponentProps {
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
  hoverable?: boolean;
}

export interface BadgeProps extends BaseComponentProps {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md' | 'lg';
}

// ===== 훅 관련 타입 =====

export interface UseConsultantsResult {
  consultants: Consultant[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
  filter: (options: FilterOptions) => void;
  sort: (field: keyof Consultant, direction: 'asc' | 'desc') => void;
}

export interface UsePerformanceResult {
  sessions: SessionData[];
  stats: PerformanceStats;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export interface UsePaginationResult<T> {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  data: T[];
  goToPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  canGoNext: boolean;
  canGoPrev: boolean;
}

// ===== 유틸리티 타입 =====

export type Status = Consultant['status'];
export type Priority = InspectionRecommendation['priority'];
export type Severity = EvaluationGrade['severity'];
export type Grade = EvaluationGrade['grade'];

export type WithId<T> = T & { id: string };
export type WithTimestamp<T> = T & { 
  createdAt: string; 
  updatedAt: string; 
};

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

// ===== 상수 타입 =====

export const EVALUATION_GRADES = {
  EXCELLENT: 'A',
  GOOD: 'B', 
  FAIR: 'C',
  POOR: 'D',
  CRITICAL: 'F',
  WARNING: 'G'
} as const;

export const CONSULTANT_STATUS = {
  ACTIVE: 'active',
  BREAK: 'break', 
  OFFLINE: 'offline'
} as const;

export const PRIORITY_LEVELS = {
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low'
} as const; 