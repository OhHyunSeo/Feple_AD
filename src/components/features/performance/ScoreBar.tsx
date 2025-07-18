interface ScoreBarProps {
  label: string;
  myScore: number;
  teamScore?: number;
  color: string;
}

export default function ScoreBar({
  label,
  myScore,
  teamScore,
  color,
}: ScoreBarProps) {
  const maxScore = 100;
  const myHeight = (myScore / maxScore) * 100;
  const teamHeight = teamScore ? (teamScore / maxScore) * 100 : 0;

  return (
    <div className="flex flex-col items-center">
      <div className="text-xs performance-label mb-1">{label}</div>
      <div className="relative h-10 w-3 bg-gray-100 rounded overflow-hidden">
        {/* 팀 평균 (뒤쪽에 먼저 렌더링) */}
        {teamScore && (
          <div
            className="absolute bottom-0 w-full bg-gray-400 opacity-50"
            style={{ height: `${teamHeight}%` }}
          />
        )}
        {/* 내 점수 (앞쪽에 나중에 렌더링) */}
        <div
          className={`absolute bottom-0 w-full ${color} transition-all duration-500 ease-out`}
          style={{ height: `${myHeight}%` }}
        />
      </div>
      <div className="mt-1 text-center">
        <div className="text-xs performance-score">{myScore}</div>
        {teamScore && (
          <div className="text-xs performance-team-text">팀: {teamScore}</div>
        )}
      </div>
    </div>
  );
}
