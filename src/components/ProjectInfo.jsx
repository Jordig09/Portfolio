import { useEffect, useState } from "react";

function ProjectInfo(props) {
  const [selectedImg, setSelectedImg] = useState(0);

  const imgUrl = `/portfolio/img/projects/${props.project.imgUrl}`;
  const imgsUrl = [];
  for (let i = 0; i < 5; i++) {
    imgsUrl[i] = `${imgUrl}-${i}.jpg`;
  }

  useEffect(() => {
    setSelectedImg(0);
  }, [props.project]);

  return (
    <div className="project-info-container">
      <div className="project-info-carousel">
        <img src={imgsUrl[selectedImg]} alt="" />
        <div className="project-info-carousel-sidebar">
          <img src={imgsUrl[0]} alt="" onClick={() => setSelectedImg(0)} />
          <img src={imgsUrl[1]} alt="" onClick={() => setSelectedImg(1)} />
          <img src={imgsUrl[2]} alt="" onClick={() => setSelectedImg(2)} />
          <img src={imgsUrl[3]} alt="" onClick={() => setSelectedImg(3)} />
        </div>
      </div>
      <div className="project-info-data">
        <div className="project-info-text">
          <h2>{props.project.projectName}</h2>
          <p>{props.project.description}</p>
        </div>
        <div className="project-info-details">
          <div className="project-info-tecnologies">
            <h4>Tecnologies:&nbsp;</h4>
            <h5>{props.project.tecnologies}</h5>
          </div>
          <div className="project-info-buttons">
            {props.project.github && (
              <a target="_blank" href={props.project.github}>
                GITHUB
              </a>
            )}
            {props.project.web && (
              <a target="_blank" href={props.project.web}>
                SITIO WEB
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectInfo;
