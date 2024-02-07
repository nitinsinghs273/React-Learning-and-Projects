import React from "react";

function Option({ QuestionNo, dispatch, answer }) {
  const hasAnswer = answer != null;
  return (
    <div className="options">
      {QuestionNo.options.map((option, index) => (
        <button
          className={`btn btn-option ${index === answer ? "answer" : ""}  ${
            hasAnswer &&
            (index === QuestionNo.correctOption ? "correct" : "wrong")
          }`}
          disabled={hasAnswer}
          key={option}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Option;
