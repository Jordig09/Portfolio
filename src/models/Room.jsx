import React, { useState, useContext } from "react";
import { useGLTF, Html } from "@react-three/drei";
import { MeshStandardMaterial, TextureLoader } from "three";
import { useLoader } from "@react-three/fiber";
import leftMonitorUrl from "../assets/vid/left-monitor.mp4";
import rightMonitorUrl from "../assets/vid/right-monitor.mp4";
import * as THREE from "three";

import RightMonitor from "../components/RightMonitor";
import { Context } from "../components/App";

export function Room(props) {
  const { nodes, materials } = useGLTF("/Portfolio/room.glb");

  const { sectionActive } = useContext(Context);

  const [leftVideo] = useState(() => {
    const vid = document.createElement("video");
    vid.src = leftMonitorUrl;
    vid.crossOrigin = "Anonymous";
    vid.loop = true;
    vid.muted = true;
    vid.play();
    return vid;
  });

  const [rightVideo] = useState(() => {
    const vid = document.createElement("video");
    vid.src = rightMonitorUrl;
    vid.crossOrigin = "Anonymous";
    vid.loop = true;
    vid.muted = true;
    vid.play();
    return vid;
  });

  const desktopMaterial = new MeshStandardMaterial({
    color: "white",
    roughness: 0.4,
    flatShading: true,
  });

  const notebookMaterial = new MeshStandardMaterial({
    color: "#E79B58",
    roughness: 0.4,
    flatShading: true,
  });

  const notebookTexture = useLoader(
    TextureLoader,
    "/src/assets/img/notebook-material.jpg"
  );
  notebookTexture.center.set(0.17, 0.33);
  notebookTexture.repeat.set(4, 4);
  const notebookContainer = new MeshStandardMaterial({
    color: "#ffffff",
    map: notebookTexture,
    emissive: "#000000",
  });

  const woodMaterial = new MeshStandardMaterial({
    color: "#6C4B06",
    roughness: 1,
    flatShading: true,
  });

  return (
    <group {...props} dispose={null}>
      <group name="Scene">
        <Html position={[-3.275, 4.185, -5]}>
          <RightMonitor sectionActive={sectionActive} />
        </Html>
        <group name="right-monitor" position={[-1.293, 1.519, 1.565]}>
          <group
            name="right-monitor-case"
            position={[1.335, 0.02, -1.822]}
            scale={2.1}
          >
            <mesh
              name="Cube002_1"
              castShadow
              receiveShadow
              geometry={nodes.Cube002_1.geometry}
              material={materials.Nikon}
            />
            <mesh
              name="Cube002_2"
              castShadow
              receiveShadow
              geometry={nodes.Cube002_2.geometry}
              material={materials["Black Plastic"]}
            />
            <mesh
              name="Cube002_3"
              castShadow
              receiveShadow
              geometry={nodes.Cube002_3.geometry}
              material={materials["Material.005"]}
            />
            <mesh
              name="Cube002_4"
              castShadow
              receiveShadow
              geometry={nodes.Cube002_4.geometry}
              material={materials["plastic touched"]}
            />
            <mesh
              onClick={() => props.homeActive && props.handleRightScreen()}
              onPointerEnter={() =>
                props.homeActive && (document.body.style.cursor = "pointer")
              }
              onPointerLeave={() =>
                props.homeActive && (document.body.style.cursor = "auto")
              }
              name="right-monitor-screen"
              castShadow
              geometry={nodes["right-monitor-screen"].geometry}
              position={[-0.059, 0.337, 0.048]}
              scale={-0.738}
            >
              <meshStandardMaterial
                emissive={"#000000"}
                side={THREE.DoubleSide}
              >
                <videoTexture attach="map" args={[rightVideo]} />
                <videoTexture attach="emissiveMap" args={[rightVideo]} />
              </meshStandardMaterial>
            </mesh>
          </group>
        </group>
        <group
          name="left-monitor"
          position={[-0.996, 1.539, -0.015]}
          rotation={[Math.PI, 0, Math.PI]}
        >
          <group
            name="left-monitor-case"
            position={[0.009, 0, 0.201]}
            rotation={[Math.PI, 0, Math.PI]}
            scale={1.55}
          >
            <mesh
              name="Plane002"
              castShadow
              receiveShadow
              geometry={nodes.Plane002.geometry}
              material={materials.BlackPlastic}
            />
            <mesh
              name="Plane002_1"
              castShadow
              receiveShadow
              geometry={nodes.Plane002_1.geometry}
              material={materials["plastic touched.001"]}
            />
            <mesh
              name="Plane002_2"
              castShadow
              receiveShadow
              geometry={nodes.Plane002_2.geometry}
              material={materials["Metal Semirough 01"]}
            />
          </group>
          <mesh
            onClick={() => props.homeActive && props.handleLeftScreen()}
            onPointerEnter={() =>
              props.homeActive && (document.body.style.cursor = "pointer")
            }
            onPointerLeave={() =>
              props.homeActive && (document.body.style.cursor = "auto")
            }
            name="left-monitor-screen"
            castShadow
            geometry={nodes["left-monitor-screen"].geometry}
            position={[0.009, 0.816, 0.201]}
            scale={-1.55}
          >
            <meshStandardMaterial emissive={"#000000"} side={THREE.DoubleSide}>
              <videoTexture attach="map" args={[leftVideo]} />
              <videoTexture attach="emissiveMap" args={[leftVideo]} />
            </meshStandardMaterial>
          </mesh>
        </group>
        <group
          name="room"
          position={[0, 4.116, 3.452]}
          scale={[4.76, 4.119, 4.119]}
        >
          <mesh
            name="Cube027"
            receiveShadow
            geometry={nodes.Cube027.geometry}
            material={materials.wall}
          />
          <mesh
            name="Cube027_1"
            castShadow
            receiveShadow
            geometry={nodes.Cube027_1.geometry}
            material={materials.floor}
          />
        </group>
        <mesh
          name="drawer-1"
          castShadow
          receiveShadow
          geometry={nodes["drawer-1"].geometry}
          material={desktopMaterial}
          position={[0.87, 0.763, 0.465]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[0.357, 0.02, 0.112]}
        />
        <mesh
          name="drawer-3"
          castShadow
          receiveShadow
          geometry={nodes["drawer-3"].geometry}
          material={desktopMaterial}
          position={[0.87, 0.512, 0.465]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[0.357, 0.02, 0.112]}
        />
        <mesh
          name="drawer-2"
          castShadow
          receiveShadow
          geometry={nodes["drawer-2"].geometry}
          material={desktopMaterial}
          position={[0.87, 0.26, 0.465]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[0.357, 0.02, 0.112]}
        />
        <group
          name="Wheel1"
          position={[0.56, 0.079, 0.373]}
          rotation={[0, 0, Math.PI]}
          scale={0.041}
        >
          <mesh
            name="Cylinder004"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder004.geometry}
            material={materials["caster_plastic touched"]}
            scale={24.212}
          />
          <mesh
            name="Cylinder005"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder005.geometry}
            material={materials["caster_plastic touched"]}
            scale={24.212}
          />
          <mesh
            name="Cylinder006"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder006.geometry}
            material={materials["caster_plastic touched"]}
            scale={24.212}
          />
          <group name="Cylinder007" scale={24.212}>
            <mesh
              name="Cylinder_1"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder_1.geometry}
              material={materials["caster_plastic touched"]}
            />
          </group>
        </group>
        <group
          name="Wheel2"
          position={[1.177, 0.079, 0.373]}
          rotation={[0, 0, Math.PI]}
          scale={0.041}
        >
          <mesh
            name="Cylinder001"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder001.geometry}
            material={materials["caster_plastic touched"]}
            scale={24.212}
          />
          <mesh
            name="Cylinder002"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder002.geometry}
            material={materials["caster_plastic touched"]}
            scale={24.212}
          />
          <mesh
            name="Cylinder003"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder003.geometry}
            material={materials["caster_plastic touched"]}
            scale={24.212}
          />
          <group name="Cylinder008" scale={24.212}>
            <mesh
              name="Cylinder008_1"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder008_1.geometry}
              material={materials["caster_plastic touched"]}
            />
            <mesh
              name="Cylinder008_2"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder008_2.geometry}
              material={materials["caster_plastic touched w"]}
            />
          </group>
        </group>
        <group
          name="Wheel3"
          position={[1.177, 0.079, -0.121]}
          rotation={[0, 0, Math.PI]}
          scale={0.041}
        >
          <mesh
            name="Cylinder009"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder009.geometry}
            material={materials["caster_plastic touched"]}
            scale={24.212}
          />
          <mesh
            name="Cylinder010"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder010.geometry}
            material={materials["caster_plastic touched"]}
            scale={24.212}
          />
          <mesh
            name="Cylinder011"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder011.geometry}
            material={materials["caster_plastic touched"]}
            scale={24.212}
          />
          <group name="Cylinder012" scale={24.212}>
            <mesh
              name="Cylinder012_1"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder012_1.geometry}
              material={materials["caster_plastic touched"]}
            />
            <mesh
              name="Cylinder012_2"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder012_2.geometry}
              material={materials["caster_plastic touched w"]}
            />
          </group>
        </group>
        <group
          name="Wheel4"
          position={[0.565, 0.079, -0.121]}
          rotation={[0, 0, Math.PI]}
          scale={0.041}
        >
          <mesh
            name="Cylinder013"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder013.geometry}
            material={materials["caster_plastic touched"]}
            scale={24.212}
          />
          <mesh
            name="Cylinder014"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder014.geometry}
            material={materials["caster_plastic touched"]}
            scale={24.212}
          />
          <mesh
            name="Cylinder015"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder015.geometry}
            material={materials["caster_plastic touched"]}
            scale={24.212}
          />
          <group name="Cylinder016" scale={24.212}>
            <mesh
              name="Cylinder019"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder019.geometry}
              material={materials["caster_plastic touched"]}
            />
            <mesh
              name="Cylinder019_1"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder019_1.geometry}
              material={materials["caster_plastic touched w"]}
            />
          </group>
        </group>
        <mesh
          name="drawers"
          castShadow
          receiveShadow
          geometry={nodes.drawers.geometry}
          material={desktopMaterial}
          position={[0.87, 0.099, 0.135]}
          scale={[0.4, 0.02, 0.35]}
        />
        <mesh
          name="top"
          castShadow
          receiveShadow
          geometry={nodes.top.geometry}
          material={desktopMaterial}
          position={[0, 1.519, -0.02]}
          scale={[1.35, 0.02, 0.57]}
        />
        <mesh
          name="left-leg"
          castShadow
          receiveShadow
          geometry={nodes["left-leg"].geometry}
          material={desktopMaterial}
          position={[-1.33, 0.747, 0]}
          rotation={[0, 0, -Math.PI / 2]}
          scale={[0.75, 0.02, 0.55]}
        />
        <mesh
          name="right-leg"
          castShadow
          receiveShadow
          geometry={nodes["right-leg"].geometry}
          material={desktopMaterial}
          position={[1.33, 0.747, 0]}
          rotation={[0, 0, -Math.PI / 2]}
          scale={[0.75, 0.02, 0.55]}
        />
        <mesh
          name="keyboard-tray-mount"
          castShadow
          receiveShadow
          geometry={nodes["keyboard-tray-mount"].geometry}
          material={desktopMaterial}
          position={[0.42, 1.344, 0]}
          rotation={[0, 0, -Math.PI / 2]}
          scale={[0.15, 0.02, 0.55]}
        />
        <mesh
          name="back"
          castShadow
          receiveShadow
          geometry={nodes.back.geometry}
          material={desktopMaterial}
          position={[0, 1.177, -0.572]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[1.35, 0.02, 0.32]}
        />
        <mesh
          name="keyboard-tray"
          castShadow
          receiveShadow
          geometry={nodes["keyboard-tray"].geometry}
          material={desktopMaterial}
          position={[-0.455, 1.229, 0]}
          scale={[0.845, 0.02, 0.55]}
        />
        <mesh
          name="left-rail"
          castShadow
          receiveShadow
          geometry={nodes["left-rail"].geometry}
          material={materials["Metal Negro"]}
          position={[-1.305, 1.229, -0.049]}
          rotation={[-Math.PI, 0, 0]}
          scale={[-0.005, -0.03, -0.5]}
        />
        <mesh
          name="right-rail"
          castShadow
          receiveShadow
          geometry={nodes["right-rail"].geometry}
          material={materials["Metal Negro"]}
          position={[0.395, 1.229, -0.049]}
          rotation={[-Math.PI, 0, 0]}
          scale={[-0.005, -0.03, -0.5]}
        />
        <mesh
          name="mousepad"
          castShadow
          receiveShadow
          geometry={nodes.mousepad.geometry}
          material={materials.Mousepad}
          position={[-0.45, 1.26, 0.152]}
          scale={[0.7, 0.001, 0.35]}
        />
        <group
          name="wireless-mouse"
          position={[-0.052, 1.275, 0.305]}
          rotation={[Math.PI, 0, Math.PI]}
          scale={1.742}
        >
          <group name="Base" position={[0, 0.015, 0]}>
            <mesh
              name="Cube022"
              castShadow
              receiveShadow
              geometry={nodes.Cube022.geometry}
              material={materials["Mouse - Shiny Grey"]}
            />
            <mesh
              name="Cube022_1"
              castShadow
              receiveShadow
              geometry={nodes.Cube022_1.geometry}
              material={materials["Mouse - Mat Grey"]}
            />
          </group>
          <mesh
            name="Top"
            castShadow
            receiveShadow
            geometry={nodes.Top.geometry}
            material={materials["Mouse - Mat Grey"]}
            position={[0, 0.024, 0.001]}
          />
        </group>
        <group
          name="RGB_keyboard"
          position={[-0.586, 1.268, 0.259]}
          scale={0.446}
        >
          <mesh
            name="Cube002"
            geometry={nodes.Cube002.geometry}
            material={materials["Material.004"]}
            position={[0, 0.018, 0.045]}
            rotation={[0.048, 0, 0]}
            scale={0.209}
          >
            <mesh
              name="Cube"
              geometry={nodes.Cube.geometry}
              material={materials["Material.007"]}
              position={[2.543, 0.314, 0.68]}
              rotation={[-1.571, 0, 0]}
              scale={[0.078, 0.093, 0.005]}
            />
            <mesh
              name="Cube001"
              geometry={nodes.Cube001.geometry}
              material={materials["Material.002"]}
              position={[0.022, 0.13, -0.057]}
              rotation={[-1.578, 0, 0]}
              scale={[1.207, 1.001, 3.247]}
            />
            <group
              name="Cube020"
              position={[-2.105, 0.246, -0.138]}
              rotation={[-1.578, 0, 0]}
              scale={[1.207, 1, 0.615]}
            >
              <mesh
                name="Cube023"
                geometry={nodes.Cube023.geometry}
                material={materials["Material.004"]}
              />
              <mesh
                name="Cube023_1"
                geometry={nodes.Cube023_1.geometry}
                material={materials["Material.004"]}
              />
            </group>
          </mesh>
        </group>
        <group name="laptop" position={[0.975, 1.583, -0.064]} scale={1.997}>
          <mesh
            name="Plane005"
            castShadow
            receiveShadow
            geometry={nodes.Plane005.geometry}
            material={materials["Base.001"]}
          />
          <mesh
            name="Plane005_1"
            castShadow
            receiveShadow
            geometry={nodes.Plane005_1.geometry}
            material={materials["Plastic Black Ports.001"]}
          />
          <group
            name="laptop-screen"
            position={[0, 0.012, -0.122]}
            rotation={[-3.12, 0, 0]}
          >
            <mesh
              name="Plane003"
              castShadow
              receiveShadow
              geometry={nodes.Plane003.geometry}
              material={materials["Base.001"]}
            />
            <mesh
              name="Plane003_1"
              castShadow
              receiveShadow
              geometry={nodes.Plane003_1.geometry}
              material={materials["Screen Shiny Border.001"]}
            />
          </group>
        </group>
        <mesh
          name="right-support"
          castShadow
          receiveShadow
          geometry={nodes["right-support"].geometry}
          material={woodMaterial}
          position={[1.212, 1.56, -0.073]}
          rotation={[-Math.PI, 0, 0]}
          scale={[0.015, 0.017, 0.196]}
        />
        <mesh
          name="left-support"
          castShadow
          receiveShadow
          geometry={nodes["left-support"].geometry}
          material={woodMaterial}
          position={[0.736, 1.56, -0.073]}
          rotation={[-Math.PI, 0, 0]}
          scale={[0.015, 0.017, 0.196]}
        />
        <mesh
          name="cable-1"
          castShadow
          receiveShadow
          geometry={nodes["cable-1"].geometry}
          material={materials.Cable}
          position={[0.731, 0.69, -2.143]}
          rotation={[1.901, 0.014, -0.214]}
        />
        <mesh
          name="cable-2"
          castShadow
          receiveShadow
          geometry={nodes["cable-2"].geometry}
          material={materials.Cable}
          position={[0.442, 0.479, -2.346]}
        />
        <group
          onClick={() => props.homeActive && props.handleNotebook()}
          onPointerEnter={() =>
            props.homeActive && (document.body.style.cursor = "pointer")
          }
          onPointerLeave={() =>
            props.homeActive && (document.body.style.cursor = "auto")
          }
          name="notebook"
          position={[-2.027, 2.457, -0.654]}
        >
          <mesh
            name="notebook-back-cover"
            castShadow
            geometry={nodes["notebook-back-cover"].geometry}
            material={notebookMaterial}
            position={[1.497, -0.916, 0.894]}
            rotation={[-Math.PI, 0, -Math.PI]}
            scale={[-0.145, -0.001, -0.205]}
          />
          <mesh
            name="notebook-container"
            geometry={nodes["notebook-container"].geometry}
            material={notebookContainer}
            position={[1.495, -0.907, 0.889]}
            rotation={[-Math.PI, 0, -Math.PI]}
            scale={[-0.143, -0.008, -0.203]}
          />
          <mesh
            name="notebook-cover"
            castShadow
            geometry={nodes["notebook-cover"].geometry}
            material={notebookMaterial}
            position={[1.35, -0.898, 0.889]}
            rotation={[-Math.PI, 0, -Math.PI]}
            scale={[-0.145, -0.001, -0.205]}
          />
          <mesh
            name="notebook-sheets"
            castShadow
            geometry={nodes["notebook-sheets"].geometry}
            material={desktopMaterial}
            position={[1.495, -0.907, 0.889]}
            rotation={[-Math.PI, 0, -Math.PI]}
            scale={[-0.143, -0.008, -0.203]}
          />
          <mesh
            name="notebook-side"
            castShadow
            geometry={nodes["notebook-side"].geometry}
            material={notebookMaterial}
            position={[1.35, -0.907, 0.889]}
            rotation={[0, 0, Math.PI / 2]}
            scale={[0.008, 0.001, 0.21]}
          />
        </group>
        <group
          name="experience"
          position={[-0.494, 2.368, -0.209]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.18}
        >
          <mesh name="Text001_1" castShadow geometry={nodes.Text001.geometry}>
            <meshBasicMaterial color="#707070" />
          </mesh>
          <mesh name="Text001_2" castShadow geometry={nodes.Text001_1.geometry}>
            <meshBasicMaterial color={props.textColor} />
          </mesh>
        </group>
        <group
          name="skills"
          position={[-1.445, 2.27, -0.211]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.18}
        >
          <mesh name="Text002_1" castShadow geometry={nodes.Text002.geometry}>
            <meshBasicMaterial color="#707070" />
          </mesh>
          <mesh name="Text002_2" castShadow geometry={nodes.Text002_1.geometry}>
            <meshBasicMaterial color={props.textColor} />
          </mesh>
        </group>
        <group
          onClick={() => props.homeActive && props.handleTheme()}
          onPointerEnter={() =>
            props.homeActive && (document.body.style.cursor = "pointer")
          }
          onPointerLeave={() =>
            props.homeActive && (document.body.style.cursor = "auto")
          }
          name="Floor_Lamp"
          position={[-2.298, -0.003, 0.094]}
          rotation={[Math.PI, 0, Math.PI]}
          scale={1.721}
        >
          <mesh
            name="lamp"
            castShadow
            receiveShadow
            geometry={nodes.lamp.geometry}
            material={materials["Base.001"]}
            position={[0, 0.031, 0]}
          />
          <mesh
            name="lamp_cover"
            castShadow
            receiveShadow
            geometry={nodes.lamp_cover.geometry}
            material={materials.Lamp_Cover}
            position={[0, 1.37, 0]}
          />
        </group>
        <group
          name="Animated_indoor_ficus_in_a_concrete_pot"
          position={[2.089, -0.003, 0.047]}
          rotation={[Math.PI, 0, Math.PI]}
          scale={1.549}
        >
          <mesh
            name="ground001"
            castShadow
            receiveShadow
            geometry={nodes.ground001.geometry}
            material={materials["TT_checker_1024x1024_UV_GRID.001"]}
          />
          <mesh
            name="plant001"
            castShadow
            receiveShadow
            geometry={nodes.plant001.geometry}
            material={materials.leave_1_MatSG}
          />
          <mesh
            name="pot001"
            castShadow
            receiveShadow
            geometry={nodes.pot001.geometry}
            material={materials["TT_checker_1024x1024_UV_GRID.001"]}
          />
        </group>
        <mesh
          name="diploma-1"
          castShadow
          receiveShadow
          geometry={nodes["diploma-1"].geometry}
          material={materials["digital-house"]}
          position={[4.735, 4.084, 1.166]}
          rotation={[0, 0, -Math.PI / 2]}
          scale={[0.56, 1, 0.8]}
        />
        <mesh
          name="frame-1"
          castShadow
          receiveShadow
          geometry={nodes["frame-1"].geometry}
          material={materials.Madera}
          position={[4.735, 4.084, 0.341]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[0.025, 0.025, 0.61]}
        />
        <mesh
          name="diploma-2"
          castShadow
          receiveShadow
          geometry={nodes["diploma-2"].geometry}
          material={materials.python}
          position={[4.735, 4.089, 3.189]}
          rotation={[0, 0, -Math.PI / 2]}
          scale={[0.56, 1, 0.8]}
        />
        <mesh
          name="frame-2"
          castShadow
          receiveShadow
          geometry={nodes["frame-2"].geometry}
          material={materials.Madera}
          position={[4.735, 4.089, 2.364]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[0.025, 0.025, 0.61]}
        />
        <mesh
          name="diploma-3"
          castShadow
          receiveShadow
          geometry={nodes["diploma-3"].geometry}
          material={materials.Material}
          position={[4.735, 4.089, 5.205]}
          rotation={[0, 0, -Math.PI / 2]}
          scale={[0.56, 1, 0.8]}
        />
        <mesh
          name="frame-3"
          castShadow
          receiveShadow
          geometry={nodes["frame-3"].geometry}
          material={materials.Madera}
          position={[4.735, 4.089, 4.38]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[0.025, 0.025, 0.61]}
        />
        <mesh
          name="diploma-4"
          castShadow
          receiveShadow
          geometry={nodes["diploma-4"].geometry}
          material={materials.git}
          position={[4.735, 2.605, 1.166]}
          rotation={[0, 0, -Math.PI / 2]}
          scale={[0.56, 1, 0.8]}
        />
        <mesh
          name="frame-4"
          castShadow
          receiveShadow
          geometry={nodes["frame-4"].geometry}
          material={materials.Madera}
          position={[4.735, 2.605, 0.341]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[0.025, 0.025, 0.61]}
        />
        <mesh
          name="diploma-5"
          castShadow
          receiveShadow
          geometry={nodes["diploma-5"].geometry}
          material={materials.node}
          position={[4.735, 2.608, 3.184]}
          rotation={[0, 0, -Math.PI / 2]}
          scale={[0.56, 1, 0.8]}
        />
        <mesh
          name="frame-5"
          castShadow
          receiveShadow
          geometry={nodes["frame-5"].geometry}
          material={materials.Madera}
          position={[4.735, 2.608, 2.359]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[0.025, 0.025, 0.61]}
        />
        <mesh
          name="diploma-6"
          castShadow
          receiveShadow
          geometry={nodes["diploma-6"].geometry}
          material={materials.js}
          position={[4.735, 2.608, 5.208]}
          rotation={[0, 0, -Math.PI / 2]}
          scale={[0.56, 1, 0.8]}
        />
        <mesh
          name="frame-6"
          castShadow
          receiveShadow
          geometry={nodes["frame-6"].geometry}
          material={materials.Madera}
          position={[4.735, 2.608, 4.383]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[0.025, 0.025, 0.61]}
        />
        <mesh
          name="Cube003"
          geometry={nodes.Cube003.geometry}
          material={materials["Metal Negro"]}
          position={[4.735, 4.74, 1.157]}
          scale={[0.025, 0.025, 0.075]}
        />
        <mesh
          name="Cube004"
          geometry={nodes.Cube004.geometry}
          material={materials["Metal Negro"]}
          position={[4.735, 4.74, 3.203]}
          scale={[0.025, 0.025, 0.075]}
        />
        <mesh
          name="Cube005"
          geometry={nodes.Cube005.geometry}
          material={materials["Metal Negro"]}
          position={[4.735, 4.74, 5.223]}
          scale={[0.025, 0.025, 0.075]}
        />
        <mesh
          name="Cube006"
          geometry={nodes.Cube006.geometry}
          material={materials["Metal Negro"]}
          position={[4.735, 3.259, 1.157]}
          scale={[0.025, 0.025, 0.075]}
        />
        <mesh
          name="Cube007"
          geometry={nodes.Cube007.geometry}
          material={materials["Metal Negro"]}
          position={[4.735, 3.259, 3.203]}
          scale={[0.025, 0.025, 0.075]}
        />
        <mesh
          name="Cube008"
          geometry={nodes.Cube008.geometry}
          material={materials["Metal Negro"]}
          position={[4.735, 3.259, 5.223]}
          scale={[0.025, 0.025, 0.075]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/Portfolio/room.glb");
