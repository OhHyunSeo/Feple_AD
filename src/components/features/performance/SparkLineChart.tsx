interface SparkLineChartProps {
  data: number[];
  teamData: number[];
  xLabels: string[];
  height?: number;
  width?: number;
}

export default function SparkLineChart({
  data,
  teamData,
  xLabels,
  height = 80,
  width = 220,
}: SparkLineChartProps) {
  const paddingLeft = 0;
  const paddingRight = 0;
  const paddingTop = 5;
  const paddingBottom = 10;
  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  // 데이터의 최대값과 최소값 계산 (내 데이터와 팀 데이터 모두 고려)
  const allValues = [...data, ...teamData];
  const maxValue = Math.max(...allValues);
  const minValue = Math.min(...allValues);
  const valueRange = maxValue - minValue || 1; // 0으로 나누기 방지

  // 좌표 계산 함수
  const getX = (index: number) =>
    paddingLeft + (index / (data.length - 1)) * chartWidth;
  const getY = (value: number) =>
    paddingTop + chartHeight - ((value - minValue) / valueRange) * chartHeight;

  // 내 데이터 라인 경로 생성
  const myPath = data
    .map(
      (value, index) =>
        `${index === 0 ? "M" : "L"} ${getX(index)} ${getY(value)}`
    )
    .join(" ");

  // 팀 데이터 라인 경로 생성
  const teamPath = teamData
    .map(
      (value, index) =>
        `${index === 0 ? "M" : "L"} ${getX(index)} ${getY(value)}`
    )
    .join(" ");

  // Y축 라벨용 값 계산
  const yAxisLabels = [minValue, (minValue + maxValue) / 2, maxValue].map(
    (val) => Math.round(val * 10) / 10
  ); // 소수점 1자리로 반올림

  return (
    <div className="relative">
      <svg width={width} height={height} className="overflow-visible">
        {/* 격자선 */}
        <defs>
          <pattern
            id="grid"
            width="20"
            height="15"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 20 0 L 0 0 0 15"
              fill="none"
              stroke="#f3f4f6"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>

        {/* 배경 격자 */}
        <rect
          x={paddingLeft}
          y={paddingTop}
          width={chartWidth}
          height={chartHeight}
          fill="url(#grid)"
        />

        {/* X축 */}
        <line
          x1={paddingLeft}
          y1={paddingTop + chartHeight}
          x2={paddingLeft + chartWidth}
          y2={paddingTop + chartHeight}
          stroke="#e5e7eb"
          strokeWidth="1"
        />

        {/* Y축 */}
        <line
          x1={paddingLeft}
          y1={paddingTop}
          x2={paddingLeft}
          y2={paddingTop + chartHeight}
          stroke="#e5e7eb"
          strokeWidth="1"
        />

        {/* Y축 라벨 */}
        {yAxisLabels.map((label, index) => {
          const y =
            paddingTop +
            chartHeight -
            (index / (yAxisLabels.length - 1)) * chartHeight;
          return (
            <g key={index}>
              {/* 가이드 라인 */}
              <line
                x1={paddingLeft}
                y1={y}
                x2={paddingLeft + chartWidth}
                y2={y}
                stroke="#f3f4f6"
                strokeWidth="0.5"
                strokeDasharray="2,2"
              />
              {/* 라벨 */}
              <text
                x={paddingLeft - 5}
                y={y + 2}
                textAnchor="end"
                fontSize="8"
                fill="#9ca3af"
              >
                {label}분
              </text>
            </g>
          );
        })}

        {/* 팀 평균 라인 */}
        <path
          d={teamPath}
          fill="none"
          stroke="#9ca3af"
          strokeWidth="2"
          strokeDasharray="3,3"
          opacity="0.7"
        />

        {/* 내 데이터 라인 */}
        <path d={myPath} fill="none" stroke="#ec7199" strokeWidth="2" />

        {/* 내 데이터 포인트 */}
        {data.map((value, index) => (
          <circle
            key={index}
            cx={getX(index)}
            cy={getY(value)}
            r="2"
            fill="#ec7199"
          />
        ))}

        {/* 팀 데이터 포인트 */}
        {teamData.map((value, index) => (
          <circle
            key={index}
            cx={getX(index)}
            cy={getY(value)}
            r="1.5"
            fill="#9ca3af"
            opacity="0.7"
          />
        ))}

        {/* X축 라벨 (일차 표시) */}
        {xLabels.map((label, index) => {
          // 라벨을 선택적으로 표시 (너무 많으면 일부만)
          const shouldShow =
            xLabels.length <= 7 ||
            index === 0 ||
            index === xLabels.length - 1 ||
            index % Math.ceil(xLabels.length / 5) === 0;

          if (!shouldShow) return null;

          const x = paddingLeft + (index / (data.length - 1)) * chartWidth;

          return (
            <text
              key={index}
              x={x}
              y={paddingTop + chartHeight + 12}
              textAnchor="middle"
              fontSize="8"
              fill="#9ca3af"
            >
              {label}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
