import { useRef, useState } from "react";
import "./App.css";
import Stats from "./components/Stats";
import { calculateTrust } from "./utils/trustScore";

function App() {
  const [totalClicks, setTotalClicks] = useState(0);
  const [avgInterval, setAvgInterval] = useState(0);
  const [maxCPS, setMaxCPS] = useState(0);
  const [stdDeviation, setStdDeviation] = useState(0);

  const [repeatPercentage, setRepeatPercentage] = useState(0);
  const [positionSpread, setPositionSpread] = useState(0);
  const [sessionMinutes, setSessionMinutes] = useState(0);
  const [trustScore, setTrustScore] = useState(100);

  const lastClick = useRef(null);
  const sessionStart = useRef(Date.now());

  const intervals = useRef([]);
  const positions = useRef([]);

  const calculateStdDev = (arr) => {
    if (arr.length < 2) return 0;

    const avg =
      arr.reduce((a, b) => a + b, 0) /
      arr.length;

    const variance =
      arr.reduce(
        (sum, val) => sum + Math.pow(val - avg, 2),
        0
      ) / arr.length;

    return Math.sqrt(variance);
  };

  const getRepeatPercentage = (arr) => {
    if (!arr.length) return 0;

    const map = {};

    arr.forEach((i) => {
      map[i] = (map[i] || 0) + 1;
    });

    const max = Math.max(...Object.values(map));

    return (max / arr.length) * 100;
  };

  const getPositionSpread = () => {
    if (positions.current.length < 2) return 0;

    const xs = positions.current.map((p) => p.x);
    const ys = positions.current.map((p) => p.y);

    return Math.max(
      Math.max(...xs) - Math.min(...xs),
      Math.max(...ys) - Math.min(...ys)
    );
  };

  const handleClick = (e) => {
    const now = Date.now();

    positions.current.push({
      x: e.clientX,
      y: e.clientY,
    });

    if (lastClick.current) {
      const interval = now - lastClick.current;

      intervals.current.push(interval);

      const avg =
        intervals.current.reduce((a, b) => a + b, 0) /
        intervals.current.length;

      setAvgInterval(avg);

      const cps = 1000 / interval;

      setMaxCPS((prev) => Math.max(prev, cps));

      const deviation = calculateStdDev(intervals.current);

      setStdDeviation(deviation);

      const repeat = getRepeatPercentage(intervals.current);

      setRepeatPercentage(repeat);

      const spread = getPositionSpread();

      setPositionSpread(spread);

      const minutes =
        (Date.now() - sessionStart.current) /
        60000;

      setSessionMinutes(minutes);

      const trust = calculateTrust({
        stdDeviation: deviation,
        maxCPS: cps,
        repeatPercentage: repeat,
        positionSpread: spread,
        sessionMinutes: minutes,
      });

      setTrustScore(trust);
    }

    lastClick.current = now;

    setTotalClicks((prev) => prev + 1);
  };

  return (
    <div className="container">
      <h1>📿 Japa Counter</h1>

      <button
        className="click-btn"
        onClick={handleClick}
      >
        Chant 🙏
      </button>

      <Stats
        totalClicks={totalClicks}
        avgInterval={avgInterval}
        maxCPS={maxCPS}
        stdDeviation={stdDeviation}
        repeatPercentage={repeatPercentage}
        positionSpread={positionSpread}
        sessionMinutes={sessionMinutes}
        trustScore={trustScore}
      />
    </div>
  );
}

export default App;