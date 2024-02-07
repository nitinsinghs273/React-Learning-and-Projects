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

          {/* children props */}
          <StepMessage step={step}>{Learns[step - 1]}</StepMessage>

          <div className="buttons">
            <Button bgColor="#7950f2" color="white" onClick={handlePrevious}>
              <span>👈</span> Previous
            </Button>

            <Button bgColor="#7950f2" color="white" onClick={handleNext}>
              Next <span>👉</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function StepMessage({ step, children }) {
  return (
    <p className="message">
      Step {step}: {children}
    </p>
  );
}

function Button({ bgColor, textcolor, onClick, children }) {
  return (
    <button
      style={{ backgroundColor: bgColor, color: textcolor }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
