import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

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
      <Skill skill="React" emoji="👌" color="blue" />
      <Skill skill="C/C++" emoji="👌" color="orangered" />
      <Skill skill="Javascript" emoji="👌" color="green" />
      <Skill skill="HTML+CSS" emoji="👌" color="yellow" />
      <Skill skill="Python" emoji="👌" color="red" />
    </div>
  );
}

function Skill(props) {
  return (
    <div className="Skills" style={{ backgroundColor: props.color }}>
      <span>{props.skill}</span>
      <span>{props.emoji}</span>
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
