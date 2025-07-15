import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 시드 데이터 생성 시작...');

  // 1. 팀 데이터 생성
  const teams = await Promise.all([
    prisma.team.create({
      data: {
        name: '고객상담 1팀',
        memberCount: 12,
        leaderId: null, // 팀장은 나중에 설정
      },
    }),
    prisma.team.create({
      data: {
        name: '고객상담 2팀',
        memberCount: 15,
        leaderId: null,
      },
    }),
    prisma.team.create({
      data: {
        name: '고객상담 3팀',
        memberCount: 10,
        leaderId: null,
      },
    }),
    prisma.team.create({
      data: {
        name: '기술지원팀',
        memberCount: 8,
        leaderId: null,
      },
    }),
  ]);

  console.log('✅ 팀 데이터 생성 완료');

  // 2. 사용자 데이터 생성
  const users = await Promise.all([
    // QC 관리자들
    prisma.user.create({
      data: {
        email: 'kim.qc@company.com',
        name: '김QC',
        role: 'QC_MANAGER',
        phone: '010-1111-1111',
      },
    }),
    prisma.user.create({
      data: {
        email: 'lee.qc@company.com',
        name: '이QC',
        role: 'QC_MANAGER',
        phone: '010-2222-2222',
      },
    }),
    prisma.user.create({
      data: {
        email: 'park.qc@company.com',
        name: '박QC',
        role: 'QC_MANAGER',
        phone: '010-3333-3333',
      },
    }),
    prisma.user.create({
      data: {
        email: 'choi.qc@company.com',
        name: '최QC',
        role: 'QC_MANAGER',
        phone: '010-4444-4444',
      },
    }),
    // 상담사들
    prisma.user.create({
      data: {
        email: 'kim.minsu@company.com',
        name: '김민수',
        role: 'CONSULTANT',
        phone: '010-1234-5678',
      },
    }),
    prisma.user.create({
      data: {
        email: 'lee.younghee@company.com',
        name: '이영희',
        role: 'CONSULTANT',
        phone: '010-2345-6789',
      },
    }),
    prisma.user.create({
      data: {
        email: 'park.sungho@company.com',
        name: '박성호',
        role: 'CONSULTANT',
        phone: '010-3456-7890',
      },
    }),
    prisma.user.create({
      data: {
        email: 'choi.miyeon@company.com',
        name: '최미연',
        role: 'TEAM_LEAD',
        phone: '010-4567-8901',
      },
    }),
    prisma.user.create({
      data: {
        email: 'lim.jiwon@company.com',
        name: '임지원',
        role: 'CONSULTANT',
        phone: '010-5678-9012',
      },
    }),
    prisma.user.create({
      data: {
        email: 'jung.daeun@company.com',
        name: '정다은',
        role: 'CONSULTANT',
        phone: '010-6789-0123',
      },
    }),
    prisma.user.create({
      data: {
        email: 'kang.hyunjun@company.com',
        name: '강현준',
        role: 'CONSULTANT',
        phone: '010-7890-1234',
      },
    }),
    prisma.user.create({
      data: {
        email: 'han.sangwook@company.com',
        name: '한상욱',
        role: 'CONSULTANT',
        phone: '010-8901-2345',
      },
    }),
    prisma.user.create({
      data: {
        email: 'song.yejin@company.com',
        name: '송예진',
        role: 'CONSULTANT',
        phone: '010-9012-3456',
      },
    }),
    prisma.user.create({
      data: {
        email: 'yoon.jinho@company.com',
        name: '윤진호',
        role: 'CONSULTANT',
        phone: '010-0123-4567',
      },
    }),
    prisma.user.create({
      data: {
        email: 'cho.eunsil@company.com',
        name: '조은실',
        role: 'CONSULTANT',
        phone: '010-1234-5670',
      },
    }),
    prisma.user.create({
      data: {
        email: 'no.junseok@company.com',
        name: '노준석',
        role: 'CONSULTANT',
        phone: '010-2345-6781',
      },
    }),
    prisma.user.create({
      data: {
        email: 'moon.jiho@company.com',
        name: '문지호',
        role: 'CONSULTANT',
        phone: '010-3456-7892',
      },
    }),
    prisma.user.create({
      data: {
        email: 'seo.minjeong@company.com',
        name: '서민정',
        role: 'CONSULTANT',
        phone: '010-4567-8903',
      },
    }),
    prisma.user.create({
      data: {
        email: 'cho.hyeonwoo@company.com',
        name: '조현우',
        role: 'CONSULTANT',
        phone: '010-5678-9014',
      },
    }),
    prisma.user.create({
      data: {
        email: 'bae.sujin@company.com',
        name: '배수진',
        role: 'CONSULTANT',
        phone: '010-6789-0125',
      },
    }),
    prisma.user.create({
      data: {
        email: 'kim.chulho@company.com',
        name: '김철호',
        role: 'CONSULTANT',
        phone: '010-7890-1236',
      },
    }),
    prisma.user.create({
      data: {
        email: 'lee.sujeong@company.com',
        name: '이수정',
        role: 'CONSULTANT',
        phone: '010-8901-2347',
      },
    }),
  ]);

  console.log('✅ 사용자 데이터 생성 완료');

  // 3. 상담사 데이터 생성
  const consultants = await Promise.all([
    prisma.consultant.create({
      data: {
        userId: users[4].id, // 김민수
        employeeId: 'C001',
        name: '김민수',
        email: 'kim.minsu@company.com',
        position: '선임 상담사',
        status: 'ACTIVE',
        teamId: teams[0].id, // 고객상담 1팀
        satisfactionScore: 4.8,
      },
    }),
    prisma.consultant.create({
      data: {
        userId: users[5].id, // 이영희
        employeeId: 'C002',
        name: '이영희',
        email: 'lee.younghee@company.com',
        position: '상담사',
        status: 'ACTIVE',
        teamId: teams[1].id, // 고객상담 2팀
        satisfactionScore: 4.5,
      },
    }),
    prisma.consultant.create({
      data: {
        userId: users[6].id, // 박성호
        employeeId: 'C003',
        name: '박성호',
        email: 'park.sungho@company.com',
        position: '상담사',
        status: 'ACTIVE',
        teamId: teams[0].id, // 고객상담 1팀
        satisfactionScore: 4.2,
      },
    }),
    prisma.consultant.create({
      data: {
        userId: users[7].id, // 최미연
        employeeId: 'C004',
        name: '최미연',
        email: 'choi.miyeon@company.com',
        position: '팀장',
        status: 'ACTIVE',
        teamId: teams[2].id, // 고객상담 3팀
        satisfactionScore: 4.9,
      },
    }),
    prisma.consultant.create({
      data: {
        userId: users[8].id, // 임지원
        employeeId: 'C005',
        name: '임지원',
        email: 'lim.jiwon@company.com',
        position: '상담사',
        status: 'BREAK',
        teamId: teams[0].id, // 고객상담 1팀
        satisfactionScore: 4.5,
      },
    }),
    prisma.consultant.create({
      data: {
        userId: users[9].id, // 정다은
        employeeId: 'C006',
        name: '정다은',
        email: 'jung.daeun@company.com',
        position: '상담사',
        status: 'ACTIVE',
        teamId: teams[1].id, // 고객상담 2팀
        satisfactionScore: 4.3,
      },
    }),
    prisma.consultant.create({
      data: {
        userId: users[10].id, // 강현준
        employeeId: 'C007',
        name: '강현준',
        email: 'kang.hyunjun@company.com',
        position: '선임 상담사',
        status: 'ACTIVE',
        teamId: teams[1].id, // 고객상담 2팀
        satisfactionScore: 4.7,
      },
    }),
    prisma.consultant.create({
      data: {
        userId: users[11].id, // 한상욱
        employeeId: 'C008',
        name: '한상욱',
        email: 'han.sangwook@company.com',
        position: '상담사',
        status: 'ACTIVE',
        teamId: teams[2].id, // 고객상담 3팀
        satisfactionScore: 4.4,
      },
    }),
    prisma.consultant.create({
      data: {
        userId: users[12].id, // 송예진
        employeeId: 'C009',
        name: '송예진',
        email: 'song.yejin@company.com',
        position: '상담사',
        status: 'BREAK',
        teamId: teams[2].id, // 고객상담 3팀
        satisfactionScore: 4.6,
      },
    }),
    prisma.consultant.create({
      data: {
        userId: users[13].id, // 윤진호
        employeeId: 'C010',
        name: '윤진호',
        email: 'yoon.jinho@company.com',
        position: '기술지원',
        status: 'ACTIVE',
        teamId: teams[3].id, // 기술지원팀
        satisfactionScore: 4.8,
      },
    }),
    prisma.consultant.create({
      data: {
        userId: users[14].id, // 조은실
        employeeId: 'C011',
        name: '조은실',
        email: 'cho.eunsil@company.com',
        position: '기술지원',
        status: 'ACTIVE',
        teamId: teams[3].id, // 기술지원팀
        satisfactionScore: 4.5,
      },
    }),
    prisma.consultant.create({
      data: {
        userId: users[15].id, // 노준석
        employeeId: 'C012',
        name: '노준석',
        email: 'no.junseok@company.com',
        position: '상담사',
        status: 'ACTIVE',
        teamId: teams[0].id, // 고객상담 1팀
        satisfactionScore: 3.2,
      },
    }),
    prisma.consultant.create({
      data: {
        userId: users[16].id, // 문지호
        employeeId: 'C015',
        name: '문지호',
        email: 'moon.jiho@company.com',
        position: '상담사',
        status: 'ACTIVE',
        teamId: teams[0].id, // 고객상담 1팀
        satisfactionScore: 4.1,
      },
    }),
    prisma.consultant.create({
      data: {
        userId: users[17].id, // 서민정
        employeeId: 'C016',
        name: '서민정',
        email: 'seo.minjeong@company.com',
        position: '선임 상담사',
        status: 'ACTIVE',
        teamId: teams[1].id, // 고객상담 2팀
        satisfactionScore: 4.4,
      },
    }),
    prisma.consultant.create({
      data: {
        userId: users[18].id, // 조현우
        employeeId: 'C017',
        name: '조현우',
        email: 'cho.hyeonwoo@company.com',
        position: '기술지원',
        status: 'ACTIVE',
        teamId: teams[3].id, // 기술지원팀
        satisfactionScore: 4.3,
      },
    }),
    prisma.consultant.create({
      data: {
        userId: users[19].id, // 배수진
        employeeId: 'C018',
        name: '배수진',
        email: 'bae.sujin@company.com',
        position: '상담사',
        status: 'ACTIVE',
        teamId: teams[2].id, // 고객상담 3팀
        satisfactionScore: 4.0,
      },
    }),
    prisma.consultant.create({
      data: {
        userId: users[20].id, // 김철호
        employeeId: 'C013',
        name: '김철호',
        email: 'kim.chulho@company.com',
        position: '상담사',
        status: 'ACTIVE',
        teamId: teams[1].id, // 고객상담 2팀
        satisfactionScore: 3.8,
      },
    }),
    prisma.consultant.create({
      data: {
        userId: users[21].id, // 이수정
        employeeId: 'C014',
        name: '이수정',
        email: 'lee.sujeong@company.com',
        position: '기술지원',
        status: 'ACTIVE',
        teamId: teams[3].id, // 기술지원팀
        satisfactionScore: 4.2,
      },
    }),
  ]);

  console.log('✅ 상담사 데이터 생성 완료');

  // 4. 일일 통계 데이터 생성
  const today = new Date();
  const dailyStats = await Promise.all(
    consultants.map((consultant, index) => {
      const baseCallsToday = [23, 20, 18, 12, 15, 16, 25, 19, 14, 8, 10, 12, 20, 22, 18, 15, 16, 17][index] || 15;
      return prisma.dailyStats.create({
        data: {
          consultantId: consultant.id,
          date: today,
          callsCompleted: baseCallsToday,
          avgCallDuration: Math.random() * 10 + 5, // 5-15분
          satisfactionScore: consultant.satisfactionScore,
          resolvedIssues: Math.floor(baseCallsToday * 0.9), // 90% 해결률
        },
      });
    })
  );

  console.log('✅ 일일 통계 데이터 생성 완료');

  // 5. 평가 카테고리 생성
  const evaluationCategories = await Promise.all([
    prisma.evaluationCategory.create({
      data: {
        name: '공감적 소통',
        description: '고객과의 공감적 소통 능력',
        weight: 1.0,
      },
    }),
    prisma.evaluationCategory.create({
      data: {
        name: '정중함',
        description: '고객에 대한 정중한 태도',
        weight: 1.0,
      },
    }),
    prisma.evaluationCategory.create({
      data: {
        name: '문제 해결',
        description: '고객 문제 해결 능력',
        weight: 1.2,
      },
    }),
    prisma.evaluationCategory.create({
      data: {
        name: '감정 안정성',
        description: '상담 중 감정 안정성 유지',
        weight: 1.0,
      },
    }),
    prisma.evaluationCategory.create({
      data: {
        name: '대화 흐름',
        description: '자연스러운 대화 흐름 유지',
        weight: 0.8,
      },
    }),
  ]);

  console.log('✅ 평가 카테고리 생성 완료');

  // 6. 점검 추천 데이터 생성
  const inspections = await Promise.all([
    prisma.inspection.create({
      data: {
        consultantId: consultants[12].id, // 문지호
        qcManagerId: users[0].id, // 김QC
        inspectionDate: new Date('2024-11-15'),
        daysSinceInspection: 38,
        recommendationReason: '정기 점검 주기 초과',
        priority: 'HIGH',
        completed: false,
      },
    }),
    prisma.inspection.create({
      data: {
        consultantId: consultants[13].id, // 서민정
        qcManagerId: users[1].id, // 이QC
        inspectionDate: new Date('2024-12-01'),
        daysSinceInspection: 22,
        recommendationReason: '성과 개선 모니터링',
        priority: 'MEDIUM',
        completed: false,
      },
    }),
    prisma.inspection.create({
      data: {
        consultantId: consultants[14].id, // 조현우
        qcManagerId: users[2].id, // 박QC
        inspectionDate: new Date('2024-10-28'),
        daysSinceInspection: 56,
        recommendationReason: '장기 미점검',
        priority: 'HIGH',
        completed: false,
      },
    }),
    prisma.inspection.create({
      data: {
        consultantId: consultants[15].id, // 배수진
        qcManagerId: users[3].id, // 최QC
        inspectionDate: new Date('2024-12-10'),
        daysSinceInspection: 13,
        recommendationReason: '신규 교육 후 점검',
        priority: 'LOW',
        completed: false,
      },
    }),
  ]);

  console.log('✅ 점검 추천 데이터 생성 완료');

  // 7. 평가 데이터 생성 (위험 상담사들)
  const evaluations = await Promise.all([
    prisma.evaluation.create({
      data: {
        consultantId: consultants[11].id, // 노준석
        qcManagerId: users[0].id, // 김QC
        evaluationDate: new Date('2024-12-23T14:30:00'),
        finalScore: 65,
        result: 'FAIL',
      },
    }),
    prisma.evaluation.create({
      data: {
        consultantId: consultants[16].id, // 김철호
        qcManagerId: users[1].id, // 이QC
        evaluationDate: new Date('2024-12-23T13:15:00'),
        finalScore: 58,
        result: 'FAIL',
      },
    }),
    prisma.evaluation.create({
      data: {
        consultantId: consultants[17].id, // 이수정
        qcManagerId: users[2].id, // 박QC
        evaluationDate: new Date('2024-12-23T12:45:00'),
        finalScore: 62,
        result: 'FAIL',
      },
    }),
  ]);

  console.log('✅ 평가 데이터 생성 완료');

  // 8. 카테고리별 점수 및 위험 알림 생성
  const categoryScores = await Promise.all([
    // 노준석 평가
    prisma.categoryScore.create({
      data: {
        evaluationId: evaluations[0].id,
        evaluationCategoryId: evaluationCategories[0].id, // 공감적 소통
        grade: 'F',
        score: 45,
        severity: 'CRITICAL',
      },
    }),
    prisma.categoryScore.create({
      data: {
        evaluationId: evaluations[0].id,
        evaluationCategoryId: evaluationCategories[1].id, // 정중함
        grade: 'G',
        score: 55,
        severity: 'HIGH',
      },
    }),
    // 김철호 평가
    prisma.categoryScore.create({
      data: {
        evaluationId: evaluations[1].id,
        evaluationCategoryId: evaluationCategories[2].id, // 문제 해결
        grade: 'F',
        score: 42,
        severity: 'CRITICAL',
      },
    }),
    // 이수정 평가
    prisma.categoryScore.create({
      data: {
        evaluationId: evaluations[2].id,
        evaluationCategoryId: evaluationCategories[3].id, // 감정 안정성
        grade: 'G',
        score: 58,
        severity: 'HIGH',
      },
    }),
    prisma.categoryScore.create({
      data: {
        evaluationId: evaluations[2].id,
        evaluationCategoryId: evaluationCategories[4].id, // 대화 흐름
        grade: 'F',
        score: 48,
        severity: 'CRITICAL',
      },
    }),
  ]);

  // 9. 위험 알림 생성
  const riskAlerts = await Promise.all([
    prisma.riskAlert.create({
      data: {
        consultantId: consultants[11].id, // 노준석
        evaluationId: evaluations[0].id,
        severity: 'CRITICAL',
        actionRequired: true,
        resolved: false,
      },
    }),
    prisma.riskAlert.create({
      data: {
        consultantId: consultants[16].id, // 김철호
        evaluationId: evaluations[1].id,
        severity: 'CRITICAL',
        actionRequired: true,
        resolved: false,
      },
    }),
    prisma.riskAlert.create({
      data: {
        consultantId: consultants[17].id, // 이수정
        evaluationId: evaluations[2].id,
        severity: 'HIGH',
        actionRequired: true,
        resolved: false,
      },
    }),
  ]);

  console.log('✅ 위험 알림 데이터 생성 완료');

  console.log('🎉 시드 데이터 생성 완료!');
  console.log(`📊 생성된 데이터:`);
  console.log(`- 팀: ${teams.length}개`);
  console.log(`- 사용자: ${users.length}명`);
  console.log(`- 상담사: ${consultants.length}명`);
  console.log(`- 일일 통계: ${dailyStats.length}개`);
  console.log(`- 평가 카테고리: ${evaluationCategories.length}개`);
  console.log(`- 점검 추천: ${inspections.length}개`);
  console.log(`- 평가: ${evaluations.length}개`);
  console.log(`- 위험 알림: ${riskAlerts.length}개`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  }); 