-- Feple Dashboard 시드 데이터 (안전 버전)
-- 기존 데이터를 삭제하지 않고 새로운 데이터만 추가
-- Supabase SQL Editor에서 실행하세요

-- 1. 팀 데이터 삽입 (중복 시 무시)
INSERT INTO teams (id, name, "memberCount", "leaderId", "createdAt", "updatedAt") VALUES
('cm6ksdrnd0001xyz001', '고객상담 1팀', 12, NULL, NOW(), NOW()),
('cm6ksdrnd0002xyz001', '고객상담 2팀', 15, NULL, NOW(), NOW()),
('cm6ksdrnd0003xyz001', '고객상담 3팀', 10, NULL, NOW(), NOW()),
('cm6ksdrnd0004xyz001', '기술지원팀', 8, NULL, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- 2. 사용자 데이터 삽입 (QC 관리자들) - 중복 시 무시
INSERT INTO users (id, email, name, role, phone, "createdAt", "updatedAt") VALUES
('cm6ksdrnd0005xyz001', 'kim.qc@company.com', '김QC', 'QC_MANAGER', '010-1111-1111', NOW(), NOW()),
('cm6ksdrnd0006xyz001', 'lee.qc@company.com', '이QC', 'QC_MANAGER', '010-2222-2222', NOW(), NOW()),
('cm6ksdrnd0007xyz001', 'park.qc@company.com', '박QC', 'QC_MANAGER', '010-3333-3333', NOW(), NOW()),
('cm6ksdrnd0008xyz001', 'choi.qc@company.com', '최QC', 'QC_MANAGER', '010-4444-4444', NOW(), NOW())
ON CONFLICT (email) DO NOTHING;

-- 3. 사용자 데이터 삽입 (상담사들) - 중복 시 무시
INSERT INTO users (id, email, name, role, phone, "createdAt", "updatedAt") VALUES
('cm6ksdrnd0009xyz001', 'kim.minsu@company.com', '김민수', 'CONSULTANT', '010-1234-5678', NOW(), NOW()),
('cm6ksdrnd0010xyz001', 'lee.younghee@company.com', '이영희', 'CONSULTANT', '010-2345-6789', NOW(), NOW()),
('cm6ksdrnd0011xyz001', 'park.sungho@company.com', '박성호', 'CONSULTANT', '010-3456-7890', NOW(), NOW()),
('cm6ksdrnd0012xyz001', 'choi.miyeon@company.com', '최미연', 'TEAM_LEAD', '010-4567-8901', NOW(), NOW()),
('cm6ksdrnd0013xyz001', 'lim.jiwon@company.com', '임지원', 'CONSULTANT', '010-5678-9012', NOW(), NOW()),
('cm6ksdrnd0014xyz001', 'jung.daeun@company.com', '정다은', 'CONSULTANT', '010-6789-0123', NOW(), NOW()),
('cm6ksdrnd0015xyz001', 'kang.hyunjun@company.com', '강현준', 'CONSULTANT', '010-7890-1234', NOW(), NOW()),
('cm6ksdrnd0016xyz001', 'han.sangwook@company.com', '한상욱', 'CONSULTANT', '010-8901-2345', NOW(), NOW()),
('cm6ksdrnd0017xyz001', 'song.yejin@company.com', '송예진', 'CONSULTANT', '010-9012-3456', NOW(), NOW()),
('cm6ksdrnd0018xyz001', 'yoon.jinho@company.com', '윤진호', 'CONSULTANT', '010-0123-4567', NOW(), NOW()),
('cm6ksdrnd0019xyz001', 'cho.eunsil@company.com', '조은실', 'CONSULTANT', '010-1234-5670', NOW(), NOW()),
('cm6ksdrnd0020xyz001', 'no.junseok@company.com', '노준석', 'CONSULTANT', '010-2345-6781', NOW(), NOW()),
('cm6ksdrnd0021xyz001', 'moon.jiho@company.com', '문지호', 'CONSULTANT', '010-3456-7892', NOW(), NOW()),
('cm6ksdrnd0022xyz001', 'seo.minjeong@company.com', '서민정', 'CONSULTANT', '010-4567-8903', NOW(), NOW()),
('cm6ksdrnd0023xyz001', 'cho.hyeonwoo@company.com', '조현우', 'CONSULTANT', '010-5678-9014', NOW(), NOW()),
('cm6ksdrnd0024xyz001', 'bae.sujin@company.com', '배수진', 'CONSULTANT', '010-6789-0125', NOW(), NOW()),
('cm6ksdrnd0025xyz001', 'kim.chulho@company.com', '김철호', 'CONSULTANT', '010-7890-1236', NOW(), NOW()),
('cm6ksdrnd0026xyz001', 'lee.sujeong@company.com', '이수정', 'CONSULTANT', '010-8901-2347', NOW(), NOW())
ON CONFLICT (email) DO NOTHING;

-- 4. 평가 카테고리 생성 - 중복 시 무시
INSERT INTO evaluation_categories (id, name, description, weight, "createdAt", "updatedAt") VALUES
('cm6ksdrnd0063xyz001', '공감적 소통', '고객과의 공감적 소통 능력', 1.0, NOW(), NOW()),
('cm6ksdrnd0064xyz001', '정중함', '고객에 대한 정중한 태도', 1.0, NOW(), NOW()),
('cm6ksdrnd0065xyz001', '문제 해결', '고객 문제 해결 능력', 1.2, NOW(), NOW()),
('cm6ksdrnd0066xyz001', '감정 안정성', '상담 중 감정 안정성 유지', 1.0, NOW(), NOW()),
('cm6ksdrnd0067xyz001', '대화 흐름', '자연스러운 대화 흐름 유지', 0.8, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- 5. 상담사 데이터 삽입 - 중복 시 무시
INSERT INTO consultants (id, "userId", "employeeId", name, email, position, status, "teamId", "satisfactionScore", "joinDate", "createdAt", "updatedAt") VALUES
('cm6ksdrnd0027xyz001', 'cm6ksdrnd0009xyz001', 'C001', '김민수', 'kim.minsu@company.com', '선임 상담사', 'ACTIVE', 'cm6ksdrnd0001xyz001', 4.8, NOW(), NOW(), NOW()),
('cm6ksdrnd0028xyz001', 'cm6ksdrnd0010xyz001', 'C002', '이영희', 'lee.younghee@company.com', '상담사', 'ACTIVE', 'cm6ksdrnd0002xyz001', 4.5, NOW(), NOW(), NOW()),
('cm6ksdrnd0029xyz001', 'cm6ksdrnd0011xyz001', 'C003', '박성호', 'park.sungho@company.com', '상담사', 'ACTIVE', 'cm6ksdrnd0001xyz001', 4.2, NOW(), NOW(), NOW()),
('cm6ksdrnd0030xyz001', 'cm6ksdrnd0012xyz001', 'C004', '최미연', 'choi.miyeon@company.com', '팀장', 'ACTIVE', 'cm6ksdrnd0003xyz001', 4.9, NOW(), NOW(), NOW()),
('cm6ksdrnd0031xyz001', 'cm6ksdrnd0013xyz001', 'C005', '임지원', 'lim.jiwon@company.com', '상담사', 'BREAK', 'cm6ksdrnd0001xyz001', 4.5, NOW(), NOW(), NOW()),
('cm6ksdrnd0032xyz001', 'cm6ksdrnd0014xyz001', 'C006', '정다은', 'jung.daeun@company.com', '상담사', 'ACTIVE', 'cm6ksdrnd0002xyz001', 4.3, NOW(), NOW(), NOW()),
('cm6ksdrnd0033xyz001', 'cm6ksdrnd0015xyz001', 'C007', '강현준', 'kang.hyunjun@company.com', '선임 상담사', 'ACTIVE', 'cm6ksdrnd0002xyz001', 4.7, NOW(), NOW(), NOW()),
('cm6ksdrnd0034xyz001', 'cm6ksdrnd0016xyz001', 'C008', '한상욱', 'han.sangwook@company.com', '상담사', 'ACTIVE', 'cm6ksdrnd0003xyz001', 4.4, NOW(), NOW(), NOW()),
('cm6ksdrnd0035xyz001', 'cm6ksdrnd0017xyz001', 'C009', '송예진', 'song.yejin@company.com', '상담사', 'BREAK', 'cm6ksdrnd0003xyz001', 4.6, NOW(), NOW(), NOW()),
('cm6ksdrnd0036xyz001', 'cm6ksdrnd0018xyz001', 'C010', '윤진호', 'yoon.jinho@company.com', '기술지원', 'ACTIVE', 'cm6ksdrnd0004xyz001', 4.8, NOW(), NOW(), NOW()),
('cm6ksdrnd0037xyz001', 'cm6ksdrnd0019xyz001', 'C011', '조은실', 'cho.eunsil@company.com', '기술지원', 'ACTIVE', 'cm6ksdrnd0004xyz001', 4.5, NOW(), NOW(), NOW()),
('cm6ksdrnd0038xyz001', 'cm6ksdrnd0020xyz001', 'C012', '노준석', 'no.junseok@company.com', '상담사', 'ACTIVE', 'cm6ksdrnd0001xyz001', 3.2, NOW(), NOW(), NOW()),
('cm6ksdrnd0039xyz001', 'cm6ksdrnd0021xyz001', 'C015', '문지호', 'moon.jiho@company.com', '상담사', 'ACTIVE', 'cm6ksdrnd0001xyz001', 4.1, NOW(), NOW(), NOW()),
('cm6ksdrnd0040xyz001', 'cm6ksdrnd0022xyz001', 'C016', '서민정', 'seo.minjeong@company.com', '선임 상담사', 'ACTIVE', 'cm6ksdrnd0002xyz001', 4.4, NOW(), NOW(), NOW()),
('cm6ksdrnd0041xyz001', 'cm6ksdrnd0023xyz001', 'C017', '조현우', 'cho.hyeonwoo@company.com', '기술지원', 'ACTIVE', 'cm6ksdrnd0004xyz001', 4.3, NOW(), NOW(), NOW()),
('cm6ksdrnd0042xyz001', 'cm6ksdrnd0024xyz001', 'C018', '배수진', 'bae.sujin@company.com', '상담사', 'ACTIVE', 'cm6ksdrnd0003xyz001', 4.0, NOW(), NOW(), NOW()),
('cm6ksdrnd0043xyz001', 'cm6ksdrnd0025xyz001', 'C013', '김철호', 'kim.chulho@company.com', '상담사', 'ACTIVE', 'cm6ksdrnd0002xyz001', 3.8, NOW(), NOW(), NOW()),
('cm6ksdrnd0044xyz001', 'cm6ksdrnd0026xyz001', 'C014', '이수정', 'lee.sujeong@company.com', '기술지원', 'ACTIVE', 'cm6ksdrnd0004xyz001', 4.2, NOW(), NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- 6. 일일 통계 데이터 삽입 - 중복 시 무시
INSERT INTO daily_stats (id, "consultantId", date, "callsCompleted", "avgCallDuration", "satisfactionScore", "resolvedIssues", "createdAt", "updatedAt") VALUES
('cm6ksdrnd0045xyz001', 'cm6ksdrnd0027xyz001', CURRENT_DATE, 23, 7.5, 4.8, 21, NOW(), NOW()),
('cm6ksdrnd0046xyz001', 'cm6ksdrnd0028xyz001', CURRENT_DATE, 20, 6.2, 4.5, 18, NOW(), NOW()),
('cm6ksdrnd0047xyz001', 'cm6ksdrnd0029xyz001', CURRENT_DATE, 18, 8.1, 4.2, 16, NOW(), NOW()),
('cm6ksdrnd0048xyz001', 'cm6ksdrnd0030xyz001', CURRENT_DATE, 12, 5.8, 4.9, 11, NOW(), NOW()),
('cm6ksdrnd0049xyz001', 'cm6ksdrnd0031xyz001', CURRENT_DATE, 15, 7.2, 4.5, 14, NOW(), NOW()),
('cm6ksdrnd0050xyz001', 'cm6ksdrnd0032xyz001', CURRENT_DATE, 16, 6.8, 4.3, 14, NOW(), NOW()),
('cm6ksdrnd0051xyz001', 'cm6ksdrnd0033xyz001', CURRENT_DATE, 25, 9.1, 4.7, 23, NOW(), NOW()),
('cm6ksdrnd0052xyz001', 'cm6ksdrnd0034xyz001', CURRENT_DATE, 19, 7.4, 4.4, 17, NOW(), NOW()),
('cm6ksdrnd0053xyz001', 'cm6ksdrnd0035xyz001', CURRENT_DATE, 14, 6.5, 4.6, 13, NOW(), NOW()),
('cm6ksdrnd0054xyz001', 'cm6ksdrnd0036xyz001', CURRENT_DATE, 8, 5.2, 4.8, 7, NOW(), NOW()),
('cm6ksdrnd0055xyz001', 'cm6ksdrnd0037xyz001', CURRENT_DATE, 10, 6.0, 4.5, 9, NOW(), NOW()),
('cm6ksdrnd0056xyz001', 'cm6ksdrnd0038xyz001', CURRENT_DATE, 12, 8.5, 3.2, 11, NOW(), NOW()),
('cm6ksdrnd0057xyz001', 'cm6ksdrnd0039xyz001', CURRENT_DATE, 20, 7.8, 4.1, 18, NOW(), NOW()),
('cm6ksdrnd0058xyz001', 'cm6ksdrnd0040xyz001', CURRENT_DATE, 22, 6.9, 4.4, 20, NOW(), NOW()),
('cm6ksdrnd0059xyz001', 'cm6ksdrnd0041xyz001', CURRENT_DATE, 18, 7.3, 4.3, 16, NOW(), NOW()),
('cm6ksdrnd0060xyz001', 'cm6ksdrnd0042xyz001', CURRENT_DATE, 15, 6.7, 4.0, 14, NOW(), NOW()),
('cm6ksdrnd0061xyz001', 'cm6ksdrnd0043xyz001', CURRENT_DATE, 16, 8.2, 3.8, 14, NOW(), NOW()),
('cm6ksdrnd0062xyz001', 'cm6ksdrnd0044xyz001', CURRENT_DATE, 17, 7.1, 4.2, 15, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- 7. 점검 추천 데이터 생성 - 중복 시 무시
INSERT INTO inspections (id, "consultantId", "qcManagerId", "inspectionDate", "daysSinceInspection", "recommendationReason", priority, completed, "createdAt", "updatedAt") VALUES
('cm6ksdrnd0068xyz001', 'cm6ksdrnd0039xyz001', 'cm6ksdrnd0005xyz001', '2024-11-15', 38, '정기 점검 주기 초과', 'HIGH', false, NOW(), NOW()),
('cm6ksdrnd0069xyz001', 'cm6ksdrnd0040xyz001', 'cm6ksdrnd0006xyz001', '2024-12-01', 22, '성과 개선 모니터링', 'MEDIUM', false, NOW(), NOW()),
('cm6ksdrnd0070xyz001', 'cm6ksdrnd0041xyz001', 'cm6ksdrnd0007xyz001', '2024-10-28', 56, '장기 미점검', 'HIGH', false, NOW(), NOW()),
('cm6ksdrnd0071xyz001', 'cm6ksdrnd0042xyz001', 'cm6ksdrnd0008xyz001', '2024-12-10', 13, '신규 교육 후 점검', 'LOW', false, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- 8. 평가 데이터 생성 (위험 상담사들) - 중복 시 무시
INSERT INTO evaluations (id, "consultantId", "qcManagerId", "evaluationDate", "finalScore", result, "createdAt", "updatedAt") VALUES
('cm6ksdrnd0072xyz001', 'cm6ksdrnd0038xyz001', 'cm6ksdrnd0005xyz001', '2024-12-23 14:30:00', 65, 'FAIL', NOW(), NOW()),
('cm6ksdrnd0073xyz001', 'cm6ksdrnd0043xyz001', 'cm6ksdrnd0006xyz001', '2024-12-23 13:15:00', 58, 'FAIL', NOW(), NOW()),
('cm6ksdrnd0074xyz001', 'cm6ksdrnd0044xyz001', 'cm6ksdrnd0007xyz001', '2024-12-23 12:45:00', 62, 'FAIL', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- 9. 카테고리별 점수 생성 - 중복 시 무시
INSERT INTO category_scores (id, "evaluationId", "evaluationCategoryId", grade, score, severity, "createdAt", "updatedAt") VALUES
-- 노준석 평가
('cm6ksdrnd0075xyz001', 'cm6ksdrnd0072xyz001', 'cm6ksdrnd0063xyz001', 'F', 45, 'CRITICAL', NOW(), NOW()),
('cm6ksdrnd0076xyz001', 'cm6ksdrnd0072xyz001', 'cm6ksdrnd0064xyz001', 'G', 55, 'HIGH', NOW(), NOW()),
-- 김철호 평가
('cm6ksdrnd0077xyz001', 'cm6ksdrnd0073xyz001', 'cm6ksdrnd0065xyz001', 'F', 42, 'CRITICAL', NOW(), NOW()),
-- 이수정 평가
('cm6ksdrnd0078xyz001', 'cm6ksdrnd0074xyz001', 'cm6ksdrnd0066xyz001', 'G', 58, 'HIGH', NOW(), NOW()),
('cm6ksdrnd0079xyz001', 'cm6ksdrnd0074xyz001', 'cm6ksdrnd0067xyz001', 'F', 48, 'CRITICAL', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- 10. 위험 알림 생성 - 중복 시 무시
INSERT INTO risk_alerts (id, "consultantId", "evaluationId", severity, "actionRequired", resolved, "createdAt", "updatedAt") VALUES
('cm6ksdrnd0080xyz001', 'cm6ksdrnd0038xyz001', 'cm6ksdrnd0072xyz001', 'CRITICAL', true, false, NOW(), NOW()),
('cm6ksdrnd0081xyz001', 'cm6ksdrnd0043xyz001', 'cm6ksdrnd0073xyz001', 'CRITICAL', true, false, NOW(), NOW()),
('cm6ksdrnd0082xyz001', 'cm6ksdrnd0044xyz001', 'cm6ksdrnd0074xyz001', 'HIGH', true, false, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- 완료 메시지
SELECT '🎉 Feple Dashboard 안전 시드 데이터 삽입 완료!' as message; 