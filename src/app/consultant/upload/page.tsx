"use client";

import React, { useState } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import DashboardLayout from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';

export default function UploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false); // Local loading state
  const [message, setMessage] = useState(''); // Local message/error state
  const supabase = createClientComponentClient();
  const router = useRouter();

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

    setUploading(true);
    setMessage('파일 업로드 중...');

    const fileExtension = selectedFile.name.split('.').pop();
    const sessionId = uuidv4();
    const fileName = `${sessionId}.${fileExtension}`;

    try {
      // 1. Supabase Storage에 오디오 파일 업로드
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('audio_bucket') // Replace with actual bucket name if different
        .upload(`public/audio/${fileName}`, selectedFile, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data: publicUrlData } = supabase.storage
        .from('audio_bucket')
        .getPublicUrl(`public/audio/${fileName}`);
      const audioUrl = publicUrlData.publicUrl;

      setMessage('파일 업로드 성공! LLM 분석 요청 중...');

      // 2. 배포된 LLM Vercel 엔드포인트 호출
      const llmEndpointUrl = 'https://llm-auto-9kiw6880h-rlgns-projects.vercel.app/api/evaluate';
      // const llmApiKey = 'YOUR_LLM_API_KEY'; // Uncomment and set if needed

      const llmResponse = await fetch(llmEndpointUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${llmApiKey}`, // Uncomment if API key is required
        },
        body: JSON.stringify({
          audio_url: audioUrl,
          session_id: sessionId,
          // Add other necessary data for LLM if any, e.g., consultantId
        }),
      });

      if (!llmResponse.ok) {
        const errorText = await llmResponse.text();
        throw new Error(`LLM 분석 요청 실패: ${llmResponse.status} - ${errorText}`);
      }

      const llmResult = await llmResponse.json();
      setMessage('LLM 분석 요청 성공! 결과 처리 중...');
      console.log('LLM 분석 결과:', llmResult);

      // Redirect to performance page (assuming it can handle sessionId as query param)
      router.push(`/consultant/performance?sessionId=${sessionId}`);
      // setMessage('파일 업로드 및 LLM 분석 요청 완료. 대시보드에서 결과를 확인하세요.');

    } catch (error: any) {
      setMessage(`오류 발생: ${error.message}`);
      console.error('Error during upload or LLM call:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="w-full max-w-4xl mx-auto py-4 px-3">
        <h1 className="text-lg font-semibold text-gray-800 mb-4 korean-heading">
          상담 파일 업로드 및 분석
        </h1>

        {/* 업로드 UI 표시 */}
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
                  disabled={!selectedFile || uploading}
                  loading={uploading}
                  size="md"
                >
                  {uploading ? "분석 중..." : "분석 시작"}
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {uploading && (
          <div className="text-center mt-4 p-3 bg-purple-50 text-purple-700 rounded-lg">
            <p className="animate-pulse font-medium text-sm">
              AI 모델이 분석 중입니다. 잠시만 기다려주세요...
            </p>
            <p className="text-xs mt-1">
              이 페이지를 벗어나도 분석은 계속 진행됩니다.
            </p>
          </div>
        )}

        {message && (
          <motion.div
            className={`mt-4 p-3 rounded-lg ${message.includes('오류') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="font-medium text-sm">{message}</p>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
}