import { useRef, useState } from "react";
import "./App.css";

function App() {
  const [totalClicks, setTotalClicks] = useState(0);
  const [avgInterval, setAvgInterval] = useState(0);
  const [maxCPS, setMaxCPS] = useState(0);
  const [stdDev, setStdDev] = useState(0);
  const [suspicion, setSuspicion] = useState(0);

  const lastClick = useRef(null);
  const intervals = useRef([]);
  const positions = useRef([]);

  const calculateStdDev = (arr) => {
    if (arr.length < 2) return 0;

    const avg =
      arr.reduce((a, b) => a + b, 0) /
      arr.length;

    const variance =
      arr.reduce(
        (sum, val) =>
          sum + Math.pow(val - avg, 2),
        0
      ) / arr.length;

    return Math.sqrt(variance);
  };

  const calculateSuspicion = (
    stdDeviation,
    uniquePositions
  ) => {
    let score = 0;

    if (stdDeviation < 5)
      score += 50;

    if (uniquePositions < 10)
      score += 30;

    if (maxCPS > 12)
      score += 20;

    return Math.min(score, 100);
  };

  const handleClick = (e) => {
    const now = Date.now();

    positions.current.push(
      `${e.clientX}-${e.clientY}`
    );

    if (lastClick.current) {
      const interval =
        now - lastClick.current;

      intervals.current.push(interval);

      const avg =
        intervals.current.reduce(
          (a, b) => a + b,
          0
        ) /
        intervals.current.length;

      setAvgInterval(
        avg.toFixed(2)
      );

      const cps =
        1000 / interval;

      setMaxCPS((prev) =>
        cps > prev ? cps : prev
      );

      const deviation =
        calculateStdDev(
          intervals.current
        );

      setStdDev(
        deviation.toFixed(2)
      );

      const uniquePositions =
        new Set(
          positions.current
        ).size;

      setSuspicion(
        calculateSuspicion(
          deviation,
          uniquePositions
        )
      );
    }

    lastClick.current = now;

    setTotalClicks(
      (prev) => prev + 1
    );
  };

  return (
    <div className="container">
      <h1>Click Detector</h1>

      <button
        className="click-btn"
        onClick={handleClick}
      >
        CLICK
      </button>

      <div className="stats">
        <p>Total Clicks: {totalClicks}</p>

        <p>
          Average Interval:
          {avgInterval} ms
        </p>

        <p>
          Max CPS:
          {maxCPS.toFixed(2)}
        </p>

        <p>
          Standard Deviation:
          {stdDev}
        </p>

        <p>
          Suspicion Score:
          {suspicion}%
        </p>
      </div>
    </div>
  );
}

export default App;