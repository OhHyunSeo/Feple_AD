"use client";

import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Calendar, Filter, TrendingUp, TrendingDown, Activity, Clock, Award, AlertCircle } from "lucide-react";

export default function MonitoringPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("2025-07-06");
  const [selectedEvaluator, setSelectedEvaluator] = useState("상담 품질팀");

  // 상담품질 요약 데이터
  const qualitySummary = {
    totalCalls: 75,
    increase: 100,
    failedCalls: 50,
    decrease: 35
  };

  // 실시간 품질 지표 데이터
  const realTimeMetrics = [
    { category: "감정", current: 70, rating: "F", color: "text-red-500" },
    { category: "정정성(상)", current: 70, rating: "F", color: "text-red-500" },
    { category: "정정성 및 인지 품질", current: 70, rating: "F", color: "text-red-500" },
    { category: "공정 해결 역량", current: 70, rating: "C", color: "text-orange-500" },
    { category: "감정 처리 역량", current: 70, rating: "C", color: "text-orange-500" },
    { category: "감성 역량성", current: 70, rating: "G", color: "text-green-500" },
    { category: "대화 소통 및 청취 태도", current: 70, rating: "G", color: "text-green-500" },
  ];

  // 상담원별 성과 순위
  const consultantRanking = [
    { rank: 1, name: "김민수컨설팅아", score: 4.8 },
    { rank: 2, name: "오현정사무", score: 4.5 },
    { rank: 3, name: "전미영씨", score: 4.2 }
  ];

  // 상담품질 우수 내용
  const excellentItems = [
    "담당 직원과의 훌륭한 소통: 정중히 의견을 제시하고 상담원의 과정을 신중히 이해합니다.",
    "구체적인 사례를 통한 설명으로, 상담원의 만족을 제공할 기술이 작이 중보입니다.",
    "또한, 정중함을 높이며 위해 대화 전 사료울은 언어적 태도에 측정되고, 상담품질 즉출을 높히는 또한적을 올려야합니다."
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6 text-gray-900">
        {/* 헤더 섹션 */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 korean-heading">상담 모니터링</h1>
            <p className="text-gray-600 mt-2">실시간 상담 품질 모니터링 및 분석</p>
          </div>
          
          <div className="flex gap-3">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <input
                type="date"
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg"
              />
              <span className="text-gray-500">~</span>
              <input
                type="date"
                value="2025-07-07"
                className="px-3 py-2 border border-gray-200 rounded-lg"
              />
            </div>
            <select
              value={selectedEvaluator}
              onChange={(e) => setSelectedEvaluator(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg"
            >
              <option>상담 품질팀</option>
              <option>평가팀 A</option>
              <option>평가팀 B</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600">
              조회
            </button>
          </div>
        </div>

        {/* 상담품질 요약 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Activity className="h-5 w-5 text-pink-500" />
            상담품질 요약
            <span className="text-pink-500 font-bold ml-2">총 건수 20건</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">{qualitySummary.totalCalls}점</div>
              <div className="text-gray-600 mb-2">월간 종합</div>
              <div className="flex items-center justify-center gap-1 text-green-600">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm">{qualitySummary.increase}점</span>
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">{qualitySummary.failedCalls}점</div>
              <div className="text-gray-600 mb-2">월간 종합</div>
              <div className="flex items-center justify-center gap-1 text-red-600">
                <TrendingDown className="h-4 w-4" />
                <span className="text-sm">{qualitySummary.decrease}점</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 실시간 품질 지표 */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5 text-purple-500" />
                실시간 품질 지표
              </h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-600 border-b pb-2">
                  <div className="col-span-1">No</div>
                  <div className="col-span-3">상담영역</div>
                  <div className="col-span-2">품질 점수</div>
                  <div className="col-span-2">정정성 및 인지 품질</div>
                  <div className="col-span-2">검출결과</div>
                  <div className="col-span-2">공정 해결 역량</div>
                </div>
                
                {realTimeMetrics.map((metric, index) => (
                  <div key={index} className="grid grid-cols-12 gap-4 text-sm py-2 border-b border-gray-100">
                    <div className="col-span-1">{index + 11}</div>
                    <div className="col-span-3">2025-07-07 10:06:29</div>
                    <div className="col-span-2">{metric.current}</div>
                    <div className="col-span-2">
                      <span className={`font-semibold ${metric.color}`}>{metric.rating}</span>
                    </div>
                    <div className="col-span-2">
                      <span className={`font-semibold ${metric.color}`}>{metric.rating}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="font-semibold text-blue-600">A</span>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* 페이지네이션 */}
              <div className="flex justify-center items-center gap-2 mt-6">
                <button className="px-3 py-1 text-gray-400">«</button>
                <button className="px-3 py-1 text-gray-400">‹</button>
                <span className="px-3 py-1 text-sm">1 / 2</span>
                <button className="px-3 py-1 text-gray-400">›</button>
                <button className="px-3 py-1 text-gray-400">»</button>
              </div>
            </div>
          </div>

          {/* 상담원별 순위 및 우수 내용 */}
          <div className="space-y-6">
            {/* 상담원별 성과 순위 */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Award className="h-5 w-5 text-yellow-500" />
                상담 우수 내용
              </h3>
              
              <div className="space-y-3">
                <div className="p-3 bg-pink-50 rounded-lg">
                  <div className="text-sm font-medium text-pink-700 mb-1">상담원명</div>
                  <div className="text-lg font-bold text-pink-800">최종 점수</div>
                  <div className="text-2xl font-bold text-pink-600">70</div>
                  <div className="text-sm text-gray-600 mt-2">
                    <span className="font-medium">정점일 및 인지 품질</span>
                    <span className="ml-4 text-pink-600 font-bold">F</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">큰값 대상 역량</span>
                    <span className="ml-8 text-orange-500 font-bold">G</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">상담 전문 역량</span>
                    <span className="ml-8 text-blue-500 font-bold">A</span>
                  </div>
                </div>
                
                {consultantRanking.map((consultant, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full text-white text-xs flex items-center justify-center">
                        {consultant.rank}
                      </div>
                      <span className="font-medium">{consultant.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">⭐ {consultant.score}</div>
                    </div>
                  </div>
                ))}
                
                <div className="mt-4 space-y-4">
                  <button className="w-full py-2 bg-pink-500 text-white rounded-lg text-sm">
                    성과평가 업데이 추가업무입니다
                  </button>
                  <div className="text-xs text-gray-500 text-center">
                    0월0시4분 - 0월0시0분
                  </div>
                  <button className="w-full py-2 bg-pink-500 text-white rounded-lg text-sm">
                    시 신경쓸 이로습니다
                  </button>
                  <div className="text-xs text-gray-500 text-center">
                    0월0시0분 - 0월2시0분
                  </div>
                  <button className="w-full py-2 bg-pink-500 text-white rounded-lg text-sm">
                    관찰팀이실 업실습니다
                  </button>
                  <div className="text-xs text-gray-500 text-center">
                    1월9시7분 - 1월9시1분
                  </div>
                  <button className="w-full py-2 bg-pink-500 text-white rounded-lg text-sm">
                    관찰팀이실 업실습니다
                  </button>
                  <div className="text-xs text-gray-500 text-center">
                    1월3시0분 - 1월4시5분
                  </div>
                  <button className="w-full py-2 bg-pink-500 text-white rounded-lg text-sm">
                    관찰내실 업신습니다
                  </button>
                  <div className="text-xs text-gray-500 text-center">
                    2월0시3분 - 2월1시2분
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 상담품질 우수 내용 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-green-500" />
            활용 가이드
            <div className="ml-auto text-sm text-gray-500">코칭 챗팅</div>
          </h3>
          
          <div className="space-y-3">
            {excellentItems.map((item, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm text-gray-700 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 실시간 평가 진행 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">실시간 평가 진행</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">100점</div>
              <div className="text-sm text-gray-600">100건 종합</div>
              <div className="text-sm text-blue-600">최고 결과</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">90점</div>
              <div className="text-sm text-gray-600">90건 종합</div>
              <div className="text-sm text-green-600">우수 결과</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">60점</div>
              <div className="text-sm text-gray-600">60건 종합</div>
              <div className="text-sm text-orange-600">보통 결과</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">40점</div>
              <div className="text-sm text-gray-600">40건 종합</div>
              <div className="text-sm text-red-600">개선 필요</div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 