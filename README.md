# 🎯 Feple Dashboard

> 상담사 평가 및 QC 관리를 위한 종합 대시보드 시스템

[![Next.js](https://img.shields.io/badge/Next.js-15.3.5-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0+-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?logo=vercel)](https://vercel.com/)

## 📋 목차

- [프로젝트 개요](#-프로젝트-개요)
- [주요 기능](#-주요-기능)
- [시스템 구조](#-시스템-구조)
- [기술 스택](#-기술-스택)
- [시작하기](#-시작하기)
- [프로젝트 구조](#-프로젝트-구조)
- [역할별 기능](#-역할별-기능)
- [개발 가이드](#-개발-가이드)

## 🎯 프로젝트 개요

Feple Dashboard는 **상담센터의 품질관리(QC)와 상담사 평가**를 위한 종합 관리 시스템입니다. 역할 기반 접근 제어를 통해 QC팀과 상담사에게 각각 최적화된 대시보드를 제공합니다.

### 핵심 가치
- 🎯 **데이터 기반 의사결정**: 실시간 성과 지표와 위험 알림
- 👥 **역할별 맞춤 UI**: QC팀과 상담사를 위한 전용 대시보드
- 📊 **직관적인 시각화**: 3열 레이아웃과 반응형 차트
- ⚡ **실시간 모니터링**: 상담 품질과 성과의 즉시 추적

## 🚀 주요 기능

### 🔐 역할 기반 대시보드
- **QC팀 대시보드**: 전체 상담사 모니터링 및 관리
- **상담사 대시보드**: 개인 성과 조회 및 피드백 확인

### 📊 QC팀 전용 기능
- **3열 대시보드 레이아웃**
  - 🔍 점검 추천 상담사 (우선순위별 정렬)
  - ⚠️ 위험 등급 알림 (F/G 등급 자동 감지)
  - 👥 팀별 상담원 관리 (드롭다운 선택)

- **상담사 관리**
  - 팀별 상담사 목록 및 현황
  - 실시간 활동 상태 모니터링
  - 만족도 점수 추적

- **성과 모니터링**
  - 부서별/상담사별 성과 분석
  - 다기간 데이터 조회 (1일~1개월)
  - 세부 평가 항목별 등급 확인

### 👤 상담사 전용 기능
- **개인 성과 대시보드**
  - 오늘의 상담 건수 및 평균 시간
  - 고객 만족도 점수
  - 문제 해결율

- **피드백 시스템**
  - QC 평가 결과 확인
  - 고객 후기 열람
  - 개선 권장사항 확인

### 🎨 UX/UI 기능
- **확장형 사이드바**: 호버 시 슈르륵 확장되는 애니메이션
- **반응형 레이아웃**: 모든 화면 크기 지원
- **분홍-보라 그라데이션**: 브랜드 아이덴티티 반영
- **다크/라이트 테마**: 사용자 선호도 대응

## 🏗️ 시스템 구조

```
📱 역할 선택 페이지 (/)
├── 🔧 QC팀 대시보드 (/qc)
│   ├── 📊 메인 대시보드 (3열 레이아웃)
│   ├── 👥 상담사 관리 (/consultants)
│   └── 📈 성과 모니터링 (/qc/performance)
└── 👤 상담사 대시보드 (/consultant)
    ├── 🏠 개인 대시보드
    └── 📊 개인 성과 조회 (/consultant/performance)
```

## 💻 기술 스택

### Frontend
- **Framework**: Next.js 15.3.5 (App Router)
- **Language**: TypeScript 5.0+
- **Styling**: Tailwind CSS 3.4+
- **Icons**: Lucide React
- **Charts**: Recharts

### Development & Deployment
- **Package Manager**: npm
- **Deployment**: Vercel
- **Version Control**: Git & GitHub
- **Code Quality**: ESLint, TypeScript

### Architecture
- **Routing**: Next.js App Router
- **State Management**: React useState/useEffect
- **Component Structure**: 모듈화된 재사용 컴포넌트
- **Responsive Design**: Mobile-first 접근법

## 🚀 시작하기

### 필수 요구사항
- Node.js 18.0 이상
- npm 9.0 이상

### 설치 및 실행

1. **저장소 클론**
```bash
git clone https://github.com/OhHyunSeo/Feple_AD.git
cd Feple_dashboard
```

2. **의존성 설치**
```bash
npm install
```

3. **개발 서버 시작**
```bash
npm run dev
```

4. **브라우저에서 확인**
```
http://localhost:3000
```

### 빌드 및 배포

```bash
# 프로덕션 빌드
npm run build

# 빌드 미리보기
npm run start

# 린트 검사
npm run lint
```

## 📁 프로젝트 구조

```
src/
├── app/                          # App Router 페이지
│   ├── page.tsx                 # 역할 선택 페이지
│   ├── consultant/              # 상담사 전용 영역
│   │   ├── page.tsx            # 상담사 메인 대시보드
│   │   └── performance/        # 상담사 성과 조회
│   ├── qc/                     # QC팀 전용 영역
│   │   ├── page.tsx           # QC 메인 대시보드 (3열)
│   │   └── performance/       # QC 성과 모니터링
│   ├── consultants/           # 상담사 관리 (QC 전용)
│   ├── performance/           # 레거시 성과 페이지
│   └── layout.tsx            # 루트 레이아웃
├── components/               # 재사용 컴포넌트
│   ├── DashboardLayout.tsx  # 메인 레이아웃
│   ├── Sidebar.tsx          # 확장형 사이드바
│   ├── Header.tsx           # 상단 헤더
│   └── [기타 컴포넌트들]
└── lib/                     # 유틸리티 함수
    └── utils.ts
```

## 👥 역할별 기능

### 🔧 QC팀 (품질관리팀)
| 기능 | 설명 | 경로 |
|------|------|------|
| 메인 대시보드 | 3열 레이아웃 종합 모니터링 | `/qc` |
| 상담사 관리 | 팀별 상담사 현황 및 관리 | `/consultants` |
| 성과 모니터링 | 부서/상담사별 상세 분석 | `/qc/performance` |
| 점검 추천 | 우선순위별 점검 대상 관리 | `/qc` (좌측 컬럼) |
| 위험 알림 | F/G 등급 상담사 즉시 확인 | `/qc` (중앙 컬럼) |

### 👤 상담사
| 기능 | 설명 | 경로 |
|------|------|------|
| 개인 대시보드 | 오늘의 성과 및 통계 | `/consultant` |
| 성과 조회 | 개인 평가 결과 확인 | `/consultant/performance` |
| 피드백 확인 | QC 평가 및 고객 후기 | `/consultant` |
| 주간 성과 | 이번 주 종합 리포트 | `/consultant` |

## 🛠️ 개발 가이드

### 새로운 컴포넌트 추가
```tsx
// src/components/NewComponent.tsx
'use client'

import { useState } from 'react'

interface NewComponentProps {
  // props 정의
}

export default function NewComponent({ }: NewComponentProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {/* 컴포넌트 내용 */}
    </div>
  )
}
```

### 스타일링 가이드라인
- **색상 팔레트**: Pink-Purple 그라데이션 기반
- **간격**: Tailwind의 4px 단위 사용
- **반응형**: Mobile-first 접근법
- **애니메이션**: `transition-all duration-300` 표준

### 상태 관리 패턴
```tsx
// 컴포넌트 상태
const [isLoading, setIsLoading] = useState(false)
const [data, setData] = useState<DataType[]>([])

// 이벤트 핸들러
const handleAction = async () => {
  setIsLoading(true)
  try {
    // 비즈니스 로직
  } finally {
    setIsLoading(false)
  }
}
```

## 🤝 기여하기

1. 이슈 생성 또는 기존 이슈 확인
2. 새 브랜치 생성: `git checkout -b feature/새기능`
3. 변경사항 커밋: `git commit -m 'feat: 새 기능 추가'`
4. 브랜치 푸시: `git push origin feature/새기능`
5. Pull Request 생성

### 커밋 컨벤션
- `feat:` 새 기능 추가
- `fix:` 버그 수정
- `docs:` 문서 수정
- `style:` 코드 스타일 변경
- `refactor:` 코드 리팩토링
- `test:` 테스트 추가/수정

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 제공됩니다.

---