"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  FileText,
  BarChart3,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Loader2,
} from "lucide-react";
import {
  generateConversationData,
  ConversationDetailData,
} from "../../../data/consultationData";

interface ConversationDetailProps {
  sessionNo: number | null;
  sessionId?: string | null;
  onClose: () => void;
  showAudioWhenMissing?: boolean;
  isQcView?: boolean; // QC 대시보드 뷰 여부
}

export default function ConversationDetail({
  sessionNo,
  sessionId,
  onClose,
  showAudioWhenMissing = false,
  isQcView = false, // 기본값은 false (상담사 뷰)
}: ConversationDetailProps) {
  const [activeTab, setActiveTab] = useState<"original" | "summary">(
    "original"
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [conversationData, setConversationData] =
    useState<ConversationDetailData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const fetchConversationDetail = useCallback(
    async (sessionId: string) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `/api/conversation-detail?sessionId=${sessionId}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setConversationData(data);
      } catch (err) {
        console.error("상담 상세 데이터 조회 실패:", err);
        setError(err instanceof Error ? err.message : "데이터 로딩 실패");
        if (sessionNo) {
          setConversationData(generateConversationData(sessionNo));
        }
      } finally {
        setIsLoading(false);
      }
    },
    [sessionNo]
  );

  useEffect(() => {
    if (sessionId) {
      fetchConversationDetail(sessionId);
    } else if (sessionNo) {
      setConversationData(generateConversationData(sessionNo));
    } else {
      setConversationData(null);
    }
  }, [sessionId, sessionNo, fetchConversationDetail]);

  useEffect(() => {
    if (!conversationData) return;
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setCurrentTime(0);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", () => setIsPlaying(false));

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", () => setIsPlaying(false));
    };
  }, [conversationData]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) audio.pause();
    else audio.play();
    setIsPlaying(!isPlaying);
  };

  const skipTime = (seconds: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(
      0,
      Math.min(audio.duration || 0, audio.currentTime + seconds)
    );
  };

  const seekToTime = (time: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = time;
    setCurrentTime(time);
  };

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3">
        <div className="flex items-center justify-center h-32">
          <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
          <span className="text-xs text-gray-600 ml-2">
            상담 상세 정보를 불러오는 중...
          </span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3">
        <p className="text-xs text-red-600">오류: {error}</p>
      </div>
    );
  }

  if (!conversationData) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-800">상담 상세</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-sm"
          >
            ✕
          </button>
        </div>
        <p className="text-xs text-gray-500">세션을 선택해주세요.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5">
          <FileText className="h-4 w-4 text-blue-500" />
          <h3 className="text-sm font-semibold text-gray-800">상담 상세</h3>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 text-sm"
        >
          ✕
        </button>
      </div>

      {!isQcView && (
        <>
          <div className="mb-3 p-2 bg-gray-50 rounded text-center">
            <span className="text-xs text-gray-600">최종 점수</span>
            <div className="text-sm font-bold text-gray-800">
              {conversationData.finalScore}점
            </div>
          </div>
          <div className="mb-3">
            <h4 className="text-xs font-semibold text-gray-700 mb-1.5">
              평가 결과
            </h4>
            <div className="grid grid-cols-3 gap-1.5 text-xs">
              <div className="text-center">
                <div className="text-gray-600 mb-1">정중함</div>
                <span className="text-gray-800 font-medium">
                  {conversationData.courtesy}
                </span>
              </div>
              <div className="text-center">
                <div className="text-gray-600 mb-1">공감</div>
                <span className="text-gray-800 font-medium">
                  {conversationData.empathy}
                </span>
              </div>
              <div className="text-center">
                <div className="text-gray-600 mb-1">문제해결</div>
                <span className="text-gray-800 font-medium">
                  {conversationData.problemSolving}
                </span>
              </div>
              <div className="text-center">
                <div className="text-gray-600 mb-1">감정안정</div>
                <span className="text-gray-800 font-medium">
                  {conversationData.emotionalStability}
                </span>
              </div>
              <div className="text-center">
                <div className="text-gray-600 mb-1">대화흐름</div>
                <span className="text-gray-800 font-medium">
                  {conversationData.communicationFlow}
                </span>
              </div>
              <div className="text-center">
                <div className="text-gray-600 mb-1">해결상태</div>
                <span
                  className={`px-1.5 py-1 rounded text-[10px] font-medium ${
                    conversationData.result === "만족"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {conversationData.result}
                </span>
              </div>
            </div>
          </div>
        </>
      )}

      <div className="flex bg-gray-100 rounded-lg mb-3 p-1">
        <button
          onClick={() => setActiveTab("original")}
          className={`flex-1 py-1 px-2 rounded text-xs font-medium transition-colors ${
            activeTab === "original"
              ? "bg-white text-blue-600 shadow-sm"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          <FileText className="h-3 w-3 inline mr-1" />
          상담 원문
        </button>
        <button
          onClick={() => setActiveTab("summary")}
          className={`flex-1 py-1 px-2 rounded text-xs font-medium transition-colors ${
            activeTab === "summary"
              ? "bg-white text-blue-600 shadow-sm"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          <BarChart3 className="h-3 w-3 inline mr-1" />
          피드백
        </button>
      </div>

      {(conversationData.audioUrl || showAudioWhenMissing) && (
        <div className="mb-3 p-2 bg-gray-50 rounded-lg">
          <audio
            ref={audioRef}
            src={conversationData.audioUrl || undefined}
            preload="metadata"
          />
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1">
              <button
                onClick={() => skipTime(-10)}
                disabled={!conversationData.audioUrl}
              >
                <SkipBack className="h-3 w-3" />
              </button>
              <button
                onClick={togglePlay}
                disabled={!conversationData.audioUrl}
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
              </button>
              <button
                onClick={() => skipTime(10)}
                disabled={!conversationData.audioUrl}
              >
                <SkipForward className="h-3 w-3" />
              </button>
            </div>
            <div className="text-xs text-gray-600">
              {conversationData.audioUrl
                ? `${formatTime(currentTime)} / ${formatTime(
                    conversationData.totalDuration
                  )}`
                : "오디오 없음"}
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full"
              style={{
                width: `${
                  conversationData.totalDuration > 0 &&
                  conversationData.audioUrl
                    ? (currentTime / conversationData.totalDuration) * 100
                    : 0
                }%`,
              }}
            />
          </div>
        </div>
      )}

      <div className="flex-1 overflow-hidden">
        {activeTab === "original" ? (
          <div
            className={`space-y-1.5 overflow-y-auto ${
              isQcView ? "h-full" : "max-h-[440px]"
            }`}
          >
            {conversationData.conversation.map((msg, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg cursor-pointer ${
                  msg.speaker === "상담사" ? "bg-pink-100" : "bg-gray-100"
                }`}
                onClick={() => seekToTime(msg.startTime)}
              >
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`font-medium text-[10px] ${
                      msg.speaker === "상담사"
                        ? "text-pink-600"
                        : "text-gray-600"
                    }`}
                  >
                    {msg.speaker}
                  </span>
                  <span className="text-[9px] text-gray-400">
                    {formatTime(msg.startTime)}
                  </span>
                </div>
                <p className="text-gray-700 text-xs">{msg.message}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-1 space-y-3 overflow-y-auto h-full">
            <div className="bg-white rounded-lg p-3 shadow-sm border">
              <h4 className="text-xs font-semibold text-blue-600 mb-2 flex items-center gap-1.5">
                <span className="text-sm">💪</span> 강점
              </h4>
              <ul className="space-y-1.5">
                {conversationData.feedback.strengths.map((s, i) => (
                  <li
                    key={i}
                    className="text-xs text-gray-700 flex items-start"
                  >
                    <span className="mr-1.5 mt-0.5 text-blue-500">•</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-lg p-3 shadow-sm border">
              <h4 className="text-xs font-semibold text-red-600 mb-2 flex items-center gap-1.5">
                <span className="text-sm">🎯</span> 개선점
              </h4>
              <ul className="space-y-1.5">
                {conversationData.feedback.improvements.map((s, i) => (
                  <li
                    key={i}
                    className="text-xs text-gray-700 flex items-start"
                  >
                    <span className="mr-1.5 mt-0.5 text-red-500">•</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-lg p-3 shadow-sm border">
              <h4 className="text-xs font-semibold text-green-600 mb-2 flex items-center gap-1.5">
                <span className="text-sm">🎓</span> 코칭 멘트
              </h4>
              <ul className="space-y-1.5">
                {conversationData.feedback.coaching.map((s, i) => (
                  <li
                    key={i}
                    className="text-xs text-gray-700 flex items-start"
                  >
                    <span className="mr-1.5 mt-0.5 text-green-500">•</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
