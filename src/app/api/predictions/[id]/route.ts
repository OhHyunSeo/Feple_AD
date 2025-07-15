import { NextResponse } from 'next/server';

async function getReplicatePrediction(predictionId: string) {
  const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN;
  if (!REPLICATE_API_TOKEN) {
    throw new Error("Missing REPLICATE_API_TOKEN environment variable");
  }

  const response = await fetch(`https://api.replicate.com/v1/predictions/${predictionId}`, {
    method: "GET",
    headers: {
      "Authorization": `Token ${REPLICATE_API_TOKEN}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorBody = await response.json();
    console.error("Replicate API Error:", errorBody);
    throw new Error(`Replicate API failed with status ${response.status}`);
  }

  return await response.json();
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const predictionId = params.id;
    if (!predictionId) {
      return NextResponse.json({ message: 'Prediction ID is required' }, { status: 400 });
    }

    const prediction = await getReplicatePrediction(predictionId);

    return NextResponse.json(prediction, { status: 200 });

  } catch (error: unknown) {
    const predictionId = params.id;
    console.error(`Error in /api/predictions/${predictionId}:`, error);
    const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
