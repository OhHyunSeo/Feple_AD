"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { ArrowLeft, User, Calendar, FileText, Target, Star, MessageSquare, Edit, Save, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// 평가 상세 데이터 (실제로는 API에서 가져와야 함)
const evaluationDetail = {
  id: 1,
  title: "2024년 4분기 정기평가",
  type: "정기평가",
  consultant: {
    id: 1,
    name: "김민수",
    department: "고객상담 1팀",
    position: "선임 상담사",
    email: "kim.minsu@company.com",
    avatar: "김"
  },
  evaluator: "박부장",
  status: "completed",
  dueDate: "2024-12-31",
  completedDate: "2024-12-20",
  score: 4.8,
  progress: 100,
  description: "2024년 4분기 정기 인사평가입니다. 올해 한 해 동안의 업무 성과와 역량 발전을 종합적으로 평가합니다.",
  criteria: [
    { name: "의사소통 능력", weight: 20, score: 4.9, feedback: "고객과의 소통에서 뛰어난 능력을 보여줍니다." },
    { name: "업무 수행 능력", weight: 25, score: 4.7, feedback: "주어진 업무를 정확하고 신속하게 처리합니다." },
    { name: "고객 서비스", weight: 25, score: 4.9, feedback: "고객 만족도가 매우 높으며, 친절한 서비스를 제공합니다." },
    { name: "팀워크", weight: 15, score: 4.6, feedback: "동료들과 원활한 협업을 진행합니다." },
    { name: "문제 해결 능력", weight: 15, score: 4.8, feedback: "복잡한 문제를 창의적으로 해결하는 능력이 우수합니다." }
  ],
  comments: [
    {
      id: 1,
      author: "박부장",
      date: "2024-12-20",
      content: "전반적으로 우수한 성과를 보여주셨습니다. 특히 고객 서비스 분야에서 탁월한 능력을 발휘하고 있습니다."
    }
  ]
};

export default function EvaluationDetailPage({ params }: { params: { id: string } }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(evaluationDetail);
  const [newComment, setNewComment] = useState("");

  const handleSave = () => {
    // 여기서 API 호출하여 저장
    console.log("저장된 데이터:", editedData);
    setIsEditing(false);
    alert("평가가 수정되었습니다!");
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    
    const comment = {
      id: Date.now(),
      author: "현재 사용자", // 실제로는 로그인된 사용자 정보
      date: new Date().toISOString().split('T')[0],
      content: newComment
    };
    
    setEditedData(prev => ({
      ...prev,
      comments: [...prev.comments, comment]
    }));
    setNewComment("");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">완료</span>;
      case "in_progress":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">진행중</span>;
      case "pending":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">대기</span>;
      case "overdue":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">지연</span>;
      default:
        return null;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 4.5) return "text-green-600";
    if (score >= 4.0) return "text-blue-600";
    if (score >= 3.5) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <DashboardLayout title="평가 상세">
      <div className="space-y-6">
        {/* 헤더 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/evaluations" className="text-gray-500 hover:text-gray-700">
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{editedData.title}</h1>
              <p className="text-gray-600 mt-1">평가 상세 정보 및 결과</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {getStatusBadge(editedData.status)}
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                <Edit className="h-4 w-4" />
                수정
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  저장
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setEditedData(evaluationDetail);
                  }}
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 flex items-center gap-2"
                >
                  <X className="h-4 w-4" />
                  취소
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 메인 콘텐츠 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 평가 정보 */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-800">평가 정보</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">평가명</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedData.title}
                      onChange={(e) => setEditedData(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900">{editedData.title}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">평가 유형</label>
                  <p className="text-gray-900">{editedData.type}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">평가자</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedData.evaluator}
                      onChange={(e) => setEditedData(prev => ({ ...prev, evaluator: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900">{editedData.evaluator}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">마감일</label>
                  <p className="text-gray-900">{editedData.dueDate}</p>
                </div>
                
                {editedData.completedDate && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">완료일</label>
                    <p className="text-gray-900">{editedData.completedDate}</p>
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">전체 점수</label>
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className={`text-lg font-bold ${getScoreColor(editedData.score)}`}>
                      {editedData.score.toFixed(1)}
                    </span>
                    <span className="text-gray-500">/ 5.0</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">평가 설명</label>
                {isEditing ? (
                  <textarea
                    value={editedData.description}
                    onChange={(e) => setEditedData(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-700">{editedData.description}</p>
                )}
              </div>
            </div>

            {/* 평가 기준별 점수 */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Target className="h-5 w-5 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-800">평가 기준별 결과</h3>
              </div>
              
              <div className="space-y-4">
                {editedData.criteria.map((criterion, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-gray-900">{criterion.name}</h4>
                        <span className="text-sm text-gray-500">({criterion.weight}%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className={`font-bold ${getScoreColor(criterion.score)}`}>
                          {criterion.score.toFixed(1)}
                        </span>
                      </div>
                    </div>
                    <div className="bg-gray-200 rounded-full h-2 mb-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${(criterion.score / 5) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-600">{criterion.feedback}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 코멘트 섹션 */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="h-5 w-5 text-purple-600" />
                <h3 className="text-lg font-semibold text-gray-800">코멘트</h3>
              </div>
              
              <div className="space-y-4">
                {editedData.comments.map((comment) => (
                  <div key={comment.id} className="border-l-4 border-blue-200 bg-blue-50 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-blue-800">{comment.author}</span>
                      <span className="text-sm text-blue-600">{comment.date}</span>
                    </div>
                    <p className="text-blue-700">{comment.content}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="새 코멘트를 입력하세요..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex justify-end mt-2">
                  <button
                    onClick={handleAddComment}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    코멘트 추가
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 사이드바 */}
          <div className="space-y-6">
            {/* 평가 대상자 정보 */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <User className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-800">평가 대상자</h3>
              </div>
              
              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">
                  {editedData.consultant.avatar}
                </div>
                <h4 className="font-medium text-gray-900 mb-1">{editedData.consultant.name}</h4>
                <p className="text-sm text-gray-600 mb-1">{editedData.consultant.department}</p>
                <p className="text-sm text-gray-600 mb-2">{editedData.consultant.position}</p>
                <p className="text-xs text-gray-500">{editedData.consultant.email}</p>
              </div>
            </div>

            {/* 진행률 */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="h-5 w-5 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-800">진행 상황</h3>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">{editedData.progress}%</div>
                <div className="bg-gray-200 rounded-full h-3 mb-4">
                  <div
                    className="bg-green-600 h-3 rounded-full"
                    style={{ width: `${editedData.progress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600">
                  {editedData.status === "completed" ? "평가 완료" : "진행 중"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 