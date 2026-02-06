import { useEffect, useRef, useState } from "react";

export default function ActivityTracker() {
  const [count, setCount] = useState(0);
  const [timer, setTimer] = useState(0);
  const [tracking, setTracking] = useState(false);

  const isFirstRender = useRef(true);

  useEffect(() => {
    console.log("Page loaded");
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    console.log("Count updated");
  }, [count]);

  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!tracking) return;
    console.log("Tracking active");
  }, [tracking]);

  return (
    <div className={`tracker ${tracking ? "tracking" : ""}`}>
      <h1>User Activity Tracker</h1>

      <div className="section">
        <div className="label">Count</div>
        <div className="value">{count}</div>
        <button onClick={() => setCount(count + 1)}>
          Increase
        </button>
      </div>

      <div className="divider" />

      <div className="section">
        <div className="label">Timer</div>
        <div className="value timer">{timer}s</div>
      </div>

      <button
        className="toggle"
        onClick={() => setTracking(!tracking)}
      >
        {tracking ? "Stop Tracking" : "Start Tracking"}
      </button>
    </div>
  );
}
