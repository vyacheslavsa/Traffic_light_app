import { useEffect, useRef, useState } from "react";
import styles from "./App.module.scss";

function App() {
  const [color, setColor] = useState("red");
  const [seconds, setSeconds] = useState(0);

  const [redTime, setRedTime] = useState(10);
  const [yellowTime, setYellowTime] = useState(1);
  const [greenTime, setGreenTime] = useState(10);
  const [isWork, setIsWork] = useState(false);

  let myInterval = useRef(null);

  const getStart = () => {
    if (isWork) return;
    setIsWork(true);
    myInterval.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
  };

  const getStop = () => {
    setIsWork(false);
    clearInterval(myInterval.current);
    setSeconds(0);
    setColor("red");
  };

  const getPause = () => {
    setIsWork(false);
    clearInterval(myInterval.current);
  };

  useEffect(() => {
    if (isWork) {
      switch (color) {
        case "red":
          if (seconds === redTime) {
            setSeconds(0);
            setColor("yellow");
          }

          break;
        case "yellow":
          if (seconds === yellowTime) {
            setSeconds(0);
            setColor("green");
          }
          break;
        case "green":
          if (seconds === greenTime) {
            setSeconds(0);
            setColor("red");
          }

          break;

        default:
          break;
      }
    }
  }, [color, redTime, yellowTime, greenTime, seconds, isWork]);

  const isRed = color === "red";
  const isYellow = color === "yellow";
  const isGreen = color === "green";

  const currentColor = color[0].toUpperCase() + color.slice(1);

  return (
    <>
      <div className={styles.main}>
        <div className={styles.traffic_light}>
          <div className={isRed ? styles.activeRed : null}></div>
          <div className={isYellow ? styles.activeYellow : null}></div>
          <div className={isGreen ? styles.activeGreen : null}></div>
        </div>
        <div className={styles.admin_panel}>
          <h1>Admin Panel</h1>
          <div className={styles.controllers}>
            <div>
              Time work Red color:{" "}
              <input
                type="number"
                style={{ width: "40px" }}
                value={redTime}
                onChange={(e) => Number(e.target.value) > 0 && setRedTime(Number(e.target.value))}
              />
            </div>
            <div>
              Time work Yellow color:{" "}
              <input
                type="number"
                style={{ width: "40px" }}
                value={yellowTime}
                onChange={(e) => Number(e.target.value) > 0 && setYellowTime(Number(e.target.value))}
              />
            </div>
            <div>
              Time work Green color:{" "}
              <input
                type="number"
                style={{ width: "40px" }}
                value={greenTime}
                onChange={(e) => Number(e.target.value) > 0 && setGreenTime(Number(e.target.value))}
              />
            </div>

            <button onClick={getStart}>start</button>
            <button onClick={getPause}>pause</button>
            <button onClick={getStop}>stop</button>
          </div>
          <h2>
            Current Color: <span>{currentColor}</span>
          </h2>
          <h2 className="timer"> {`Timer: ${(color === "red" ? redTime : greenTime) - seconds}`}</h2>
        </div>
      </div>
    </>
  );
}

export default App;
