import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    console.log('🔄 Prisma로 상담사 데이터 조회 시작...');
    
    // Prisma로 consultants 테이블 조회
    const consultants = await prisma.consultant.findMany({
      take: 10,
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

    // Mock 데이터 형식에 맞게 변환
    const formattedConsultants = consultants.map(consultant => ({
      id: consultant.id,
      name: consultant.name,
      team: consultant.team?.name || '미배정',
      position: consultant.position,
      status: consultant.status.toLowerCase(),
      callsToday: Math.floor(Math.random() * 25) + 5,
      satisfactionScore: consultant.satisfactionScore || 0,
      rating: consultant.satisfactionScore || 0,
      evaluationCount: Math.floor(Math.random() * 200) + 50,
      completionRate: Math.floor(Math.random() * 20) + 80,
      trend: ['up', 'down', 'stable'][Math.floor(Math.random() * 3)],
      lastEvaluation: consultant.joinDate.toISOString().split('T')[0]
    }));

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