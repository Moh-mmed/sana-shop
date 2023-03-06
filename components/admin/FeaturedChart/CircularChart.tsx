import s from './CircularChart.module.css'

const CircularChart = ({chart}:any) => {
  const radius = (chart.sqSize - chart.strokeWidth) / 2;
  const viewBox = `0 0 ${chart.sqSize} ${chart.sqSize}`;
  const dashArray = radius * Math.PI * 2;
  const dashOffset = dashArray - (dashArray * chart.percentage) / 100;

  return (
      <div>
        <svg width={chart.sqSize} height={chart.sqSize} viewBox={viewBox}>
        <circle
            className={s.circle_background}
            cx={chart.sqSize / 2}
            cy={chart.sqSize / 2}
            r={radius}
            strokeWidth={`${chart.strokeWidth}px`}
        />
        <circle
            className={s.circle_progress}
            cx={chart.sqSize / 2}
            cy={chart.sqSize / 2}
            r={radius}
            strokeWidth={`${chart.strokeWidth}px`}
            transform={`rotate(-90 ${chart.sqSize / 2} ${chart.sqSize / 2})`}
            style={{
            strokeDasharray: dashArray,
            strokeDashoffset: dashOffset,
            }}
        />
        <text
            className={s.circle_text}
            x="50%"
            y="50%"
            dy=".3em"
            textAnchor="middle"
        >
            {`${chart.percentage}%`}
        </text>
        </svg>
    </div>
  );
}

export default CircularChart