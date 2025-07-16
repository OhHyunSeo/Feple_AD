"use client";

import React, { useState } from "react";
import { FileText, ChevronDown, ChevronUp, ArrowUpDown } from "lucide-react";
import Pagination from "./Pagination";
import {
  ConsultationData,
  consultationRawData,
} from "../../../data/consultationData";

interface ConsultationTableProps {
  startDate: string;
  endDate: string;
  onSessionSelect?: (sessionNo: number) => void;
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
}: ConsultationTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSession, setSelectedSession] = useState<number | null>(null);
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
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

  // 데이터 필터링 및 정렬
  const getFilteredData = (): ConsultationData[] => {
    // 공통 데이터 사용
    const rawData = consultationRawData;

    // No를 내림차순으로 자동 할당 (최신이 큰 번호)
    const allData = rawData.map((item, index) => ({
      ...item,
      no: rawData.length - index,
    }));

    // 조회 기간에 해당하는 데이터만 필터링
    const filteredData = allData.filter((item) => {
      const itemDate = item.datetime.split(" ")[0]; // YYYY-MM-DD 부분만 추출
      return itemDate >= startDate && itemDate <= endDate;
    });

    // 정렬 적용
    let sortedData = filteredData;
    if (sortField) {
      sortedData = sortData(filteredData, sortField, sortDirection);
    }

    // No는 각 세션의 고유 ID로 유지 (정렬과 무관하게 고정)
    return sortedData;
  };

  const consultationData = getFilteredData();
  const totalPages = Math.ceil(consultationData.length / itemsPerPage);
  const currentData = consultationData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 세션 클릭 핸들러
  const handleSessionClick = (sessionNo: number) => {
    const isOpening = selectedSession !== sessionNo;
    setSelectedSession(isOpening ? sessionNo : null);

    // 세션을 새로 열 때만 상세 정보 로드
    if (isOpening && onSessionSelect) {
      onSessionSelect(sessionNo);
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
                  onClick={() => handleSessionClick(item.no)}
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
                            <h4 className="text-sm font-semibold text-pink-600 mb-2 flex items-center gap-1">
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
