import { NextResponse } from 'next/server';

async function startReplicatePrediction(fileUrl: string) {
  const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN;
  if (!REPLICATE_API_TOKEN) {
    throw new Error("Missing REPLICATE_API_TOKEN environment variable");
  }

  // Vercel에서 제공하는 URL 환경 변수 사용
  let baseUrl = '';
  
  if (process.env.VERCEL_URL) {
    // Vercel production/preview deployment
    baseUrl = `https://${process.env.VERCEL_URL}`;
  } else if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    // Custom environment variable
    baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL.startsWith('http') 
      ? process.env.NEXT_PUBLIC_VERCEL_URL
      : `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  } else {
    // Development fallback
    baseUrl = 'http://localhost:3000';
  }

  const webhookUrl = `${baseUrl}/api/webhook`;
  
  // 웹훅 URL 검증
  if (process.env.NODE_ENV === 'production') {
    if (!webhookUrl.startsWith('https://')) {
      throw new Error(`Invalid webhook URL in production: ${webhookUrl}. Must be HTTPS.`);
    }
  } else if (!webhookUrl.startsWith('http://localhost')) {
    throw new Error(`Invalid webhook URL: ${webhookUrl}. Must be HTTPS or localhost.`);
  }
  
  console.log(`Using webhook URL: ${webhookUrl}`);

  const response = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      "Authorization": `Token ${REPLICATE_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // 실제 사용하는 Replicate 모델의 버전으로 변경해야 합니다.
      version: "ohdurma/feple-ai-generator", 
      input: {
        audio: fileUrl,
      },
      // 분석 완료 시 결과를 받을 웹훅 URL (선택 사항)
      webhook: webhookUrl,
      webhook_events_filter: ["completed"]
    }),
  });

  if (!response.ok) {
    const errorBody = await response.json();
    console.error("Replicate API Error:", errorBody);
    throw new Error(`Replicate API failed with status ${response.status}`);
  }

  return await response.json();
}

export async function POST(request: Request) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ message: 'URL is required' }, { status: 400 });
    }

    console.log(`Received URL for analysis: ${url}`);

    // Replicate에 분석 요청
    const prediction = await startReplicatePrediction(url);

    // 클라이언트에게 prediction ID 반환
    return NextResponse.json({ id: prediction.id }, { status: 201 });

  } catch (error: unknown) {
    console.error("Error in /api/analyze-url:", error);
    const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
