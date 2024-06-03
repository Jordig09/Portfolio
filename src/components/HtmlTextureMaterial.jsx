import React, { useMemo } from "react";
import * as THREE from "three";

const HtmlTextureMaterial = ({ children }) => {
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = "30px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("Hello, World!", canvas.width / 2, canvas.height / 2);
    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }, []);

  return (
    <meshBasicMaterial attach="material" map={texture}>
      {children}
    </meshBasicMaterial>
  );
};

export default HtmlTextureMaterial;
