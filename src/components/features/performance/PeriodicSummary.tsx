"use client";

import React from "react";

interface PeriodicSummaryProps {
  summary: {
    strengths: string[];
    improvements: string[];
    coaching: string[];
  };
}

const createNaturalSummary = (
  items: string[],
  type: "strengths" | "improvements" | "coaching"
): string => {
  const uniqueItems = [
    ...new Set(items.filter((item): item is string => !!item)),
  ];

  if (uniqueItems.length === 0) {
    switch (type) {
      case "strengths":
        return "기간 내 상담에서 특별히 강조된 강점은 발견되지 않았습니다.";
      case "improvements":
        return "특별한 개선점 없이 안정적인 성과를 유지했습니다.";
      case "coaching":
        return "현재의 좋은 성과를 유지할 수 있도록 격려하는 것이 좋겠습니다.";
      default:
        return "분석된 데이터가 부족하여 요약할 수 없습니다.";
    }
  }

  switch (type) {
    case "strengths":
      return "대체로 고객에게 친절하고 정중한 태도를 보였으며, 안정적인 대화 흐름을 유지하는 등 긍정적인 평가가 있었습니다.";
    case "improvements":
      return "일부 상담에서 공감 능력과 체계적인 문제 해결 접근 방식에 대한 보완이 필요하다는 의견이 있었습니다.";
    case "coaching":
      return "상담 스킬 향상을 위한 기본 교육을 재점검하고, 성공 사례 분석을 통한 멘토링을 제공하는 것이 효과적으로 보입니다.";
    default:
      return "요약 정보를 생성할 수 없습니다.";
  }
};

export default function PeriodicSummary({ summary }: PeriodicSummaryProps) {
  const strengthsSentence = createNaturalSummary(
    summary.strengths,
    "strengths"
  );
  const improvementsSentence = createNaturalSummary(
    summary.improvements,
    "improvements"
  );
  const coachingSentence = createNaturalSummary(summary.coaching, "coaching");

  return (
    <div className="space-y-3">
      {/* 상단: 강점과 개선점 (2열) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* 강점 */}
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-200">
          <h4 className="text-xs font-semibold text-blue-600 mb-1.5 flex items-center gap-1.5">
            <span className="text-sm">💪🏻</span>
            기간 내 강점 요약
          </h4>
          <p className="text-xs text-gray-700 leading-relaxed">
            {strengthsSentence}
          </p>
        </div>

        {/* 개선점 */}
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-200">
          <h4 className="text-xs font-semibold text-red-600 mb-1.5 flex items-center gap-1.5">
            <span className="text-sm">🎯</span>
            기간 내 개선점 요약
          </h4>
          <p className="text-xs text-gray-700 leading-relaxed">
            {improvementsSentence}
          </p>
        </div>
      </div>

      {/* 하단: 코칭 멘트 (1열) */}
      <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-200">
        <h4 className="text-xs font-semibold text-green-600 mb-1.5 flex items-center gap-1.5">
          <span className="text-sm">🎓</span>
          기간 내 코칭 멘트
        </h4>
        <p className="text-xs text-gray-700 leading-relaxed">
          {coachingSentence}
        </p>
      </div>
    </div>
  );
}
