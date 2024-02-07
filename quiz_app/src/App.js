import { useEffect, useReducer } from "react";
import Header from "./componets/Header";
import Main from "./componets/Main";
import Loader from "./componets/Loader";
import Error from "./componets/Error";
import StartScreen from "./componets/StartScreen";
import Question from "./componets/Question";
import NextButton from "./componets/NextButton";
import Progress from "./componets/Progress";
import FinishedScreen from "./componets/FinishedScreen";
import Timer from "./componets/Timer";
import Footer from "./componets/Footer";

const SECS_PER_QUESTION = 30;

const initalState = {
  questions: [],
  // 'loading' 'error' 'ready', "active", "finished"
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  remainingSeconds: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "data recived":
      return { ...state, questions: action.payload, status: "ready" };
    case "data Failed":
      return { ...state, status: "error" };

    case "start":
      return {
        ...state,
        status: "active",
        remainingSeconds: state.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };

    case "finish":
      return {
        ...state,
        status: "finished",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    case "restart":
      return { ...initalState, questions: state.questions, status: "ready" };
    case "tick":
      return {
        ...state,
        remainingSeconds: state.remainingSeconds - 1,
        status: state.remainingSeconds === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Unknown action");
  }
}

export default function App() {
  const [
    { questions, status, index, answer, points, highScore, remainingSeconds },
    dispatch,
  ] = useReducer(reducer, initalState);

  const numQuestion = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, curr) => prev + curr.points,
    0
  );

  useEffect(function () {
    async function Fetch_data() {
      const res = await fetch("http://localhost:9000/questions ");
      if (!res.ok) {
        dispatch({ type: "data Failed" });
      }
      const data = await res.json();

      if (!res.Error) {
        dispatch({ type: "data recived", payload: data });
      } else {
        dispatch({ type: "data Failed" });
      }
    }
    Fetch_data();
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestion={numQuestion} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestion={numQuestion}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />
            <Question
              QuestionNo={questions[index]}
              dispatch={dispatch}
              answer={answer}
              points={points}
            />
            <Footer>
              <Timer dispatch={dispatch} remainingSeconds={remainingSeconds} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQuestion={numQuestion}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishedScreen
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
