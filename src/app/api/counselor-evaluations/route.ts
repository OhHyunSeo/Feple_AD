import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

// Prisma 싱글톤 패턴 (Next.js 개발 환경에서 권장)
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const consultantId = searchParams.get("consultantId");

    console.log("🔄 counselor_evaluations 데이터 조회 시작...", {
      startDate,
      endDate,
      consultantId,
    });

    // 환경 변수 확인
    console.log("DATABASE_URL 존재:", !!process.env.DATABASE_URL);
    console.log("DIRECT_URL 존재:", !!process.env.DIRECT_URL);

    // 날짜 필터링 조건
    const whereCondition: Record<string, unknown> = {};

    if (startDate && endDate) {
      const start = new Date(startDate + "T00:00:00.000Z");
      const end = new Date(endDate + "T23:59:59.999Z");

      console.log("날짜 필터 조건:", { start, end });

      whereCondition.created_at = {
        gte: start,
        lte: end,
      };
    }

    console.log("WHERE 조건:", whereCondition);

    // 상담사 ID 필터링 (향후 확장 가능)
    if (consultantId) {
      // counselor_evaluations 테이블에는 consultantId가 없으므로
      // 필요시 session_id를 통해 다른 테이블과 조인해야 함
      // 현재는 무시하고 전체 데이터 조회
    }

    // counselor_evaluations 테이블에서 데이터 조회
    console.log("Prisma 쿼리 실행 중...");

    // 먼저 간단한 쿼리로 연결 테스트
    const testCount = await prisma.counselor_evaluations.count();
    console.log("총 counselor_evaluations 레코드 수:", testCount);

    const evaluations = await prisma.counselor_evaluations.findMany({
      where: whereCondition,
      orderBy: {
        created_at: "desc",
      },
      take: 100, // 최대 100개로 제한
    });

    console.log("쿼리 완료, 결과 개수:", evaluations.length);

    console.log(
      `✅ ${evaluations.length}개의 counselor_evaluations 데이터 조회 성공!`
    );

    // 프론트엔드에서 사용할 형태로 데이터 변환
    const formattedEvaluations = evaluations.map((evaluation, index) => ({
      no: evaluations.length - index,
      sessionId: evaluation.session_id,
      datetime:
        evaluation.created_at?.toISOString().replace("T", " ").slice(0, 19) ||
        "",
      finalScore: evaluation.final_score || 0,
      courtesy: evaluation.politeness_grade || "N/A",
      empathy: evaluation.empathy_grade || "N/A",
      problemSolving: evaluation.problem_solving_grade || "N/A",
      emotionalStability: evaluation.emotional_stability_grade || "N/A",
      communicationFlow: evaluation.stability_grade || "N/A", // stability를 communication으로 매핑
      result: getResultFromScore(evaluation.final_score),
      feedback: {
        strengths: parseGptFeedback(evaluation.gpt_feedback, "strengths"),
        improvements: parseGptFeedback(evaluation.gpt_feedback, "improvements"),
        coaching: parseGptFeedback(evaluation.gpt_feedback, "coaching"),
      },
      scores: {
        politeness: evaluation.politeness_score
          ? Number(evaluation.politeness_score)
          : 0,
        empathy: evaluation.empathy_score
          ? Number(evaluation.empathy_score)
          : 0,
        problemSolving: evaluation.problem_solving_score
          ? Number(evaluation.problem_solving_score)
          : 0,
        emotionalStability: evaluation.emotional_stability_score
          ? Number(evaluation.emotional_stability_score)
          : 0,
        stability: evaluation.stability_score
          ? Number(evaluation.stability_score)
          : 0,
      },
    }));

    return NextResponse.json(formattedEvaluations);
  } catch (error) {
    console.error("❌ counselor_evaluations 조회 오류:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch counselor evaluations",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// 점수에 따른 결과 분류
function getResultFromScore(finalScore: number | null): string {
  if (!finalScore) return "미분류";

  if (finalScore >= 80) return "만족";
  if (finalScore >= 70) return "미흡";
  if (finalScore >= 60) return "추가 상담 필요";
  return "해결 불가";
}

// GPT 피드백 파싱 (구조화된 텍스트 처리)
function parseGptFeedback(
  gptFeedback: string | null,
  type: "strengths" | "improvements" | "coaching"
): string[] {
  if (!gptFeedback) return ["피드백 데이터가 없습니다."];

  try {
    // JSON 형태로 저장되어 있다고 가정
    const feedback = JSON.parse(gptFeedback);
    return feedback[type] || ["데이터가 없습니다."];
  } catch {
    // JSON이 아닌 경우 구조화된 텍스트 파싱
    return parseStructuredFeedback(gptFeedback, type);
  }
}

// 구조화된 텍스트에서 특정 섹션 추출
function parseStructuredFeedback(
  text: string,
  type: "strengths" | "improvements" | "coaching"
): string[] {
  const lines = text.split("\n").filter((line) => line.trim());

  // 강점 섹션 추출
  if (type === "strengths") {
    const strengthsSection = extractSection(text, "강점");
    if (strengthsSection.length > 0) return strengthsSection;

    // 대안: "상위 2개 지표" 또는 등급 A, B 찾기
    const highGrades = lines.filter(
      (line) =>
        (line.includes("A등급") || line.includes("B등급")) &&
        !line.includes("약점")
    );
    if (highGrades.length > 0) {
      return highGrades.map((line) => line.trim().replace(/^\d+\.\s*/, ""));
    }
  }

  // 개선점 섹션 추출
  if (type === "improvements") {
    const improvementsSection = extractSection(text, "약점");
    if (improvementsSection.length > 0) return improvementsSection;

    // 대안: "하위 2개 지표" 또는 등급 F, G 찾기
    const lowGrades = lines.filter(
      (line) =>
        (line.includes("F등급") ||
          line.includes("G등급") ||
          line.includes("D등급")) &&
        !line.includes("강점")
    );
    if (lowGrades.length > 0) {
      return lowGrades.map((line) => line.trim().replace(/^\d+\.\s*/, ""));
    }
  }

  // 코칭 멘트 섹션 추출
  if (type === "coaching") {
    const coachingSection = extractSection(text, "코칭");
    if (coachingSection.length > 0) return coachingSection;

    // 대안: 마지막 문단이나 조언 내용 찾기
    const coachingLines = lines.filter(
      (line) =>
        line.includes("상담사님") ||
        line.includes("연습") ||
        line.includes("노력") ||
        line.includes("개선")
    );
    if (coachingLines.length > 0) {
      return coachingLines.slice(0, 2); // 최대 2개 코칭 멘트
    }
  }

  // 기본 fallback
  return ["데이터 파싱 중 오류가 발생했습니다."];
}

// 텍스트에서 특정 섹션 추출 (강점, 약점, 코칭 등)
function extractSection(text: string, keyword: string): string[] {
  const lines = text.split("\n");
  const result: string[] = [];
  let inSection = false;

  for (const line of lines) {
    const trimmedLine = line.trim();

    // 섹션 시작 감지
    if (
      trimmedLine.includes(`**${keyword}`) ||
      trimmedLine.includes(`${keyword} (`)
    ) {
      inSection = true;
      continue;
    }

    // 다른 섹션 시작 감지 (섹션 종료)
    if (
      inSection &&
      trimmedLine.includes("**") &&
      !trimmedLine.includes(keyword)
    ) {
      break;
    }

    // 섹션 내용 수집
    if (inSection && trimmedLine) {
      // 번호나 불필요한 기호 제거
      const cleanLine = trimmedLine
        .replace(/^\d+\.\s*/, "")
        .replace(/^[•\-\*]\s*/, "")
        .trim();

      if (cleanLine && !cleanLine.includes("**") && cleanLine.length > 10) {
        result.push(cleanLine);
      }
    }
  }

  return result.slice(0, 3); // 최대 3개 항목만 반환
}
