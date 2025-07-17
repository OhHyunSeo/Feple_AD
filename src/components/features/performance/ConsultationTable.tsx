"use client";

import React, { useState } from "react";
import { FileText, ChevronDown, ChevronUp, ArrowUpDown } from "lucide-react";
import Pagination from "./Pagination";
import {
  ConsultationData,
  consultationRawData,
} from "../../../data/consultationData";
import { useState as useLocalState, useEffect } from "react";

interface ConsultationTableProps {
  startDate: string;
  endDate: string;
  onSessionSelect?: (sessionNo: number, sessionId?: string) => void;
  consultantId?: string; // 특정 상담원의 세션만 표시
}

type SortField =
  | "datetime"
  | "finalScore"
  | "courtesy"
  | "empathy"
  | "problemSolving"
  | "emotionalStability"
  | "communicationFlow";
type SortDirection = "asc" | "desc";

export default function ConsultationTable({
  startDate,
  endDate,
  onSessionSelect,
  consultantId,
}: ConsultationTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSession, setSelectedSession] = useState<number | null>(null);
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [apiData, setApiData] = useLocalState<ConsultationData[]>([]);
  const [isLoading, setIsLoading] = useLocalState(false);
  const [error, setError] = useLocalState<string | null>(null);
  const itemsPerPage = 10;

  // 등급을 숫자로 변환하는 함수 (A=7, B=6, ..., G=1)
  const gradeToNumber = (grade: string): number => {
    const gradeMap: { [key: string]: number } = {
      A: 7,
      B: 6,
      C: 5,
      D: 4,
      E: 3,
      F: 2,
      G: 1,
    };
    return gradeMap[grade] || 0;
  };

  // 정렬 함수
  const sortData = (
    data: ConsultationData[],
    field: SortField,
    direction: SortDirection
  ): ConsultationData[] => {
    return [...data].sort((a, b) => {
      let aValue: number;
      let bValue: number;

      if (field === "finalScore") {
        aValue = a.finalScore;
        bValue = b.finalScore;
      } else if (field === "datetime") {
        aValue = new Date(a.datetime).getTime();
        bValue = new Date(b.datetime).getTime();
      } else {
        aValue = gradeToNumber(a[field]);
        bValue = gradeToNumber(b[field]);
      }

      // 정렬 방향에 따라 비교
      let comparison = direction === "desc" ? bValue - aValue : aValue - bValue;

      // 동률일 경우 상담 일시로 내림차순 정렬 (최신순)
      if (comparison === 0) {
        const aDate = new Date(a.datetime);
        const bDate = new Date(b.datetime);
        comparison = bDate.getTime() - aDate.getTime();
      }

      return comparison;
    });
  };

  // 컬럼 헤더 클릭 핸들러
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "desc" ? "asc" : "desc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  // 정렬 아이콘 렌더링
  const renderSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="h-3 w-3 text-gray-400 ml-1" />;
    }
    return sortDirection === "desc" ? (
      <ChevronDown className="h-3 w-3 text-blue-500 ml-1" />
    ) : (
      <ChevronUp className="h-3 w-3 text-blue-500 ml-1" />
    );
  };

  // API에서 데이터 가져오기
  useEffect(() => {
    if (startDate && endDate) {
      fetchEvaluationData();
    }
  }, [startDate, endDate, consultantId]);

  const fetchEvaluationData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const params = new URLSearchParams({
        startDate,
        endDate,
      });
      
      if (consultantId) {
        params.append('consultantId', consultantId);
      }
      
      const response = await fetch(`/api/counselor-evaluations?${params}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setApiData(data);
    } catch (err) {
      console.error('평가 데이터 조회 실패:', err);
      setError(err instanceof Error ? err.message : '데이터 로딩 실패');
      // API 실패 시 기존 mock 데이터 사용
      setApiData(getMockData());
    } finally {
      setIsLoading(false);
    }
  };

  // 기존 mock 데이터 사용 (API 실패 시 fallback)
  const getMockData = (): ConsultationData[] => {
    if (!consultantId) {
      const rawData = consultationRawData;
      const allData = rawData.map((item, index) => ({
        ...item,
        no: rawData.length - index,
      }));

      return allData.filter((item) => {
        const itemDate = item.datetime.split(" ")[0];
        return itemDate >= startDate && itemDate <= endDate;
      });
    }

    // 상담원별 맞춤 데이터 (기존 로직 유지)
    const getConsultantData = (consultantId: string): ConsultationData[] => {
      switch (consultantId) {
        case "c1": // 김민수
          return [
            {
              no: 1001,
              datetime: "2025-07-16 13:30:46",
              finalScore: 78,
              courtesy: "B",
              empathy: "A",
              problemSolving: "B",
              emotionalStability: "A",
              communicationFlow: "B",
              result: "만족",
              feedback: {
                strengths: [
                  "공감적 소통(A): 고객의 감정을 잘 이해하고 적절한 공감 표현을 사용합니다.",
                  "감정 안정성(A): 어려운 상황에서도 침착하게 대응하며 안정된 응대 태도를 보여줍니다.",
                ],
                improvements: [
                  "정중함(B): 양호한 수준이지만 더욱 세련된 언어 사용으로 고급스러운 서비스를 제공할 수 있습니다.",
                  "문제 해결 역량: 좀 더 창의적인 해결책 제시가 필요합니다.",
                ],
                coaching: [
                  "이미 우수한 공감 능력을 보유하고 계시니, 이를 더욱 발전시켜 고객 만족도를 높여보세요.",
                  "정중한 언어 사용에 더해 전문적인 용어 사용으로 신뢰감을 더할 수 있습니다.",
                ],
              },
            },
            {
              no: 1002,
              datetime: "2025-07-16 14:15:23",
              finalScore: 75,
              courtesy: "C",
              empathy: "B",
              problemSolving: "A",
              emotionalStability: "B",
              communicationFlow: "B",
              result: "만족",
              feedback: {
                strengths: [
                  "문제 해결 역량(A): 복잡한 문제도 체계적으로 분석하여 효과적인 해결책을 제시합니다.",
                  "전반적인 상담 진행이 안정적입니다.",
                ],
                improvements: [
                  "정중함(C): 기본적인 예의는 갖추었으나 더욱 정중한 언어 사용이 필요합니다.",
                  "공감 표현을 좀 더 자연스럽게 사용하시면 좋겠습니다.",
                ],
                coaching: [
                  "문제 해결 능력은 우수하니, 여기에 더 따뜻한 감성을 더해보세요.",
                  "고객의 입장에서 한 번 더 생각해보는 습관을 기르시면 더 좋은 상담사가 될 수 있습니다.",
                ],
              },
            },
          ];
        case "c12": // 노준석
          return [
            {
              no: 1003,
              datetime: "2025-07-16 10:30:15",
              finalScore: 55,
              courtesy: "F",
              empathy: "G",
              problemSolving: "D",
              emotionalStability: "C",
              communicationFlow: "D",
              result: "추가 상담 필요",
              feedback: {
                strengths: [
                  "출근 및 업무 참여 의지: 기본적인 업무 참여 자세는 보여줍니다.",
                  "문제 인식: 고객의 기본적인 문제 상황은 파악할 수 있습니다.",
                ],
                improvements: [
                  "공감적 소통(G): 고객의 감정을 이해하고 공감하는 능력이 현저히 부족합니다.",
                  "정중함(F): 기본적인 예의가 부족하며 고객 응대 태도 전반적인 개선이 필요합니다.",
                ],
                coaching: [
                  "고객의 상황과 감정을 먼저 인정하고 공감하는 표현을 연습해보세요.",
                  "기본적인 고객 서비스 매뉴얼을 다시 숙지하고 정중한 언어 사용 연습이 필요합니다.",
                ],
              },
            },
            {
              no: 1004,
              datetime: "2025-07-16 15:20:41",
              finalScore: 62,
              courtesy: "D",
              empathy: "F",
              problemSolving: "C",
              emotionalStability: "C",
              communicationFlow: "D",
              result: "미흡",
              feedback: {
                strengths: [
                  "문제 해결 시도: 고객의 문제를 해결하려는 의지를 보입니다.",
                  "상담 완료 의지: 상담을 끝까지 진행하려는 자세를 보여줍니다.",
                ],
                improvements: [
                  "공감적 소통(F): 고객의 감정을 이해하는 능력이 크게 부족합니다.",
                  "정중함(D): 고객에 대한 기본적인 예의와 정중함이 부족합니다.",
                ],
                coaching: [
                  "기본적인 고객 응대 매뉴얼을 다시 학습하고 실습을 통해 체화하세요.",
                  "선배 상담사의 우수 사례를 관찰하고 모방하는 연습을 권장합니다.",
                ],
              },
            },
          ];
        default:
          // 기본 데이터 (다른 상담원들)
          return consultationRawData.slice(0, 3).map((item, index) => ({
            ...item,
            no: 2000 + index,
          }));
      }
    };

    const rawData = getConsultantData(consultantId);

    // 조회 기간에 해당하는 데이터만 필터링
    return rawData.filter((item) => {
      const itemDate = item.datetime.split(" ")[0]; // YYYY-MM-DD 부분만 추출
      return itemDate >= startDate && itemDate <= endDate;
    });
  };

  // 데이터 정렬 및 필터링
  const getFilteredData = (): ConsultationData[] => {
    const data = apiData.length > 0 ? apiData : getMockData();
    
    // 정렬 적용
    if (sortField) {
      return sortData(data, sortField, sortDirection);
    }
    
    return data;
  };

  const consultationData = getFilteredData();
  const totalPages = Math.ceil(consultationData.length / itemsPerPage);
  const currentData = consultationData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 세션 클릭 핸들러
  const handleSessionClick = (sessionNo: number, sessionId?: string) => {
    const isOpening = selectedSession !== sessionNo;
    setSelectedSession(isOpening ? sessionNo : null);

    // 세션을 새로 열 때만 상세 정보 로드
    if (isOpening && onSessionSelect) {
      onSessionSelect(sessionNo, sessionId);
    }
  };

  // 결과별 색상
  const getResultColor = (result: string) => {
    switch (result) {
      case "만족":
        return "bg-green-100 text-green-800";
      case "미흡":
        return "bg-yellow-100 text-yellow-800";
      case "추가 상담 필요":
        return "bg-orange-100 text-orange-800";
      case "해결 불가":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // 로딩 상태 표시
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex items-center justify-center h-64">
          <div className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <span className="text-gray-600">상담 세션 데이터를 불러오는 중...</span>
          </div>
        </div>
      </div>
    );
  }

  // 에러 상태 표시
  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-red-600 mb-2">데이터를 불러오는 중 오류가 발생했습니다.</p>
            <p className="text-gray-500 text-sm">{error}</p>
            <button 
              onClick={fetchEvaluationData}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              다시 시도
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-blue-500" />
          <h3 className="text-lg font-semibold text-gray-800">상담 세션</h3>
          <div className="text-[10px] text-gray-500 text-center">
            {startDate} ~ {endDate}
          </div>
          {apiData.length > 0 && (
            <div className="text-[10px] text-green-600 bg-green-50 px-2 py-1 rounded">
              실제 데이터
            </div>
          )}
        </div>
        <div className="text-sm text-gray-600">
          총{" "}
          <span className="font-bold text-blue-600">
            {consultationData.length}
          </span>
          건
        </div>
      </div>

      {/* 테이블 */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-center p-2 font-medium text-gray-700 text-[10px]">
                No
              </th>
              <th
                className="text-center p-2 font-medium text-gray-700 text-[10px] cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => handleSort("datetime")}
              >
                <div className="flex items-center justify-center">
                  상담 일시
                  {renderSortIcon("datetime")}
                </div>
              </th>
              <th
                className="text-center p-2 font-medium text-gray-700 text-[10px] cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => handleSort("finalScore")}
              >
                <div className="flex items-center justify-center">
                  최종 점수
                  {renderSortIcon("finalScore")}
                </div>
              </th>
              <th
                className="text-center p-2 font-medium text-gray-700 text-[10px] cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => handleSort("courtesy")}
              >
                <div className="flex items-center justify-center">
                  정중함 및 언어 품질
                  {renderSortIcon("courtesy")}
                </div>
              </th>
              <th
                className="text-center p-2 font-medium text-gray-700 text-[10px] cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => handleSort("empathy")}
              >
                <div className="flex items-center justify-center">
                  공감적 소통
                  {renderSortIcon("empathy")}
                </div>
              </th>
              <th
                className="text-center p-2 font-medium text-gray-700 text-[10px] cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => handleSort("problemSolving")}
              >
                <div className="flex items-center justify-center">
                  문제 해결 역량
                  {renderSortIcon("problemSolving")}
                </div>
              </th>
              <th
                className="text-center p-2 font-medium text-gray-700 text-[10px] cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => handleSort("emotionalStability")}
              >
                <div className="flex items-center justify-center">
                  감정 안정성
                  {renderSortIcon("emotionalStability")}
                </div>
              </th>
              <th
                className="text-center p-2 font-medium text-gray-700 text-[10px] cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => handleSort("communicationFlow")}
              >
                <div className="flex items-center justify-center">
                  대화 흐름 및 응대 태도
                  {renderSortIcon("communicationFlow")}
                </div>
              </th>
              <th className="text-center p-2 font-medium text-gray-700 text-[10px]">
                상담 결과
              </th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item, index) => (
              <React.Fragment key={item.no}>
                <tr
                  key={item.no}
                  onClick={() => handleSessionClick(item.no, (item as any).sessionId)}
                  className={`border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors duration-200 ${
                    selectedSession === item.no
                      ? "bg-pink-50 border-pink-200"
                      : index % 2 === 0
                      ? "bg-white"
                      : "bg-gray-25"
                  }`}
                >
                  <td className="p-2 font-medium text-gray-900 text-xs text-center relative">
                    <div className="flex items-center justify-center gap-1">
                      {item.no}
                      {selectedSession === item.no ? (
                        <ChevronUp className="h-3 w-3 text-pink-500" />
                      ) : (
                        <ChevronDown className="h-3 w-3 text-gray-400" />
                      )}
                    </div>
                  </td>
                  <td className="p-2 text-gray-600 text-xs text-center">
                    {item.datetime}
                  </td>
                  <td className="p-2 text-center">
                    <span className="text-gray-800 font-medium text-xs">
                      {item.finalScore}점
                    </span>
                  </td>
                  <td className="p-2 text-center">
                    {item.courtesy === "A" ? (
                      <span className="performance-text-green text-xs">
                        {item.courtesy}
                      </span>
                    ) : item.courtesy === "G" ? (
                      <span className="performance-text-red text-xs">
                        {item.courtesy}
                      </span>
                    ) : (
                      <span className="text-xs performance-text-gray">
                        {item.courtesy}
                      </span>
                    )}
                  </td>
                  <td className="p-2 text-center">
                    {item.empathy === "A" ? (
                      <span className="performance-text-green text-xs">
                        {item.empathy}
                      </span>
                    ) : item.empathy === "G" ? (
                      <span className="performance-text-red text-xs">
                        {item.empathy}
                      </span>
                    ) : (
                      <span className="text-xs performance-text-gray">
                        {item.empathy}
                      </span>
                    )}
                  </td>
                  <td className="p-2 text-center">
                    {item.problemSolving === "A" ? (
                      <span className="performance-text-green text-xs">
                        {item.problemSolving}
                      </span>
                    ) : item.problemSolving === "G" ? (
                      <span className="performance-text-red text-xs">
                        {item.problemSolving}
                      </span>
                    ) : (
                      <span className="text-xs performance-text-gray">
                        {item.problemSolving}
                      </span>
                    )}
                  </td>
                  <td className="p-2 text-center">
                    {item.emotionalStability === "A" ? (
                      <span className="performance-text-green text-xs">
                        {item.emotionalStability}
                      </span>
                    ) : item.emotionalStability === "G" ? (
                      <span className="performance-text-red text-xs">
                        {item.emotionalStability}
                      </span>
                    ) : (
                      <span className="text-xs performance-text-gray">
                        {item.emotionalStability}
                      </span>
                    )}
                  </td>
                  <td className="p-2 text-center">
                    {item.communicationFlow === "A" ? (
                      <span className="performance-text-green text-xs">
                        {item.communicationFlow}
                      </span>
                    ) : item.communicationFlow === "G" ? (
                      <span className="performance-text-red text-xs">
                        {item.communicationFlow}
                      </span>
                    ) : (
                      <span className="text-xs performance-text-gray">
                        {item.communicationFlow}
                      </span>
                    )}
                  </td>
                  <td className="p-2 text-center">
                    <span
                      className={`px-2 py-1 rounded text-[11px] font-medium ${getResultColor(
                        item.result
                      )}`}
                    >
                      {item.result}
                    </span>
                  </td>
                </tr>

                {/* 피드백 확장 영역 */}
                {selectedSession === item.no && (
                  <tr key={`feedback-${item.no}`}>
                    <td colSpan={9} className="p-0">
                      <div className="bg-pink-50 border-l-4 border-pink-500 animate-slide-down">
                        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* 강점 피드백 */}
                          <div className="bg-white rounded-lg p-3 shadow-sm">
                            <h4 className="text-sm font-semibold text-blue-600 mb-2 flex items-center gap-1">
                              강점
                            </h4>
                            <ul className="space-y-1">
                              {item.feedback.strengths.map((strength, idx) => (
                                <li
                                  key={idx}
                                  className="text-xs text-gray-700 leading-relaxed"
                                >
                                  • {strength}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* 개선점 피드백 */}
                          <div className="bg-white rounded-lg p-3 shadow-sm">
                            <h4 className="text-sm font-semibold text-red-600 mb-2">
                              개선점
                            </h4>
                            <ul className="space-y-1">
                              {item.feedback.improvements.map(
                                (improvement, idx) => (
                                  <li
                                    key={idx}
                                    className="text-xs text-gray-700 leading-relaxed"
                                  >
                                    • {improvement}
                                  </li>
                                )
                              )}
                            </ul>
                          </div>

                          {/* 코칭 멘트 */}
                          <div className="bg-white rounded-lg p-3 shadow-sm md:col-span-2">
                            <h4 className="text-sm font-semibold text-green-600 mb-2">
                              코칭 멘트
                            </h4>
                            <ul className="space-y-1">
                              {item.feedback.coaching.map((coaching, idx) => (
                                <li
                                  key={idx}
                                  className="text-xs text-gray-700 leading-relaxed"
                                >
                                  • {coaching}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* 페이지네이션 */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
