import { useState } from "react";

const Learns = ["Learn React *", "Apply for the job", "Inverst your time 😁"];

export default function App() {
  return <Step />;
}

function Step() {
  const [step, setstep] = useState(1);
  const [isOpen, setisOpen] = useState(true);

  function handleNext() {
    if (step < 3) setstep((step) => step + 1);
  }
  function handlePrevious() {
    if (step > 1) setstep((step) => step - 1);
  }
  return (
    <div>
      <button
        className="Cross"
        onClick={() => {
          setisOpen((is) => !is);
        }}
      >
        &times;
      </button>

      {isOpen && (
        <div className="steps">
          <div className="Numbers">
            <div className={step >= 1 ? "active" : ""}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div>
          </div>
          <p className="message">
            Step {step}: {Learns[step - 1]}
          </p>
          <div className="buttons">
            <button
              style={{ backgroundColor: "#7950f2", color: "white" }}
              onClick={handlePrevious}
            >
              Previous
            </button>
            <button
              style={{ backgroundColor: "#7950f2", color: "#fff" }}
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
