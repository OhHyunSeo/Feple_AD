'use client';

import React, { useState } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import DashboardLayout from '@/components/DashboardLayout';

export default function UploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) {
      alert('업로드할 파일을 선택해주세요.');
      return;
    }
    setIsUploading(true);
    // 실제 업로드 로직을 여기에 구현합니다.
    // 예: FormData를 사용하여 서버로 파일 전송
    console.log('Uploading file:', selectedFile.name);
    setTimeout(() => {
      setIsUploading(false);
      alert('파일 업로드가 완료되었습니다.');
      setSelectedFile(null);
    }, 2000);
  };

  return (
    <DashboardLayout>
      <div className="w-full max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 korean-heading">상담 파일 업로드</h1>
        <Card>
          <div className="p-6">
            <div className="flex flex-col items-center justify-center w-full">
              <label
                htmlFor="audio-upload"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg className="w-10 h-10 mb-4 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                  </svg>
                  <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">클릭하여 파일을 업로드</span>하거나 드래그 앤 드롭하세요.</p>
                  <p className="text-xs text-gray-500">오디오 파일 (MP3, WAV, M4A 등)</p>
                </div>
                <input id="audio-upload" type="file" className="hidden" accept="audio/*" onChange={handleFileChange} />
              </label>

              {selectedFile && (
                <div className="w-full mt-6 text-center">
                  <p className="text-lg font-medium text-gray-700">
                    선택된 파일: <span className="font-bold text-purple-600">{selectedFile.name}</span>
                  </p>
                </div>
              )}

              <div className="w-full flex justify-end mt-6">
                <Button
                  onClick={handleUpload}
                  disabled={!selectedFile || isUploading}
                  loading={isUploading}
                  size="lg"
                >
                  {isUploading ? '업로드 중...' : '파일 업로드'}
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
