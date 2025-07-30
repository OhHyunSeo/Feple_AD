"use client";

import React, { useState } from "react";
import { FileText, ChevronDown, ChevronUp, ArrowUpDown } from "lucide-react";
import Pagination from "./Pagination";
import { ConsultationData } from "../../../data/consultationData";
import { useState as useLocalState, useEffect, useCallback } from "react";
import {
  getFixedEvaluationsByConsultant,
  getAllFixedEvaluations,
} from "../../../data/fixedQcMockData";

// QC 피드백 입력 및 표시 컴포넌트
const QcFeedbackSection = ({
  sessionNo,
  submittedFeedback,
  onSubmit,
}: {
  sessionNo: number;
  submittedFeedback: string | undefined;
  onSubmit: (sessionNo: number, feedback: string) => void;
}) => {
  const [feedback, setFeedback] = useState(submittedFeedback || "");
  const [isEditing, setIsEditing] = useState(!submittedFeedback);

  const handleSubmit = () => {
    if (!feedback.trim()) {
      // alert("피드백 내용을 입력해주세요.");
      return;
    }
    onSubmit(sessionNo, feedback);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="bg-pink-50 border-l-4 border-pink-500 animate-slide-down">
        <div className="p-3 space-y-2">
          <h4 className="text-xs font-semibold text-gray-800 mb-2">
            ✍🏻 피드백 작성
          </h4>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md text-xs focus:ring-2 focus:ring-pink-400 focus:border-transparent"
            rows={3}
            placeholder="피드백을 작성해주세요"
          />
          <div className="flex justify-end gap-2">
            {submittedFeedback && (
              <button
                onClick={() => setIsEditing(false)}
                className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded text-xs font-medium hover:bg-gray-300 transition-colors"
              >
                취소
              </button>
            )}
            <button
              onClick={handleSubmit}
              className="px-3 py-1.5 bg-pink-500 text-white rounded text-xs font-medium hover:bg-pink-600 transition-colors"
            >
              {submittedFeedback ? "수정 완료" : "피드백 제출"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-pink-50 border-l-4 border-pink-500 animate-slide-down">
      <div className="p-3 space-y-2">
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-xs font-semibold text-gray-800">✅ QC 피드백</h4>
          <button
            onClick={() => setIsEditing(true)}
            className="text-xs text-pink-600 hover:underline"
          >
            수정하기
          </button>
        </div>
        <p className="text-xs text-gray-700 bg-white p-2 rounded-md whitespace-pre-wrap">
          {submittedFeedback}
        </p>
      </div>
    </div>
  );
};

// 상담사 뷰 피드백 표시 컴포넌트
const ConsultantFeedbackSection = ({ item }: { item: ConsultationData }) => (
  <div className="bg-pink-50 border-l-4 border-pink-500 animate-slide-down">
    <div className="p-3 space-y-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="bg-white rounded-lg p-3 shadow-sm">
          <h4 className="text-xs font-semibold text-blue-600 mb-2 flex items-center gap-1">
            💪 강점
          </h4>
          <ul className="space-y-1">
            {item.feedback.strengths.map((strength, idx) => (
              <li key={idx} className="text-xs text-gray-700 leading-relaxed">
                • {strength}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm">
          <h4 className="text-xs font-semibold text-red-600 mb-2">🎯 개선점</h4>
          <ul className="space-y-1">
            {item.feedback.improvements.map((improvement, idx) => (
              <li key={idx} className="text-xs text-gray-700 leading-relaxed">
                • {improvement}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="bg-white rounded-lg p-3 shadow-sm">
        <h4 className="text-xs font-semibold text-green-600 mb-2">
          🎓 코칭 멘트
        </h4>
        <ul className="space-y-1">
          {item.feedback.coaching.map((coaching, idx) => (
            <li key={idx} className="text-xs text-gray-700 leading-relaxed">
              • {coaching}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

interface ConsultationTableProps {
  startDate: string;
  endDate: string;
  onSessionSelect?: (sessionNo: number, sessionId?: string) => void;
  consultantId?: string;
  useMockData?: boolean;
  selectedSessionNo?: number | null;
  isQcView?: boolean; // QC 뷰 여부
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
  useMockData = false,
  selectedSessionNo,
  isQcView = false, // 기본값 false (상담사 뷰)
}: ConsultationTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedSession, setExpandedSession] = useState<number | null>(null);
  const [submittedFeedbacks, setSubmittedFeedbacks] = useState<
    Record<number, string>
  >({});
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [apiData, setApiData] = useLocalState<ConsultationData[]>([]);
  const [isLoading, setIsLoading] = useLocalState(false);
  const [error, setError] = useLocalState<string | null>(null);
  const itemsPerPage = 10;

  const handleFeedbackSubmit = (sessionNo: number, feedback: string) => {
    setSubmittedFeedbacks((prev) => ({ ...prev, [sessionNo]: feedback }));
    // alert("피드백이 저장되었습니다.");
  };

  const gradeToNumber = (grade: string): number => {
    const gradeMap: { [key: string]: number } = { A: 7, B: 6, C: 5, D: 4, E: 3, F: 2, G: 1 };
    return gradeMap[grade] || 0;
  };

  const sortData = (
    data: ConsultationData[],
    field: SortField,
    direction: SortDirection
  ): ConsultationData[] => {
    return [...data].sort((a, b) => {
      let aValue: number, bValue: number;
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
      let comparison = direction === "desc" ? bValue - aValue : aValue - bValue;
      if (comparison === 0) {
        comparison =
          new Date(b.datetime).getTime() - new Date(a.datetime).getTime();
      }
      return comparison;
    });
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "desc" ? "asc" : "desc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const renderSortIcon = (field: SortField) => {
    if (sortField !== field) return <ArrowUpDown className="h-3 w-3 text-gray-400 ml-1" />;
    return sortDirection === "desc" ? <ChevronDown className="h-3 w-3 text-blue-500 ml-1" /> : <ChevronUp className="h-3 w-3 text-blue-500 ml-1" />;
  };

  const fetchEvaluationData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({ startDate, endDate });
      if (consultantId) params.append("consultantId", consultantId);
      const response = await fetch(`/api/counselor-evaluations?${params}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setApiData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "데이터 로딩 실패");
      setApiData([]);
    } finally {
      setIsLoading(false);
    }
  }, [startDate, endDate, consultantId, setApiData, setError, setIsLoading]);

  useEffect(() => {
    if (startDate && endDate) fetchEvaluationData();
  }, [startDate, endDate, consultantId, fetchEvaluationData]);

  const getFilteredData = (): ConsultationData[] => {
    let data = useMockData
      ? consultantId
        ? getFixedEvaluationsByConsultant(consultantId)
        : getAllFixedEvaluations()
      : apiData;

    if (useMockData && startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      data = data.filter(item => {
        const itemDate = new Date(item.datetime);
        return itemDate >= start && itemDate <= end;
      });
    }
    return sortField ? sortData(data, sortField, sortDirection) : data;
  };

  const consultationData = getFilteredData();
  const totalPages = Math.ceil(consultationData.length / itemsPerPage);
  const currentData = consultationData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleSessionClick = (sessionNo: number, sessionId?: string) => {
    if (onSessionSelect) onSessionSelect(sessionNo, sessionId);
    setExpandedSession(expandedSession === sessionNo ? null : sessionNo);
  };

  const getResultColor = (result: string) => {
    switch (result) {
      case "만족": return "bg-green-100 text-green-800";
      case "미흡": return "bg-yellow-100 text-yellow-800";
      case "추가 상담 필요": return "bg-orange-100 text-orange-800";
      case "해결 불가": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-blue-500" />
          <h3 className="text-lg font-semibold text-gray-800">상담 내역</h3>
        </div>
        <div className="text-sm text-gray-600">총 {consultationData.length}건</div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-center p-2 font-medium text-gray-700 text-[10px]">No</th>
              <th className="text-center p-2 font-medium text-gray-700 text-[10px] cursor-pointer hover:bg-gray-100" onClick={() => handleSort("datetime")}>
                <div className="flex items-center justify-center">상담 일시{renderSortIcon("datetime")}</div>
              </th>
              <th className="text-center p-2 font-medium text-gray-700 text-[10px] cursor-pointer hover:bg-gray-100" onClick={() => handleSort("finalScore")}>
                <div className="flex items-center justify-center">최종 점수{renderSortIcon("finalScore")}</div>
              </th>
              <th className="text-center p-2 font-medium text-gray-700 text-[10px] cursor-pointer hover:bg-gray-100" onClick={() => handleSort("courtesy")}>
                <div className="flex items-center justify-center">정중함 및 언어 품질{renderSortIcon("courtesy")}</div>
              </th>
              <th className="text-center p-2 font-medium text-gray-700 text-[10px] cursor-pointer hover:bg-gray-100" onClick={() => handleSort("empathy")}>
                <div className="flex items-center justify-center">공감적 소통{renderSortIcon("empathy")}</div>
              </th>
              <th className="text-center p-2 font-medium text-gray-700 text-[10px] cursor-pointer hover:bg-gray-100" onClick={() => handleSort("problemSolving")}>
                <div className="flex items-center justify-center">문제 해결 역량{renderSortIcon("problemSolving")}</div>
              </th>
              <th className="text-center p-2 font-medium text-gray-700 text-[10px] cursor-pointer hover:bg-gray-100" onClick={() => handleSort("emotionalStability")}>
                <div className="flex items-center justify-center">감정 안정성{renderSortIcon("emotionalStability")}</div>
              </th>
              <th className="text-center p-2 font-medium text-gray-700 text-[10px] cursor-pointer hover:bg-gray-100" onClick={() => handleSort("communicationFlow")}>
                <div className="flex items-center justify-center">대화 흐름 및 응대 태도{renderSortIcon("communicationFlow")}</div>
              </th>
              <th className="text-center p-2 font-medium text-gray-700 text-[10px]">해결 상태</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item) => (
              <React.Fragment key={item.no}>
                <tr
                  onClick={() => handleSessionClick(item.no, (item as ConsultationData & { sessionId?: string }).sessionId)}
                  className={`border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${selectedSessionNo === item.no ? "bg-pink-50" : ""} ${expandedSession === item.no ? "border-b-0" : ""}`}
                >
                  <td className="p-2 text-center">{item.no} <ChevronDown className={`inline h-3 w-3 transition-transform ${expandedSession === item.no ? "rotate-180" : ""}`} /></td>
                  <td className="p-2 text-center">{item.datetime}</td>
                  <td className="p-2 text-center font-medium">{item.finalScore}점</td>
                  <td className="p-2 text-center">{item.courtesy}</td>
                  <td className="p-2 text-center">{item.empathy}</td>
                  <td className="p-2 text-center">{item.problemSolving}</td>
                  <td className="p-2 text-center">{item.emotionalStability}</td>
                  <td className="p-2 text-center">{item.communicationFlow}</td>
                  <td className="p-2 text-center"><span className={`px-1.5 py-0.5 rounded text-[9px] font-medium ${getResultColor(item.result)}`}>{item.result}</span></td>
                </tr>
                {expandedSession === item.no && (
                  <tr className={selectedSessionNo === item.no ? "bg-pink-50" : ""}>
                    <td colSpan={9} className="p-0">
                      {isQcView ? (
                        <QcFeedbackSection
                          sessionNo={item.no}
                          submittedFeedback={submittedFeedbacks[item.no]}
                          onSubmit={handleFeedbackSubmit}
                        />
                      ) : (
                        <ConsultantFeedbackSection item={item} />
                      )}
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  );
}

