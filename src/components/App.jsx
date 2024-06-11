import { Suspense, createContext, useState } from "react";
import { Canvas } from "@react-three/fiber";

import NavBar from "./NavBar";
import HomeScene from "../scenes/HomeScene";
import BackButton from "./BackButton";
import SideButton from "./SideButton";
import { LoadingScreen } from "./LoadingScreen";
import { useProgress } from "@react-three/drei";

export const Context = createContext();

function App() {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [sectionActive, setSectionActive] = useState("none");
  const [cameraPos, setCameraPos] = useState([0, 2, 12]);
  const [cameraRot, setCameraRot] = useState([-0.165, 0, 0]);
  const [theme, setTheme] = useState("light-theme");

  return (
    <Context.Provider
      value={{
        sectionActive,
        setSectionActive,
        cameraPos,
        setCameraPos,
        cameraRot,
        setCameraRot,
        theme,
        setTheme,
        assetsLoaded,
        setAssetsLoaded,
        loadingProgress,
        setLoadingProgress,
      }}
    >
      {loadingProgress === 100 && (
        <main className={`hero ${theme}`}>
          <NavBar />
          <SideButton />
          <BackButton />
        </main>
      )}
      <Canvas className="canvas" shadows>
        <Suspense fallback={null}>
          {loadingProgress === 100 && <HomeScene />}
        </Suspense>
      </Canvas>
      <LoadingScreen />
    </Context.Provider>
  );
}

export default App;
