// 확장된 QC Mock 데이터 - 18명 상담사, 각 10개 세션
import { ConsultationData } from "./consultationData";

// 확장된 상담사별 세션 매핑 (모든 상담사 각 10개 세션)
export const extendedConsultantSessionMapping: Record<string, number[]> = {
  // 기존 상담사들 (각 10개 세션으로 확장)
  c1: [1101, 1102, 1103, 1104, 1105, 1106, 1107, 1108, 1109, 1110], // 김민수
  c2: [1121, 1122, 1123, 1124, 1125, 1126, 1127, 1128, 1129, 1130], // 박성호
  c3: [1201, 1202, 1203, 1204, 1205, 1206, 1207, 1208, 1209, 1210], // 임지원
  c4: [1111, 1112, 1113, 1114, 1115, 1116, 1117, 1118, 1119, 1120], // 이영희
  c5: [1211, 1212, 1213, 1214, 1215, 1216, 1217, 1218, 1219, 1220], // 정다은
  c6: [1221, 1222, 1223, 1224, 1225, 1226, 1227, 1228, 1229, 1230], // 강현준
  c7: [1131, 1132, 1133, 1134, 1135, 1136, 1137, 1138, 1139, 1140], // 최미연
  c8: [1231, 1232, 1233, 1234, 1235, 1236, 1237, 1238, 1239, 1240], // 한상욱
  c9: [1241, 1242, 1243, 1244, 1245, 1246, 1247, 1248, 1249, 1250], // 송예진
  c10: [1251, 1252, 1253, 1254, 1255, 1256, 1257, 1258, 1259, 1260], // 윤진호
  c11: [1261, 1262, 1263, 1264, 1265, 1266, 1267, 1268, 1269, 1270], // 조은실
  c12: [1141, 1142, 1143, 1144, 1145, 1146, 1147, 1148, 1149, 1150], // 노준석
  
  // 새로운 상담사들 (각 10개 세션)
  c13: [1151, 1152, 1153, 1154, 1155, 1156, 1157, 1158, 1159, 1160], // 정수민
  c14: [1161, 1162, 1163, 1164, 1165, 1166, 1167, 1168, 1169, 1170], // 안지혜
  c15: [1171, 1172, 1173, 1174, 1175, 1176, 1177, 1178, 1179, 1180], // 황도현
  c16: [1181, 1182, 1183, 1184, 1185, 1186, 1187, 1188, 1189, 1190], // 차민영
  c17: [1191, 1192, 1193, 1194, 1195, 1196, 1197, 1198, 1199, 1200], // 오세훈
  c18: [1271, 1272, 1273, 1274, 1275, 1276, 1277, 1278, 1279, 1280], // 배수진
};

// 확장된 상담사 정보 (전체 18명)
export const extendedConsultantInfo: Record<string, { name: string; team: string; position: string }> = {
  // 기존 상담사 (세션 데이터 있음)
  c1: { name: "김민수", team: "고객상담 1팀", position: "선임 상담사" },
  c2: { name: "박성호", team: "고객상담 1팀", position: "상담사" },
  c4: { name: "이영희", team: "고객상담 2팀", position: "상담사" },
  c7: { name: "최미연", team: "고객상담 3팀", position: "팀장" },
  c12: { name: "노준석", team: "고객상담 1팀", position: "상담사" },
  
  // 기존 상담사 (새로 세션 데이터 추가)
  c3: { name: "임지원", team: "고객상담 1팀", position: "상담사" },
  c5: { name: "정다은", team: "고객상담 2팀", position: "상담사" },
  c6: { name: "강현준", team: "고객상담 2팀", position: "선임 상담사" },
  c8: { name: "한상욱", team: "고객상담 3팀", position: "상담사" },
  c9: { name: "송예진", team: "고객상담 3팀", position: "상담사" },
  c10: { name: "윤진호", team: "기술지원팀", position: "기술지원" },
  c11: { name: "조은실", team: "기술지원팀", position: "기술지원" },
  
  // 새로운 상담사
  c13: { name: "정수민", team: "고객상담 1팀", position: "상담사" },
  c14: { name: "안지혜", team: "고객상담 2팀", position: "선임 상담사" },
  c15: { name: "황도현", team: "고객상담 3팀", position: "상담사" },
  c16: { name: "차민영", team: "기술지원팀", position: "기술지원" },
  c17: { name: "오세훈", team: "고객상담 1팀", position: "상담사" },
  c18: { name: "배수진", team: "고객상담 3팀", position: "상담사" },
};

// Mock 세션 데이터 생성 함수
export const generateExtendedMockSession = (sessionNo: number, consultantId: string): ConsultationData => {
  
  // 세션 번호를 기반으로 다양한 패턴 생성
  const patterns = [
    // 우수한 성과 패턴
    {
      finalScore: Math.floor(Math.random() * 15) + 85, // 85-99점
      courtesy: ["A", "A", "B"][Math.floor(Math.random() * 3)],
      empathy: ["A", "A", "B"][Math.floor(Math.random() * 3)],
      problemSolving: ["A", "B", "A"][Math.floor(Math.random() * 3)],
      emotionalStability: ["A", "A", "B"][Math.floor(Math.random() * 3)],
      communicationFlow: ["A", "B", "A"][Math.floor(Math.random() * 3)],
      result: "만족" as const,
      strengths: [
        "모든 영역에서 우수한 성과를 보여주었습니다.",
        "고객과의 소통이 매우 원활했습니다.",
        "전문적이고 체계적인 문제 해결 능력을 보였습니다."
      ],
      improvements: [
        "현재 수준을 유지하며 더욱 발전시켜 나가세요."
      ],
      coaching: [
        "탁월한 상담 서비스를 제공하고 있습니다.",
        "현재의 우수한 수준을 지속해주세요."
      ]
    },
    // 양호한 성과 패턴
    {
      finalScore: Math.floor(Math.random() * 15) + 70, // 70-84점
      courtesy: ["A", "B", "C"][Math.floor(Math.random() * 3)],
      empathy: ["A", "B", "B"][Math.floor(Math.random() * 3)],
      problemSolving: ["B", "B", "C"][Math.floor(Math.random() * 3)],
      emotionalStability: ["A", "B", "B"][Math.floor(Math.random() * 3)],
      communicationFlow: ["B", "B", "C"][Math.floor(Math.random() * 3)],
      result: "만족" as const,
      strengths: [
        "기본적인 상담 능력을 잘 갖추고 있습니다.",
        "고객과의 기본적인 소통은 원활했습니다.",
        "성실한 상담 태도를 보여주었습니다."
      ],
      improvements: [
        "일부 영역에서 개선이 필요합니다.",
        "고객 응대 스킬을 더욱 향상시켜보세요."
      ],
      coaching: [
        "지속적인 훈련을 통해 더욱 발전시켜보세요.",
        "현재 수준에서 한 단계 더 나아가시길 바랍니다."
      ]
    },
    // 개선 필요 패턴
    {
      finalScore: Math.floor(Math.random() * 15) + 55, // 55-69점
      courtesy: ["B", "C", "D"][Math.floor(Math.random() * 3)],
      empathy: ["B", "C", "D"][Math.floor(Math.random() * 3)],
      problemSolving: ["C", "C", "D"][Math.floor(Math.random() * 3)],
      emotionalStability: ["B", "C", "C"][Math.floor(Math.random() * 3)],
      communicationFlow: ["C", "C", "D"][Math.floor(Math.random() * 3)],
      result: "미흡" as const,
      strengths: [
        "기본적인 상담 절차는 이해하고 있습니다.",
        "상담을 끝까지 완료하려는 의지를 보였습니다."
      ],
      improvements: [
        "전반적인 상담 스킬 향상이 필요합니다.",
        "고객 응대 태도를 개선해야 합니다.",
        "기본적인 매너와 예의를 더욱 갖춰야 합니다."
      ],
      coaching: [
        "기본 상담 교육을 다시 받아보시기 바랍니다.",
        "단계적으로 스킬을 개선해 나가세요.",
        "멘토링 프로그램 참여를 권장합니다."
      ]
    },
    // 심각한 문제 패턴
    {
      finalScore: Math.floor(Math.random() * 15) + 40, // 40-54점
      courtesy: ["D", "E", "F"][Math.floor(Math.random() * 3)],
      empathy: ["E", "F", "G"][Math.floor(Math.random() * 3)],
      problemSolving: ["D", "E", "F"][Math.floor(Math.random() * 3)],
      emotionalStability: ["C", "D", "E"][Math.floor(Math.random() * 3)],
      communicationFlow: ["D", "E", "F"][Math.floor(Math.random() * 3)],
      result: Math.random() > 0.5 ? "추가 상담 필요" as const : "해결 불가" as const,
      strengths: [
        "상담에 참여하려는 기본적인 의지는 있습니다."
      ],
      improvements: [
        "전반적인 상담 능력의 대폭 개선이 필요합니다.",
        "기본적인 고객 서비스 마인드를 갖춰야 합니다.",
        "상담사로서의 기본 자질 향상이 시급합니다."
      ],
      coaching: [
        "즉시 기본 교육 프로그램을 수강해야 합니다.",
        "집중적인 재교육이 필요합니다.",
        "상담 업무 재개 전 충분한 교육이 필요합니다."
      ]
    }
  ];

  // 상담사별 성향 설정 (일관성을 위해)
  const consultantPerformanceMap: Record<string, number[]> = {
    c1: [0, 0, 1, 0, 0, 1, 0, 0, 1, 0], // 김민수: 주로 우수, 가끔 양호
    c2: [1, 2, 1, 0, 1, 2, 1, 0, 1, 1], // 박성호: 양호~개선필요 편차
    c3: [1, 1, 1, 0, 1, 1, 0, 1, 1, 0], // 임지원: 양호~우수 안정형
    c4: [0, 1, 0, 1, 0, 1, 0, 1, 0, 0], // 이영희: 우수~양호 안정
    c5: [1, 1, 2, 1, 1, 1, 2, 1, 1, 0], // 정다은: 양호 중심, 가끔 개선필요
    c6: [0, 0, 1, 0, 0, 0, 1, 0, 0, 1], // 강현준: 우수 안정형 (선임)
    c7: [0, 3, 0, 0, 3, 0, 0, 2, 0, 0], // 최미연: 우수와 문제 극단
    c8: [1, 2, 1, 1, 1, 2, 1, 1, 1, 1], // 한상욱: 양호~개선필요 중간형
    c9: [1, 0, 1, 1, 0, 1, 1, 0, 1, 1], // 송예진: 양호~우수 (성장 잠재력)
    c10: [2, 2, 1, 2, 2, 1, 2, 1, 2, 1], // 윤진호: 개선필요~양호 (기술직)
    c11: [1, 1, 0, 1, 1, 1, 0, 1, 1, 0], // 조은실: 양호~우수 (기술직 우수)
    c12: [1, 2, 1, 0, 1, 1, 2, 0, 1, 0], // 노준석: 양호 중심, 점진 개선
    c13: [1, 1, 0, 1, 1, 0, 1, 1, 0, 1], // 정수민: 양호~우수 (신입 성장형)
    c14: [0, 0, 0, 1, 0, 0, 1, 0, 0, 0], // 안지혜: 우수 안정형 (선임)
    c15: [1, 2, 1, 1, 2, 1, 1, 1, 2, 1], // 황도현: 양호~개선필요 (불안정)
    c16: [2, 1, 2, 1, 2, 1, 2, 1, 1, 2], // 차민영: 개선필요 중심 (기술직 전환)
    c17: [2, 3, 2, 1, 2, 1, 3, 2, 1, 2], // 오세훈: 개선~문제 (관리 대상)
    c18: [1, 1, 1, 2, 1, 1, 2, 1, 1, 1], // 배수진: 양호~개선필요 (신입)
  };

  const sessionIndex = extendedConsultantSessionMapping[consultantId].indexOf(sessionNo);
  const patternIndex = consultantPerformanceMap[consultantId]?.[sessionIndex] || 1;
  const pattern = patterns[patternIndex];

  // 날짜 생성 (최근 30일 내 랜덤)
  const baseDate = new Date('2025-07-18');
  const randomDays = Math.floor(Math.random() * 30);
  const sessionDate = new Date(baseDate);
  sessionDate.setDate(sessionDate.getDate() - randomDays);
  
  const hours = Math.floor(Math.random() * 10) + 9; // 9-18시
  const minutes = Math.floor(Math.random() * 60);
  const seconds = Math.floor(Math.random() * 60);
  
  const datetime = `${sessionDate.getFullYear()}-${String(sessionDate.getMonth() + 1).padStart(2, '0')}-${String(sessionDate.getDate()).padStart(2, '0')} ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return {
    no: sessionNo,
    datetime,
    finalScore: pattern.finalScore,
    courtesy: pattern.courtesy,
    empathy: pattern.empathy,
    problemSolving: pattern.problemSolving,
    emotionalStability: pattern.emotionalStability,
    communicationFlow: pattern.communicationFlow,
    result: pattern.result,
    feedback: {
      strengths: pattern.strengths,
      improvements: pattern.improvements,
      coaching: pattern.coaching,
    },
  };
};

// 확장된 상담사별 평가 데이터 조회
export const getExtendedMockEvaluationsByConsultant = (consultantId: string): ConsultationData[] => {
  console.log(`🔄 확장된 Mock 데이터 조회: 상담사 ${consultantId}`);
  
  const sessionNumbers = extendedConsultantSessionMapping[consultantId] || [];
  
  if (sessionNumbers.length === 0) {
    console.log(`⚠️ 상담사 ${consultantId}에 대한 확장된 Mock 데이터가 없습니다.`);
    return [];
  }

  const evaluations: ConsultationData[] = [];
  
  sessionNumbers.forEach(sessionNo => {
    try {
      const evaluationData = generateExtendedMockSession(sessionNo, consultantId);
      evaluations.push(evaluationData);
      console.log(`✅ 세션 ${sessionNo} 데이터 생성 완료`);
    } catch (error) {
      console.error(`❌ 세션 ${sessionNo} 데이터 생성 실패:`, error);
    }
  });

  console.log(`📊 상담사 ${consultantId}: 총 ${evaluations.length}개 평가 데이터 반환`);
  return evaluations;
};

// 모든 상담사의 확장된 평가 데이터 조회
export const getAllExtendedMockEvaluations = (): ConsultationData[] => {
  console.log(`🔄 전체 확장된 Mock 데이터 조회`);
  
  const allEvaluations: ConsultationData[] = [];
  
  Object.keys(extendedConsultantSessionMapping).forEach(consultantId => {
    const consultantEvaluations = getExtendedMockEvaluationsByConsultant(consultantId);
    allEvaluations.push(...consultantEvaluations);
  });

  console.log(`📊 전체: 총 ${allEvaluations.length}개 평가 데이터 반환`);
  return allEvaluations;
};