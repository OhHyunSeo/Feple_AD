# 🔧 Feple Dashboard 리팩토링 계획서

> 코드 품질 개선 및 유지보수성 향상을 위한 종합 리팩토링 계획

## 📊 현재 상태 분석

### 🔍 프로젝트 구조 분석 결과

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # 역할 선택 페이지 (✅ 양호)
│   ├── consultant/        # 상담사 전용 (✅ 양호)
│   ├── qc/               # QC팀 전용 (✅ 양호)
│   ├── consultants/      # 상담사 관리 (⚠️ 개선 필요)
│   ├── performance/      # 레거시 성과 페이지 (⚠️ 정리 필요)
│   ├── evaluations/      # 미사용 (❌ 삭제 대상)
│   ├── schedule/         # 미사용 (❌ 삭제 대상)
│   ├── competency/       # 미사용 (❌ 삭제 대상)
│   ├── layout.tsx        # 루트 레이아웃 (✅ 양호)
│   └── globals.css       # 스타일 (⚠️ 개선 필요)
├── components/           # 재사용 컴포넌트 (⚠️ 개선 필요)
└── lib/                 # 유틸리티 (⚠️ 확장 필요)
```

## 🚨 발견된 주요 문제점

### 1. **코드 중복 및 데이터 분산**
- ❌ 상담사 데이터가 여러 파일에 하드코딩
- ❌ 팀 정보가 각 컴포넌트마다 개별 정의
- ❌ 동일한 타입이 여러 파일에서 반복 정의
- ❌ 비즈니스 로직이 UI 컴포넌트에 혼재

### 2. **타입 안정성 부족**
- ❌ `SessionData` 타입이 각 파일에서 개별 정의
- ❌ 상담사, 팀, 평가 관련 타입이 분산
- ❌ API 응답 타입이 정의되지 않음
- ❌ Props 타입이 일관성 없음

### 3. **스타일링 문제**
- ❌ `globals.css`에 350+ 줄의 커스텀 스타일
- ❌ 인라인 스타일과 CSS 클래스 혼용
- ❌ 테마 관련 스타일이 산재
- ❌ 반응형 스타일이 일관성 없음

### 4. **사용되지 않는 코드**
- ❌ `/evaluations` 디렉토리 (빈 구조체)
- ❌ `/schedule` 디렉토리 (빈 구조체)
- ❌ `/competency` 디렉토리 (빈 구조체)
- ❌ 일부 컴포넌트에서 사용되지 않는 import들

### 5. **상태 관리 및 로직 분산**
- ❌ 각 컴포넌트에서 개별적으로 상태 관리
- ❌ 비즈니스 로직이 컴포넌트에 강결합
- ❌ 데이터 변환 로직이 반복됨
- ❌ 이벤트 핸들러가 컴포넌트 내부에 복잡하게 구현

## 🎯 리팩토링 목표

### ✅ **주요 목표**
1. **코드 재사용성 향상**: 공통 로직과 컴포넌트 추출
2. **타입 안정성 강화**: 중앙화된 타입 시스템 구축
3. **유지보수성 개선**: 관심사 분리 및 모듈화
4. **성능 최적화**: 불필요한 리렌더링 방지
5. **코드 가독성 향상**: 일관된 코딩 스타일 적용

## 📋 상세 리팩토링 계획

### 🏗️ **Phase 1: 기반 구조 정리 (예상 소요: 2-3시간)**

#### 1.1 타입 시스템 중앙화
```typescript
// src/types/index.ts 생성
export interface Consultant {
  id: string;
  name: string;
  team: string;
  position: string;
  status: 'active' | 'break' | 'offline';
  satisfactionScore: number;
  // ... 기타 필드들
}

export interface Team {
  id: string;
  name: string;
  memberCount: number;
  teamLead: string;
}

export interface SessionData {
  id: number;
  datetime: string;
  finalScore: number;
  // ... 평가 관련 필드들
}
```

#### 1.2 상수 및 설정 중앙화
```typescript
// src/constants/index.ts 생성
export const TEAMS = [
  { id: "team1", name: "고객상담 1팀", memberCount: 12, teamLead: "김팀장" },
  // ...
];

export const EVALUATION_GRADES = {
  EXCELLENT: 'A',
  GOOD: 'B',
  FAIR: 'C',
  POOR: 'D',
  CRITICAL: 'F'
} as const;
```

#### 1.3 Mock 데이터 분리
```typescript
// src/data/mockData.ts 생성
export const mockConsultants: Consultant[] = [
  // 현재 하드코딩된 데이터들을 여기로 이동
];
```

### 🧩 **Phase 2: 컴포넌트 리팩토링 (예상 소요: 3-4시간)**

#### 2.1 공통 UI 컴포넌트 추출
```typescript
// src/components/ui/ 디렉토리 생성
- Button.tsx          # 재사용 가능한 버튼 컴포넌트
- Card.tsx            # 공통 카드 레이아웃
- Badge.tsx           # 상태/등급 표시용 배지
- Modal.tsx           # 모달 컴포넌트
- Select.tsx          # 드롭다운 선택 컴포넌트
- Table.tsx           # 테이블 컴포넌트
```

#### 2.2 비즈니스 컴포넌트 개선
```typescript
// 현재: 모든 로직이 컴포넌트 내부
// 개선: 프레젠테이션과 로직 분리

// Before
export default function ConsultantTable() {
  const [data, setData] = useState([]);
  // 복잡한 비즈니스 로직들...
  
  return (
    // JSX 렌더링
  );
}

// After
export default function ConsultantTable() {
  const { consultants, isLoading, handleAction } = useConsultants();
  
  return (
    <DataTable 
      data={consultants} 
      isLoading={isLoading}
      onAction={handleAction}
    />
  );
}
```

### 🎣 **Phase 3: 커스텀 훅 도입 (예상 소요: 2-3시간)**

#### 3.1 데이터 관리 훅
```typescript
// src/hooks/useConsultants.ts
export function useConsultants() {
  const [consultants, setConsultants] = useState<Consultant[]>([]);
  const [loading, setLoading] = useState(false);
  
  // 데이터 페칭, 필터링, 정렬 로직
  
  return { consultants, loading, actions };
}

// src/hooks/usePerformance.ts
export function usePerformance(consultantId?: string) {
  // 성과 데이터 관리 로직
}
```

#### 3.2 UI 상태 관리 훅
```typescript
// src/hooks/useModal.ts
export function useModal() {
  const [isOpen, setIsOpen] = useState(false);
  // 모달 관련 로직
}

// src/hooks/usePagination.ts
export function usePagination<T>(data: T[], pageSize: number) {
  // 페이지네이션 로직
}
```

### 🎨 **Phase 4: 스타일링 개선 (예상 소요: 2시간)**

#### 4.1 테마 시스템 구축
```typescript
// src/styles/theme.ts
export const theme = {
  colors: {
    primary: {
      50: '#fdf2f8',
      500: '#ec4899',
      600: '#db2777',
    },
    // ...
  },
  gradients: {
    primary: 'from-pink-500 to-purple-600',
    // ...
  }
};
```

#### 4.2 스타일 컴포넌트화
```typescript
// src/components/ui/Button.tsx
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg font-medium transition-colors",
  {
    variants: {
      variant: {
        primary: "bg-gradient-to-r from-pink-500 to-purple-600 text-white",
        secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4",
        lg: "h-12 px-6",
      }
    }
  }
);
```

### 🧹 **Phase 5: 코드 정리 (예상 소요: 1시간)**

#### 5.1 사용되지 않는 파일 제거
- ❌ `src/app/evaluations/` 디렉토리
- ❌ `src/app/schedule/` 디렉토리  
- ❌ `src/app/competency/` 디렉토리
- ❌ 사용되지 않는 import문들

#### 5.2 파일 구조 최적화
```
src/
├── types/              # 타입 정의
├── constants/          # 상수 및 설정
├── data/              # Mock 데이터
├── hooks/             # 커스텀 훅
├── utils/             # 유틸리티 함수
├── components/
│   ├── ui/           # 재사용 UI 컴포넌트
│   └── features/     # 기능별 컴포넌트
└── styles/           # 스타일 관련
```

## 📈 예상 개선 효과

### ✅ **정량적 개선**
- **코드 중복 80% 감소**: 타입 및 데이터 중앙화
- **번들 크기 15% 감소**: 불필요한 코드 제거
- **타입 안정성 100% 달성**: 모든 데이터에 타입 적용
- **컴포넌트 재사용성 300% 향상**: UI 컴포넌트 분리

### ✅ **정성적 개선**
- **개발 생산성 향상**: 새 기능 추가 시간 단축
- **버그 발생률 감소**: 타입 안정성으로 런타임 에러 방지
- **코드 가독성 향상**: 관심사 분리로 이해도 증가
- **유지보수성 개선**: 모듈화된 구조로 수정 용이

## 🚀 리팩토링 실행 단계

### **Step 1: 백업 및 준비**
- 현재 코드베이스 백업
- 리팩토링 브랜치 생성
- 기존 기능 테스트 실행

### **Step 2: Phase별 순차 실행**
1. **기반 구조 정리** → 타입, 상수, 데이터 분리
2. **컴포넌트 리팩토링** → UI/비즈니스 로직 분리  
3. **커스텀 훅 도입** → 상태 관리 로직 분리
4. **스타일링 개선** → 테마 시스템 및 컴포넌트화
5. **코드 정리** → 불필요한 파일 제거

### **Step 3: 검증 및 테스트**
- 기능별 동작 확인
- 타입 체크 통과 확인
- 빌드 및 배포 테스트
- 성능 측정 및 비교

## ⚠️ 주의사항 및 리스크

### **리스크 요소**
- **기능 동작 변경 가능성**: 리팩토링 중 실수로 기능이 변경될 수 있음
- **임시적 복잡성 증가**: 리팩토링 진행 중 일시적으로 코드가 복잡해질 수 있음
- **타입 마이그레이션**: 기존 코드를 새 타입 시스템에 맞춰 변경하는 과정에서 에러 발생 가능

### **대응 방안**
- **단계별 테스트**: 각 Phase 완료 후 철저한 기능 테스트
- **점진적 적용**: 한 번에 모든 것을 바꾸지 않고 단계적으로 적용
- **롤백 계획**: 문제 발생 시 이전 상태로 즉시 복구 가능한 계획 수립

## 🎯 승인 요청 사항

다음 리팩토링 계획에 대해 승인을 요청드립니다:

### **실행 여부**
- [ ] **전체 리팩토링 진행** (추천)
- [ ] **일부 Phase만 선택적 진행**
- [ ] **리팩토링 계획 수정 후 재검토**
- [ ] **리팩토링 보류**

### **우선순위 조정**
특별히 우선적으로 처리하고 싶은 부분이 있다면 알려주세요:
- Phase 1: 기반 구조 정리
- Phase 2: 컴포넌트 리팩토링  
- Phase 3: 커스텀 훅 도입
- Phase 4: 스타일링 개선
- Phase 5: 코드 정리

---

**💡 추천**: 전체 리팩토링을 통해 장기적인 코드 품질과 개발 효율성을 크게 향상시킬 수 있습니다. 약 8-12시간의 작업으로 향후 개발 생산성을 2-3배 향상시킬 수 있는 투자라고 판단됩니다. 