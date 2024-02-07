import React from "react";
import Option from "./Option";

function Question({ QuestionNo, dispatch, answer, points }) {
  return (
    <div className="question">
      <h4>{QuestionNo.question}</h4>
      <Option QuestionNo={QuestionNo} dispatch={dispatch} answer={answer} />
    </div>
  );
}

export default Question;
