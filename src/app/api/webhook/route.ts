import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import type { TranscriptItem } from '@/context/AnalysisResultContext';
import { validateWebhook } from 'replicate';

// Replicate가 웹훅으로 보내는 데이터 타입
interface ReplicateWebhookPayload {
  id: string;
  status: 'succeeded' | 'failed' | 'canceled';
  output?: {
    metrics: {
      session_id: string;
      [key: string]: number | string;
    };
    transcript: TranscriptItem[];
  };
  error?: unknown;
}

export async function POST(request: Request) {
  try {
    // 웹훅 서명 검증
    const secret = process.env.REPLICATE_WEBHOOK_SIGNING_SECRET;
    if (!secret) {
      console.error("REPLICATE_WEBHOOK_SIGNING_SECRET 환경 변수가 설정되지 않았습니다.");
      return NextResponse.json({ message: "Invalid webhook signature" }, { status: 401 });
    }

    const isValid = await validateWebhook(request, secret);
    if (!isValid) {
      console.error("Invalid webhook signature received");
      return NextResponse.json({ message: "Invalid webhook signature" }, { status: 401 });
    }

    const payload = (await request.json()) as ReplicateWebhookPayload;
    console.log("Received valid webhook from Replicate:", payload);

    // 1. 분석이 성공적으로 완료된 경우에만 DB에 저장
    if (payload.status === "succeeded" && payload.output) {
      console.log("Analysis succeeded. Saving to Supabase...");

      const { metrics, transcript } = payload.output;

      try {
        // 2. Supabase 'analysis_results' 테이블에 결과 삽입
        const { error: dbError } = await supabase
          .from('analysis_results')
          .insert({ 
            session_id: metrics.session_id, 
            metrics: metrics,
            transcript: transcript,
          });

        if (dbError) {
          console.error("Database insert error:", dbError);
          // DB 저장 실패 시 에러 응답
          return NextResponse.json({ message: `Database error: ${dbError.message}` }, { status: 500 });
        }

        console.log(`Successfully saved analysis for session_id: ${metrics.session_id}`);

      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred during DB operation.';
        console.error(errorMessage);
        return NextResponse.json({ message: errorMessage }, { status: 500 });
      }
    } else if (payload.status === 'failed' || payload.status === 'canceled') {
      console.error(`Analysis ${payload.id} failed or was canceled. Error: ${payload.error}`);
      // TODO: 실패 상태도 DB에 기록할 수 있습니다.
    }

    // 3. Replicate에 성공적으로 웹훅을 수신했음을 알림
    return NextResponse.json({ message: 'Webhook received successfully' }, { status: 200 });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    console.error("Webhook processing error:", errorMessage);
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
