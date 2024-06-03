import { useContext } from "react";
import { Context } from "./App";

function SideButton() {
  const { sectionActive, setSectionActive } = useContext(Context);
  const { cameraPos, setCameraPos } = useContext(Context);
  const { cameraRot, setCameraRot } = useContext(Context);

  const handleOnClick = () => {
    if (sectionActive === "home" || sectionActive === "none") {
      setCameraPos([-3.5, 2.5, 10]);
      setCameraRot([0.0, -Math.PI / 2, 0.0]);
      setSectionActive("education");
    }
    if (sectionActive === "education") {
      setCameraPos([0, 2, 12]);
      setCameraRot([-0.165, 0.0, 0.0]);
      setSectionActive("home");
    }
  };

  return (
    <div
      className={`btn ${
        sectionActive != "education" ? "side-btn-right" : "side-btn-left"
      }`}
      style={{
        display:
          sectionActive === "home" ||
          sectionActive === "none" ||
          sectionActive === "education"
            ? "block"
            : "none",
      }}
    >
      <svg
        onClick={() => handleOnClick()}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        width="48"
        height="48"
      >
        <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
      </svg>
    </div>
  );
}

export default SideButton;
