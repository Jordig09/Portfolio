function ProjectCard(props) {
  const imgUrl = `src/assets/img/projects/${props.projectImg}-0.jpg`;
  // const url = `src/assets/img/projects/digital-hard-dashboard.jpg`;
  return (
    <div
      className="project-card-container"
      onClick={() => props.handleOnClick(props.projectName)}
    >
      <img className="project-card-img" src={imgUrl} alt={props.projectName} />
    </div>
  );
}

export default ProjectCard;
