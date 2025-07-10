import DashboardLayout from "@/components/DashboardLayout";
import { FileText, Search, Filter, Plus, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";

// 평가 더미 데이터
const evaluations = [
  {
    id: 1,
    title: "2024년 4분기 정기평가",
    type: "정기평가",
    consultant: "김민수",
    department: "고객상담 1팀",
    evaluator: "박부장",
    status: "completed",
    dueDate: "2024-12-31",
    completedDate: "2024-12-20",
    score: 4.8,
    progress: 100,
  },
  {
    id: 2,
    title: "고객서비스 역량 평가",
    type: "역량진단",
    consultant: "이영희",
    department: "고객상담 2팀",
    evaluator: "김팀장",
    status: "in_progress",
    dueDate: "2024-12-28",
    completedDate: null,
    score: null,
    progress: 60,
  },
  {
    id: 3,
    title: "VIP 고객 응대 수시평가",
    type: "수시평가",
    consultant: "최동욱",
    department: "VIP상담팀",
    evaluator: "이부장",
    status: "pending",
    dueDate: "2024-12-30",
    completedDate: null,
    score: null,
    progress: 0,
  },
  {
    id: 4,
    title: "기술지원 역량 평가",
    type: "역량진단",
    consultant: "박철수",
    department: "기술지원팀",
    evaluator: "정부장",
    status: "completed",
    dueDate: "2024-12-25",
    completedDate: "2024-12-22",
    score: 4.9,
    progress: 100,
  },
  {
    id: 5,
    title: "신입사원 자기평가",
    type: "자기평가",
    consultant: "정수진",
    department: "고객상담 1팀",
    evaluator: "본인",
    status: "overdue",
    dueDate: "2024-12-20",
    completedDate: null,
    score: null,
    progress: 30,
  },
];

export default function EvaluationsPage() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            완료
          </span>
        );
      case "in_progress":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <Clock className="w-3 h-3 mr-1" />
            진행중
          </span>
        );
      case "pending":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <AlertCircle className="w-3 h-3 mr-1" />
            대기
          </span>
        );
      case "overdue":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircle className="w-3 h-3 mr-1" />
            지연
          </span>
        );
      default:
        return null;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "정기평가":
        return "bg-blue-100 text-blue-800";
      case "수시평가":
        return "bg-green-100 text-green-800";
      case "역량진단":
        return "bg-purple-100 text-purple-800";
      case "자기평가":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const completedCount = evaluations.filter(e => e.status === "completed").length;
  const inProgressCount = evaluations.filter(e => e.status === "in_progress").length;
  const overdueCount = evaluations.filter(e => e.status === "overdue").length;

  return (
    <DashboardLayout title="평가 관리">
      <div className="space-y-6">
        {/* 페이지 헤더 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">평가 관리</h1>
            <p className="text-gray-600 mt-1">상담사 평가 생성, 진행, 완료 상황을 관리합니다</p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
            <Plus className="h-4 w-4" />
            평가 생성
          </button>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">전체 평가</p>
                <p className="text-2xl font-bold text-gray-900">{evaluations.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">완료된 평가</p>
                <p className="text-2xl font-bold text-gray-900">{completedCount}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">진행중 평가</p>
                <p className="text-2xl font-bold text-gray-900">{inProgressCount}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <XCircle className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">지연된 평가</p>
                <p className="text-2xl font-bold text-gray-900">{overdueCount}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 검색 및 필터 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="평가명, 상담사, 평가자로 검색..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">모든 상태</option>
              <option value="completed">완료</option>
              <option value="in_progress">진행중</option>
              <option value="pending">대기</option>
              <option value="overdue">지연</option>
            </select>
            <select className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">모든 유형</option>
              <option value="정기평가">정기평가</option>
              <option value="수시평가">수시평가</option>
              <option value="역량진단">역량진단</option>
              <option value="자기평가">자기평가</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
              <Filter className="h-4 w-4" />
              필터
            </button>
          </div>
        </div>

        {/* 평가 목록 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">평가 목록</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    평가명
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    유형
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    상담사
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    평가자
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    진행률
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    점수
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    마감일
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    상태
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    액션
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {evaluations.map((evaluation) => (
                  <tr key={evaluation.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{evaluation.title}</div>
                      <div className="text-sm text-gray-500">ID: {evaluation.id}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(evaluation.type)}`}>
                        {evaluation.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{evaluation.consultant}</div>
                      <div className="text-sm text-gray-500">{evaluation.department}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{evaluation.evaluator}</div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center">
                        <div className="w-16">
                          <div className="bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${evaluation.progress}%` }}
                            ></div>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">{evaluation.progress}%</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {evaluation.score ? (
                        <span className="text-sm font-medium text-gray-900">{evaluation.score}</span>
                      ) : (
                        <span className="text-sm text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="text-sm text-gray-900">{evaluation.dueDate}</div>
                      {evaluation.completedDate && (
                        <div className="text-xs text-gray-500">완료: {evaluation.completedDate}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {getStatusBadge(evaluation.status)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center gap-2">
                        <button className="text-blue-600 hover:text-blue-900 text-sm font-medium">
                          보기
                        </button>
                        {evaluation.status !== "completed" && (
                          <button className="text-green-600 hover:text-green-900 text-sm font-medium">
                            편집
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 