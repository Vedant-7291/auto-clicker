import { useRef, useState } from "react";
import "./App.css";

function App() {
  const [totalClicks, setTotalClicks] = useState(0);
  const [averageInterval, setAverageInterval] = useState(0);
  const [maxCPS, setMaxCPS] = useState(0);

  const lastClick = useRef(null);
  const intervals = useRef([]);

  const handleClick = () => {
    const now = Date.now();

    if (lastClick.current) {
      const interval = now - lastClick.current;

      intervals.current.push(interval);

      const avg =
        intervals.current.reduce(
          (a, b) => a + b,
          0
        ) / intervals.current.length;

      setAverageInterval(
        avg.toFixed(2)
      );

      const cps = (
        1000 / interval
      ).toFixed(2);

      if (cps > maxCPS) {
        setMaxCPS(cps);
      }
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
        <p>
          Total Clicks:
          {totalClicks}
        </p>

        <p>
          Average Interval:
          {averageInterval} ms
        </p>

        <p>
          Max CPS:
          {maxCPS}
        </p>
      </div>
    </div>
  );
}

export default App;