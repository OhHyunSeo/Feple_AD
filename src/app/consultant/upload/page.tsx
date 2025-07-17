"use client";

import React, { useState } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import DashboardLayout from "@/components/DashboardLayout";
import { useAnalysisResult } from "@/context/AnalysisResultContext";
import { ResultsDisplay } from "@/components/ResultsDisplay";
import { motion } from "framer-motion";

export default function UploadPage() {
  const { analysisResult, isLoading, error, startAnalysis } =
    useAnalysisResult();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUploadAndAnalyze = async () => {
    if (!selectedFile) {
      alert("업로드할 파일을 선택해주세요.");
      return;
    }
    await startAnalysis(selectedFile);
  };

  return (
    <DashboardLayout>
      <div className="w-full max-w-4xl mx-auto py-4 px-3">
        <h1 className="text-lg font-semibold text-gray-800 mb-4 korean-heading">
          상담 파일 업로드 및 분석
        </h1>

        {/* 분석 결과가 없을 때�� 업로드 UI 표시 */}
        {!analysisResult && (
          <Card>
            <div className="p-4">
              <div className="flex flex-col items-center justify-center w-full">
                <label
                  htmlFor="audio-upload"
                  className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex flex-col items-center justify-center pt-4 pb-4">
                    <svg
                      className="w-8 h-8 mb-3 text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-1 text-xs text-gray-500">
                      <span className="font-medium">
                        클릭하여 파일을 업로드
                      </span>
                      하거나 드래그 앤 드롭하세요.
                    </p>
                    <p className="text-xs text-gray-400">
                      오디오 파일 (MP3, WAV, M4A 등)
                    </p>
                  </div>
                  <input
                    id="audio-upload"
                    type="file"
                    className="hidden"
                    accept="audio/*"
                    onChange={handleFileChange}
                  />
                </label>

                {selectedFile && (
                  <div className="w-full mt-4 text-center">
                    <p className="text-sm font-medium text-gray-700">
                      선택된 파일:{" "}
                      <span className="font-semibold text-purple-600">
                        {selectedFile.name}
                      </span>
                    </p>
                  </div>
                )}

                <div className="w-full flex justify-end mt-4 text-white">
                  <Button
                    onClick={handleUploadAndAnalyze}
                    disabled={!selectedFile || isLoading}
                    loading={isLoading}
                    size="md"
                  >
                    {isLoading ? "분석 중..." : "분석 시작"}
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        )}

        {isLoading && (
          <div className="text-center mt-4 p-3 bg-purple-50 text-purple-700 rounded-lg">
            <p className="animate-pulse font-medium text-sm">
              AI 모델이 분석 중입니다. 잠시만 기다려주세요...
            </p>
            <p className="text-xs mt-1">
              이 페이지를 벗어나도 분석은 계속 진행됩니다.
            </p>
          </div>
        )}

        {error && (
          <motion.div
            className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="font-medium text-sm">오류 발생</p>
            <p className="text-sm">{error}</p>
          </motion.div>
        )}

        {analysisResult && (
          <div className="mt-6">
            <motion.h2
              className="text-lg font-semibold text-gray-800 mb-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              분석 결과
            </motion.h2>
            <ResultsDisplay data={analysisResult} />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
