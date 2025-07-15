# Feple Dashboard

Feple Dashboard는 고객 상담사 평가 및 관리를 위한 대시보드 시스템입니다.

## 🚀 기술 스택

- **프론트엔드**: Next.js 15.3.5, React 19, TypeScript
- **스타일링**: Tailwind CSS, Radix UI
- **차트**: Recharts
- **아이콘**: Lucide React
- **백엔드**: Supabase (추가 예정)
- **ORM**: Prisma (추가 예정)

## 📋 Supabase + Prisma ORM 도입 계획

### 1단계: 환경 설정 및 패키지 설치

#### 1.1 필요한 패키지 설치
```bash
# Supabase 관련 패키지
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs @supabase/auth-ui-react @supabase/auth-ui-shared

# Prisma 관련 패키지
npm install prisma @prisma/client
npm install -D prisma

# 인증 및 보안 관련
npm install jose
npm install bcryptjs
npm install -D @types/bcryptjs

# 환경변수 관리
npm install dotenv
```

#### 1.2 환경변수 설정
```env
# .env.local
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
DATABASE_URL=your_database_url
```

### 2단계: 데이터베이스 스키마 설계

#### 2.1 주요 테이블 구조
- **users**: 사용자 정보 (관리자, QC 담당자)
- **teams**: 팀 정보
- **consultants**: 상담사 정보
- **evaluations**: 평가 정보
- **evaluation_categories**: 평가 카테고리
- **performance_metrics**: 성과 지표
- **inspections**: 점검 기록
- **risk_alerts**: 위험 알림

#### 2.2 Prisma 스키마 파일 생성
```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String
  role      UserRole @default(ADMIN)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Team {
  id          String       @id @default(cuid())
  name        String
  leaderId    String?
  memberCount Int          @default(0)
  consultants Consultant[]
  createdAt   DateTime     @default(now())
  updatedAt   DateTime     @updatedAt
}

model Consultant {
  id                String       @id @default(cuid())
  name              String
  email             String       @unique
  position          String
  status            ConsultantStatus @default(ACTIVE)
  teamId            String
  team              Team         @relation(fields: [teamId], references: [id])
  satisfactionScore Float        @default(0)
  evaluations       Evaluation[]
  inspections       Inspection[]
  riskAlerts        RiskAlert[]
  createdAt         DateTime     @default(now())
  updatedAt         DateTime     @updatedAt
}

// 추가 모델들...
```

### 3단계: 인증 시스템 구현

#### 3.1 Supabase 클라이언트 설정
```typescript
// lib/supabase/client.ts
// lib/supabase/server.ts
// 클라이언트 및 서버 사이드 Supabase 클라이언트 설정
```

#### 3.2 인증 미들웨어 구현
```typescript
// middleware.ts
// 인증 확인 및 리다이렉션 로직
```

#### 3.3 로그인/회원가입 페이지 구현
```typescript
// app/auth/login/page.tsx
// app/auth/signup/page.tsx
// 인증 UI 컴포넌트
```

### 4단계: 데이터베이스 연동

#### 4.1 Prisma 클라이언트 설정
```typescript
// lib/prisma.ts
// Prisma 클라이언트 싱글톤 설정
```

#### 4.2 API 라우트 구현
```typescript
// app/api/consultants/route.ts
// app/api/teams/route.ts
// app/api/evaluations/route.ts
// REST API 엔드포인트
```

#### 4.3 데이터 액세스 레이어
```typescript
// lib/database/consultants.ts
// lib/database/teams.ts
// lib/database/evaluations.ts
// 데이터베이스 쿼리 함수들
```

### 5단계: 기존 목데이터 마이그레이션

#### 5.1 시드 데이터 생성
```typescript
// prisma/seed.ts
// 기존 목데이터를 데이터베이스에 삽입
```

#### 5.2 데이터 마이그레이션 스크립트
```bash
# 데이터베이스 마이그레이션 실행
npx prisma migrate dev --name init
npx prisma db seed
```

### 6단계: 프론트엔드 연동

#### 6.1 React Query/SWR 도입 (선택사항)
```bash
npm install @tanstack/react-query
# 또는
npm install swr
```

#### 6.2 커스텀 훅 구현
```typescript
// hooks/useConsultants.ts
// hooks/useTeams.ts
// hooks/useEvaluations.ts
// 데이터 페칭 훅
```

#### 6.3 기존 컴포넌트 수정
- 정적 데이터를 API 호출로 변경
- 로딩 상태 및 에러 처리 추가
- 실시간 업데이트 구현

### 7단계: 보안 및 최적화

#### 7.1 Row Level Security (RLS) 설정
```sql
-- Supabase RLS 정책 설정
ALTER TABLE consultants ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view consultants" ON consultants FOR SELECT USING (true);
```

#### 7.2 타입 안전성 강화
```typescript
// types/database.ts
// Prisma 타입 확장 및 커스텀 타입 정의
```

### 8단계: 테스트 및 배포

#### 8.1 개발 환경 설정
```bash
# 개발 서버 실행
npm run dev

# 데이터베이스 스키마 확인
npx prisma studio
```

#### 8.2 프로덕션 배포
```bash
# 프로덕션 빌드
npm run build

# 데이터베이스 마이그레이션 (프로덕션)
npx prisma migrate deploy
```

## 📂 예상 프로젝트 구조

```
src/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   ├── consultants/
│   │   ├── teams/
│   │   └── evaluations/
│   ├── auth/
│   │   ├── login/
│   │   └── signup/
│   └── (existing pages)
├── lib/
│   ├── supabase/
│   ├── database/
│   ├── auth/
│   └── prisma.ts
├── hooks/
├── types/
└── prisma/
    ├── schema.prisma
    ├── migrations/
    └── seed.ts
```

## 🔧 개발 시작하기

```bash
# 의존성 설치
npm install

# 환경변수 설정
cp .env.example .env.local

# 데이터베이스 마이그레이션
npx prisma migrate dev

# 시드 데이터 삽입
npx prisma db seed

# 개발 서버 실행
npm run dev
```

## 📝 작업 순서

1. **환경 설정**: 패키지 설치 및 환경변수 설정
2. **데이터베이스 설계**: Prisma 스키마 작성
3. **인증 시스템**: Supabase Auth 설정
4. **API 구현**: REST API 엔드포인트 작성
5. **데이터 마이그레이션**: 기존 목데이터 이전
6. **프론트엔드 연동**: 컴포넌트 수정 및 훅 구현
7. **테스트 및 최적화**: 성능 최적화 및 보안 강화

각 단계는 순차적으로 진행하며, 각 단계 완료 후 테스트를 통해 정상 작동을 확인합니다.

---

이 계획은 기존 프로젝트의 구조를 유지하면서 점진적으로 Supabase와 Prisma를 도입하는 것을 목표로 합니다.