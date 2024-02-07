import React, { useReducer } from "react";

const initialState = { balance: 0, loan: 0, status: "not-active" };

const ADD_BALANCE = 150;
const SUB_BALANCE = 50;
const LOAN_BALANCE = 5000;

function reducer(state, action) {
  switch (action.type) {
    case "open":
      return { ...state, balance: 500, status: "active" };

    case "deposit":
      return { ...state, balance: state.balance + ADD_BALANCE };
    case "withdraw":
      return { ...state, balance: state.balance - SUB_BALANCE };
    case "loan":
      return {
        ...state,
        loan: state.loan === 0 ? state.loan + LOAN_BALANCE : state.loan,
        balance:
          state.loan === 0 ? state.balance + action.payload : state.balance,
      };
    case "payloan":
      return {
        ...state,
        loan: 0,
        balance:
          state.loan !== 0 ? state.balance - LOAN_BALANCE : state.balance,
      };
    case "close":
      return initialState;
    default:
      throw new Error("Unkown Action");
  }
}

function App() {
  const [{ balance, loan, status }, dispatch] = useReducer(
    reducer,
    initialState
  );
  return (
    <div className="app">
      <h4>Balance: {balance}</h4>
      <h4>Loan: {loan}</h4>
      <button
        onClick={() => dispatch({ type: "open" })}
        disabled={status === "active"}
      >
        Open account
      </button>

      <button
        onClick={() => dispatch({ type: "deposit" })}
        disabled={status === "not-active"}
      >
        Deposit 150
      </button>

      <button
        onClick={() => dispatch({ type: "withdraw" })}
        disabled={status === "not-active"}
      >
        Withdrow 50
      </button>
      <button
        disabled={status === "not-active"}
        onClick={() => dispatch({ type: "loan", payload: 5000 })}
      >
        Request a loan of 5000
      </button>
      <button
        disabled={status === "not-active"}
        onClick={() => dispatch({ type: "payloan" })}
      >
        Pay Loan
      </button>
      <button
        disabled={status === "not-active"}
        onClick={() => dispatch({ type: "close" })}
      >
        Close account
      </button>
    </div>
  );
}

export default App;
