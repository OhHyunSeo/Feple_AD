"use client";

import { Crown, Trophy, Medal } from "lucide-react";

interface Consultant {
  rank: number;
  nickname: string;
  weeklyScore: number;
  isMe: boolean;
}

interface TopConsultantsTableProps {
  consultants: Consultant[];
  myRank: number;
}

export default function TopConsultantsTable({
  consultants,
  myRank,
}: TopConsultantsTableProps) {
  // 상위 3명 추출
  const top3 = consultants.slice(0, 3);

  // 본인이 상위 3명에 포함되는지 확인
  const isInTop3 = myRank <= 3;

  // 본인 정보 (상위 3명에 포함되지 않은 경우)
  const myInfo = consultants.find((c) => c.isMe);

  // 순위별 아이콘 및 색상
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-3 w-3 text-yellow-500" />;
      case 2:
        return <Trophy className="h-3 w-3 text-gray-400" />;
      case 3:
        return <Medal className="h-3 w-3 text-amber-600" />;
      default:
        return (
          <span className="text-xs font-medium text-gray-600">{rank}</span>
        );
    }
  };

  const getRankStyle = (rank: number, isMe: boolean) => {
    if (isMe) {
      return "bg-pink-50 border-pink-200";
    }

    switch (rank) {
      case 1:
        return "bg-yellow-50 border-yellow-200";
      case 2:
        return "bg-gray-50 border-gray-200";
      case 3:
        return "bg-amber-50 border-amber-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3">
      <div className="mb-2">
        <h3 className="text-sm font-semibold performance-header flex items-center gap-1">
          <Trophy className="h-3 w-3 text-yellow-500" />
          지난 주 우수상담사
        </h3>
      </div>

      <div className="space-y-1">
        {/* 상위 3명 표시 */}
        {top3.map((consultant) => (
          <div
            key={consultant.rank}
            className={`flex items-center justify-between p-2 rounded border ${getRankStyle(
              consultant.rank,
              consultant.isMe
            )}`}
          >
            <div className="flex items-center gap-2">
              {getRankIcon(consultant.rank)}
              <span
                className={`text-xs font-medium ${
                  consultant.isMe
                    ? "performance-highlight-me"
                    : "performance-text-gray-dark"
                }`}
              >
                {consultant.nickname}
                {consultant.isMe}
              </span>
            </div>
            <span
              className={`text-xs font-bold ${
                consultant.isMe
                  ? "performance-highlight-me"
                  : "performance-score"
              }`}
            >
              {consultant.weeklyScore}점
            </span>
          </div>
        ))}

        {/* 하위 등수 표시 (...) */}
        {!isInTop3 && (
          <>
            <div className="flex items-center justify-center py-1">
              <span className="text-xs text-gray-400">...</span>
            </div>

            {/* 본인 등수 표시 */}
            {myInfo && (
              <div
                className={`flex items-center justify-between p-2 rounded border ${getRankStyle(
                  myInfo.rank,
                  true
                )}`}
              >
                <div className="flex items-center gap-2">
                  {getRankIcon(myInfo.rank)}
                  <span className="text-xs font-medium performance-highlight-me">
                    {myInfo.nickname}
                  </span>
                </div>
                <span className="text-xs font-bold performance-highlight-me">
                  {myInfo.weeklyScore}점
                </span>
              </div>
            )}
          </>
        )}
      </div>

      {/* 기간 표시 */}
      <div className="text-xs performance-text-gray-light text-center pt-2 mt-2 border-t border-gray-100">
        지난 주 평균 점수 기준
      </div>
    </div>
  );
}
