import { useState } from "react";
import ProjectCard from "./ProjectCard";
import ProjectInfo from "./ProjectInfo";

function RightMonitor(props) {
  const [selectedProject, setSelectedProject] = useState({
    imgUrl: "digital-hard-dashboard",
    projectName: "Digital Hard - Dashboard",
    description: `Panel de administración con acceso a base de datos propia de usuarios y productos
    Conexión con API REST`,
    tecnologies: "React, Node, Express, Git, Bootstrap",
    github: "url",
    web: "url",
  });

  const projects = [
    {
      imgUrl: "digital-hard-dashboard",
      projectName: "Digital Hard - Dashboard",
      description: `Panel de administración con acceso a base de datos propia de usuarios y productos
      Conexión con API REST`,
      tecnologies: "React, Node, Express, Git, Bootstrap",
      github: "https://github.com/Jordig09/grupo_2_digitalhard_dashboard",
    },
    {
      imgUrl: "digital-hard-ecommerce",
      projectName: "Digital Hard - Ecommerce",
      description: `Tienda virtual de componentes de informática con base de datos propia de usuarios y productos.
      API Rest para uso externo de los datos. Sistema de gestión de productos.`,
      tecnologies:
        "HTML, CSS, JavaScript, Node, Express, MySQL, Git, Bootstrap",
      github: "https://github.com/Jordig09/grupo_2_digitalhard",
    },
    {
      imgUrl: "cinephilist",
      projectName: "Cinephilist",
      description: `Aplicación para Android/IOS para búsqueda de películas y series y creación de listados con el fín de anotar las vistas y las que se quieren ver. Firebase para gestión de usuarios, acceso a listados de otros usuarios. Añadir Amigos`,
      tecnologies: "React-Native, Expo, TypeScript, Firebase",
    },
    {
      imgUrl: "buen-treino",
      projectName: "Buen Treino",
      description: `Sitio web para monitorización de grupos de entrenamiento.
      Firebase para creación y validación de usuarios. Utilización de Google Sheets como base de datos`,
      tecnologies: "React, Bootstrap, Firebase, Git",
      github: "https://github.com/Jordig09/buen-treino",
      web: "https://jordig09.github.io/buen-treino/",
    },
    {
      imgUrl: "mern-dashboard",
      projectName: "Mern Dashboard",
      description: `Panel de administración creado e implementado utilizando MERN Stack
        Tablas y gráficos de información obtenida de base de datos en la nube. Tema Claro / Oscuro.`,
      tecnologies: "React, Node, Express, MongoDB, MaterialUI",
      github: "https://github.com/Jordig09/fullstack-admin",
      web: "https://admin-frontend-5jrj.onrender.com/",
    },
  ];

  const handleOnClick = (selectedName) => {
    setSelectedProject(
      projects.find((project) => project.projectName === selectedName)
    );
  };

  return (
    <div
      className="right-monitor"
      style={{
        display: props.sectionActive === "rightScreen" ? "flex" : "none",
      }}
    >
      <div className="right-monitor-sidebar">
        {projects.map((project, index) => {
          return (
            <ProjectCard
              key={index}
              projectImg={project.imgUrl}
              projectName={project.projectName}
              handleOnClick={handleOnClick}
            />
          );
        })}
      </div>
      <div className="right-monitor-main">
        <ProjectInfo project={selectedProject} />
      </div>
    </div>
  );
}

export default RightMonitor;
