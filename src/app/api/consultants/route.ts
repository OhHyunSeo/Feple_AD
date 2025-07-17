import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    console.log('🔄 Prisma로 상담사 데이터 조회 시작...');
    
    // Prisma로 consultants 테이블 조회 - 모든 상담사 조회
    const consultants = await prisma.consultant.findMany({
      include: {
        team: {
          select: {
            name: true
          }
        },
        user: {
          select: {
            name: true,
            email: true
          }
        }
      }
    });

    console.log(`✅ Prisma로 ${consultants.length}명의 상담사 데이터 조회 성공!`);

    // 성능 최적화를 위해 배치 쿼리 사용
    const consultantIds = consultants.map(c => c.id);
    
    // 모든 상담사의 평가 데이터 한 번에 조회
    const evaluations = await prisma.evaluation.findMany({
      where: { consultantId: { in: consultantIds } },
      select: {
        consultantId: true,
        finalScore: true,
        result: true,
        evaluationDate: true
      }
    });

    // 오늘 통화 데이터 한 번에 조회
    const today = new Date();
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const todayEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    
    const todayStats = await prisma.dailyStats.findMany({
      where: { 
        consultantId: { in: consultantIds },
        date: {
          gte: todayStart,
          lt: todayEnd
        }
      },
      select: { 
        consultantId: true,
        callsCompleted: true 
      }
    });

    // 각 상담사별로 데이터 계산
    const formattedConsultants = consultants.map(consultant => {
      const consultantEvaluations = evaluations.filter(e => e.consultantId === consultant.id);
      const consultantTodayStats = todayStats.find(s => s.consultantId === consultant.id);
      
      // 평가 횟수 계산
      const evaluationCount = consultantEvaluations.length;
      
      // 완료율 계산 (통과한 평가의 비율)
      const passedEvaluations = consultantEvaluations.filter(e => e.result === 'PASS').length;
      const completionRate = evaluationCount > 0 ? Math.round((passedEvaluations / evaluationCount) * 100) : 0;

      // 마지막 평가 날짜
      const lastEval = consultantEvaluations
        .sort((a, b) => new Date(b.evaluationDate).getTime() - new Date(a.evaluationDate).getTime())[0];

      // 트렌드 계산 (최근 7일 vs 이전 7일 평균 점수 비교)
      const now = Date.now();
      const recentEvals = consultantEvaluations.filter(e => 
        new Date(e.evaluationDate).getTime() > (now - 7 * 24 * 60 * 60 * 1000)
      );
      const previousEvals = consultantEvaluations.filter(e => {
        const evalTime = new Date(e.evaluationDate).getTime();
        return evalTime > (now - 14 * 24 * 60 * 60 * 1000) && evalTime <= (now - 7 * 24 * 60 * 60 * 1000);
      });

      let trend = 'stable';
      if (recentEvals.length > 0 && previousEvals.length > 0) {
        const recentAvg = recentEvals.reduce((sum, e) => sum + e.finalScore, 0) / recentEvals.length;
        const previousAvg = previousEvals.reduce((sum, e) => sum + e.finalScore, 0) / previousEvals.length;
        
        if (recentAvg > previousAvg) {
          trend = 'up';
        } else if (recentAvg < previousAvg) {
          trend = 'down';
        }
      }

      return {
        id: consultant.id,
        name: consultant.name,
        team: consultant.team?.name || '미배정',
        position: consultant.position,
        status: consultant.status.toLowerCase(),
        callsToday: consultantTodayStats?.callsCompleted || 0,
        satisfactionScore: consultant.satisfactionScore || 0,
        rating: consultant.satisfactionScore || 0,
        evaluationCount: evaluationCount,
        completionRate: completionRate,
        trend: trend,
        lastEvaluation: lastEval?.evaluationDate.toISOString().split('T')[0] || consultant.joinDate.toISOString().split('T')[0]
      };
    });

    return NextResponse.json(formattedConsultants);
  } catch (error) {
    console.error('❌ Prisma 조회 오류:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch consultants with Prisma', 
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}