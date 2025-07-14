# Legacy Code Archive

이 폴더는 **comprehensive code refactoring** 과정에서 더 이상 사용되지 않는 파일들을 보관하는 곳입니다.

## 📁 폴더 구조

```
legacy/
├── app/              # 사용하지 않는 페이지 디렉토리
│   ├── evaluations/  # 미사용 평가 페이지
│   ├── schedule/     # 미사용 스케줄 페이지  
│   └── competency/   # 미사용 역량 페이지
├── components/       # 개선된 버전으로 교체된 컴포넌트들
│   ├── StatCard.tsx
│   ├── ConsultantTable.tsx
│   └── EvaluationChart.tsx
└── styles/
    └── globals.css   # 모듈화로 교체된 스타일 파일
```

## 🔄 마이그레이션 정보

### Components
- **StatCard.tsx** → `src/components/features/StatCard.tsx`
- **ConsultantTable.tsx** → `src/components/features/ConsultantTable.tsx`  
- **EvaluationChart.tsx** → `src/components/features/EvaluationChart.tsx`

**개선사항:**
- 중앙화된 타입 시스템 적용
- mockData에서 데이터 가져오기
- 새로운 UI 컴포넌트 (Card, Badge) 활용
- TypeScript 타입 안전성 개선

### Styles  
- **globals.css** → `src/styles/` (5개 모듈로 분리)
  - `base.css` - 폰트, CSS 변수, 기본 스타일
  - `theme.css` - 테마 유틸리티 클래스
  - `components.css` - 재사용 컴포넌트 스타일
  - `animations.css` - 애니메이션 시스템
  - `utilities.css` - 레이아웃, 간격, 접근성

### App Directories
삭제된 디렉토리들은 현재 프로젝트에서 사용되지 않는 기능들입니다:

- **evaluations/** - 평가 관련 빈 페이지 구조
- **schedule/** - 스케줄 관련 빈 페이지 구조  
- **competency/** - 역량 관련 빈 페이지 구조

## ⚠️ 주의사항

이 폴더의 파일들은 **참고용**으로만 보관됩니다. 
- 프로덕션 빌드에 포함되지 않음
- 새로운 개발에서는 `src/` 폴더의 개선된 버전 사용
- 필요시 복원 가능하지만 현재 아키텍처와 호환되지 않을 수 있음

## 📊 리팩토링 성과

| 항목 | Before | After | 개선점 |
|------|--------|-------|--------|
| 컴포넌트 중복 | 6개 파일 | 0개 | 완전 통합 |
| 스타일 파일 | 352줄 globals.css | 5개 모듈화 파일 | 유지보수성 ↑ |
| 사용하지 않는 디렉토리 | 3개 | 0개 | 코드베이스 정리 |
| TypeScript 타입 안전성 | 부분적 | 완전 | 런타임 오류 방지 |

---

*Created during Phase 5 of comprehensive code refactoring*  
*Date: 2024-12-28* 