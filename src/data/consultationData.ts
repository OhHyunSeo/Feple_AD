export interface FeedbackData {
  strengths: string[];
  improvements: string[];
  coaching: string[];
}

export interface ConsultationData {
  no: number;
  datetime: string;
  finalScore: number;
  courtesy: string; // A~G
  empathy: string; // A~G
  problemSolving: string; // A~G
  emotionalStability: string; // A~G
  communicationFlow: string; // A~G
  result: "만족" | "미흡" | "추가 상담 필요" | "해결 불가";
  feedback: FeedbackData;
}

export interface ConversationMessage {
  speaker: "상담사" | "고객";
  message: string;
  startTime: number; // 초 단위
  endTime: number;
}

export interface ConversationDetailData extends ConsultationData {
  conversation: ConversationMessage[];
  audioUrl?: string;
  totalDuration: number; // 전체 오디오 길이 (초)
}

// 공통 상담 데이터
export const consultationRawData: ConsultationData[] = [
  {
    no: 30,
    datetime: "2025-07-16 15:30:46",
    finalScore: 92,
    courtesy: "A",
    empathy: "A",
    problemSolving: "B",
    emotionalStability: "A",
    communicationFlow: "A",
    result: "만족",
    feedback: {
      strengths: [
        "대화에서 고객의 감정을 잘 이해하고 공감하는 태도가 우수했습니다.",
        "정중하고 친근한 어조로 고객과의 라포를 잘 형성했습니다.",
      ],
      improvements: [
        "구체적인 사례를 들어 설명하고, 상대방의 반응에 관심을 기울여야 합니다.",
      ],
      coaching: [
        "대화의 흐름이 좋다면 감정을 바탕으로, 상대방의 감정을 잘 이해하고 발언하는 연습을 통해 공감능력을 기를 수 있습니다.",
      ],
    },
  },
  {
    no: 29,
    datetime: "2025-07-16 13:45:22",
    finalScore: 78,
    courtesy: "C",
    empathy: "B",
    problemSolving: "D",
    emotionalStability: "C",
    communicationFlow: "B",
    result: "미흡",
    feedback: {
      strengths: [
        "고객의 요구사항을 정확히 파악하여 적절한 응답을 제공했습니다.",
      ],
      improvements: [
        "정중함: 대화에서 예의를 지키는 태도를 향상시켜야 합니다.",
        "고객의 질문에 대한 응답 속도를 개선할 필요가 있습니다.",
      ],
      coaching: [
        "또한, 정중함을 높이기 위해 대화 중 사용하는 언어와 태도에 주의하고, 상대방을 존중하는 표현을 늘려보세요.",
      ],
    },
  },
  {
    no: 3,
    datetime: "2025-07-15 16:20:15",
    finalScore: 85,
    courtesy: "B",
    empathy: "A",
    problemSolving: "B",
    emotionalStability: "B",
    communicationFlow: "A",
    result: "만족",
    feedback: {
      strengths: [
        "구체적인 사례를 들어 문제 해결책을 명확하게 제시했습니다.",
        "차분하고 안정적인 목소리로 고객에게 신뢰감을 주었습니다.",
      ],
      improvements: [
        "감정적 안정성을 위해 스트레스 관리 기법을 익히시길 권합니다.",
      ],
      coaching: [
        "스트레스 상황에서도 침착함을 유지하는 연습을 하시기 바랍니다.",
      ],
    },
  },
  {
    no: 4,
    datetime: "2025-07-15 14:15:30",
    finalScore: 58,
    courtesy: "G",
    empathy: "F",
    problemSolving: "G",
    emotionalStability: "E",
    communicationFlow: "G",
    result: "해결 불가",
    feedback: {
      strengths: ["기본적인 상담 접수 절차는 이해하고 있습니다."],
      improvements: [
        "정중함(G): 고객에 대한 예의와 존중이 매우 부족합니다.",
        "공감적 소통(F): 고객의 감정을 전혀 이해하지 못하고 있습니다.",
        "문제 해결(G): 고객의 문제를 해결하려는 의지와 능력이 현저히 부족합니다.",
        "대화 흐름(G): 상담 진행이 매우 어색하고 비전문적입니다.",
      ],
      coaching: [
        "즉시 기본 고객 서비스 교육을 받으시기 바랍니다.",
        "고객 응대 매뉴얼을 숙지하고 실습 훈련이 필요합니다.",
        "상담사로서의 기본 자질 향상을 위한 집중 교육이 시급합니다.",
      ],
    },
  },
  {
    no: 5,
    datetime: "2025-07-14 17:30:08",
    finalScore: 95,
    courtesy: "A",
    empathy: "A",
    problemSolving: "A",
    emotionalStability: "A",
    communicationFlow: "A",
    result: "만족",
    feedback: {
      strengths: [
        "대화에서 고객의 감정을 잘 이해하고 공감하는 태도가 우수했습니다.",
        "구체적인 사례를 들어 문제 해결책을 명확하게 제시했습니다.",
        "정중하고 친근한 어조로 고객과의 라포를 잘 형성했습니다.",
      ],
      improvements: [],
      coaching: ["현재 수준을 유지하면서 지속적인 발전을 위해 노력해주세요."],
    },
  },
  {
    no: 6,
    datetime: "2025-07-14 10:45:12",
    finalScore: 72,
    courtesy: "C",
    empathy: "C",
    problemSolving: "C",
    emotionalStability: "B",
    communicationFlow: "D",
    result: "미흡",
    feedback: {
      strengths: ["차분하고 안정적인 목소리로 고객에게 신뢰감을 주었습니다."],
      improvements: [
        "고객의 질문에 대한 응답 속도를 개선할 필요가 있습니다.",
        "구체적인 사례를 들어 설명하고, 상대방의 반응에 관심을 기울여야 합니다.",
      ],
      coaching: [
        "구체적인 사례를 들어 설명하고, 상대방의 언질에 관심을 기울여야 합니다.",
      ],
    },
  },
  {
    no: 7,
    datetime: "2025-07-13 15:20:35",
    finalScore: 82,
    courtesy: "B",
    empathy: "B",
    problemSolving: "A",
    emotionalStability: "B",
    communicationFlow: "B",
    result: "만족",
    feedback: {
      strengths: [
        "구체적인 사례를 들어 문제 해결책을 명확하게 제시했습니다.",
        "고객의 요구사항을 정확히 파악하여 적절한 응답을 제공했습니다.",
      ],
      improvements: [
        "정중함을 높이기 위해 대화 중 사용하는 언어와 태도에 주의해야 합니다.",
      ],
      coaching: [
        "대화의 흐름이 좋다면 감정을 바탕으로, 상대방의 감정을 잘 이해하고 발언하는 연습을 통해 공감능력을 기를 수 있습니다.",
      ],
    },
  },
  {
    no: 8,
    datetime: "2025-07-12 11:30:42",
    finalScore: 88,
    courtesy: "A",
    empathy: "B",
    problemSolving: "A",
    emotionalStability: "A",
    communicationFlow: "B",
    result: "만족",
    feedback: {
      strengths: [
        "대화에서 고객의 감정을 잘 이해하고 공감하는 태도가 우수했습니다.",
        "정중하고 친근한 어조로 고객과의 라포를 잘 형성했습니다.",
      ],
      improvements: [
        "고객의 질문에 대한 응답 속도를 조금 더 개선할 필요가 있습니다.",
      ],
      coaching: [
        "현재의 우수한 수준을 유지하면서 더욱 발전시켜 나가시기 바랍니다.",
      ],
    },
  },
  {
    no: 9,
    datetime: "2025-07-11 16:40:18",
    finalScore: 65,
    courtesy: "E",
    empathy: "E",
    problemSolving: "F",
    emotionalStability: "D",
    communicationFlow: "E",
    result: "해결 불가",
    feedback: {
      strengths: ["고객과의 대화를 유지하려는 노력이 보였습니다."],
      improvements: [
        "정중함(F): 대화에서 예의를 지키는 태도를 향상시켜야 합니다.",
        "감정적 안정성을 위해 스트레스 관리 기법을 익히시길 권합니다.",
        "구체적인 사례를 들어 설명하고, 상대방의 반응에 관심을 기울여야 합니다.",
      ],
      coaching: [
        "스트레스 상황에서도 침착함을 유지하는 연습을 하시기 바랍니다.",
        "기본적인 상담 스킬부터 차근차근 개선해 나가시기 바랍니다.",
      ],
    },
  },
  {
    no: 10,
    datetime: "2025-07-10 13:15:25",
    finalScore: 90,
    courtesy: "A",
    empathy: "A",
    problemSolving: "A",
    emotionalStability: "B",
    communicationFlow: "A",
    result: "만족",
    feedback: {
      strengths: [
        "대화에서 고객의 감정을 잘 이해하고 공감하는 태도가 우수했습니다.",
        "구체적인 사례를 들어 문제 해결책을 명확하게 제시했습니다.",
        "차분하고 안정적인 목소리로 고객에게 신뢰감을 주었습니다.",
      ],
      improvements: ["감정적 안정성 부분에서 조금 더 개선할 여지가 있습니다."],
      coaching: [
        "현재의 우수한 상담 능력을 바탕으로 지속적인 발전을 기대합니다.",
      ],
    },
  },
  {
    no: 11,
    datetime: "2025-07-09 14:22:10",
    finalScore: 76,
    courtesy: "C",
    empathy: "D",
    problemSolving: "C",
    emotionalStability: "C",
    communicationFlow: "B",
    result: "미흡",
    feedback: {
      strengths: ["고객과의 대화를 끝까지 유지했습니다."],
      improvements: [
        "공감 능력을 향상시키기 위한 훈련이 필요합니다.",
        "고객의 감정 상태를 더 민감하게 파악해야 합니다.",
      ],
      coaching: ["공감 훈련과 감정 인식 연습을 통해 상담 스킬을 향상시키세요."],
    },
  },
  {
    no: 12,
    datetime: "2025-07-08 16:55:33",
    finalScore: 80,
    courtesy: "B",
    empathy: "A",
    problemSolving: "C",
    emotionalStability: "B",
    communicationFlow: "B",
    result: "만족",
    feedback: {
      strengths: [
        "고객의 감정을 잘 파악하고 적절히 대응했습니다.",
        "안정적인 음성으로 신뢰감을 조성했습니다.",
      ],
      improvements: ["문제 해결 방안을 더 구체적으로 제시할 필요가 있습니다."],
      coaching: ["문제 해결 프로세스를 체계적으로 학습하여 개선해보세요."],
    },
  },
  {
    no: 13,
    datetime: "2025-07-07 13:30:46",
    finalScore: 87,
    courtesy: "A",
    empathy: "B",
    problemSolving: "A",
    emotionalStability: "A",
    communicationFlow: "B",
    result: "만족",
    feedback: {
      strengths: [
        "문제 해결에 대한 체계적 접근이 인상적이었습니다.",
        "고객의 니즈를 정확히 파악했습니다.",
      ],
      improvements: ["공감 표현을 더 풍부하게 사용하면 좋겠습니다."],
      coaching: ["감정 표현 연습을 통해 공감 능력을 더욱 발전시켜보세요."],
    },
  },
  {
    no: 14,
    datetime: "2025-07-06 15:45:18",
    finalScore: 73,
    courtesy: "C",
    empathy: "C",
    problemSolving: "D",
    emotionalStability: "B",
    communicationFlow: "C",
    result: "미흡",
    feedback: {
      strengths: ["고객과의 기본적인 예의는 지켰습니다."],
      improvements: [
        "문제 해결 과정에서 더 구체적인 방안 제시가 필요합니다.",
        "고객의 감정 상태를 더 세심하게 관찰해야 합니다.",
      ],
      coaching: ["문제 해결 시나리오 연습과 감정 인식 훈련을 병행하세요."],
    },
  },
  {
    no: 15,
    datetime: "2025-07-05 12:20:35",
    finalScore: 91,
    courtesy: "A",
    empathy: "A",
    problemSolving: "A",
    emotionalStability: "B",
    communicationFlow: "A",
    result: "만족",
    feedback: {
      strengths: [
        "완벽한 고객 서비스 마인드를 보여주었습니다.",
        "복잡한 문제도 단계별로 명확히 해결했습니다.",
      ],
      improvements: [
        "극도로 스트레스가 많은 상황에서의 대응력 보완이 필요합니다.",
      ],
      coaching: ["스트레스 상황 시뮬레이션 훈련을 추천합니다."],
    },
  },
  {
    no: 16,
    datetime: "2025-07-04 17:10:42",
    finalScore: 79,
    courtesy: "B",
    empathy: "C",
    problemSolving: "B",
    emotionalStability: "C",
    communicationFlow: "B",
    result: "만족",
    feedback: {
      strengths: ["문제 해결 과정이 논리적이고 체계적이었습니다."],
      improvements: [
        "고객의 감정적 니즈에 대한 이해가 더 필요합니다.",
        "감정적 안정성을 높이는 연습이 필요합니다.",
      ],
      coaching: ["감정 지능 향상을 위한 훈련 프로그램 참여를 권합니다."],
    },
  },
  {
    no: 17,
    datetime: "2025-07-03 14:35:28",
    finalScore: 84,
    courtesy: "B",
    empathy: "A",
    problemSolving: "B",
    emotionalStability: "A",
    communicationFlow: "B",
    result: "만족",
    feedback: {
      strengths: [
        "고객의 감정을 세심하게 배려하는 모습이 좋았습니다.",
        "안정적인 상담 진행이 인상적이었습니다.",
      ],
      improvements: ["문제 해결의 창의성을 더 발휘해보세요."],
      coaching: ["다양한 해결책 제시 연습을 통해 창의성을 기르세요."],
    },
  },
  {
    no: 18,
    datetime: "2025-07-02 11:50:15",
    finalScore: 55,
    courtesy: "F",
    empathy: "G",
    problemSolving: "G",
    emotionalStability: "D",
    communicationFlow: "F",
    result: "해결 불가",
    feedback: {
      strengths: ["전화를 끝까지 받았다는 점은 인정됩니다."],
      improvements: [
        "공감적 소통(G): 고객의 감정을 전혀 이해하지 못하고 무시했습니다.",
        "문제 해결(G): 고객의 문제 해결을 위한 노력이 전혀 보이지 않았습니다.",
        "정중함(F): 고객에 대한 기본 예의가 현저히 부족했습니다.",
        "대화 흐름(F): 상담 진행이 매우 어색하고 비협조적이었습니다.",
      ],
      coaching: [
        "고객 서비스의 기본 개념부터 다시 학습해야 합니다.",
        "상담사로서의 기본 태도와 자세에 대한 전면 재교육이 필요합니다.",
        "현재 상태로는 고객 응대 업무에 적합하지 않습니다.",
      ],
    },
  },
  {
    no: 19,
    datetime: "2025-07-01 16:25:33",
    finalScore: 93,
    courtesy: "A",
    empathy: "A",
    problemSolving: "A",
    emotionalStability: "A",
    communicationFlow: "A",
    result: "만족",
    feedback: {
      strengths: [
        "모든 영역에서 탁월한 성과를 보여주었습니다.",
        "고객 만족도가 매우 높았습니다.",
      ],
      improvements: [],
      coaching: ["현재의 뛰어난 수준을 계속 유지해주시기 바랍니다."],
    },
  },
  {
    no: 20,
    datetime: "2025-06-30 13:40:28",
    finalScore: 77,
    courtesy: "C",
    empathy: "B",
    problemSolving: "C",
    emotionalStability: "B",
    communicationFlow: "C",
    result: "만족",
    feedback: {
      strengths: ["고객과의 기본적인 소통은 원활했습니다."],
      improvements: [
        "더 정중한 어투 사용이 필요합니다.",
        "문제 해결 과정을 더 체계화해야 합니다.",
      ],
      coaching: ["고객 응대 매뉴얼을 다시 한번 숙지하시기 바랍니다."],
    },
  },
  {
    no: 21,
    datetime: "2025-06-29 15:15:42",
    finalScore: 86,
    courtesy: "A",
    empathy: "B",
    problemSolving: "A",
    emotionalStability: "B",
    communicationFlow: "A",
    result: "만족",
    feedback: {
      strengths: [
        "문제 해결 능력이 뛰어났습니다.",
        "정중한 태도를 일관되게 유지했습니다.",
      ],
      improvements: ["공감 표현을 더 자연스럽게 할 수 있습니다."],
      coaching: ["공감 스킬 향상을 위한 역할 연기 훈련을 추천합니다."],
    },
  },
  {
    no: 22,
    datetime: "2025-06-28 10:30:15",
    finalScore: 75,
    courtesy: "B",
    empathy: "C",
    problemSolving: "C",
    emotionalStability: "C",
    communicationFlow: "B",
    result: "미흡",
    feedback: {
      strengths: ["침착하게 상담을 진행했습니다."],
      improvements: [
        "고객의 감정 상태에 더 민감하게 반응해야 합니다.",
        "문제 해결 과정에서 더 적극적인 자세가 필요합니다.",
      ],
      coaching: ["고객 심리 이해를 위한 추가 교육이 도움이 될 것입니다."],
    },
  },
  {
    no: 23,
    datetime: "2025-06-27 14:45:38",
    finalScore: 89,
    courtesy: "A",
    empathy: "A",
    problemSolving: "B",
    emotionalStability: "A",
    communicationFlow: "A",
    result: "만족",
    feedback: {
      strengths: [
        "고객의 마음을 잘 이해하고 공감했습니다.",
        "전체적인 상담 품질이 우수했습니다.",
      ],
      improvements: ["문제 해결 과정에서 조금 더 창의적인 접근이 가능합니다."],
      coaching: ["다양한 해결 방안을 제시하는 연습을 해보세요."],
    },
  },
  {
    no: 24,
    datetime: "2025-06-26 12:20:25",
    finalScore: 48,
    courtesy: "G",
    empathy: "F",
    problemSolving: "G",
    emotionalStability: "F",
    communicationFlow: "G",
    result: "해결 불가",
    feedback: {
      strengths: ["상담에 참여했다는 점만 인정됩니다."],
      improvements: [
        "정중함(G): 고객에 대한 기본적인 예의조차 지키지 못했습니다.",
        "공감적 소통(F): 고객의 입장을 전혀 이해하려 하지 않았습니다.",
        "문제 해결(G): 고객의 문제에 대한 해결책을 전혀 제시하지 못했습니다.",
        "대화 흐름(G): 상담 진행이 매우 미숙하고 부적절했습니다.",
      ],
      coaching: [
        "상담사 기본 자격에 대한 재평가가 필요합니다.",
        "전면적인 고객 서비스 재교육이 시급합니다.",
        "상담 업무 재개 전 충분한 교육과 실습이 필요합니다.",
      ],
    },
  },
  {
    no: 25,
    datetime: "2025-06-25 16:35:50",
    finalScore: 94,
    courtesy: "A",
    empathy: "A",
    problemSolving: "A",
    emotionalStability: "A",
    communicationFlow: "A",
    result: "만족",
    feedback: {
      strengths: [
        "완벽에 가까운 상담 서비스를 제공했습니다.",
        "고객이 매우 만족해했습니다.",
      ],
      improvements: [],
      coaching: ["이러한 우수한 수준을 지속적으로 유지해주세요."],
    },
  },
  {
    no: 26,
    datetime: "2025-06-24 11:10:18",
    finalScore: 81,
    courtesy: "B",
    empathy: "B",
    problemSolving: "A",
    emotionalStability: "B",
    communicationFlow: "B",
    result: "만족",
    feedback: {
      strengths: ["문제 해결에 대한 전문성이 돋보였습니다."],
      improvements: ["고객과의 감정적 연결을 더 강화할 수 있습니다."],
      coaching: ["감정 공유 기법을 활용한 상담 스킬을 연습해보세요."],
    },
  },
  {
    no: 27,
    datetime: "2025-06-23 15:55:42",
    finalScore: 67,
    courtesy: "E",
    empathy: "D",
    problemSolving: "F",
    emotionalStability: "D",
    communicationFlow: "E",
    result: "추가 상담 필요",
    feedback: {
      strengths: ["상담을 끝까지 완료했습니다."],
      improvements: [
        "정중함과 예의에 대한 전반적인 개선이 필요합니다.",
        "문제 해결 능력을 크게 향상시켜야 합니다.",
        "고객의 감정을 더 잘 이해해야 합니다.",
      ],
      coaching: ["기본 상담 스킬부터 체계적으로 재교육받으시기 바랍니다."],
    },
  },
  {
    no: 28,
    datetime: "2025-06-22 13:25:15",
    finalScore: 83,
    courtesy: "B",
    empathy: "A",
    problemSolving: "B",
    emotionalStability: "B",
    communicationFlow: "B",
    result: "만족",
    feedback: {
      strengths: [
        "고객의 감정을 잘 파악하고 공감했습니다.",
        "전반적으로 안정적인 상담을 진행했습니다.",
      ],
      improvements: ["문제 해결 과정에서 더 구체적인 안내가 필요합니다."],
      coaching: ["단계별 문제 해결 가이드를 활용해보세요."],
    },
  },
  {
    no: 29,
    datetime: "2025-06-21 17:40:33",
    finalScore: 74,
    courtesy: "C",
    empathy: "C",
    problemSolving: "C",
    emotionalStability: "B",
    communicationFlow: "C",
    result: "미흡",
    feedback: {
      strengths: ["감정적으로 안정된 상태를 유지했습니다."],
      improvements: [
        "고객 응대 태도 전반에 걸친 개선이 필요합니다.",
        "문제 해결 과정을 더 체계화해야 합니다.",
      ],
      coaching: ["고객 서비스 기본 교육을 다시 받아보시기 바랍니다."],
    },
  },
  {
    no: 30,
    datetime: "2025-06-20 14:15:28",
    finalScore: 88,
    courtesy: "A",
    empathy: "B",
    problemSolving: "A",
    emotionalStability: "A",
    communicationFlow: "B",
    result: "만족",
    feedback: {
      strengths: [
        "정중하고 전문적인 상담 태도가 인상적이었습니다.",
        "문제를 효과적으로 해결했습니다.",
      ],
      improvements: ["공감 표현을 더 자연스럽게 할 수 있습니다."],
      coaching: ["감정 표현 기법을 다양화하여 더욱 발전시켜보세요."],
    },
  },
];

// 상담 세부 내용 생성 함수
export const generateConversationData = (
  sessionNo: number
): ConversationDetailData => {
  // ConsultationTable의 No 할당 방식과 동일하게 매칭
  const baseData = consultationRawData[consultationRawData.length - sessionNo];
  if (!baseData) {
    throw new Error(`세션 번호 ${sessionNo}을(를) 찾을 수 없습니다.`);
  }

  // 간단한 대화 내용 생성 (임시)
  const conversation: ConversationMessage[] = [
    {
      speaker: "고객",
      message: "안녕하세요, 계약 해지 관련해서 문의드리고 싶은데요.",
      startTime: 0,
      endTime: 4,
    },
    {
      speaker: "상담사",
      message:
        "안녕하세요. 고객님의 계약 해지 문의를 도와드리겠습니다. 어떤 부분에 대해 궁금하신가요?",
      startTime: 4,
      endTime: 12,
    },
    {
      speaker: "고객",
      message: "중도 해지할 때 위약금이 얼마나 나오는지 알고 싶어요.",
      startTime: 12,
      endTime: 18,
    },
    {
      speaker: "상담사",
      message:
        "네, 고객님의 계약 정보를 확인해서 정확한 위약금을 안내해드리겠습니다. 잠시만 기다려 주세요.",
      startTime: 18,
      endTime: 26,
    },
    {
      speaker: "고객",
      message: "네, 확인 부탁드립니다.",
      startTime: 26,
      endTime: 29,
    },
    {
      speaker: "상담사",
      message:
        "확인 결과 현재 남은 약정 기간에 따른 위약금은 45,000원입니다. 추가로 궁금한 점이 있으시면 언제든 말씀해 주세요.",
      startTime: 29,
      endTime: 42,
    },
  ];

  return {
    ...baseData,
    no: sessionNo, // ConsultationTable과 동일한 no 할당
    conversation,
    audioUrl: `/audio/session-${sessionNo}.mp3`, // 임시 오디오 URL
    totalDuration: conversation[conversation.length - 1]?.endTime || 60,
  };
};
