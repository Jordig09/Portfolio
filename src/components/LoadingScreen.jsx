import { useContext, useEffect, useState } from "react";
import { useProgress } from "@react-three/drei";
import { Context } from "./App";

export const LoadingScreen = () => {
  const { progress, loaded, total } = useProgress();

  const { loadingProgress, setLoadingProgress } = useContext(Context);

  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    if (loaded === total) {
      setLoadingProgress(20);
    }
  }, [loaded, total]);

  useEffect(() => {
    let intervalId;
    if (loadingProgress < 100) {
      intervalId = setInterval(() => {
        setLoadingProgress((prevProgress) => Math.min(prevProgress + 1, 100));
      }, 40);
    }
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
          ></div>
        </div>
        <button
          className={`loadingScreen__button ${
            loadingProgress != 100 ? "loading" : ""
          }`}
          style={{ opacity: loadingProgress === 100 ? 1 : 0 }}
          disabled={loadingProgress != 100}
          onClick={() => setIsHidden(true)}
        >
          Enter
        </button>
      </div>
    </div>
  );
};
