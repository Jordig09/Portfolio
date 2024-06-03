import { OrbitControls, PerspectiveCamera, useHelper } from "@react-three/drei";
import { Room } from "../models/Room";
import { useThree } from "@react-three/fiber";
import { useContext, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Context } from "../components/App";
import { Object3D } from "three";

function HomeScene() {
  const { scene } = useThree();
  const notebookRef = useRef();

  const [homeActive, setHomeActive] = useState(true);
  const [ambientLightColor, setAmbientLightColor] = useState([1, 1, 1]);
  const [directionalLightIntensity, setDirectionalLightIntensity] =
    useState(0.7);
  const [pointLightIntensity, setPointLightIntensity] = useState(0);
  const [textColor, setTextColor] = useState([0.024, 0.024, 0.024]);

  const { sectionActive, setSectionActive } = useContext(Context);
  const { cameraPos, setCameraPos } = useContext(Context);
  const { cameraRot, setCameraRot } = useContext(Context);
  const { theme, setTheme } = useContext(Context);

  const ambientRef = useRef();
  const directionalRef = useRef();
  const pointRef = useRef();
  const spotRef = useRef();
  const spotRef2 = useRef();
  const spotRef3 = useRef();
  const spotRef4 = useRef();
  const spotRef5 = useRef();
  const spotRef6 = useRef();
  const cameraRef = useRef();
  const controlsRef = useRef();
  const tl = gsap.timeline();

  const [target] = useState([
    new Object3D(),
    new Object3D(),
    new Object3D(),
    new Object3D(),
    new Object3D(),
    new Object3D(),
  ]);

  useEffect(() => {
    const notebookCover = scene.getObjectByName("notebook-cover");
    notebookRef.current = notebookCover;
  }, [scene]);

  const disableControls = () => {
    setHomeActive(false);
    document.body.style.cursor = "auto";
    controlsRef.current.enabled = false;
  };

  const moveCamera = async (ease1, ease2) => {
    await tl
      .to(
        cameraRef.current.position,
        { x: cameraPos[0], duration: 1, ease: ease1 },
        "cameraMove"
      )
      .to(
        cameraRef.current.position,
        { y: cameraPos[1], duration: 1, ease: ease1 },
        "cameraMove"
      )
      .to(
        cameraRef.current.position,
        { z: cameraPos[2], duration: 1, ease: ease1 },
        "cameraMove"
      )
      .to(
        cameraRef.current.rotation,
        { x: cameraRot[0], duration: 1, ease: ease2 },
        "cameraMove"
      )
      .to(
        cameraRef.current.rotation,
        { y: cameraRot[1], duration: 1 },
        "cameraMove"
      )
      .to(
        cameraRef.current.rotation,
        { z: cameraRot[2], duration: 1 },
        "cameraMove"
      );
  };

  useGSAP(() => {
    if (sectionActive === "home") {
      moveCamera("sine.out", "none").then(() => {
        setHomeActive(true);
        controlsRef.current.enabled = true;
      });
    }
    if (sectionActive === "right") {
      disableControls();
      setTimeout(() => setSectionActive("rightScreen"), 1000);
      moveCamera("sine.in", "none");
    }
    if (sectionActive === "left") {
      disableControls();
      setTimeout(() => setSectionActive("leftScreen"), 1000);
      moveCamera("sine.in", "none");
    }
    if (sectionActive === "notebook") {
      disableControls();
      setTimeout(() => setSectionActive("desk"), 800);
      moveCamera("sine", "sine.inOut");
      tl.to(
        notebookRef.current.rotation,
        {
          z: -Math.PI * 2 - 0.05,
          duration: 1,
        },
        "cameraMove"
      );
    }
    if (sectionActive === "education") {
      disableControls();
      moveCamera("none", "none");
    }
  }, [sectionActive]);

  useGSAP(() => {
    tl.to(ambientRef.current.color, { r: ambientLightColor[0] }, "switchTheme")
      .to(ambientRef.current.color, { g: ambientLightColor[1] }, "switchTheme")
      .to(ambientRef.current.color, { b: ambientLightColor[2] }, "switchTheme")
      .to(
        directionalRef.current,
        { intensity: directionalLightIntensity },
        "switchTheme"
      )
      .to(pointRef.current, { intensity: pointLightIntensity }, "switchTheme")
      .to(
        spotRef.current,
        { intensity: pointLightIntensity / 2 },
        "switchTheme"
      )
      .to(
        spotRef2.current,
        { intensity: pointLightIntensity / 2 },
        "switchTheme"
      )
      .to(
        spotRef3.current,
        { intensity: pointLightIntensity / 2 },
        "switchTheme"
      )
      .to(
        spotRef4.current,
        { intensity: pointLightIntensity / 2 },
        "switchTheme"
      )
      .to(
        spotRef5.current,
        { intensity: pointLightIntensity / 2 },
        "switchTheme"
      )
      .to(
        spotRef6.current,
        { intensity: pointLightIntensity / 2 },
        "switchTheme"
      );
  }, [theme]);

  const handleRightScreen = (e) => {
    setCameraPos([0.042, 1.645, 7.8]);
    setCameraRot([0.0, 0.0, 0.0]);
    setSectionActive("right");
  };

  const handleLeftScreen = (e) => {
    setCameraPos([-1, 1.6, 7.7]);
    setCameraRot([0.0, 0.0, 0.0]);
    setSectionActive("left");
  };

  const handleNotebook = (e) => {
    setCameraPos([-0.67, 1.9, 7.25]);
    setCameraRot([-Math.PI / 2, 0.0, 0.0]);
    setSectionActive("notebook");
  };

  const handleTheme = () => {
    if (theme === "light-theme") {
      setAmbientLightColor([0.1, 0.13, 0.27]);
      setDirectionalLightIntensity(0.2);
      setPointLightIntensity(1);
      setTextColor([0.3, 0.3, 0.3]);
      setTheme("dark-theme");
    }
    if (theme === "dark-theme") {
      setAmbientLightColor([1, 1, 1]);
      setDirectionalLightIntensity(0.7);
      setPointLightIntensity(0);
      setTextColor([0.024, 0.024, 0.024]);
      setTheme("light-theme");
    }
  };

  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        position={[0, 2, 12]}
        fov={45}
      />
      <OrbitControls
        ref={controlsRef}
        rotateSpeed={0.2}
        minDistance={10}
        maxDistance={12.6}
        minAzimuthAngle={-0.2}
        maxAzimuthAngle={0.2}
        minPolarAngle={Math.PI / 2 - 0.2}
        maxPolarAngle={Math.PI / 2 - 0.1}
      />
      <ambientLight ref={ambientRef} intensity={0.7} />
      <spotLight
        ref={spotRef}
        position={[4.6, 2.9, 8.15]}
        scale={0.1}
        intensity={0}
        castShadow={true}
        target={target[0]}
        distance={2}
        penumbra={0.3}
        angle={Math.PI / 2}
      />
      <primitive object={target[0]} position={[4.7, 2, 8.15]} />
      <spotLight
        ref={spotRef2}
        position={[4.6, 2.9, 10.2]}
        scale={0.1}
        intensity={0}
        castShadow={true}
        target={target[1]}
        distance={2}
        penumbra={0.3}
        angle={Math.PI / 2}
      />
      <primitive object={target[1]} position={[4.7, 2, 10.2]} />
      <spotLight
        ref={spotRef3}
        position={[4.6, 2.9, 12.23]}
        scale={0.1}
        intensity={0}
        castShadow={true}
        target={target[2]}
        distance={2}
        penumbra={0.3}
        angle={Math.PI / 2}
      />
      <primitive object={target[2]} position={[4.7, 2, 12.23]} />
      <spotLight
        ref={spotRef4}
        position={[4.6, 4.39, 8.15]}
        scale={0.1}
        intensity={0}
        castShadow={true}
        target={target[3]}
        distance={2}
        penumbra={0.3}
        angle={Math.PI / 2}
      />
      <primitive object={target[3]} position={[4.7, 2, 8.15]} />
      <spotLight
        ref={spotRef5}
        position={[4.6, 4.39, 10.2]}
        scale={0.1}
        intensity={0}
        castShadow={true}
        target={target[4]}
        distance={2}
        penumbra={0.3}
        angle={Math.PI / 2}
      />
      <primitive object={target[4]} position={[4.7, 2, 10.2]} />
      <spotLight
        ref={spotRef6}
        position={[4.6, 4.39, 12.23]}
        scale={0.1}
        intensity={0}
        castShadow={true}
        target={target[5]}
        distance={2}
        penumbra={0.3}
        angle={Math.PI / 2}
      />
      <primitive object={target[5]} position={[4.7, 2, 12.23]} />
      <pointLight
        ref={pointRef}
        position={[-2.3, 2.05, 7]}
        scale={0.3}
        intensity={0}
      />
      <directionalLight
        intensity={0.7}
        ref={directionalRef}
        position={[0, 8, 20]}
        castShadow={true}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <Room
        notebookRef
        position={[0, -0.3, 7]}
        homeActive={homeActive}
        handleRightScreen={handleRightScreen}
        handleLeftScreen={handleLeftScreen}
        handleNotebook={handleNotebook}
        handleTheme={handleTheme}
        textColor={textColor}
      />
    </>
  );
}

export default HomeScene;
