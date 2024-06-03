import { Suspense, createContext, useState } from "react";
import { Canvas } from "@react-three/fiber";

import NavBar from "./NavBar";
import HomeScene from "../scenes/HomeScene";
import BackButton from "./BackButton";
import SideButton from "./SideButton";

export const Context = createContext();

function App() {
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
      }}
    >
      <main className={`hero ${theme}`}>
        <NavBar />
        <SideButton />
        <BackButton />
      </main>
      <Canvas className="canvas" shadows>
        <Suspense>
          <HomeScene />
        </Suspense>
      </Canvas>
    </Context.Provider>
  );
}

export default App;
