# 📖 Supabase 테이블 ↔ 프론트엔드/페이지 매핑 가이드

## 1. consultants (상담사 정보)
- **주요 사용처**
  - `/consultants` (상담사 관리 페이지): 상담사 목록, 검색, 필터, 상세정보
  - `/qc` (QC 대시보드): 팀별 상담사 목록, 상태, 오늘 통화수 등
  - `/performance`, `/consultant/performance`: 부서/상담사 선택, 드롭다운, 통계
  - `ConsultantTable` 컴포넌트: 상담사 리스트 테이블
  - `useConsultants` 훅: 상담사 목록, 필터, 정렬 등
- **주요 프론트 필드**
  - id, name, position, status, teamId(→팀명 join), satisfactionScore, joinDate 등
  - callsToday, rating, evaluationCount, completionRate, trend, lastEvaluation 등은 별도 통계/이력 테이블에서 집계 필요

---

## 2. teams (팀 정보)
- **주요 사용처**
  - `/qc`, `/consultants`, `/performance` 등에서 부서/팀 드롭다운, 팀별 필터
  - 팀명, 팀장, 인원수 등 표시
- **주요 프론트 필드**
  - id, name, leaderId, memberCount 등

---

## 3. evaluations (상담 평가)
- **주요 사용처**
  - `/performance`, `/consultant/performance`, `/qc/performance`: 상담 세션별 평가 결과, 점수, 등급, 피드백
  - 상담사 상세/리포트 페이지: 평가 이력, 점수 변화, 상세 평가 내역
- **주요 프론트 필드**
  - id, consultantId, qcManagerId, evaluationDate, finalScore, result, feedback 등

---

## 4. session_data (상담 세션 데이터)
- **주요 사용처**
  - `/performance`, `/consultant/performance`, `/qc/performance`: 상담 세션별 상세 데이터(점수, 등급, 대화 흐름 등)
  - 상담 품질 분석, AI 분석 결과 표시
- **주요 프론트 필드**
  - id, consultantId, sessionDate, duration, finalScore, politeness, empathy, problemSolving, emotionalStability, conversationFlow, result 등

---

## 5. daily_stats, weekly_stats (상담사 일/주간 통계)
- **주요 사용처**
  - `/performance`, `/consultant/performance`: 상담사별 일/주간 통계(통화수, 평균 점수, 개선율 등)
  - 대시보드 통계 카드, 차트
- **주요 프론트 필드**
  - callsCompleted, avgCallDuration, satisfactionScore, resolvedIssues, totalCalls, avgSatisfaction, improvementRate, rankInTeam 등

---

## 6. risk_alerts (위험 알림)
- **주요 사용처**
  - `/qc`: 위험 등급 상담사 목록, 알림, 액션 필요 표시
  - 대시보드 위험 알림 카드/리스트
- **주요 프론트 필드**
  - id, consultantId, evaluationId, severity, actionRequired, resolved 등

---

## 7. inspections (점검 이력/추천)
- **주요 사용처**
  - `/qc`: 점검 추천 상담사, 점검 이력, 점검 사유, 우선순위 등 표시
- **주요 프론트 필드**
  - id, consultantId, qcManagerId, inspectionDate, daysSinceInspection, recommendationReason, priority, completed 등

---

## 8. users (유저/계정)
- **주요 사용처**
  - 로그인/인증, 역할(상담사/관리자/QC) 구분, 프로필 정보
  - 상담사-유저, QC-유저 매핑
- **주요 프론트 필드**
  - id, email, name, role, phone, avatar 등

---

## 9. 기타 테이블
- **analysis_results**: AI 분석 결과(메트릭, 전사 등) → 상담 세션 상세 분석, AI 리포트
- **category_scores, evaluation_categories, feedback**: 평가 항목별 점수, 카테고리, 피드백 → 평가 상세, 리포트
- **department_stats**: 부서별 통계 → 대시보드 부서별 차트/카드

---

# 🗂️ 전체 매핑 요약표

| Supabase 테이블      | 주요 사용 페이지/컴포넌트                       | 주요 프론트 필드/기능                |
|---------------------|------------------------------------------------|--------------------------------------|
| consultants         | /consultants, /qc, /performance, 테이블/훅      | 상담사 목록, 필터, 상세, 통계        |
| teams               | /qc, /consultants, /performance, 드롭다운       | 팀명, 팀장, 인원수                   |
| evaluations         | /performance, /consultant/performance, 리포트   | 평가 이력, 점수, 피드백              |
| session_data        | /performance, /consultant/performance, 분석     | 세션별 점수, 등급, 대화 흐름         |
| daily_stats         | /performance, 대시보드 카드/차트                | 일별 통계(통화수, 점수 등)           |
| weekly_stats        | /performance, 대시보드 카드/차트                | 주간 통계(개선율, 랭킹 등)           |
| risk_alerts         | /qc, 대시보드 위험 알림                         | 위험 상담사, 알림, 액션 필요          |
| inspections         | /qc, 점검 추천/이력                             | 점검 이력, 추천, 우선순위            |
| users               | 인증, 프로필, 역할 구분                         | 유저 정보, 역할                      |
| analysis_results    | 세션 상세, AI 분석 결과                         | AI 메트릭, 전사                      |
| category_scores     | 평가 상세, 리포트                               | 항목별 점수                          |
| evaluation_categories| 평가 항목 관리                                 | 평가 카테고리                        |
| feedback            | 평가 상세, 리포트                               | 피드백, 개선점, 코칭                 |
| department_stats    | 대시보드 부서별 통계                            | 부서별 통계                          |

---

# 📝 활용 가이드

- **신규 기능/페이지 개발 시**  
  → 위 표를 참고해 필요한 Supabase 테이블/필드를 빠르게 파악
- **API/쿼리 설계 시**  
  → 어떤 테이블에서 어떤 데이터를 어떻게 join/집계해야 하는지 참고
- **프론트엔드-백엔드 협업/문서화**  
  → 데이터 흐름, 매핑, 누락/불일치 체크에 활용

---

**이 README는 프로젝트 루트에 `supabase-frontend-mapping.md` 등으로 저장해두면  
온보딩, 유지보수, 협업에 큰 도움이 됩니다!**

필요하다면 각 테이블별 상세 쿼리 예시,  
또는 페이지별 데이터 흐름 다이어그램도 추가로 만들어드릴 수 있습니다.  
추가 요청이 있으면 말씀해 주세요! 