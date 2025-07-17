// QC 대시보드용 Mock 데이터 연결 파일
// 현재는 Mock 데이터를 사용하며, 차후 API 연결 시 이 파일을 통해 전환

import { ConsultationData, generateConversationData } from "./consultationData";

// 상담사별 1100번대 세션 매핑 (새로운 Mock 데이터)
const consultantSessionMapping: Record<string, number[]> = {
  c1: [1101, 1102], // 김민수
  c2: [1105, 1106], // 박성호
  c4: [1103, 1104], // 이영희
  c7: [1107, 1108], // 최미연
  c12: [1109, 1110], // 노준석
  // 다른 상담사들은 기존 데이터나 빈 배열
  c3: [], // 임지원
  c5: [], // 정다은
  c6: [], // 강현준
  c8: [], // 한상욱
  c9: [], // 송예진
  c10: [], // 윤진호
  c11: [], // 조은실
};

// 상담사별 평가 데이터 조회 (Mock 버전)
export const getMockEvaluationsByConsultant = (consultantId: string): ConsultationData[] => {
  console.log(`🔄 Mock 데이터 조회: 상담사 ${consultantId}`);
  
  const sessionNumbers = consultantSessionMapping[consultantId] || [];
  
  if (sessionNumbers.length === 0) {
    console.log(`⚠️ 상담사 ${consultantId}에 대한 Mock 데이터가 없습니다.`);
    return [];
  }

  const evaluations: ConsultationData[] = [];
  
  sessionNumbers.forEach(sessionNo => {
    try {
      const conversationData = generateConversationData(sessionNo);
      // ConversationDetailData에서 ConsultationData 부분만 추출
      const evaluationData: ConsultationData = {
        no: conversationData.no,
        datetime: conversationData.datetime,
        finalScore: conversationData.finalScore,
        courtesy: conversationData.courtesy,
        empathy: conversationData.empathy,
        problemSolving: conversationData.problemSolving,
        emotionalStability: conversationData.emotionalStability,
        communicationFlow: conversationData.communicationFlow,
        result: conversationData.result,
        feedback: conversationData.feedback,
      };
      
      evaluations.push(evaluationData);
      console.log(`✅ 세션 ${sessionNo} 데이터 추가 완료`);
    } catch (error) {
      console.error(`❌ 세션 ${sessionNo} 데이터 생성 실패:`, error);
    }
  });

  console.log(`📊 상담사 ${consultantId}: 총 ${evaluations.length}개 평가 데이터 반환`);
  return evaluations;
};

// 모든 상담사의 평가 데이터 조회 (Mock 버전)
export const getAllMockEvaluations = (): ConsultationData[] => {
  console.log(`🔄 전체 Mock 데이터 조회`);
  
  const allEvaluations: ConsultationData[] = [];
  
  Object.keys(consultantSessionMapping).forEach(consultantId => {
    const consultantEvaluations = getMockEvaluationsByConsultant(consultantId);
    allEvaluations.push(...consultantEvaluations);
  });

  console.log(`📊 전체: 총 ${allEvaluations.length}개 평가 데이터 반환`);
  return allEvaluations;
};

// 상담사별 최신 평가 데이터 조회
export const getLatestMockEvaluationByConsultant = (consultantId: string): ConsultationData | null => {
  const evaluations = getMockEvaluationsByConsultant(consultantId);
  
  if (evaluations.length === 0) {
    return null;
  }

  // 날짜순으로 정렬하여 최신 데이터 반환
  const sortedEvaluations = evaluations.sort((a, b) => 
    new Date(b.datetime).getTime() - new Date(a.datetime).getTime()
  );

  return sortedEvaluations[0];
};

// Mock 데이터 사용 여부 설정
export const USE_MOCK_DATA = true;

// 개발 모드에서만 Mock 데이터 사용 여부 확인
export const shouldUseMockData = (): boolean => {
  // 개발 환경에서는 Mock 데이터 사용
  if (process.env.NODE_ENV === 'development') {
    return USE_MOCK_DATA;
  }
  
  // 프로덕션에서는 환경 변수로 제어
  return process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true';
};

// 상담사 정보 매핑 (UI 표시용)
export const consultantInfo: Record<string, { name: string; team: string; position: string }> = {
  c1: { name: "김민수", team: "고객상담 1팀", position: "선임 상담사" },
  c2: { name: "박성호", team: "고객상담 1팀", position: "상담사" },
  c3: { name: "임지원", team: "고객상담 1팀", position: "상담사" },
  c4: { name: "이영희", team: "고객상담 2팀", position: "상담사" },
  c5: { name: "정다은", team: "고객상담 2팀", position: "상담사" },
  c6: { name: "강현준", team: "고객상담 2팀", position: "선임 상담사" },
  c7: { name: "최미연", team: "고객상담 3팀", position: "팀장" },
  c8: { name: "한상욱", team: "고객상담 3팀", position: "상담사" },
  c9: { name: "송예진", team: "고객상담 3팀", position: "상담사" },
  c10: { name: "윤진호", team: "기술지원팀", position: "기술지원" },
  c11: { name: "조은실", team: "기술지원팀", position: "기술지원" },
  c12: { name: "노준석", team: "고객상담 1팀", position: "상담사" },
};