import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const skills = [
  {
    skill: "HTML+CSS",
    level: "advanced",
    color: "#2662EA",
  },
  {
    skill: "JavaScript",
    level: "advanced",
    color: "#EFD81D",
  },
  {
    skill: "Web Design",
    level: "advanced",
    color: "#C3DCAF",
  },
  {
    skill: "Git and GitHub",
    level: "intermediate",
    color: "#E84F33",
  },
  {
    skill: "React",
    level: "advanced",
    color: "#60DAFB",
  },
  {
    skill: "Svelte",
    level: "beginner",
    color: "#FF3B00",
  },
];

function App() {
  return (
    <div className="Card">
      <Avatar />
      <div className="Data">
        <Introduction />

        <Skillset />
      </div>
    </div>
  );
}

function Avatar() {
  return (
    <div>
      <img className="image" src="profile.jpg" alt="Profile PIC" />
    </div>
  );
}

function Introduction() {
  return (
    <div className="intro">
      <h1>Nitin Singh</h1>
      <p>
        My name is Nitin Singh.I am a Aspiring Web Developer and Problem Solver.
        currently I am learning React and Backend Technology along with the
        Front-end
      </p>
    </div>
  );
}

function Skillset() {
  return (
    <div className="Skill-List">
      {skills.map((skill) => (
        <Skill SkillObj={skill} />
      ))}
    </div>
  );
}

function Skill({ SkillObj }) {
  return (
    <div className="Skills" style={{ backgroundColor: SkillObj.color }}>
      <span>{SkillObj.skill}</span>
      <span>
        {SkillObj.level === "beginner" && "👍"}
        {SkillObj.level === "intermediate" && "👌"}
        {SkillObj.level === "advanced" && "🙌"}
      </span>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
