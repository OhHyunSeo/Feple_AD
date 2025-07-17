import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');

    if (!sessionId) {
      return NextResponse.json(
        { error: 'sessionId parameter is required' },
        { status: 400 }
      );
    }

    console.log('🔄 conversation detail 데이터 조회 시작...', { sessionId });

    // counselor_evaluations와 analysis_results를 session_id로 조인
    const [evaluation, analysisResult] = await Promise.all([
      prisma.counselor_evaluations.findUnique({
        where: { session_id: sessionId }
      }),
      prisma.analysis_results.findUnique({
        where: { session_id: sessionId }
      })
    ]);

    if (!evaluation) {
      return NextResponse.json(
        { error: 'Evaluation not found for this session' },
        { status: 404 }
      );
    }

    console.log('✅ conversation detail 데이터 조회 성공!');

    // 프론트엔드에서 사용할 형태로 데이터 변환
    const conversationDetail = {
      no: sessionId,
      sessionId: sessionId,
      finalScore: evaluation.final_score || 0,
      courtesy: evaluation.politeness_grade || 'N/A',
      empathy: evaluation.empathy_grade || 'N/A',
      problemSolving: evaluation.problem_solving_grade || 'N/A',
      emotionalStability: evaluation.emotional_stability_grade || 'N/A',
      communicationFlow: evaluation.stability_grade || 'N/A',
      result: getResultFromScore(evaluation.final_score),
      
      // 상담 원문 데이터 (analysis_results에서)
      conversation: analysisResult?.transcript ? parseTranscript(analysisResult.transcript) : [],
      
      // 상담 요약 데이터 (counselor_evaluations에서)
      feedback: {
        strengths: parseGptFeedback(evaluation.gpt_feedback, 'strengths'),
        improvements: parseGptFeedback(evaluation.gpt_feedback, 'improvements'),
        coaching: parseGptFeedback(evaluation.gpt_feedback, 'coaching')
      },
      
      // 메트릭 데이터 (analysis_results에서)
      metrics: analysisResult?.metrics || null,
      
      // 오디오 관련 (현재는 없음)
      audioUrl: null,
      totalDuration: analysisResult?.transcript ? calculateTotalDuration(analysisResult.transcript) : 0,
      
      // 점수 상세 정보
      scores: {
        politeness: evaluation.politeness_score ? Number(evaluation.politeness_score) : 0,
        empathy: evaluation.empathy_score ? Number(evaluation.empathy_score) : 0,
        problemSolving: evaluation.problem_solving_score ? Number(evaluation.problem_solving_score) : 0,
        emotionalStability: evaluation.emotional_stability_score ? Number(evaluation.emotional_stability_score) : 0,
        stability: evaluation.stability_score ? Number(evaluation.stability_score) : 0
      }
    };

    return NextResponse.json(conversationDetail);
  } catch (error) {
    console.error('❌ conversation detail 조회 오류:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch conversation detail', 
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// 점수에 따른 결과 분류
function getResultFromScore(finalScore: number | null): string {
  if (!finalScore) return '미분류';
  
  if (finalScore >= 80) return '만족';
  if (finalScore >= 60) return '미흡';
  if (finalScore >= 40) return '추가 상담 필요';
  return '해결 불가';
}

// GPT 피드백 파싱
function parseGptFeedback(gptFeedback: string | null, type: 'strengths' | 'improvements' | 'coaching'): string[] {
  if (!gptFeedback) return [`${type} 데이터가 없습니다.`];
  
  try {
    // JSON 형태로 저장되어 있다고 가정
    const feedback = JSON.parse(gptFeedback);
    return feedback[type] || [`${type} 데이터가 없습니다.`];
  } catch {
    // JSON이 아닌 경우 전체 텍스트를 해당 타입으로 분류
    return [gptFeedback];
  }
}

// 대화 transcript 파싱
function parseTranscript(transcript: unknown): Array<{
  speaker: string;
  message: string;
  startTime: number;
  endTime?: number;
}> {
  if (!transcript) return [];
  
  try {
    let parsedData = transcript;
    
    // 문자열인 경우 JSON 파싱 시도
    if (typeof transcript === 'string') {
      try {
        parsedData = JSON.parse(transcript);
      } catch {
        // JSON 파싱 실패 시 텍스트 그대로 처리
        const lines = transcript.split('\n').filter(line => line.trim());
        return lines.map((line, index) => ({
          speaker: index % 2 === 0 ? '고객' : '상담사',
          message: line.trim(),
          startTime: index * 30,
          endTime: (index + 1) * 30
        }));
      }
    }
    
    // 배열 형태인 경우 (실제 transcript 구조)
    if (Array.isArray(parsedData)) {
      return parsedData.map((segment: Record<string, unknown>) => ({
        speaker: segment.speaker === 'Agent' ? '상담사' : 
                segment.speaker === 'Customer' ? '고객' : 
                (segment.speaker as string) || '상담사',
        message: (segment.text as string) || (segment.message as string) || '',
        startTime: (segment.start_time as number) || (segment.startTime as number) || 0,
        endTime: (segment.end_time as number) || (segment.endTime as number) || 0
      }));
    }
    
    // 객체 형태인 경우
    if (typeof parsedData === 'object' && parsedData !== null) {
      const dataObj = parsedData as Record<string, unknown>;
      
      // segments 프로퍼티가 있는 경우
      if (dataObj.segments && Array.isArray(dataObj.segments)) {
        return dataObj.segments.map((segment: Record<string, unknown>) => ({
          speaker: segment.speaker === 'Agent' ? '상담사' : 
                  segment.speaker === 'Customer' ? '고객' : 
                  (segment.speaker as string) || '상담사',
          message: (segment.text as string) || (segment.message as string) || '',
          startTime: (segment.start_time as number) || (segment.startTime as number) || 0,
          endTime: (segment.end_time as number) || (segment.endTime as number) || 0
        }));
      }
      
      // conversation 프로퍼티가 있는 경우
      if (dataObj.conversation && Array.isArray(dataObj.conversation)) {
        return dataObj.conversation.map((msg: Record<string, unknown>) => ({
          speaker: msg.speaker === 'Agent' ? '상담사' : 
                  msg.speaker === 'Customer' ? '고객' : 
                  (msg.speaker as string) || '상담사',
          message: (msg.message as string) || (msg.text as string) || '',
          startTime: (msg.startTime as number) || (msg.start_time as number) || 0,
          endTime: (msg.endTime as number) || (msg.end_time as number) || 0
        }));
      }
    }
    
    return [];
  } catch (error) {
    console.error('Transcript 파싱 오류:', error);
    return [{
      speaker: '시스템',
      message: 'transcript 데이터 파싱 중 오류가 발생했습니다.',
      startTime: 0
    }];
  }
}

// 총 대화 시간 계산
function calculateTotalDuration(transcript: unknown): number {
  try {
    const conversation = parseTranscript(transcript);
    if (conversation.length === 0) return 0;
    
    // 마지막 메시지의 endTime을 총 시간으로 사용
    const lastMessage = conversation[conversation.length - 1];
    return lastMessage.endTime || lastMessage.startTime || 0;
  } catch (error) {
    console.error('총 시간 계산 오류:', error);
    return 0;
  }
}