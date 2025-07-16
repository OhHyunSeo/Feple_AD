"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  FileText,
  BarChart3,
  Play,
  Pause,
  SkipBack,
  SkipForward,
} from "lucide-react";
import {
  generateConversationData,
  ConversationDetailData,
} from "../../../data/consultationData";

interface ConversationDetailProps {
  sessionNo: number | null;
  onClose: () => void;
}

export default function ConversationDetail({
  sessionNo,
  onClose,
}: ConversationDetailProps) {
  const [activeTab, setActiveTab] = useState<"original" | "summary">(
    "original"
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  // 세션 데이터 생성
  const conversationData: ConversationDetailData | null = sessionNo
    ? generateConversationData(sessionNo)
    : null;

  // 오디오 관련 이펙트
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

  // 재생/일시정지
  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  // 되감기/앞으로 감기
  const skipTime = (seconds: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = Math.max(
      0,
      Math.min(audio.duration || 0, audio.currentTime + seconds)
    );
  };

  // 특정 시간으로 이동
  const seekToTime = (time: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = time;
    setCurrentTime(time);
  };

  // 시간 포맷팅
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // 세션이 선택되지 않은 경우
  if (!conversationData) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-2">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-gray-800">상담 상세</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xs"
          >
            ✕
          </button>
        </div>
        <p className="text-xs text-gray-500">세션을 선택해주세요.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-2">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1">
          <FileText className="h-3 w-3 text-blue-500" />
          <h3 className="text-sm font-semibold text-gray-800">
            상담 세션 {conversationData.no}
          </h3>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 text-xs"
        >
          ✕
        </button>
      </div>

      {/* 최종 점수만 표시 */}
      <div className="mb-2 p-1.5 bg-gray-50 rounded text-center">
        <span className="text-[10px] text-gray-600">최종 점수</span>
        <div className="text-sm font-bold text-gray-800">
          {conversationData.finalScore}점
        </div>
      </div>

      {/* 평가 항목 (배경색 제거, 결과만 배경색) */}
      <div className="mb-2">
        <h4 className="text-xs font-semibold text-gray-700 mb-1">평가 결과</h4>
        <div className="grid grid-cols-3 gap-1 text-[10px]">
          <div className="text-center">
            <div className="text-gray-600 mb-0.5">정중함</div>
            <span className="text-gray-800 font-medium">
              {conversationData.courtesy}
            </span>
          </div>
          <div className="text-center">
            <div className="text-gray-600 mb-0.5">공감</div>
            <span className="text-gray-800 font-medium">
              {conversationData.empathy}
            </span>
          </div>
          <div className="text-center">
            <div className="text-gray-600 mb-0.5">문제해결</div>
            <span className="text-gray-800 font-medium">
              {conversationData.problemSolving}
            </span>
          </div>
          <div className="text-center">
            <div className="text-gray-600 mb-0.5">감정안정</div>
            <span className="text-gray-800 font-medium">
              {conversationData.emotionalStability}
            </span>
          </div>
          <div className="text-center">
            <div className="text-gray-600 mb-0.5">대화흐름</div>
            <span className="text-gray-800 font-medium">
              {conversationData.communicationFlow}
            </span>
          </div>
          <div className="text-center">
            <div className="text-gray-600 mb-0.5">결과</div>
            <span
              className={`px-1 py-0.5 rounded text-[9px] font-medium ${
                conversationData.result === "만족"
                  ? "bg-green-100 text-green-800"
                  : conversationData.result === "미흡"
                  ? "bg-yellow-100 text-yellow-800"
                  : conversationData.result === "추가 상담 필요"
                  ? "bg-orange-100 text-orange-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {conversationData.result}
            </span>
          </div>
        </div>
      </div>

      {/* 탭 네비게이션 */}
      <div className="flex bg-gray-100 rounded-lg mb-2 p-0.5">
        <button
          onClick={() => setActiveTab("original")}
          className={`flex-1 py-0.5 px-1.5 rounded text-[10px] font-medium transition-colors ${
            activeTab === "original"
              ? "bg-white text-blue-600 shadow-sm"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          <FileText className="h-2 w-2 inline mr-0.5" />
          상담 원문
        </button>
        <button
          onClick={() => setActiveTab("summary")}
          className={`flex-1 py-0.5 px-1.5 rounded text-[10px] font-medium transition-colors ${
            activeTab === "summary"
              ? "bg-white text-blue-600 shadow-sm"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          <BarChart3 className="h-2 w-2 inline mr-0.5" />
          상담 요약
        </button>
      </div>

      {/* 오디오 플레이어 */}
      {conversationData.audioUrl && (
        <div className="mb-2 p-1.5 bg-gray-50 rounded-lg">
          <audio
            ref={audioRef}
            src={conversationData.audioUrl}
            preload="metadata"
          />

          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-0.5">
              <button
                onClick={() => skipTime(-10)}
                className="p-0.5 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <SkipBack className="h-2 w-2" />
              </button>

              <button
                onClick={togglePlay}
                className="p-0.5 text-blue-600 hover:text-blue-700 transition-colors"
              >
                {isPlaying ? (
                  <Pause className="h-3 w-3" />
                ) : (
                  <Play className="h-3 w-3" />
                )}
              </button>

              <button
                onClick={() => skipTime(10)}
                className="p-0.5 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <SkipForward className="h-2 w-2" />
              </button>
            </div>

            <div className="text-[10px] text-gray-600">
              {formatTime(currentTime)} /{" "}
              {formatTime(conversationData.totalDuration)}
            </div>
          </div>

          {/* 재생 바 */}
          <div className="w-full bg-gray-200 rounded-full h-0.5">
            <div
              className="bg-blue-500 h-0.5 rounded-full transition-all duration-100"
              style={{
                width: `${
                  conversationData.totalDuration > 0
                    ? (currentTime / conversationData.totalDuration) * 100
                    : 0
                }%`,
              }}
            />
          </div>
        </div>
      )}

      {/* 탭 컨텐츠 */}
      <div className="space-y-1">
        {activeTab === "original" ? (
          // 상담 원문 (상담사 핑크 말풍선, 클릭 가능)
          <div className="space-y-1 max-h-48 overflow-y-auto">
            {conversationData.conversation.map((msg, index) => (
              <div
                key={index}
                className={`p-1.5 rounded-lg cursor-pointer hover:opacity-80 transition-opacity ${
                  msg.speaker === "상담사"
                    ? "bg-pink-100 border-pink-300 text-pink-600"
                    : "bg-gray-100 border-gray-300"
                }`}
                onClick={() => seekToTime(msg.startTime)}
              >
                <div className="flex items-center justify-between mb-0.5">
                  <span
                    className={`font-medium text-[9px] ${
                      msg.speaker === "상담사"
                        ? "text-pink-600"
                        : "text-gray-600"
                    }`}
                  >
                    {msg.speaker}
                  </span>
                  <span className="text-[8px] text-gray-400">
                    {formatTime(msg.startTime)}
                  </span>
                </div>
                <p className="text-gray-700 text-[10px] leading-tight">
                  {msg.message}
                </p>
              </div>
            ))}
          </div>
        ) : (
          // 상담 요약 (피드백)
          <div className="space-y-1">
            {/* 강점 */}
            <div className="p-1.5 bg-green-50 rounded-lg">
              <h5 className="text-[10px] font-semibold text-green-700 mb-0.5">
                강점
              </h5>
              <ul className="space-y-0.5">
                {conversationData.feedback.strengths.map((strength, idx) => (
                  <li key={idx} className="text-[9px] text-green-600">
                    • {strength}
                  </li>
                ))}
              </ul>
            </div>

            {/* 개선점 */}
            <div className="p-1.5 bg-red-50 rounded-lg">
              <h5 className="text-[10px] font-semibold text-red-700 mb-0.5">
                개선점
              </h5>
              <ul className="space-y-0.5">
                {conversationData.feedback.improvements.map(
                  (improvement, idx) => (
                    <li key={idx} className="text-[9px] text-red-600">
                      • {improvement}
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* 코칭 멘트 */}
            <div className="p-1.5 bg-blue-50 rounded-lg">
              <h5 className="text-[10px] font-semibold text-blue-700 mb-0.5">
                코칭 멘트
              </h5>
              <ul className="space-y-0.5">
                {conversationData.feedback.coaching.map((coaching, idx) => (
                  <li key={idx} className="text-[9px] text-blue-600">
                    • {coaching}
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
