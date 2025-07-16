# 🛠️ Mock 데이터 → Supabase 연동 가이드

## 1. 목표
- 기존 하드코딩(mockData.ts) 데이터를 **Supabase DB**에서 직접 불러와 대시보드에 표시
- Next.js API Route 또는 Server Component/Server Action을 통해 데이터 fetch

---

## 2. 진행 순서

### 1) Supabase 테이블 구조 확인
- 기존 mock 데이터(예: `Consultant`)와 동일한 구조로 Supabase에 테이블 생성
- 예시: `consultants` 테이블 (id, name, team, position, status, ...)

### 2) Supabase Client 준비
- 이미 `src/lib/supabaseClient.ts`에서 클라이언트 생성됨  
  (환경변수: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`)

### 3) API Route 또는 Server Component 작성
- **권장 1: Next.js API Route**  
  - `src/app/api/consultants/route.ts` 생성  
  - 예시:
    ```ts
    // src/app/api/consultants/route.ts
    import { NextResponse } from 'next/server';
    import { supabase } from '@/lib/supabaseClient';

    export async function GET() {
      const { data, error } = await supabase.from('consultants').select('*');
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
      return NextResponse.json(data);
    }
    ```
- **권장 2: Server Component/Action에서 직접 fetch**  
  - 예시:
    ```ts
    // src/app/consultants/page.tsx
    import { supabase } from '@/lib/supabaseClient';

    export default async function ConsultantsPage() {
      const { data } = await supabase.from('consultants').select('*');
      // ...data를 컴포넌트에 전달
    }
    ```

### 4) 프론트엔드에서 mockData → API 데이터로 교체
- 기존 컴포넌트(`ConsultantTable`, `EvaluationChart` 등)에서  
  `mockConsultants` 등 mock import 제거
- **API fetch 코드로 교체**  
  - 예시 (Client Component):
    ```ts
    // useEffect + fetch 사용 예시
    const [consultants, setConsultants] = useState([]);
    useEffect(() => {
      fetch('/api/consultants')
        .then(res => res.json())
        .then(setConsultants);
    }, []);
    ```
  - 또는 Server Component에서 직접 Supabase 호출

### 5) 타입/에러 처리
- Supabase에서 내려오는 데이터 타입이 기존 mock 타입과 일치하는지 확인
- 필요시 타입 변환/매핑

### 6) mockData.ts 및 관련 코드 정리
- 더 이상 사용하지 않는 mock import/remove
- 테스트 후 정상 동작 확인

---

## 3. 예상 폴더/파일 구조

```
src/
├── app/
│   └── api/
│       └── consultants/
│           └── route.ts   # Supabase에서 데이터 fetch하는 API
├── lib/
│   └── supabaseClient.ts  # Supabase 클라이언트
├── components/
│   └── ConsultantTable.tsx # API 데이터로 렌더링
```

---

## 4. 확인/결정이 필요한 사항

- Supabase 테이블/컬럼 구조가 mock 데이터와 100% 일치하는지?
- 인증/권한(예: 로그인 사용자별 데이터 제한)이 필요한지?
- 실시간 업데이트(예: onSnapshot, subscribe 등)가 필요한지?
- 대량 데이터/페이징/필터링 등 추가 요구사항이 있는지?
- .

---

## 5. 참고

- Supabase 공식문서: https://supabase.com/docs
- Next.js API Routes: https://nextjs.org/docs/app/building-your-application/routing/router-handlers
- 기존 mockData.ts의 데이터 구조를 Supabase에 맞게 마이그레이션 필요

---

**진행 중 궁금한 점/결정이 필요한 사항이 생기면 언제든 질문해 주세요!** 