import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import type { TranscriptItem } from '@/context/AnalysisResultContext';

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
  console.log("🔔 WEBHOOK CALLED! Time:", new Date().toISOString());
  console.log("📍 Request URL:", request.url);
  console.log("🌐 Request headers:", Object.fromEntries(request.headers.entries()));
  
  let payload: ReplicateWebhookPayload;
  
  try {
    payload = (await request.json()) as ReplicateWebhookPayload;
    console.log("📦 Full webhook payload:", JSON.stringify(payload, null, 2));
  } catch (error) {
    console.error("❌ Failed to parse webhook payload:", error);
    return NextResponse.json({ message: 'Invalid JSON payload' }, { status: 400 });
  }

  // 1. 분석이 성공적으로 완료된 경우에만 DB에 저장
  if (payload.status === "succeeded" && payload.output) {
    console.log("✅ Analysis succeeded. Saving to Supabase...");

    const { metrics, transcript } = payload.output;
    
    console.log("🔍 Metrics:", JSON.stringify(metrics, null, 2));
    console.log("📝 Transcript length:", transcript?.length || 0);

    try {
      // 2. Supabase 'analysis_results' 테이블에 결과 삽입
      const { data, error: dbError } = await supabase
        .from('analysis_results')
        .insert({ 
          session_id: metrics.session_id, 
          metrics: metrics,
          transcript: transcript,
        })
        .select();

      if (dbError) {
        console.error("💥 Database error:", dbError);
        return NextResponse.json({ message: `Database error: ${dbError.message}` }, { status: 500 });
      }

      console.log("🎉 Successfully saved to Supabase!");
      console.log("💾 Inserted data:", JSON.stringify(data, null, 2));

    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred during DB operation.';
      console.error("💥 Unexpected error:", errorMessage);
      return NextResponse.json({ message: errorMessage }, { status: 500 });
    }
  } else if (payload.status === 'failed' || payload.status === 'canceled') {
    console.error(`❌ Analysis ${payload.id} failed or was canceled.`);
    console.error("🔍 Error details:", payload.error);
  } else {
    console.log("⏳ Analysis status:", payload.status);
    console.log("📊 Has output:", !!payload.output);
  }

  console.log("✅ Webhook processed successfully");
  return NextResponse.json({ message: 'Webhook received successfully' }, { status: 200 });
}
