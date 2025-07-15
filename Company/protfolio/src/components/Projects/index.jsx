import React from 'react';
import { FiGithub } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import './projects.css';

const projects = [
  {
    title: "X - (Twitter)",
    description: "UI clone of Twitter's homepage using Node.js, HTML, and Tailwind CSS. Designed to be responsive and clean with modern design principles.",
    image: "/packages/images/portfolio1.webp",
    tech: ["HTML", "Tailwind CSS", "Node.js"],
    github: "#"
  },
  {
    title: "Real Time System's RAM Usage Monitoring App",
    description: "Python GUI app using psutil, Tkinter, and matplotlib to display live RAM usage, a graph, and a table of top memory-consuming processes.",
    image: "/packages/images/portfolio2.webp",
    tech: ["psutil", "Tkinter", "matplotlib"],
    github: "#"
  },
  {
    title: "YT Video Downloader",
    description: "Python tool to download YouTube videos using yt-dlp with support for high quality formats.",
    image: "/packages/images/portfolio3.webp",
    tech: ["Python", "yt-dlp"],
    github: "#"
  },
  {
    title: "YT Music Downloader",
    description: "Python tool to download YouTube videos using yt-dlp with support for high quality formats.",
    image: "/packages/images/portfolio3.webp",
    tech: ["Python", "Tkinter"],
    github: "#"
  }
];

const Project = () => {
  const navigate = useNavigate();
  return (
    <section className="project section project--dark" id="projects">
      <div className="project__header-row">
        <h2 className="section__title project__title--timeline">Projects Timeline</h2>
        <button className="project__view-more-btn" onClick={() => navigate('/more-projects')}>
          View More Projects <FiGithub style={{marginLeft: 8}} />
        </button>
      </div>
      <div className="project__grid">
        {projects.slice(0, 3).map((project, idx) => (
          <div className="project__card" key={idx}>
            <div className="project__card-git"><FiGithub /></div>
            <img src={project.image} alt={project.title} className="project__card-img" loading="lazy" />
            <h3 className="project__card-title">{project.title}</h3>
            <p className="project__card-desc">{project.description}</p>
            <div className="project__card-tech-row">
              {project.tech.map((t, i) => (
                <span className="project__card-tech" key={i}>{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Project;

// New page for all projects
export const MoreProjectsPage = () => {
  const navigate = useNavigate();
  return (
    <section className="project section project--dark" id="more-projects">
      <div className="project__header-row">
        <button className="project__back-btn" onClick={() => navigate('/')}>Back</button>
        <h2 className="section__title project__title--timeline">All Projects</h2>
      </div>
      <div className="project__grid">
        {projects.slice(3).map((project, idx) => (
          <div className="project__card" key={idx}>
            <div className="project__card-git"><FiGithub /></div>
            <img src={project.image} alt={project.title} className="project__card-img" loading="lazy" />
            <h3 className="project__card-title">{project.title}</h3>
            <p className="project__card-desc">{project.description}</p>
            <div className="project__card-tech-row">
              {project.tech.map((t, i) => (
                <span className="project__card-tech" key={i}>{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};