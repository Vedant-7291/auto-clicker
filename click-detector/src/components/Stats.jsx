import "./Stats.css";

function Stats({
  totalClicks,
  avgInterval,
  maxCPS,
  stdDeviation,
  repeatPercentage,
  positionSpread,
  sessionMinutes,
  trustScore,
}) {

  const getStatus = () => {
    if (trustScore >= 90)
      return "🟢 Genuine";

    if (trustScore >= 70)
      return "🟡 Normal";

    if (trustScore >= 50)
      return "🟠 Suspicious";

    return "🔴 Auto Clicker";
  };

  return (
    <div className="stats-container">

      <h2>Session Statistics</h2>

      <div className="stat">
        <span>Total Count</span>
        <span>{totalClicks}</span>
      </div>

      <div className="stat">
        <span>Average Interval</span>
        <span>{avgInterval.toFixed(2)} ms</span>
      </div>

      <div className="stat">
        <span>Max CPS</span>
        <span>{maxCPS.toFixed(2)}</span>
      </div>

      <div className="stat">
        <span>Standard Deviation</span>
        <span>{stdDeviation.toFixed(2)}</span>
      </div>

      <div className="stat">
        <span>Repeated Interval</span>
        <span>{repeatPercentage.toFixed(2)}%</span>
      </div>

      <div className="stat">
        <span>Touch Spread</span>
        <span>{positionSpread.toFixed(2)} px</span>
      </div>

      <div className="stat">
        <span>Session Time</span>
        <span>{sessionMinutes.toFixed(2)} min</span>
      </div>

      <hr />

      <h2>Trust Score</h2>

      <h1>{trustScore}%</h1>

      <h3>{getStatus()}</h3>

    </div>
  );
}

export default Stats;