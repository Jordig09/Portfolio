import { useContext, useEffect, useState } from "react";
import { Context } from "./App";

export const LoadingScreen = () => {
  const { loadingProgress, setLoadingProgress } = useContext(Context);

  const [isEnabled, setIsEnabled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    let intervalId;
    if (loadingProgress < 100) {
      intervalId = setInterval(() => {
        setLoadingProgress((prevProgress) => Math.min(prevProgress + 1, 100));
      }, 1); // 3000ms/100 = 30ms por incremento de 1%
    }
    if (loadingProgress === 100) setIsEnabled(true);
    return () => clearInterval(intervalId);
  }, [loadingProgress]);

  return (
    <div
      className={`loadingScreen ${isHidden ? "loadingScreen--started" : ""}`}
    >
      <div>
        <h2 className="loading-screen-title">Loading Room...</h2>
        <div className="loadingScreen__progress">
          <div
            className="loadingScreen__progress__value"
            style={{
              width: `${loadingProgress}%`,
            }}
          />
        </div>
        <button
          className="loadingScreen__button"
          style={{ opacity: isEnabled ? 1 : 0 }}
          onClick={() => setIsHidden(true)}
        >
          Enter
        </button>
      </div>
    </div>
  );
};
