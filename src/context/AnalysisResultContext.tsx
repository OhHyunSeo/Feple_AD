'use client';

import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import axios from 'axios';
import { supabase } from '@/lib/supabaseClient';
import { v4 as uuidv4 } from 'uuid';

export interface TranscriptItem {
  speaker: 'Agent' | 'Customer';
  text: string;
}

export interface AnalysisResult {
  metrics: { [key: string]: number | string };
  transcript: TranscriptItem[];
}

interface AnalysisResultContextType {
  analysisResult: AnalysisResult | null;
  isLoading: boolean;
  error: string | null;
  startAnalysis: (file: File) => Promise<void>;
}

const AnalysisResultContext = createContext<AnalysisResultContextType | undefined>(undefined);

export const AnalysisResultProvider = ({ children }: { children: ReactNode }) => {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [predictionId, setPredictionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const startAnalysis = async (file: File) => {
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);
    setPredictionId(null);

    try {
      // 1. Supabase Storage에 파일 업로드
      const fileExtension = file.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExtension}`;
      const filePath = `public/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('audio-bucket') // 실제 버킷 이름으로 변경 필요
        .upload(filePath, file);

      if (uploadError) {
        throw new Error(`Supabase upload error: ${uploadError.message}`);
      }

      // 2. 업로드된 파일의 Public URL 가져오기
      const { data: urlData } = supabase.storage
        .from('audio-bucket') // 실제 버킷 이름으로 변경 필요
        .getPublicUrl(filePath);

      if (!urlData || !urlData.publicUrl) {
        throw new Error('Could not get public URL for the uploaded file.');
      }
      
      const fileUrl = urlData.publicUrl;

      // 3. 백엔드 API에 파일 URL을 보내 분석 시작 요청
      const response = await axios.post('/api/analyze-url', { url: fileUrl });

      if (response.data && response.data.id) {
        setPredictionId(response.data.id);
      } else {
        throw new Error("Invalid response from server: No prediction ID");
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : '분석 시작 요청에 실패했습니다.';
      console.error("An error occurred during the analysis process:", error);
      setError(errorMessage);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!predictionId) return;

    const interval = setInterval(async () => {
      try {
        const response = await axios.get(`/api/predictions/${predictionId}`);
        const { status, output } = response.data;

        if (status === 'succeeded') {
          setAnalysisResult(output);
          setIsLoading(false);
          setPredictionId(null);
          clearInterval(interval);
        } else if (status === 'failed') {
          setError('모델 분석에 실패했습니다.');
          setIsLoading(false);
          setPredictionId(null);
          clearInterval(interval);
        }
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : '분석 결과를 가져오는 데 실패했습니다.';
        console.error("Polling error:", error);
        setError(errorMessage);
        setIsLoading(false);
        setPredictionId(null);
        clearInterval(interval);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [predictionId]);

  const value = { analysisResult, isLoading, error, startAnalysis };

  return (
    <AnalysisResultContext.Provider value={value}>
      {children}
    </AnalysisResultContext.Provider>
  );
};

export const useAnalysisResult = () => {
  const context = useContext(AnalysisResultContext);
  if (context === undefined) {
    throw new Error('useAnalysisResult must be used within a AnalysisResultProvider');
  }
  return context;
};
